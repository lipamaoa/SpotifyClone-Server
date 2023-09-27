const { User, validate } = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");



/*** Signup***/

const signUp = async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });
    if (user)
      return res
        .status(403)
        .send({ message: "User with given email already Exist!" });

    const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    let newUser = await new User({
      ...req.body,
      password: hashedPassword,
    }).save();

    newUser.password = undefined;
    newUser.__v = undefined;

    res
      .status(200)
      .send({ data: newUser, message: "User created successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};


/*** User Login***/

const login = async (req, res) => {
  const user=await User.findOne({ email: req.body.email });
  if(!user)
    return res.status(400).send({ message: "Invalid email or password" });

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    
    if(!validPassword)
      return res.status(400).send({ message: "Invalid email or password" });
    
    const token = user.generateAuthToken();
     res.status(200).send({data:token, message: "Signing in please wait..." });
};


module.exports = { signUp, login };
