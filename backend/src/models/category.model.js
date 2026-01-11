const mongoose = require("mongoose");
const {Schema,Types} = mongoose;
const slugify= require("slugify");

const categorySchema= new Schema({

    name:{
        type:String,
        trim:true,
        required:true,

    },
    image:{
        type:String,
        trim:true,
    },
    slug:{
        type:String,
        required:true,
        trim:true,
        unique:true,

    },
    isActive:{
        type:Boolean,
        default:true,

        
    },
   subCategories:[{
        type:Types.ObjectId,
        ref: "SubCategory",
   }],
   discount:[{
    type:Types.ObjectId,
    ref: "Discount",
   }]



},{
    timestamps:true,
})


//todo:make a slug
categorySchema.pre("save",async function(next){
    if(this.isModified("name") && this.isNew("name")){
        
 await  slugify(this.name, {
  replacement: '-',  
  remove: undefined, 
  lower: false,      
  strict: false,     

});
    this.slug = slug;
    };
});


//todo:check already exsist this email or not

categorySchema.pre("save" , async function (next){
 const findUser = await this.constructor.findOne({slug:this.slug}) ;
  if(findUser && findUser._id.toString() !== this._id.toString()){
    throw new customError(400, "User already Exsist try another email !");
} 


 next();
});

module.exports= mongoose.model("Category",categorySchema);