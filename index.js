import express from 'express';
import { getHomeHeader, getBooksHeader } from './lib/scraper';

const app = express();

app.get('/scrape', async (req, res, next) => {
    console.log('scraping...');
    const [home, books] = await Promise.all([getHomeHeader(), getBooksHeader()]);
    console.log(`Home: ${home}, Books: ${books}`);
    res.json({home, books});
});

app.listen(3000, (details) => console.log('App running on port 3000'));