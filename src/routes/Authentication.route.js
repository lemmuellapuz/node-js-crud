const express = require('express');
const router = express.Router();

const validateRequest = require('../middlewares/ValidateRequest.middleware')
const controller = require('../controllers/Authentication.controller');
const schema = require('../validations/authentication/AuthenticationSchema.validations');

router.post('/signup', validateRequest(schema.signupSchema), controller.signup);
router.post('/signin', validateRequest(schema.signinSchema), controller.signin);
router.post('/forgot-password', validateRequest(schema.forgotPasswordSchema), () => {});
router.get('/signout', controller.signout);

module.exports = router;