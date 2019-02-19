const
  User = require('../models/User'),
  jwt = require('jsonwebtoken');

var response = {
  message: '',
  success: true,
  user: null
};

class UserController {
  // Public
  create(req, res) {
    User.create(req.body, (err, user) => {
      if (err) return res.status(500).send(err.message);
      response = {success: true, message: 'User created.', user: user};
      return res.status(200).json(response);
    });
  }
  // For development purposes, will delete
  index(req, res) {
    User.find({}, (err, users) => {
      response = {success: true, message: 'Users List', user: users};
      return res.status(200).json(response);
    });
  }

  // Private Auth Required
  login(req, res) {
    // first, find user by the email/username in the request body.
    const loginData = req.body.email ? {email: req.body.email} : {username: req.body.username};
    // When retrieving the user from database, include the password for authentication:
    User.findOne(loginData, '+password', (err, user) => {
      // if there's no user found, or they put a wrong password:
      if(!user || (user && !user.validPassword(req.body.password))) {
        // stop here and let the client know that the info is incorrect:
        response = {success: false, message: 'Incorrect email/username or password.'};
        return res.status(500).json(response);
      }
      // otherwise, use mongoose document's toObject() method to get a stripped down version of
      // just the user's data (name, email etc) as a simple object:
      const userData = user.toObject()

      // remove the password from this object before creating the token:
      delete userData.password

      userData['iat'] = new Date().getTime() / 1000;
      userData['exp'] = (new Date().getTime() + 10000000) / 1000; // 1000 = 1 second

      // create the token, embedding the user's info in the payload of the token:
      const token = jwt.sign(userData, process.env.SECRET_TOKEN)

      // send the token back to the client in our response:
      response = {success: true, message: 'Logged in successfully.', token};
      return res.status(200).json(response);
    });
  }

  show(req, res) {
    User.findById(req.params.id, (err, user) => {
      if (err) return res.status(500).send(err.message);
      response = {success: true, message: 'User found.', user: user};
      return res.status(200).json(response);
    });
  }

  edit(req, res) {
    // Instead of using User.findByIdAndUpdate(), we'll use User.findById()
    User.findById(req.params.id, (err, user) => {
      // and update manually here by merging the request body ({name, email, and/or password}) into the user we found by ID.
      Object.assign(user, req.body);

      // then we save here, which triggers the mongoose middleware in our User model
      // so that in case the user is changing their password, the new password gets hashed before
      // saving to the database (see User model, in userSchema.pre('save')...):
      user.save((err, updatedUser) => {
        if (err) return res.status(500).send(err.message);
        response = {success: true, message: 'User updated.', user: updatedUser};
        return res.status(200).json(response);
      });
    });
  }

  delete(req, res) {
    User.findByIdAndRemove(req.params.id, (err, deletedUser) => {
      if (err) return res.status(500).send(err);
      response = {success: true, message: 'Lobby successfully deleted', user: deletedUser};
      return res.status(200).json(response);
    });
  }
}

module.exports = new UserController();
