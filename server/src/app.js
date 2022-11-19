const express = require('express');

const app = express();
const bodyParser = require("body-parser");
const multer = require('multer');
const PostData = require("./models/Post")
const cors = require("cors");

const { cloudinary } = require ('./utils/cloudinary');
const formidable = require("formidable");
const fileupload = require('express-fileupload');



app.use(cors());
const upload = multer({  })
app.use(express.urlencoded());

app.use(express.json({limit : '50mb'}));
app.use(bodyParser.urlencoded({ limit : '50mb' , extended: true }))
app.use(bodyParser.json())


app.use(fileupload({useTempFiles: true}))
// var publicDir = require('path').join(__dirname,'/public'); 
// app.use(express.static(publicDir));

//  const storage = multer.diskStorage({
//     dest:  'public/upload'
// ,
//      filename: function (req,file, cb){
//         cb(null, Date.now() + "--" + file.originalname)
//      }

//  });

// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, 'uploads');
//     },

//     // By default, multer removes file extensions so let's add them back
//     filename: function(req, file, cb) {
   
//         //   if (fs.existsSync(path.join('public/uploads',file.originalname))) {
//         //     cb(null, file.originalname.split('.+"(1)")
//         //   }else{
//         //     cb(null, file.originalname)
//         //   }
//         cb(null, file.originalname);
//     }
// });
// //const upload = multer({dest: 'public/upload'})

// const upload = multer({storage});
// app.use("/uploads", express.static('uploads'));

// Parse JSON bodies (as sent by API clients)




//app.use("/uploads", express.static(__dirname + '/public/uploads'));
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "public/uploads");
//       },
//     filename: function (req,file, cb){
//         cb(null, Date.now() + "--" + file.originalname)
//     }

// });

//

app.post('/uploads', async (req,res)=>{
   // console.log(req.file);
   const file = req.files.image

   try{
    console.log(file);
    console.log(req.body);
    
    const result =  await cloudinary.uploader.upload(file.tempFilePath, {
        public_id: `${Date.now()}`, 
        resource_type: "auto",
        upload_preset: "ml_default"
    })


    const url = result.secure_url;
    const { name, description, location } = req.body;
   
    try {
        if(!req.body.likes){
       const   user = await PostData.create({
           name,
           description,
           location,
           image: { url: url},
       });
      }else{
      const user = await PostData.create({
           name,
           description,
           location,
           likes: req.body.likes,
           image: { url: url},
       });
      }
       
       res.json({ ok: "send " })
   } catch (e) {
       res.json({ error: e.message })
   }
    
    }catch(err){
      console.log("Error", err)
    return res.status(400).json({error: err})
    }
})

// app.post('/api/uploadImage', async (req, res) => {
//     try {
//         const fileStr = req.body.data;
//         const uploadResponse = await cloudinary.uploader.upload(fileStr, {
//             upload_preset: 'insta_ims',
//         });
//         console.log(uploadResponse);
//         res.json({ msg: 'yaya' });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ err: 'Something went wrong' });
//     }
// });

// app.post("/upload", upload.single('image'), async (req, res) => {
//   console.log(req.body);
    
   
//    // const { name, description, location, date } = req.body;
//    const { name, description, location } = req.body;
//     const { path, filename } = req.file;
//     try {
//          if(!req.body.likes){
//         const   user = await PostData.create({
//             name,
//             description,
//             location,
//             image: { url: path, destination: req.file.destination, filename: filename },
//         });
//        }else{
//        const user = await PostData.create({
//             name,
//             description,
//             location,
//             likes: req.body.likes,
//             image: { url: path, destination: req.file.destination, filename: filename },
//         });
//        }
        
      
//       //  res.send({ "msg": "This has CORS enabled 🎈" })
//         res.json({ ok: "send " })
//     } catch (e) {
//         res.json({ error: e.message })
//     }

// });

app.get("/", async (req, res) => {
    try {
        const data = await PostData.find();
        res.json(data)
    } catch (e) {
        res.json({ name: "error in loading data" })
    }

})

module.exports = app;