'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class posts_tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  posts_tag.init({
    post_id: DataTypes.INTEGER,
    tag_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'posts_tag',
    tableName: "posts_tags",
  });
  return posts_tag;
};