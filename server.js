const express = require('express');
const fs = require('fs');
const app = express();

// Middleware to parse JSON body data
app.use(express.json());

const cors = require('cors');
app.use(cors());


// Path to your CSV file
const filePath = 'eventos.csv';

// Endpoint to append a new line to the CSV file
app.post('/add-line', (req, res) => {

    const filePath = 'eventos.csv';
    const { newLine } = req.body;

    if (!newLine) {
        return res.status(400).send('No data provided to write.');
    }

    // Append the new line to the CSV file
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
    
});

app.post('/add-line-recorrente', (req, res) => {

    const filePath = 'eventosRecorrentes.csv';
    const { newLine } = req.body;

    if (!newLine) {
        return res.status(400).send('No data provided to write.');
    }

    // Append the new line to the CSV file
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
    
});

app.post('/add-line-temporario', (req, res) => {
    const filePath = 'eventosUnicos.csv';
    const { newLine } = req.body;

    if (!newLine) {
        return res.status(400).send('No data provided to write.');
    }

    // Append the new line to the CSV file
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
    
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
