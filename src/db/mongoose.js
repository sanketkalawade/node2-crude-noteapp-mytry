const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/crude-example-api',{
    useCreateIndex:true,
    useFindAndModify:false,
    useNewUrlParser:true
})