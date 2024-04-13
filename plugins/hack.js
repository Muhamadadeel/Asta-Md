const { smd, prefix, Config, sleep } = require("../lib");

smd(
  {
    cmdname: "hack",
    type: "fun",
    info: "hacking prank",
    filename: __filename,
  },

  async (citel) => {
    await citel.send("`Downloading Malware`");
    await sleep(2000);
    await citel.send("`Running Malware`");
    await sleep(2000);
    await citel.send("`Encrptying System files _0x3bbd3`");
    await sleep(600);
    await citel.send(" █ █ 20%");
    await sleep(600);
    await citel.send(" █ █ █ 30%");
    await sleep(660);
    await citel.send(" █ █ █ █ 40%");
    await sleep(700);
    await citel.send(" █ █ █ █ █ 50%");
    await sleep(750);
    await citel.send("`Sent Data to Operators`");
    await sleep(800);
    await citel.send(" █ █ █ █ █ █ █ 70%");
    await sleep(850);
    await citel.send(" █ █ █ █ █ █ █ █ 80%");
    await sleep(900);
    await citel.send(" █ █ █ █ █ █ █ █ █ 90%");
    await sleep(950);
    await citel.send(" █ █ █ █ █ █ █ █ █ █ 100%");
    await sleep(1100);
    await citel.send(
      "`Sent All Information to Remote Server` ✅"
    );
    await sleep(1000);
    await citel.send("`Data Successfully Transferred` ✅");
    await sleep(1000);
    await citel.send(
      "`Stoping Malware Service` ✅"
    );
    await sleep(1000);
    await citel.send(" HACKING COMPLETED ");
    await sleep(2000);
    await citel.send(" SENDING LOG DOCUMENTS...");
    await sleep(1000);
    await citel.send(" SUCCESSFULLY SENT DATA AND Connection disconnected");
    await sleep(1000);

    return await citel.send("BACKLOGS CLEARED");
  }
);
