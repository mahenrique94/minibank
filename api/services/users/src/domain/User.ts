import UserError from './errors/UserError'

class User {
  private _id?: string
  private _customer_id: string
  private _email: string
  private _password: string
  private _code?: string
  private _active: boolean
  private _created_at: Date
  private _updated_at: Date

  constructor({
    _id: id,
    customer_id,
    email,
    password,
    code,
    active,
  }: {
    _id?: string
    customer_id: string
    email: string
    password: string
    code?: string
    active?: boolean
  }) {
    this.setId(id)
    this.setCustomerId(customer_id)
    this.setEmail(email)
    this.setPassword(password)
    this.setCode(code)
    this.setActive(active)
    this.setCreatedAt()
    this.setUpdatedAt()
  }

  public get id(): string | undefined {
    return this._id
  }

  private setId(id?: string): void {
    this._id = id
  }

  public get customer_id(): string {
    return this._customer_id
  }

  private setCustomerId(customer_id: string): void {
    if (!customer_id.trim()) {
      throw new UserError('[User] Customer ID is a required field to create new customers')
    }
    this._customer_id = customer_id
  }

  public get email(): string {
    return this._email
  }

  private setEmail(email: string): void {
    if (!email.trim()) {
      throw new UserError('[User] Email is a required field to create new customers')
    }
    this._email = email
  }

  public get password(): string {
    return this._password
  }

  private setPassword(password: string): void {
    if (!password.trim()) {
      throw new UserError('[User] Password is a required field to create new customers')
    }
    this._password = password
  }

  public get code(): string | undefined {
    return this._code
  }

  private setCode(code?: string): void {
    this._code = code
  }

  public get active(): boolean {
    return this._active
  }

  private setActive(active?: boolean): void {
    if (!this.id) {
      this._active = false
    }
    this._active = active ? active : false
  }

  public get created_at(): Date {
    return this._created_at
  }

  private setCreatedAt(): void {
    if (!this.id) {
      this._created_at = new Date()
    }
  }

  public get updated_at(): Date {
    return this._updated_at
  }

  private setUpdatedAt(): void {
    this._updated_at = new Date()
  }
}

export default User
