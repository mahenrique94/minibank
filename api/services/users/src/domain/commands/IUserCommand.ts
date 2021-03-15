import amqp from 'amqplib/callback_api'

interface IUsersCommand {
  execute(data: amqp.Message | null): void
}

export default IUsersCommand
