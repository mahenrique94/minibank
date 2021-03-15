import Customer from '../Customer'
import CustomerError from '../CustomerError'
import ICustomerDTO from './ICustomerDTO'

class CustomerDTO {
  private _customer: Customer

  constructor(customer: Customer) {
    this.setCustomer(customer)
  }

  get customer(): Customer {
    return this._customer
  }

  private setCustomer(customer: Customer): void {
    if (!customer) {
      throw new CustomerError('[CustomerDTO] Customer its required to create new DTO')
    }
    this._customer = customer
  }

  public toDTO(): ICustomerDTO {
    return {
      id: this.customer.id,
      name: this.customer.name,
      document: this.customer.document,
      email: this.customer.email,
      created_at: this.customer.created_at,
      updated_at: this.customer.updated_at,
    }
  }
}

export default CustomerDTO
