const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type:String,
        require:true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'user_premium', 'admin'],
        default: 'user'
    },
    cartID: {
        type: Schema.Types.ObjectId,                
        ref:'Cart',
    },
    atCreated: {
        type: Date,
        default: Date()
    }
})

const userModel = model('users', userSchema)

module.exports = {
    userModel
}