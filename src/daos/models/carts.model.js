const { Schema, model} = require('mongoose')

const nameCollection = 'Cart'
const CartSchema = new Schema({
    products: [        
        {
            _id:false,
            id:{
                type:Schema.Types.ObjectId,                
                ref:'Product',
            },
            quantity:{
                type:Number,
                required:[true, 'Ingresar la cantidad del producto']
            }
        }        
    ]
})




const cartModel = model(nameCollection, CartSchema)

module.exports = {
    cartModel
}
