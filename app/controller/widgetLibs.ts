import { Controller } from 'egg';
import WidgetLibDto from '../contract/dto/widget';
// import utl from 'lodash';
import { Op } from 'sequelize';
import { toInt } from '../utils/toInt';
import { WidgetLibModel } from '../model/widgetLib';
import { FindOptions, Attributes } from 'sequelize';

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
   * @request query string name name
   * @request query string labels labels
   * @response 200 WidgetLibListResponse
   */
  async index() {
    await this.baseIndex();
  }

  /**
   * @summary 获取列表
   * @description 描述
   * @router get /api/widgetLibs-indexIncludeGroupsAndWidgets 路径
   * @request query integer limit limit
   * @request query integer offset offset
   * @request query string name name
   * @request query string labels labels
   * @response 200 ShownWidgetLibIncludeGroupsIncludeWidgetsListResponse
   */
  async indexIncludeGroupsAndWidgets() {
    const ctx = this.ctx;
    await this.baseIndex({
      include: [
        {
          model: ctx.model.WidgetGroup,
          include: [ctx.model.Widget],
        },
      ],
    });
  }

  async baseIndex(options?: FindOptions<Attributes<WidgetLibModel>>) {
    const ctx = this.ctx;

    const widgetLibs = await ctx.model.WidgetLib.findAll({
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
      ...options,
    });

    ctx.body = widgetLibs;
  }

  /**
   * @summary 查看
   * @description 描述
   * @router get /api/widgetLibs/:id 路径
   * @request path string id id
   * @response 200 WidgetLibShowResponse
   */
  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.model.WidgetLib.findByPk(ctx.params.id);
  }

  /**
   * @summary 创建 app
   * @description
   * @router post /api/widgetLibs
   * @request body CreationWidgetLib app 应用对象
   * @response 200 WidgetLibShowResponse
   */
  async create() {
    const ctx = this.ctx;

    ctx.validate(WidgetLibDto.CreationWidgetLib, ctx.request.body);

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
   * @request body UpdationWidgetLib data
   * @response 200 WidgetLibShowResponse
   */
  async update() {
    const ctx = this.ctx;

    ctx.validate(WidgetLibDto.UpdationWidgetLib, ctx.request.body);

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
   * @response 200 WidgetLibShowResponse
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
   * @router delete /api/everyWidgetLib
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
