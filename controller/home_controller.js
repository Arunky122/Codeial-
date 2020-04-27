const Post = require('../models/post');

const User = require('../models/user');
module.exports.home = function(req,res){

    // res.cookie('user_id',34);
    // console.log(req.cookies);



    // Post.find({},(err,posts)=>{

    //     return res.render('home',{
    //         title:"Codeial | Home",
    //         posts : posts
    // });
    
    // });

    // Populate the user 
    Post.find({})
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    })
    .exec((err,posts)=>{
        User.find({},(err,users)=>{

            return res.render('home',{
                title:"Codeial | Home",
                posts : posts,
                all_users : users
        });
        })

        
    });
}

//module.exports.actionName = function(req,res)

