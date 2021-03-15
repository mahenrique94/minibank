import amqp from 'amqplib/callback_api'

import IUserCommand from '../../domain/commands/IUserCommand'
import IUserEvent from '../../domain/IUserEvent'
import IUserRepository from '../../domain/IUserRepository'

class CreateNewUserCommand implements IUserCommand {
  private repository: IUserRepository
  private event: IUserEvent

  constructor({ userRepository, userEvent }: { userRepository: IUserRepository; userEvent: IUserEvent }) {
    this.repository = userRepository
    this.event = userEvent
  }

  execute = async (message: amqp.Message): Promise<void> => {
    const data = JSON.parse(message.content.toString())
    const newUser = await this.repository.create({
      customer_id: data.payload.id,
      email: data.payload.email,
      password: data.payload.password,
    })
    this.event.publish({
      type: 'user_created',
      payload: {
        name: data.payload.name,
        email: newUser.email,
        code: newUser.code,
      },
    })
  }
}

export default CreateNewUserCommand
