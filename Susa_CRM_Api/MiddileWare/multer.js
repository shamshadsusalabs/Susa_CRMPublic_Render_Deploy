const multer = require('multer');
const admin = require('../firebaseConfig');
const stream = require('stream');

const bucket = admin.storage().bucket();

const multerStorage = multer.memoryStorage(); 

const fileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|csv|xlsx)$/)) {
        req.fileValidationError = 'Only specific file types allowed!';
        return cb(new Error('Only specific file types allowed!'), false);
    }
    cb(null, true);
};

const upload = multer({
    storage: multerStorage,
    fileFilter: fileFilter
});

const uploadToFirebase = (req, res, next) => {
    if (!req.files || req.files.length === 0) return next(new Error("No files to upload to Firebase."));

    const promises = req.files.map(file => {
        const fileStream = new stream.PassThrough();
        fileStream.end(file.buffer);

        const firebaseFile = bucket.file(file.originalname);

        return new Promise((resolve, reject) => {
            fileStream.pipe(firebaseFile.createWriteStream({
                metadata: {
                    contentType: file.mimetype
                }
            }))
            .on('error', reject)
            .on('finish', async () => {
                try {
                    // Ensure the file is public
                    await firebaseFile.makePublic();
                    // Get the public URL
                    const url = `https://storage.googleapis.com/${bucket.name}/${firebaseFile.name}`;
                    resolve(url);
                } catch (error) {
                    reject(error);
                }
            });
        });
    });

    Promise.all(promises)
        .then(urls => {
            req.fileUrls = urls; // Attach URLs to request object
            next();
        })
        .catch(error => {
            console.error('Error uploading files to Firebase:', error);
            next(error);
        });
};



module.exports = { upload, uploadToFirebase, bucket };
