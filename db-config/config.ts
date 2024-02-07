import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.db_url!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("database connected!");
    });

    connection.on("error", (err) => {
      console.log("connection error" + err);
      process.exit();
    });
  } catch (error) {
    console.log("db-error >>>", error);
  }
}
