import mongoose from "mongoose";

try {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Conectado ao mongo");
} catch (error) {
  console.log(error);
  process.exit(1);
}
