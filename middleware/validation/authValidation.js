const { validationResult, body, param } = require('express-validator');
const _ = require('underscore');

module.exports = {
  validateSignup: [
    body('name').notEmpty().withMessage('Invalid name').trim(),
    body('email').notEmpty().isEmail().withMessage('Invalid email Id').trim(),
    body('password').notEmpty().withMessage('Invalid password').isLength({ min: 6 }).trim(),
    body('phone').notEmpty().isMobilePhone().withMessage('Invalid phone number').trim(),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errMsg = _.pluck(errors.array(), 'msg');
        return res.status(400).json({ statusCode: 0, message: errMsg.join(', ')});
      }
      next();
    }
  ],
  validateLogin: [
    body('email').notEmpty().isEmail().withMessage('Invalid email Id').trim(),
    body('password').notEmpty().withMessage('Invalid password').isLength({ min: 6 }).trim(),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errMsg = _.pluck(errors.array(), 'msg');
        return res.status(400).json({ statusCode: 0, message: errMsg.join(', ')});
      }
      next();
    }
  ]
}