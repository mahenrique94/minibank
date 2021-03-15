import Boom from '@hapi/boom'
import { FastifyReply, FastifyRequest } from 'fastify'
import Validator from 'fastest-validator'

import CustomerApplication from '../application/CustomerApplication'
import ICustomerCreateDTO from '../domain/dtos/ICustomerCreateDTO'

class CustomerController {
  private customerApplication: CustomerApplication
  private v = new Validator()

  constructor({ customerApplication }: { customerApplication: CustomerApplication }) {
    this.customerApplication = customerApplication
  }

  create = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    const schema = {
      document: { pattern: /^(([\d]{3})([.])([\d]{3})([.])([\d]{3})([-])([\d]{2}))$/, trim: true, type: 'string' },
      email: { normalize: true, type: 'email' },
      name: { max: 120, min: 2, trim: true, type: 'string' },
      password: { max: 255, min: 8, trim: true, type: 'string' },
    }
    const errors = this.v.validate(request.body, schema)

    if (Array.isArray(errors) && errors.length) {
      return reply.code(400).send(JSON.stringify(Boom.badRequest('Some fields has a bad format', errors)))
    }

    const { name, document, email, password } = request.body as ICustomerCreateDTO
    reply.send(
      await this.customerApplication.create({
        name,
        document,
        email,
        password,
      }),
    )
  }

  findAll = async (_: FastifyRequest, reply: FastifyReply): Promise<void> => {
    reply.send(await this.customerApplication.findAll())
  }
}

export default CustomerController
