const { verifySignUp } = require("../middleware");
const { validator } = require("../middleware/express_validator");
const controller = require("../controllers/auth.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/register",
    [
      verifySignUp.checkDuplicateUsernameOrEmail
    ],
    controller.register
  );

  app.post("/api/auth/login", controller.login);

  app.post("/api/auth/signout", controller.signout);
};