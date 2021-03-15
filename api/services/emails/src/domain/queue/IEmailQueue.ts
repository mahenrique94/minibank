import IEmailCommand from '../commands/IEmailCommand'

interface IEmailQueue {
  subscribe(command: IEmailCommand): void
}

export default IEmailQueue
