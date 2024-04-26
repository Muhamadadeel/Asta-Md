const {smd, send} = require("../lib")
const fetch = require('node-fetch')
smd(
    {
      pattern: "wabeta",
      desc: "Get the latest WhatsApp beta update information.",
      category: "news",
      filename: __filename,
    },
    async (m) => {
      try {
        const apiUrl = "https://api.maher-zubair.tech/details/wabetainfo";
        const response = await fetch(apiUrl);
  
        if (!response.ok) {
          return await m.send(
            `*_Error: ${response.status} ${response.statusText}_*`
          );
        }
  
        const data = await response.json();
        const {
          title,
          link
        } = data.result;
  
        const message = `
📝*${title}*
${link}
  `;
  
        await send(m.from, null, message);
      } catch (e) {
        await m.error(`${e}\n\ncommand: wabeta`, e);
      }
    }
  );