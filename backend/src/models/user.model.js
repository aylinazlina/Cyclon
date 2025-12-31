const mongoose = require("mongoose");
const { Schema, Types } = mongoose;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { customError } = require("../utils/customError");

const userSchema = new Schema({
  firstName: {
    type: String,
    trim: true,
    required: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: false,
  },
  companyName: {
    type: String,
    trim: true,
    required: false,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  isPhoneVerified: {
    type: Boolean,
    default: false,
  },
  role: {
    type: Types.ObjectId,
    ref: "Role",
  },
  permissions: {
    type: Types.ObjectId,
    ref: "Permission",
  },
  region: {
    type: String,
    required: false,
    trim: true,
  },
  district: {
    type: String,
    trim: true,
    required: false,
  },
  city: {
    type: String,
    trim: true,
    required: false,
  },
  thana: {
    type: String,
    trim: true,
    required: false,
  },
  zipCode: {
    type: Number,
    maxLength: 4,
    required: false,
  },
  country: {
    type: String,
    trim: true,
    required: false,
    default: "Bangladesh",
  },
  dateOfBirth: {
    type: Date,
    required: false,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    required: false,
  },
  lastLogin: {
    type: Date,
  },
  lastLogout: {
    type: Date,
  },
  cart: {
    type: Types.ObjectId,
    ref: "Product",
  },
  wishList: {
    type: Types.ObjectId,
    ref: "Product",
  },
  newsletterSubscribe: Boolean,
  resetPasswordOTP: Number,
  resetPasswordExpireTime: Date,
  twoFactorEnabled: Boolean,
  isBlocked: Boolean,
  refreshToken: {
    type: String,
    trim: true,
  },
  isActive: Boolean,
});

//todo:Schema middleware
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const saltPassword = await bcrypt.hash(this.password, 10);
    this.password = saltPassword;
  }
});

//todo:check already this email exsist or not
userSchema.pre("save", async function (next) {
  const findUser = await this.constructor.findOne({ email: this.email });
  if (findUser && findUser._id.toString() !== this._id.toString()) {
    throw new customError(400, "User already exsist try another email!");
  }
});

//todo:generate accessToken method

userSchema.method.generateAccessToken = async function () {
  const accessToken = jwt.sign(
    {
      userId: this._id,
      email: this.email,
      role: this.role,
    },
    process.env.ACCESSTOKEN_SECRET,
    process.env.ACCESSTOKEN_EXPIRE
  );
};

//todo:generate refreshToken method

userSchema.method.generateRefreshToken = async function () {
  return jwt.sign(
    {
      userId: this._id,
    },
    process.env.REFRESHTOKEN_SECRET,
    process.env.REFRESHTOKEN_EXPIRE
  );
};


//todo:verify Accesstoken method

userSchema.method.verifyAccessToken = async function (token){
    return await jwt.verify(token,process.env.ACCESSTOKEN_SECRET);

};

//todo:verify Refreshtoken method
userSchema.method.verifyRefreshToken = async function (token){
   return await jwt.verify(token,process.env.REFRESHTOKEN_SECRET);
};

module.exports = mongoose.model("User", userSchema);
