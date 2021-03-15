import mongoose from 'mongoose'

interface IModel extends mongoose.Document {
  id: string
  name: string
  document: string
  email: string
  created_at: Date
  updated_at: Date
}

export default IModel
