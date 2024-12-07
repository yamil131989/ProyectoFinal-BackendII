//npmjs.com/package/mongoose
const { Schema, model} = require('mongoose')
const objectId = Schema.objectId

const collectionName = 'Product'   //ref

const productSchema = new Schema({
    title: {
        type: String,
        required: [true, "El titulo debe ser obligatorio"]
    },
    description: {
        type: String,
        required:[true, "La descripcion debe ser obligatoria"]
    },
    code: {
        type: String,
        required: [true, "El codigo debe ser obligatorio"],
        unique: true
    },
    price: {
        type: Number,
        required:[true, "El precio debe ser obligatorio"]
    },
    stock:{
        type:Number,
        required:[true, "Debe ingresar el stock"]
    },
    status:{
        type: Boolean,
        default: true
    },
    thumbnail: [],
    category: {
        type: String,
        required: true
    },
    create: {
        type: Date,
        default: Date.now()
    }
})




const productModel = model(collectionName, productSchema)

module.exports = {
    productModel
}
