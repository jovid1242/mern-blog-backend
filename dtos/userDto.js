module.exports = class UserDto {
    instaName;
    id;
    name;
    activated;
    status

    constructor(model) {
        this.instaName = model.instaName;
        this.id = model.id;
        this.name = model.name;
        this.activated = model.activated;
        this.status = model.status
    }
}