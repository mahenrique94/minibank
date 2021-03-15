class CustomerError extends Error {
  constructor(message: string) {
    super(message)
  }
}

export default CustomerError
