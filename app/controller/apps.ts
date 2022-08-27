import { Controller } from 'egg';
import AppDto from '../contract/dto/app';
// import utl from 'lodash';
import { Op } from 'sequelize';
import { toInt } from '../utils/toInt';

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
  async index(includeUser = false) {
    const ctx = this.ctx;

    const linkages = await ctx.model.AppUser.findAll({
      where: {
        userId: ctx.state.user.id,
      },
    });

    const appIds = linkages.map((item) => item.appId);

    const apps = await ctx.model.App.findAll({
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
        [Op.or]: [
          {
            userId: ctx.state.user.id,
          },
          {
            id: {
              [Op.in]: appIds,
            },
          },
        ],
      },
      include: includeUser
        ? [
            {
              model: ctx.model.User,
            },
          ]
        : undefined,
    });

    ctx.body = apps;
  }

  /**
   * @summary 获取列表
   * @description 描述
   * @router get /api/apps-include-user 路径
   * @request query integer limit limit
   * @request query integer offset offset
   * @request query string title title
   * @request query string labels labels
   * @response 200 AppIncludeUserListResponse
   */
  async indexIncludeUser() {
    await this.index(true);
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
    ctx.body = await ctx.model.App.findByPk(ctx.params.id);
  }

  /**
   * @summary 创建 app
   * @description
   * @router post /api/apps
   * @request body CreationApp app 应用对象
   * @response 200 AppShowResponse
   */
  async create() {
    const ctx = this.ctx;

    if (!ctx.isAuthenticated()) {
      throw new Error('用户未登录');
    }

    ctx.validate(AppDto.CreationApp, ctx.request.body);

    const user = await ctx.model.App.create({
      ...ctx.request.body,
      userId: ctx.user.id,
    });
    ctx.status = 200;
    ctx.body = user;
  }

  /**
   * @summary 将 app 分享给其他用户
   * @description
   * @router post /api/apps-share
   * @request body ShareAppRequest 入参
   * @response 200 ResultResponse
   */
  async shareToUser() {
    const ctx = this.ctx;

    if (!ctx.isAuthenticated()) {
      throw new Error('用户未登录');
    }

    ctx.validate(AppDto.ShareAppRequest, ctx.request.body);

    const { userIds, appId } = ctx.request.body;

    const items = await ctx.model.AppUser.bulkCreate(
      userIds.map((userId) => {
        return {
          userId,
          appId,
        };
      }),
    );

    ctx.status = 200;
    ctx.body = items;
  }

  /**
   * @summary 更新 app
   * @description
   * @router put /api/apps/:id
   * @request path string id id
   * @request body UpdationApp data
   * @response 200 AppShowResponse
   */
  async update() {
    const ctx = this.ctx;

    ctx.validate(AppDto.UpdationApp, ctx.request.body);

    const id = ctx.params.id;
    const app = await ctx.model.App.findByPk(id);
    if (!app) {
      throw new Error('未找到该资源');
    }

    /** 如果只有一个参数，body 如果是 JSON string，会自动转成对象，这里再转换一下 */
    await app.update(ctx.request.body);
    ctx.body = app;
  }

  /**
   * @summary 更新 app
   * @description
   * @router put /api/apps/:id/stage-size
   * @request path string id id
   * @request body string data 舞台尺寸的 json 字符串
   * @response 200 AppShowResponse
   */
  async updateStageSize() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    const app = await ctx.model.App.findByPk(id);
    if (!app) {
      throw new Error('未找到该资源');
    }

    /** 如果只有一个参数，body 如果是 JSON string，会自动转成对象，这里再转换一下 */
    await app.update({ stageSizeData: JSON.stringify(ctx.request.body) });
    ctx.body = app;
  }

  /**
   * @summary 更新 app
   * @description
   * @router put /api/apps/:id/history
   * @request path string id id
   * @request body string data 历史操作记录数据的 json 字符串
   * @response 200 AppShowResponse
   */
  async updateHistory() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    const app = await ctx.model.App.findByPk(id);
    if (!app) {
      throw new Error('未找到该资源');
    }

    /** 如果只有一个参数，body 如果是 JSON string，会自动转成对象，这里再转换一下 */
    await app.update({ historyData: JSON.stringify(ctx.request.body) });
    ctx.body = app;
  }

  /**
   * @summary 删除 app
   * @description
   * @router delete /api/apps/:id
   * @request path string id id
   * @response 200 AppShowResponse
   */
  async destroy() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    const app = await ctx.model.App.findByPk(id);
    if (!app) {
      throw new Error('未找到该资源');
    }

    await app.destroy();
    ctx.status = 200;
  }

  /**
   * @summary 删除 app
   * @description
   * @router delete /api/everyApp
   * @request body array[integer] ids
   * @response 200 CountResponse
   */
  async bulkDestroy() {
    const ctx = this.ctx;

    const destroyedRows = await ctx.model.App.destroy({
      where: {
        id: {
          [Op.in]: ctx.request.body ?? [],
        },
      },
    });

    ctx.body = destroyedRows;
  }
}
