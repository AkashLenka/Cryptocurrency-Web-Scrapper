# CryptoCurrency Web Scrapper API

An opensource CryptoCurrency API (currently uses worldometer only)

## Output

### Examples

- CryptoCurrency Every currency Data
    + Request URL
        ```
        <your-ip>/api/all
        ```

- CryptoCurrency Paritcular Currency Data
    + Request URL
        ```
        <your-ip>/api/crypto/{currency_name}
        ```
    

## Usage

On VPS (Unix Based Systems)

1. Clone the Repository
    + `git clone https://github.com/AkashLenka/Cryptocurrency-Web-Scrapper`
2. Install dependencies
    + `npm i package.json`
2. Run `webscrapper.js`
    + `nodemon webscrapper.js`
    + Note: The Scraper has a time interval of 1 hour by default
3. If you want to host for web then update your rules in nginx accordingly and get one ssl certificate

## Contribution

There is a lot of work still remaining. Some of which:
1. Adding more sources
2. Cleaning Data

For Extra features (other than the above) you want to contribute, open an issue first.
