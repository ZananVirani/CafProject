const fs = require('fs');

async function uploadImage(filePath, imageName, callback) {
    const uploadStream = bucket.openUploadStream(imageName);
    const fileStream = fs.createReadStream(filePath);

    fileStream.pipe(uploadStream);

    uploadStream.on('finish', () => {
        console.log('Image uploaded successfully with ID:', uploadStream.id);
        callback(null, uploadStream.id);  // Pass the file ID to the callback
    });

    uploadStream.on('error', (error) => {
        console.error('Error uploading image:', error);
        callback(error);
    });
}

module.exports = uploadImage;