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
  async index() {
    const ctx = this.ctx;

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
      },
    });

    ctx.body = apps;
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
   * @response 200 AppShowResponse
   */
  async create() {
    const ctx = this.ctx;

    ctx.validate(AppDto.CreationApp, ctx.request.body);

    const user = await ctx.model.App.create(ctx.request.body);
    ctx.status = 200;
    ctx.body = user;
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

    const id = toInt(ctx.params.id);
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
    const id = toInt(ctx.params.id);
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
    const id = toInt(ctx.params.id);
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
    const id = toInt(ctx.params.id);
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
   * @response 200 AppListResponse
   */
  async destroyEvery() {
    const ctx = this.ctx;

    let transaction;

    try {
      // get transaction
      transaction = await this.ctx.model.transaction();

      // step 1
      const apps = await ctx.model.App.findAll({
        where: {
          id: {
            [Op.in]: ctx.request.body.map((item) => toInt(item)) ?? [],
          },
        },
        transaction,
      });

      await Promise.all(
        apps.map((item) =>
          item.destroy({
            transaction,
          }),
        ),
      );

      // commit
      await transaction.commit();

      ctx.body = apps;
    } catch (err) {
      // Rollback transaction only if the transaction object is defined
      if (transaction) await transaction.rollback();

      throw new Error('删除失败');
    }
  }
}
