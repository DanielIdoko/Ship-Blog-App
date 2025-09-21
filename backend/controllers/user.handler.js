import UserProfile from "../models/User.js";

/**
 *@desc  Get logged-in user's profile
 *@route GET /api/users/me
 */

export const getMyProfile = async (req, res) => {
  try {
    const user = await UserProfile.findById(req.user._id).select("-password");
    if (!user) {
      res.status(404).json({
        success: false,
        message: "Sorry, that account was not found.",
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
 *@desc Update user's profile
 *@route POST /api/users/me
 */
export const updateMyProfile = async (req, res) => {
  try {
    const edit = {
      bio: req.body.bio,
      avatar: req.body.avatar,
      username: req.body.username,
    };

    const user = await UserProfile.findByIdAndUpdate(req.user._id, edit, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!user) {
      res.status(404).json({
        success: false,
        message: "Sorry, that account was not found.",
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
 *@desc  Get public user's profile by ID
 *@route GET /api/users/:id
 */

export const getPublicUserById = async (req, res) => {
  try {
    const user = await UserProfile.findById(req.params._id).select(
      "username bio avatar role createdAt"
    );
    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found.",
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
 *@desc  Get logged-in user's profile
 *@route GET /api/users
 @access Admin
*/
export const getUsers = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      res.status(403).json({
        success: false,
        message: "Sorry, you're not authorized for that request",
      });
    }

    const users = await UserProfile.find().select("-password");

    res.status(200).json({
      success: true,
      data: users,
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
 *@desc  Update user's role
 *@route GET /api/users/me
 @access Admin
*/
export const updateUserRole = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      res.status(403).json({
        success: false,
        message: "Sorry, you're not authorized for that request",
      });
    }

    const { role } = req.body;

    // Only allow users with one of these roles
    if (!["reader", "admin", "author"].includes(role)) {
      res.status(400).json({
        success: false,
        message: "Invalid role",
      });
    }

    const user = await UserProfile.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) {
      res.status(404).json({
        success: false,
        message: "Couldn't update user role. Please try again",
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
 *@desc  Deleta a user
 *@route DELETE /api/users/:id
 @access Admin
*/

export const deleteUser = async (req, res) => {
  try {
      if (req.user.role !== "admin") {
      res.status(403).json({
        success: false,
        message: "Sorry, you're not authorized for that request",
      });
    }
    
    const user = await UserProfile.findByIdAndDelete(req.params.id);
    
    if (!user) {
      res.status(404).json({
        success: false,
        message: "Sorry, that account was not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
      message: "User's account deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
