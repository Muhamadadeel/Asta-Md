let {UserFunction, fetchJson, amdJson,} =require("../lib")
let fetch = require('node-fetch') || fetchJson || amdJson
UserFunction(
  {
    pattern: "gen",
    desc: "Generate random card details.",
    category: "misc",
    filename: __filename,
    use: "",
  },
  async (m) => {
    try {
      const apiUrl = "https://api.maher-zubair.tech/misc/bingen?query=44270700";
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

      const { result } = data;
      const randomCard = result[Math.floor(Math.random() * result.length)];
      const { CardNumber, ExpirationDate, CVV } = randomCard;

      const cardDetails = `
*Card Number:* ${CardNumber}
*Expiration Date:* ${ExpirationDate}
*CVV:* ${CVV}
`;

      await m.send(cardDetails);
    } catch (e) {
      await m.error(`${e}\n\ncommand: gen`, e);
    }
  }
);
