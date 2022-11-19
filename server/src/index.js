const app = require('./app');
const dotenv = require('dotenv');
const mongoose = require('mongoose');


dotenv.config();
//connect to DB
mongoose.connect("mongodb+srv://haritha:sarada0964@cluster0.9zirfja.mongodb.net/Instaclone?retryWrites=true&w=majority",{ useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('connected to DB')
})


// mongoose.connect("mongodb://localhost:27017/Instaclone",{ useNewUrlParser: true, useUnifiedTopology: true }, () => {
//     console.log('connected to DB')
// })



app.listen(process.env.PORT || 5000, () => console.log('Server running......'));
