const express = require("express");
// const multer = require("multer");
const router = express.Router();
const Contact = require("../models/contact");

router.get("/", (req, res, next) => {
  Contact.find()
    .select("_id name email phone")
    .exec()
    .then(results => {
      if (results.length === 0) {
        return res.status(404).json({
          message: "no contact found"
        });
      } else {
        res.status(200).json({
          contacts: results.map(result => {
            return {
              _id: result._id,
              name: result.name,
              email: result.email,
              phone: result.phone,
              request: {
                type: "GET",
                url: "http://localhost:3000/contact/" + result._id
              }
            };
          })
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.post("/", (req, res, next) => {
  const contact = new Contact({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone
  });
  contact
    .save()
    .then(result => {
      res.status(200).json({
        createdContact: result
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.get("/:contactID", (req, res, next) => {
  const id = req.params.contactID;
  Contact.findById(id)
    .select("_id name email phone")
    .exec()
    .then(result => {
      res.status(200).json({
        contact: result
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.delete("/:contactID", (req, res, next) => {
  const id = req.params.contactID;
  Contact.remove({ _id: id })
    .then(result => {
      res.status(200).json({
        message: "contact deleted",
        deletedContact: result
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});
router.patch("/:contactID", (req, res, next) => {
  const id = req.params.contactID;
  // const updateOps = {};
  // for (const ops of req.body) {
  //   updateOps[ops.props] = ops.value;
  // }
  Contact.update({ _id: id }, { $set: req.body })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "contact upadated",
        updatedContact: result
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
