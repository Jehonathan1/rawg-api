import express from 'express';
import axios from 'axios';
import cors from 'cors'; // Don't forget to install this package if you haven't

const app = express();
app.use(cors()); // Enable CORS for all routes

// Ensure the API key is set
if (!process.env.VITE_GAMES_API_KEY) {
    console.error("Environment variable GAMES_API_KEY is not set");
    process.exit(1);
}
const KEY = process.env.GAMES_API_KEY;

const fetchFromRawg = async (url, req, res) => {
  try {
    const response = await axios.get(url, {
      params: { ...req.query, key: KEY }
    });
    res.json(response.data);
  } catch (error) {
    console.error(`Failed to fetch from RAWG API: ${error}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// platforms
app.get('/platforms/lists/parents', async (req, res) => {
  await fetchFromRawg('https://api.rawg.io/api/platforms/lists/parents', req, res);
});

// games
app.get('/games', async (req, res) => {
  await fetchFromRawg('https://api.rawg.io/api/games', req, res);
});

// genres
app.get('/genres', async (req, res) => {
  await fetchFromRawg('https://api.rawg.io/api/genres', req, res);
});

// Run app
const port = process.env.PORT || 3000; // Use the PORT environment variable if it exists
app.listen(port, () => {
  console.log(`Serving on port ${port}`);
});
