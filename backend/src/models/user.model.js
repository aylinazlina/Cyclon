const mongoose=require("mongoose");
const {Schema}=mongoose;

const userSchema=new Schema({


    firstName:{
        type:String,
        trim:true,
        required:true,

    },
    lastName:{
        type:String,
        trim:true,
        required:true,
    },
    companyName:{
        type:String,
        trim:true,
        required:true,
    },
    email:{
        type:String,
        trim:true,
        required:true,
        unique:true,

    },
    password:{
        type:String,
        required:true,
        trim:true,
    },
    image:{
        type:String,
        required:false,
    },
    address:{
        type:String,
        required:false,
    },
    isEmailVerified:{
        type:Boolean,
        default:false,

    },
    isPhoneVerified:{
        type:Boolean,
        default:false,
    },
    role:{
        type:Types.ObjectId,
        ref:"Role",
    },
    permissions:{
        type:Types.ObjectId,
        ref:"Permission",
    },
    region:{
        type:String,
        required:false,
        trim:true,

    },
    district:{
        type:String,
        trim:true,
        required:false,
    },
    city:{
        type:String,
        trim:true,
        required:false,
    },
    thana:{
        type:String,
        trim:true,
        required:false,
    },
    zipCode:{
        type:Number,
        maxLength:4,
        required:false,
    },
    country:{
        type:String,
        trim:true,
        required:false,
        default:"Bangladesh",
    },
    dateOfBirth:{
        type:Date,
        required:false,

    },
    gender:{
        type:String,
        enum:["male","female","other"],
        required:false,
    },
    lastLogin:{
        type:Date,
    },
    lastLogout:{
        type:Date,
    },
    cart:{
        type:Types.ObjectId,
        ref:"Product",
    },
    wishList:{
        type:Types.ObjectId,
        ref:"Product",
    },
    newsletterSubscribe:Boolean,
    resetPasswordOTP:Number,
    resetPasswordExpireTime:Date,
    twoFactorEnabled:Boolean,
    isBlocked:Boolean,
    refreshToken:{
        type:String,
        trim:true,
    },
    isActive:Boolean,



})

//todo:Schema middleware
userSchema.pre("save",async function(next){
    if(this.isModified("password")){
     const saltPassword=await bycrypt.hash(this.password,10) ;
     this.password=saltPassword;
    }
    next();
})

module.exports=mongoose.model("User",userSchema);