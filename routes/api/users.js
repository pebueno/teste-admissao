const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const keys = require("../../config/keys");
const jwt = require("jsonwebtoken");
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../models/user");

// @route GET api/users/test
// @description tests Users route
// @access Public

router.get("/test", (req, res) =>
  res.json({ msg: "This is the users route for meal plan" })
);

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
    });
  }
);

router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      errors.email = "User already exists";
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        height: req.body.height,
        weight: req.body.weight,
        age: req.body.age,
        gender: req.body.gender,
        activityLevel: req.body.activityLevel,
        weeklyTarget: req.body.weeklyTarget,
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => {
              const payload = {
                id: user.id,
                name: user.name,
                email: user.email,
                height: user.height,
                weight: user.weight,
                age: user.age,
                gender: user.gender,
                activityLevel: user.activityLevel,
                weeklyTarget: user.weeklyTarget,
              };

              const newFridge = new Fridge({ userId: user.id });
              newFridge.save();

              let currentDate = Date().toString().slice(0, 15);
              const newCart = new Cart({
                userId: user.id,
                dates: {
                  [currentDate]: {
                    BREAKFAST: undefined,
                    LUNCH: undefined,
                    DINNER: undefined,
                    STATUS: {},
                  },
                },
              });
              newCart.save();

              jwt.sign(
                payload,
                keys.secretOrKey,
                { expiresIn: 3600 },
                (err, token) => {
                  res.json({
                    success: true,
                    token: "Bearer " + token,
                  });
                }
              );
            })
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(404).json({ email: "This user does not exist" });
    }

    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        const payload = {
          id: user.id,
          name: user.name,
          email: user.email,
          height: user.height,
          weight: user.weight,
          age: user.age,
          gender: user.gender,
          activityLevel: user.activityLevel,
        };

        jwt.sign(
          payload,
          keys.secretOrKey,
          // Tell the key to expire in one hour
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        return res.status(400).json({ password: "Incorrect password" });
      }
    });
  });
});

// @route GET api/users
// @description Get all Users
// @access Public
router.get("/", (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(404).json({ noUsersfound: "No Users found" }));
});

// @route GET api/users/:id
// @description Get single User by id
// @access Public
router.get("/:id", (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        height: user.height,
        weight: user.weight,
        age: user.age,
        gender: user.gender,
        activityLevel: user.activityLevel,
        weeklyTarget: user.weeklyTarget,
      });
    })
    .catch((err) =>
      res.status(404).json({ nouserfound: "No User found with this ID" })
    );
});

router.patch("/:id/edit", (req, res) => {
  let update = { $set: {} };
  let options = { upsert: true, new: true };
  update["$set"]["height"] = req.body.height;
  update["$set"]["weight"] = req.body.weight;
  update["$set"]["age"] = req.body.age;
  update["$set"]["gender"] = req.body.gender;
  update["$set"]["activityLevel"] = req.body.activityLevel;
  update["$set"]["weeklyTarget"] = req.body.weeklyTarget;

  User.findByIdAndUpdate(req.params.id, update, options, function (err, data) {
    if (err) return res.status(400).json(err);
    return res.json(data);
  });
});

// @route GET api/users
// @description add/save User
// @access Public
router.post("/", (req, res) => {
  User.create(req.body)
    .then((user) => res.json({ msg: "User added successfully" }))
    .catch((err) => res.status(400).json({ error: "Unable to add this User" }));
});

// @route GET api/users/:id
// @description Update User
// @access Public
router.put("/:id", (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body)
    .then((user) => res.json({ msg: "Updated successfully" }))
    .catch((err) =>
      res.status(400).json({ error: "Unable to update the Database" })
    );
});

// @route GET api/users/:id
// @description Delete User by id
// @access Public
router.delete("/:id", (req, res) => {
  User.findByIdAndRemove(req.params.id, req.body)
    .then((user) => res.json({ mgs: "User entry deleted successfully" }))
    .catch((err) => res.status(404).json({ error: "No such a User" }));
});

module.exports = router;
