const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const codes = require("../utils/codes/codes.json");

const {
  hashPassword,
  comparePassword,
} = require("../utils/helpers/hashPasswords");

exports.signup = async (req, res) => {
  const { username, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({
      message: "Email already exists",
    });
  }

  const hashedPassword = await hashPassword(password);

  const user = await User({
    username,
    email,
    password: hashedPassword,
  });

  await user.save();

  res.status(201).json({
    message: "User created",
  });
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "User or Password is wrong",
      });
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "User or Password is wrong",
      });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      data: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred",
    });
  }
};

exports.search = async (req, res) => {
  const { code } = req.body;

  const filterInput = code;

  const filterRegex = new RegExp(
    "^" + filterInput.replace(/[a-zA-Z]/g, "\\d") + "$"
  );

  const filteredCodes = Object.keys(codes).filter((code) =>
    filterRegex.test(code)
  );

  const filteredURLs = filteredCodes.map((code) => ({
    url: `https://http.dog/${code}.jpg`,
    name: codes[code],
  }));

  if (filteredURLs <= 0) {
    res.status(404).json({
      message: "No match found",
    });
    return;
  }

  res.status(200).json({
    message: "Match found, fetch sucess",
    data: filteredURLs,
  });
};

exports.userAuth = async (req, res) => {
  res.status(200).json({
    message: "Auth Success",
    auth: true,
  });
};
