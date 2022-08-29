import { convertOrderToRuntime } from './../helpers/convertOrderToRuntime';
import { Controller } from 'egg';
import WidgetDto from '../contract/dto/widget';
import BaseDto from '../contract/dto/base';
// import utl from 'lodash';
import { omitBy } from 'lodash';
import { Op } from 'sequelize';
import { convertIncludeToRuntime } from '../helpers/convertIncludeToRuntime';
import { convertWhereToRuntime } from '../helpers/convertWhereToRuntime';

/**
 * @controller WidgetController
 */
export default class WidgetController extends Controller {
  /**
   * @summary 获取列表
   * @description 获取列表
   * @router post /api/widgets-include
   * @request body FindOptions findOptions
   * @response 200 WidgetListResponse
   */
  async index() {
    const ctx = this.ctx;
    ctx.validate(BaseDto.FindOptions, ctx.request.body);

    const { limit, offset, wheres, includes } = ctx.request.body;
    const include = convertIncludeToRuntime(ctx.model, includes);
    const where = convertWhereToRuntime(wheres);
    const order = convertOrderToRuntime(ctx.request.body.order);
    const findOptions = omitBy(
      {
        order,
        limit,
        offset,
        where,
        include,
      },
      (val) => val === undefined,
    );
    const widgets = await ctx.model.Widget.findAll(findOptions);
    ctx.body = widgets;
  }

  /**
   * @summary 查看
   * @description 描述
   * @router get /api/widgets/:id 路径
   * @request path string id id
   * @response 200 WidgetShowResponse
   */
  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.model.Widget.findByPk(ctx.params.id);
  }

  /**
   * @summary 创建 app
   * @description
   * @router post /api/widgets
   * @request body CreationWidget app 应用对象
   * @response 200 WidgetShowResponse
   */
  async create() {
    const ctx = this.ctx;

    ctx.validate(WidgetDto.CreationWidget, ctx.request.body);

    const user = await ctx.model.Widget.create({
      ...ctx.request.body,
      userId: ctx.user.id,
    });
    ctx.status = 200;
    ctx.body = user;
  }

  /**
   * @summary 更新 app
   * @description
   * @router put /api/widgets/:id
   * @request path string id id
   * @request body UpdationWidget data
   * @response 200 WidgetShowResponse
   */
  async update() {
    const ctx = this.ctx;

    ctx.validate(WidgetDto.UpdationWidget, ctx.request.body);

    const id = ctx.params.id;
    const app = await ctx.model.Widget.findByPk(id);
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
   * @router delete /api/widgets/:id
   * @request path string id id
   * @response 200 WidgetShowResponse
   */
  async destroy() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    const app = await ctx.model.Widget.findByPk(id);
    if (!app) {
      throw new Error('未找到该资源');
    }

    await app.destroy();
    ctx.status = 200;
  }

  /**
   * @summary 删除 app
   * @description
   * @router delete /api/everyWidget
   * @request body array[integer] ids
   * @response 200 CountResponse
   */
  async bulkDestroy() {
    const ctx = this.ctx;

    const destroyedRows = await ctx.model.Widget.destroy({
      where: {
        id: {
          [Op.in]: ctx.request.body ?? [],
        },
      },
    });

    ctx.body = destroyedRows;
  }
}
