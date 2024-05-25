let { UserFunction } = require("../lib");
var sifat = [
  "Fine",
  "Unfriendly",
  "Cute",
  "Sigma",
  "Chapri",
  "Nibba/nibbi",
  "Annoying",
  "Dilapidated",
  "Angry person",
  "Polite",
  "Burden",
  "Great",
  "Cringe",
  "Liar",
];
var hoby = [
  "Cooking",
  "Dancing",
  "Playing",
  "Gaming",
  "Painting",
  "Helping Others",
  "Watching anime",
  "Reading",
  "Riding Bike",
  "Singing",
  "Chatting",
  "Sharing Memes",
  "Drawing",
  "Eating Parents Money",
  "Playing Truth or Dare",
  "Staying Alone",
];
var cakep = ["Yes", "No", "Very Ugly", "Very Handsome"];
var wetak = [
  "Caring",
  "Generous",
  "Angry person",
  "Sorry",
  "Submissive",
  "Fine",
  "Im sorry",
  "Kind Hearted",
  "Patient",
  "UwU",
  "Top",
  "Helpful",
];
var checkme = {};
UserFunction(
  {
    cmdname: "aboutme",
    desc: "Check randome information about your character!",
    category: "fun",
    filename: __filename,
  },
  async (message, label) => {
    try {
      let randoms = message.sender;
      if (message.isCreator) {
        randoms = message.reply_message
          ? message.reply_message.sender
          : message.mentionedJid[0]
          ? message.mentionedJid[0]
          : randoms;
      }
      let botcap =
        !/fresh|reset|new|why|update/g.test(label) && checkme[randoms]
          ? checkme[randoms]
          : 
          "*ABOUT @" +
            randoms.split("@")[0] +
            "*\n  \n*Name :* " +
            (await message.bot.getName(randoms)).split("\n").join("  ") +
            "\n*Characteristic :* " +
            sifat[Math.floor(Math.random() * sifat.length)] +
            "\n*Hobby :* " +
            hoby[Math.floor(Math.random() * hoby.length)] +
            "\n*Simp :* " +
            Math.floor(Math.random() * 101) +
            "%\n*Great :* " +
            Math.floor(Math.random() * 101) +
            "%\n*Handsome :* " +
            cakep[Math.floor(Math.random() * cakep.length)] +
            "\n*Character :* " +
            wetak[Math.floor(Math.random() * wetak.length)] +
            "\n*Good Morals :* " +
            Math.floor(Math.random() * 101) +
            "%\n*Bad Morals :* " +
            Math.floor(Math.random() * 101) +
            "%\n*Intelligence :* " +
            Math.floor(Math.random() * 101) +
            "%\n*Courage :* " +
            Math.floor(Math.random() * 101) +
            "%\n*Afraid :* " +
            Math.floor(Math.random() * 101) +
            "%\n  \n *aLL BOUT UO*";
      checkme[randoms] = botcap;
      message.bot.sendUi(
        message.from,
        {
          caption: botcap,
          mentions: [randoms],
        },
        {
          quoted: message,
        },
        "image",
        await message.getpp(randoms),
        true
      );
    } catch (error) {
      message.error(error + "\n\nCommand:aboutme", error, false);
    }
  }
);
