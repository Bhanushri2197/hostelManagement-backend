const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name : 'drymgpkqb',
    api_key : process.env.CLOUDNARY_API_KEY ,
    api_secret : process.env.CLOUDNARY_API_SECRET
})

const opts = {
    overwrite : true,
    invalidate : true,       
    gravity: "auto",    
    resource_type: "auto"
};

module.exports = (image) => {
   return new Promise((resolve,reject) => {
    cloudinary.uploader.upload(image,opts,(error,result) => {
        if(result && result.secure_url){
          return resolve(result.secure_url);
        }
        console.log(error.message);
        return reject({message: error.message})
    });
   });
};