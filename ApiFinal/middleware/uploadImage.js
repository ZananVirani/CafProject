// const fs = require('fs');

// async function uploadImage(filePath, imageName, callback) {
//     const uploadStream = bucket.openUploadStream(imageName);
//     const fileStream = fs.createReadStream(filePath);

//     fileStream.pipe(uploadStream);

//     uploadStream.on('finish', () => {
//         console.log('Image uploaded successfully with ID:', uploadStream.id);
//         callback(null, uploadStream.id);  // Pass the file ID to the callback
//     });

//     uploadStream.on('error', (error) => {
//         console.error('Error uploading image:', error);
//         callback(error);
//     });
// }

// module.exports = uploadImage;

async function uploadImage(imageBuffer, imageName, callback) {
    const uploadStream = bucket.openUploadStream(imageName);

    // Use the buffer to create a readable stream
    const bufferStream = new require('stream').Duplex();
    bufferStream.push(imageBuffer);
    bufferStream.push(null);

    bufferStream.pipe(uploadStream);

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
