import "reflect-metadata"
import cors from "cors"
import express from "express"
import handleError from "./errors/handleErrors";


const app = express();
app.use(express.json())
app.use(cors())

app.use(handleError)
export default app;