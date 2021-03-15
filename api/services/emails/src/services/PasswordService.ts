import * as bcrypt from 'bcrypt'

class PasswordService {
  private saltRounds = 10
  private bcrypt: typeof bcrypt

  constructor({ libraries }: { libraries: { bcrypt: typeof bcrypt } }) {
    this.bcrypt = libraries.bcrypt
  }

  hash(password: string) {
    return this.bcrypt.hashSync(password, this.saltRounds)
  }
}

export default PasswordService
