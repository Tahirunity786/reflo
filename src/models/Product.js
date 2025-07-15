const { default: mongoose } = require('mongoose');
const slugify = require('slugify');

const imageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  alt: { type: String, default: '' },
  size: { type: Number, default: 0 },
}, { _id: false });

const variantSchema = new mongoose.Schema({
  sku: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  comparePrice: { type: Number, min: 0 },
  costPrice: { type: Number, min: 0 },
  stock: { type: Number, default: 0, min: 0 },
  options: {
    type: Map,
    of: String,
    required: true,
  },
  image: { type: String },
}, { _id: false });

const productSchema = new mongoose.Schema({
  productTitle: {
    type: String,
    required: true,
    maxlength: 100,
    trim: true,
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
  },
  productDescription: {
    type: String,
    required: true,
    trim: true,
  },
  productSKU: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  productPrice: { type: Number, required: true, min: 0 },
  productComparePrice: { type: Number, required: true, min: 0 },
  productCostPrice: { type: Number, required: true, min: 0 },
  productProfitPrice: { type: Number, required: true, min: 0 },

  productImages: {
    type: [imageSchema],
    required: true,
    validate: {
      validator: (arr) => Array.isArray(arr) && arr.length > 0,
      message: 'At least one image is required',
    },
  },

  productVariants: {
    type: [variantSchema],
    default: [],
  },

  productCategories: {
    type: [String],
    required: true,
    validate: {
      validator: (arr) => Array.isArray(arr) && arr.length > 0,
      message: 'At least one category is required',
    },
  },

  productTags: {
    type: [String],
    default: [],
    validate: {
      validator: (arr) => Array.isArray(arr) && arr.every(tag => typeof tag === 'string'),
      message: 'Tags must be strings',
    },
  },

  productStatus: {
    type: String,
    enum: ['active', 'draft'],
    default: 'draft',
  },

  productCountInStock: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
  },

  productRating: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
    max: 5,
  },

  productNumReviews: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
  },

  shippingInfo: {
    isPhysicalProduct: { type: Boolean, default: true },
    weight: {
      value: { type: Number, min: 0, default: 0 },
      unit: { type: String, enum: ['kg', 'g', 'lb'], default: 'kg' },
    },
  },

  productOrganization: {
    type: { type: String, trim: true, default: '' },
    vendor: { type: String, trim: true, default: '' },
  },

  collection: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Collection',
  },

  dateCreated: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

// 🔁 Auto-create slug from title
productSchema.pre('save', function (next) {
  if (!this.slug && this.productTitle) {
    this.slug = slugify(this.productTitle, { lower: true, strict: true });
  }
  next();
});

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
export default Product;
