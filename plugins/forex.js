const {smd, send} = require("../lib")
const fetch = require('node-fetch')
const axios = require('axios');
smd({
    pattern: "forex1",
    category: "forex",
    desc: "Fetches the latest forex news",
    filename: __filename,
    use: "forexnews",
  }, async (message) => {
    try {
      const apiUrl = "https://api.polygon.io/v2/reference/news?apiKey=Y4iTYoJANwppB8I3Bm4QVWdV5oXlvc45";
      const response = await fetch(apiUrl);
      const data = await response.json();
  
      if (!data.results || data.results.length === 0) {
        return message.send("*No forex news available at the moment.*");
      }
  
      const articles = data.results;
      let output = "";
      articles.forEach((article, index) => {
        output += `*Title:* ${article.title}\n`;
        output += `*Publisher:* ${article.publisher.name}\n`;
        output += `*Published UTC:* ${article.published_utc}\n`;
        output += `*Article URL:* ${article.article_url}\n\n`;
  
        if (index < articles.length - 1) {
          output += "---\n\n";
        }
      });
  
      return message.send(output, { quoted: message });
    } catch (error) {
      console.error(error);
      return message.error(error, "*Failed to fetch forex news.*");
    }
  });
  smd({
    pattern: "fxstatus",
    category: "forex",
    desc: "Fetches the current status of the forex market",
    filename: __filename,
    use: "fxstatus",
  }, async (message) => {
    try {
      const apiUrl = "https://api.polygon.io/v1/marketstatus/now?apiKey=Y4iTYoJANwppB8I3Bm4QVWdV5oXlvc45";
      const response = await fetch(apiUrl);
      const data = await response.json();
  
      if (!data) {
        return message.send("*Failed to fetch forex market status.*");
      }
  
      let output = "*Forex Market Status:*\n";
      output += `After Hours: ${data.afterHours ? "Closed" : "Open"}\n`;
      output += `Market: ${data.market ? "Open" : "Closed"}\n`;
  
      const currencies = data.currencies;
      output += "\n*Currencies:*\n";
      output += `Crypto: ${currencies.crypto}\n`;
      output += `FX: ${currencies.fx}\n`;
  
      const exchanges = data.exchanges;
      output += "\n*Exchanges:*\n";
      output += `NASDAQ: ${exchanges.nasdaq}\n`;
      output += `NYSE: ${exchanges.nyse}\n`;
      output += `OTC: ${exchanges.otc}\n`;
  
      const indicesGroups = data.indicesGroups;
      output += "\n*Indices Groups:*\n";
      output += `S&P: ${indicesGroups.s_and_p}\n`;
      output += `Societe Generale: ${indicesGroups.societe_generale}\n`;
      output += `MSCI: ${indicesGroups.msci}\n`;
      output += `FTSE Russell: ${indicesGroups.ftse_russell}\n`;
      output += `MStar: ${indicesGroups.mstar}\n`;
      output += `MStarC: ${indicesGroups.mstarc}\n`;
      output += `CCCY: ${indicesGroups.cccy}\n`;
      output += `CGI: ${indicesGroups.cgi}\n`;
      output += `NASDAQ: ${indicesGroups.nasdaq}\n`;
      output += `Dow Jones: ${indicesGroups.dow_jones}\n`;
  
      output += `\n*Server Time:* ${data.serverTime}\n`;
  
      return message.send(output, { quoted: message });
    } catch (error) {
      console.error(error);
      return message.error(error, "*Failed to fetch forex market status.*");
    }
  });
 

  smd({
      pattern: "fxexchange",
      category: "forexnews",
      desc: "All Currencies Info",
      filename: __filename
  }, async (message, match) => {
      try {
          // Fetch currency exchange data from an API
          const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
          
          // Extract currency exchange rates from the response
          const exchangeRates = response.data.rates;
          
          // Format the exchange rates for display
          let formattedMessage = 'Current exchange rates:\n';
          for (const currency in exchangeRates) {
              formattedMessage += `${currency}: ${exchangeRates[currency]}\n`;
          }
          
          // Send the formatted message as a response
          await message.sendMessage(formattedMessage);
      } catch (error) {
          console.error('Error fetching currency exchange rates:', error);
          // Send an error message as a response
          await message.sendMessage('Sorry, there was an error fetching the currency exchange rates. Please try again later.');
      }
  });
  