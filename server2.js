const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const cors = require('cors');

// Middleware to parse JSON body data
app.use(express.json());

// CORS configuration
app.use(cors({
    origin: '*' // Allow all origins, change this to a specific domain for better security
}));

// Define the paths to your CSV files
const eventosCSV = path.join(__dirname, 'eventos.csv');
const eventosRecorrentesCSV = path.join(__dirname, 'eventosRecorrentes.csv');
const eventosUnicosCSV = path.join(__dirname, 'eventosUnicos.csv');

// Helper function to append data to a CSV file
function appendToCSV(filePath, newLine, res) {
    fs.open(filePath, 'a', (err, fd) => {
        if (err) {
            console.error('Error opening the file:', err);
            return res.status(500).send('Failed to open the file.');
        }

        fs.appendFile(fd, `${newLine}\n`, (err) => {
            if (err) {
                console.error('Error writing to file:', err);
                return res.status(500).send('Failed to write to the file.');
            }
            res.send('Line added successfully!');
        });
    });
}

// Endpoint to add a line to eventos.csv
app.post('/add-line', (req, res) => {
    const { newLine } = req.body;

    if (!newLine) {
        return res.status(400).send('No data provided to write.');
    }

    appendToCSV(eventosCSV, newLine, res);
});

// Endpoint to add a line to eventosRecorrentes.csv
app.post('/add-line-recorrente', (req, res) => {
    const { newLine } = req.body;

    if (!newLine) {
        return res.status(400).send('No data provided to write.');
    }

    appendToCSV(eventosRecorrentesCSV, newLine, res);
});

// Endpoint to add a line to eventosUnicos.csv
app.post('/add-line-temporario', (req, res) => {
    const { newLine } = req.body;

    if (!newLine) {
        return res.status(400).send('No data provided to write.');
    }

    appendToCSV(eventosUnicosCSV, newLine, res);
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
