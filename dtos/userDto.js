module.exports = class UserDto {
  id;
  username;
  email;
  password;
  bio;
  status;
  picture;
  followers;
  following;

  constructor(model) {
    this.id = model.id;
    this.username = model.username;
    this.email = model.email;
    this.password = model.password;
    this.bio = model.bio;
    this.status = model.status;
    this.picture = model.picture;
    this.follower = model.followers;
    this.following = model.following;
  }
};
