import fastify from 'fastify'

import CustomerController from './interface/CustomerController'
import { routes } from './interface/routes'

const createServer = ({ customerController }: { customerController: CustomerController }) => {
  const server = fastify({
    logger: true,
  })

  server.register(router => routes(router, customerController), {
    prefix: '/api/v1',
  })

  return server
}

export { createServer }
