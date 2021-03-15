import mongoose from 'mongoose'

import UserSchema from './UserSchema'
import IUserModel from './IUserModel'

const UserModel = mongoose.model<IUserModel>('User', UserSchema, 'users')

export default UserModel
