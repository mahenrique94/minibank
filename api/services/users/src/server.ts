import fastify from 'fastify'

import UserController from './interface/UserController'
import { routes } from './interface/routes'

const createServer = ({ userController }: { userController: UserController }) => {
  const server = fastify({
    logger: true,
  })

  server.register(router => routes(router, userController), {
    prefix: '/api/v1',
  })

  return server
}

export { createServer }
