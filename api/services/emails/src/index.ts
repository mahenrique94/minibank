import 'dotenv/config'

import { createContainer } from './container'

createContainer().then(container => container.resolve('queues'))
