import CustomerDTO from '../domain/dtos/CustomerDTO'
import CustomersDTO from '../domain/dtos/CustomersDTO'
import ICustomerRespository from '../domain/ICustomerRespository'
import ICustomerCreateDTO from '../domain/dtos/ICustomerCreateDTO'
import ICustomerDTO from '../domain/dtos/ICustomerDTO'
import ICustomerEvent from '../domain/ICustomerEvent'
import CustomerCreatedCommand from '../domain/commands/CustomerCreatedCommand'
import Customer from '../domain/Customer'

class CustomerApplication {
  private customerEvent: ICustomerEvent
  private customerRepository: ICustomerRespository

  constructor({ customerEvent, customerRepository }: { customerEvent: ICustomerEvent; customerRepository: ICustomerRespository }) {
    this.customerEvent = customerEvent
    this.customerRepository = customerRepository
  }

  async create(data: ICustomerCreateDTO): Promise<ICustomerDTO> {
    const newCustomer = await this.customerRepository.create(data)
    await this.customerEvent.publish(
      new CustomerCreatedCommand(
        new Customer({
          _id: newCustomer.id,
          name: newCustomer.name,
          document: newCustomer.document,
          email: newCustomer.email,
          password: data.password,
        }),
      ).execute(),
    )
    return new CustomerDTO(newCustomer).toDTO()
  }

  async findAll(): Promise<ICustomerDTO[]> {
    const allCustomers = await this.customerRepository.findAll()
    return new CustomersDTO(allCustomers).toDTO()
  }
}

export default CustomerApplication
