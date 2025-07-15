const { default: mongoose } = require('mongoose');
const slugify = require('slugify');

const collectionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
    unique: true,
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
    maxlength: 1000,
  },
  image: {
    url: { type: String },
    alt: { type: String, default: '' },
  },
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  }],
  tags: {
    type: [String],
    default: [],
  },
  status: {
    type: String,
    enum: ['active', 'draft'],
    default: 'draft',
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}, {
  timestamps: true,
});

// 🔁 Auto-create slug from name
collectionSchema.pre('save', function (next) {
  if (!this.slug && this.name) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

const Collection = mongoose.models.Collection || mongoose.model('Collection', collectionSchema);
export default Collection;
