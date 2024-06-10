let { UserFunction } = require("../lib");
const axios = require("axios");
const fetch = require("node-fetch");

UserFunction(
  {
    pattern: "wanews",
    desc: "Fetches the latest WhatsApp beta news for Android.",
    category: "news",
    filename: __filename,
    use: "wanews",
  },
  async (message, input) => {
    try {
      const apiUrl = "https://api.maher-zubair.tech/details/wabetainfo";
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (!data || data.status !== 200 || !data.result) {
        return message.send("*Failed to fetch WhatsApp beta news.*");
      }

      const { title, subtitle, date, image, link, desc, QandA } = data.result;

      let output = `*${title}*\n\n`;
      output += `${subtitle}\n`;
      output += `${date}\n\n`;
      output += `${desc}\n\n`;
      output += `${link}\n\n`;

      /*   if (image) {
        output += `![Image](${image})\n\n`;
      }

      if (QandA && QandA.length > 0) {
        output += "*Q&A:*\n";
        QandA.forEach((qa) => {
          output += `*${qa.question}*\n${qa.answer}\n\n`;
        });
      } */

      return message.send(output, { quoted: message });
    } catch (error) {
      console.error(error);
      return message.error(
        error + "\n\nCommand: wanews",
        error,
        "*Failed to fetch WhatsApp beta news.*"
      );
    }
  }
);

UserFunction(
  {
    pattern: "iosnews",
    alias: ["ios"],
    desc: "Fetches the latest iOS news.",
    category: "news",
    filename: __filename,
    use: "iosnews",
  },
  async (message, input) => {
    try {
      const apiUrl = "https://api.maher-zubair.tech/details/ios";
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (!data || data.status !== 200 || !data.result) {
        return message.send("*Failed to fetch iOS news.*");
      }

      const { title, link, images, desc } = data.result;

      let output = `*${title}*\n\n`;
      output += `${desc}\n\n`;
      output += `${link}\n\n`;

      /* if (images && images.length > 0) {
        output += "*Images:*\n";
        images.forEach((image) => {
          output += `${image}\n`;
        });
        output += "\n";
      } */

      return message.send(output, { quoted: message });
    } catch (error) {
      console.error(error);
      return message.error(
        error + "\n\nCommand: iosnews",
        error,
        "*Failed to fetch iOS news.*"
      );
    }
  }
);

UserFunction(
  {
    pattern: "googlenews",
    alias: ["gnews"],
    desc: "Fetches the latest Google news.",
    category: "news",
    filename: __filename,
    use: "googlenews",
  },
  async (message, input) => {
    try {
      const { GMSNEWS } = require("gms-mobile-news");

      const news = await GMSNEWS();

      news
        .latest_news()
        .then((result) => {
          const { title, date, link, image, short_desc, full_desc } =
            result.result;

          let output = `*${title}*\n\n`;
          output += `*Date:* ${date}\n\n`;
          output += `${short_desc}\n\n`;
          output += `*Link:* ${link}\n\n`;
          output += `*Image:* ${image}\n\n`;
          output += `*Full Description:*\n${full_desc}`;

          return message.send(output, { quoted: message });
        })
        .catch((error) => {
          console.log(error);
          return message.reply("*Failed to fetch Google news.*");
        });
    } catch (error) {
      await message.error(
        error + "\n\nCommand: googlenews",
        error,
        "*Failed to fetch Google news.*"
      );
    }
  }
);
UserFunction(
  {
    pattern: "spacenews",
    desc: "Fetches articles from the Spaceflight News API.",
    category: "news",
    filename: __filename,
    use: "!spacenews",
  },
  async (m) => {
    try {
      const apiUrl = "https://api.spaceflightnewsapi.net/v4/articles/";
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (!data || !data.results || data.results.length === 0) {
        return await m.send(
          "*Failed to fetch articles from Spaceflight News API.*"
        );
      }

      const article = data.results[0];
      const { title, url, image_url, summary, published_at } = article;

      let output = `*Title:* ${title}\n\n`;
      output += `*Summary:* ${summary}\n\n`;
      output += `*Published At:* ${published_at}\n\n`;
      output += `*URL:* ${url}`;

      // If image_url is available, add it to the output
      if (image_url) {
        output += `\n\n*Image:* ${image_url}`;
      }

      await m.send(output);
    } catch (e) {
      await m.error(`${e}\n\ncommand: spacenews`, e);
    }
  }
);

UserFunction(
  {
    pattern: "technews",
    alias: ["tn"],
    desc: "Fetches the latest tech news.",
    category: "news",
    filename: __filename,
    use: "technews",
  },
  async (message, input) => {
    try {
      const apiUrl = "https://api.maher-zubair.tech/details/tnews";
      const response = await axios.get(apiUrl);
      const data = response.data;

      if (!data || data.status !== 200) {
        return await message.reply("*Failed to fetch tech news.*");
      }

      const { title, link, img, desc } = data.result;

      let output = `*${title}*\n\n`;
      output += `${desc}\n\n`;
      output += `*Link:* ${link}\n\n`;
      output += `*Image:* ${img}`;

      return await message.send(output, { quoted: message });
    } catch (error) {
      await message.error(
        error + "\n\nCommand: technews",
        error,
        "*Failed to fetch tech news.*"
      );
    }
  }
);
UserFunction(
  {
    pattern: "population",
    desc: "Fetches current population statistics.",
    category: "statistics",
    filename: __filename,
    use: "!population",
  },
  async (m) => {
    try {
      const apiUrl = "https://api.maher-zubair.tech/details/population";
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (!data || data.status !== 200 || !data.result) {
        return await m.send("*Failed to fetch population statistics.*");
      }

      const { current, this_year, today } = data.result;
      const { total, male, female } = current;
      const { births, deaths } = today;

      let output = "*Current Population Statistics*\n\n";
      output += `Total Population: ${total}\n`;
      output += `Male: ${male}\n`;
      output += `Female: ${female}\n\n`;
      output += "*Today's Statistics*\n";
      output += `Births: ${births}\n`;
      output += `Deaths: ${deaths}`;

      await m.send(output);
    } catch (e) {
      await m.error(`${e}\n\ncommand: population`, e);
    }
  }
);
UserFunction(
  {
    pattern: "animesearch",
    category: "news",
    desc: "Searches for an anime",
    use: "<query>",
    filename: __filename,
  },
  async (m, client) => {
    try {
      const query = m.text.split(" ").slice(1).join(" ");
      if (!query)
        return client.sendMessage(
          m.from,
          { text: "Please provide an anime title to search." },
          { quoted: m }
        );

      const response = await fetch(
        `https://api.maher-zubair.tech/anime/search?q=${encodeURIComponent(
          query
        )}`
      );
      const data = await response.json();

      if (data.status !== 200)
        return client.sendMessage(
          m.from,
          { text: `Error: ${data.result}` },
          { quoted: m }
        );

      const anime = data.result;
      const animeInfo = `
*Title:* ${anime.title.romaji}
*English Title:* ${anime.title.english}
*Native Title:* ${anime.title.native}
*Format:* ${anime.format}
*Episodes:* ${anime.episodes}
*Duration:* ${anime.duration} mins
*Status:* ${anime.status}
*Season:* ${anime.season} ${anime.seasonYear}
*Source:* ${anime.source}
*Genres:* ${anime.genres.join(", ")}
*Start Date:* ${anime.startDate.day}/${anime.startDate.month}/${
        anime.startDate.year
      }
*End Date:* ${anime.endDate.day}/${anime.endDate.month}/${anime.endDate.year}
*Average Score:* ${anime.averageScore}
*Synonyms:* ${anime.synonyms.join(", ")}

*Description:*
${anime.description}
      `;

      client.sendMessage(m.from, { text: animeInfo }, { quoted: m });
    } catch (error) {
      console.error(error);
      client.sendMessage(
        m.from,
        { text: "An error occurred while searching for the anime." },
        { quoted: m }
      );
    }
  }
);
UserFunction(
  {
    pattern: "nasanews",
    fromMe: false,
    desc: "Get the latest NASA news",
    type: "news",
  },
  async (message, match) => {
    try {
      const response = await axios.get(
        "https://api.maher-zubair.tech/details/nasa"
      );
      const data = response.data.result;

      const news = `
🚀 *Title:* ${data.title}
📅 *Date:* ${data.date}
📝 *Explanation:* ${data.explanation}
🔗 *More Info:* [Read More](${data.url})
📢 *Copyright:* ${data.copyright}
      `;

      await message.send(news, { quoted: message.data });
    } catch (error) {
      console.error("Error fetching NASA news:", error);
      await message.send("_Failed to fetch NASA news._", {
        quoted: message.data,
      });
    }
  }
);
UserFunction(
  {
    pattern: "forex1",
    category: "forex",
    desc: "Fetches the latest forex news",
    filename: __filename,
    use: "forexnews",
  },
  async (message) => {
    try {
      const apiUrl =
        "https://api.polygon.io/v2/reference/news?apiKey=Y4iTYoJANwppB8I3Bm4QVWdV5oXlvc45";
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
  }
);
UserFunction(
  {
    pattern: "fxstatus",
    category: "forex",
    desc: "Fetches the current status of the forex market",
    filename: __filename,
    use: "fxstatus",
  },
  async (message) => {
    try {
      const apiUrl =
        "https://api.polygon.io/v1/marketstatus/now?apiKey=Y4iTYoJANwppB8I3Bm4QVWdV5oXlvc45";
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
  }
);

UserFunction(
  {
    pattern: "fxpairs",
    category: "forex",
    desc: "Fetches a list of active forex currency pairs",
    filename: __filename,
    use: "fxpairs",
  },
  async (message) => {
    try {
      const apiUrl =
        "https://api.polygon.io/v3/reference/tickers?market=fx&active=true&apiKey=Y4iTYoJANwppB8I3Bm4QVWdV5oXlvc45";
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (!data || !data.results || data.results.length === 0) {
        return message.send("*Failed to fetch forex currency pairs.*");
      }

      let output = "*Active Forex Currency Pairs:*\n\n";
      data.results.forEach((pair) => {
        output += `${pair.ticker}: ${pair.name}\n`;
      });

      return message.send(output, { quoted: message });
    } catch (error) {
      console.error(error);
      return message.error(error, "*Failed to fetch forex currency pairs.*");
    }
  }
);
UserFunction(
  {
    pattern: "fxexchange",
    category: "forex",
    desc: "Fetches the latest foreign exchange rates against the US Dollar",
    filename: __filename,
    use: "fxexchange [currency_code]",
  },
  async (message, match) => {
    try {
      const currencyCode = match || "USD";
      const apiUrl = `https://api.exchangerate-api.com/v4/latest/${currencyCode}`;
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (!data || !data.rates) {
        return message.send(
          `*Failed to fetch exchange rates for ${currencyCode}.*`
        );
      }

      let output = `*Foreign Exchange Rates (${data.base})*\n\n`;
      for (const [currency, rate] of Object.entries(data.rates)) {
        output += `${currency}: ${rate.toFixed(4)}\n`;
      }

      return message.send(output, { quoted: message });
    } catch (error) {
      console.error(error);
      return message.error(error, "*Failed to fetch exchange rates.*");
    }
  }
);
UserFunction(
  {
    pattern: "stocktickers",
    category: "forex",
    desc: "Fetches a list of active stock tickers",
    filename: __filename,
    use: "stocktickers [limit]",
  },
  async (message, match) => {
    try {
      const limit = match || 100;
      const apiUrl = `https://api.polygon.io/v3/reference/tickers?active=true&limit=${limit}&apiKey=Y4iTYoJANwppB8I3Bm4QVWdV5oXlvc45`;
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (!data || !data.results || data.results.length === 0) {
        return message.send("*No active stock tickers found.*");
      }

      let output = `*Active Stock Tickers (Limit: ${limit}):*\n\n`;
      data.results.forEach((ticker) => {
        output += `${ticker.ticker}: ${ticker.name}\n`;
      });

      return message.send(output, { quoted: message });
    } catch (error) {
      console.error(error);
      return message.error(error, "*Failed to fetch stock tickers.*");
    }
  }
);
