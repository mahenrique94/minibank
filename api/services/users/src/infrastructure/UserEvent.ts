import { Channel } from 'amqplib'

import IUserEvent from '../domain/IUserEvent'

class UserEvent implements IUserEvent {
  private queue: string = '@minibank/users'
  private channel: Channel

  constructor({ rabbitChannel }: { rabbitChannel: Channel }) {
    this.channel = rabbitChannel
  }

  publish(data: { type: string; payload: any }): void {
    this.channel.assertExchange(this.queue, 'topic', { durable: true })
    this.channel.publish(this.queue, `${this.queue}/${data.type}`, Buffer.from(JSON.stringify(data)), { persistent: true })
    console.log('[Rabbit] Sent a new user created', this.queue)
  }
}

export default UserEvent
