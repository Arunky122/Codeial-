const mongoos = require('mongoose');

const postSchema = new mongoose.Schema({
    content: {
        type:String,
        required : true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{
    timestamp = true
});


const Post = momgoose.model.('Post',postSchema);

module.exports = Post;