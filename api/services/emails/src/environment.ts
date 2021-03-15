interface Environment {
  email: {
    host: string | undefined
    password: string | undefined
    port: number | undefined
    user: string | undefined
  }
}

const environment: Environment = {
  email: {
    host: process.env.EMAIL_HOST,
    password: process.env.EMAIL_PASSWORD,
    port: parseInt(process.env.EMAIL_PORT || '', 0),
    user: process.env.EMAIL_USER,
  },
}

console.log(process.env.EMAIL_HOST)

export { environment }
