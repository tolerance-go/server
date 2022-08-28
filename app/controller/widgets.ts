import { Controller } from 'egg';
import WidgetDto from '../contract/dto/widget';
// import utl from 'lodash';
import { Op } from 'sequelize';
import { toInt } from '../utils/toInt';
import { WidgetModel } from '../model/widget';
import { FindOptions, Attributes } from 'sequelize';

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
   * @request query string name name
   * @request query string labels labels
   * @response 200 WidgetListResponse
   */
  async index() {
    await this.baseIndex();
  }

  /**
   * @summary 获取列表
   * @description 描述
   * @router get /api/widgets-indexIncludeGroupAndLib 路径
   * @request query integer limit limit
   * @request query integer offset offset
   * @request query string name name
   * @request query string labels labels
   * @response 200 ShownWidgetIncludeGroupIncludeLibListResponse
   */
  async indexIncludeGroupAndLib() {
    const ctx = this.ctx;
    await this.baseIndex({
      include: [
        {
          model: ctx.model.WidgetGroup,
          include: [ctx.model.WidgetLib],
        },
      ],
    });
  }

  async baseIndex(options?: FindOptions<Attributes<WidgetModel>>) {
    const ctx = this.ctx;

    const widgets = await ctx.model.Widget.findAll({
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
