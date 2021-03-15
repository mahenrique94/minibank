import verificationCode from 'generate-sms-verification-code'

import IUserRepository from '../domain/IUserRepository'
import IUserCreateDTO from '../domain/dtos/IUserCreateDTO'
import User from '../domain/User'

import PasswordService from './services/PasswordService'

import UserModel from './UserModel'
import IConfirmCodeDTO from '../domain/dtos/IConfirmCodeDTO'

class UserRepository implements IUserRepository {
  private userModel: typeof UserModel
  private passwordService: PasswordService

  constructor({ userModel, passwordService }: { userModel: typeof UserModel; passwordService: PasswordService }) {
    this.userModel = userModel
    this.passwordService = passwordService
  }

  async create(data: IUserCreateDTO): Promise<User> {
    const user = new User(data)
    const newUser = await this.userModel.create({
      customer_id: user.customer_id,
      email: user.email,
      password: this.passwordService.hash(user.password),
      code: verificationCode(6, { type: 'number' }),
      active: user.active,
      created_at: user.created_at,
      updated_at: user.updated_at,
    })
    return new User(newUser)
  }

  async confirmCode(data: IConfirmCodeDTO): Promise<User> {
    return await this.userModel.findOneAndUpdate(
      { code: data.code.toString(), email: data.email, active: false },
      { $set: { active: true }, code: undefined },
    )
  }
}

export default UserRepository
