// Simulated server logic (for demonstration)
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/api/incidents', (req, res) => {
    // Simulate creating an incident
    res.status(201).send({ message: 'Incident created' });
});

app.delete('/api/incidents/:id', (req, res) => {
    // Simulate resolving an incident
    res.status(200).send({ message: 'Incident resolved' });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
