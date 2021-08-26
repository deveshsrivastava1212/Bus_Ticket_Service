const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Devesh:123qwe@cluster0.6rpwh.mongodb.net/BusService?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false

}).then(()=>{
    console.log('DataBases connected successfully');
}).catch((err)=>{
    console.log('Connection Failed');
})