import EmailError from './errors/EmailError'

class Email {
  private _body: string
  private _subject: string
  private _to: string

  constructor({ body, subject, to }: { body: string; subject: string; to: string }) {
    this.setBody(body)
    this.setSubject(subject)
    this.setTo(to)
  }

  public get body(): string {
    return this._body
  }

  private setBody(body: string): void {
    if (!body.trim()) {
      throw new EmailError('[Email] Body is a required property to send an email')
    }
    this._body = body
  }

  public get subject(): string {
    return this._subject
  }

  private setSubject(subject: string): void {
    if (!subject.trim()) {
      throw new EmailError('[Email] Subject is a required property to send an email')
    }
    this._subject = subject
  }

  public get to(): string {
    return this._to
  }

  private setTo(to: string): void {
    if (!to.trim()) {
      throw new EmailError('[Email] To is a required property to send an email')
    }
    this._to = to
  }
}

export default Email
