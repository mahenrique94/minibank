import IUserEvent from '../domain/IUserEvent'
import UserRepository from '../infrastructure/UserRepository'

class UserApplication {
  private userRepository: UserRepository
  private userEvent: IUserEvent

  constructor({ userRepository, userEvent }: { userRepository: UserRepository; userEvent: IUserEvent }) {
    this.userRepository = userRepository
    this.userEvent = userEvent
  }

  async confirmCode({ code, email }: { code: string; email: string }): Promise<{ message: string }> {
    const user = await this.userRepository.confirmCode({ code, email })
    this.userEvent.publish({
      type: 'user_activated',
      payload: {
        email: user.email,
        user_id: user.id,
      },
    })
    return { message: 'Your account has been validated with success' }
  }
}

export default UserApplication
