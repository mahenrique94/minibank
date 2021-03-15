import Boom from '@hapi/boom'
import { FastifyReply, FastifyRequest } from 'fastify'
import Validator from 'fastest-validator'

import UserApplication from '../application/UserApplication'
import IConfirmCodeDTO from '../domain/dtos/IConfirmCodeDTO'

class CustomerController {
  private userApplication: UserApplication
  private v = new Validator()

  constructor({ userApplication }: { userApplication: UserApplication }) {
    this.userApplication = userApplication
  }

  confirmCode = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    const schema = {
      email: { normalize: true, type: 'email' },
      code: { integer: true, max: 999999, min: 100000, positive: true, trim: true, type: 'number' },
    }
    const errors = this.v.validate(request.body, schema)

    if (Array.isArray(errors) && errors.length) {
      return reply.code(400).send(JSON.stringify(Boom.badRequest('Some fields has a bad format', errors)))
    }

    const { code, email } = request.body as IConfirmCodeDTO
    reply.send(
      await this.userApplication.confirmCode({
        code,
        email,
      }),
    )
  }
}

export default CustomerController
