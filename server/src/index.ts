import mongoose from "mongoose";
import cors from "cors";
import express, { Express } from "express";
import todoRouters from "./routes";

const app: Express = express();
const PORT: string | number = process.env.PORT || 4000;

app.use(cors());
app.use(todoRouters);

const uri: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_DB}@cluster0.u3lul.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const options = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose.set("useFindAndModify", false);

mongoose
  .connect(uri, options)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT} 🚀`)
    )
  )
  .catch((error) => {
    throw error;
  });
