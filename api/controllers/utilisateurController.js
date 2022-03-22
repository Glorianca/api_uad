const models = require("../models/index");
const Utilisateur = models.utilisateur;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.inscription = (req, res) => {
  const nouveau = new Utilisateur({
    noms: req.body.noms,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
  });
  nouveau
    .save()
    .then((positif) => {
      console.log(positif);
      return res.status(201).json(positif);
    })
    .catch((negatif) => {
      console.log(negatif);
      return res.status(500).json(negatif);
    });
};

exports.seConnecter = (req, res) => {
  Utilisateur.findOne({
    email: req.body.email,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (!user) {
      return res
        .status(404)
        .send({ message: "email ou mot de passe incorrect" });
    }

    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid) {
      return res
        .status(404)
        .send({ message: "email ou mot de passe incorrect" });
    }

    var token = jwt.sign({ id: user._id }, "tomate", {
      expiresIn: 86400, // 24 hours
    });

    res.status(200).send({
      _id: user._id,
      noms: user.noms,
      email: user.email,
      role: user.role,
      accessToken: token,
    });
  });
};
