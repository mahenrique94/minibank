import { FastifyInstance } from 'fastify'

import UserController from './UserController'

const routes = async (router: FastifyInstance, controller: UserController) => {
  router.post('/user/confirm-code', controller.confirmCode)
}

export { routes }
