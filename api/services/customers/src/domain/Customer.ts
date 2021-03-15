import CustomerError from './CustomerError'

class Customer {
  private _id?: string
  private _name: string
  private _document: string
  private _email: string
  private _password?: string | undefined
  private _created_at: Date
  private _updated_at: Date

  constructor({
    _id: id,
    name,
    document,
    email,
    password,
  }: {
    _id?: string
    name: string
    document: string
    email: string
    password?: string
  }) {
    this.setId(id)
    this.setName(name)
    this.setDocument(document)
    this.setEmail(email)
    this.setCreatedAt()
    this.setUpdatedAt()
    this.setPassword(password)
  }

  public get id(): string | undefined {
    return this._id
  }

  private setId(id?: string): void {
    this._id = id
  }

  public get name(): string {
    return this._name
  }

  private setName(name: string): void {
    if (!name.trim()) {
      throw new CustomerError('[Customer] Name is a required field to create new customers')
    }
    this._name = name
  }

  public get document(): string {
    return this._document
  }

  private setDocument(document: string): void {
    if (!document.trim()) {
      throw new CustomerError('[Customer] Document is a required field to create new customers')
    }
    this._document = document
  }

  public get email(): string {
    return this._email
  }

  private setEmail(email: string): void {
    if (!email.trim()) {
      throw new CustomerError('[Customer] Email is a required field to create new customers')
    }
    this._email = email
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

  public get password(): string | undefined {
    return this._password
  }

  private setPassword(password?: string): void {
    this._password = password
  }
}

export default Customer
