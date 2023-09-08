const express = require('express');
const app = express();
const bodyParser = require('body-parser');


app.use(bodyParser.json());


const userData = {
  user_id: "john_doe_17091999",
  email: "john@xyz.com",
  roll_number: "ABCD123"
};

// POST endpoint
app.post('/bfhl', (req, res) => {
  try {
    const data = req.body.data;
    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item) && item.length === 1);
    const highestAlphabet = alphabets.length > 0 ? [alphabets.reduce((a, b) => a > b ? a : b)] : [];

    const response = {
      is_success: true,
      user_id: userData.user_id,
      email: userData.email,
      roll_number: userData.roll_number,
      numbers: numbers,
      alphabets: alphabets,
      highest_alphabet: highestAlphabet
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ is_success: false, error_message: error.message });
  }
});

// GET endpoint
app.get('/bfhl', (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});