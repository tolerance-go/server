import { Controller } from 'egg';
import { Op } from 'sequelize';
import { getCountOptions } from '../helpers/getCountOptions';
import { getFindOptions } from '../helpers/getFindOptions';
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
   * @request query integer limit
   * @request query integer offset
   * @response 200 PageListRsp
   */
  async index() {
    const ctx = this.ctx;

    const pages = await ctx.model.Page.findAll({
      limit: toInt(ctx.query.limit),
      offset: toInt(ctx.query.offset),
      order: [['created_at', 'DESC']],
    });

    ctx.body = pages;
  }

  /**
   * @summary 获取列表
   * @description 获取列表
   * @router post /api/pages/findAll
   * @request body SearchReqData findOptions
   * @response 200 PageListRsp
   */
  async findAll() {
    const ctx = this.ctx;
    const findOptions = getFindOptions(ctx, ctx.rule.SearchReqData);
    const result = await ctx.model.Page.findAll(findOptions);
    ctx.body = result;
  }

  /**
   * @summary 获取列表
   * @description 获取列表
   * @router post /api/pages/findAndCountAll
   * @request body SearchReqData findOptions
   * @response 200 PageListAndCountRsp
   */
  async findAndCountAll() {
    const ctx = this.ctx;
    const findOptions = getFindOptions(ctx, ctx.rule.SearchReqData);
    const result = await ctx.model.Page.findAndCountAll(findOptions);
    ctx.body = result;
  }

  /**
   * @summary 获取列表
   * @description 获取列表
   * @router post /api/pages/count
   * @request body CountReqData countReqData
   * @response 200 CountResponse
   */
  async count() {
    const ctx = this.ctx;
    const findOptions = getCountOptions(ctx, ctx.rule.CountReqData);
    ctx.body = await ctx.model.Page.count(findOptions);
  }

  /**
   * @summary 查看
   * @description 描述
   * @router get /api/pages/:id 路径
   * @request path string id id
   * @response 200 PageRsp
   */
  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.model.Page.findByPk(ctx.params.id);
  }

  /**
   * @summary 创建 page
   * @description
   * @router post /api/pages
   * @request body PageCreateReqData page 应用对象
   * @response 200 PageRsp
   */
  async create() {
    const ctx = this.ctx;

    ctx.validate(ctx.rule.PageCreateReqData, ctx.request.body);

    const user = await ctx.model.Page.create(ctx.request.body);
    ctx.status = 200;
    ctx.body = user;
  }

  /**
   * @summary 更新 page
   * @description
   * @router put /api/pages/:id
   * @request path string id id
   * @request body PageUpdateReqData data
   * @response 200 PageRsp
   */
  async update() {
    const ctx = this.ctx;
    ctx.validate(ctx.rule.PageUpdateReqData, ctx.request.body);
    const id = ctx.params.id;
    const page = await ctx.model.Page.findByPk(id);
    if (!page) {
      throw new Error('未找到该资源');
    }

    /** 如果只有一个参数，body 如果是 JSON string，会自动转成对象，这里再转换一下 */
    const next = await page.update(ctx.request.body);
    ctx.body = next;
  }

  /**
   * @summary 删除 app
   * @description
   * @router delete /api/pages/:id
   * @request path string id id
   * @response 200 PageRsp
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

  /**
   * @summary 删除 app
   * @description
   * @router delete /api/pages/bulkDestroy
   * @request body array[integer] ids
   * @response 200 CountResponse
   */
  async bulkDestroy() {
    const ctx = this.ctx;

    const destroyedRows = await ctx.model.Page.destroy({
      where: {
        id: {
          [Op.in]: ctx.request.body,
        },
      },
    });

    ctx.body = destroyedRows;
  }
}
