//require express
const express = require("express");
//reqquire router
const router = express.Router();
//require controllers
const { SignUp, SignIn, update, getAllUser } = require("../controllers/user");
// require middlewares Authentication
const isAuth = require("../middlewares/auth_jwt");
const upload = require("../middlewares/multer");

// require middlewares User
const {
  registerValidation,
  signinValidation,
  validation,
} = require("../middlewares/user");

/**
 * @desc : Route SignUp New User
 * @path : 'http://localhost:8000/api/user/signup'
 * @method : POST
 * @data : req.body
 */
router.post("/signup", SignUp);

/**
 * @desc : Route User SignIn
 * @path : 'http://localhost:8000/api/user/signin'
 * @method : POST
 * @data : req.body
 */
router.post("/signin", signinValidation(), validation, SignIn);

/**
* @desc : Route Get User Token
* @path : 'http://localhost:8000/api/user/current'
* @method : GET
* @data : req.headers
*/
router.get("/current", isAuth, (req, res) => {
  res.send(req.user);
});

/**
 * @desc : Route Get All User
 * @path : 'http://localhost:8000/api/user/'
 * @method : GET
 * @data : no Data
 */
router.get('/', getAllUser)

/**
 * @desc : Route Update User
 * @path : 'http://localhost:8000/api/user/update/:id'
 * @method : PUT
 * @data : req.params , req.body
 */
router.put("/update/:id", update)

module.exports = router;