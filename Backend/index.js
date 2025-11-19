import app from "./src/app.js";
import dbConnection from "./src/db/db.js";
import dotenv from "dotenv";

dotenv.config({
    path: "./.env"
})

const port = process.env.PORT || 5022;

dbConnection()
.then(() => {
    app.listen(port,() => {
        console.log(`Server is listening on http://localhost:${port}`);
    })
}).catch((err) =>{
    console.log(`DB Error: ${err}`);
})