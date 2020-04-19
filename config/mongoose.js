const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/codeial_development');
const db = mongoose.connection;

db.on('error',console.error.bind(console,"Eror connecting to MongoDB"));
db.once('open',function(err){
    console.log(err)
    console.log('***************Connected to Database :: MongoDB***************');
});

module.exports =db;