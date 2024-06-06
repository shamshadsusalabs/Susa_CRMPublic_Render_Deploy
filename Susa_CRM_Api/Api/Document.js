const express = require('express');
const router = express.Router();
const xlsx = require('xlsx');
const { parse } = require('csv-parse');
const mongoose = require('mongoose');

const AnyModel = require('../Model/Document'); // Adjust path as necessary

router.post('/upload', (req, res) => {
    if (!req.files || !req.files.File) {
        return res.status(400).send('No files were uploaded.');
    }

    const uploadedFile = req.files.File;
    const fileType = uploadedFile.mimetype;
    const fileId = new mongoose.Types.ObjectId(); // Generate a unique ID for this file

    // Process Excel files (.xlsx and .xls) dynamically based on the header row
    const processExcelFile = (data) => {
        const workbook = xlsx.read(data, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const rows = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 });
        insertDataDynamic(rows);
    };

    // Process CSV files with a predefined schema
    const processCsvFile = (data) => {
        parse(data, { columns: true }, (err, output) => {
            if (err) {
                console.error("Failed to parse CSV", err);
                res.status(500).send('Failed to parse CSV.');
                return;
            }
            insertDataPredefined(output);
        });
    };

    // Function to handle dynamic data insertion
    const insertDataDynamic = (rows) => {
        if (rows.length === 0) return res.status(400).send('Empty file.');

        // Assuming the first row is the header
        const headers = rows[0];
        const documents = rows.slice(1).map(row => {
            let doc = { fileId: fileId, filename: uploadedFile.name }; // Include the fileId and filename in each document
            row.forEach((value, index) => {
                doc[headers[index]] = value;
            });
            return doc;
        });

        AnyModel.insertMany(documents)
            .then(result => {
                res.send(`File uploaded and ${result.length} records inserted under file ID ${fileId}!`);
            })
            .catch(err => {
                console.error("Failed to insert data into MongoDB", err);
                res.status(500).send('Database insertion failed');
            });
    };

    // Function to handle predefined data insertion for CSV
    const insertDataPredefined = (documents) => {
        documents = documents.map(doc => ({ ...doc, fileId: fileId, filename: uploadedFile.name })); // Add fileId and filename to each document
        AnyModel.insertMany(documents)
            .then(result => {
                res.send(`File uploaded and ${result.length} records inserted under file ID ${fileId}!`);
            })
            .catch(err => {
                console.error("Failed to insert data into MongoDB", err);
                res.status(500).send('Database insertion failed');
            });
    };

    // Process files based on MIME type
    switch (fileType) {
        case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': // For .xlsx
        case 'application/vnd.ms-excel': // For .xls
            processExcelFile(uploadedFile.data);
            break;
        case 'text/csv': // For CSV files
            processCsvFile(uploadedFile.data);
            break;
        default:
            res.status(400).send('Unsupported file type.');
            break;
    }
});


// Fetch all documents
router.get('/documents', async (req, res) => {
    try {
        const documents = await AnyModel.find();
        res.json(documents);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET a single document by ID
router.get('/documents/:id', async (req, res) => {
    try {
        const document = await AnyModel.findById(req.params.id);
        if (!document) {
            return res.status(404).json({ message: "Document not found" });
        }
        res.json(document);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
router.put('/documents/:id', async (req, res) => {
    try {
        const document = await AnyModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!document) {
            return res.status(404).json({ message: "Document not found" });
        }
        res.json(document);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a document
router.delete('/documents/:id', async (req, res) => {
    try {
        const document = await AnyModel.findByIdAndDelete(req.params.id);
        if (!document) {
            return res.status(404).json({ message: "Document not found" });
        }
        res.json({ message: "Document deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});




router.delete('/documents/file/:fileId', async (req, res) => {
    const fileId = req.params.fileId;
    try {
        if (!mongoose.Types.ObjectId.isValid(fileId)) {
            return res.status(400).json({ message: "Invalid fileId" });
        }

        // Correctly instantiate ObjectId with `new`
        const objectId = new mongoose.Types.ObjectId(fileId);

        // Attempt to delete documents with the specified fileId
        const result = await AnyModel.deleteMany({ fileId: objectId });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "No documents found with that fileId" });
        }
        res.json({ message: `Deleted ${result.deletedCount} documents with fileId ${fileId}` });
    } catch (err) {
        console.error("Failed to delete documents", err);
        res.status(500).json({ message: err.message });
    }
});

router.get('/documents/email/:email', async (req, res) => {
    const email = req.params.email;
    try {
        const documents = await AnyModel.find({ email: email });
        if (documents.length === 0) {
            return res.status(404).json({ message: "No documents found with that email ID" });
        }
        res.json(documents);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;
