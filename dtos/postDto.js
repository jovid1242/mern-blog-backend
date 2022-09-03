module.exports = class PostDto {
  id;
  title;
  text;
  imageUrl;
  viewCount;

  constructor(model) {
    this.id = model.id;
    this.title = model.title;
    this.text = model.text;
    this.imageUrl = model.imageUrl;
    this.viewCount = model.viewCount;
  }
};
