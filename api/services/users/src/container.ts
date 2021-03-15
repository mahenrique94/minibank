import * as awilix from 'awilix'
import * as bcrypt from 'bcrypt'

import UserApplication from './application/UserApplication'
import { connect as connectDatabase } from './database'
import PasswordService from './infrastructure/services/PasswordService'
import UserEvent from './infrastructure/UserEvent'
import UserRepository from './infrastructure/UserRepository'
import UserModel from './infrastructure/UserModel'
import UserController from './interface/UserController'
import { subscribeQueues } from './interface/queue'
import { connect as connectRabbit } from './rabbit'
import { createServer } from './server'

const createContainer = async () => {
  const mongoose = await connectDatabase()
  const channel = await connectRabbit()
  const Container = awilix.createContainer()
  const libraries = {
    bcrypt,
  }

  return Container.register({
    mongooseInstance: awilix.asValue(mongoose),
  })
    .register({
      rabbitChannel: awilix.asValue(channel),
    })
    .register({
      userModel: awilix.asValue(UserModel),
    })
    .register({
      userRepository: awilix.asClass(UserRepository),
    })
    .register({
      userEvent: awilix.asClass(UserEvent),
    })
    .register({
      queues: awilix.asFunction(subscribeQueues),
    })
    .register({
      passwordService: awilix.asClass(PasswordService).inject(() => ({ libraries })),
    })
    .register({
      userApplication: awilix.asClass(UserApplication),
    })
    .register({
      userController: awilix.asClass(UserController),
    })
    .register({
      server: awilix.asFunction(createServer),
    })
}

export { createContainer }
