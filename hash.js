require("dotenv").config();
const bcrypt = require("bcrypt");
console.log(process.env.SALT_ROUNDS);
const saltRounds = parseInt(process.env.SALT_ROUNDS);
console.log(typeof saltRounds);
console.log(process.env.HELLO);
const password = "password";

const makeSalt = async (saltRounds, password) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
    console.log(error);
  }
};
module.exports = makeSalt;
