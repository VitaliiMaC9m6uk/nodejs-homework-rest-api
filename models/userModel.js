const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
      select: false,
    },
    email: {
      type: String,
      match: emailRegexp,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: String,
  },
  { versionKey: false, timestamps: true }
);

// Pre save mongoose hook. Fires on Create and Save.
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});


/**
 * Custom mongoose method to validate password.
 * @param {string} candidate
 * @param {string} hash
 * @returns {Promise<boolean>}
 */
userSchema.methods.checkPassword = (candidate, hash) => bcrypt.compare(candidate, hash);


const User = model("User", userSchema);

module.exports = User;


