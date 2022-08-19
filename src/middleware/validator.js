const { check, body, validationResult } = require("express-validator");

exports.validateAuthRequest = [
  //   body("email", "Email is required").isEmail(),
  check("username", "Username is required").not().isEmpty(),
  check("email", "Valid email is required").isEmail(),
//   check("email", "Email is not valid"),
//   check("password", "Password is required").not().isEmpty(),
  check("password", "Password must be at least 6 characters long").isLength({
    min: 6,
  }),
//   check("role", "Role must be either user, staff or manager")?.isIn([
//     "user",
//     "staff",
//     "manager",
//   ]),
];

exports.authValidationResult = (req, res, next) => {
  const errors = validationResult(req);
//   console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
// req.check('name', 'Name is required').notEmpty();
// req.check('email', 'Email is required').notEmpty();
// req.check('password', 'Password is required').notEmpty();
// req.check('password', 'Password must be at least 6 characters long').isLength({ min: 6 });
// req.check('role', 'Role is required').notEmpty();
// req.check('role', 'Role must be either admin, manager, or staff').isIn(['admin', 'manager', 'staff']);
// req.check('role', 'Role must be either admin, manager, or staff').isIn(['admin', 'manager', 'staff']);
// req.check('role', 'Role must be either admin, manager, or staff').isIn(['admin', 'manager', 'staff']);
// req.check('role', 'Role must be either admin, manager, or staff').isIn(['admin', 'manager', 'staff']);
// req.check('role', 'Role must be either admin, manager, or staff').isIn(['admin', 'manager', 'staff']);
// req.check('role', 'Role must be either admin, manager, or staff').isIn(['admin', 'manager', 'staff']);
// req.check('role', 'Role must be either admin, manager, or staff').isIn(['admin', 'manager', 'staff']);
// req.check('role', 'Role must be either admin, manager, or staff').isIn(['admin', 'manager', 'staff']);
// req.check('role', 'Role must be either admin, manager, or staff').isIn(['admin', 'manager', 'staff']);
// req.check('role', 'Role must be either admin, manager, or staff').isIn(['admin', 'manager', 'staff']);
// req.check('role', 'Role must be either admin, manager, or staff').isIn(['admin', 'manager', 'staff']);
// req.check('role', 'Role must be either admin, manager, or staff').isIn(['admin', 'manager', 'staff']);
// req.check('role', 'Role must be either admin, manager, or staff').isIn(['admin', 'manager', 'staff']);
