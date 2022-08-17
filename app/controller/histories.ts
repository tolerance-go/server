import { Controller } from 'egg';
import { Op } from 'sequelize';
import HistoryDto from '../contract/dto/component';
// import utl from 'lodash';

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

/**
 * @controller HistoryController
 */
export default class HistoryController extends Controller {
  /**
   * @summary 获取列表
   * @description 描述
   * @router get /api/histories 路径
   * @request query integer appId appId
   * @request query integer limit limit
   * @request query integer offset offset
   * @response 200 HistoryListResponse
   */
  async index() {
    const ctx = this.ctx;

    const histories = await ctx.model.History.findAll({
      limit: toInt(ctx.query.limit),
      offset: toInt(ctx.query.offset),
      order: [['created_at', 'ASC']],
      where: {
        ...(ctx.query.appId && {
          app_id: {
            [Op.eq]: ctx.query.appId,
          },
        }),
      },
    });

    ctx.body = histories;
  }

  /**
   * @summary 查看
   * @description 描述
   * @router get /api/histories/:id 路径
   * @request path string id id
   * @response 200 HistoryShowResponse
   */
  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.model.History.findByPk(toInt(ctx.params.id));
  }

  /**
   * @summary 创建 component
   * @description
   * @router post /api/histories
   * @request body CreationHistory component 应用对象
   * @response 200 HistoryShowResponse
   */
  async create() {
    const ctx = this.ctx;

    ctx.validate(HistoryDto.CreationHistory, ctx.request.body);

    const { app_id, data } = ctx.request.body;
    const user = await ctx.model.History.create({
      app_id,
      data,
    });
    ctx.status = 200;
    ctx.body = user;
  }

  /**
   * @summary 更新 component
   * @description
   * @router put /api/histories/:id
   * @request path string id id
   * @request body string data 舞台数据的 json 字符串
   * @response 200 BaseResponse
   */
  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const component = await ctx.model.History.findByPk(id);
    if (!component) {
      throw new Error('未找到该资源');
    }

    /** 如果只有一个参数，body 如果是 JSON string，会自动转成对象，这里再转换一下 */
    await component.update({ data: JSON.stringify(ctx.request.body) });
    ctx.body = component;
  }

  /**
   * @summary 删除 app
   * @description
   * @router delete /api/histories/:id
   * @request path string id id
   * @response 200 HistoryShowResponse
   */
  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const app = await ctx.model.History.findByPk(id);
    if (!app) {
      throw new Error('未找到该资源');
    }

    await app.destroy();
    ctx.body = app;
  }
}
