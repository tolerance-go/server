import { Controller } from 'egg';
import { Op } from 'sequelize';
import { getCountOptions } from '../helpers/getCountOptions';
import { getFindOptions } from '../helpers/getFindOptions';
import { toInt } from '../utils/toInt';

/**
 * @controller WidgetController
 */
export default class WidgetController extends Controller {
  /**
   * @summary 获取列表
   * @description 描述
   * @router get /api/widgets 路径
   * @request query integer limit limit
   * @request query integer offset offset
   * @response 200 WidgetListRsp
   */
  async index() {
    const ctx = this.ctx;

    ctx.body = await ctx.model.Widget.findAll({
      limit: toInt(ctx.query.limit),
      offset: toInt(ctx.query.offset),
      order: [['created_at', 'DESC']],
    });
  }

  /**
   * @summary 获取列表
   * @description 获取列表
   * @router post /api/widgets/findAll
   * @request body SearchReqData findOptions
   * @response 200 WidgetListRsp
   */
  async findAll() {
    const ctx = this.ctx;
    const findOptions = getFindOptions(ctx, ctx.rule.SearchReqData);
    const result = await ctx.model.Widget.findAll(findOptions);
    ctx.body = result;
  }

  /**
   * @summary 获取列表
   * @description 获取列表
   * @router post /api/widgets/findAndCountAll
   * @request body SearchReqData findOptions
   * @response 200 WidgetListAndCountRsp
   */
  async findAndCountAll() {
    const ctx = this.ctx;
    const findOptions = getFindOptions(ctx, ctx.rule.SearchReqData);
    const result = await ctx.model.Widget.findAndCountAll(findOptions);
    ctx.body = result;
  }

  /**
   * @summary 获取列表
   * @description 获取列表
   * @router post /api/widgets/count
   * @request body CountReqData countReqData
   * @response 200 CountResponse
   */
  async count() {
    const ctx = this.ctx;
    const findOptions = getCountOptions(ctx, ctx.rule.CountReqData);
    ctx.body = await ctx.model.Widget.count(findOptions);
  }

  /**
   * @summary 查看
   * @description 描述
   * @router get /api/widgets/:id 路径
   * @request path string id id
   * @response 200 WidgetRsp
   */
  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.model.Widget.findByPk(ctx.params.id);
  }

  /**
   * @summary 创建 app
   * @description
   * @router post /api/widgets
   * @request body WidgetCreateReqData app 应用对象
   * @response 200 WidgetRsp
   */
  async create() {
    const ctx = this.ctx;

    ctx.validate(ctx.rule.WidgetCreateReqData, ctx.request.body);

    ctx.body = await ctx.model.Widget.create({
      ...ctx.request.body,
      userId: ctx.user.id,
    });
    ctx.status = 200;
  }

  /**
   * @summary 更新 app
   * @description
   * @router put /api/widgets/:id
   * @request path string id id
   * @request body WidgetUpdateReqData data
   * @response 200 WidgetRsp
   */
  async update() {
    const ctx = this.ctx;

    ctx.validate(ctx.rule.WidgetUpdateReqData, ctx.request.body);

    const id = ctx.params.id;
    const target = await ctx.model.Widget.findByPk(id);
    if (!target) {
      throw new Error('未找到该资源');
    }
    const next = await target.update(ctx.request.body);
    ctx.body = next;
  }

  /**
   * @summary 删除 app
   * @description
   * @router delete /api/widgets/:id
   * @request path string id id
   * @response 200 WidgetRsp
   */
  async destroy() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    const target = await ctx.model.Widget.findByPk(id);
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
   * @router delete /api/widgets/bulkDestroy
   * @request body array[integer] ids
   * @response 200 CountResponse
   */
  async bulkDestroy() {
    const ctx = this.ctx;

    const destroyedRows = await ctx.model.Widget.destroy({
      where: {
        id: {
          [Op.in]: ctx.request.body,
        },
      },
    });

    ctx.body = destroyedRows;
  }
}
