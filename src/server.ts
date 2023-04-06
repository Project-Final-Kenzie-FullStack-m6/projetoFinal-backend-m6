import app from "./app"
import AppDataSource from "./data-source"
import "dotenv/config"

(async () => {
    await AppDataSource.initialize()
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })

    const port = 3001
    app.listen(port, () => {
        console.log(`server connected in port:${port}`)
    })
})()