const userService = require("./userService");

const createUserControllerFn = async (req, res) => {
  try {
    console.log(req.body, "BODY");
    const response = await userService.createUserDBService(req.body);
    console.log(response, "RESPONSE");

    if (response.success) {
      return res.status(201).json({ status: true, message: response.message });
    } else {
      return res.status(400).json({ status: false, message: response.message });
    }
  } catch (err) {
    console.error("Error in Create User Controller Function : ", err);
    return res
      .status(500)
      .json({ status: false, message: "Internal Server Error" });
  }
};

const loginUserControllerFn = async (req, res) => {
  try {
    const response = await userService.loginUserDBService(req.body);

    if (response.success) {
      return res.status(201).json({
        status: true,
        message: response.message,
        user: response.user, // Include user data
      });
    } else {
      return res.status(400).json({ status: false, message: response.message });
    }
  } catch (err) {
    console.error("Error in Create User Controller Function : ", err);
    return res
      .status(500)
      .json({ status: false, message: "Internal Server Error" });
  }
};

module.exports = {
  createUserControllerFn,
  loginUserControllerFn,
  // Other exports if needed
};
