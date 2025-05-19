const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const {
   getAllPersons,
   helloWorld,
   insertFakePerson,
   deletePersonById,
} = require("./controllers/userController");

const app = express();
const port = 3000;

// OU configuration plus sécurisée pour spécifier des origines précises :
app.use(
   cors({
      origin: "https://faker-supabase-react-front-d52q.vercel.app",
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type"],
   })
);

// Utilisation de morgan pour voir les reqettes executer depuis le server
app.use(morgan("dev")).use(bodyParser.json());

// Routes
app.get("/", helloWorld);
app.get("/api/personne", getAllPersons);
app.post("/api/personne/faker", insertFakePerson);
app.delete("/api/personne/:id", deletePersonById);

app.listen(port, () => {
   console.log(`serveur start in port: ${port}`);
});
