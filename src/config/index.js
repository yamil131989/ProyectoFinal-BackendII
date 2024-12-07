const mongoose = require('mongoose')



exports.connectDB = async () => {
    try {
        // await mongoose.connect('mongodb+srv://User:kPyFinuo5g2uoy12@experimentalcluster.gj356.mongodb.net/ecommerce')
         await mongoose.connect('mongodb+srv://user_coder:Coder_2024@experimentalcluster.gj356.mongodb.net/ProyectoFinal_2024') //sin luz
        // await mongoose.connect('mongodb://127.0.0.1:27017/ProyectoFinal_2024')
        console.log('base conectada')
    } catch (error) {
        console.log(error)
    }   
} 
