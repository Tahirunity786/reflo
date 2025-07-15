const { Schema, model, models } = require('mongoose');

const inventorySchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
    unique: true,
  },
  stock: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
  },
  reserved: {
    type: Number,
    default: 0,
    min: 0,
  },
  location: {
    type: String,
    default: 'Main Warehouse',
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

const Inventory = models.Inventory || model('Inventory', inventorySchema);
module.exports = Inventory;
