const contactRepo = require("../../dal/contact.repo");
const moment = require("moment-jalaali");
const contactController = {
  create: (req, res) => {
    const contact = req.body;
    if (!contact) {
      res.status(400).send({ massage: "ورودی تماس با ما اشتباه است." });
    }
    contact.status = true;
    contact.date = moment().format("YYYY/MM/DD HH:mm:ss");
    contactRepo.create(contact, (err, result) => {
      if (err) res.status(500).send(err);
      else res.send(result);
    });
  },
  fetchAll: (req, res) => {
    contactRepo.fetchAll((err, data) => {
      if (err) res.status(500).send(err);
      else res.send(data);
    });
  },
  findById: (req, res) => {
    const contactId = req.params.id;
    contactRepo.findById(contactId, (err, data) => {
      if (err) res.status(500).json(err.message);
      else res.json(data);
    });
  },
  delete: (req, res) => {
    const contactId = req.params.id;
    contactRepo.delete(contactId, (err, result) => {
      if (err) res.status(500).send(err);
      else res.send(result);
    });
  },
  update: (req, res) => {
    const newContact = req.body;
    const contactId = req.params.id;
    delete newContact._id;
    contactRepo.update(contactId, newContact, (err, result) => {
      if (err) res.status(500).send(err);
      else res.send(result);
    });
  },
};

module.exports = contactController;
