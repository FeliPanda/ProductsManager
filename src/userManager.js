const User = require('./models/user.model');

class UserManager {
    async createUser(email, password) {
        const user = new User({ email, password });
        await user.save();
        return user;
    }

    async findUserByEmail(email) {
        const user = await User.findOne({ email });
        return user;
    }

    async findUserById(id) {
        const user = await User.findById(id);
        return user;
    }

    async updateUser(id, updatedFields) {
        const user = await User.findByIdAndUpdate(id, updatedFields, { new: true });
        return user;
    }

    async deleteUser(id) {
        const user = await User.findByIdAndDelete(id);
        return user;
    }
}

module.exports = new UserManager();
