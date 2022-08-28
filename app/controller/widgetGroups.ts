import { Controller } from 'egg';
import WidgetGroupDto from '../contract/dto/widget';
// import utl from 'lodash';
import { Op } from 'sequelize';
import { toInt } from '../utils/toInt';
import { WidgetGroupModel } from '../model/widgetGroup';
import { FindOptions, Attributes } from 'sequelize';

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
   * @request query string name name
   * @request query string labels labels
   * @response 200 WidgetGroupListResponse
   */
  async index() {
    await this.baseIndex();
  }

  /**
   * @summary 获取列表
   * @description 描述
   * @router get /api/widgetGroups-indexIncludeWidgets 路径
   * @request query integer limit limit
   * @request query integer offset offset
   * @request query string name name
   * @request query string labels labels
   * @response 200 ShownWidgetGroupIncludeWidgetsListResponse
   */
  async indexIncludeWidgets() {
    const ctx = this.ctx;
    await this.baseIndex({
      include: [ctx.model.Widget],
    });
  }

  private async baseIndex(options?: FindOptions<Attributes<WidgetGroupModel>>) {
    const ctx = this.ctx;

    const widgetGroups = await ctx.model.WidgetGroup.findAll({
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

    ctx.body = widgetGroups;
  }

  /**
   * @summary 查看
   * @description 描述
   * @router get /api/widgetGroups/:id 路径
   * @request path string id id
   * @response 200 WidgetGroupShowResponse
   */
  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.model.WidgetGroup.findByPk(ctx.params.id);
  }

  /**
   * @summary 创建 app
   * @description
   * @router post /api/widgetGroups
   * @request body CreationWidgetGroup app 应用对象
   * @response 200 WidgetGroupShowResponse
   */
  async create() {
    const ctx = this.ctx;

    ctx.validate(WidgetGroupDto.CreationWidgetGroup, ctx.request.body);

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
   * @request body UpdationWidgetGroup data
   * @response 200 WidgetGroupShowResponse
   */
  async update() {
    const ctx = this.ctx;

    ctx.validate(WidgetGroupDto.UpdationWidgetGroup, ctx.request.body);

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
   * @response 200 WidgetGroupShowResponse
   */
  async destroy() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    const app = await ctx.model.WidgetGroup.findByPk(id);
    if (!app) {
      throw new Error('未找到该资源');
    }

    await app.destroy();
    ctx.status = 200;
  }

  /**
   * @summary 删除 app
   * @description
   * @router delete /api/everyWidgetGroup
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
