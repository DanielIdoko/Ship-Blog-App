import Post from "../models/Post.js";
import UserProfile from "../models/User.js";
import slugify from "slugify";
/**
 *@desc  Get all published posts
 *@route GET /api/posts
 *@access Public
 */
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().lean();
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
    const drafts = await UserProfile.findById(req.user._id).select(
      "savedPosts"
    );

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
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.status(404).json({
        success: false,
        message: "That post may have been deleted. Please try again",
      });
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

/**
 *@desc  Get a post Slug
 *@route GET /api/posts/slug/:slug
 *@access Public
 */

export const getPostSlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const post = await Post.findOne({ slug, status: "published" })
      .populate("author", "username avatar bio")
      .populate("category", "name")
      .populate("tags", "name");

    // Check if slug is found
    if (!post) {
      res.status(404).json({
        success: false,
        message: "The post's slug was not found. Please try again",
      });
    }

    // Increment views of post every time it is fetched
    post.views = (post.views || 0) + 1;

    res.status(200).json({
      success: true,
      data: post,
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
 *@desc Create a post
 *@route POST /api/posts
 *@access User
 */

export const makePost = async (req, res) => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Not authenticated",
      });
    }

    // Validate user role before granting access to make/create a post
    if (req.user.role !== "author" && req.user.role !== "admin") {
      res.status(403).json({
        success: false,
        message: "Not authorized to create posts. SignIn or login",
      });
    }

    const { title, content, tags, category, image, status } = req.body;

    // Validate inputs
    if (!title || !content) {
      res.status(403).json({
        success: false,
        message: "Please provide title and content for your post.",
      });
    }

    // Generate slug
    const slug = slugify(title, { lower: true, strict: true });

    // create new post
    const newPost = await Post.create({
      author: req.user._id,
      title,
      content,
      slug,
      tags: tags || [],
      category: category || "general",
      image: image || null,
      status: status || "draft",
    });

    res.status(200).json({
      success: true,
      data: newPost,
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
 *@desc Edit a post
 *@route PUT /api/posts/:id
 *@access User
 */

export const editPost = async (req, res) => {
  try {
    // Validate user role before granting access to make/create a post
    if (req.user.role !== "author" && req.user.role !== "admin") {
      res.status(403).json({
        success: false,
        message: "Not authorized to create posts.",
      });
    }

    const post = await Post.findById(req.params.id);

    if (!post) {
      res.status(404).json({
        success: false,
        message: "Sorry, that post was not found. Try again.",
      });
    }

    if (
      post.author.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      res.status(403).json({
        success: false,
        message: "Sorry, you are not allowed to edit others post.",
      });
    }

    // Allowed post updates
    const postUpdates = [
      "title",
      "content",
      "tags",
      "category",
      "image",
      "status",
    ];

    postUpdates.forEach((update) => {
      if (req.body[update] !== undefined) {
        post[update] = req.body[update];
      }
    });

    res.status(200).json({
      success: true,
      data: post,
      message: "Post has been successfully updated",
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
 *@desc Delete a post
 *@route DELETE /api/posts/:id
 *@access User
 */

export const deletePost = async (req, res) => {
  try {
    // Validate user role before granting access to delete post
    if (req.user.role !== "author" && req.user.role !== "admin") {
      res.status(403).json({
        success: false,
        message: "Not authorized to delete posts.",
      });
    }

    const post = await Post.findOneAndDelete(req.params.id);

    if (!post) {
      res.status(404).json({
        success: false,
        message: "Sorry, that post was not found. Try again.",
      });
    }

    // verify user
    if (
      post.author.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      res.status(403).json({
        success: false,
        message: "Sorry, you are not allowed to delete others post.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Post has been successfully updated",
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
 *@desc Publish a post
 *@route PUT /api/posts/:id/publish
 *@access User
 */

export const publishPost = async (req, res) => {
  try {
    // Validate user role before granting access to delete post
    if (req.user.role !== "author" && req.user.role !== "admin") {
      res.status(403).json({
        success: false,
        message: "Not authorized to publish posts.",
      });
    }

    const post = await Post.findById(req.params.id);

    if (!post) {
      res.status(404).json({
        success: false,
        message: "Sorry, that post was not found. Try again.",
      });
    }

    // verify user
    if (
      post.author.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      res.status(403).json({
        success: false,
        message: "Sorry, you are not allowed to publish other's post.",
      });
    }

    if (post.status === "published") {
      res.status(400).json({
        success: false,
        message: "Post has already been published.",
      });
    }

    post.status = "published";

    res.status(200).json({
      success: true,
      data: post,
      message: "Post has been successfully published.",
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
 *@desc Schedule a post
 *@route PUT /api/posts/:id/schedule
 *@access User/Admin
 */

export const schedulePost = async (req, res) => {
  try {
    // Validate user role before granting access to delete post
    if (req.user.role !== "author" && req.user.role !== "admin") {
      res.status(403).json({
        success: false,
        message: "Not authorized to publish posts.",
      });
    }

    const post = await Post.findById(req.params.id);

    if (!post) {
      res.status(404).json({
        success: false,
        message: "Sorry, that post was not found. Try again.",
      });
    }

    // verify user
    if (
      post.author.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      res.status(403).json({
        success: false,
        message: "Sorry, you are not allowed to publish other's post.",
      });
    }

    if (post.status === "published") {
      res.status(400).json({
        success: false,
        message: "Post has already been published.",
      });
    }

    post.status = "published";

    res.status(200).json({
      success: true,
      data: post,
      message: "Post has been successfully published.",
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
 *@desc Like a post
 *@route POST /api/posts/:id
 *@access User/Admin
 */
export const likePost = async (req, res) => {
  try {
    // Validate user role before granting access to delete post
    if (req.user.role !== "author" && req.user.role !== "admin") {
      res.status(403).json({
        success: false,
        message: "SignIn or Login to like posts.",
      });
    }

    const post = await Post.findById(req.params.id);

    if (!post) {
      res.status(404).json({
        success: false,
        message: "Sorry, that post was not found. Please try again.",
      });
    }

    // Toggle like post
    const userId = req.user._id;

    const alreadyLiked = post.likes.includes(userId);

    // Unlike post if post has been liked
    if (alreadyLiked) {
      post.likes = post.likes.filter((id) => id.toString !== userId.toString());
    } else {
      post.likes.push(userId);
    }

    res.status(200).json({
      success: true,
      data: {
        likesCount: post.likes.length,
        liked: !alreadyLiked,
      },
      message: alreadyLiked ? "Post unliked" : "Post liked",
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
 *@desc View a post
 *@route POST /api/posts/:id
 *@access User/Admin
 */

export const viewPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).lean();
    if (!post) {
      res.status(404).json({
        success: false,
        message: "Sorry, that post was not found. Try again.",
      });
    }

    post.views = (post.views || 0) + 1;

    res.status(200).json({
      success: true,
      data: post,
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
 *@desc Get trending posts
 *@route POST /api/posts/trending
 *@access Public
 */

export const getTrendingPosts = async (req, res) => {
  try {
    const trendingPosts = await Post.find({
      status: "published",
    })
      .sort({
        views: -1,
        likesCount: -1,
      })
      .limit(10)
      .populate("author", "username avatar")
      .select("title slug views likes createdAt image");

    if (trendingPosts.length === 0) {
      res.status(200).json({
        success: false,
        data: [],
        message: "No trending posts yet.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Successfully fetched trending posts",
      data: trendingPosts,
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
 *@desc Bookmark a post
 *@route POST /api/posts/:id/bookmark
 *@access User/Admin
 */

export const bookmarkPost = async (req, res) => {
  try {
    // Validate user role before granting access to delete post
    if (req.user.role !== "author" && req.user.role !== "admin") {
      res.status(403).json({
        success: false,
        message: "Login to save posts.",
      });
    }

    const post = await Post.findById(req.params.id);

    if (!post) {
      res.status(404).json({
        success: false,
        message: "Sorry, that post was not found. Try again.",
      });
    }

    // Toggle bookmark on user's profile
    const user = await UserProfile.findById(req.user._id);
    const alreadyBookmarked = user.savedPosts.includes(post._id);

    if (alreadyBookmarked) {
      user.savedPosts.filter(
        (postId) => postId.toString() !== post._id.toString()
      );
    } else {
      user.savedPosts.push(post._id);
    }

    res.status(200).json({
      success: true,
      data: {
        bookmarks: user.savedPosts,
        bookmarked: !alreadyBookmarked,
      },
      message: alreadyBookmarked
        ? "Post removed from bookmarks"
        : "Post added to bookmarks",
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
 *@desc Get stats/analytics for posts
 *@route GET /api/analytics/posts/:id
 *@access User/Admin
 */

export const getPostAnalytics = async (req, res) => {
  try {
    // Validate user role before granting access to delete post
    if (req.user.role !== "author" && req.user.role !== "admin") {
      res.status(403).json({
        success: false,
        message: "Not authorized see posts stats.",
      });
    }

    const postAnalytics = await Post.findById(req.params.id).select(
      "likes likesCount views comments"
    );
    if (!postAnalytics) {
      res.status(404).json({
        success: false,
        message: "Sorry, that post was not found. Try again.",
      });
    }

    // verify user
    if (
      postAnalytics.author.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      res.status(403).json({
        success: false,
        message: "Sorry, you are not allowed to see others posts analytics.",
      });
    }

    res.status(200).json({
      success: true,
      data: {
        author: postAnalytics.author,
        analytics: postAnalytics,
      },
      message: "Post has been successfully updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
