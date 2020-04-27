const Comment = require('../models/comments');
const Post = require('../models/post');


module.exports.create = (req, res) => {
    Post.findById(req.body.post, (err, post) => {

        if (post) {
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            }, (err, comment) => {

                if (err) {
                    console.log("Error in creating the comment");
                    return;
                }


                post.comments.push(comment);
                post.save();

                res.redirect('/');
            });
        }
    });

}

module.exports.destroy = (req, res) => {
    Comment.findById(req.params.id, async function (err, comment) {
        if (comment.user == req.user.id) {
            let postId = comment.post;
            comment.remove();

            Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } }, (err, post) => {
                return res.redirect('back');
            });
        
        } else {
            let comment = await Comment.findById(req.params.id).populate('post').exec();
            if (comment.post.user == req.user.id) {
                let postId = comment.post.id;
                comment.remove();

                Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } }, (err, post) => {
                    return res.redirect('back');
                });
            } else {
                return res.redirect('back');
            }
        }
    });
}