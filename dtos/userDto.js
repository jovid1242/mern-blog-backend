module.exports = class UserDto {
  id;
  name;
  email;
  password;
  info;
  status;
  social;
  imageUrl;

  constructor(model) {
    this.id = model.id;
    this.name = model.name;
    this.email = model.email;
    this.password = model.password;
    this.info = model.info;
    this.status = model.status;
    this.social = model.social;
    this.imageUrl = model.imageUrl;
  }
};
