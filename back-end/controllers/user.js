//require User
const User = require("../models/User");
//require bcrypt
const bcrypt = require("bcrypt");

const salt = bcrypt.genSaltSync(10);
const jwt = require("jsonwebtoken");


//SignUp
exports.SignUp = async (req, res) => {
  try {

    //   req.body
    const { firstName, lastName, email, phone, password, image, role } = req.body;

    // check if the email is not found in the database
    const FoundUser = await User.findOne({ email });

    if (FoundUser) {
      res.status(400).send({
        errors: [{ msg: "user already exist email should be unique" }],
      });
      return;
    }
    const newUser = new User({ firstName, lastName, email, phone, password, image, role });

    // hash the password
    const hashedpassword = bcrypt.hashSync(password, salt);
    newUser.password = hashedpassword;

    // create a key using json webtoken
    const token = jwt.sign(
      {
        id: newUser._id,
      },
      process.env.SECRET_KEY,
      { expiresIn: "24h" }
    );
    //then we save it in the database
    await newUser.save();
    res.status(200).send({ msg: "user saved succ", user: newUser, token });
  } catch (error) {
    console.log(error);
    res.status(400).send({ errors: [{ msg: "can not save the user" }] });
  }
};

//SignIn
exports.SignIn = async (req, res) => {
  try {
    // get the req.body
    const { email, password } = req.body;
    // seach if the user exist
    const searchUser = await User.findOne({ email });

    // send an error if he didnt exist
    if (!searchUser) {
      res.status(400).send({ errors: [{ msg: "Bad Credential" }] });
      return;
    }
    // check if the send it password is equal to the current Password
    const hashedpass = searchUser.password;
    const result = await bcrypt.compare(password, hashedpass);
    if (!result) {
      res.status(400).send({ errors: [{ msg: "Bad Credential" }] });
      return;
    }
    // else create a key
    const token = jwt.sign(
      {
        id: searchUser._id,
      },
      process.env.SECRET_KEY,
      { expiresIn: "24h" }
    );
    if (!searchUser.activeUser) {
      res.status(400).send({ errors: [{ msg: "This Account Is Disabled " }] });
      return;
    }

    // send the details + a key
    res.status(200).send({ msg: "auth success", user: searchUser, token });
  } catch (error) {
    console.log(error);
    res.status(400).send({ errors: [{ msg: "can not get the currentUser" }] });
  }
};

//Get All Users
exports.getAllUser = async (req, res) => {
  try {
    const result = await User.find()
    res.status(200).send({ msg: 'Success To Get All Users...', users: result })
  } catch (error) {
    res.status(400).send({ msg: "Can Not Get Users !!!", error })
  }
}

//update
exports.update = async (req, res) => {
  try {
    const result = await User.updateOne({ _id: req.params.id }, { $set: req.body })
    if (!result.nModified) {
      res.status(400).send({ msg: "User Already Updated !!!", error })
      return;
    }
    res.status(200).send({ msg: 'User is Updated ...', result })
  } catch (error) {
    res.status(400).send({ msg: "Can Not Updated User with this id !!!", error })
  }
}