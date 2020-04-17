module.exports.home = function(req,res){

    
    // res.cookie('user_id',34);
    console.log(req.cookies);
    return res.render('home',{
        title:"Home"
    });
}

//module.exports.actionName = function(req,res)

