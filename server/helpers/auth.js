const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    } catch (error) {
        console.error(error);
        throw new Error('Hashing failed');
    }
};

const comparePassword = async (password, hashedPassword) => {
    try {
        if (!password || !hashedPassword) {
            throw new Error('data and hash arguments required');
        }
        return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
        console.error(error);
        throw new Error('Comparison failed');
    }
}

module.exports = {
    hashPassword,
    comparePassword,
};
