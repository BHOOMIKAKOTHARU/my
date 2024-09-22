const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Storage for uploaded files
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// POST method
app.post('/bfhl', upload.single('file'), (req, res) => {
    const data = req.body.data || [];
    const file = req.file;

    const userId = "john_doe_17091999"; // Change this as needed
    const email = "john@xyz.com"; // Change this as needed
    const rollNumber = "ABCD123"; // Change this as needed

    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item));
    const highestLowercaseAlphabet = alphabets.filter(c => c.match(/[a-z]/)).sort().pop() || '';
    const fileValid = file && file.size > 0;
    const fileMimeType = fileValid ? file.mimetype : null;
    const fileSizeKb = fileValid ? (file.size / 1024).toFixed(2) : null;

    res.json({
        is_success: true,
        user_id: userId,
        email: email,
        roll_number: rollNumber,
        numbers: numbers,
        alphabets: alphabets,
        highest_lowercase_alphabet: highestLowercaseAlphabet ? [highestLowercaseAlphabet] : [],
        file_valid: fileValid,
        file_mime_type: fileMimeType,
        file_size_kb: fileSizeKb,
    });
});

// GET method
app.get('/bfhl', (req, res) => {
    res.json({ operation_code: 1 });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
