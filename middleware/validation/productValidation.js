const { validationResult, body, param } = require('express-validator');
const _ = require('underscore');
const { errorCode } = require('../../utils/message');

module.exports = {
  validateCategory: [
    body('title').notEmpty().withMessage('Invalid title').trim(),
    body('parentId').notEmpty().withMessage('Invalid Category Id').trim(),
    body('image').notEmpty().withMessage('Invalid Image').trim(),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errMsg = _.pluck(errors.array(), 'msg');
        return res.status(400).json({ message: errMsg.join(', '), statusCode: errorCode });
      }
      next();
    }
  ],
  validateProduct: [
    body('title').notEmpty().withMessage('Invalid name').trim(),
    body('description').notEmpty().withMessage('Invalid phone number').trim(),
    body('image1').notEmpty().withMessage('Invalid phone number').trim(),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errMsg = _.pluck(errors.array(), 'msg');
        return res.status(400).json({ message: errMsg.join(', '), statusCode: errorCode });
      }
      next();
    }
  ],
  validateVariant: [
    body('variantName').notEmpty().withMessage('Invalid variant name').trim(),
    body('price').notEmpty().withMessage('Invalid price').trim(),
    body('discount').notEmpty().withMessage('Invalid discount').trim(),
    body('discountType').notEmpty().withMessage('Invalid discount type').trim(),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errMsg = _.pluck(errors.array(), 'msg');
        return res.status(400).json({ message: errMsg.join(', '), statusCode: errorCode });
      }
      next();
    }
  ]
}