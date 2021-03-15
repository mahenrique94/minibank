import amqp from 'amqplib/callback_api'

import IUserCommand from '../../domain/commands/IUserCommand'
import IUserQueue from '../../domain/queue/IUserQueue'

class CustomerCreatedQueue implements IUserQueue {
  private topic = '@minibank/customers/customer_created'
  private channel: amqp.Channel
  private q: amqp.Replies.AssertQueue
  private queue: string

  constructor({ channel, q, queue }: { channel: amqp.Channel; q: amqp.Replies.AssertQueue; queue: string }) {
    this.channel = channel
    this.q = q
    this.queue = queue
  }

  subscribe(command: IUserCommand): void {
    console.log(`[Rabbit] Waiting for events at ${this.queue} queue with ${this.topic} topic`)
    this.channel.bindQueue(this.q.queue, this.queue, this.topic)
    this.channel.consume(this.q.queue, command.execute, { noAck: true })
  }
}

export default CustomerCreatedQueue
