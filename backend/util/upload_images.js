import {v2 as cloudinary} from 'cloudinary'
const fs = require('fs')
const path = require('path')
const { CLOUDINARY_API_KEY, CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_SECRET } = require('./util/config')

cloudinary.config({ 
    cloud_name: CLOUDINARY_CLOUD_NAME, 
    api_key: CLOUDINARY_API_KEY, 
    api_secret: CLOUDINARY_API_SECRET
  })

const uploadImage = (filePath) => {
return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(filePath, (error, result) => {
    if (error) reject(error);
    else resolve(result.secure_url);
    });
});
};

const uploadImagesFromFolder = async (folderPath) => {
const files = fs.readdirSync(folderPath);
const urls = [];

for (const file of files) {
    const filePath = path.join(folderPath, file);
    if (fs.lstatSync(filePath).isFile()) {
    try {
        const url = await uploadImage(filePath);
        urls.push(url);
        console.log(`Uploaded ${file} to ${url}`);
    } catch (error) {
        console.error(`Error uploading ${file}:`, error);
    }
    }
}

return urls;
};

uploadImagesFromFolder('../../frontend/assets/products')
.then(urls => console.log('All images uploaded:', urls))
.catch(error => console.error('Error uploading images:', error));