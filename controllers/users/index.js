const create = require("./createUser");
const login = require("./loginUser");
const logout = require("./logoutUser");
const current = require("./current");
const update = require('./updateUser');

module.exports = {
  create,
  login,
  logout,
  current,
  update
};
