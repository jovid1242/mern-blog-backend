module.exports = class PostDto {
  id;
  title;
  text;
  imageUrl;
  viewCount;
  category;
  user_id;

  constructor(model) {
    this.id = model.id;
    this.title = model.title;
    this.text = model.text;
    this.imageUrl = model.imageUrl;
    this.viewCount = model.viewCount;
    this.category = model.category;
    this.user_id = model.user_id;
  }
};
