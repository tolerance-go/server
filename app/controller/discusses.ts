import { Controller } from 'egg';
import { Op } from 'sequelize';
import DiscussDto from '../contract/dto/discuss';
// import utl from 'lodash';

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

/**
 * @controller DiscussController
 */
export default class DiscussController extends Controller {
  /**
   * @summary 获取列表
   * @description 描述
   * @router get /api/discusses 路径
   * @request query integer pageId pageId
   * @request query integer limit limit
   * @request query integer offset offset
   * @response 200 DiscussListResponse
   */
  async index() {
    const ctx = this.ctx;

    const discusses = await ctx.model.Discuss.findAll({
      limit: toInt(ctx.query.limit),
      offset: toInt(ctx.query.offset),
      order: [['created_at', 'ASC']],
      where: {
        ...(ctx.query.pageId && {
          page_id: {
            [Op.eq]: ctx.query.pageId,
          },
        }),
      },
    });

    ctx.body = discusses;
  }

  /**
   * @summary 查看
   * @description 描述
   * @router get /api/discusses/:id 路径
   * @request path string id id
   * @response 200 DiscussShowResponse
   */
  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.model.Discuss.findByPk(toInt(ctx.params.id));
  }

  /**
   * @summary 创建 data
   * @description
   * @router post /api/discusses
   * @request body CreationDiscuss data 应用对象
   * @response 200 DiscussShowResponse
   */
  async create() {
    const ctx = this.ctx;

    ctx.validate(DiscussDto.CreationDiscuss, ctx.request.body);

    const {
      title,
      desc,
      pageId,
      left,
      top,
      belongsToComId,
      belongsToComStatId,
      containerWidth,
      containerHeight,
      containerLeft,
      containerTop,
    } = ctx.request.body;

    const user = await ctx.model.Discuss.create({
      title,
      desc,
      pageId,
      left,
      top,
      belongsToComId,
      belongsToComStatId,
      containerWidth,
      containerHeight,
      containerLeft,
      containerTop,
    });
    ctx.status = 200;
    ctx.body = user;
  }

  /**
   * @summary 更新 data
   * @description
   * @router put /api/discusses/:id
   * @request path integer id id
   * @request body CreationDiscuss data 应用对象
   * @response 200 DiscussShowResponse
   */
  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const data = await ctx.model.Discuss.findByPk(id);
    if (!data) {
      throw new Error('未找到该资源');
    }

    /** 如果只有一个参数，body 如果是 JSON string，会自动转成对象，这里再转换一下 */
    await data.update(ctx.request.body);
    ctx.body = data;
  }

  /**
   * @summary 删除 app
   * @description
   * @router delete /api/discusses/:id
   * @request path string id id
   * @response 200 DiscussShowResponse
   */
  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const app = await ctx.model.Discuss.findByPk(id);
    if (!app) {
      throw new Error('未找到该资源');
    }

    await app.destroy();
    ctx.body = app;
  }
}
