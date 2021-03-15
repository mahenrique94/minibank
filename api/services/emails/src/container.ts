import * as awilix from 'awilix'
import * as nodemailer from 'nodemailer'

import { environment } from './environment'
import EmailService from './infrastructure/services/EmailService'
import { subscribeQueues } from './interface/queue'
import { connect as connectRabbit } from './rabbit'

const createContainer = async () => {
  const channel = await connectRabbit()
  const Container = awilix.createContainer()
  const libraries = {
    nodemailer,
  }

  return Container.register({ environment: awilix.asValue(environment) })
    .register({
      rabbitChannel: awilix.asValue(channel),
    })
    .register({
      queues: awilix.asFunction(subscribeQueues),
    })
    .register({
      emailService: awilix.asClass(EmailService).inject(() => ({ libraries })),
    })
}

export { createContainer }
