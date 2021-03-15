import ICustomerCommand from './ICustomerCommand'

import Customer from '../Customer'

interface Payload {
  document: string
  email: string
  id: string | undefined
  name: string
  password: string | undefined
}

class CustomerCreatedCommand implements ICustomerCommand {
  public type: string = 'customer_created'
  public payload: Payload

  constructor(newCustomer: Customer) {
    this.payload = {
      document: newCustomer.document,
      email: newCustomer.email,
      id: newCustomer.id,
      name: newCustomer.name,
      password: newCustomer.password,
    }
  }

  public execute(): { type: string; payload: Payload } {
    return {
      type: this.type,
      payload: this.payload,
    }
  }
}

export default CustomerCreatedCommand
