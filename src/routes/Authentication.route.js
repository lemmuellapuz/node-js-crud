const express = require('express');
const router = express.Router();

const validateRequest = require('../middlewares/ValidateRequest.middleware')

const schema = require('../validations/authentication/AuthenticationSchema.validations');

router.post('/signup', validateRequest(schema.signupSchema), () => {});
router.post('/signin', validateRequest(schema.signinSchema), () => {});
router.post('/forgot-password', validateRequest(schema.forgotPasswordSchema), () => {});
router.get('/logout', () => {});

module.exports = router;