import mongoose from 'mongoose'

interface IModel extends mongoose.Document {
  id: string
  customer_id: string
  email: string
  password: string
  code?: string
  active: boolean
  created_at: Date
  updated_at: Date
}

export default IModel
