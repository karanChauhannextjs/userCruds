const express = require("express");
const router = express.Router();
const {
  handleCreateUser,
  handleGetUser,
  handleGetParticularUser,
  handlePostParticularUser,
  handleDeleteParticularUser,
  handleSignup,
  handleLogin,
  handleCreateHobby,
} = require("../controlers/user");

router.post("/create", handleCreateUser);
router.post("/login", handleLogin);
router.get("/get", handleGetUser);
router.get("/signup", handleSignup);
router.post("hobby/create", handleCreateHobby);

router
  .route("/:_id")
  .get(handleGetParticularUser)
  .post(handlePostParticularUser)
  .delete(handleDeleteParticularUser);

module.exports = router;
