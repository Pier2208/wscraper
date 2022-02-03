import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

class Mongoose {
  static connect() {
    mongoose
      //   .connect(`${process.env.MONGO_URI}`)
      .connect('mongodb+srv://webscrapper:Aristote35@cluster0.yej0x.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
      .then(() => console.log('Connected to Mongo DB'))
      .catch(err => console.error('Connection to the dabatase has failed', err));
  }
}

export default Mongoose;
