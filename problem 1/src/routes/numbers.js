const express = require('express');
const axios = require('axios');
const router = express.Router();

const windowSize = 10;
let numbersWindow = [];

const fetchNumbers = async (type) => {
  try {
    const response = await axios.get(`http://20.244.56.144/test/${type}`, { timeout: 500 });
    return response.data.numbers;
  } catch (error) {
    console.error(`Error fetching numbers of type ${type}:`, error.message);
    return [];
  }
};

const calculateAverage = (numbers) => {
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  return (sum / numbers.length).toFixed(2);
};

// Existing GET route
router.get('/:type', async (req, res) => {
  const { type } = req.params;
  const validTypes = ['primes', 'fibo', 'even', 'rand'];

  if (!validTypes.includes(type)) {
    return res.status(400).json({ error: 'Invalid type. Valid types are primes, fibo, even, rand.' });
  }

  const fetchedNumbers = await fetchNumbers(type);
  const prevState = [...numbersWindow];

  numbersWindow = [...new Set([...numbersWindow, ...fetchedNumbers])].slice(-windowSize);
  const avg = calculateAverage(numbersWindow);

  res.json({
    windowPrevState: prevState,
    windowCurrState: numbersWindow,
    numbers: fetchedNumbers,
    avg: parseFloat(avg)
  });
});

// New POST route
router.post('/', (req, res) => {
  const { type, numbers } = req.body;
  const validTypes = ['primes', 'fibo', 'even', 'rand'];

  if (!validTypes.includes(type)) {
    return res.status(400).json({ error: 'Invalid type. Valid types are primes, fibo, even, rand.' });
  }

  if (!Array.isArray(numbers)) {
    return res.status(400).json({ error: 'Numbers should be an array.' });
  }

  const prevState = [...numbersWindow];
  numbersWindow = [...new Set([...numbersWindow, ...numbers])].slice(-windowSize);
  const avg = calculateAverage(numbersWindow);

  res.json({
    windowPrevState: prevState,
    windowCurrState: numbersWindow,
    numbers: numbers,
    avg: parseFloat(avg)
  });
});

module.exports = router;
