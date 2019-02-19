const
  mongoose = require('mongoose'),
  bcrypt = require('bcrypt-nodejs'),

  userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    username: String,
    email: { type: String, required: [true, 'Email field cannot be blank'], unique: true },
    password: { type: String, select: false, required: [true, 'Password field cannot be blank'], unique: true },
    teams: [{type: mongoose.Schema.Types.ObjectId, ref: 'Team'}]
    // select: false used to prevent PW from being sent back in response
  });

  // hash the PW and encrypt it
  userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  };

  // compare stored PW to currentPW
  userSchema.methods.validPassword = function(password) {
    if(!password) return false;
    return bcrypt.compareSync(password, this.password);
  };

  // encrypt PW before saving PW
  userSchema.pre('save', function(next) {
    if(!this.isModified('password')) return next();
    this.password = this.generateHash(this.password);
    next();
  });

module.exports = mongoose.model('User', userSchema);
