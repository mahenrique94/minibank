import amqp from 'amqplib/callback_api'

import Email from '../../domain/Email'
import IEmailCommand from '../../domain/commands/IEmailCommand'
import EmailService from '../services/EmailService'

class SendSignUpEmail implements IEmailCommand {
  private emailService: EmailService

  constructor({ emailService }: { emailService: EmailService }) {
    this.emailService = emailService
  }

  execute = async (message: amqp.Message): Promise<void> => {
    const data = JSON.parse(message.content.toString())
    this.emailService.sendEmail(
      new Email({
        to: data.payload.email,
        subject: 'Confirm your sign up process',
        body: `<h1>Hi ${data.payload.name}, thanks for your sign up</h1><br/><p>Please confirm if your email it's valid</p><p>Verification code: ${data.payload.code}</p><br/><small>Thanks Minibank</small>`,
      }),
    )
  }
}

export default SendSignUpEmail
