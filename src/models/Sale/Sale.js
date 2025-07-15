const { default: mongoose } = require('mongoose');

const saleSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  variantSKU: { type: String }, // If sale was from a variant
  quantity: { type: Number, required: true },
  priceAtPurchase: { type: Number, required: true },
  saleDate: { type: Date, default: Date.now },
  order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

const Sale = mongoose.models.Sale || mongoose.model('Sale', saleSchema);
module.exports = Sale;