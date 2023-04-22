# Stock Data API

This app contains both frontend and backend of Stock Data API

Frontend is based on react + chartjs 
Backend is based on NodeJS + express 


# Backend for Stock Data API

    ## Stock Data API

    This is a Node.js API that retrieves stock data from the Alpha Vantage API and caches it using the NodeCache library. The API rate limits requests to prevent abuse and to avoid exceeding the Alpha Vantage API limits.

    ## Getting Started

    1. Clone the repository and navigate to the project directory.
    2. Install dependencies using the command `npm install`.
    3. Rename the `.env.example` file to `.env` and set the `ALPHA_VANTAGE_API_KEY` variable to your Alpha Vantage API key.
    4. Start the server using the command `npm start`.
    5. Send a GET request to `http://localhost:3000/api/data/:symbol` where `:symbol` is the stock symbol you want to retrieve data for.

    ## API Endpoints

    ### `GET /api/data/:symbol`

    Retrieves stock data for the specified symbol.

    #### Parameters

    | Parameter | Type   | Required | Description                                       |
    | --------- | ------ | -------- | ------------------------------------------------- |
    | `symbol`  | string | yes      | The stock symbol to retrieve data for (e.g. AAPL) |

    #### Response

    Returns a JSON object containing the stock data.

    Example response:

    {
        "metaData": {
            "Symbol": "AAPL",
            "Name": "Apple Inc.",
            // ...
        },
        "prices": [
            {
            "x": "2022-04-20",
            "y": 132.03
            },
            {
            "x": "2022-04-19",
            "y": 133.22
            },
            // ...
        ]
    }


    If no data is available for the specified symbol, the API will return a 404 error.

    ## Rate Limiting

    The API implements rate limiting to prevent abuse and to avoid exceeding the Alpha Vantage API limits. Requests are limited to 3 requests per minute per IP address by default. Cached data is not subject to rate limiting.

    If a client exceeds the rate limit, the API will return a 429 error with the message "Too many requests from this IP, please try again in a minute".

    ## Caching

    The API uses the NodeCache library to cache stock data in memory. Data is cached with a TTL of 1 hour by default.


# Frontend for Stock Data API

This React app displays a chart of a stock's historical prices using Chart.js library. It fetches the data from our own API and displays various information about the stock along with the chart, Company Symbol is passed as query parameter to our app, you use different company symbols to fetch company info.

http://localhost:3000/api/data/googl = Will fetch googl stock data.


## Installation

To run this app, follow these steps:

1. Clone the repository
2. Install dependencies using the command `npm install`.
3. Run npm start to start the app

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.


Demo to show how to pull daily stock data from Alpha Vantage API from our own service, add caching for optimization and rate limiter for limitations.