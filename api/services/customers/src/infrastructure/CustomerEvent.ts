import { Channel } from 'amqplib'

import ICustomerEvent from '../domain/ICustomerEvent'

class CustomerEvent implements ICustomerEvent {
  private queue: string = '@minibank/customers'
  private channel: Channel

  constructor({ rabbitChannel }: { rabbitChannel: Channel }) {
    this.channel = rabbitChannel
  }

  publish(data: { type: string; payload: any }): void {
    this.channel.assertExchange(this.queue, 'topic', { durable: true })
    this.channel.publish(this.queue, `${this.queue}/${data.type}`, Buffer.from(JSON.stringify(data)), { persistent: true })
    console.log('[Rabbit] Sent a new customer created', this.queue)
  }
}

export default CustomerEvent
