import mongoose from 'mongoose'

import CustomerSchema from './CustomerSchema'
import ICustomerModel from './ICustomerModel'

const CustomerModel = mongoose.model<ICustomerModel>('Customer', CustomerSchema, 'customers')

export default CustomerModel
