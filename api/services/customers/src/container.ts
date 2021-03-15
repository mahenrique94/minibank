import * as awilix from 'awilix'

import CustomerApplication from './application/CustomerApplication'
import { connect as connectDatabase } from './database'
import CustomerController from './interface/CustomerController'
import CustomerEvent from './infrastructure/CustomerEvent'
import CustomerRepository from './infrastructure/CustomerRepository'
import CustomerModel from './infrastructure/CustomerModel'
import { connect as connectRabbit } from './rabbit'
import { createServer } from './server'

const createContainer = async () => {
  const mongoose = await connectDatabase()
  const channel = await connectRabbit()
  const Container = awilix.createContainer()

  return Container.register({
    mongooseInstance: awilix.asValue(mongoose),
  })
    .register({
      rabbitChannel: awilix.asValue(channel),
    })
    .register({
      customerModel: awilix.asValue(CustomerModel),
    })
    .register({
      customerRepository: awilix.asClass(CustomerRepository),
    })
    .register({
      customerEvent: awilix.asClass(CustomerEvent),
    })
    .register({
      customerApplication: awilix.asClass(CustomerApplication),
    })
    .register({
      customerController: awilix.asClass(CustomerController),
    })
    .register({
      server: awilix.asFunction(createServer),
    })
}

export { createContainer }
