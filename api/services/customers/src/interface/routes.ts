import { FastifyInstance } from 'fastify'

import CustomerController from './CustomerController'

const routes = async (router: FastifyInstance, controller: CustomerController) => {
  router.get('/customer', controller.findAll).post('/customer', controller.create)
}

export { routes }
