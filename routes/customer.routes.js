// module.exports = app => {
//     console.log('in route file');
//     const customers = require("../controllers/customers.js");
//     var router = require("express").Router();
//     router.post("/", customers.create);
//     router.get("/", customers.findAll);
//     router.get("/:id", customers.findOne);
//     router.put("/:id", customers.update);
//     router.delete("/:id", customers.delete);
//     app.use('/api/customers', router);
// }


const { authJwt } = require("../middleware");
const customers = require("../controllers/customers.js");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });
  app.post(
    "/api/customers/",
    [authJwt.verifyToken],
    customers.create
  );
  app.get(
    "/api/customers/",
    [authJwt.verifyToken],
    customers.findAll
  );
  app.get(
    "/api/customers/:id",
    [authJwt.verifyToken],
    customers.findOne
  );
  app.put(
    "/api/customers/:id",
    [authJwt.verifyToken, customers.uploadImg],
    customers.update
  );
  app.delete(
    "/api/customers/:id",
    [authJwt.verifyToken],
    customers.delete
  );
  app.get(
    "/api/customers/image/:id",
    [authJwt.verifyToken],
    customers.getImage
  );
};
