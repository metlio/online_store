const cloudinary = require('cloudinary').v2;
const fs = require('fs');

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

/**
 * Uploads a file to Cloudinary.
 * @param {string} filePath - Path to the temporary file.
 * @returns {Promise<string>} - The secure URL of the uploaded image.
 */
const uploadToCloudinary = (filePath) => {
    return new Promise((resolve, reject) => {
        if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
            console.error('Cloudinary configuration is missing!');
            return reject(new Error('Cloudinary configuration is missing. Please check environment variables.'));
        }

        console.log(`Starting Cloudinary upload for file: ${filePath}`);

        cloudinary.uploader.upload(
            filePath,
            { resource_type: 'auto', folder: 'shop' },
            (error, result) => {
                if (error) {
                    console.error('Cloudinary upload error:', error);
                    reject(error);
                } else if (result) {
                    console.log('Cloudinary upload successful:', result.secure_url);
                    // Clean up the temp file after upload
                    try {
                        if (fs.existsSync(filePath)) {
                            fs.unlinkSync(filePath);
                            console.log('Temporary file deleted:', filePath);
                        }
                    } catch (err) {
                        console.warn('Failed to delete temporary file:', filePath, err);
                    }
                    resolve(result.secure_url);
                } else {
                    reject(new Error('Cloudinary upload failed with no result and no error.'));
                }
            }
        );
    });
};

module.exports = { uploadToCloudinary };
