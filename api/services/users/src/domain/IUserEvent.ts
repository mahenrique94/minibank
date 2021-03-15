interface IUserEvent {
  publish(data: { type: string; payload: any }): void
}

export default IUserEvent
