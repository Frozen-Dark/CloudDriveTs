"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserDto {
    constructor(model) {
        this.id = model.id;
        this.email = model.email;
        this.password = model.password;
        this.storageLimit = model.storageLimit;
        this.userStorage = model.userStorage;
        this.isActivated = model.isActivated;
        this.activationLink = model.activationLink;
        this.avatar = model.avatar;
        this.userName = model.userName;
    }
}
exports.default = UserDto;
