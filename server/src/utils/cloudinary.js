const cloudinary= require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({ 
    cloud_name: 'dnvjqfy24', 
    api_key: '896948791151736', 
    api_secret: 'UTZJJ-b9vni8v2vwomxjxwUQkoU' 
  });


  const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: ' instaClone'
    }

})

module.exports = { cloudinary, storage }