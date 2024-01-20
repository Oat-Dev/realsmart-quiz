const User = require("../models/user.js");
const jwt = require("jsonwebtoken");

module.exports = class UserService {
  static async getAllUser() {
    try {
      const allUser = await User.findAll();
      return allUser;
    } catch (error) {
      console.error(`Could not fetch users: ${error}`);
    }
  }

  static async login(identifier, password) {
    try {
      if (!identifier || !password) {
        return { status: 400, message: "Please provide email/phone and password!" };
      }
  
      const isEmail = validator.isEmail(identifier);
      const query = isEmail ? { email: identifier } : { phoneNumber: identifier };
  
      const user = await User.findOne({ where: query });
  
      if (!user || !(await user.correctPassword(password))) {
        return { status: 401, message: "Incorrect email/phone or password" };
      }
  
      const accessData = {
        id: user.id,
        userId: user.userId,
        email: user.email,
        phoneNumber: user.phoneNumber
      };
  
      const tokenDuration = user.rememberMe ? "6m" : "1m";
      const token = jwt.sign(accessData, process.env.jwtSecretKey, { expiresIn: tokenDuration });
  
      return {
        status: 200,
        tokenType: "Bearer",
        token,
        data: user,
      };
    } catch (error) {
      console.error(`Error logging in user: ${error}`);
      return {
        status: 500,
        message: `Error logging in User: ${error}`,
      };
    }
  }
  

  static async createUsers(data) {
    try {
      const newUser = await User.create(data);
      const token = jwt.sign({ id: newUser.id }, process.env.jwtSecretKey, {
        expiresIn: "1m",
      });

      return {
        status: 201,
        tokenType: "Bearer",
        token,
        data: newUser,
      };
    } catch (error) {
      console.error(`Error creating user: ${error}`);
      return {
        status: 500,
        message: `Error creating user: ${error}`,
      };
    }
  }

  static async getUserbyId(UserId) {
    try {
      const user = await User.findByPk(UserId);
      return user;
    } catch (error) {
      console.error(`User not found: ${error}`);
    }
  }

  static async changePassword(UserId, data) {
    try {
      const user = await User.findByPk(UserId);
      if (!user) {
        return { status: 400, message: "User is invalid" };
      }

      if (data.password !== data.passwordConfirm) {
        return { status: 400, message: "Passwords do not match" };
      }

      user.password = data.password;
      await user.save();

      const tokenJWT = jwt.sign({ id: user.id }, process.env.jwtSecretKey, {
        expiresIn: "1m",
      });

      return {
        status: 200,
        tokenType: "Bearer",
        token: tokenJWT,
        data: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
      };
    } catch (error) {
      console.error(`Error changing password: ${error}`);
      return {
        status: 500,
        message: `Error changing password: ${error}`,
      };
    }
  }

  static async updateUserService(userId, updateFields) {
    try {
      const [updated] = await User.update(updateFields, {
        where: { id: userId },
      });

      if (updated) {
        const updatedUser = await User.findByPk(userId);
        return { status: 200, data: updatedUser };
      }

      throw new Error("User not found");
    } catch (error) {
      console.error(`Could not update user: ${error}`);
      return {
        status: 500,
        message: `Error updating user: ${error}`,
      };
    }
  }

  static async deleteUserService(userId) {
    try {
      const deleted = await User.destroy({ where: { id: userId } });

      if (deleted) {
        return { status: 200, message: "User deleted successfully" };
      }

      throw new Error("User not found");
    } catch (error) {
      console.error(`Could not delete user: ${error}`);
      return {
        status: 500,
        message: `Error deleting user: ${error}`,
      };
    }
  }
};
