export const getProfile = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "Profile fetched successfully",
      user: req.user,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
export const updateProfile = async (req, res) => {
  try {
    const user = req.user;

    // Student can only update photo
    if (user.role === "student") {
      if (req.body.profilePhoto) {
        user.profilePhoto = req.body.profilePhoto;
      }

      await user.save();

      return res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        user,
      });
    }

    // Other roles
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;

    if (req.body.profilePhoto) {
      user.profilePhoto = req.body.profilePhoto;
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};