import { Controller } from 'egg';
import { Op } from 'sequelize';
import PageDto from '../contract/dto/page';
// import utl from 'lodash';
import { toInt } from '../utils/toInt';

/**
 * @controller PageController
 */
export default class PageController extends Controller {
  /**
   * @summary 获取列表
   * @description 描述
   * @router get /api/pages 路径
   * @request query *string appId
   * @request query integer limit
   * @request query integer offset
   * @response 200 PageListResponse
   */
  async index() {
    const ctx = this.ctx;

    const pages = await ctx.model.Page.findAll({
      limit: toInt(ctx.query.limit),
      offset: toInt(ctx.query.offset),
      order: [['created_at', 'ASC']],
      where: {
        appId: {
          [Op.eq]: ctx.query.appId,
        },
      },
    });

    ctx.body = pages;
  }

  /**
   * @summary 查看
   * @description 描述
   * @router get /api/pages/:id 路径
   * @request path string id id
   * @response 200 PageShowResponse
   */
  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.model.Page.findByPk(ctx.params.id);
  }

  /**
   * @summary 创建 page
   * @description
   * @router post /api/pages
   * @request body CreationPage page 应用对象
   * @response 200 PageShowResponse
   */
  async create() {
    const ctx = this.ctx;

    ctx.validate(PageDto.CreationPage, ctx.request.body);

    const user = await ctx.model.Page.create(ctx.request.body);
    ctx.status = 200;
    ctx.body = user;
  }

  /**
   * @summary 更新 page
   * @description
   * @router put /api/pages/:id
   * @request path string id id
   * @request body string data 舞台数据的 json 字符串
   * @response 200 BaseResponse
   */
  async update() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    const page = await ctx.model.Page.findByPk(id);
    if (!page) {
      throw new Error('未找到该资源');
    }

    /** 如果只有一个参数，body 如果是 JSON string，会自动转成对象，这里再转换一下 */
    await page.update(ctx.request.body);
    ctx.body = page;
  }

  /**
   * @summary 删除 app
   * @description
   * @router delete /api/pages/:id
   * @request path string id id
   * @response 200 PageShowResponse
   */
  async destroy() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    const app = await ctx.model.Page.findByPk(id);
    if (!app) {
      throw new Error('未找到该资源');
    }

    await app.destroy();
    ctx.body = app;
  }
}
