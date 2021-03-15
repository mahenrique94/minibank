import mongoose from 'mongoose'

const DATABASE_NAME = 'minibank_users'

const connect = () =>
  new Promise(resolve => {
    mongoose
      .connect(`mongodb://root:root@127.0.0.1:27017/${DATABASE_NAME}?authSource=admin`, {
        authMechanism: 'SCRAM-SHA-1',
        useNewUrlParser: true,
      })
      .then(mongoose => {
        console.log(`[Mongoose] Connected at ${DATABASE_NAME}`)
        resolve(mongoose)
      })
      .catch(err => console.log(`[Mongoose] Fail connect at ${DATABASE_NAME}: ${err.message}`))
  })

export { connect }
