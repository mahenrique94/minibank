interface ICustomerEvent {
  publish(data: { type: string; payload: any }): void
}

export default ICustomerEvent
