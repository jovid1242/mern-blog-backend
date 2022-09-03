const db = require('../models')
const User = db.User
const bcrypt = require('bcrypt')
const tokenService = require('./tokenService')
const UserDto = require('../dtos/userDto');
const ApiError = require('../exceptions/apiError')

class UserService {
    async registrate(name, email, password) {
        const candidate = await User.findOne({
            where: {email}
        })
        if (candidate) {
            throw ApiError.BadRequest(`Пользователь с ${email} уже существует`)
        }
        const hashPassword = await bcrypt.hash(password, 3)

        const user = await User.create({name, email, password: hashPassword})

        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})

        return {...tokens, user: userDto}
    }

    async login(email, password) {
        const user = await User.findOne({
            where: {email}
        })
        if (!user) {
            throw ApiError.BadRequest('Пользователь не найден')
        }
        const isPassEquals = await bcrypt.compare(String(password), user.password)
        if (!isPassEquals) {
            throw ApiError.BadRequest('Неверный пароль');
        }
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})

        return {...tokens, user: userDto}
    }
}

module.exports = new UserService();