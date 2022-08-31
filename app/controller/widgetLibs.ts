import { Controller } from 'egg';
import { Op } from 'sequelize';
import { getFindOptions } from '../helpers/getFindOptions';
import { toInt } from '../utils/toInt';

/**
 * @controller WidgetLibController
 */
export default class WidgetLibController extends Controller {
  /**
   * @summary 获取列表
   * @description 描述
   * @router get /api/widgetLibs 路径
   * @request query integer limit limit
   * @request query integer offset offset
   * @response 200 WidgetLibListRsp
   */
  async index() {
    const ctx = this.ctx;

    ctx.body = await ctx.model.WidgetLib.findAll({
      limit: toInt(ctx.query.limit),
      offset: toInt(ctx.query.offset),
      order: [['created_at', 'DESC']],
    });
  }

  /**
   * @summary 获取列表
   * @description 获取列表
   * @router post /api/widgetLibs/findAll
   * @request body FindOptions findOptions
   * @response 200 WidgetLibListRsp
   */
  async findAll() {
    const ctx = this.ctx;
    const findOptions = getFindOptions(ctx, ctx.rule.FindOptions);
    const result = await ctx.model.WidgetLib.findAll(findOptions);
    ctx.body = result;
  }

  /**
   * @summary 获取列表
   * @description 获取列表
   * @router post /api/widgetLibs/findAndCountAll
   * @request body FindOptions findOptions
   * @response 200 WidgetLibListAndCountRsp
   */
  async findAndCountAll() {
    const ctx = this.ctx;
    const findOptions = getFindOptions(ctx, ctx.rule.FindOptions);
    const result = await ctx.model.WidgetLib.findAndCountAll(findOptions);
    ctx.body = result;
  }

  /**
   * @summary 查看
   * @description 描述
   * @router get /api/widgetLibs/:id 路径
   * @request path string id id
   * @response 200 WidgetLibRsp
   */
  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.model.WidgetLib.findByPk(ctx.params.id);
  }

  /**
   * @summary 创建 app
   * @description
   * @router post /api/widgetLibs
   * @request body WidgetLibCreateReqData app 应用对象
   * @response 200 WidgetLibRsp
   */
  async create() {
    const ctx = this.ctx;

    ctx.validate(ctx.rule.WidgetLibCreateReqData, ctx.request.body);

    const user = await ctx.model.WidgetLib.create({
      ...ctx.request.body,
      userId: ctx.user.id,
    });
    ctx.status = 200;
    ctx.body = user;
  }

  /**
   * @summary 更新 app
   * @description
   * @router put /api/widgetLibs/:id
   * @request path string id id
   * @request body WidgetLibUpdateReqData data
   * @response 200 WidgetLibRsp
   */
  async update() {
    const ctx = this.ctx;

    ctx.validate(ctx.rule.WidgetLibUpdateReqData, ctx.request.body);

    const id = ctx.params.id;
    const app = await ctx.model.WidgetLib.findByPk(id);
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
   * @router delete /api/widgetLibs/:id
   * @request path string id id
   * @response 200 WidgetLibRsp
   */
  async destroy() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    const app = await ctx.model.WidgetLib.findByPk(id);
    if (!app) {
      throw new Error('未找到该资源');
    }

    await app.destroy();
    ctx.status = 200;
  }

  /**
   * @summary 删除 app
   * @description
   * @router delete /api/widgetLibs/bulkDestroy
   * @request body array[integer] ids
   * @response 200 CountResponse
   */
  async bulkDestroy() {
    const ctx = this.ctx;

    const destroyedRows = await ctx.model.WidgetLib.destroy({
      where: {
        id: {
          [Op.in]: ctx.request.body ?? [],
        },
      },
    });

    ctx.body = destroyedRows;
  }
}
