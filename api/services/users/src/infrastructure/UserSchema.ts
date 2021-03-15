import mongoose from 'mongoose'

const CustomerSchema = new mongoose.Schema(
  {
    id: String,
    customer_id: String,
    email: String,
    password: String,
    code: String,
    active: Boolean,
    created_at: Date,
    updated_at: Date,
  },
  {
    versionKey: false,
  },
)

export default CustomerSchema
