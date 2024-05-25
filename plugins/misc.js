let { UserFunction, fetchJson, amdJson } = require("../lib");
let fetch = require("node-fetch") || fetchJson || amdJson;
UserFunction(
  {
    pattern: "gen",
    desc: "Generate fake card information.",
    category: "generator",
    filename: __filename,
    use: "<query>",
  },
  async (m, query) => {
    try {
      if (!query) {
        return await m.send(
          "*_Please provide a query for the card generator!_*"
        );
      }

      const apiUrl = `https://api.maher-zubair.tech/misc/bingen?query=${encodeURIComponent(
        query
      )}`;
      const response = await fetch(apiUrl);

      if (!response.ok) {
        return await m.send(
          `*_Error: ${response.status} ${response.statusText}_*`
        );
      }

      const data = await response.json();

      if (data.status !== 200) {
        return await m.send("*_An error occurred while fetching the data._*");
      }

      const cards = data.result;
      let message = "*Generated Card Information*\n\n";

      cards.forEach((card) => {
        message += `
          *Card Number:* ${card.CardNumber}
          *Expiration Date:* ${card.ExpirationDate}
          *CVV:* ${card.CVV}\n
          `;
      });

      await m.send(message);
    } catch (e) {
      await m.error(`${e}\n\ncommand: gen`, e);
    }
  }
);
