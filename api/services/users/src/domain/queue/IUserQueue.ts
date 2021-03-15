import IUserCommand from '../commands/IUserCommand'

interface IUserQueue {
  subscribe(command: IUserCommand): void
}

export default IUserQueue
