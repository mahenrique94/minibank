import amqp from 'amqplib/callback_api'

const connect = (): Promise<amqp.Channel> =>
  new Promise(resolve => {
    amqp.connect('amqp://root:root@127.0.0.1:5672', (errorConnection, connection) => {
      if (errorConnection) {
        throw errorConnection
      }
      console.log('[Rabbit] Connected with successfully')

      connection.createChannel((errorChannel, channel) => {
        if (errorChannel) {
          throw errorChannel
        }
        console.log('[Rabbit] Channel created with successfully')

        resolve(channel)
      })
    })
  })

export { connect }
