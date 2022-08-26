import { Application } from 'egg';
import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';

export interface CommentModel
  extends Model<
    InferAttributes<CommentModel>,
    InferCreationAttributes<CommentModel>
  > {
  // Some fields are optional when calling UserModel.create() or UserModel.build()
  id: CreationOptional<string>;
  createdAt: CreationOptional<string>;
  updatedAt: CreationOptional<string>;
  discussId: string;
  content: string;
  replyTo: CreationOptional<string>;
  likeNum: CreationOptional<number>;
  dislikeNum: CreationOptional<number>;
  commentId: CreationOptional<string>;
}

export default (app: Application) => {
  const { STRING, UUID, UUIDV4, INTEGER, DATE } = app.Sequelize;

  const Comment = app.model.define<CommentModel>('comment', {
    id: {
      type: UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    createdAt: { type: DATE, field: 'created_at' },
    updatedAt: { type: DATE, field: 'updated_at' },
    discussId: {
      type: UUID,
      field: 'discuss_id',
    },
    content: STRING,
    replyTo: {
      type: UUID,
      field: 'reply_to',
    },
    likeNum: {
      type: INTEGER,
      field: 'like_num',
    },
    dislikeNum: {
      type: INTEGER,
      field: 'dislike_num',
    },
    commentId: {
      type: UUID,
      field: 'comment_id',
    },
  });

  (
    Comment as typeof Comment & {
      associate: () => void;
    }
  ).associate = () => {
    app.model.Comment.belongsTo(app.model.Discuss);
    app.model.Comment.hasOne(app.model.Comment);
    app.model.Comment.belongsTo(app.model.Comment);
  };

  return Comment;
};
