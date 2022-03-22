const controllers = require("../controllers/utilisateurController");
const express = require("express");
const router = express.Router();

router.post("/", controllers.inscription);

router.post("/connexion/", controllers.seConnecter);

module.exports = router;
