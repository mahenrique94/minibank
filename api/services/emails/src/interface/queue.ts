import amqp from 'amqplib/callback_api'

import SendActivatedEmailCommand from '../infrastructure/commands/SendActivatedEmailCommand'
import SendSignUpEmailCommand from '../infrastructure/commands/SendSignUpEmailCommand'
import UserActivatedQueue from '../infrastructure/queue/UserActivatedQueue'
import UserCreatedQueue from '../infrastructure/queue/UserCreatedQueue'
import EmailService from '../infrastructure/services/EmailService'

const subscribeQueues = ({ rabbitChannel: channel, emailService }: { rabbitChannel: amqp.Channel; emailService: EmailService }) => {
  const queue: string = '@minibank/users'

  channel.assertExchange(queue, 'topic', {
    durable: true,
  })

  channel.assertQueue('', { exclusive: true }, (error, q) => {
    if (error) {
      throw error
    }

    new UserCreatedQueue({ channel, q, queue }).subscribe(new SendSignUpEmailCommand({ emailService }))
    new UserActivatedQueue({ channel, q, queue }).subscribe(new SendActivatedEmailCommand({ emailService }))
  })
}

export { subscribeQueues }
