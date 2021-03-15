import Customer from '../Customer'
import CustomerDTO from './CustomerDTO'
import CustomerError from '../CustomerError'
import ICustomerDTO from './ICustomerDTO'

class CustomersDTO {
  private _customers: Customer[]

  constructor(customers: Customer[]) {
    this.setCustomers(customers)
  }

  get customers(): Customer[] {
    return this._customers
  }

  private setCustomers(customers: Customer[]): void {
    if (customers.length === 0) {
      throw new CustomerError('[CustomerDTO] Customers are required to create new DTO')
    }
    this._customers = customers
  }

  public toDTO(): ICustomerDTO[] {
    return this.customers.map(customer => new CustomerDTO(customer).toDTO())
  }
}

export default CustomersDTO
