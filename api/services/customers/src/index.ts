import { FastifyInstance } from 'fastify'

import { createContainer } from './container'
import { environment } from './environment'

createContainer().then(container => {
  const server: FastifyInstance = container.resolve('server')
  server.listen(environment.api.port, environment.api.host, async (error: Error, address: string) => {
    if (error) {
      console.error(error)
      process.exit(1)
    }

    console.log(`[Fastify] Server running at ${address}`)
    console.log('[Fastify] Press CTRL+C to stop it')
  })
})
