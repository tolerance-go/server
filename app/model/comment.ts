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
  id: CreationOptional<number>;
  createdAt: CreationOptional<string>;
  updatedAt: CreationOptional<string>;
  discussId: number;
  content: string;
  replyTo: CreationOptional<number>;
  likeNum: CreationOptional<number>;
  dislikeNum: CreationOptional<number>;
}

export default (app: Application) => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Comment = app.model.define<CommentModel>('comment', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    createdAt: { type: DATE, field: 'created_at' },
    updatedAt: { type: DATE, field: 'updated_at' },
    discussId: {
      type: INTEGER,
      field: 'discuss_id',
    },
    content: STRING,
    replyTo: {
      type: INTEGER,
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
  });

  (
    Comment as typeof Comment & {
      associate: () => void;
    }
  ).associate = () => {
    app.model.Comment.belongsTo(app.model.Discuss);
  };

  return Comment;
};
