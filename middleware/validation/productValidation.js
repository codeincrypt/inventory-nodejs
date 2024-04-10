const { validationResult, body, param } = require('express-validator');
const _ = require('underscore');

module.exports = {
  validateProduct: [
    body('title').notEmpty().withMessage('Invalid name').trim(),
    body('description').notEmpty().withMessage('Invalid description').trim(),
    body('price').notEmpty().withMessage('Invalid price').trim(),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errMsg = _.pluck(errors.array(), 'msg');
        return res.status(400).json({ message: errMsg.join(', '), statusCode: 0 });
      }
      next();
    }
  ],
  validateOrder: [
    body('productid').notEmpty().withMessage('Invalid productid').trim(),
    body('quantity').notEmpty().withMessage('Invalid quantity').trim(),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errMsg = _.pluck(errors.array(), 'msg');
        return res.status(400).json({ message: errMsg.join(', '), statusCode: 0 });
      }
      next();
    }
  ]
}