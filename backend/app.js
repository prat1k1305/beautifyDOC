const express = require('express');
const multer = require('multer');
const SwaggerParser = require('swagger-parser');
const path = require('path');
const fs = require('fs');
const cors = require('cors'); // Import the cors package

const app = express();
const upload = multer({ dest: 'uploads/' });

// Use cors as middleware
app.use(cors({
    origin: '*', // Allow all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Allow these headers
  }));

  app.post('/upload', upload.single('file'), async (req, res) => {
    const filePath = path.join(__dirname, req.file.path);
    
    try {
      const api = await SwaggerParser.validate(filePath);
      res.json(api);
      fs.unlinkSync(filePath); // Delete the uploaded file after processing
    } catch (err) {
      res.status(400).json({ 
        error: {
          message: err.message,
          stack: err.stack, // Include the stack trace for debugging
          name: err.name // Include the error name for more context
        }
      });
      fs.unlinkSync(filePath); // Delete the uploaded file in case of an error
    }
  });

app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});