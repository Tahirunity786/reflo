const {default: mongooose} = require('mongodb');

const Schema = new mongooose.Schema({
    productName:{
        type: String,
        required: true,
    },
    productPrice:{
        type: Number,
        required: true,
    },
    productDescription:{
        type: String,
        required: true,
    },
    productImage:{
        type: String,
        required: true,
    },
    productCategory:{
        type: String,
        required: true,
    },
    productCountInStock:{
        type: Number,
        required: true,
        default: 0,
    },
    productRating:{
        type: Number,
        required: true,
        default: 0,
    },
    productNumReviews:{
        type: Number,
        required: true,
        default: 0,
    },
    isFeatured:{
        type: Boolean,
        default: false,
    },
    dateCreated:{
        type: Date,
        default: Date.now,
    },
});
const Product = mongooose.models.Product || mongooose.model('Product', Schema);
export default Product;
