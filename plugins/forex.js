const {smd, send} = require("../lib")
const fetch = require('node-fetch')
smd({
    pattern: "forex1",
    category: "forex news",
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
  