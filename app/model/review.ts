import { Application } from 'egg';
import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';

export interface ReviewModel
  extends Model<
    InferAttributes<ReviewModel>,
    InferCreationAttributes<ReviewModel>
  > {
  // Some fields are optional when calling UserModel.create() or UserModel.build()
  id: CreationOptional<string>;
  // 评分
  rateNum: number;
  // 评论内容
  content: string;
  createdAt: CreationOptional<string>;
  updatedAt: CreationOptional<string>;
  userId: CreationOptional<string>;
  reviewId: CreationOptional<string>;
  widgetId: CreationOptional<string>;
  widgetGroupId: CreationOptional<string>;
  widgetLibId: CreationOptional<string>;
}

export default (app: Application) => {
  const { STRING, UUID, INTEGER, UUIDV4, DATE } = app.Sequelize;

  const Review = app.model.define<ReviewModel>('review', {
    id: {
      type: UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    content: STRING,
    rateNum: INTEGER,
    createdAt: { type: DATE, field: 'created_at' },
    updatedAt: { type: DATE, field: 'updated_at' },
    userId: { type: UUID, field: 'user_id' },
    reviewId: { type: UUID, field: 'review_id' },
    widgetId: { type: UUID, field: 'widget_id' },
    widgetGroupId: { type: UUID, field: 'widgetGroup_id' },
    widgetLibId: { type: UUID, field: 'widgetLib_id' },
  });

  (
    Review as typeof Review & {
      associate: () => void;
    }
  ).associate = () => {
    app.model.Review.hasOne(app.model.Review);
    app.model.Review.belongsTo(app.model.Review);
    app.model.Review.belongsTo(app.model.Widget);
    app.model.Review.belongsTo(app.model.WidgetGroup);
    app.model.Review.belongsTo(app.model.WidgetLib);
  };

  return Review;
};
