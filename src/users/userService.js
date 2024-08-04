const userModel = require("./userModel");
const key = "12345678QWERTYUI";
const encryptor = require("simple-encryptor")(key);

module.exports.createUserDBService = async (userDetails) => {
  try {
    // Encrypt the password
    const encryptedPassword = encryptor.encrypt(userDetails.password);

    // Create a new user model instance
    const userModelData = new userModel({
      email: userDetails.email,
      password: encryptedPassword,
      age: userDetails.age,
    });

    // Save the user model instance to the database
    await userModelData.save();
    return { success: true, message: "User created successfully." };
  } catch (error) {
    console.log("Error in User Service: ", error);

    // Check for duplicate key error
    if (error.code === 11000) {
      return {
        success: false,
        message: "A user with this email already exists.",
      };
    }

    // Check for validation errors
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors);
      const messages = errors.map((err) => err.message).join(", ");
      return {
        success: false,
        message: `Validation Error: ${messages}`,
      };
    }

    // Handle other errors
    return {
      success: false,
      message: "An unexpected error occurred while creating the user.",
    };
  }
};

module.exports.loginUserDBService = async (loginUserDetails) => {
  try {
    const { email, password } = loginUserDetails;

    // Find the user by email
    const user = await userModel.findOne({ email });

    if (!user) {
      return {
        success: false,
        message: "User not found.",
      };
    }

    // Decrypt the stored password
    const decryptedPassword = encryptor.decrypt(user.password);

    // Check if the provided password matches the stored password
    if (decryptedPassword === password) {
      return {
        success: true,
        message: "Login successful.",
        user: {
          email: user.email,
          age: user.age, // Add additional user data as needed
        },
      };
    } else {
      return {
        success: false,
        message: "Incorrect password.",
      };
    }
  } catch (error) {
    console.log("Error in Login User: ", error);

    // Handle unexpected errors
    return {
      success: false,
      message: "An unexpected error occurred while logging in.",
    };
  }
};
