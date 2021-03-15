interface ICustomerCommand {
  execute(): { type: string; payload: any }
}

export default ICustomerCommand
