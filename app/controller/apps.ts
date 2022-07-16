import { Controller } from 'egg';
import AppDto from '../contract/dto/app';
// import utl from 'lodash';
import { Op } from 'sequelize';

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

/**
 * @controller AppController
 */
export default class AppController extends Controller {
  /**
   * @summary 获取列表
   * @description 描述
   * @router get /api/apps 路径
   * @request query integer limit limit
   * @request query integer offset offset
   * @request query string title title
   * @request query string labels labels
   * @response 200 AppListResponse
   */
  async index() {
    const ctx = this.ctx;

    const apps = await ctx.model.App.findAll({
      limit: toInt(ctx.query.limit),
      offset: toInt(ctx.query.offset),
      order: [['created_at', 'DESC']],
      where: {
        ...(ctx.query.title && {
          title: {
            [Op.like]: `%${ctx.query.title}`,
          },
        }),
        ...(ctx.query.labels && {
          labels: {
            [Op.like]: `%${ctx.query.labels}`,
          },
        }),
      },
    });
    ctx.body = apps.map((app) => {
      return {
        ...app.toJSON(),
        labels: app.labels?.split(','),
      };
    });
  }

  /**
   * @summary 查看
   * @description 描述
   * @router get /api/apps/:id 路径
   * @request path string id id
   * @response 200 AppShowResponse
   */
  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.model.App.findByPk(toInt(ctx.params.id));
  }

  /**
   * @summary 创建 app
   * @description
   * @router post /api/apps
   * @request body CreationApp app 应用对象
   * @response 200 BaseResponse
   */
  async create() {
    const ctx = this.ctx;

    ctx.validate(AppDto.CreationApp, ctx.request.body);

    const { title, desc, labels } = ctx.request.body;
    const user = await ctx.model.App.create({
      title,
      desc,
      labels: labels?.join(','),
    });
    ctx.status = 200;
    ctx.body = user;
  }

  /**
   * @summary 更新 app
   * @description
   * @router put /api/apps/:id
   * @request path string id id
   * @request body string data 舞台数据的 json 字符串
   * @response 200 BaseResponse
   */
  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const app = await ctx.model.App.findByPk(id);
    if (!app) {
      throw new Error('未找到该资源');
    }

    /** 如果只有一个参数，body 如果是 JSON string，会自动转成对象，这里再转换一下 */
    await app.update({ app_data: JSON.stringify(ctx.request.body) });
    ctx.body = app;
  }

  /**
   * @summary 删除 app
   * @description
   * @router delete /api/apps/:id
   * @request path string id id
   * @response 200 BaseResponse
   */
  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const app = await ctx.model.App.findByPk(id);
    if (!app) {
      throw new Error('未找到该资源');
    }

    await app.destroy();
    ctx.status = 200;
  }
}
