import mongoose from 'mongoose';

const connect = () => {
    mongoose
        .connect('mongodb://localhost:27017/firstNode')
        .catch((err) => console.log(err));
    console.log('db Connected!');
};

mongoose.connection.on('error', (err) => {
    console.error('db Connection Error', err);
});

module.exports = connect;
