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
const allowedOrigins = [
   "http://localhost:5173",
   "https://faker-supabase-react-front.vercel.app",
   "https://faker-supabase-react-front-git-main-x-jonicas-projects.vercel.app/",
   "https://faker-supabase-react-front-a11gh3z57-x-jonicas-projects.vercel.app/",
];

app.use(
   cors({
      origin: function (origin, callback) {
         console.log("Requête CORS depuis :", origin); // clg l'origine
         if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
         } else {
            callback(new Error("Not allowed by CORS"));
         }
      },
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
