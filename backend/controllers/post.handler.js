import Post from "../models/Post.js";

/**
 *@desc  Get all published posts
 *@route GET /api/posts
 *@access Public
 */
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    if (posts.length === 0) {
      res.status(200).json({
        success: true,
        data: [],
      });
    }

    res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

/**
 *@desc  Get logged-in user's profile
 *@route GET /api/users/me
 */
export const getUserDrafts = async (req, res) => {
  try {
    const drafts = await Post.findById(req.user._id).select("savedPosts");

    if (drafts.length === 0) {
      res.status(200).json({
        success: true,
        data: [],
        message: "No drafts here yet.",
      });
    }

    res.status(200).json({
      success: true,
      data: drafts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};


/**
 *@desc  Get logged-in user's profile
 *@route GET /api/users/me
*/
export const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if(!post){
        res.status(404).json({
            success: false,
            message: "That post may have been deleted. Please try again"
        })
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
