import mongoose from 'mongoose'

const CustomerSchema = new mongoose.Schema(
  {
    id: String,
    name: String,
    document: String,
    email: String,
    created_at: Date,
    updated_at: Date,
  },
  {
    versionKey: false,
  },
)

export default CustomerSchema
