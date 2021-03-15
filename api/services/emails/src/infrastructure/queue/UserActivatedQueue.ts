import amqp from 'amqplib/callback_api'

import IEmailCommand from '../../domain/commands/IEmailCommand'
import IEmailQueue from '../../domain/queue/IEmailQueue'

class UserActivatedQueue implements IEmailQueue {
  private topic = '@minibank/users/user_activated'
  private channel: amqp.Channel
  private q: amqp.Replies.AssertQueue
  private queue: string

  constructor({ channel, q, queue }: { channel: amqp.Channel; q: amqp.Replies.AssertQueue; queue: string }) {
    this.channel = channel
    this.q = q
    this.queue = queue
  }

  subscribe(command: IEmailCommand): void {
    console.log(`[Rabbit] Waiting for events at ${this.queue} queue with ${this.topic} topic`)
    this.channel.bindQueue(this.q.queue, this.queue, this.topic)
    this.channel.consume(this.q.queue, command.execute, { noAck: true })
  }
}

export default UserActivatedQueue
