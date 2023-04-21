const express = require("express");
const app = express();
const axios = require("axios");
const NodeCache = require('node-cache');
const cache = new NodeCache();
const rateLimit = require('express-rate-limit');

var cors = require("cors");
app.use(cors());

require('dotenv').config();

const API_KEY = process.env.ALPHA_VANTAGE_API_KEY;


function getDataFromAPI(symbol) {
  const priceUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&apikey=${API_KEY}`;
  const metaUrl = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${API_KEY}`;

  const pricePromise = axios.get(priceUrl);
  const metaPromise = axios.get(metaUrl);

  return Promise.all([pricePromise, metaPromise])
    .then(responses => {
      const priceData = responses[0].data;
      const metaData = responses[1].data;

      // Combine the price and metadata into a single object
      const combinedData = {
        metaData:metaData,
        prices: Object.entries(priceData["Time Series (Daily)"]).map(([date, values]) => ({
          x: date,
          y: parseFloat(values["4. close"])
        }))
       
      };

      // Store the response data in the cache with a TTL of 1 hour
      cache.set(symbol, combinedData, 3600);
      return combinedData;
    })
    .catch(error => {
      console.log(error);
      return null;
    });
}



function getDataFromCache(symbol) {
  const cachedData = cache.get(symbol);
  if (cachedData) {
    return Promise.resolve(cachedData);
  } else {
    return getDataFromAPI(symbol);
  }
}

// set up rate limiting middleware
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 3, // limit each IP to 5 requests per minute
  message: 'Too many requests from this IP, please try again in a minute',

  skip: (req) => {
    const symbol = req.params.symbol.toUpperCase();
    return cache.get(symbol); // skip rate limit for cached data
  }
});

app.get('/api/data/:symbol', limiter, (req, res) => {
  const symbol = req.params.symbol.toUpperCase();

  getDataFromCache(symbol)
    .then(data => {
      if (data) {
        res.json(data);
      } else {
        // If data is not cached, retrieve it from the APIs
        getDataFromAPI(symbol)
          .then(combinedData => {
            if (combinedData) {
              res.json(combinedData);
            } else {
              res.status(404).send(`No data available for symbol ${symbol}`);
            }
          })
          .catch(error => {
            console.log(error);
            res.status(500).send('An error occurred while fetching the data');
          });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).send('An error occurred while fetching the data');
    });
});


app.listen(3000, () => {
  console.log(`Server listening on port 3000`);
});
