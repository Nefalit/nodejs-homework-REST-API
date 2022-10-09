const express = require('express');

const ctrl = require('../../controllers/auth');

const { ctrlWrapper } = require('../../helpers');

const {
  validateContactBody,
  authenticate,
  upload,
} = require('../../middlewares');

const { schemas } = require('../../models/user');

const router = express.Router();

// signup
router.post(
  '/register',
  validateContactBody(schemas.registerSchema),
  ctrlWrapper(ctrl.register)
);

router.get('/verify/:verificationToken', ctrlWrapper(ctrl.verifyEmail));

router.post(
  '/verify',
  validateBody(schemas.verifyEmailSchema),
  ctrlWrapper(ctrl.resendVerifyEmail)
);

// signin
router.post(
  '/login',
  validateContactBody(schemas.loginSchema),
  ctrlWrapper(ctrl.login)
);

router.get('/current', authenticate, ctrlWrapper(ctrl.getCurrent));

router.get('/logout', authenticate, ctrlWrapper(ctrl.logout));

router.patch(
  '/avatars',
  authenticate,
  upload.single('avatar'),
  ctrlWrapper(ctrl.updateAvatar)
);

module.exports = router;
