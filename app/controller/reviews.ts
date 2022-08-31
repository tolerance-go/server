import { Controller } from 'egg';
import { Op } from 'sequelize';
import { getFindOptions } from '../helpers/getFindOptions';
import { toInt } from '../utils/toInt';

/**
 * @controller ReviewController
 */
export default class ReviewController extends Controller {
  /**
   * @summary 获取列表
   * @description 描述
   * @router get /api/reviews 路径
   * @request query integer limit limit
   * @request query integer offset offset
   * @response 200 ReviewListResponse
   */
  async index() {
    const ctx = this.ctx;

    ctx.body = await ctx.model.Review.findAll({
      limit: toInt(ctx.query.limit),
      offset: toInt(ctx.query.offset),
      order: [['created_at', 'DESC']],
    });
  }

  /**
   * @summary 获取列表
   * @description 获取列表
   * @router post /api/reviews/findAll
   * @request body SearchReqData findOptions
   * @response 200 ReviewListResponse
   */
  async findAll() {
    const ctx = this.ctx;
    const findOptions = getFindOptions(ctx, ctx.rule.SearchReqData);
    const result = await ctx.model.Review.findAll(findOptions);
    ctx.body = result;
  }

  /**
   * @summary 获取列表
   * @description 获取列表
   * @router post /api/reviews/findAndCountAll
   * @request body SearchReqData findOptions
   * @response 200 ReviewListAndCountResponse
   */
  async findAndCountAll() {
    const ctx = this.ctx;
    const findOptions = getFindOptions(ctx, ctx.rule.SearchReqData);
    const result = await ctx.model.Review.findAndCountAll(findOptions);
    ctx.body = result;
  }

  /**
   * @summary 查看
   * @description 描述
   * @router get /api/reviews/:id 路径
   * @request path string id id
   * @response 200 ReviewShowResponse
   */
  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.model.Review.findByPk(ctx.params.id);
  }

  /**
   * @summary 创建 app
   * @description
   * @router post /api/reviews
   * @request body CreationReview app 应用对象
   * @response 200 ReviewShowResponse
   */
  async create() {
    const ctx = this.ctx;

    ctx.validate(ctx.rule.CreationReview, ctx.request.body);

    ctx.body = await ctx.model.Review.create({
      ...ctx.request.body,
      userId: ctx.user.id,
    });
    ctx.status = 200;
  }

  /**
   * @summary 更新 app
   * @description
   * @router put /api/reviews/:id
   * @request path string id id
   * @request body UpdationReview data
   * @response 200 ReviewShowResponse
   */
  async update() {
    const ctx = this.ctx;

    ctx.validate(ctx.rule.UpdationReview, ctx.request.body);

    const id = ctx.params.id;
    const target = await ctx.model.Review.findByPk(id);
    if (!target) {
      throw new Error('未找到该资源');
    }
    await target.update(ctx.request.body);
    ctx.body = target;
  }

  /**
   * @summary 删除 app
   * @description
   * @router delete /api/reviews/:id
   * @request path string id id
   * @response 200 ReviewShowResponse
   */
  async destroy() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    const target = await ctx.model.Review.findByPk(id);
    if (!target) {
      throw new Error('未找到该资源');
    }

    await target.destroy();
    ctx.status = 200;
  }

  /**
   * @summary 删除 app
   * @description
   * @router delete /api/reviews/bulkDestroy
   * @request body array[integer] ids
   * @response 200 CountResponse
   */
  async bulkDestroy() {
    const ctx = this.ctx;

    const destroyedRows = await ctx.model.Review.destroy({
      where: {
        id: {
          [Op.in]: ctx.request.body,
        },
      },
    });

    ctx.body = destroyedRows;
  }
}
