const express = require('express');
const {userLogin, userSignup} = require('../controllers/authController')
const router = express.Router();
const validator = require('express-joi-validation').createValidator({});
const Joi = require('joi');

const loginSchema = Joi.object({
  email:Joi.string().email().required(),
  password: Joi.string().min(5).max(25).required()
});

const registerSchema = Joi.object({
  fullname : Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(5).max(25).required()
})

const notAllowed = (req, res) => res.status(405).json('method not allowed');


router.route('/api/userLogin').post(validator.body(loginSchema),userLogin).all(notAllowed);
router.route('/api/userSignUp').post(validator.body(registerSchema),userSignup).all(notAllowed);


module.exports = router;