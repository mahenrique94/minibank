import amqp from 'amqplib/callback_api'

import Email from '../../domain/Email'
import IEmailCommand from '../../domain/commands/IEmailCommand'
import EmailService from '../services/EmailService'

class SendActivatedEmailCommand implements IEmailCommand {
  private emailService: EmailService

  constructor({ emailService }: { emailService: EmailService }) {
    this.emailService = emailService
  }

  execute = async (message: amqp.Message): Promise<void> => {
    const data = JSON.parse(message.content.toString())
    this.emailService.sendEmail(
      new Email({
        to: data.payload.email,
        subject: 'Thank you for activate your account',
        body: `<p>Welcome to our bank, we're analyzing your informations, soon you'll receive new status about your account</p><br/><small>Thanks Minibank</small>`,
      }),
    )
  }
}

export default SendActivatedEmailCommand
