import amqp from 'amqplib/callback_api'

interface IEmailCommand {
  execute(data: amqp.Message | null): void
}

export default IEmailCommand
