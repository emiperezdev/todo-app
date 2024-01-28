import app from "./start/app";
import secret from "./start/config";
import initializeDB from "./start/db";

secret();
initializeDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`>>> Listening on port ${PORT}...`));


