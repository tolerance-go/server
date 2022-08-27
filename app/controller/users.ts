import { Controller } from 'egg';
import UserDto from '../contract/dto/user';
import { Op } from 'sequelize';
import { toInt } from '../utils/toInt';
import { getPrivateKey } from '../helpers/getPrivateKey';
import fs from 'fs-extra';
import path from 'path';

/**
 * @controller UserController
 */
export default class UserController extends Controller {
  /**
   * @summary 获取列表
   * @description 描述
   * @router get /api/users 路径
   * @request query integer limit limit
   * @request query integer offset offset
   * @request query string title title
   * @request query string labels labels
   * @response 200 UserListResponse
   */
  async index() {
    const ctx = this.ctx;

    const users = await ctx.model.User.findAll({
      limit: toInt(ctx.query.limit),
      offset: toInt(ctx.query.offset),
      order: [['created_at', 'DESC']],
      where: {
        ...(ctx.query.title && {
          title: {
            [Op.like]: `%${ctx.query.title}%`,
          },
        }),
        ...(ctx.query.labels && {
          labels: {
            [Op.like]: `%${ctx.query.labels}%`,
          },
        }),
      },
    });

    ctx.body = users;
  }

  /**
   * @summary 查看
   * @description 描述
   * @router get /api/users/:id 路径
   * @request path string id id
   * @response 200 UserShowResponse
   */
  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.model.User.findByPk(toInt(ctx.params.id));
  }

  /**
   * @summary 查看
   * @description 描述
   * @router get /api/users-show-with-session 路径
   * @response 200 UserShowResponse
   */
  async showWithSession() {
    const ctx = this.ctx;

    ctx.body = ctx.state.user;
  }

  /**
   * @summary 创建 app
   * @description
   * @router post /api/users
   * @request body CreationUser app 应用对象
   * @response 200 UserShowResponse
   */
  async create() {
    const ctx = this.ctx;

    ctx.validate(UserDto.CreationUser, ctx.request.body);

    const { username } = ctx.request.body;

    const existsUser = await ctx.model.User.findOne({
      where: {
        username,
      },
    });

    if (existsUser) {
      throw new Error('用户名重复');
    }

    const user = await ctx.model.User.create({
      ...ctx.request.body,
    });
    ctx.status = 200;
    ctx.body = user;
  }

  /**
   * @summary 更新 app
   * @description
   * @router put /api/users/:id
   * @request path string id id
   * @request body UpdationUser data
   * @response 200 UserShowResponse
   */
  async update() {
    const ctx = this.ctx;

    ctx.validate(UserDto.UpdationUser, ctx.request.body);

    const id = toInt(ctx.params.id);
    const app = await ctx.model.User.findByPk(id);
    if (!app) {
      throw new Error('未找到该资源');
    }

    /** 如果只有一个参数，body 如果是 JSON string，会自动转成对象，这里再转换一下 */
    await app.update(ctx.request.body);
    ctx.body = app;
  }

  /**
   * @summary 删除 app
   * @description
   * @router delete /api/users/:id
   * @request path string id id
   * @response 200 UserShowResponse
   */
  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const app = await ctx.model.User.findByPk(id);
    if (!app) {
      throw new Error('未找到该资源');
    }

    await app.destroy();
    ctx.status = 200;
  }

  /**
   * @summary 登录
   * @description
   * @router post /api/login
   * @request body LoginAuth app 应用对象
   * @response 200 UserShowResponse
   */
  async login() {
    const ctx = this.ctx;

    ctx.validate(UserDto.CreationUser, ctx.request.body);

    const { username, password } = ctx.request.body;

    const existsUser = await ctx.model.User.findOne({
      where: {
        username,
      },
    });

    if (!existsUser) {
      throw new Error('用户不存在');
    }

    const key = getPrivateKey();
    if (
      key.decrypt(existsUser.password, 'utf8') !== key.decrypt(password, 'utf8')
    ) {
      throw new Error('用户密码不正确');
    }

    await ctx.login(existsUser);

    ctx.body = existsUser;
  }

  /**
   * @summary 登出
   * @description
   * @router get /api/logout
   * @response 200 UserShowResponse
   */
  logout() {
    const ctx = this.ctx;

    if (!ctx.isAuthenticated()) {
      throw new Error('当前用户未登录');
    }

    ctx.body = ctx.user;

    ctx.logout();
  }

  /**
   * @summary 用户文件上传
   * @description
   * @router post /api/upload
   * @response 200 StringArrayResponse
   */
  async upload() {
    const { ctx } = this;
    console.log(ctx.request.body);
    console.log('got %d files', ctx.request.files.length);

    if (!ctx.isAuthenticated()) {
      throw new Error('用户未登录');
    }

    const successItems: string[] = [];

    try {
      const folderPath = path.join('public', 'files', ctx.user.username);
      const sysFolderPath = path.join(process.cwd(), 'app', folderPath);

      // 遍历处理多个文件
      for (const file of ctx.request.files) {
        console.log('field: ' + file.filename);
        console.log('filename: ' + file.filename);
        console.log('encoding: ' + file.encoding);
        console.log('mime: ' + file.mime);
        console.log('tmp filepath: ' + file.filepath);

        if (fs.existsSync(sysFolderPath) === false) {
          fs.mkdirpSync(sysFolderPath);
        }

        fs.copySync(file.filepath, path.join(sysFolderPath, file.filename));

        successItems.push(`/${path.join(folderPath, file.filename)}`);
      }
      ctx.status = 200;
      ctx.body = successItems;
    } catch {
      throw new Error(
        `文件上传失败，成功 ${successItems.length} 个: ${
          successItems.join(',') || '--'
        }`,
      );
    } finally {
      // 需要删除临时文件
      await ctx.cleanupRequestFiles();
    }
  }
}
