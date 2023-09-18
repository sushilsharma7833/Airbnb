import mongoose from "mongoose";

// // const uri = "mongodb+srv://prabnmbnmdeepk259909:HUet16YLyxP4zfFw@projectm.gx5iuhc.mongodb.net/projec bn bntM?retryWrites=true&w=majority";

// const connectDB = async (MONGODB_URL) => {
//    console.log("conntecting to db....")
//      await mongoose.connect(MONGODB_URL,{
//       //   useNewUrlParser:true,
//       //   useUnifiedTopology:true,
//      });
//      console.log('Connected Successfully..');

//    }

// // function for connecting with Database
// // const connectDB = async (DATABASE_URL) => {
// //  try {
// //   const DB_OPTIONS = {
// //    dbName: 'airbnbproject1',
// //   }
// //   await mongoose.connect(DATABASE_URL, DB_OPTIONS);
// //   console.log('Connected Successfully..');
// //  } catch (err) {
// //   console.log(err);
// //  }
// // }

// export default connectDB

const connectDB = async (MONGODB_URL) => {
  console.log("conntecting to db....");

  mongoose
    .connect("mongodb://127.0.0.1:27017",{dbName:"usermanagement"})
    .then((resp) => console.log("Connected"))
    .catch((err) => console.log("Error: ", err));
};
export default connectDB;
