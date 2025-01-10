const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    }
});

//HASHING PASSWORD AFTER CREATING NEW USER 
UserSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

UserSchema.statics.login = async (email, password) => {

    const user = await User.findOne({email: email});

    if(!user)
        throw new Error('Invalid credentials')

    const auth = await bcrypt.compare(password, user.password);

    if(!auth)
        throw new Error('Invalid credentials')

    return user;

}

/** @type {mongoose.Model} */
const User = mongoose.model('user', UserSchema);

module.exports = User