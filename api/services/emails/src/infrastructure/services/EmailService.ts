import * as nodemailer from 'nodemailer'

import Email from '../../domain/Email'
import { environment } from '../../environment'

class EmailService {
  private config: typeof environment
  private nodemailer: typeof nodemailer
  private transport: nodemailer.Transporter

  constructor({ environment: config, libraries }: { environment: typeof environment; libraries: { nodemailer: typeof nodemailer } }) {
    this.nodemailer = libraries.nodemailer
    this.config = config
  }

  public async sendEmail(email: Email): Promise<void> {
    if (!this.transport) {
      try {
        this.transport = await this.nodemailer.createTransport({
          host: this.config.email.host,
          port: this.config.email.port,
          auth: {
            user: this.config.email.user,
            pass: this.config.email.password,
          },
        })
      } catch (error) {
        console.log("It's not create a new transport email:", error.message)
      }
    }

    try {
      await this.transport.sendMail({
        html: email.body,
        from: 'Minibank <noreply@minibank.com.br>',
        subject: email.subject,
        to: email.to,
      })
    } catch (error) {
      console.log("It's not possible send an email:", error.message)
    }
  }
}

export default EmailService
