import "reflect-metadata";
import "express-async-errors";
import cors from "cors";
import express from "express";
import handleError from "./errors/handleErrors";
import useRoutes from "./routes/user.routes";
import sessionRouters from "./routes/session.routes";
import adversimentRoutes from "./routes/adversiments.routes";
import commentRoutes from "./routes/comments.routes";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/users", useRoutes);
app.use("/login", sessionRouters);
app.use("/adversiments", adversimentRoutes);
app.use("/comments", commentRoutes);

app.use(handleError);
export default app;
