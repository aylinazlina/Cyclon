const mongoose= require("mongoose");
const {Schema,Types}= mongoose ;
const slugify= require("slugify");

const subcategorySchema= new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    slug: {
        type: String,
        // required: true,
        unique: true
    },
    image: {
    public_id: {
      type: String,
      required: true
    },
    secure_url: {
      type: String,
      required: true
    }
  },
    category: [{
        type: Types.ObjectId,
        ref: "Category",
        required: true
    }],
    discount:[{
        type:Types.ObjectId,
        ref:"Discount"
    }],
    isActive:{
        type:Boolean,
        default:true,
    }
},{
    timestamps:true,
});

//todo:make a slug
// ✅ CORRECT: Use a regular function
subcategorySchema.pre('save', async function (next) {
    // Now 'this' refers to the document
    if (this.isModified('name') || this.isNew) {
        // Example: automatically generate slug if you haven't already
        this.slug = this.name.toLowerCase().split(' ').join('-');
    }
    
});


//todo:check already exsist this email or not

subcategorySchema.pre("save" , async function (next){
 const findUser = await this.constructor.findOne({slug:this.slug}) ;
  if(findUser && findUser._id.toString() !== this._id.toString()){
    throw new customError(400, "User already Exsist try another email !");
} 

});


const categoryPopulate = async function(next){
    this.populate({
        path:"category",
    });
    next();
}

const sortsubCategory = async function(next){
    this.sort({createdAt: -1});
    next();
}

subcategorySchema.pre('find' ,sortsubCategory);
subcategorySchema.pre('find' ,categoryPopulate);





module.exports= mongoose.model("Subcategory", subcategorySchema);