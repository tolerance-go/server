import { Controller } from 'egg';
import { Op } from 'sequelize';
import CommentDto from '../contract/dto/comment';
// import utl from 'lodash';

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

/**
 * @controller CommentController
 */
export default class CommentController extends Controller {
  /**
   * @summary 获取列表
   * @description 描述
   * @router get /api/comments 路径
   * @request query integer discussId discussId
   * @request query integer limit limit
   * @request query integer offset offset
   * @response 200 CommentListResponse
   */
  async index() {
    const ctx = this.ctx;

    const comments = await ctx.model.Comment.findAll({
      limit: toInt(ctx.query.limit),
      offset: toInt(ctx.query.offset),
      order: [['created_at', 'ASC']],
      where: {
        ...(ctx.query.discussId && {
          discuss_id: {
            [Op.eq]: ctx.query.discussId,
          },
        }),
      },
    });

    ctx.body = comments;
  }

  /**
   * @summary 查看
   * @description 描述
   * @router get /api/comments/:id 路径
   * @request path string id id
   * @response 200 CommentShowResponse
   */
  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.model.Comment.findByPk(toInt(ctx.params.id));
  }

  /**
   * @summary 创建 data
   * @description
   * @router post /api/comments
   * @request body CreationComment data 应用对象
   * @response 200 CommentShowResponse
   */
  async create() {
    const ctx = this.ctx;

    ctx.validate(CommentDto.CreationComment, ctx.request.body);

    const user = await ctx.model.Comment.create(ctx.request.body);
    ctx.status = 200;
    ctx.body = user;
  }

  /**
   * @summary 更新 data
   * @description
   * @router put /api/comments/:id
   * @request path integer id id
   * @request body UpdationComment data 应用对象
   * @response 200 CommentShowResponse
   */
  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const data = await ctx.model.Comment.findByPk(id);
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
   * @router delete /api/comments/:id
   * @request path integer id id
   * @response 200 CommentShowResponse
   */
  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const app = await ctx.model.Comment.findByPk(id);
    if (!app) {
      throw new Error('未找到该资源');
    }

    await app.destroy();
    ctx.body = app;
  }

  /**
   * @summary 删除 app
   * @description
   * @router delete /api/every-comments
   * @request body array[integer] ids
   * @response 200 CommentListResponse
   */
  async destroyEvery() {
    const ctx = this.ctx;

    let transaction;

    try {
      // get transaction
      transaction = await this.ctx.model.transaction();

      // step 1
      const comments = await ctx.model.Comment.findAll({
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

      throw new Error('删除失败');
    }
  }
}
