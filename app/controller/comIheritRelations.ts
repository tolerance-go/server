import { Controller } from 'egg';
import { Op } from 'sequelize';
import ComIheritRelation from '../contract/dto/comIheritRelation';
// import utl from 'lodash';

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

/**
 * @controller ComIheritRelationController
 */
export default class ComIheritRelationController extends Controller {
  /**
   * @summary 获取列表
   * @description 描述
   * @router get /api/comIheritRelations 路径
   * @request query integer appId
   * @request query integer limit
   * @request query integer offset
   * @response 200 ComIheritRelationListResponse
   */
  async index() {
    const ctx = this.ctx;

    const comments = await ctx.model.ComIheritRelation.findAll({
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

    ctx.body = comments;
  }

  /**
   * @summary 查看
   * @description 描述
   * @router get /api/comIheritRelations/:id 路径
   * @request path string id id
   * @response 200 ComIheritRelationShowResponse
   */
  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.model.ComIheritRelation.findByPk(toInt(ctx.params.id));
  }

  /**
   * @summary 创建 data
   * @description
   * @router post /api/comIheritRelations
   * @request body CreationComIheritRelation data 应用对象
   * @response 200 ComIheritRelationShowResponse
   */
  async create() {
    const ctx = this.ctx;

    ctx.validate(ComIheritRelation.CreationComIheritRelation, ctx.request.body);

    const user = await ctx.model.ComIheritRelation.create(ctx.request.body);
    ctx.status = 200;
    ctx.body = user;
  }

  /**
   * @summary 更新 data
   * @description
   * @router put /api/comIheritRelations/:id
   * @request path integer id id
   * @request body UpdationComIheritRelation data 应用对象
   * @response 200 ComIheritRelationShowResponse
   */
  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const data = await ctx.model.ComIheritRelation.findByPk(id);
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
   * @router delete /api/comIheritRelations/:id
   * @request path integer id id
   * @response 200 ComIheritRelationShowResponse
   */
  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const app = await ctx.model.ComIheritRelation.findByPk(id);
    if (!app) {
      throw new Error('未找到该资源');
    }

    await app.destroy();
    ctx.body = app;
  }

  /**
   * @summary 删除 app
   * @description
   * @router delete /api/everyComIheritRelations
   * @request body array[integer] ids
   * @response 200 ComIheritRelationListResponse
   */
  async destroyEvery() {
    const ctx = this.ctx;

    let transaction;

    try {
      // get transaction
      transaction = await this.ctx.model.transaction();

      // step 1
      const comments = await ctx.model.ComIheritRelation.findAll({
        where: {
          id: {
            [Op.in]: ctx.request.body.map((item) => toInt(item)) ?? [],
          },
        },
        transaction,
      });

      await Promise.all(
        comments.map((item) =>
          item.destroy({
            transaction,
          }),
        ),
      );

      // commit
      await transaction.commit();

      ctx.body = comments;
    } catch (err) {
      // Rollback transaction only if the transaction object is defined
      if (transaction) await transaction.rollback();

      ctx.body = [];
    }
  }
}
