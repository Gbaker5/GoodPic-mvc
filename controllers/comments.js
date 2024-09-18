const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const Profile = require("../models/userProfile")
const Comments = require("../models/Comments")

module.exports = {




createComment: async (req, res) => {
    try {
      const profile = await Profile.find({ user: req.user.id }).sort({ createdAt: "desc" }) //profiles of the user that is logged in (this for nav pic)
      console.log(req.params)
      //console.log(profile)
      //console.log(profile[0].profilePic)

     
      
      await Comments.create({
        comment: req.body.comment,
        madeBy: req.user.id,
        postId: req.params.id,
        likes:0,
        
      });
    
      console.log("Comment has been added!");
      res.redirect("/post/"+req.params.id);
    
    } catch (err) {
      console.log(err);
    }
  
  },
  deleteComment: async (req, res) => {
    try {
      // Find post by id
      let post = await Post.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Post.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
}