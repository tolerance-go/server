import { Controller } from 'egg';
import { Op } from 'sequelize';
import { getFindOptions } from '../helpers/getFindOptions';
import { toInt } from '../utils/toInt';

/**
 * @controller WidgetGroupController
 */
export default class WidgetGroupController extends Controller {
  /**
   * @summary 获取列表
   * @description 描述
   * @router get /api/widgetGroups 路径
   * @request query integer limit limit
   * @request query integer offset offset
   * @response 200 WidgetListRsp
   */
  async index() {
    const ctx = this.ctx;

    ctx.body = await ctx.model.WidgetGroup.findAll({
      limit: toInt(ctx.query.limit),
      offset: toInt(ctx.query.offset),
      order: [['created_at', 'DESC']],
    });
  }

  /**
   * @summary 获取列表
   * @description 获取列表
   * @router post /api/widgetGroups/findAll
   * @request body SearchReqData findOptions
   * @response 200 WidgetListRsp
   */
  async findAll() {
    const ctx = this.ctx;
    const findOptions = getFindOptions(ctx, ctx.rule.SearchReqData);
    const result = await ctx.model.WidgetGroup.findAll(findOptions);
    ctx.body = result;
  }

  /**
   * @summary 获取列表
   * @description 获取列表
   * @router post /api/widgetGroups/findAndCountAll
   * @request body SearchReqData findOptions
   * @response 200 WidgetGroupListAndCountRsp
   */
  async findAndCountAll() {
    const ctx = this.ctx;
    const findOptions = getFindOptions(ctx, ctx.rule.SearchReqData);
    const result = await ctx.model.WidgetGroup.findAndCountAll(findOptions);
    ctx.body = result;
  }

  /**
   * @summary 查看
   * @description 描述
   * @router get /api/widgetGroups/:id 路径
   * @request path string id id
   * @response 200 WidgetGroupRsp
   */
  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.model.WidgetGroup.findByPk(ctx.params.id);
  }

  /**
   * @summary 创建 app
   * @description
   * @router post /api/widgetGroups
   * @request body WidgetGroupCreateReqData app 应用对象
   * @response 200 WidgetGroupRsp
   */
  async create() {
    const ctx = this.ctx;

    ctx.validate(ctx.rule.WidgetGroupCreateReqData, ctx.request.body);

    const user = await ctx.model.WidgetGroup.create({
      ...ctx.request.body,
      userId: ctx.user.id,
    });
    ctx.status = 200;
    ctx.body = user;
  }

  /**
   * @summary 更新 app
   * @description
   * @router put /api/widgetGroups/:id
   * @request path string id id
   * @request body WidgetGroupUpdateReqData data
   * @response 200 WidgetGroupRsp
   */
  async update() {
    const ctx = this.ctx;

    ctx.validate(ctx.rule.UpdationWidgetGroup, ctx.request.body);

    const id = ctx.params.id;
    const app = await ctx.model.WidgetGroup.findByPk(id);
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
   * @router delete /api/widgetGroups/:id
   * @request path string id id
   * @response 200 WidgetGroupRsp
   */
  async destroy() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    const target = await ctx.model.WidgetGroup.findByPk(id);
    if (!target) {
      throw new Error('未找到该资源');
    }

    await target.destroy();
    ctx.body = target;
    ctx.status = 200;
  }

  /**
   * @summary 删除 app
   * @description
   * @router delete /api/widgetGroups/bulkDestroy
   * @request body array[integer] ids
   * @response 200 CountResponse
   */
  async bulkDestroy() {
    const ctx = this.ctx;

    const destroyedRows = await ctx.model.WidgetGroup.destroy({
      where: {
        id: {
          [Op.in]: ctx.request.body ?? [],
        },
      },
    });

    ctx.body = destroyedRows;
  }
}
