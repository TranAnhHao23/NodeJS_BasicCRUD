const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/user_dev', { // lỗi quá ảo???
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('connect success');
    } catch (error) {
        console.log('connect fail');
    }
    console.log("hello anh em")
}

module.exports = { connect };
