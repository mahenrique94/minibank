import amqp from 'amqplib/callback_api'
import IUserEvent from '../domain/IUserEvent'
import IUserRepository from '../domain/IUserRepository'
import CreateNewUserCommand from '../infrastructure/commands/CreateNewUserCommand'
import CustomerCreatedQueue from '../infrastructure/queue/CustomerCreatedQueue'

const subscribeQueues = ({
  rabbitChannel: channel,
  userRepository,
  userEvent,
}: {
  rabbitChannel: amqp.Channel
  userRepository: IUserRepository
  userEvent: IUserEvent
}) => {
  const queue: string = '@minibank/customers'

  channel.assertExchange(queue, 'topic', {
    durable: true,
  })

  channel.assertQueue('', { exclusive: true }, (error, q) => {
    if (error) {
      throw error
    }

    new CustomerCreatedQueue({ channel, q, queue }).subscribe(new CreateNewUserCommand({ userRepository, userEvent }))
  })
}

export { subscribeQueues }
