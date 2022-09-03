module.exports = class CategoryDto {
  id;
  title;

  constructor(model) {
    this.id = model.id;
    this.title = model.title;
  }
};
