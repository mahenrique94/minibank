import IUserCreateDTO from './dtos/IUserCreateDTO'
import User from './User'

interface IUserRepository {
  create(data: IUserCreateDTO): Promise<User>
}

export default IUserRepository
