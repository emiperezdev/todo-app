import app from "./start/app";
import initializeDB from "./start/db";

initializeDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`>>> Listening on port ${PORT}...`));


