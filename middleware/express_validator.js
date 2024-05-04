// import {body} from 'express-validator'

// export const loginValidator = [
//   body('email', 'Invalid does not Empty').not().isEmpty(),
//   body('email', 'Invalid email').isEmail(),
//   body('password', 'The minimum password length is 8 characters').isLength({min: 8}),
// ]

// export const createValidator = [
//   body('customer.name', 'name does not Empty').not().isEmpty(),
//   body('customer.email', 'Invalid email').isEmail(),
//   body('customer.name', 'custome rname must be Alphanumeric').isAlphanumeric(),
//   body('customer.password', 'password does not Empty').not().isEmpty(),
//   body('customer.password', 'The minimum password length is 6 characters').isLength({min: 8}),
//   body('customer.phone_number', 'Phone  does not empty.').not().isEmpty(),
//   body('customer.gender', 'Gender does not empty.').not().isEmpty(),
// ]