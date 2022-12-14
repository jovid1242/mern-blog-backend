"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Posts.init(
    {
      title: DataTypes.STRING,
      text: DataTypes.TEXT,
      imageUrl: DataTypes.STRING,
      viewCount: DataTypes.INTEGER,
      category: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Posts",
      tableName: "posts",
    }
  );
  return Posts;
};
