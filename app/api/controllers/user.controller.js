//js
const UserService = require("../services/userService");
//For Register Page
module.exports = class User {
  static async apiLogin(req, res) {
    const { identifier, password } = req.body;
    console.log("Login request for:", identifier);

    try {
      const users = await UserService.login(identifier, password);
      console.log(users);

      if (users.status === 400) {
        res.status(400).json({ message: users.message });
      } else if (users.status === 401) {
        res.status(401).json({ message: users.message });
      } else if (users.status === 500) {
        res.status(500).json({ message: users.message });
      } else {
        res.status(200).json(users);
      }
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  }

  static async apiGetAllUser(req, res) {
    try {
      const users = await UserService.getAllUser();

      if (!users) {
        res.status(404).json("There are no users published yet!");
      }

      res.json(users);
    } catch (error) {
      res.status(500).json({
        error: error,
      });
    }
  }
  static async apiCreateUser(req, res) {
    try {
      const createUser = await UserService.createUsers(req.body);
      if (createUser.status === 400) {
        res.status(400).json({ message: users.message });
      } else if (createUser.status === 401) {
        res.status(401).json({ message: users.message });
      } else if (createUser.status === 500) {
        res.status(500).json({ message: users });
      } else {
        res.status(201).json(createUser);
      }
    } catch (error) {
      res.status(500).json({
        error: error,
      });
    }
  }

  static async apiChangePasswordUser(req, res) {
    try {
      const userId = req.params.id;
      const data = {
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
      };
      const createUser = await UserService.changePassword(userId, data);
      res.status(200).json(createUser);
    } catch (error) {
      res.status(500).json({
        error: error,
      });
    }
  }

  static async apiGetUserById(req, res, next) {
    try {
      let id = req.params.id || {};
      const UserId = await UserService.getUserbyId(id);
      res.json(UserId);
    } catch (error) {
      res.status(500).json({
        error: error,
      });
    }
  }

  static async apiUpdateUser(req, res, next) {
    try {
      const userId = req.params.id;
      const updateFields = {
        username: req.body.username,
        email: req.body.email,
      };

      await UserService.updateUserService(userId, updateFields);

      const response = {
        success: true,
        message: "User updated successfully",
      };

      res.json(response);
    } catch (error) {
      console.error(`Error updating user: ${error.message}`);
      res.status(500).json({
        error: error.message || "Internal Server Error",
      });
    }
  }

  static async apiDeleteUser(req, res, next) {
    try {
      const userId = req.params.id;

      await UserService.deleteUserService(userId);

      const response = {
        success: true,
        message: "User deleted successfully",
      };

      res.json(response);
    } catch (error) {
      console.error(`Error deleting user: ${error.message}`);
      res.status(500).json({
        error: error.message || "Internal Server Error",
      });
    }
  }
};
