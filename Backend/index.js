const port =4000;
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
// const dotenv = require('dotenv');
const jwt= require('jsonwebtoken');

const path = require('path');
const multer = require('multer');
const { type } = require('os');


app.use(cors());
app.use(express.json());
mongoose.connect("mongodb+srv://ashishranjan7868:Wq8z0z0miEo4CAVr@cluster0.2zwswox.mongodb.net/e-commerce")

app.get('/', (req, res) => {
    res.send('Welcome to the E-commerce Backend');  
});

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
       return  cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
}); 
const upload = multer({ storage: storage });

app.use('/images', express.static('upload/images'));

app.post('/upload', upload.single('product'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
   res.json({
        success:1,
       image_url: `http://localhost:${port}/images/${req.file.filename}`
    });
});

const Product=mongoose.model('Product', new mongoose.Schema({
      id:{
        type: Number,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      category: {
        type: String,
        required: true,
      },
      new_price: {
        type: Number,
        required: true,
      },
      old_price: {
        type: Number,
        required: true,
      },    
      date: {
        type: Date,
        default: Date.now
      },
      avilable: {
        type: Boolean,
        default: true
      }
}));
app.post('/addproduct', async (req, res) => {
    let products= await Product.find();
    let id;
    if(products.length>0){
        let last_product_array=products.slice(-1);
        let last_product=last_product_array[0];
        id=last_product.id+1;
    }
    else{
        id=1;
    }


    const product=new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
    });
    console.log(product);
    await product.save();
    console.log('Product added successfully');
    res.json({ success: 1, name: req.body.name });
});


app.post('/removeproduct', async (req, res) => {
await Product.findOneAndDelete({ id: req.body.id });
console.log('Product removed successfully');
    res.json({ success: 1, name:  req.body.name });
});
app.get('/allproducts', async (req, res) => {
    const products = await Product.find({});
    console.log('All products fetched successfully');
   res.send(products);
});


const Users= mongoose.model('Users', {
    name: {
        type: String,
        required: true, 
    },
    email: {
        type: String,
        required: true,
        unique: true, 
    },
    password: {
        type: String,
       required: true
    },
    cartData: {
        type: Object,
        
    },
    date: {
        type: Date,
        default: Date.now
    }
});

app.post('/signup', async (req, res) => {
   let check=await Users.findOne({ email: req.body.email });
   if(check){
        return res.status(400).json({ success: 0, message: 'User already exists' });
    }
    let cart={};
    for(let i=0; i<300; i++){
        cart[i]=0;
    }
  const user = new Users({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        cartData: cart
    });
    await user.save();
    console.log('User signed up successfully');
    const data={
      user:{
        id: user.id
      }
    }

    const token= jwt.sign(data,'secretkey');
    res.json({ success: 1, token: token});
    // Check if user already exists
   
});

app.post('/login', async (req, res) => {
   
    const user = await Users.findOne({ email:req.body.email });
    if(user){
      const compPassword = user.password === req.body.password;
      if(!compPassword){  
        return res.status(400).json({ success: 0, message: 'Invalid password' });
      }
      else{
        const data = {
          user: {
            id: user.id
          }
        };
        console.log('User logged in successfully');
         const token = jwt.sign(data, 'secretkey');
    res.json({ success: 1, token: token });
      }
    }
    else{
        return res.status(400).json({ success: 0, message: 'User not found' });
    }
   
});

app.get('/newcollections', async (req, res) => {
    let products = await Product.find({});
    let newcollection = products.slice(1).slice(-8);

    console.log('New collection fetched successfully');
    res.send(newcollection);
});

app.get('/popularinwomen', async (req, res) => {
    let products = await Product.find({ category: 'women' });
    let popular_in_women = products.slice(0,4);
    console.log('Products in women category fetched successfully');
    res.send(popular_in_women);
});

const fetchUser = async (req, res, next) => {
  const token = req.header('token');
  console.log("TOKEN FROM HEADER:", token); // 👈 log token
  if (!token) {
    return res.status(401).json({ success: 0, message: 'No token provided' });
  }

  try {
    const data = jwt.verify(token, 'secretkey');
    console.log("DECODED DATA:", data); // 👈 log decoded token
    req.user = data.user;
    next();
  } catch (error) {
    console.error("JWT ERROR:", error);
    return res.status(401).json({ success: 0, message: 'Invalid token' });
  }
};

app.post('/addtocart', fetchUser, async (req, res) => {
  console.log("USER ID:", req.body.itemId); // 👈 log user ID
   let userData = await Users.findById({ _id: req.user.id });
   userData.cartData[req.body.itemId] += 1;
   await Users.findByIdAndUpdate({ _id: req.user.id }, { cartData : userData.cartData });
   res.send("Added to cart successfully");
  //  console.log('Item added to cart successfully');  
});

app.post('/removefromcart', fetchUser, async (req, res) => {
  console.log("USER ID:", req.body.itemId); // 👈 log user ID
   let userData = await Users.findById({ _id: req.user.id });
   userData.cartData[req.body.itemId] -= 1;
   await Users.findByIdAndUpdate({ _id: req.user.id }, { cartData : userData.cartData });
   res.send("Removed from cart successfully");
});


app.post('/getcart', fetchUser, async (req, res) => {
  console.log("USER ID:", req.user.id); // 👈 log user ID
   let userData = await Users.findOne({ _id: req.user.id });
   res.json(  userData.cartData );
});

app.listen(port, (err) => {
    if (err) {
        console.error(`Error starting server: ${err}`);
    } else {
        console.log(`Server is running on port : ${port}`);
    }
});
