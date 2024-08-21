// const sessionIdToUserMap = new Map();
const jwt = require("jsonwebtoken");
const secret = "karan@1234";
function setUser(user) {
  //   sessionIdToUserMap.set(id, user);
  const payload = {
    _id: user._id,
    email: user.email,
  };
  return jwt.sign(payload, secret);
}

function getUser(token) {
  if (!token) return null;

  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
  //   sessionIdToUserMap.get(id);
}

module.exports = {
  setUser,
  getUser,
};
