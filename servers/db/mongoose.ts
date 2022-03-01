import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

class Mongoose {
  uri = 'mongodb+srv://webscrapper:Aristote35@cluster0.yej0x.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

  async connect() {
    mongoose
      //   .connect(`${process.env.MONGO_URI}`)
      .connect(this.uri, {
        socketTimeoutMS: 150000,
        keepAlive: true,
        keepAliveInitialDelay: 300000
      })
      .then(() => {
        console.log('Connected to Mongo DB');
      })
      .catch(err => console.error('Connection to the dabatase has failed', err));
  }
}

const db = new Mongoose();
export default db
