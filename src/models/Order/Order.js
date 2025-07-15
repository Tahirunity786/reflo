const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  variant: { type: mongoose.Schema.Types.Mixed }, // Optional variant data
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true, min: 0 },
}, { _id: false });

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Optional for guest checkout
  items: { type: [orderItemSchema], required: true },
  totalAmount: { type: Number, required: true },
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending',
  },
  paymentMethod: { type: String, enum: ['cod', 'card', 'paypal'], required: true },
  isPaid: { type: Boolean, default: false },
  paidAt: { type: Date },
  shippingAddress: {
    fullName: String,
    email: String,
    phone: String,
    address: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
  },
  trackingNumber: { type: String, default: '' },
  notes: { type: String, maxlength: 500 },
}, { timestamps: true });

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);
module.exports = Order;
