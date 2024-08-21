const USER = require("../models/user");
const { setUser } = require("../services/auth");

async function handleCreateUser(req, res) {
  const body = req.body;
  const { firstName, lastName, password, email } = req.body;

  // console.log(req.body, req, "req.body12333");
  const requiredFields = ["firstName", "lastName", "email"];
  const missingFields = requiredFields.filter((field) => !body[field]);
  if (missingFields.length > 0) {
    return res.status(400).json({
      message: `The following fields are required: ${missingFields.join(", ")}`,
    });
  }
  // const result = await USER.save({
  //   firstName: body.firstName,
  //   lastName: body.lastName,
  //   email: body.email,
  //   password: body.password,
  // });
  await USER.create({
    firstName,
    lastName,
    email,
    password,
  });

  return res.status(200).json({
    message: "User Created Succesfully",
  });
}

async function handlePostParticularUser(req, res) {
  console.log(req.body, "weifbweiubj");
  try {
    const userId = req.params._id;
    const { firstName, lastName, email } = req.body;

    // Create an update object with only the fields that are provided in the request
    const updateData = {};
    if (firstName !== undefined) updateData.firstName = firstName;
    if (lastName !== undefined) updateData.lastName = lastName;
    if (email !== undefined) updateData.email = email;

    // Find the user by id and update the specified fields
    const updatedUser = await USER.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).send("User not found");
    }

    res.send(updatedUser);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
}

async function handleGetUser(req, res) {
  const allDbUSer = await USER.find({});

  return res.status(201).json({
    message: "success",
    data: allDbUSer,
  });
}
async function handleGetParticularUser(req, res) {
  const user = await USER.findById(req.params._id);

  return res.status(201).json({
    message: "success",
    data: user,
  });
}

async function handleDeleteParticularUser(req, res) {
  try {
    const userId = req.params._id;

    // Find the user by id and delete
    const deletedUser = await USER.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).send("User not found");
    }

    res.send(deletedUser);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
}

async function handleLogin(req, res) {
  const { email, password } = req.body;
  console.log(req.body, "req.body");
  try {
    const existingUser = await USER.findOne({
      email: email,
      password: password,
    });

    if (existingUser) {
      // const sessionId = uuidv4();
      // setUser(sessionId, existingUser);
      const token = setUser(existingUser);
      // res.cookie("uid", token);
      return res.json({
        token: token,
      });
    } else {
      return res.status(400).json({
        message: "User Not Found",
      });
    }
  } catch (error) {
    return res.status(500).json({ ERROR: `Internal Server Error ${error}` });
  }
}

async function handleSignup(req, res) {}

async function handleCreateHobby(req, res) {}
module.exports = {
  handleCreateUser,
  handleGetUser,
  handleGetParticularUser,
  handlePostParticularUser,
  handleDeleteParticularUser,
  handleSignup,
  handleLogin,
  handleCreateHobby,
};
