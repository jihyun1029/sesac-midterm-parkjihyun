const { body, validationResult } = require('express-validator');

exports.signUpValidator = [
  body('email').isEmail().withMessage('이메일 형식이 아닙니다.').notEmpty(),
  body('password').isLength({ min: 6 }).withMessage('비밀번호는 6자 이상').notEmpty(),
  body('nickname').notEmpty().withMessage('닉네임을 입력해주세요.'),
];

exports.loginValidator = [
  body('email').isEmail().withMessage('이메일 형식이 아닙니다.').notEmpty(),
  body('password').isLength({ min: 6 }).withMessage('비밀번호는 6자 이상').notEmpty(),
];

exports.handleValidationResult = (req, res, next) => {
  const result = validationResult(req).errors;
  if (result.length > 0) {
    return next(new Error("InputValidation"));
  }
  next();
};