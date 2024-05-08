
const {body, validationResult} = require('express-validator');

// const loginValidator = [
//   body('email', 'Invalid does not Empty').not().isEmpty(),
//   body('email', 'Invalid email').isEmail(),
//   body('password', 'The minimum password length is 8 characters').isLength({min: 8}),
// ]

// const createValidator = [
//   body('customer.name', 'name does not Empty').not().isEmpty(),
//   body('customer.email', 'Invalid email').isEmail(),
//   body('customer.name', 'custome rname must be Alphanumeric').isAlphanumeric(),
//   body('customer.password', 'password does not Empty').not().isEmpty(),
//   body('customer.password', 'The minimum password length is 6 characters').isLength({min: 8}),
//   body('customer.phone_number', 'Phone  does not empty.').not().isEmpty(),
//   body('customer.gender', 'Gender does not empty.').not().isEmpty(),
// ]

module.exports.loginValidation = [
    body('email').isEmail().normalizeEmail().withMessage('Please enter Proper email'),
    body('password').isLength({ min: 8 }).withMessage('Password should contain 8 characters'),
    async (req, res, next) => {
        const errors = validationResult(req);
        console.log('ezad');
        console.log(errors);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports.registrationValidation = [
    body('name').not().isEmpty().withMessage('Name field is required')
        .isAlphanumeric().withMessage('Name must be Alphanumeric'),
    body('phone_number').not().isEmpty().withMessage('Phone number field is required')
        .isLength({ min: 10 }).withMessage('Minimum 10 digit require'),
    body('email').isEmail().normalizeEmail().withMessage('Please enter Proper email'),
    body('password').isLength({ min: 8 }).withMessage('Password should contain 8 characters'),
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
