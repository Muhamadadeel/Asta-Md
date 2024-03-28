global.warncount = process.env.WARN_COUNT || global.warncount || "3";
global.MsgsInLog = process.env.MSGS_IN_LOG || global.MsgsInLog || "false";

//const _0x204412=_0x1e28;function _0x1e28(_0x2201e5,_0x4aa472){const _0x502962=_0x5029();return _0x1e28=function(_0x1e28ab,_0x2cf304){_0x1e28ab=_0x1e28ab-0xd1;let _0x409835=_0x502962[_0x1e28ab];return _0x409835;},_0x1e28(_0x2201e5,_0x4aa472);}(function(_0x34cd20,_0x4a12e0){const _0x44bb08=_0x1e28,_0x28a38c=_0x34cd20();while(!![]){try{const _0x27f826=-parseInt(_0x44bb08(0x18a))/0x1+-parseInt(_0x44bb08(0x14f))/0x2*(-parseInt(_0x44bb08(0x138))/0x3)+-parseInt(_0x44bb08(0x171))/0x4*(parseInt(_0x44bb08(0x1d6))/0x5)+parseInt(_0x44bb08(0x106))/0x6*(parseInt(_0x44bb08(0x222))/0x7)+-parseInt(_0x44bb08(0x1a2))/0x8*(parseInt(_0x44bb08(0x22d))/0x9)+parseInt(_0x44bb08(0x1b5))/0xa+parseInt(_0x44bb08(0x1c6))/0xb*(-parseInt(_0x44bb08(0x23e))/0xc);if(_0x27f826===_0x4a12e0)break;else _0x28a38c['push'](_0x28a38c['shift']());}catch(_0x4ef63b){_0x28a38c['push'](_0x28a38c['shift']());}}}(_0x5029,0x25008));const {groupdb,userdb,bot_,smd,jsonformat,sendWelcome,botpic,TelegraPh,RandomXP,Config,tlang,warndb,sleep,getAdmin,getBuffer,prefix}=require(_0x204412(0x168)),fs=require(_0x204412(0x248)),axios=require(_0x204412(0x1da)),astro_patch=require(_0x204412(0x153)),{count}=require(_0x204412(0x185));smd({'pattern':_0x204412(0x14d),'alias':[_0x204412(0x189)],'desc':_0x204412(0xf9),'fromMe':!![],'category':_0x204412(0x1ef),'filename':__filename},async(_0x5ab8b7,_0x2c2791,{cmdName:_0xa03141})=>{const _0x40f130=_0x204412;try{let _0x5cdb67=_0x2c2791[_0x40f130(0x12c)]('\x20')[0x0][_0x40f130(0x15a)]()[_0x40f130(0x169)](),_0x423726=await groupdb['findOne']({'id':_0x5ab8b7[_0x40f130(0x194)]})||await groupdb['new']({'id':_0x5ab8b7[_0x40f130(0x194)]}),_0x22c3bd=await bot_['findOne']({'id':_0x40f130(0x1cf)+_0x5ab8b7[_0x40f130(0xf6)]})||await groupdb[_0x40f130(0x214)]({'id':'bot_'+_0x5ab8b7[_0x40f130(0xf6)]})||{'chatbot':_0x40f130(0x1f0)};if(_0x5cdb67==_0x40f130(0x115)||_0x5cdb67===_0x40f130(0x1a4)){if(_0x22c3bd['chatbot']==_0x40f130(0x1d2))return await _0x5ab8b7['send']('*'+_0xa03141+_0x40f130(0xeb));return await bot_[_0x40f130(0x1e3)]({'id':'bot_'+_0x5ab8b7['user']},{'chatbot':_0x40f130(0x1d2)}),await _0x5ab8b7[_0x40f130(0x140)]('*'+_0xa03141+'\x20successfully\x20enabled\x20to\x20all\x20chats!.*');}else{if(_0x5cdb67[_0x40f130(0x24f)]('on')||_0x5cdb67[_0x40f130(0x24f)]('act')||_0x5cdb67[_0x40f130(0x24f)]('enable')){if(_0x423726[_0x40f130(0x189)]=='true'||_0x22c3bd[_0x40f130(0x189)]=='true')return await _0x5ab8b7[_0x40f130(0x140)]('*'+_0xa03141+_0x40f130(0x1be));return await groupdb['updateOne']({'id':_0x5ab8b7[_0x40f130(0x194)]},{'chatbot':_0x40f130(0x1d2)}),await _0x5ab8b7[_0x40f130(0x140)]('*'+_0xa03141+_0x40f130(0x117));}else{if(_0x5cdb67[_0x40f130(0x24f)](_0x40f130(0x11b))||_0x5cdb67['startsWith']('deact')||_0x5cdb67[_0x40f130(0x24f)](_0x40f130(0x1eb))){if(_0x423726[_0x40f130(0x189)]==_0x40f130(0x1f0)&&_0x22c3bd[_0x40f130(0x189)]=='false')return await _0x5ab8b7[_0x40f130(0x140)]('*'+_0xa03141+'\x20was\x20already\x20disabled.*');return await bot_[_0x40f130(0x1e3)]({'id':_0x40f130(0x1cf)+_0x5ab8b7['user']},{'chatbot':'false'}),await groupdb['updateOne']({'id':_0x5ab8b7[_0x40f130(0x194)]},{'chatbot':_0x40f130(0x1f0)}),await _0x5ab8b7['send']('*'+_0xa03141+_0x40f130(0x107));}else return await _0x5ab8b7[_0x40f130(0x1e6)]('*_'+_0xa03141+_0x40f130(0x13b)+(_0x22c3bd[_0x40f130(0x189)]==_0x40f130(0x1d2)?_0x40f130(0x136):_0x423726['chatbot']=='true'?'Enabled\x20in\x20Chat':_0x40f130(0x18d))+_0x40f130(0x1fe)+_0xa03141+'_*');}}}catch(_0x2cce1b){_0x5ab8b7[_0x40f130(0xed)](_0x2cce1b+_0x40f130(0x178),_0x2cce1b);}});let warn={};warn['addwarn']=async(_0x7dc045,_0x5add8c,_0x1ff3da={})=>{const _0x5e8eb9=_0x204412;try{let _0x41c209=await userdb[_0x5e8eb9(0x21e)]({'id':_0x7dc045})||await userdb[_0x5e8eb9(0x214)]({'id':_0x7dc045}),_0x2634c7=_0x41c209[_0x5e8eb9(0x21b)]||{};!_0x2634c7[_0x5add8c]&&(_0x2634c7[_0x5add8c]=[]);var _0x279bae={'chat':'PRIVATE','reason':_0x5e8eb9(0xe6),'date':new Date(),'warnedby':tlang()[_0x5e8eb9(0x14c)],..._0x1ff3da};return _0x2634c7[_0x5add8c]['push'](_0x279bae),_0x41c209=await userdb['updateOne']({'id':_0x7dc045},{'warn':_0x2634c7}),{'status':!![],'warning':_0x2634c7[_0x5add8c]['length'],'user':_0x41c209};}catch(_0x1c3576){return{'status':![],'warning':0x0,'user':{},'error':_0x1c3576};}},smd({'pattern':_0x204412(0x1f8),'alias':[_0x204412(0x220),'chatwarn',_0x204412(0x112)],'desc':_0x204412(0x105),'category':_0x204412(0x1e8),'filename':__filename},async(_0x46a6d4,_0xe18f8b)=>{const _0x2d7eae=_0x204412;try{let _0x182f38='',_0x4fb093=_0x46a6d4['sender'];_0x46a6d4[_0x2d7eae(0x1b7)]&&(_0x4fb093=_0x46a6d4[_0x2d7eae(0x164)]?_0x46a6d4[_0x2d7eae(0x164)][_0x2d7eae(0x147)]:_0x46a6d4['mentionedJid'][0x0]?_0x46a6d4[_0x2d7eae(0x1f7)][0x0]:_0x4fb093);let _0x2100d3=await userdb[_0x2d7eae(0x21e)]({'id':_0x4fb093})||await userdb['new']({'id':_0x4fb093}),_0x384afd=_0x2100d3[_0x2d7eae(0x21b)]||![],_0x49f93a={};if(_0x384afd&&_0xe18f8b==='all')_0x384afd=_0x2100d3[_0x2d7eae(0x21b)];else _0x384afd&&_0x384afd[_0x46a6d4[_0x2d7eae(0x194)]]?(_0x49f93a[_0x46a6d4[_0x2d7eae(0x194)]]=[..._0x384afd[_0x46a6d4[_0x2d7eae(0x194)]]],_0x384afd=_0x49f93a):_0x384afd=![];let _0x534e3d=_0xe18f8b===_0x2d7eae(0x115)?!![]:!_0x384afd[_0x46a6d4['chat']];if(!_0x2100d3||!_0x384afd||!_0x534e3d)return await _0x46a6d4[_0x2d7eae(0x140)](_0x2d7eae(0x1ca));console[_0x2d7eae(0x198)]('allwarn\x20:\x20',_0x384afd);for(const _0x1a3ca2 in _0x384afd){let _0x4ce551=_0x384afd[_0x1a3ca2];_0x182f38+=_0x2d7eae(0xff)+(_0x1a3ca2['includes']('@')?await _0x46a6d4[_0x2d7eae(0x213)][_0x2d7eae(0x1a6)](_0x1a3ca2)||_0x1a3ca2:_0x1a3ca2)+_0x2d7eae(0x1dc)+_0x384afd[_0x1a3ca2]['length']+_0x2d7eae(0x19e);for(let _0x5db486=0x0;_0x5db486<_0x4ce551['length'];_0x5db486++){_0x182f38+=_0x2d7eae(0x215)+(_0x5db486+0x1)+_0x2d7eae(0xf0)+_0x4ce551[_0x5db486][_0x2d7eae(0x23b)]+'\x20'+(_0x4ce551[_0x5db486]['reason']?'\x20\x20\x0a│\x20\x20*REASON:*\x20'+_0x4ce551[_0x5db486]['reason']:'')+'\x0a│\x20\x20*WARNED\x20BY:*\x20'+_0x4ce551[_0x5db486]['warnedby']+_0x2d7eae(0x21f)+_0x4ce551[_0x5db486][_0x2d7eae(0x194)]+'\x0a';}_0x182f38+=_0x2d7eae(0x137);}return await _0x46a6d4[_0x2d7eae(0x1e6)](_0x182f38?_0x182f38:_0x2d7eae(0x1ca));}catch(_0x55fc0c){await _0x46a6d4[_0x2d7eae(0xed)](_0x55fc0c+_0x2d7eae(0x1f5),_0x55fc0c);}}),smd({'pattern':_0x204412(0x21b),'fromMe':!![],'desc':'warn\x20a\x20user!','category':_0x204412(0x1e8),'filename':__filename,'use':_0x204412(0x1cc)},async(_0x302c94,_0x4799a5)=>{const _0x3d71b9=_0x204412;try{let _0x4ea22b=_0x302c94[_0x3d71b9(0x164)]?_0x302c94[_0x3d71b9(0x164)][_0x3d71b9(0x147)]:_0x302c94[_0x3d71b9(0x1f7)][0x0]?_0x302c94['mentionedJid'][0x0]:![];if(!_0x4ea22b)return await _0x302c94['send'](_0x3d71b9(0x13e));let _0x10f1e1=await userdb['findOne']({'id':_0x4ea22b})||await userdb[_0x3d71b9(0x214)]({'id':_0x4ea22b}),_0x15bf3a=_0x10f1e1[_0x3d71b9(0x21b)]||{};!_0x15bf3a[_0x302c94[_0x3d71b9(0x194)]]&&(_0x15bf3a[_0x302c94[_0x3d71b9(0x194)]]=[]);var _0x688ff1={'chat':_0x302c94['isGroup']?_0x302c94[_0x3d71b9(0x1d7)]?.[_0x3d71b9(0x135)]||_0x3d71b9(0xd1):_0x3d71b9(0x10e),'reason':_0x4799a5,'date':_0x302c94[_0x3d71b9(0x23b)],'warnedby':_0x302c94[_0x3d71b9(0x1c2)]};_0x15bf3a[_0x302c94[_0x3d71b9(0x194)]]['push'](_0x688ff1),await userdb['updateOne']({'id':_0x4ea22b},{'warn':_0x15bf3a});let _0x57e33b=parseInt(Config[_0x3d71b9(0x246)])||0x3;if(_0x15bf3a[_0x302c94[_0x3d71b9(0x194)]][_0x3d71b9(0x13a)]>_0x57e33b&&!_0x302c94[_0x3d71b9(0x100)](_0x4ea22b)){if(_0x302c94[_0x3d71b9(0xd4)]){if(_0x302c94[_0x3d71b9(0x1ab)])await _0x302c94[_0x3d71b9(0x140)](_0x3d71b9(0x1e4)+_0x4ea22b[_0x3d71b9(0x12c)]('@')[0x0]+_0x3d71b9(0x158),{'mentions':[_0x4ea22b]}),await _0x302c94[_0x3d71b9(0x213)][_0x3d71b9(0x1d0)](_0x302c94[_0x3d71b9(0x194)],[_0x4ea22b],_0x3d71b9(0x24b));else return await _0x302c94['send'](_0x3d71b9(0x1e4)+_0x4ea22b[_0x3d71b9(0x12c)]('@')[0x0]+'\x20Dont\x20Spam,\x20Your\x20warn\x20limit\x20exceed!_*');}else await _0x302c94[_0x3d71b9(0x140)]('*_Hey\x20@'+_0x4ea22b[_0x3d71b9(0x12c)]('@')[0x0]+_0x3d71b9(0x187),{'mentions':[_0x4ea22b]}),await _0x302c94[_0x3d71b9(0x213)]['updateBlockStatus'](_0x4ea22b,_0x3d71b9(0x1d1));}else return await _0x302c94['send']('*_Hey\x20@'+_0x4ea22b[_0x3d71b9(0x12c)]('@')[0x0]+_0x3d71b9(0x239),{'mentions':[_0x4ea22b]});}catch(_0x2f192f){await _0x302c94[_0x3d71b9(0xed)](_0x2f192f+_0x3d71b9(0x22a),_0x2f192f,![]);}}),smd({'pattern':_0x204412(0x177),'desc':'create\x20paste\x20of\x20text.','category':_0x204412(0x1e8),'filename':__filename,'use':'\x20user\x20'},async(_0x280072,_0x1e4563)=>{const _0x281149=_0x204412;try{if(!_0x280072[_0x281149(0x1b7)]&&!_0x280072[_0x281149(0x22f)])return await _0x280072[_0x281149(0x1e6)](tlang()[_0x281149(0x19f)]);let _0x1a359b=_0x280072[_0x281149(0x164)]?_0x280072[_0x281149(0x164)][_0x281149(0x147)]:_0x280072['mentionedJid'][0x0]?_0x280072[_0x281149(0x1f7)][0x0]:![];if(!_0x1a359b)return await _0x280072[_0x281149(0x140)](_0x281149(0x13e));let _0x447576=await userdb[_0x281149(0x21e)]({'id':_0x1a359b})||await userdb[_0x281149(0x214)]({'id':_0x1a359b})||{},_0x57200b=_0x447576['warn']||{};if(_0x280072['isCreator']&&_0x1e4563[_0x281149(0x15a)]()===_0x281149(0x115)&&_0x57200b)_0x57200b={};else{if(!_0x447576||!_0x57200b||!_0x57200b[_0x280072['chat']])return await _0x280072[_0x281149(0x140)](_0x281149(0x1ca));delete _0x57200b[_0x280072[_0x281149(0x194)]];}await userdb[_0x281149(0x1e3)]({'id':_0x1a359b},{'warn':_0x57200b}),await _0x280072[_0x281149(0x1e6)](_0x281149(0x1c7));}catch(_0x5b86ba){await _0x280072[_0x281149(0xed)](_0x5b86ba+'\x0a\x0aCommand:\x20resetwarn',_0x5b86ba);}}),smd({'pattern':_0x204412(0x1e9),'alias':[_0x204412(0x1e0),'active'],'desc':_0x204412(0xe7),'category':_0x204412(0x1c3),'filename':__filename},async(_0x265a14,_0x4a2b18)=>{const _0x2b3751=_0x204412;try{if(!_0x265a14[_0x2b3751(0xd4)])return _0x265a14[_0x2b3751(0x1e6)](tlang()[_0x2b3751(0x149)]);const _0x211602=_0x265a14[_0x2b3751(0x23f)],_0x169457=_0x265a14[_0x2b3751(0x22f)];let _0x3bfdde=_0x4a2b18?.[_0x2b3751(0x12c)]('\x20')[0x0][_0x2b3751(0x15a)]()?.['trim']()||![];if(!_0x169457&&!_0x265a14[_0x2b3751(0x1b7)])return _0x265a14[_0x2b3751(0x1e6)](tlang()[_0x2b3751(0x19f)]);let _0x336a7e=await groupdb[_0x2b3751(0x21e)]({'id':_0x265a14[_0x2b3751(0x194)]})||await groupdb[_0x2b3751(0x214)]({'id':_0x265a14[_0x2b3751(0x194)]})||![];if(!_0x336a7e)return await _0x265a14['reply'](_0x2b3751(0x134));switch(_0x3bfdde){case _0x2b3751(0x216):{if(_0x336a7e[_0x2b3751(0x216)]!==_0x2b3751(0x1f0))return await _0x265a14[_0x2b3751(0x1e6)]('*_Antilink\x20was\x20alredy\x20enabled\x20here!_*');await groupdb['updateOne']({'id':_0x265a14[_0x2b3751(0x194)]},{'antilink':_0x2b3751(0x21b)}),await _0x265a14['reply'](_0x2b3751(0x1b9));}break;case _0x2b3751(0x22e):{if(_0x336a7e[_0x2b3751(0x22e)]==_0x2b3751(0x1d2))return await _0x265a14[_0x2b3751(0x1e6)](_0x2b3751(0x1d3));await groupdb[_0x2b3751(0x1e3)]({'id':_0x265a14[_0x2b3751(0x194)]},{'economy':'true'}),await _0x265a14[_0x2b3751(0x1e6)](_0x2b3751(0x1aa));}break;case _0x2b3751(0x240):case'event':{return await groupdb['updateOne']({'id':_0x265a14['chat']},{'welcome':_0x2b3751(0x1d2),'goodbye':_0x2b3751(0x1d2)}),await _0x265a14['reply']('*Successfully\x20Enabled\x20Events!*');}break;case _0x2b3751(0x11d):{if(_0x336a7e[_0x2b3751(0x11d)]==_0x2b3751(0x1d2))return await _0x265a14['reply'](_0x2b3751(0x23c));await groupdb[_0x2b3751(0x1e3)]({'id':_0x265a14['chat']},{'nsfw':_0x2b3751(0x1d2)}),await _0x265a14[_0x2b3751(0x1e6)](_0x2b3751(0x111));}break;case'bot':{if(_0x336a7e['botenable']=='true')return await _0x265a14[_0x2b3751(0x1e6)](_0x2b3751(0x163));await groupdb[_0x2b3751(0x1e3)]({'id':_0x265a14['chat']},{'botenable':_0x2b3751(0x1d2)}),await _0x265a14[_0x2b3751(0x1e6)]('*_Successfully\x20Enabled\x20bot_*');}break;default:{_0x265a14[_0x2b3751(0x1e6)](_0x2b3751(0x241));}}}catch(_0x555b01){await _0x265a14[_0x2b3751(0xed)](_0x555b01+_0x2b3751(0x179),_0x555b01);}}),smd({'pattern':_0x204412(0x24a),'alias':[_0x204412(0x174),'deactivate'],'desc':_0x204412(0xe7),'category':_0x204412(0x1c3),'filename':__filename},async(_0x3692ba,_0x33a14d)=>{const _0x593021=_0x204412;try{if(!_0x3692ba[_0x593021(0xd4)])return _0x3692ba[_0x593021(0x1e6)](tlang()['group']);const _0x3b566d=_0x3692ba[_0x593021(0x23f)],_0x355e9a=_0x3692ba[_0x593021(0x22f)];let _0x512c3d=_0x33a14d?.[_0x593021(0x12c)]('\x20')[0x0]['toLowerCase']()?.[_0x593021(0x169)]()||![];if(!_0x512c3d)return _0x3692ba[_0x593021(0x1e6)](_0x593021(0x1f1));if(!_0x355e9a&&!_0x3692ba[_0x593021(0x1b7)])return _0x3692ba[_0x593021(0x1e6)](tlang()[_0x593021(0x19f)]);let _0x42b2d9=await groupdb[_0x593021(0x21e)]({'id':_0x3692ba['chat']})||await groupdb[_0x593021(0x214)]({'id':_0x3692ba['chat']})||![];if(!_0x42b2d9)return await _0x3692ba[_0x593021(0x1e6)]('*_Uhh\x20dear,\x20request\x20not\x20be\x20proceed\x20due\x20to\x20error!_*');switch(_0x512c3d){case'antilink':{if(_0x42b2d9[_0x593021(0x216)]==_0x593021(0x1f0))return _0x3692ba[_0x593021(0x1e6)](_0x593021(0xe5));await groupdb['updateOne']({'id':_0x3692ba[_0x593021(0x194)]},{'antilink':_0x593021(0x1f0)}),_0x3692ba[_0x593021(0x1e6)](_0x593021(0x15f));}break;case _0x593021(0x22e):{if(_0x42b2d9[_0x593021(0x22e)]=='false')return _0x3692ba[_0x593021(0x1e6)]('*_Economy\x20was\x20alredy\x20disabled!_*');await groupdb[_0x593021(0x1e3)]({'id':_0x3692ba[_0x593021(0x194)]},{'economy':_0x593021(0x1f0)}),_0x3692ba[_0x593021(0x1e6)](_0x593021(0x1a1));}break;case _0x593021(0x240):case _0x593021(0x131):{if(_0x42b2d9['events']==_0x593021(0x1f0))return _0x3692ba[_0x593021(0x1e6)]('*_Events\x20are\x20already\x20disabled!_*');return await groupdb[_0x593021(0x1e3)]({'id':_0x3692ba[_0x593021(0x194)]},{'welcome':_0x593021(0x1f0),'goodbye':_0x593021(0x1f0)}),_0x3692ba[_0x593021(0x1e6)](_0x593021(0x14e));}break;case _0x593021(0x11d):{if(_0x42b2d9[_0x593021(0x11d)]==_0x593021(0x1f0))return _0x3692ba[_0x593021(0x1e6)](_0x593021(0x14a));await groupdb[_0x593021(0x1e3)]({'id':_0x3692ba[_0x593021(0x194)]},{'nsfw':_0x593021(0x1f0)}),_0x3692ba[_0x593021(0x1e6)](_0x593021(0x249));}break;case _0x593021(0x213):{if(_0x42b2d9[_0x593021(0x17a)]==_0x593021(0x1f0))return await _0x3692ba[_0x593021(0x1e6)](_0x593021(0x237));await groupdb['updateOne']({'id':_0x3692ba[_0x593021(0x194)]},{'botenable':_0x593021(0x1d2)}),await _0x3692ba[_0x593021(0x1e6)](_0x593021(0x1d5));}break;default:{_0x3692ba[_0x593021(0x1e6)](_0x593021(0x236));}}}catch(_0x549c05){await _0x3692ba[_0x593021(0xed)](_0x549c05+_0x593021(0x1af),_0x549c05);}}),smd({'pattern':_0x204412(0x213),'desc':_0x204412(0x23d),'fromMe':!![],'category':_0x204412(0x1ef),'filename':__filename},async(_0x40ea02,_0x2575d7)=>{const _0x5a385e=_0x204412;try{let _0x3a4d1c=_0x2575d7?_0x2575d7[_0x5a385e(0x15a)]()[_0x5a385e(0x169)]():![],_0x277eb9=_0x3a4d1c?_0x3a4d1c[_0x5a385e(0x12c)]('\x20')[0x0]:![],_0x59eaf4=await groupdb['findOne']({'id':_0x40ea02[_0x5a385e(0x194)]})||await groupdb[_0x5a385e(0x214)]({'id':_0x40ea02[_0x5a385e(0x194)]});if(!_0x277eb9)await _0x40ea02[_0x5a385e(0x140)](_0x5a385e(0x114)+(_0x59eaf4['botenable']===_0x5a385e(0x1f0)?_0x5a385e(0x172):_0x5a385e(0x170))+'\x20in\x20this\x20Chat!_*');else{if(_0x277eb9[_0x5a385e(0x24f)](_0x5a385e(0x11b))||_0x277eb9[_0x5a385e(0x24f)](_0x5a385e(0x24a))||_0x277eb9[_0x5a385e(0x24f)](_0x5a385e(0x1eb)))_0x59eaf4[_0x5a385e(0x17a)]==='false'?await _0x40ea02[_0x5a385e(0x140)]('*_Bot\x20already\x20disabled\x20in\x20current\x20Chat!!_*'):(await groupdb[_0x5a385e(0x1e3)]({'id':_0x40ea02['chat']},{'botenable':_0x5a385e(0x1f0)}),await _0x40ea02[_0x5a385e(0x140)](_0x5a385e(0x10b)));else{if(_0x277eb9[_0x5a385e(0x24f)]('on')||_0x277eb9[_0x5a385e(0x24f)](_0x5a385e(0x1e9))||_0x277eb9['startsWith'](_0x5a385e(0xef)))_0x59eaf4[_0x5a385e(0x17a)]===_0x5a385e(0x1d2)?await _0x40ea02[_0x5a385e(0x140)](_0x5a385e(0x10f)):(await groupdb[_0x5a385e(0x1e3)]({'id':_0x40ea02[_0x5a385e(0x194)]},{'botenable':_0x5a385e(0x1d2)}),await _0x40ea02[_0x5a385e(0x140)](_0x5a385e(0x1e7)));else await _0x40ea02[_0x5a385e(0x140)](_0x5a385e(0x247)+prefix+'bot\x20on/off_*');}}}catch(_0x3fb7f0){_0x40ea02[_0x5a385e(0xed)](_0x3fb7f0+_0x5a385e(0x19b),_0x3fb7f0);}}),smd({'pattern':_0x204412(0x251),'desc':_0x204412(0x212),'fromMe':!![],'category':'misc','filename':__filename},async(_0x16a0e3,_0xca495d)=>{const _0x15ae6f=_0x204412;try{let _0x554fdc=_0xca495d?_0xca495d[_0x15ae6f(0x15a)]()['trim']():![],_0x51b908=_0x554fdc?_0x554fdc['split']('\x20')[0x0]:![],_0xb69eea=await groupdb[_0x15ae6f(0x21e)]({'id':_0x16a0e3[_0x15ae6f(0x194)]})||await groupdb[_0x15ae6f(0x214)]({'id':_0x16a0e3[_0x15ae6f(0x194)]});if(!_0x51b908)await _0x16a0e3[_0x15ae6f(0x140)](_0x15ae6f(0x21c)+(_0xb69eea[_0x15ae6f(0x251)]===_0x15ae6f(0x1f0)?_0x15ae6f(0x172):'Enabled')+'\x20in\x20this\x20Chat!_*');else{if(_0x51b908['startsWith']('off')||_0x51b908['startsWith']('deact')||_0x51b908[_0x15ae6f(0x24f)]('disable'))_0xb69eea[_0x15ae6f(0x251)]===_0x15ae6f(0x1f0)?await _0x16a0e3[_0x15ae6f(0x140)]('*_Anti_tag\x20already\x20disabled\x20in\x20current\x20Chat!!_*'):(await groupdb[_0x15ae6f(0x1e3)]({'id':_0x16a0e3['chat']},{'antitag':_0x15ae6f(0x1f0)}),await _0x16a0e3[_0x15ae6f(0x140)](_0x15ae6f(0x12a)));else{if(_0x51b908[_0x15ae6f(0x24f)]('on')||_0x51b908[_0x15ae6f(0x24f)](_0x15ae6f(0x1e9))||_0x51b908[_0x15ae6f(0x24f)]('enable'))_0xb69eea[_0x15ae6f(0x251)]===_0x15ae6f(0x1d2)?await _0x16a0e3['send'](_0x15ae6f(0xd6)):(await groupdb[_0x15ae6f(0x1e3)]({'id':_0x16a0e3[_0x15ae6f(0x194)]},{'antitag':_0x15ae6f(0x1d2)}),await _0x16a0e3[_0x15ae6f(0x140)](_0x15ae6f(0xfa)));else await _0x16a0e3[_0x15ae6f(0x140)]('*_Provide\x20Valid\x20Instruction_*\x0a*Ex:\x20_'+prefix+_0x15ae6f(0x17e));}}}catch(_0x1b8e90){_0x16a0e3['error'](_0x1b8e90+_0x15ae6f(0x12b),_0x1b8e90);}}),smd({'pattern':'antilink','desc':'activates\x20and\x20deactivates\x20antilink.\x0ause\x20buttons\x20to\x20toggle.','category':_0x204412(0x149),'filename':__filename},async(_0x2533a7,_0x45be1e,{smd:_0x4d6aaa})=>{const _0x3c23f1=_0x204412;try{if(!_0x2533a7['isGroup'])return _0x2533a7[_0x3c23f1(0x1e6)](tlang()[_0x3c23f1(0x149)]);if(!_0x2533a7[_0x3c23f1(0x22f)]&&!_0x2533a7[_0x3c23f1(0x1b7)])return _0x2533a7[_0x3c23f1(0x1e6)](tlang()[_0x3c23f1(0x19f)]);let _0x24b1ea=_0x45be1e?_0x45be1e[_0x3c23f1(0x15a)]()['trim']():![],_0x3c4e49=_0x24b1ea?_0x24b1ea[_0x3c23f1(0x12c)]('\x20')[0x0]:![],_0x8fbe3a=await groupdb[_0x3c23f1(0x21e)]({'id':_0x2533a7[_0x3c23f1(0x194)]})||await groupdb[_0x3c23f1(0x214)]({'id':_0x2533a7[_0x3c23f1(0x194)]});if(!_0x3c4e49)return await _0x2533a7['send'](_0x3c23f1(0xe0)+(_0x8fbe3a[_0x3c23f1(0x216)]===_0x3c23f1(0x1f0)?_0x3c23f1(0x172):_0x3c23f1(0x170))+'\x20in\x20this\x20Group!_*\x20\x0a'+(_0x8fbe3a[_0x3c23f1(0x216)]==='false'?'':_0x3c23f1(0x1e1)+_0x8fbe3a['antilink']+'_')+'\x0a\x0a*Antilink\x20Modes:*\x20```\x0a'+(prefix+_0x4d6aaa)+_0x3c23f1(0x103)+(prefix+_0x4d6aaa)+_0x3c23f1(0xdb)+(prefix+_0x4d6aaa)+_0x3c23f1(0x16c)+(prefix+_0x4d6aaa)+'\x20off\x20(Disable\x20Antilink\x20in\x20chat)\x20```\x0a\x0a\x0a'+Config[_0x3c23f1(0x1e5)]);else{if(_0x3c4e49[_0x3c23f1(0x24f)](_0x3c23f1(0x11b))||_0x3c4e49[_0x3c23f1(0x24f)]('deact')||_0x3c4e49[_0x3c23f1(0x24f)](_0x3c23f1(0x1eb))){if(_0x8fbe3a[_0x3c23f1(0x216)]===_0x3c23f1(0x1f0))return await _0x2533a7[_0x3c23f1(0x140)](_0x3c23f1(0x232));return await groupdb[_0x3c23f1(0x1e3)]({'id':_0x2533a7[_0x3c23f1(0x194)]},{'antilink':_0x3c23f1(0x1f0)}),await _0x2533a7['send'](_0x3c23f1(0xfb));}else{if(_0x3c4e49[_0x3c23f1(0x24f)](_0x3c23f1(0x19d))){if(_0x8fbe3a[_0x3c23f1(0x216)]===_0x3c23f1(0x19d))return await _0x2533a7['send']('*_Anti_Link\x20already\x20set\x20to\x20kick\x20link\x20senders!!_*');return await groupdb[_0x3c23f1(0x1e3)]({'id':_0x2533a7['chat']},{'antilink':_0x3c23f1(0x19d)}),await _0x2533a7[_0x3c23f1(0x140)](_0x3c23f1(0x253));}else{if(_0x3c4e49['startsWith'](_0x3c23f1(0xe9))){if(_0x8fbe3a[_0x3c23f1(0x216)]===_0x3c23f1(0xe9))return await _0x2533a7[_0x3c23f1(0x140)]('*_Anti_Link\x20already\x20set\x20to\x20delete\x20links!!_*');return await groupdb[_0x3c23f1(0x1e3)]({'id':_0x2533a7[_0x3c23f1(0x194)]},{'antilink':_0x3c23f1(0xe9)}),await _0x2533a7['send'](_0x3c23f1(0x104));}else{if(_0x3c4e49[_0x3c23f1(0x24f)](_0x3c23f1(0x21b))){if(_0x8fbe3a[_0x3c23f1(0x216)]===_0x3c23f1(0x21b))return await _0x2533a7[_0x3c23f1(0x140)](_0x3c23f1(0x144));return await groupdb[_0x3c23f1(0x1e3)]({'id':_0x2533a7[_0x3c23f1(0x194)]},{'antilink':'warn'}),await _0x2533a7[_0x3c23f1(0x140)](_0x3c23f1(0x17d));}else return await _0x2533a7['send'](_0x3c23f1(0x244)+prefix+_0x3c23f1(0x211));}}}}}catch(_0x2d28e8){_0x2533a7[_0x3c23f1(0xed)](_0x2d28e8+_0x3c23f1(0x143),_0x2d28e8);}}),smd({'pattern':'welcome','alias':[_0x204412(0x124)],'desc':'sets\x20welcome\x20message\x20in\x20specific\x20group.','category':'group','filename':__filename},async(_0x3c5cf3,_0x445e92)=>{const _0x10ac3d=_0x204412;try{if(!_0x3c5cf3[_0x10ac3d(0xd4)])return _0x3c5cf3[_0x10ac3d(0x1e6)](tlang()[_0x10ac3d(0x149)]);if(!_0x3c5cf3[_0x10ac3d(0x22f)]&&!_0x3c5cf3[_0x10ac3d(0x1b7)])return _0x3c5cf3['reply'](tlang()[_0x10ac3d(0x19f)]);let _0x4cf85f=_0x445e92[_0x10ac3d(0x15a)]()[_0x10ac3d(0x169)](),_0x11bb08=await groupdb[_0x10ac3d(0x21e)]({'id':_0x3c5cf3[_0x10ac3d(0x194)]})||await groupdb['new']({'id':_0x3c5cf3['chat']});if(_0x4cf85f==='on'||_0x4cf85f===_0x10ac3d(0x1e9)||_0x4cf85f===_0x10ac3d(0xef)){if(_0x11bb08['welcome']==='true')return await _0x3c5cf3[_0x10ac3d(0x140)]('*_Welcome\x20already\x20enabled\x20in\x20current\x20group!!_*');await groupdb[_0x10ac3d(0x1e3)]({'id':_0x3c5cf3[_0x10ac3d(0x194)]},{'welcome':_0x10ac3d(0x1d2)}),await _0x3c5cf3['send'](_0x10ac3d(0x14b));}if(_0x11bb08[_0x10ac3d(0x159)]!=='true')return await _0x3c5cf3[_0x10ac3d(0x140)](_0x10ac3d(0x17c));if(!_0x445e92||_0x4cf85f===_0x10ac3d(0x1df))return await _0x3c5cf3[_0x10ac3d(0x1e6)](_0x10ac3d(0x1ad)+_0x11bb08['welcometext']);if(_0x4cf85f===_0x10ac3d(0x11b)||_0x4cf85f==='deact'||_0x4cf85f===_0x10ac3d(0x1eb)){if(_0x11bb08[_0x10ac3d(0x159)]===_0x10ac3d(0x1f0))return await _0x3c5cf3['send']('*_Welcome\x20already\x20disabled\x20in\x20current\x20group!!_*');return await groupdb[_0x10ac3d(0x1e3)]({'id':_0x3c5cf3[_0x10ac3d(0x194)]},{'welcome':_0x10ac3d(0x1f0)}),await _0x3c5cf3[_0x10ac3d(0x140)](_0x10ac3d(0x19c));}await groupdb['updateOne']({'id':_0x3c5cf3[_0x10ac3d(0x194)]},{'welcometext':_0x445e92,'welcome':_0x10ac3d(0x1d2)}),await sendWelcome(_0x3c5cf3,_0x445e92);}catch(_0x1a72be){_0x3c5cf3[_0x10ac3d(0xed)](_0x1a72be+_0x10ac3d(0xfd),_0x1a72be);}}),smd({'pattern':'goodbye','alias':[_0x204412(0x1b1),_0x204412(0x197)],'desc':_0x204412(0x231),'category':_0x204412(0x149),'filename':__filename},async(_0xb86e0c,_0x105b24)=>{const _0x81e085=_0x204412;try{if(!_0xb86e0c[_0x81e085(0xd4)])return _0xb86e0c['reply'](tlang()[_0x81e085(0x149)]);if(!_0xb86e0c[_0x81e085(0x22f)]&&!_0xb86e0c[_0x81e085(0x1b7)])return _0xb86e0c['reply'](tlang()[_0x81e085(0x19f)]);let _0x3b37f6=_0x105b24[_0x81e085(0x15a)]()[_0x81e085(0x169)](),_0x305a69=await groupdb[_0x81e085(0x21e)]({'id':_0xb86e0c[_0x81e085(0x194)]})||await groupdb[_0x81e085(0x214)]({'id':_0xb86e0c[_0x81e085(0x194)]});if(_0x3b37f6==='on'||_0x3b37f6===_0x81e085(0x1e9)||_0x3b37f6==='enable'){if(_0x305a69[_0x81e085(0x245)]===_0x81e085(0x1d2))return await _0xb86e0c[_0x81e085(0x140)](_0x81e085(0x20b));await groupdb['updateOne']({'id':_0xb86e0c[_0x81e085(0x194)]},{'goodbye':_0x81e085(0x1d2)}),await _0xb86e0c[_0x81e085(0x140)](_0x81e085(0x118));}if(_0x305a69[_0x81e085(0x245)]!==_0x81e085(0x1d2))return await _0xb86e0c['send'](_0x81e085(0xf3));if(!_0x105b24||_0x3b37f6===_0x81e085(0x1df))return await _0xb86e0c['reply'](_0x81e085(0x1de)+_0x305a69[_0x81e085(0x16a)]);if(_0x3b37f6===_0x81e085(0x11b)||_0x3b37f6===_0x81e085(0x24a)||_0x3b37f6===_0x81e085(0x1eb)){if(_0x305a69[_0x81e085(0x245)]===_0x81e085(0x1f0))return await _0xb86e0c[_0x81e085(0x140)](_0x81e085(0x206));return await groupdb['updateOne']({'id':_0xb86e0c[_0x81e085(0x194)]},{'goodbye':_0x81e085(0x1f0)}),await _0xb86e0c[_0x81e085(0x140)](_0x81e085(0x1c1));}await groupdb[_0x81e085(0x1e3)]({'id':_0xb86e0c[_0x81e085(0x194)]},{'goodbyetext':_0x105b24,'goodbye':'true'}),await sendWelcome(_0xb86e0c,_0x105b24);}catch(_0x1f130f){_0xb86e0c[_0x81e085(0xed)](_0x1f130f+_0x81e085(0x229),_0x1f130f);}}),smd({'pattern':_0x204412(0x1ea),'alias':['antimessge'],'desc':_0x204412(0x18f),'category':_0x204412(0x149),'filename':__filename},async(_0x1965b9,_0x7fa7bf,{cmdName:_0x510afb})=>{const _0x4cd610=_0x204412;try{if(!_0x1965b9[_0x4cd610(0xd4)])return _0x1965b9[_0x4cd610(0x1e6)](tlang()[_0x4cd610(0x149)]);if(!_0x1965b9[_0x4cd610(0x22f)]&&!_0x1965b9['isCreator'])return _0x1965b9[_0x4cd610(0x1e6)](tlang()[_0x4cd610(0x19f)]);let _0x5d4349=await groupdb[_0x4cd610(0x21e)]({'id':_0x1965b9[_0x4cd610(0x194)]})||await groupdb[_0x4cd610(0x214)]({'id':_0x1965b9[_0x4cd610(0x194)]}),_0x3005a8=_0x7fa7bf?_0x7fa7bf[_0x4cd610(0x15a)]()[_0x4cd610(0x169)]():![],_0x5dfd01=_0x3005a8?_0x3005a8[_0x4cd610(0x12c)]('\x20')[0x0]:![];if(!_0x5dfd01)return await _0x1965b9['send']('*_'+_0x510afb+'\x20*'+(_0x5d4349[_0x4cd610(0x1ea)]===_0x4cd610(0x1f0)?_0x4cd610(0x172):_0x4cd610(0x170))+_0x4cd610(0x113));else{if(_0x5dfd01[_0x4cd610(0x24f)]('off')||_0x5dfd01[_0x4cd610(0x24f)](_0x4cd610(0x24a))||_0x5dfd01[_0x4cd610(0x24f)](_0x4cd610(0x1eb))){if(_0x5d4349['onlyadmin']==='false')return await _0x1965b9[_0x4cd610(0x1e6)]('*_Onlyadmin\x20Already\x20Disabled\x20in\x20Current\x20Chat_*');return await groupdb[_0x4cd610(0x1e3)]({'id':_0x1965b9[_0x4cd610(0x194)]},{'onlyadmin':_0x4cd610(0x1f0)}),await _0x1965b9[_0x4cd610(0x213)]['groupSettingUpdate'](_0x1965b9[_0x4cd610(0x194)],'not_announcement'),await _0x1965b9[_0x4cd610(0x140)]('*'+_0x510afb+_0x4cd610(0x20a));}else{if(_0x5dfd01['startsWith']('on')||_0x5dfd01['startsWith'](_0x4cd610(0x1e9))||_0x5dfd01[_0x4cd610(0x24f)](_0x4cd610(0xef))){if(_0x5d4349[_0x4cd610(0x1ea)]===_0x4cd610(0x1d2))return await _0x1965b9[_0x4cd610(0x1e6)](_0x4cd610(0x223));if(_0x1965b9[_0x4cd610(0x1ab)])return await groupdb[_0x4cd610(0x1e3)]({'id':_0x1965b9[_0x4cd610(0x194)]},{'onlyadmin':'true'}),await _0x1965b9[_0x4cd610(0x213)][_0x4cd610(0xf5)](_0x1965b9[_0x4cd610(0x194)],'announcement'),await _0x1965b9[_0x4cd610(0x140)]('*'+_0x510afb+_0x4cd610(0x1a5));else return await _0x1965b9[_0x4cd610(0x1e6)]('*_UHH\x20Please,\x20Provide\x20Admin\x20Role\x20First_*');}else return await _0x1965b9[_0x4cd610(0x1e6)](_0x4cd610(0x184));}}}catch(_0x2cff81){_0x1965b9[_0x4cd610(0xed)](_0x2cff81+_0x4cd610(0x1c9),_0x2cff81);}}),smd({'pattern':_0x204412(0xda),'desc':_0x204412(0x141),'category':_0x204412(0x149),'filename':__filename},async(_0xa43d98,_0xf97b24,{cmdName:_0x517093})=>{const _0x227ed3=_0x204412;try{if(!_0xa43d98[_0x227ed3(0xd4)])return _0xa43d98[_0x227ed3(0x1e6)](tlang()['group']);if(!_0xa43d98[_0x227ed3(0x22f)]&&!_0xa43d98[_0x227ed3(0x1b7)])return _0xa43d98[_0x227ed3(0x1e6)](tlang()[_0x227ed3(0x19f)]);let _0x203679=await groupdb[_0x227ed3(0x21e)]({'id':_0xa43d98['chat']})||await groupdb[_0x227ed3(0x214)]({'id':_0xa43d98[_0x227ed3(0x194)]}),_0x46e27b=_0xf97b24?_0xf97b24[_0x227ed3(0x15a)]()[_0x227ed3(0x169)]():'',_0x21d881=_0x46e27b[_0x227ed3(0x24f)]('on')||_0x46e27b[_0x227ed3(0x24f)](_0x227ed3(0x1e9))||_0x46e27b[_0x227ed3(0x24f)]('enable')||_0x46e27b[_0x227ed3(0x24f)](_0x227ed3(0x12e))||_0x46e27b[_0x227ed3(0x24f)](_0x227ed3(0x21b))?'warn':_0x46e27b[_0x227ed3(0x24f)](_0x227ed3(0x1ae))?_0x227ed3(0x19d):_0x46e27b[_0x227ed3(0x24f)]('off')||_0x46e27b[_0x227ed3(0x24f)](_0x227ed3(0x18b))||_0x46e27b[_0x227ed3(0x24f)]('deact')||_0x46e27b[_0x227ed3(0x24f)](_0x227ed3(0x1eb))?_0x227ed3(0x1f0):'';if(!_0x21d881)return await _0xa43d98[_0x227ed3(0x140)](_0x227ed3(0x165)+(_0x203679['antibot']===_0x227ed3(0x1f0)?'Disabled':_0x227ed3(0x170))+_0x227ed3(0x1a8));else{if(_0x21d881===_0x227ed3(0x1f0)){if(_0x203679[_0x227ed3(0xda)]===_0x227ed3(0x1f0))return await _0xa43d98[_0x227ed3(0x1e6)](_0x227ed3(0x160));return await groupdb[_0x227ed3(0x1e3)]({'id':_0xa43d98['chat']},{'antibot':_0x227ed3(0x1f0)}),await _0xa43d98[_0x227ed3(0x140)](_0x227ed3(0x210));}else{if(_0x21d881==='warn'||_0x21d881===_0x227ed3(0x19d)){if(_0x203679['antibot']===_0x21d881)return await _0xa43d98['reply'](_0x227ed3(0x166)+_0x21d881+_0x227ed3(0xee));if(!_0xa43d98[_0x227ed3(0x1ab)])return await _0xa43d98['reply'](_0x227ed3(0xe1));return await groupdb[_0x227ed3(0x1e3)]({'id':_0xa43d98[_0x227ed3(0x194)]},{'antibot':_0x21d881}),await _0xa43d98[_0x227ed3(0x140)]('*_Antibot\x20Succesfully\x20set\x20to\x20'+_0x21d881+_0x227ed3(0x123));}else return await _0xa43d98['reply'](_0x227ed3(0x119));}}}catch(_0x59f2a7){_0xa43d98[_0x227ed3(0xed)](_0x59f2a7+_0x227ed3(0x227),_0x59f2a7);}}),smd({'pattern':_0x204412(0x1eb),'desc':_0x204412(0x13d),'category':_0x204412(0x149),'filename':__filename},async(_0x57fd77,_0x368830)=>{const _0x42d028=_0x204412;try{if(!_0x57fd77['isGroup'])return _0x57fd77[_0x42d028(0x1e6)](tlang()[_0x42d028(0x149)]);if(!_0x57fd77[_0x42d028(0x22f)]&&!_0x57fd77[_0x42d028(0x1b7)])return _0x57fd77[_0x42d028(0x1e6)](tlang()[_0x42d028(0x19f)]);let _0x5e479b=await groupdb[_0x42d028(0x21e)]({'id':_0x57fd77[_0x42d028(0x194)]})||await groupdb[_0x42d028(0x214)]({'id':_0x57fd77[_0x42d028(0x194)]}),_0x2c683c=_0x368830?_0x368830[_0x42d028(0x15a)]()[_0x42d028(0x169)]():![],_0x39d4ba=_0x2c683c?_0x2c683c[_0x42d028(0x12c)]('\x20')[0x0]:'';if(!_0x39d4ba)return await _0x57fd77[_0x42d028(0x140)](_0x42d028(0x204)+prefix+_0x42d028(0x11a));else{if(_0x39d4ba[_0x42d028(0x24f)](_0x42d028(0x16d))||_0x39d4ba[_0x42d028(0x24f)](_0x42d028(0x192))||_0x39d4ba['startsWith'](_0x42d028(0xf7)))return await _0x57fd77[_0x42d028(0x140)](_0x5e479b['disablecmds']===_0x42d028(0x1f0)?'*_Uhh\x20Dear,\x20Theres\x20no\x20cmd\x20disabled\x20in\x20current\x20group_*':'*_Disable\x20cmds\x20:_*\x20```'+_0x5e479b['disablecmds']['replace'](_0x42d028(0x1b3),'')+'```');else{if(_0x39d4ba[_0x42d028(0x24f)](_0x42d028(0xef))||_0x39d4ba[_0x42d028(0x24f)]('disable')||_0x39d4ba['startsWith'](_0x42d028(0x213)))return await _0x57fd77[_0x42d028(0x1e6)](_0x42d028(0x129));else{if(_0x39d4ba){const _0x122c70=astro_patch[_0x42d028(0xdf)][_0x42d028(0x230)](_0x4be928=>_0x4be928[_0x42d028(0x142)]===_0x39d4ba)||astro_patch['commands'][_0x42d028(0x230)](_0xb39ccd=>_0xb39ccd[_0x42d028(0x101)]&&_0xb39ccd[_0x42d028(0x101)][_0x42d028(0x254)](_0x39d4ba));if(_0x122c70){let _0x3be554=_0x122c70[_0x42d028(0x142)]['replace'](/[.*+?^${}()|[\]\\]/g,_0x42d028(0x1a7)),_0xb4f9b2=new RegExp('\x5cb'+_0x3be554+'\x5cb');if(_0xb4f9b2[_0x42d028(0x154)](_0x5e479b[_0x42d028(0x1c0)]))return await _0x57fd77[_0x42d028(0x140)](_0x42d028(0x1c8));var _0xc3e0c=_0x5e479b['disablecmds']+','+_0x122c70[_0x42d028(0x142)];await groupdb[_0x42d028(0x1e3)]({'id':_0x57fd77['chat']},{'disablecmds':_0xc3e0c});let _0x3403f2=_0xc3e0c[_0x42d028(0x11c)](_0x42d028(0x1b3),'');return await _0x57fd77[_0x42d028(0x140)](_0x42d028(0x242)+_0x39d4ba+_0x42d028(0xf4)+(_0x3403f2===''?'':'\x0a*_Disable\x20cmds\x20:_*\x20```'+_0x3403f2+_0x42d028(0x1ed)));}else return await _0x57fd77['reply'](_0x42d028(0x21d)+_0x39d4ba+_0x42d028(0x1b0));}}}}}catch(_0x54e62c){_0x57fd77[_0x42d028(0xed)](_0x54e62c+_0x42d028(0x102),_0x54e62c);}}),smd({'pattern':_0x204412(0xef),'desc':_0x204412(0xe3),'category':'group','filename':__filename},async(_0x22dc90,_0x26f7a0)=>{const _0x864c75=_0x204412;try{if(!_0x22dc90[_0x864c75(0xd4)])return _0x22dc90[_0x864c75(0x1e6)](tlang()[_0x864c75(0x149)]);if(!_0x22dc90['isAdmin']&&!_0x22dc90[_0x864c75(0x1b7)])return _0x22dc90[_0x864c75(0x1e6)](tlang()[_0x864c75(0x19f)]);let _0x2a73ae=await groupdb[_0x864c75(0x21e)]({'id':_0x22dc90[_0x864c75(0x194)]})||await groupdb[_0x864c75(0x214)]({'id':_0x22dc90[_0x864c75(0x194)]}),_0x51a36d=_0x26f7a0?_0x26f7a0[_0x864c75(0x15a)]()[_0x864c75(0x169)]():![],_0x7e021e=_0x51a36d?_0x51a36d['split']('\x20')[0x0]:'',_0x3ff298=_0x7e021e[_0x864c75(0x11c)](/[.*+?^${}()|[\]\\]/g,'\x5c$&'),_0x1e30cd=new RegExp('\x5cb'+_0x3ff298+'\x5cb');if(!_0x7e021e||_0x7e021e==='')return await _0x22dc90[_0x864c75(0x140)](_0x864c75(0x10d)+prefix+_0x864c75(0x207));else{if(_0x51a36d[_0x864c75(0x24f)](_0x864c75(0x115)))return await groupdb[_0x864c75(0x1e3)]({'id':_0x22dc90[_0x864c75(0x194)]},{'disablecmds':_0x864c75(0x1f0)}),await _0x22dc90[_0x864c75(0x140)]('*_All\x20disable\x20cmds\x20succesfully\x20enabled_*');else{if(_0x1e30cd[_0x864c75(0x154)](_0x2a73ae[_0x864c75(0x1c0)])&&_0x2a73ae[_0x864c75(0x1c0)][_0x864c75(0x254)](_0x7e021e)){let _0x53d67f=_0x2a73ae[_0x864c75(0x1c0)][_0x864c75(0x11c)](_0x1e30cd,'');return await groupdb[_0x864c75(0x1e3)]({'id':_0x22dc90[_0x864c75(0x194)]},{'disablecmds':_0x53d67f}),await _0x22dc90[_0x864c75(0x140)]('*_\x22'+_0x7e021e[_0x864c75(0x11c)](',','')+'\x22\x20Succesfully\x20removed\x20from\x20disable\x20cmds_*');}else return await _0x22dc90[_0x864c75(0x140)]('_There\x27s\x20no\x20cmd\x20disabled\x20with\x20*'+_0x7e021e[_0x864c75(0x11c)](',','')+'*\x20name');}}}catch(_0x1c6669){_0x22dc90['error'](_0x1c6669+_0x864c75(0x1f6),_0x1c6669);}}),smd({'pattern':_0x204412(0x1fb),'desc':_0x204412(0x199),'category':'group','filename':__filename},async(_0x157a41,_0x12674f)=>{const _0x261255=_0x204412;try{if(!_0x157a41[_0x261255(0xd4)])return _0x157a41[_0x261255(0x1e6)](tlang()['group']);if(!_0x157a41[_0x261255(0x22f)]&&!_0x157a41[_0x261255(0x1b7)])return _0x157a41['reply'](tlang()[_0x261255(0x19f)]);let _0x994e2=await groupdb['findOne']({'id':_0x157a41['chat']})||await groupdb[_0x261255(0x214)]({'id':_0x157a41['chat']}),_0x399b24=_0x12674f?_0x12674f['toLowerCase']()[_0x261255(0x169)]():'';if(_0x399b24[_0x261255(0x24f)](_0x261255(0x11b))||_0x399b24[_0x261255(0x24f)](_0x261255(0x24a))||_0x399b24[_0x261255(0x24f)]('disable')){if(_0x994e2[_0x261255(0x1fb)]==_0x261255(0x1f0))return await _0x157a41['send'](_0x261255(0x150));return await groupdb[_0x261255(0x1e3)]({'id':_0x157a41[_0x261255(0x194)]},{'antifake':'false'}),await _0x157a41['send'](_0x261255(0x23a));}else{if(!_0x12674f)return await _0x157a41[_0x261255(0x140)](_0x261255(0xd3)+(_0x994e2[_0x261255(0x1fb)]==='false'?'Not\x20set\x20to\x20any':_0x261255(0x155)+_0x994e2[_0x261255(0x1fb)]+'\x22')+'\x20Country\x20Code!_*\x0a\x20*Provide\x20Country\x20code\x20to\x20Update\x20Antifake\x20Status*\x0a*Eg:\x20_.antifake\x2092_*');}let _0x16dd8f=_0x12674f?_0x12674f[_0x261255(0x12c)](',')[_0x261255(0x139)](_0x254b9f=>parseInt(_0x254b9f))[_0x261255(0x208)](_0x3a3739=>!isNaN(_0x3a3739))[_0x261255(0x157)](','):![];if(!_0x12674f||!_0x16dd8f)return await _0x157a41[_0x261255(0x140)]('*_Please\x20provide\x20a\x20country\x20code\x20First_*\x0a\x20*_Only\x20numbers\x20to\x20join\x20this\x20group._*\x0a*_eg:\x20'+prefix+_0x261255(0x188));else{if(_0x16dd8f)return await groupdb[_0x261255(0x1e3)]({'id':_0x157a41['chat']},{'antifake':''+_0x16dd8f}),await _0x157a41['send']('*Anti_Fake\x20Succesfully\x20set\x20to\x20\x22'+_0x16dd8f+_0x261255(0x10a)+_0x16dd8f+'_*');else return await _0x157a41[_0x261255(0x140)](_0x261255(0x126)+prefix+_0x261255(0x188));}}catch(_0x2c645e){_0x157a41[_0x261255(0xed)](_0x2c645e+_0x261255(0x1c5),_0x2c645e);}}),smd({'pattern':_0x204412(0x238),'desc':_0x204412(0x205),'category':_0x204412(0x149),'filename':__filename},async(_0x17b37d,_0x28540e)=>{const _0x3a56c0=_0x204412;try{if(!_0x17b37d['isGroup'])return _0x17b37d['reply'](tlang()[_0x3a56c0(0x149)]);if(!_0x17b37d[_0x3a56c0(0x22f)]&&!_0x17b37d[_0x3a56c0(0x1b7)])return _0x17b37d[_0x3a56c0(0x1e6)](tlang()[_0x3a56c0(0x19f)]);let _0x189bd8=await groupdb[_0x3a56c0(0x21e)]({'id':_0x17b37d[_0x3a56c0(0x194)]})||await groupdb[_0x3a56c0(0x214)]({'id':_0x17b37d[_0x3a56c0(0x194)]}),_0x35dcf2=_0x28540e?_0x28540e[_0x3a56c0(0x15a)]()['trim']():'';if(_0x35dcf2[_0x3a56c0(0x24f)]('on')||_0x35dcf2[_0x3a56c0(0x24f)](_0x3a56c0(0x1e9))||_0x35dcf2[_0x3a56c0(0x24f)](_0x3a56c0(0xef))){if(_0x189bd8[_0x3a56c0(0x238)]==_0x3a56c0(0x1d2))return await _0x17b37d[_0x3a56c0(0x140)](_0x3a56c0(0x110));return await groupdb[_0x3a56c0(0x1e3)]({'id':_0x17b37d['chat']},{'antidemote':_0x3a56c0(0x1d2)}),await _0x17b37d[_0x3a56c0(0x140)](_0x3a56c0(0x1f2));}else{if(_0x35dcf2['startsWith']('off')||_0x35dcf2['startsWith'](_0x3a56c0(0x24a))||_0x35dcf2['startsWith'](_0x3a56c0(0x1eb))){if(_0x189bd8[_0x3a56c0(0x238)]==_0x3a56c0(0x1f0))return await _0x17b37d['send'](_0x3a56c0(0x1cd));return await groupdb[_0x3a56c0(0x1e3)]({'id':_0x17b37d[_0x3a56c0(0x194)]},{'antidemote':_0x3a56c0(0x1f0)}),await _0x17b37d[_0x3a56c0(0x140)]('*Anti_Demote\x20Disable\x20Succesfully!*');}else return await _0x17b37d[_0x3a56c0(0x1e6)](_0x3a56c0(0x20f));}}catch(_0x3f67d7){_0x17b37d['error'](_0x3f67d7+_0x3a56c0(0x1fc),_0x3f67d7);}}),smd({'pattern':_0x204412(0x228),'desc':_0x204412(0x205),'category':_0x204412(0x149),'filename':__filename},async(_0x2eb558,_0x4b82b1)=>{const _0x20a3b6=_0x204412;try{if(!_0x2eb558[_0x20a3b6(0xd4)])return _0x2eb558[_0x20a3b6(0x1e6)](tlang()[_0x20a3b6(0x149)]);if(!_0x2eb558[_0x20a3b6(0x22f)]&&!_0x2eb558['isCreator'])return _0x2eb558['reply'](tlang()[_0x20a3b6(0x19f)]);let _0x489b49=await groupdb['findOne']({'id':_0x2eb558[_0x20a3b6(0x194)]})||await groupdb['new']({'id':_0x2eb558[_0x20a3b6(0x194)]}),_0x4fe583=_0x4b82b1?_0x4b82b1[_0x20a3b6(0x15a)]()[_0x20a3b6(0x169)]():'';if(_0x4fe583[_0x20a3b6(0x24f)]('on')||_0x4fe583[_0x20a3b6(0x24f)](_0x20a3b6(0x1e9))||_0x4fe583['startsWith'](_0x20a3b6(0xef))){if(_0x489b49[_0x20a3b6(0x228)]==_0x20a3b6(0x1d2))return await _0x2eb558[_0x20a3b6(0x140)](_0x20a3b6(0x1bf));return await groupdb[_0x20a3b6(0x1e3)]({'id':_0x2eb558[_0x20a3b6(0x194)]},{'antipromote':_0x20a3b6(0x1d2)}),await _0x2eb558[_0x20a3b6(0x140)](_0x20a3b6(0x130));}else{if(_0x4fe583[_0x20a3b6(0x24f)](_0x20a3b6(0x11b))||_0x4fe583['startsWith'](_0x20a3b6(0x24a))||_0x4fe583[_0x20a3b6(0x24f)](_0x20a3b6(0x1eb))){if(_0x489b49[_0x20a3b6(0x228)]==_0x20a3b6(0x1f0))return await _0x2eb558[_0x20a3b6(0x140)](_0x20a3b6(0x15d));return await groupdb[_0x20a3b6(0x1e3)]({'id':_0x2eb558[_0x20a3b6(0x194)]},{'antipromote':'false'}),await _0x2eb558[_0x20a3b6(0x140)](_0x20a3b6(0x1dd));}else return await _0x2eb558[_0x20a3b6(0x1e6)](_0x20a3b6(0x217));}}catch(_0x14b987){_0x2eb558['error'](_0x14b987+_0x20a3b6(0xd8),_0x14b987);}}),smd({'pattern':'pdm','desc':_0x204412(0x18c),'category':_0x204412(0x149),'filename':__filename},async(_0x5e0b30,_0x3b1de0)=>{const _0x3bb432=_0x204412;try{if(!_0x5e0b30[_0x3bb432(0xd4)])return _0x5e0b30[_0x3bb432(0x1e6)](tlang()[_0x3bb432(0x149)]);if(!_0x5e0b30[_0x3bb432(0x22f)]&&!_0x5e0b30['isCreator'])return _0x5e0b30['reply'](tlang()[_0x3bb432(0x19f)]);let _0x526ce1=await groupdb['findOne']({'id':_0x5e0b30[_0x3bb432(0x194)]})||await groupdb[_0x3bb432(0x214)]({'id':_0x5e0b30['chat']}),_0x3c651a=_0x3b1de0?_0x3b1de0[_0x3bb432(0x15a)]()[_0x3bb432(0x169)]():'';if(_0x3c651a['startsWith']('on')||_0x3c651a[_0x3bb432(0x24f)](_0x3bb432(0x1e9))||_0x3c651a[_0x3bb432(0x24f)](_0x3bb432(0xef))){if(_0x526ce1['pdm']=='true')return await _0x5e0b30[_0x3bb432(0x140)](_0x3bb432(0x19a));return await groupdb[_0x3bb432(0x1e3)]({'id':_0x5e0b30[_0x3bb432(0x194)]},{'pdm':_0x3bb432(0x1d2)}),await _0x5e0b30[_0x3bb432(0x140)]('*Promote/Demote\x20Alerts\x20Enable\x20Succesfully!*');}else{if(_0x3c651a['startsWith'](_0x3bb432(0x11b))||_0x3c651a[_0x3bb432(0x24f)](_0x3bb432(0x24a))||_0x3c651a[_0x3bb432(0x24f)]('disable')){if(_0x526ce1[_0x3bb432(0xe8)]==_0x3bb432(0x1f0))return await _0x5e0b30[_0x3bb432(0x140)](_0x3bb432(0x132));return await groupdb['updateOne']({'id':_0x5e0b30[_0x3bb432(0x194)]},{'pdm':_0x3bb432(0x1f0)}),await _0x5e0b30[_0x3bb432(0x140)](_0x3bb432(0x13f));}else return await _0x5e0b30[_0x3bb432(0x1e6)](_0x3bb432(0x1fa));}}catch(_0x5606b8){_0x5e0b30[_0x3bb432(0xed)](_0x5606b8+'\x0a\x0acommand:\x20pdm',_0x5606b8);}}),smd({'pattern':_0x204412(0x190),'desc':_0x204412(0x209),'category':'moderation'},async(_0x40a933,_0x42047d)=>{const _0x175b7d=_0x204412;try{if(!_0x40a933[_0x175b7d(0xd4)])return _0x40a933[_0x175b7d(0x1e6)](tlang()['group']);if(!_0x40a933['isAdmin']&&!_0x40a933[_0x175b7d(0x1b7)])return _0x40a933[_0x175b7d(0x1e6)](tlang()['admin']);let _0x2a0894=await groupdb[_0x175b7d(0x21e)]({'id':_0x40a933[_0x175b7d(0x194)]})||await groupdb[_0x175b7d(0x214)]({'id':_0x40a933[_0x175b7d(0x194)]});if(!_0x42047d)return await _0x40a933[_0x175b7d(0x1e6)](_0x175b7d(0x224)+(_0x2a0894['mute']===_0x175b7d(0x1f0)?_0x175b7d(0x1eb):_0x175b7d(0x226))+_0x175b7d(0x243)+(_0x2a0894[_0x175b7d(0x182)]!==_0x175b7d(0x1f0)?_0x175b7d(0x225)+_0x2a0894['mute']+'*\x20':''));let [_0x159db4,_0x1b2477]=_0x42047d['split'](':')[_0x175b7d(0x139)](Number);if(isNaN(_0x159db4)||isNaN(_0x1b2477)||_0x159db4<0x0||_0x159db4>=0x18||_0x1b2477<0x0||_0x1b2477>=0x3c)return _0x40a933[_0x175b7d(0x1e6)]('Please\x20provide\x20correct\x20form.\x0aEg:\x20'+prefix+_0x175b7d(0x21a));let _0x223929=_0x159db4[_0x175b7d(0x181)]()[_0x175b7d(0x1bd)](0x2,'0')+':'+_0x1b2477['toString']()[_0x175b7d(0x1bd)](0x2,'0');return await groupdb[_0x175b7d(0x1e3)]({'id':_0x40a933['chat']},{'mute':_0x223929}),_0x40a933[_0x175b7d(0x1e6)](_0x175b7d(0x1b8)+_0x223929+'_*');}catch(_0x5cb63b){_0x40a933[_0x175b7d(0xed)](_0x5cb63b+_0x175b7d(0xd5),_0x5cb63b);}}),smd({'pattern':_0x204412(0x1ec),'desc':'sets\x20unmute\x20time\x20in\x20group.','category':_0x204412(0x1c3)},async(_0x20f896,_0x197285)=>{const _0x486ad5=_0x204412;try{if(!_0x20f896[_0x486ad5(0xd4)])return _0x20f896[_0x486ad5(0x1e6)](tlang()['group']);if(!_0x20f896['isAdmin']&&!_0x20f896[_0x486ad5(0x1b7)])return _0x20f896[_0x486ad5(0x1e6)](tlang()[_0x486ad5(0x19f)]);let _0x5de016=await groupdb[_0x486ad5(0x21e)]({'id':_0x20f896[_0x486ad5(0x194)]})||await groupdb[_0x486ad5(0x214)]({'id':_0x20f896[_0x486ad5(0x194)]});if(!_0x197285)return await _0x20f896[_0x486ad5(0x1e6)]('*Auto_Unmute\x20*'+(_0x5de016[_0x486ad5(0x1d4)]===_0x486ad5(0x1f0)?'disable':_0x486ad5(0x226))+'\x20for\x20current\x20group*'+(_0x5de016[_0x486ad5(0x1d4)]!==_0x486ad5(0x1f0)?_0x486ad5(0x156)+_0x5de016['unmute']+'*\x20':''));let [_0x405a82,_0x2e7bff]=_0x197285[_0x486ad5(0x12c)](':')[_0x486ad5(0x139)](Number);if(isNaN(_0x405a82)||isNaN(_0x2e7bff)||_0x405a82<0x0||_0x405a82>=0x18||_0x2e7bff<0x0||_0x2e7bff>=0x3c)return _0x20f896[_0x486ad5(0x1e6)](_0x486ad5(0x18e)+prefix+'aunmute\x2022:00');let _0x3074bb=_0x405a82[_0x486ad5(0x181)]()[_0x486ad5(0x1bd)](0x2,'0')+':'+_0x2e7bff['toString']()['padStart'](0x2,'0');return await groupdb['updateOne']({'id':_0x20f896[_0x486ad5(0x194)]},{'unmute':_0x3074bb}),_0x20f896[_0x486ad5(0x1e6)]('*_Successfully\x20done,\x20Group\x20auto\x20unmute\x20at\x20'+_0x3074bb+'_*');}catch(_0x44f952){_0x20f896[_0x486ad5(0xed)](_0x44f952+_0x486ad5(0x125),_0x44f952);}}),smd({'pattern':_0x204412(0x152),'desc':_0x204412(0x1d8),'category':_0x204412(0x1c3)},async _0x120fd5=>{const _0x1222bf=_0x204412;try{if(!_0x120fd5['isGroup'])return _0x120fd5[_0x1222bf(0x1e6)](tlang()['group']);if(!_0x120fd5[_0x1222bf(0x22f)]&&!_0x120fd5['isCreator'])return _0x120fd5[_0x1222bf(0x1e6)](tlang()[_0x1222bf(0x19f)]);let _0xecdeb4=await groupdb[_0x1222bf(0x21e)]({'id':_0x120fd5[_0x1222bf(0x194)]});if(!_0xecdeb4||!_0xecdeb4[_0x1222bf(0x1d4)]||_0xecdeb4[_0x1222bf(0x1d4)]==_0x1222bf(0x1f0))return await _0x120fd5[_0x1222bf(0x1e6)]('*There\x27s\x20no\x20auto\x20unmute\x20set\x20in\x20group.*');return await groupdb[_0x1222bf(0x1e3)]({'id':_0x120fd5[_0x1222bf(0x194)]},{'unmute':_0x1222bf(0x1f0)}),await _0x120fd5[_0x1222bf(0x1e6)](_0x1222bf(0x183));}catch(_0x228ce4){_0x120fd5['error'](_0x228ce4+_0x1222bf(0x186),_0x228ce4);}}),smd({'pattern':_0x204412(0x11f),'desc':_0x204412(0x127),'category':_0x204412(0x1c3)},async(_0x73ceb0,_0x1d3d47)=>{const _0x3261f0=_0x204412;try{if(!_0x73ceb0[_0x3261f0(0xd4)])return _0x73ceb0[_0x3261f0(0x1e6)](tlang()[_0x3261f0(0x149)]);if(!_0x73ceb0['isAdmin']&&!_0x73ceb0[_0x3261f0(0x1b7)])return _0x73ceb0[_0x3261f0(0x1e6)](tlang()[_0x3261f0(0x19f)]);let _0xe9d02=await groupdb[_0x3261f0(0x21e)]({'id':_0x73ceb0[_0x3261f0(0x194)]});if(!_0xe9d02||!_0xe9d02[_0x3261f0(0x182)]||_0xe9d02[_0x3261f0(0x182)]=='false')return await _0x73ceb0['reply'](_0x3261f0(0x1f3));return await groupdb['updateOne']({'id':_0x73ceb0[_0x3261f0(0x194)]},{'mute':'false'}),await _0x73ceb0['reply'](_0x3261f0(0x10c));}catch(_0x2edc13){_0x73ceb0[_0x3261f0(0xed)](_0x2edc13+'\x0a\x0acommand:\x20dmute',_0x2edc13);}});async function haveEqualMembers(_0x4299c5,_0x36f2ca){const _0x40da31=_0x204412;if(_0x4299c5[_0x40da31(0x13a)]===0x0||_0x36f2ca['length']===0x0)return![];const _0x4b02b5=_0x4299c5[_0x40da31(0x208)](_0x390823=>_0x36f2ca[_0x40da31(0x254)](_0x390823)),_0x4efcfe=_0x4b02b5[_0x40da31(0x13a)]/_0x4299c5['length']*0x64;return _0x4efcfe>=0x50;}smd({'pattern':'antiword','desc':'Detects\x20words\x20from\x20chat,and\x20delete/warn\x20senders.','category':_0x204412(0x149),'filename':__filename,'use':_0x204412(0x1a0)},async(_0x4ff73f,_0x41e8ca,{cmdName:_0xf9ed5e})=>{const _0xc68763=_0x204412;try{if(!_0x4ff73f['isGroup'])return _0x4ff73f[_0xc68763(0x1e6)](tlang()[_0xc68763(0x149)]);if(!_0x4ff73f[_0xc68763(0x22f)]&&!_0x4ff73f[_0xc68763(0x1b7)])return _0x4ff73f['reply'](tlang()[_0xc68763(0x19f)]);let _0x288536=await groupdb['findOne']({'id':_0x4ff73f[_0xc68763(0x194)]})||await groupdb['new']({'id':_0x4ff73f[_0xc68763(0x194)],'antiword':{'status':_0xc68763(0x1f0),'words':''}}),_0x23a35d=_0x41e8ca?_0x41e8ca[_0xc68763(0x15a)]()[_0xc68763(0x169)]():![],_0x3795eb=_0x288536[_0xc68763(0x1bc)],_0x4691c8=_0xc68763(0xea)+(_0x3795eb[_0xc68763(0x16f)]!==_0xc68763(0x1f0)?_0xc68763(0x226):_0xc68763(0x1ce))+'!!!*\x20```\x0a\x20\x20STATUS:\x20'+(_0x3795eb['status']?_0x3795eb[_0xc68763(0x16f)]:_0xc68763(0x219))+_0xc68763(0x12d)+(_0x3795eb[_0xc68763(0x1cb)]?_0x3795eb[_0xc68763(0x1cb)][_0xc68763(0x11c)](/,/gi,_0xc68763(0x191)):_0xc68763(0x219))+'```\x0a\x0a*Available\x20Cmds:*\x20```\x0a\x20\x20'+(prefix+_0xf9ed5e)+_0xc68763(0x151)+(prefix+_0xf9ed5e)+_0xc68763(0x108)+(prefix+_0xf9ed5e)+'\x20warn\x20|\x20bad,words\x0a\x20\x20'+(prefix+_0xf9ed5e)+_0xc68763(0x1fd)+Config['caption'];if(!_0x23a35d||!_0x41e8ca)return await _0x4ff73f['send'](_0x4691c8);let _0x4aeb18=_0x23a35d[_0xc68763(0x12c)]('|')[0x1]||'',_0x5c8c79=_0x23a35d[_0xc68763(0x24f)]('on')||_0x23a35d[_0xc68763(0x24f)](_0xc68763(0x1e9))||_0x23a35d['startsWith']('enable')||_0x23a35d[_0xc68763(0x24f)](_0xc68763(0x12e))?'delete':_0x23a35d[_0xc68763(0x24f)](_0xc68763(0x21b))?_0xc68763(0x21b):_0x23a35d[_0xc68763(0x24f)]('off')||_0x23a35d[_0xc68763(0x24f)]('deact')||_0x23a35d[_0xc68763(0x24f)]('disable')?_0xc68763(0x1f0):_0x23a35d[_0xc68763(0x24f)](_0xc68763(0x18b))?_0xc68763(0x18b):'';_0x5c8c79=!_0x5c8c79&&_0x4aeb18&&_0x3795eb['status']!==_0xc68763(0x1f0)?_0x3795eb['status']:_0x5c8c79;if(_0x5c8c79==='reset')return await groupdb[_0xc68763(0x1e3)]({'id':_0x4ff73f[_0xc68763(0x194)]},{'antiword':{}}),await _0x4ff73f['send'](_0xc68763(0x20e));else{if(_0x5c8c79==='delete'||_0x5c8c79===_0xc68763(0x21b)){if(_0x3795eb[_0xc68763(0x16f)]==_0x5c8c79&&!_0x4aeb18)return await _0x4ff73f[_0xc68763(0x140)](_0xc68763(0x145)+(prefix+_0xf9ed5e)+'\x20'+_0x5c8c79+_0xc68763(0x16e));return _0x4aeb18=_0x4aeb18?_0x4aeb18:_0x3795eb[_0xc68763(0x1cb)],await groupdb[_0xc68763(0x1e3)]({'id':_0x4ff73f[_0xc68763(0x194)]},{'antiword':{'status':_0x5c8c79,'words':_0x4aeb18}}),await _0x4ff73f[_0xc68763(0x140)]('*_Anti_Word\x20succesfully\x20set\x20to\x20\x27'+_0x5c8c79+_0xc68763(0x17b)+(_0x4aeb18?_0x4aeb18['replace'](/,/gi,_0xc68763(0x250)):_0xc68763(0x219))+_0xc68763(0xd9));}else{if(_0x5c8c79===_0xc68763(0x1f0)){if(_0x3795eb[_0xc68763(0x16f)]===_0x5c8c79)return await _0x4ff73f[_0xc68763(0x140)](_0xc68763(0x1b4));return await groupdb[_0xc68763(0x1e3)]({'id':_0x4ff73f[_0xc68763(0x194)]},{'antiword':{'status':'false','words':_0x3795eb[_0xc68763(0x1cb)]}}),await _0x4ff73f['send'](_0xc68763(0x221));}else return await _0x4ff73f[_0xc68763(0x1e6)](_0xc68763(0x234)+_0x4691c8);}}}catch(_0x17d461){_0x4ff73f[_0xc68763(0xed)](_0x17d461+_0xc68763(0x167),_0x17d461);}});let bott=![],chatbotCount=0x0;function _0x5029(){const _0x4bb937=['PRIVATE\x20CHAT','*_Bot\x20already\x20enabled\x20in\x20current\x20Chat!!_*','*Anti_Demote\x20Already\x20Enabled\x20In\x20Current\x20Chat!*','*_Successfully\x20Enabled\x20NSFW_*','allwarn','\x20in\x20this\x20Group!_*\x0a\x20*_Use\x20on/off\x20to\x20enable/disable_*','*_Bot\x20*','all','Error\x20From\x20ChatBot\x20:\x20','\x20activated\x20successfully.*','*Goodbye\x20successfully\x20enabled!!*','*_Please\x20provide\x20valid\x20instructions!_*\x0a*_Use\x20warn/kick/off\x20to\x20enable/disable\x20Antibot!_*','disable\x20tag(to\x20disabled\x20\x27tag\x27\x20cmd)/info*','off','replace','nsfw','links\x20not\x20allowed!','dmute','[MESSAGE\x20IN\x20GROUP]\x20From\x20=>\x20','updateBlockStatus','Bots\x20not\x20allowed!','\x20Bot\x20Users!_*','setwelcome','\x0a\x0acommand:\x20aunmute','*_Please\x20provide\x20a\x20Valid\x20country\x20code\x20First_*\x0a\x20*_Only\x20numbers\x20to\x20join\x20this\x20group._*\x0a*_eg:\x20','Delete\x20mute\x20from\x20group.','fromMe','*_Uhh\x20Dear,\x20I\x20can\x27t\x20disable\x20that\x20cmd_*','*_Anti_tag\x20Disabled\x20Succesfully!_*','\x0a\x0acommand:\x20antitag','split','\x20\x0a\x20\x20WORDS:\x20','del','toUpperCase','*Anti_Promote\x20Enable\x20Succesfully!\x20_No\x20One\x20Promote\x20Here\x20Now_.*','event','*Promote/Demote\x20Alerts\x20Already\x20Disabled\x20In\x20Current\x20Chat!*','\x20warning!!_*\x0a*_links\x20not\x20allowed\x20in\x20current\x20group!_*','*_Uhh\x20dear,\x20Group\x20not\x20found\x20in\x20Databse!_*','subject','Enabled\x20in\x20\x27all\x27\x20Chats','╰─────────────◆\x0a','9XloAVb','map','length','\x20Currently\x20*','senderNum','disable\x20cmds\x20in\x20Group.!','*_Uhh\x20please,\x20reply\x20to\x20a\x20user!!_*','*Promote/Demote\x20Alerts\x20Disable\x20Succesfully!*','send','kick\x20Bot\x20Users\x20from\x20Group.!','pattern','\x0a\x0acommand:\x20antilink','*_Anti_Link\x20already\x20set\x20to\x20warn\x20link\x20senders!!_*','*Please\x20provide\x20badWords,\x20like\x20','main','sender','*_[TAG\x20DETECTED]\x20Hey\x20@','group','*_NSFW\x20is\x20already\x20disabled!_*','*Welcome\x20successfully\x20enabled!!*','title','lydea','*Successfully\x20disabled\x20Events!*','170998qCRLHn','*Anti_Fake\x20Already\x20Disabled\x20In\x20Current\x20Chat!*','\x20off\x20\x0a\x20\x20','dunmute','../lib/plugins','test','set\x20to\x20\x22','\x0a\x20*Auto\x20unmute\x20status\x20set\x20at\x20:\x20','join',',\x20Kicking\x20you\x20from\x20group!_*\x0a*_Because\x20Your\x20warn\x20limit\x20exceed!_*','welcome','toLowerCase','\x20*[LINK\x20DETECTED]*\x0aUser\x20@','addwarn','*Anti_Promote\x20Already\x20Disabled\x20In\x20Current\x20Chat!*','\x20Can\x27t\x20promote\x20user\x20in\x20antidemote\x0a❲❒❳\x20GROUP:\x20','*_disabled\x20antilink\x20in\x20current\x20chat!_*','*_Antibot\x20Already\x20Disabled\x20in\x20Current\x20Chat_*','previous_Action','Error\x20From\x20Promote\x20:\x20','*_bot\x20is\x20already\x20enabled!_*','reply_message','*_Antibot\x20Currently\x20*','*_Antibot\x20Already\x20set\x20to\x20','\x0a\x0acommand:\x20antiword','../lib','trim','goodbyetext',']:\x20','\x20warn\x20(warn\x20&\x20delete\x20links)\x0a','info','\x20|\x20bad,words','status','Enabled','361732dLtZQf','Disabled','warning','deactive','participants','demote','resetwarn','\x0a\x0acommand:\x20lydea(chatbot)','\x0a\x0acommand:\x20act','botenable','\x27\x20badward!_*\x0a*Antiwords\x20are:```','*_Welcome\x20*Disabled\x20in\x20this\x20Group!_*\x20\x0a*_Use\x20on/off\x20to\x20enable/disable\x20welcome_*','*_Anti_Link\x20set\x20to\x20warn\x20and\x20delete\x20links!_*','antitag\x20on/off_*','blockJid','\x20Can\x27t\x20kick\x20user\x20in\x20antifake\x0a❲❒❳\x20GROUP:\x20','toString','mute','*Auto\x20unmute\x20deleted\x20successfully.*','*_Please\x20Provide\x20Valid\x20Instruction_*\x0a*_Use\x20on/off\x20to\x20enable/disable_*','discord-mongoose-economy/models/economy','\x0a\x0acommand:\x20dunmute',',\x20Blocking\x20you!_*\x0a*_Because\x20Your\x20warn\x20limit\x20exceed!_*','antifake\x2092_*','chatbot','134255sOxHhD','reset','Detect\x20Promote/Demote\x20Users\x20And\x20Send\x20Alerts\x20in\x20Chat\x20','Disabled\x20in\x20Chat','Please\x20provide\x20correct\x20form.\x0aEg:\x20','activates\x20and\x20deactivates\x20onlyadmin.','amute','\x20--\x20','list',']&msg=[','chat','tagging\x20all\x20members!','\x0a\x0a\x20\x20❲❒❳\x20*User:*\x20_@user_\x0a❲❒❳\x20*Position:*\x20_Admin\x20->\x20Member_\x20@pp\x0a\x20\x20❲❒❳\x20*Total\x20Members:*\x20_@count_Members_\x0a❲❒❳\x20*Group\x20Name:*\x20@gname\x0a\x20\x20\x0a\x0a','setbye','log','𝗗𝗲𝘁𝗲𝗰𝘁𝘀\x20𝗽𝗿𝗼𝗺𝗼𝘁𝗲/𝗱𝗲𝗺𝗼𝘁𝗲\x20𝗮𝗻𝗱\x20𝘀𝗲𝗻𝗱𝘀\x20𝗮𝗹𝗲𝗿𝘁.\x20','*Promote/Demote\x20Alerts\x20Already\x20Enabled\x20In\x20Current\x20Chat!*','\x0a\x0acommand:\x20bot','*Welcome\x20message\x20disabled!!*','kick','*\x0a┝─────────────◆\x0a','admin','<\x20action\x20|\x20words\x20>','*disabled\x20Economy\x20in\x20current\x20chat.*','1123944HUNbzV','\x20warning!!_*\x0a*_Tagging\x20all\x20members\x20is\x20not\x20allowed!_*','global','\x20succesfully\x20set\x20to\x20kick\x20msg\x20senders!_*\x0a*_Now\x20only\x20admins\x20allow\x20to\x20send\x20msg\x20in\x20group_*','getName','\x5c$&','\x20in\x20this\x20Group!_*\x0a*_Use\x20warn/kick/off\x20to\x20enable/disable\x20Antibot_*','*Deleting\x20your\x20message\x20from\x20chat!*\x0a','*_Economy\x20enabled\x20in\x20current\x20chat.!_*','isBotAdmin','some','*Welcome\x20:*\x20','kic','\x0a\x0acommand:\x20deact','\x27\x20is\x20not\x20a\x20bot\x20command,\x20Provide\x20valid\x20command_*','setgoodbye','SmdOfficial','false,','*Anti_Word\x20Already\x20Disabled\x20In\x20Current\x20Chat!*','2109840RCfEmx','*[ANTIFAKE\x20START]\x20@User\x20kicked\x20automaticaly!*\x20@pp','isCreator','*_Successfully\x20done,\x20Group\x20auto\x20mute\x20at\x20','*_Enabled\x20antilink\x20in\x20current\x20chat.!_*','add','text','antiword','padStart','\x20was\x20already\x20enabled.*','*Anti_Promote\x20Already\x20Enabled\x20In\x20Current\x20Chat!*','disablecmds','*Goodbye\x20message\x20disabled!!*','senderName','moderation','*_Provide\x20admin\x20role\x20to\x20kick\x20Message\x20Senders_*\x0a*Or\x20_Disable\x20onlyadmin(on/off)\x20in\x20currentchat_*','\x0a\x0acommand:\x20antifake','119526qxJLPp','*User\x20is\x20free\x20as\x20a\x20bird\x20now!*\x0a*All\x20warns\x20has\x20been\x20deleted!*','*Uhh\x20Dear,\x20Provided\x20cmd\x20already\x20in\x20disable\x20cmds*','\x0a\x0acommand:\x20onlyadmin','*_User\x20didn\x27t\x20have\x20any\x20warning\x20yet!!_*','words','\x20<\x20USER\x20>','*Anti_Demote\x20Already\x20Disabled\x20In\x20Current\x20Chat!*','disabled','bot_','groupParticipantsUpdate','block','true','*_Economy\x20was\x20alredy\x20enabled.!_*','unmute','*_Successfully\x20disabled\x20bot_*','5jMxybA','metadata','Delete\x20unmute\x20from\x20group.','[MESSAGE\x20IN\x20PRIVATE]\x20From\x20=>','axios','cnt','*\x0a│\x20*[TOTAL\x20WARNING]\x20:\x20','*Anti_Promote\x20Disable\x20Succesfully!*','*Goodbye\x20Message\x20:*\x20','get','activate','*Current\x20Mode:*\x20_','Error\x20From\x20Goodbye\x20:\x20','updateOne','*_Hey\x20@','caption','reply','*_Bot\x20Succesfully\x20Enabled!_*','general','act','onlyadmin','disable','aunmute','```','delete\x20\x0alinks\x20from\x20this\x20Chat','misc','false','❌\x20Please\x20provide\x20me\x20term\x20like\x20like\x0a1-events\x0a2-antilink\x0a3-nsfw\x0a4-bot\x0a5-economy','*Anti_Demote\x20Enable\x20Succesfully!\x20_No\x20One\x20Demote\x20Here\x20Now_.*','*There\x27s\x20no\x20auto\x20mute\x20set\x20in\x20group.*','body','\x0a\x0aCommand:\x20chatwarn','\x0a\x0acommand:\x20disable','mentionedJid','checkwarn','*_[LINK\x20DETECTED]\x20Hey\x20@','*Uhh\x20Dear,\x20Please\x20use\x20between\x20\x22On\x22\x20And\x20\x22Off\x22.*\x20\x0a*_To\x20get\x20And\x20Stop\x20Promote/Demote\x20Alerts_*','antifake','\x0a\x0acommand:\x20antidemote','\x20delete\x20|\x20hot,badas\x0a```\x20\x0a\x0a\x0a\x20','!_*\x0a*_Use\x20On/Off/all\x20to\x20enable/disable\x20','PRIVATE','*Note\x20:\x20_I\x27m\x20Not\x20Admin\x20Here,\x20So\x20I\x20Can\x27t\x20Demote\x20Someone\x20while\x20Anti_Promote\x20Activated_*','\x20warning,\x20Due\x20To\x20Antibot!_*','reactionMessage','\x20as\x20admin\x20to\x20','*Provide\x20cmd\x20name\x20to\x20disable\x20in\x20group*\x0a*Ex\x20','Detects\x20Promote\x20and\x20Automaticaly\x20demote\x20promoted\x20person.','*_Goodbye\x20already\x20disabled\x20in\x20current\x20group!!_*','enable\x20tag(if\x20\x27tag\x27\x20cmd\x20disabled)/all(reset\x20disables)*','filter','sets\x20auto\x20mute\x20time\x20in\x20group.','\x20succesfully\x20disable\x20in\x20group!_*\x0a*_Now\x20everyone\x20send\x20message\x20in\x20group_*','*_Goodbye\x20already\x20enabled\x20in\x20current\x20group!!_*','\x0a[USER]:','Error\x20From\x20Welcome\x20:\x20','*_Anti_Word\x20status\x20cleard!_*','*Uhh\x20Dear,\x20Please\x20Toggle\x20between\x20\x22On\x22\x20And\x20\x22Off\x22.*\x20\x0a*_To\x20Enable\x20&\x20Disable\x20Stop\x20Demoting\x20Peoples!_*','*_Antibot\x20Succesfully\x20Disable\x20in\x20group!_*','antilink\x20kick/delete/warn/off_*','detect\x20tagall\x20in\x20group\x20chat,\x20then\x20kick\x20them','bot','new','┝──\x20*WARNING\x20','antilink','*Uhh\x20Dear,\x20Please\x20Toggle\x20between\x20\x22On\x22\x20And\x20\x22Off\x22.*\x20\x0a*_To\x20Stop\x20Promoting\x20Peoples\x20in\x20Chat_*','botAdmin','--Empty\x20Yet--','amute\x2022:00','warn','*_Anti_tag\x20*','*_\x27','findOne','\x0a│\x20\x20*CHAT:*\x20','listwarn','*Anti_Word\x20Disable\x20Succesfully!*','315KmUXMw','*_Onlyadmin\x20Already\x20Enabled\x20in\x20Current\x20Chat_*','*Auto_Mute\x20*','\x0a\x20*Auto\x20mute\x20status\x20set\x20at\x20:\x20','enabled','\x0a\x0acommand:\x20antibot','antipromote','\x0a\x0acommand:\x20setgoodbye','\x0a\x0aCommand:\x20warn\x20','action','http://api.brainshop.ai/get?bid=175685&key=Pg8Wu8mrDQjfr0uv&uid=[','9AwyPEj','economy','isAdmin','find','sets\x20goodbye\x20message\x20in\x20specific\x20group.','*_Anti_Link\x20already\x20disabled\x20in\x20current\x20Chat!!_*','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x0a\x20\x20❲❒❳\x20*User:*\x20_@user_\x0a❲❒❳\x20*Position:*\x20_Member\x20->\x20Admin_\x20@pp\x0a\x20\x20❲❒❳\x20*Total\x20Members:*\x20_@count_Members_\x0a❲❒❳\x20*Group\x20Name:*\x20@gname\x0a\x0a\x0a','*Uhh\x20dear,\x20Please\x20follow\x20instructions!!*\x0a\x0a','Error\x20From\x20Bad\x20Words\x20:\x20','Please\x20provide\x20me\x20term\x20like.\x0a1-events\x0a2-antilink\x0a3-nsfw\x0a4-bot\x0a5-economy','*_bot\x20is\x20already\x20disabled!_*','antidemote','\x20warning\x20added,\x20Don\x27t\x20spam!_*','*Anti_Fake\x20Disable\x20Succesfully!*','date','*_NSFW\x20is\x20already\x20enabled!_*','activates\x20and\x20deactivates\x20bot.\x0ause\x20buttons\x20to\x20toggle.','240ArHACV','botNumber','events','Please\x20provide\x20me\x20term\x20like.\x0a1-events\x0a2-antilink\x0a3-nsfw\x0a4-economy\x0a5-bot','*_\x22','\x20for\x20current\x20group*','*_Uhh\x20Please,\x20Provide\x20Valid\x20Instruction_*\x0a*Eg:\x20_','goodbye','warncount','*_Provide\x20Valid\x20Instruction_*\x0a*Ex:\x20_','fs-extra','*Successfully\x20disabled\x20NSFW*','deact','remove','*_User\x20@','Error\x20From\x20Antilinks\x20:\x20','suhail','startsWith','\x20|\x20','antitag','*_[LINK\x20DETECTED]!_*','*_Anti_Link\x20Succesfully\x20set\x20to\x20kick\x20link\x20senders!_*','includes','GROUP','https://','*_Antifake\x20','isGroup','\x0a\x0acommand:\x20amute','*_Anti_tag\x20already\x20enabled\x20in\x20current\x20Chat!!_*','welcometext','\x0a\x0acommand:\x20antipromote','```\x20*','antibot','\x20delete\x20(Delete\x20Links\x20Only)\x0a','*Deleteing\x20message,while\x20onlyadmin\x20activated!!*\x20','\x0a❲❒❳\x20ERROR:\x20','chat.whatsapp.com','commands','*_Antilink\x20','*_Uhh\x20Please,\x20Provide\x20Admin\x20Role\x20First_*','\x20*[SOMEONE\x20DEMOTE\x20HERE]*\x0a\x20\x20','enable\x20a\x20cmd\x20in\x20Group.!','*_Link\x20Detected..\x20Deletion\x20Done!_*','*_Antilink\x20was\x20alredy\x20disabled_*','Inapropriate\x20Behaviour','Switches\x20for\x20varios\x20works.','pdm','delete','*Antiword\x20Currently\x20*','\x20was\x20already\x20enabled\x20to\x20all\x20chat!.*','*_[TAGALL\x20DETECTED]\x20Can\x27t\x20do\x20anything,\x20without\x20getting\x20admin\x20role!_*','error','\x20bots!_*','enable','*\x20──\x0a│\x20\x20*DATE:*\x20','antilink_values','\x20detected\x20sending\x20a\x20link.\x0aPromote\x20','*_Goodbye\x20*Disabled\x20in\x20this\x20Group!_*\x20\x0a*_Use\x20on/off\x20to\x20enable/disable\x20goodbye_*','\x22\x20Succesfully\x20added\x20in\x20disable\x20cmds_*','groupSettingUpdate','user','cmds','Error\x20From\x20Demote\x20:\x20','activates\x20and\x20deactivates\x20chatbot.\x0ause\x20buttons\x20to\x20toggle.','*_Anti_tag\x20succesfully\x20enabled\x20in\x20chat!_*\x0a*_Now\x20bot\x20kick\x20user\x20who\x20tag\x20all\x20members!_*','*_Anti_Link\x20Disabled\x20Succesfully!_*','yes','\x0a\x0acommand:\x20setwelcome','\x20*[SOMEONE\x20PROMOTE\x20HERE]*\x0a','\x0a╭─────────────◆\x0a│\x20*[ID]\x20:\x20','checkBot','alias','\x0a\x0acommand:\x20enable','\x20kick\x20(Delete\x20Links\x20&\x20Kick\x20Senders)\x0a','*_Anti_Link\x20Succesfully\x20set\x20to\x20delete\x20links\x20from\x20chat!_*','create\x20paste\x20of\x20text.','35544jxIXDA','\x20deactivated\x20successfully.*','\x20reset\x0a\x20\x20','isBot','\x22!*\x0a*_Now\x20People\x20Joined\x20Group\x20Who\x27s\x20Number\x20Start\x20With\x20','*_Bot\x20Disabled\x20Succesfully!_*','*Auto\x20mute\x20deleted\x20successfully.*','*Please\x20provide\x20disabled\x20cmd\x20name\x20to\x20enable\x20it*\x0a*Ex\x20'];_0x5029=function(){return _0x4bb937;};return _0x5029();}smd({'on':_0x204412(0x146)},async(_0x39d1ac,_0x22b59e,{botNumber:_0x1c3b73,isCreator:_0x3447c7,budy:_0x3338f4,body:_0x43b02e,icmd:_0x22254d})=>{const _0x1216e5=_0x204412;try{if(Config['MsgsInLog']==='true')console[_0x1216e5(0x198)](''+(_0x39d1ac[_0x1216e5(0xd4)]?_0x1216e5(0x120)+_0x39d1ac['metadata'][_0x1216e5(0x135)]+_0x1216e5(0x20c):_0x1216e5(0x1d9))+('\x20'+_0x39d1ac[_0x1216e5(0x1c2)]+'\x20'+_0x39d1ac[_0x1216e5(0x13c)]+'\x0a['+_0x39d1ac['mtype'][_0x1216e5(0x12f)]()+_0x1216e5(0x16b)+_0x39d1ac[_0x1216e5(0x1f4)]+'\x0a==============\x20[SMD]\x20================='));let _0x5305a4=await groupdb[_0x1216e5(0x21e)]({'id':_0x39d1ac[_0x1216e5(0x194)]})||![],_0x51e325=![];try{if(!global[_0x1216e5(0x1b2)]&&global['SmdOfficial']!==_0x1216e5(0xfc))return;if(_0x5305a4&&_0x5305a4[_0x1216e5(0x251)]==_0x1216e5(0x1d2)&&!_0x39d1ac[_0x1216e5(0x100)]()&&_0x39d1ac['mtype']!=='reactionMessage'&&_0x5305a4[_0x1216e5(0x17a)]==_0x1216e5(0x1d2)){const _0x3c184c=await haveEqualMembers(_0x39d1ac['metadata'][_0x1216e5(0x175)][_0x1216e5(0x139)](_0x18479c=>_0x18479c['id']),_0x39d1ac['mentionedJid']);if(_0x3c184c&&_0x39d1ac['isBotAdmin']){let _0xf11499={'reason':_0x1216e5(0x195),'chat':_0x39d1ac['metadata']?.[_0x1216e5(0x135)]||_0x1216e5(0xd1),'warnedby':tlang()[_0x1216e5(0x14c)],'date':_0x39d1ac[_0x1216e5(0x23b)]};_0x51e325=await warn[_0x1216e5(0x15c)](_0x39d1ac['sender'],_0x39d1ac[_0x1216e5(0x194)],_0xf11499),await _0x39d1ac[_0x1216e5(0x1e6)](_0x1216e5(0x148)+_0x39d1ac[_0x1216e5(0x13c)]+_0x1216e5(0x1a3),{'mentions':[_0x39d1ac['sender']]}),await _0x39d1ac[_0x1216e5(0xe9)]();}else _0x3c184c&&!_0x39d1ac[_0x1216e5(0x1ab)]&&await _0x39d1ac[_0x1216e5(0x1e6)](_0x1216e5(0xec),{'mentions':[_0x39d1ac[_0x1216e5(0x147)]]});}if(_0x5305a4&&_0x39d1ac[_0x1216e5(0xd4)]&&!_0x39d1ac[_0x1216e5(0x22f)]&&!_0x3447c7&&_0x39d1ac['mtype']!==_0x1216e5(0x202)&&_0x5305a4[_0x1216e5(0x17a)]==_0x1216e5(0x1d2)){if(_0x5305a4[_0x1216e5(0xda)]&&_0x5305a4['antibot']!==_0x1216e5(0x1f0)&&_0x39d1ac[_0x1216e5(0x109)]&&!_0x39d1ac[_0x1216e5(0x100)](_0x39d1ac[_0x1216e5(0x147)])){if(_0x39d1ac[_0x1216e5(0x1ab)]){var _0x5b1bba='*_Bot\x20user\x20not\x20allowed,\x20please\x20make\x20it\x20private!_*';if(_0x5305a4[_0x1216e5(0xda)]===_0x1216e5(0x21b)){let _0x21abc6={'reason':_0x1216e5(0x122),'chat':_0x39d1ac[_0x1216e5(0x1d7)]?.[_0x1216e5(0x135)]||_0x1216e5(0xd1),'date':_0x39d1ac[_0x1216e5(0x23b)]};_0x51e325=_0x51e325?_0x51e325:await warn['addwarn'](_0x39d1ac[_0x1216e5(0x147)],_0x39d1ac[_0x1216e5(0x194)],_0x21abc6),_0x51e325[_0x1216e5(0x16f)]&&(_0x5b1bba=_0x1216e5(0x1e4)+_0x39d1ac['senderNum']+_0x1216e5(0x201));}else{if(_0x5305a4[_0x1216e5(0xda)]===_0x1216e5(0x19d))try{sleep(0x3e8),await _0x39d1ac[_0x1216e5(0x213)]['groupParticipantsUpdate'](_0x39d1ac[_0x1216e5(0x194)],[_0x39d1ac[_0x1216e5(0x147)]],_0x1216e5(0x24b)),_0x5b1bba=_0x1216e5(0x24c)+_0x39d1ac[_0x1216e5(0x13c)]+'\x20kick\x20Due\x20To\x20Antibot!_*';}catch{}}await _0x39d1ac[_0x1216e5(0xe9)](),await _0x39d1ac[_0x1216e5(0x140)](_0x5b1bba,{'mentions':[_0x39d1ac[_0x1216e5(0x147)]]});}else!_0x39d1ac[_0x1216e5(0x1ab)]&&_0x39d1ac[_0x1216e5(0x109)]&&await _0x39d1ac[_0x1216e5(0x1e6)]('*_Uhh\x20Please,\x20Provide\x20Admin\x20Role\x20To\x20Kick\x20Other\x20Bot_*\x0a*_Or\x20Disable\x20Antibot\x20(On/Off)\x20In\x20Current\x20Group_*');}if(_0x5305a4[_0x1216e5(0x1ea)]&&_0x5305a4[_0x1216e5(0x1ea)]===_0x1216e5(0x1d2)&&SmdOfficial==_0x1216e5(0xfc)){var _0x5b1bba='';if(_0x39d1ac[_0x1216e5(0x1ab)]){let _0x423964={'reason':'Only\x20Admin\x20can\x20Chat!','chat':_0x39d1ac[_0x1216e5(0x1d7)]?.[_0x1216e5(0x135)]||_0x1216e5(0x1ff),'warnedby':tlang()[_0x1216e5(0x14c)],'date':_0x39d1ac[_0x1216e5(0x23b)]};_0x51e325=_0x51e325?_0x51e325:await warn[_0x1216e5(0x15c)](_0x39d1ac['sender'],_0x39d1ac[_0x1216e5(0x194)],_0x423964),_0x51e325[_0x1216e5(0x16f)]&&(_0x5b1bba='*Warns\x20you\x20for\x20chat\x20here!*\x0a'),await _0x39d1ac[_0x1216e5(0xe9)](),sleep(0x5dc),await _0x39d1ac[_0x1216e5(0x140)]('*Hey\x20@'+_0x39d1ac[_0x1216e5(0x13c)]+'*\x20'+_0x5b1bba+_0x1216e5(0xdc),{'mentions':[_0x39d1ac[_0x1216e5(0x147)]]});}else await _0x39d1ac[_0x1216e5(0x140)](_0x1216e5(0x1c4));}if(_0x5305a4[_0x1216e5(0x216)]&&_0x5305a4['antilink']!==_0x1216e5(0x1f0)&&SmdOfficial===_0x1216e5(0xfc)){const _0x2856dd=Config[_0x1216e5(0xf1)]&&Config['antilink_values']!==_0x1216e5(0x115)?Config[_0x1216e5(0xf1)][_0x1216e5(0x12c)](',')[_0x1216e5(0x208)](_0x530f1e=>_0x530f1e[_0x1216e5(0x169)]()!==''):[_0x1216e5(0xd2),_0x1216e5(0xde),'fb.com'];let _0x482cec=_0x43b02e[_0x1216e5(0x15a)]();if(_0x2856dd[_0x1216e5(0x1ac)](_0x3787e7=>_0x482cec[_0x1216e5(0x254)](_0x3787e7))){if(!_0x39d1ac[_0x1216e5(0x1ab)]){let _0x46235f=_0x1216e5(0x15b)+_0x39d1ac[_0x1216e5(0x147)][_0x1216e5(0x12c)]('@')[0x0]+_0x1216e5(0xf2)+Config['botname']+_0x1216e5(0x203)+(_0x5305a4[_0x1216e5(0x216)]===_0x1216e5(0x19d)?'kick\x20\x0alink\x20senders.':_0x1216e5(0x1ee))+'\x20\x0a';await _0x39d1ac[_0x1216e5(0x140)](_0x46235f,{'mentions':[_0x39d1ac['sender']]});}else{if(_0x5305a4['antilink']===_0x1216e5(0xe9))await _0x39d1ac[_0x1216e5(0x140)](_0x1216e5(0xe4)),await _0x39d1ac[_0x1216e5(0xe9)]();else{if(_0x5305a4[_0x1216e5(0x216)]==='warn'||_0x5305a4[_0x1216e5(0x216)]===_0x1216e5(0x1d2)){let _0x144634={'reason':_0x1216e5(0x11e),'chat':_0x39d1ac['metadata']?.[_0x1216e5(0x135)]||_0x1216e5(0x1ff),'warnedby':tlang()[_0x1216e5(0x14c)],'date':_0x39d1ac[_0x1216e5(0x23b)]};_0x51e325=_0x51e325?_0x51e325:await warn[_0x1216e5(0x15c)](_0x39d1ac[_0x1216e5(0x147)],_0x39d1ac['chat'],_0x144634);var _0x5b1bba=_0x51e325[_0x1216e5(0x16f)]?_0x1216e5(0x1f9)+_0x39d1ac[_0x1216e5(0x13c)]+_0x1216e5(0x133):_0x1216e5(0x252);await _0x39d1ac[_0x1216e5(0x1e6)](_0x5b1bba,{'mentions':[_0x39d1ac['sender']]}),await _0x39d1ac[_0x1216e5(0xe9)]();}else{if(_0x5305a4[_0x1216e5(0x216)]===_0x1216e5(0x19d)){await _0x39d1ac[_0x1216e5(0x140)]('*_Link\x20Detected!!_*');try{await _0x39d1ac[_0x1216e5(0xe9)](),sleep(0x5dc);}catch{await _0x39d1ac['send']('*Link\x20Detected*\x0a'+tlang()[_0x1216e5(0x218)]);}}}}}}}}}catch(_0x3a9f8d){console[_0x1216e5(0x198)](_0x1216e5(0x24d),_0x3a9f8d);}var _0xe8d652=_0x5305a4?.[_0x1216e5(0x1bc)]||{'status':'false'};if(_0x22b59e[_0x1216e5(0x13a)]>0x1&&!_0x39d1ac[_0x1216e5(0x109)]&&_0xe8d652&&_0xe8d652[_0x1216e5(0x16f)]!==_0x1216e5(0x1f0)&&_0xe8d652[_0x1216e5(0x1cb)]){var _0x27bcfa=_0xe8d652[_0x1216e5(0x1cb)][_0x1216e5(0x12c)](',')||[];let _0x441ee8=![];_0x27bcfa[_0x1216e5(0x139)](async _0x55e61d=>{const _0x37d66a=_0x1216e5;if(_0x39d1ac[_0x37d66a(0x22f)]||!global[_0x37d66a(0x1b2)]||global['SmdOfficial']!=_0x37d66a(0xfc))return;let _0x48398e=new RegExp('\x5cb'+_0x55e61d?.['trim']()+'\x5cb','ig'),_0x2cdbcc=_0x3338f4['toLowerCase']();if(!_0x441ee8&&_0x55e61d&&_0x48398e[_0x37d66a(0x154)](_0x2cdbcc)){_0x441ee8=!![],await sleep(0x1f4);try{var _0x19d37d='';if(_0xe8d652['status']===_0x37d66a(0x21b)){let _0x3a1b65={'reason':'For\x20using\x20Bad\x20Word','chat':_0x39d1ac[_0x37d66a(0x1d7)]?.['subject']||'PRIVATE','warnedby':tlang()['title'],'date':_0x39d1ac[_0x37d66a(0x23b)]};_0x51e325=_0x51e325?_0x51e325:await warn[_0x37d66a(0x15c)](_0x39d1ac['sender'],_0x39d1ac[_0x37d66a(0x194)],_0x3a1b65),_0x51e325[_0x37d66a(0x16f)]&&(_0x19d37d='\x0a*Warns\x20you\x20for\x20using\x20badWord!!*\x0a');}_0x39d1ac[_0x37d66a(0x1ab)]?(await _0x39d1ac[_0x37d66a(0x140)]('*[BAD\x20WORD\x20DETECTED]\x20Hey\x20@'+_0x39d1ac[_0x37d66a(0x13c)]+'*\x20'+_0x19d37d+_0x37d66a(0x1a9),{'mentions':[_0x39d1ac['sender']]},_0x37d66a(0x24e),_0x39d1ac),await _0x39d1ac['delete']()):await _0x39d1ac['reply']('*_[BAD\x20WORD\x20DETECTED]\x20provide\x20admin\x20to\x20take\x20action!_*',{'mentions':[_0x39d1ac['sender']]});}catch(_0x2e1cd0){console[_0x37d66a(0x198)](_0x37d66a(0x235),_0x2e1cd0);}}});}if(_0x51e325){let _0x55d8b7=parseInt(Config[_0x1216e5(0x246)])||0x3;_0x51e325[_0x1216e5(0x173)]>=_0x55d8b7&&(_0x39d1ac['isGroup']?_0x39d1ac['isBotAdmin']&&(await _0x39d1ac[_0x1216e5(0x140)](_0x1216e5(0x1e4)+_0x39d1ac['senderNum']+'\x20Kicking\x20you\x20from\x20group!_*\x0a*_Because\x20Your\x20warn\x20limit\x20exceed!_*',{'mentions':[_0x39d1ac[_0x1216e5(0x147)]]}),await _0x39d1ac[_0x1216e5(0x213)]['groupParticipantsUpdate'](_0x39d1ac[_0x1216e5(0x194)],[_0x39d1ac[_0x1216e5(0x147)]],_0x1216e5(0x24b))):(await _0x39d1ac['send'](_0x1216e5(0x1e4)+_0x39d1ac[_0x1216e5(0x13c)]+'\x20Blocking\x20you!_*\x0a*_Because\x20Your\x20warn\x20limit\x20exceed!_*',{'mentions':[_0x39d1ac['sender']]}),await _0x39d1ac[_0x1216e5(0x213)][_0x1216e5(0x121)](_0x39d1ac[_0x1216e5(0x147)],'block')));}try{if(!global[_0x1216e5(0x1b2)]||_0x39d1ac['mtype']!==_0x1216e5(0x202))return;let _0x1c5335=await groupdb[_0x1216e5(0x21e)]({'id':_0x39d1ac[_0x1216e5(0x194)]})||{'chatbot':_0x1216e5(0x1f0)};!bott||chatbotCount>=0xa?bott=await bot_[_0x1216e5(0x21e)]({'id':_0x1216e5(0x1cf)+_0x39d1ac[_0x1216e5(0xf6)]})||{'chatbot':_0x1216e5(0x1f0)}:chatbotCount++;let _0x180c43=bott&&bott[_0x1216e5(0x189)]&&bott[_0x1216e5(0x189)]==_0x1216e5(0x1d2)?_0x1216e5(0x1d2):_0x1c5335['chatbot']||_0x1216e5(0x1f0);if(_0x180c43===_0x1216e5(0x1d2)&&!_0x22254d&&!_0x39d1ac[_0x1216e5(0x109)]&&_0x39d1ac[_0x1216e5(0x1bb)]){let _0x274bb7=!_0x39d1ac[_0x1216e5(0xd4)]?_0x39d1ac['user']:_0x39d1ac['quoted']?_0x39d1ac['quoted'][_0x1216e5(0x147)]:_0x39d1ac[_0x1216e5(0x1f7)][0x0]||![];if(_0x39d1ac[_0x1216e5(0xd4)]&&_0x274bb7&&!_0x39d1ac[_0x1216e5(0x100)](_0x274bb7))return;let {data:_0x5d0149}=await axios[_0x1216e5(0x1df)](_0x1216e5(0x22c)+_0x39d1ac[_0x1216e5(0x13c)]+_0x1216e5(0x193)+_0x3338f4+']');_0x5d0149&&_0x5d0149[_0x1216e5(0x1db)]?_0x39d1ac[_0x1216e5(0x140)](_0x5d0149[_0x1216e5(0x1db)],{},_0x1216e5(0x24e),_0x39d1ac):'';}}catch(_0x4b3818){console['log'](_0x1216e5(0x116),_0x4b3818);}}catch(_0x8d39a9){console[_0x1216e5(0x198)]('Group\x20Settings\x20error\x20in\x20command.main()\x20\x0a',_0x8d39a9);}});let users={},user_warns={};smd({'group':_0x204412(0x1ba)},async(_0xa9045d,{Void:_0xc8824e})=>{const _0x5d5400=_0x204412;try{let _0x23eb4d=await groupdb[_0x5d5400(0x21e)]({'id':_0xa9045d[_0x5d5400(0x194)]});if(!_0x23eb4d||!_0xa9045d[_0x5d5400(0xd4)]||_0x23eb4d[_0x5d5400(0x17a)]!==_0x5d5400(0x1d2)||_0xa9045d[_0x5d5400(0x17f)]||_0xa9045d[_0x5d5400(0x128)])return;let _0x2ccb00=_0x23eb4d&&_0x23eb4d[_0x5d5400(0x159)]?_0x23eb4d[_0x5d5400(0x159)]:_0x5d5400(0x1f0),_0x156045=_0x23eb4d&&_0x23eb4d['antifake']?_0x23eb4d[_0x5d5400(0x1fb)][_0x5d5400(0x15a)]():_0x5d5400(0x1f0),_0x315fd6=_0x156045[_0x5d5400(0x12c)](',');const _0x1879a4=_0x315fd6['some'](_0x1887ff=>_0xa9045d[_0x5d5400(0xf6)]['startsWith'](_0x1887ff));if(_0x156045!==_0x5d5400(0x1f0)&&!_0x1879a4&&!_0xa9045d['isCreator']){if(_0xa9045d[_0x5d5400(0x1ab)])try{return await _0xa9045d['kick'](),await sendWelcome(_0xa9045d,_0x5d5400(0x1b6));}catch(_0x411703){await _0xa9045d[_0x5d5400(0xed)](_0x5d5400(0x180)+_0xa9045d[_0x5d5400(0x1d7)][_0x5d5400(0x135)]+_0x5d5400(0xdd)+_0x411703+'\x0a',_0x411703,![]);}else await _0xa9045d[_0x5d5400(0x140)]('*[ANTI_FAKE\x20ERROR]\x20Need\x20admin\x20role\x20to\x20kick\x20fake\x20users!!*');}else _0x2ccb00===_0x5d5400(0x1d2)&&await sendWelcome(_0xa9045d,_0x23eb4d[_0x5d5400(0xd7)]);}catch(_0x2b9374){console[_0x5d5400(0x198)](_0x5d5400(0x20d),_0x2b9374);}}),smd({'group':'remove'},async(_0x2f100a,{Void:_0x29372e})=>{const _0x2227e6=_0x204412;try{let _0x433c18=await groupdb[_0x2227e6(0x21e)]({'id':_0x2f100a[_0x2227e6(0x194)]})||![];if(!_0x2f100a||!_0x433c18||!_0x2f100a['isGroup']||_0x433c18[_0x2227e6(0x17a)]!=='true'||_0x2f100a[_0x2227e6(0x17f)]||_0x2f100a['fromMe'])return;let _0x53ce44=_0x433c18&&_0x433c18['goodbye']?_0x433c18[_0x2227e6(0x245)]:'false';_0x53ce44===_0x2227e6(0x1d2)&&await sendWelcome(_0x2f100a,_0x433c18[_0x2227e6(0x16a)]);}catch(_0x1584f8){console['log'](_0x2227e6(0x1e2),_0x1584f8);}}),smd({'group':'promote'},async(_0x5dad3d,{Void:_0x447115})=>{const _0x21df96=_0x204412;try{let _0x5d4655=await groupdb[_0x21df96(0x21e)]({'id':_0x5dad3d['chat']})||![];if(!_0x5d4655||!_0x5dad3d[_0x21df96(0xd4)]||_0x5d4655[_0x21df96(0x17a)]!==_0x21df96(0x1d2)||_0x5dad3d['blockJid'])return;!user_warns[_0x5dad3d[_0x21df96(0x147)]]?user_warns[_0x5dad3d[_0x21df96(0x147)]]={[_0x5dad3d['action']]:0x1}:user_warns[_0x5dad3d[_0x21df96(0x147)]][_0x5dad3d[_0x21df96(0x22b)]]++;let _0x468228;if(_0x5d4655[_0x21df96(0x228)]==_0x21df96(0x1d2)&&!_0x5dad3d['isCreator']){_0x468228=_0x5dad3d['isBotAdmin']?![]:!![];if(users[_0x5dad3d[_0x21df96(0x147)]]&&users[_0x5dad3d[_0x21df96(0x147)]][_0x21df96(0x161)]===_0x21df96(0x238)){delete users[_0x5dad3d[_0x21df96(0x147)]];return;}if(_0x5dad3d[_0x21df96(0x1ab)])try{await _0x5dad3d[_0x21df96(0x176)](),users[_0x5dad3d[_0x21df96(0x147)]]={'previous_Action':'antipromote'};if(user_warns[_0x5dad3d[_0x21df96(0x147)]][_0x5dad3d['action']]>0x2)return;return await sendWelcome(_0x5dad3d,'*[ANTIPROMOTE\x20START]\x20@User\x20Demoted\x20Automatically!*\x20@pp\x20');}catch(_0x23d89b){await _0x5dad3d[_0x21df96(0xed)]('\x20Can\x27t\x20demote\x20user\x20in\x20antipromote\x0a❲❒❳\x20GROUP:\x20'+_0x5dad3d[_0x21df96(0x1d7)][_0x21df96(0x135)]+_0x21df96(0xdd)+_0x23d89b+'\x0a',_0x23d89b,![]);}}if(_0x5d4655['pdm']=='true'||_0x468228){if(user_warns[_0x5dad3d['sender']][_0x5dad3d[_0x21df96(0x22b)]]>0x2)return;var _0x34818c=_0x21df96(0xfe)+(_0x468228?_0x21df96(0x200):'')+_0x21df96(0x233)+Config[_0x21df96(0x1e5)];return await sendWelcome(_0x5dad3d,_0x34818c);}}catch(_0x39d153){console[_0x21df96(0x198)](_0x21df96(0x162),_0x39d153);}}),smd({'group':_0x204412(0x176)},async(_0x28f5ec,{Void:_0x20bfe6})=>{const _0xc21df4=_0x204412;try{let _0x47cda5=await groupdb['findOne']({'id':_0x28f5ec[_0xc21df4(0x194)]})||![];if(!_0x47cda5||!_0x28f5ec['isGroup']||_0x47cda5[_0xc21df4(0x17a)]!=='true'||_0x28f5ec[_0xc21df4(0x17f)])return;!user_warns[_0x28f5ec[_0xc21df4(0x147)]]?user_warns[_0x28f5ec[_0xc21df4(0x147)]]={[_0x28f5ec[_0xc21df4(0x22b)]]:0x1}:user_warns[_0x28f5ec[_0xc21df4(0x147)]][_0x28f5ec[_0xc21df4(0x22b)]]++;let _0x48cf93;if(_0x47cda5[_0xc21df4(0x238)]==_0xc21df4(0x1d2)&&!_0x28f5ec[_0xc21df4(0x1b7)]){_0x48cf93=_0x28f5ec['isBotAdmin']?![]:!![];if(users[_0x28f5ec['sender']]&&users[_0x28f5ec[_0xc21df4(0x147)]]['previous_Action']==='antipromote'){delete users[_0x28f5ec['sender']];return;}if(_0x28f5ec['isBotAdmin'])try{await _0x28f5ec['promote'](),users[_0x28f5ec[_0xc21df4(0x147)]]={'previous_Action':_0xc21df4(0x238)};if(user_warns[_0x28f5ec[_0xc21df4(0x147)]][_0x28f5ec[_0xc21df4(0x22b)]]>0x2)return;return await sendWelcome(_0x28f5ec,'*[ANTIPROMOTE\x20START]\x20User\x20promote\x20automatically!*\x20@pp\x20');}catch(_0x298984){await _0x28f5ec[_0xc21df4(0xed)](_0xc21df4(0x15e)+_0x28f5ec[_0xc21df4(0x1d7)][_0xc21df4(0x135)]+_0xc21df4(0xdd)+_0x298984+'\x0a',_0x298984,![]);}}if(_0x47cda5[_0xc21df4(0xe8)]==_0xc21df4(0x1d2)||_0x48cf93){if(user_warns[_0x28f5ec['sender']][_0x28f5ec['action']]>0x2)return;var _0x38c006=_0xc21df4(0xe2)+(_0x48cf93?'*Note\x20:\x20_I\x27m\x20Not\x20Admin\x20Here,\x20So\x20I\x20Can\x27t\x20promote\x20Someone\x20while\x20Anti_Demote\x20Activated_*':'')+_0xc21df4(0x196)+Config[_0xc21df4(0x1e5)];return await sendWelcome(_0x28f5ec,_0x38c006);}}catch(_0x2cb5e6){console['log'](_0xc21df4(0xf8),_0x2cb5e6);}});
const {
  groupdb,
  userdb,
  bot_,
  smd,
  jsonformat,
  sendWelcome,
  botpic,
  TelegraPh,
  RandomXP,
  Config,
  tlang,
  warndb,
  sleep,
  getAdmin,
  getBuffer,
  prefix
} = require("../lib");
const fs = require("fs-extra");
const axios = require("axios");
const astro_patch = require("../lib/plugins");
const {
  count
} = require("discord-mongoose-economy/models/economy");
smd({
  pattern: "lydea",
  alias: ["chatbot"],
  desc: "activates and deactivates chatbot.\nuse buttons to toggle.",
  fromMe: true,
  category: "misc",
  filename: __filename
}, async (_0x1a5020, _0x1f22c3, {
  cmdName: _0x431455
}) => {
  try {
    let _0x974aae = _0x1f22c3.split(" ")[0].toLowerCase().trim();
    let _0x44755b = (await groupdb.findOne({
      id: _0x1a5020.chat
    })) || (await groupdb.new({
      id: _0x1a5020.chat
    }));
    let _0x4924e5 = (await bot_.findOne({
      id: "bot_" + _0x1a5020.user
    })) || (await groupdb.new({
      id: "bot_" + _0x1a5020.user
    })) || {
      chatbot: "false"
    };
    if (_0x974aae == "all" || _0x974aae === "global") {
      if (_0x4924e5.chatbot == "true") {
        return await _0x1a5020.send("*" + _0x431455 + " was already enabled to all chat!.*");
      }
      await bot_.updateOne({
        id: "bot_" + _0x1a5020.user
      }, {
        chatbot: "true"
      });
      return await _0x1a5020.send("*" + _0x431455 + " successfully enabled to all chats!.*");
    } else if (_0x974aae.startsWith("on") || _0x974aae.startsWith("act") || _0x974aae.startsWith("enable")) {
      if (_0x44755b.chatbot == "true" || _0x4924e5.chatbot == "true") {
        return await _0x1a5020.send("*" + _0x431455 + " was already enabled.*");
      }
      await groupdb.updateOne({
        id: _0x1a5020.chat
      }, {
        chatbot: "true"
      });
      return await _0x1a5020.send("*" + _0x431455 + " activated successfully.*");
    } else if (_0x974aae.startsWith("off") || _0x974aae.startsWith("deact") || _0x974aae.startsWith("disable")) {
      if (_0x44755b.chatbot == "false" && _0x4924e5.chatbot == "false") {
        return await _0x1a5020.send("*" + _0x431455 + " was already disabled.*");
      }
      await bot_.updateOne({
        id: "bot_" + _0x1a5020.user
      }, {
        chatbot: "false"
      });
      await groupdb.updateOne({
        id: _0x1a5020.chat
      }, {
        chatbot: "false"
      });
      return await _0x1a5020.send("*" + _0x431455 + " deactivated successfully.*");
    } else {
      return await _0x1a5020.reply("*_" + _0x431455 + " Currently *" + (_0x4924e5.chatbot == "true" ? "Enabled in 'all' Chats" : _0x44755b.chatbot == "true" ? "Enabled in Chat" : "Disabled in Chat") + "!_*\n*_Use On/Off/all to enable/disable " + _0x431455 + "_*");
    }
  } catch (_0x1a9758) {
    _0x1a5020.error(_0x1a9758 + "\n\ncommand: lydea(chatbot)", _0x1a9758);
  }
});
let warn = {};
warn.addwarn = async (_0x535f84, _0x1e53d3, _0x445500 = {}) => {
  try {
    let _0x285cd0 = (await userdb.findOne({
      id: _0x535f84
    })) || (await userdb.new({
      id: _0x535f84
    }));
    let _0x84b1f8 = _0x285cd0.warn || {};
    if (!_0x84b1f8[_0x1e53d3]) {
      _0x84b1f8[_0x1e53d3] = [];
    }
    var _0x1a434e = {
      chat: "PRIVATE",
      reason: "Inapropriate Behaviour",
      date: new Date(),
      warnedby: tlang().title,
      ..._0x445500
    };
    _0x84b1f8[_0x1e53d3].push(_0x1a434e);
    _0x285cd0 = await userdb.updateOne({
      id: _0x535f84
    }, {
      warn: _0x84b1f8
    });
    return {
      status: true,
      warning: _0x84b1f8[_0x1e53d3].length,
      user: _0x285cd0
    };
  } catch (_0x5aeabd) {
    return {
      status: false,
      warning: 0,
      user: {},
      error: _0x5aeabd
    };
  }
};
smd({
  pattern: "checkwarn",
  alias: ["listwarn", "chatwarn", "allwarn"],
  desc: "create paste of text.",
  category: "user",
  filename: __filename
}, async (_0x598674, _0x1c4990) => {
  try {
    let _0x4604cb = "";
    let _0x581b05 = _0x598674.sender;
    if (_0x598674.isCreator) {
      _0x581b05 = _0x598674.reply_message ? _0x598674.reply_message.sender : _0x598674.mentionedJid[0] ? _0x598674.mentionedJid[0] : _0x581b05;
    }
    let _0x31a5b0 = (await userdb.findOne({
      id: _0x581b05
    })) || (await userdb.new({
      id: _0x581b05
    }));
    let _0x40e695 = _0x31a5b0.warn || false;
    let _0x49f508 = {};
    if (_0x40e695 && _0x1c4990 === "all") {
      _0x40e695 = _0x31a5b0.warn;
    } else if (_0x40e695 && _0x40e695[_0x598674.chat]) {
      _0x49f508[_0x598674.chat] = [..._0x40e695[_0x598674.chat]];
      _0x40e695 = _0x49f508;
    } else {
      _0x40e695 = false;
    }
    let _0xfcc9b7 = _0x1c4990 === "all" ? true : !_0x40e695[_0x598674.chat];
    if (!_0x31a5b0 || !_0x40e695 || !_0xfcc9b7) {
      return await _0x598674.send("*_User didn't have any warning yet!!_*");
    }
    console.log("allwarn : ", _0x40e695);
    for (const _0x15bd99 in _0x40e695) {
      let _0x52d2b3 = _0x40e695[_0x15bd99];
      _0x4604cb += "\n╭─────────────◆\n│ *[ID] : " + (_0x15bd99.includes("@") ? (await _0x598674.bot.getName(_0x15bd99)) || _0x15bd99 : _0x15bd99) + "*\n│ *[TOTAL WARNING] : " + _0x40e695[_0x15bd99].length + "*\n┝─────────────◆\n";
      for (let _0x36bd30 = 0; _0x36bd30 < _0x52d2b3.length; _0x36bd30++) {
        _0x4604cb += "┝── *WARNING " + (_0x36bd30 + 1) + "* ──\n│  *DATE:* " + _0x52d2b3[_0x36bd30].date + " " + (_0x52d2b3[_0x36bd30].reason ? "  \n│  *REASON:* " + _0x52d2b3[_0x36bd30].reason : "") + "\n│  *WARNED BY:* " + _0x52d2b3[_0x36bd30].warnedby + "\n│  *CHAT:* " + _0x52d2b3[_0x36bd30].chat + "\n";
      }
      _0x4604cb += "╰─────────────◆\n";
    }
    return await _0x598674.reply(_0x4604cb ? _0x4604cb : "*_User didn't have any warning yet!!_*");
  } catch (_0x44b38e) {
    await _0x598674.error(_0x44b38e + "\n\nCommand: chatwarn", _0x44b38e);
  }
});
smd({
  pattern: "warn",
  fromMe: true,
  desc: "warn a user!",
  category: "user",
  filename: __filename,
  use: " < USER >"
}, async (_0xb9222e, _0x4cb71f) => {
  try {
    let _0x5746a6 = _0xb9222e.reply_message ? _0xb9222e.reply_message.sender : _0xb9222e.mentionedJid[0] ? _0xb9222e.mentionedJid[0] : false;
    if (!_0x5746a6) {
      return await _0xb9222e.send("*_Uhh please, reply to a user!!_*");
    }
    let _0x314399 = (await userdb.findOne({
      id: _0x5746a6
    })) || (await userdb.new({
      id: _0x5746a6
    }));
    let _0x5980c1 = _0x314399.warn || {};
    if (!_0x5980c1[_0xb9222e.chat]) {
      _0x5980c1[_0xb9222e.chat] = [];
    }
    var _0x389244 = {
      chat: _0xb9222e.isGroup ? _0xb9222e.metadata?.subject || "GROUP" : "PRIVATE CHAT",
      reason: _0x4cb71f,
      date: _0xb9222e.date,
      warnedby: _0xb9222e.senderName
    };
    _0x5980c1[_0xb9222e.chat].push(_0x389244);
    await userdb.updateOne({
      id: _0x5746a6
    }, {
      warn: _0x5980c1
    });
    let _0x46237b = parseInt(global.warncount) || 3;
    if (_0x5980c1[_0xb9222e.chat].length > _0x46237b && !_0xb9222e.checkBot(_0x5746a6)) {
      if (_0xb9222e.isGroup) {
        if (_0xb9222e.isBotAdmin) {
          await _0xb9222e.send("*_Hey @" + _0x5746a6.split("@")[0] + ", Kicking you from group!_*\n*_Because Your warn limit exceed!_*", {
            mentions: [_0x5746a6]
          });
          await _0xb9222e.bot.groupParticipantsUpdate(_0xb9222e.chat, [_0x5746a6], "remove");
        } else {
          return await _0xb9222e.send("*_Hey @" + _0x5746a6.split("@")[0] + " Dont Spam, Your warn limit exceed!_*");
        }
      } else {
        await _0xb9222e.send("*_Hey @" + _0x5746a6.split("@")[0] + ", Blocking you!_*\n*_Because Your warn limit exceed!_*", {
          mentions: [_0x5746a6]
        });
        await _0xb9222e.bot.updateBlockStatus(_0x5746a6, "block");
      }
    } else {
      return await _0xb9222e.send("*_Hey @" + _0x5746a6.split("@")[0] + " warning added, Don't spam!_*", {
        mentions: [_0x5746a6]
      });
    }
  } catch (_0x229851) {
    await _0xb9222e.error(_0x229851 + "\n\nCommand: warn ", _0x229851, false);
  }
});
smd({
  pattern: "resetwarn",
  desc: "create paste of text.",
  category: "user",
  filename: __filename,
  use: " user "
}, async (_0x204e61, _0xad20a9) => {
  try {
    if (!_0x204e61.isCreator && !_0x204e61.isAdmin) {
      return await _0x204e61.reply(tlang().admin);
    }
    let _0x16177d = _0x204e61.reply_message ? _0x204e61.reply_message.sender : _0x204e61.mentionedJid[0] ? _0x204e61.mentionedJid[0] : false;
    if (!_0x16177d) {
      return await _0x204e61.send("*_Uhh please, reply to a user!!_*");
    }
    let _0x3397c7 = (await userdb.findOne({
      id: _0x16177d
    })) || (await userdb.new({
      id: _0x16177d
    })) || {};
    let _0x1aa30d = _0x3397c7.warn || {};
    if (_0x204e61.isCreator && _0xad20a9.toLowerCase() === "all" && _0x1aa30d) {
      _0x1aa30d = {};
    } else {
      if (!_0x3397c7 || !_0x1aa30d || !_0x1aa30d[_0x204e61.chat]) {
        return await _0x204e61.send("*_User didn't have any warning yet!!_*");
      }
      delete _0x1aa30d[_0x204e61.chat];
    }
    await userdb.updateOne({
      id: _0x16177d
    }, {
      warn: _0x1aa30d
    });
    await _0x204e61.reply("*User is free as a bird now!*\n*All warns has been deleted!*");
  } catch (_0x2b8f6c) {
    await _0x204e61.error(_0x2b8f6c + "\n\nCommand: resetwarn", _0x2b8f6c);
  }
});
smd({
  pattern: "act",
  alias: ["activate", "active"],
  desc: "Switches for varios works.",
  category: "moderation",
  filename: __filename
}, async (_0x1c1427, _0x2c32fb) => {
  try {
    if (!_0x1c1427.isGroup) {
      return _0x1c1427.reply(tlang().group);
    }
    const _0x2e197f = _0x1c1427.botNumber;
    const _0x571a11 = _0x1c1427.isAdmin;
    let _0x14856e = _0x2c32fb?.split(" ")[0].toLowerCase()?.trim() || false;
    if (!_0x571a11 && !_0x1c1427.isCreator) {
      return _0x1c1427.reply(tlang().admin);
    }
    let _0x599658 = (await groupdb.findOne({
      id: _0x1c1427.chat
    })) || (await groupdb.new({
      id: _0x1c1427.chat
    })) || false;
    if (!_0x599658) {
      return await _0x1c1427.reply("*_Uhh dear, Group not found in Databse!_*");
    }
    switch (_0x14856e) {
      case "antilink":
        {
          if (_0x599658.antilink !== "false") {
            return await _0x1c1427.reply("*_Antilink was alredy enabled here!_*");
          }
          await groupdb.updateOne({
            id: _0x1c1427.chat
          }, {
            antilink: "warn"
          });
          await _0x1c1427.reply("*_Enabled antilink in current chat.!_*");
        }
        break;
      case "economy":
        {
          if (_0x599658.economy == "true") {
            return await _0x1c1427.reply("*_Economy was alredy enabled.!_*");
          }
          await groupdb.updateOne({
            id: _0x1c1427.chat
          }, {
            economy: "true"
          });
          await _0x1c1427.reply("*_Economy enabled in current chat.!_*");
        }
        break;
      case "events":
      case "event":
        {
          await groupdb.updateOne({
            id: _0x1c1427.chat
          }, {
            welcome: "true",
            goodbye: "true"
          });
          return await _0x1c1427.reply("*Successfully Enabled Events!*");
        }
        break;
      case "nsfw":
        {
          if (_0x599658.nsfw == "true") {
            return await _0x1c1427.reply("*_NSFW is already enabled!_*");
          }
          await groupdb.updateOne({
            id: _0x1c1427.chat
          }, {
            nsfw: "true"
          });
          await _0x1c1427.reply("*_Successfully Enabled NSFW_*");
        }
        break;
      case "bot":
        {
          if (_0x599658.botenable == "true") {
            return await _0x1c1427.reply("*_bot is already enabled!_*");
          }
          await groupdb.updateOne({
            id: _0x1c1427.chat
          }, {
            botenable: "true"
          });
          await _0x1c1427.reply("*_Successfully Enabled bot_*");
        }
        break;
      default:
        {
          _0x1c1427.reply("Please provide me term like.\n1-events\n2-antilink\n3-economy\n4-bot");
        }
    }
  } catch (_0x54acfc) {
    await _0x1c1427.error(_0x54acfc + "\n\ncommand: act", _0x54acfc);
  }
});
smd({
  pattern: "deact",
  alias: ["deactive", "deactivate"],
  desc: "Switches for varios works.",
  category: "moderation",
  filename: __filename
}, async (_0x3dfe85, _0x4d9655) => {
  try {
    if (!_0x3dfe85.isGroup) {
      return _0x3dfe85.reply(tlang().group);
    }
    const _0x6df183 = _0x3dfe85.botNumber;
    const _0x66f7b9 = _0x3dfe85.isAdmin;
    let _0x22f3c7 = _0x4d9655?.split(" ")[0].toLowerCase()?.trim() || false;
    if (!_0x22f3c7) {
      return _0x3dfe85.reply("❌ Please provide me term like like\n1-events\n2-antilink\n3-nsfw\n4-bot\n5-economy");
    }
    if (!_0x66f7b9 && !_0x3dfe85.isCreator) {
      return _0x3dfe85.reply(tlang().admin);
    }
    let _0x39a7fb = (await groupdb.findOne({
      id: _0x3dfe85.chat
    })) || (await groupdb.new({
      id: _0x3dfe85.chat
    })) || false;
    if (!_0x39a7fb) {
      return await _0x3dfe85.reply("*_Uhh dear, request not be proceed due to error!_*");
    }
    switch (_0x22f3c7) {
      case "antilink":
        {
          if (_0x39a7fb.antilink == "false") {
            return _0x3dfe85.reply("*_Antilink was alredy disabled_*");
          }
          await groupdb.updateOne({
            id: _0x3dfe85.chat
          }, {
            antilink: "false"
          });
          _0x3dfe85.reply("*_disabled antilink in current chat!_*");
        }
        break;
      case "economy":
        {
          if (_0x39a7fb.economy == "false") {
            return _0x3dfe85.reply("*_Economy was alredy disabled!_*");
          }
          await groupdb.updateOne({
            id: _0x3dfe85.chat
          }, {
            economy: "false"
          });
          _0x3dfe85.reply("*disabled Economy in current chat.*");
        }
        break;
      case "events":
      case "event":
        {
          if (_0x39a7fb.events == "false") {
            return _0x3dfe85.reply("*_Events are already disabled!_*");
          }
          await groupdb.updateOne({
            id: _0x3dfe85.chat
          }, {
            welcome: "false",
            goodbye: "false"
          });
          return _0x3dfe85.reply("*Successfully disabled Events!*");
        }
        break;
      case "nsfw":
        {
          if (_0x39a7fb.nsfw == "false") {
            return _0x3dfe85.reply("*_NSFW is already disabled!_*");
          }
          await groupdb.updateOne({
            id: _0x3dfe85.chat
          }, {
            nsfw: "false"
          });
          _0x3dfe85.reply("*Successfully disabled NSFW*");
        }
        break;
      case "bot":
        {
          if (_0x39a7fb.botenable == "false") {
            return await _0x3dfe85.reply("*_bot is already disabled!_*");
          }
          await groupdb.updateOne({
            id: _0x3dfe85.chat
          }, {
            botenable: "true"
          });
          await _0x3dfe85.reply("*_Successfully disabled bot_*");
        }
        break;
      default:
        {
          _0x3dfe85.reply("Please provide me term like.\n1-events\n2-antilink\n3-bot\n4-economy");
        }
    }
  } catch (_0x27fa6e) {
    await _0x3dfe85.error(_0x27fa6e + "\n\ncommand: deact", _0x27fa6e);
  }
});
smd({
  pattern: "bot",
  desc: "activates and deactivates bot.\nuse buttons to toggle.",
  fromMe: true,
  category: "misc",
  filename: __filename
}, async (_0x129972, _0x3811e7) => {
  try {
    let _0x1b1ab2 = _0x3811e7 ? _0x3811e7.toLowerCase().trim() : false;
    let _0x15047e = _0x1b1ab2 ? _0x1b1ab2.split(" ")[0] : false;
    let _0x13ab5f = (await groupdb.findOne({
      id: _0x129972.chat
    })) || (await groupdb.new({
      id: _0x129972.chat
    }));
    if (!_0x15047e) {
      await _0x129972.send("*_Bot *" + (_0x13ab5f.botenable === "false" ? "Disabled" : "Enabled") + " in this Chat!_*");
    } else if (_0x15047e.startsWith("off") || _0x15047e.startsWith("deact") || _0x15047e.startsWith("disable")) {
      if (_0x13ab5f.botenable === "false") {
        await _0x129972.send("*_Bot already disabled in current Chat!!_*");
      } else {
        await groupdb.updateOne({
          id: _0x129972.chat
        }, {
          botenable: "false"
        });
        await _0x129972.send("*_Bot Disabled Succesfully!_*");
      }
    } else if (_0x15047e.startsWith("on") || _0x15047e.startsWith("act") || _0x15047e.startsWith("enable")) {
      if (_0x13ab5f.botenable === "true") {
        await _0x129972.send("*_Bot already enabled in current Chat!!_*");
      } else {
        await groupdb.updateOne({
          id: _0x129972.chat
        }, {
          botenable: "true"
        });
        await _0x129972.send("*_Bot Succesfully Enabled!_*");
      }
    } else {
      await _0x129972.send("*_Provide Valid Instruction_*\n*Ex: _" + prefix + "bot on/off_*");
    }
  } catch (_0x9db1e2) {
    _0x129972.error(_0x9db1e2 + "\n\ncommand: bot", _0x9db1e2);
  }
});
smd({
  pattern: "antitag",
  desc: "detect tagall in group chat, then kick them",
  fromMe: true,
  category: "misc",
  filename: __filename
}, async (_0x27399d, _0x182372) => {
  try {
    let _0x206317 = _0x182372 ? _0x182372.toLowerCase().trim() : false;
    let _0x4a3f1c = _0x206317 ? _0x206317.split(" ")[0] : false;
    let _0x3dc11c = (await groupdb.findOne({
      id: _0x27399d.chat
    })) || (await groupdb.new({
      id: _0x27399d.chat
    }));
    if (!_0x4a3f1c) {
      await _0x27399d.send("*_Anti_tag *" + (_0x3dc11c.antitag === "false" ? "Disabled" : "Enabled") + " in this Chat!_*");
    } else if (_0x4a3f1c.startsWith("off") || _0x4a3f1c.startsWith("deact") || _0x4a3f1c.startsWith("disable")) {
      if (_0x3dc11c.antitag === "false") {
        await _0x27399d.send("*_Anti_tag already disabled in current Chat!!_*");
      } else {
        await groupdb.updateOne({
          id: _0x27399d.chat
        }, {
          antitag: "false"
        });
        await _0x27399d.send("*_Anti_tag Disabled Succesfully!_*");
      }
    } else if (_0x4a3f1c.startsWith("on") || _0x4a3f1c.startsWith("act") || _0x4a3f1c.startsWith("enable")) {
      if (_0x3dc11c.antitag === "true") {
        await _0x27399d.send("*_Anti_tag already enabled in current Chat!!_*");
      } else {
        await groupdb.updateOne({
          id: _0x27399d.chat
        }, {
          antitag: "true"
        });
        await _0x27399d.send("*_Anti_tag succesfully enabled in chat!_*\n*_Now bot kick user who tag all members!_*");
      }
    } else {
      await _0x27399d.send("*_Provide Valid Instruction_*\n*Ex: _" + prefix + "antitag on/off_*");
    }
  } catch (_0x3141b6) {
    _0x27399d.error(_0x3141b6 + "\n\ncommand: antitag", _0x3141b6);
  }
});
smd({
  pattern: "antilink",
  desc: "activates and deactivates antilink.\nuse buttons to toggle.",
  category: "group",
  filename: __filename
}, async (_0x25c82f, _0x4ae2c7, {
  smd: _0x23c42c
}) => {
  try {
    if (!_0x25c82f.isGroup) {
      return _0x25c82f.reply(tlang().group);
    }
    if (!_0x25c82f.isAdmin && !_0x25c82f.isCreator) {
      return _0x25c82f.reply(tlang().admin);
    }
    let _0x495b9f = _0x4ae2c7 ? _0x4ae2c7.toLowerCase().trim() : false;
    let _0x520158 = _0x495b9f ? _0x495b9f.split(" ")[0] : false;
    let _0x7e1f39 = (await groupdb.findOne({
      id: _0x25c82f.chat
    })) || (await groupdb.new({
      id: _0x25c82f.chat
    }));
    if (!_0x520158) {
      return await _0x25c82f.send("*_Antilink " + (_0x7e1f39.antilink === "false" ? "Disabled" : "Enabled") + " in this Group!_* \n" + (_0x7e1f39.antilink === "false" ? "" : "*Current Mode:* _" + _0x7e1f39.antilink + "_") + "\n\n*Antilink Modes:* ```\n" + (prefix + _0x23c42c) + " kick (Delete Links & Kick Senders)\n" + (prefix + _0x23c42c) + " delete (Delete Links Only)\n" + (prefix + _0x23c42c) + " warn (warn & delete links)\n" + (prefix + _0x23c42c) + " off (Disable Antilink in chat) ```\n\n\n" + Config.caption);
    } else if (_0x520158.startsWith("off") || _0x520158.startsWith("deact") || _0x520158.startsWith("disable")) {
      if (_0x7e1f39.antilink === "false") {
        return await _0x25c82f.send("*_Anti_Link already disabled in current Chat!!_*");
      }
      await groupdb.updateOne({
        id: _0x25c82f.chat
      }, {
        antilink: "false"
      });
      return await _0x25c82f.send("*_Anti_Link Disabled Succesfully!_*");
    } else if (_0x520158.startsWith("kick")) {
      if (_0x7e1f39.antilink === "kick") {
        return await _0x25c82f.send("*_Anti_Link already set to kick link senders!!_*");
      }
      await groupdb.updateOne({
        id: _0x25c82f.chat
      }, {
        antilink: "kick"
      });
      return await _0x25c82f.send("*_Anti_Link Succesfully set to kick link senders!_*");
    } else if (_0x520158.startsWith("delete")) {
      if (_0x7e1f39.antilink === "delete") {
        return await _0x25c82f.send("*_Anti_Link already set to delete links!!_*");
      }
      await groupdb.updateOne({
        id: _0x25c82f.chat
      }, {
        antilink: "delete"
      });
      return await _0x25c82f.send("*_Anti_Link Succesfully set to delete links from chat!_*");
    } else if (_0x520158.startsWith("warn")) {
      if (_0x7e1f39.antilink === "warn") {
        return await _0x25c82f.send("*_Anti_Link already set to warn link senders!!_*");
      }
      await groupdb.updateOne({
        id: _0x25c82f.chat
      }, {
        antilink: "warn"
      });
      return await _0x25c82f.send("*_Anti_Link set to warn and delete links!_*");
    } else {
      return await _0x25c82f.send("*_Uhh Please, Provide Valid Instruction_*\n*Eg: _" + prefix + "antilink kick/delete/warn/off_*");
    }
  } catch (_0x90fda9) {
    _0x25c82f.error(_0x90fda9 + "\n\ncommand: antilink", _0x90fda9);
  }
});
smd({
  pattern: "welcome",
  alias: ["setwelcome"],
  desc: "sets welcome message in specific group.",
  category: "group",
  filename: __filename
}, async (_0x1e1e67, _0x1036fe) => {
  try {
    if (!_0x1e1e67.isGroup) {
      return _0x1e1e67.reply(tlang().group);
    }
    if (!_0x1e1e67.isAdmin && !_0x1e1e67.isCreator) {
      return _0x1e1e67.reply(tlang().admin);
    }
    let _0x2154d6 = _0x1036fe.toLowerCase().trim();
    let _0x558208 = (await groupdb.findOne({
      id: _0x1e1e67.chat
    })) || (await groupdb.new({
      id: _0x1e1e67.chat
    }));
    if (_0x2154d6 === "on" || _0x2154d6 === "act" || _0x2154d6 === "enable") {
      if (_0x558208.welcome === "true") {
        return await _0x1e1e67.send("*_Welcome already enabled in current group!!_*");
      }
      await groupdb.updateOne({
        id: _0x1e1e67.chat
      }, {
        welcome: "true"
      });
      return await _0x1e1e67.send("*Welcome successfully enabled!!*");
    }
    if (_0x558208.welcome !== "true") {
      return await _0x1e1e67.send("*_Welcome *Disabled in this Group!_* \n*_Use on/off to enable/disable welcome_*");
    }
    if (!_0x1036fe || _0x2154d6 === "get") {
      return await _0x1e1e67.reply("*Welcome :* " + _0x558208.welcometext);
    }
    if (_0x2154d6 === "off" || _0x2154d6 === "deact" || _0x2154d6 === "disable") {
      if (_0x558208.welcome === "false") {
        return await _0x1e1e67.send("*_Welcome already disabled in current group!!_*");
      }
      await groupdb.updateOne({
        id: _0x1e1e67.chat
      }, {
        welcome: "false"
      });
      return await _0x1e1e67.send("*Welcome message disabled!!*");
    }
    await groupdb.updateOne({
      id: _0x1e1e67.chat
    }, {
      welcometext: _0x1036fe,
      welcome: "true"
    });
    await sendWelcome(_0x1e1e67, _0x1036fe);
  } catch (_0x582cfc) {
    _0x1e1e67.error(_0x582cfc + "\n\ncommand: setwelcome", _0x582cfc);
  }
});
smd({
  pattern: "goodbye",
  alias: ["setgoodbye", "setbye"],
  desc: "sets goodbye message in specific group.",
  category: "group",
  filename: __filename
}, async (_0x2c1a56, _0x5dedfc) => {
  try {
    if (!_0x2c1a56.isGroup) {
      return _0x2c1a56.reply(tlang().group);
    }
    if (!_0x2c1a56.isAdmin && !_0x2c1a56.isCreator) {
      return _0x2c1a56.reply(tlang().admin);
    }
    let _0x604587 = _0x5dedfc.toLowerCase().trim();
    let _0xbcf3ee = (await groupdb.findOne({
      id: _0x2c1a56.chat
    })) || (await groupdb.new({
      id: _0x2c1a56.chat
    }));
    if (_0x604587 === "on" || _0x604587 === "act" || _0x604587 === "enable") {
      if (_0xbcf3ee.goodbye === "true") {
        return await _0x2c1a56.send("*_Goodbye already enabled in current group!!_*");
      }
      await groupdb.updateOne({
        id: _0x2c1a56.chat
      }, {
        goodbye: "true"
      });
      return await _0x2c1a56.send("*Goodbye successfully enabled!!*");
    }
    if (_0xbcf3ee.goodbye !== "true") {
      return await _0x2c1a56.send("*_Goodbye *Disabled in this Group!_* \n*_Use on/off to enable/disable goodbye_*");
    }
    if (!_0x5dedfc || _0x604587 === "get") {
      return await _0x2c1a56.reply("*Goodbye Message :* " + _0xbcf3ee.goodbyetext);
    }
    if (_0x604587 === "off" || _0x604587 === "deact" || _0x604587 === "disable") {
      if (_0xbcf3ee.goodbye === "false") {
        return await _0x2c1a56.send("*_Goodbye already disabled in current group!!_*");
      }
      await groupdb.updateOne({
        id: _0x2c1a56.chat
      }, {
        goodbye: "false"
      });
      return await _0x2c1a56.send("*Goodbye message disabled!!*");
    }
    await groupdb.updateOne({
      id: _0x2c1a56.chat
    }, {
      goodbyetext: _0x5dedfc,
      goodbye: "true"
    });
    await sendWelcome(_0x2c1a56, _0x5dedfc);
  } catch (_0x5dd573) {
    _0x2c1a56.error(_0x5dd573 + "\n\ncommand: setgoodbye", _0x5dd573);
  }
});
smd({
  pattern: "onlyadmin",
  alias: ["antimessge"],
  desc: "activates and deactivates onlyadmin.",
  category: "group",
  filename: __filename
}, async (_0x18fcc8, _0x2d4a64, {
  cmdName: _0x3e69a5
}) => {
  try {
    if (!_0x18fcc8.isGroup) {
      return _0x18fcc8.reply(tlang().group);
    }
    if (!_0x18fcc8.isAdmin && !_0x18fcc8.isCreator) {
      return _0x18fcc8.reply(tlang().admin);
    }
    let _0x38fef2 = (await groupdb.findOne({
      id: _0x18fcc8.chat
    })) || (await groupdb.new({
      id: _0x18fcc8.chat
    }));
    let _0x5b0eb3 = _0x2d4a64 ? _0x2d4a64.toLowerCase().trim() : false;
    let _0x119122 = _0x5b0eb3 ? _0x5b0eb3.split(" ")[0] : false;
    if (!_0x119122) {
      return await _0x18fcc8.send("*_" + _0x3e69a5 + " *" + (_0x38fef2.onlyadmin === "false" ? "Disabled" : "Enabled") + " in this Group!_*\n *_Use on/off to enable/disable_*");
    } else if (_0x119122.startsWith("off") || _0x119122.startsWith("deact") || _0x119122.startsWith("disable")) {
      if (_0x38fef2.onlyadmin === "false") {
        return await _0x18fcc8.reply("*_Onlyadmin Already Disabled in Current Chat_*");
      }
      await groupdb.updateOne({
        id: _0x18fcc8.chat
      }, {
        onlyadmin: "false"
      });
      await _0x18fcc8.bot.groupSettingUpdate(_0x18fcc8.chat, "not_announcement");
      return await _0x18fcc8.send("*" + _0x3e69a5 + " succesfully disable in group!_*\n*_Now everyone send message in group_*");
    } else if (_0x119122.startsWith("on") || _0x119122.startsWith("act") || _0x119122.startsWith("enable")) {
      if (_0x38fef2.onlyadmin === "true") {
        return await _0x18fcc8.reply("*_Onlyadmin Already Enabled in Current Chat_*");
      }
      if (_0x18fcc8.isBotAdmin) {
        await groupdb.updateOne({
          id: _0x18fcc8.chat
        }, {
          onlyadmin: "true"
        });
        await _0x18fcc8.bot.groupSettingUpdate(_0x18fcc8.chat, "announcement");
        return await _0x18fcc8.send("*" + _0x3e69a5 + " succesfully set to kick msg senders!_*\n*_Now only admins allow to send msg in group_*");
      } else {
        return await _0x18fcc8.reply("*_UHH Please, Provide Admin Role First_*");
      }
    } else {
      return await _0x18fcc8.reply("*_Please Provide Valid Instruction_*\n*_Use on/off to enable/disable_*");
    }
  } catch (_0x53ffd3) {
    _0x18fcc8.error(_0x53ffd3 + "\n\ncommand: onlyadmin", _0x53ffd3);
  }
});
smd({
  pattern: "antibot",
  desc: "kick Bot Users from Group.!",
  category: "group",
  filename: __filename
}, async (_0x3b3e26, _0x12cbbf, {
  cmdName: _0x12486d
}) => {
  try {
    if (!_0x3b3e26.isGroup) {
      return _0x3b3e26.reply(tlang().group);
    }
    if (!_0x3b3e26.isAdmin && !_0x3b3e26.isCreator) {
      return _0x3b3e26.reply(tlang().admin);
    }
    let _0x397293 = (await groupdb.findOne({
      id: _0x3b3e26.chat
    })) || (await groupdb.new({
      id: _0x3b3e26.chat
    }));
    let _0x22e1dc = _0x12cbbf ? _0x12cbbf.toLowerCase().trim() : "";
    let _0x11994b = _0x22e1dc.startsWith("on") || _0x22e1dc.startsWith("act") || _0x22e1dc.startsWith("enable") || _0x22e1dc.startsWith("del") || _0x22e1dc.startsWith("warn") ? "warn" : _0x22e1dc.startsWith("kic") ? "kick" : _0x22e1dc.startsWith("off") || _0x22e1dc.startsWith("reset") || _0x22e1dc.startsWith("deact") || _0x22e1dc.startsWith("disable") ? "false" : "";
    if (!_0x11994b) {
      return await _0x3b3e26.send("*_Antibot Currently *" + (_0x397293.antibot === "false" ? "Disabled" : "Enabled") + " in this Group!_*\n*_Use warn/kick/off to enable/disable Antibot_*");
    } else if (_0x11994b === "false") {
      if (_0x397293.antibot === "false") {
        return await _0x3b3e26.reply("*_Antibot Already Disabled in Current Chat_*");
      }
      await groupdb.updateOne({
        id: _0x3b3e26.chat
      }, {
        antibot: "false"
      });
      return await _0x3b3e26.send("*_Antibot Succesfully Disable in group!_*");
    } else if (_0x11994b === "warn" || _0x11994b === "kick") {
      if (_0x397293.antibot === _0x11994b) {
        return await _0x3b3e26.reply("*_Antibot Already set to " + _0x11994b + " bots!_*");
      }
      if (!_0x3b3e26.isBotAdmin) {
        return await _0x3b3e26.reply("*_Uhh Please, Provide Admin Role First_*");
      }
      await groupdb.updateOne({
        id: _0x3b3e26.chat
      }, {
        antibot: _0x11994b
      });
      return await _0x3b3e26.send("*_Antibot Succesfully set to " + _0x11994b + " Bot Users!_*");
    } else {
      return await _0x3b3e26.reply("*_Please provide valid instructions!_*\n*_Use warn/kick/off to enable/disable Antibot!_*");
    }
  } catch (_0x304d4d) {
    _0x3b3e26.error(_0x304d4d + "\n\ncommand: antibot", _0x304d4d);
  }
});
smd({
  pattern: "disable",
  desc: "disable cmds in Group.!",
  category: "group",
  filename: __filename
}, async (_0x204bdc, _0x1c3634) => {
  try {
    if (!_0x204bdc.isGroup) {
      return _0x204bdc.reply(tlang().group);
    }
    if (!_0x204bdc.isAdmin && !_0x204bdc.isCreator) {
      return _0x204bdc.reply(tlang().admin);
    }
    let _0x2cad27 = (await groupdb.findOne({
      id: _0x204bdc.chat
    })) || (await groupdb.new({
      id: _0x204bdc.chat
    }));
    let _0x161561 = _0x1c3634 ? _0x1c3634.toLowerCase().trim() : false;
    let _0x3dd6b4 = _0x161561 ? _0x161561.split(" ")[0] : "";
    if (!_0x3dd6b4) {
      return await _0x204bdc.send("*Provide cmd name to disable in group*\n*Ex " + prefix + "disable tag(to disabled 'tag' cmd)/info*");
    } else if (_0x3dd6b4.startsWith("info") || _0x3dd6b4.startsWith("list") || _0x3dd6b4.startsWith("cmds")) {
      return await _0x204bdc.send(_0x2cad27.disablecmds === "false" ? "*_Uhh Dear, Theres no cmd disabled in current group_*" : "*_Disable cmds :_* ```" + _0x2cad27.disablecmds.replace("false,", "") + "```");
    } else if (_0x3dd6b4.startsWith("enable") || _0x3dd6b4.startsWith("disable") || _0x3dd6b4.startsWith("bot")) {
      return await _0x204bdc.reply("*_Uhh Dear, I can't disable that cmd_*");
    } else if (_0x3dd6b4) {
      const _0x965649 = astro_patch.commands.find(_0x1b0024 => _0x1b0024.pattern === _0x3dd6b4) || astro_patch.commands.find(_0x2fd6f8 => _0x2fd6f8.alias && _0x2fd6f8.alias.includes(_0x3dd6b4));
      if (_0x965649) {
        let _0xac463 = _0x965649.pattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        let _0x27d7ad = new RegExp("\\b" + _0xac463 + "\\b");
        if (_0x27d7ad.test(_0x2cad27.disablecmds)) {
          return await _0x204bdc.send("*Uhh Dear, Provided cmd already in disable cmds*");
        }
        var _0x41da99 = _0x2cad27.disablecmds + "," + _0x965649.pattern;
        await groupdb.updateOne({
          id: _0x204bdc.chat
        }, {
          disablecmds: _0x41da99
        });
        let _0x23b4d5 = _0x41da99.replace("false,", "");
        return await _0x204bdc.send("*_\"" + _0x3dd6b4 + "\" Succesfully added in disable cmds_*" + (_0x23b4d5 === "" ? "" : "\n*_Disable cmds :_* ```" + _0x23b4d5 + "```"));
      } else {
        return await _0x204bdc.reply("*_'" + _0x3dd6b4 + "' is not a bot command, Provide valid command_*");
      }
    }
  } catch (_0x590dfb) {
    _0x204bdc.error(_0x590dfb + "\n\ncommand: enable", _0x590dfb);
  }
});
smd({
  pattern: "enable",
  desc: "enable a cmd in Group.!",
  category: "group",
  filename: __filename
}, async (_0x212b0e, _0x412234) => {
  try {
    if (!_0x212b0e.isGroup) {
      return _0x212b0e.reply(tlang().group);
    }
    if (!_0x212b0e.isAdmin && !_0x212b0e.isCreator) {
      return _0x212b0e.reply(tlang().admin);
    }
    let _0x2c9cd0 = (await groupdb.findOne({
      id: _0x212b0e.chat
    })) || (await groupdb.new({
      id: _0x212b0e.chat
    }));
    let _0xa3fc1d = _0x412234 ? _0x412234.toLowerCase().trim() : false;
    let _0x439688 = _0xa3fc1d ? _0xa3fc1d.split(" ")[0] : "";
    let _0x40bb35 = _0x439688.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    let _0x5c60c4 = new RegExp("\\b" + _0x40bb35 + "\\b");
    if (!_0x439688 || _0x439688 === "") {
      return await _0x212b0e.send("*Please provide disabled cmd name to enable it*\n*Ex " + prefix + "enable tag(if 'tag' cmd disabled)/all(reset disables)*");
    } else if (_0xa3fc1d.startsWith("all")) {
      await groupdb.updateOne({
        id: _0x212b0e.chat
      }, {
        disablecmds: "false"
      });
      return await _0x212b0e.send("*_All disable cmds succesfully enabled_*");
    } else if (_0x5c60c4.test(_0x2c9cd0.disablecmds) && _0x2c9cd0.disablecmds.includes(_0x439688)) {
      let _0x51b1cd = _0x2c9cd0.disablecmds.replace(_0x5c60c4, "");
      await groupdb.updateOne({
        id: _0x212b0e.chat
      }, {
        disablecmds: _0x51b1cd
      });
      return await _0x212b0e.send("*_\"" + _0x439688.replace(",", "") + "\" Succesfully removed from disable cmds_*");
    } else {
      return await _0x212b0e.send("_There's no cmd disabled with *" + _0x439688.replace(",", "") + "* name");
    }
  } catch (_0x25ceaf) {
    _0x212b0e.error(_0x25ceaf + "\n\ncommand: disable", _0x25ceaf);
  }
});
smd({
  pattern: "antifake",
  desc: "𝗗𝗲𝘁𝗲𝗰𝘁𝘀 𝗽𝗿𝗼𝗺𝗼𝘁𝗲/𝗱𝗲𝗺𝗼𝘁𝗲 𝗮𝗻𝗱 𝘀𝗲𝗻𝗱𝘀 𝗮𝗹𝗲𝗿𝘁. ",
  category: "group",
  filename: __filename
}, async (_0x5a1eb8, _0x463e76) => {
  try {
    if (!_0x5a1eb8.isGroup) {
      return _0x5a1eb8.reply(tlang().group);
    }
    if (!_0x5a1eb8.isAdmin && !_0x5a1eb8.isCreator) {
      return _0x5a1eb8.reply(tlang().admin);
    }
    let _0x49ac75 = (await groupdb.findOne({
      id: _0x5a1eb8.chat
    })) || (await groupdb.new({
      id: _0x5a1eb8.chat
    }));
    let _0x1c6236 = _0x463e76 ? _0x463e76.toLowerCase().trim() : "";
    if (_0x1c6236.startsWith("off") || _0x1c6236.startsWith("deact") || _0x1c6236.startsWith("disable")) {
      if (_0x49ac75.antifake == "false") {
        return await _0x5a1eb8.send("*Anti_Fake Already Disabled In Current Chat!*");
      }
      await groupdb.updateOne({
        id: _0x5a1eb8.chat
      }, {
        antifake: "false"
      });
      return await _0x5a1eb8.send("*Anti_Fake Disable Succesfully!*");
    } else if (!_0x463e76) {
      return await _0x5a1eb8.send("*_Antifake " + (_0x49ac75.antifake === "false" ? "Not set to any" : "set to \"" + _0x49ac75.antifake + "\"") + " Country Code!_*\n *Provide Country code to Update Antifake Status*\n*Eg: _.antifake 92_*");
    }
    let _0x2f3d1b = _0x463e76 ? _0x463e76.split(",").map(_0x40173c => parseInt(_0x40173c)).filter(_0x44d61c => !isNaN(_0x44d61c)).join(",") : false;
    if (!_0x463e76 || !_0x2f3d1b) {
      return await _0x5a1eb8.send("*_Please provide a country code First_*\n *_Only numbers to join this group._*\n*_eg: " + prefix + "antifake 92_*");
    } else if (_0x2f3d1b) {
      await groupdb.updateOne({
        id: _0x5a1eb8.chat
      }, {
        antifake: "" + _0x2f3d1b
      });
      return await _0x5a1eb8.send("*Anti_Fake Succesfully set to \"" + _0x2f3d1b + "\"!*\n*_Now People Joined Group Who's Number Start With " + _0x2f3d1b + "_*");
    } else {
      return await _0x5a1eb8.send("*_Please provide a Valid country code First_*\n *_Only numbers to join this group._*\n*_eg: " + prefix + "antifake 92_*");
    }
  } catch (_0x53288b) {
    _0x5a1eb8.error(_0x53288b + "\n\ncommand: antifake", _0x53288b);
  }
});
smd({
  pattern: "antidemote",
  desc: "Detects Promote and Automaticaly demote promoted person.",
  category: "group",
  filename: __filename
}, async (_0x3d214e, _0x55496f) => {
  try {
    if (!_0x3d214e.isGroup) {
      return _0x3d214e.reply(tlang().group);
    }
    if (!_0x3d214e.isAdmin && !_0x3d214e.isCreator) {
      return _0x3d214e.reply(tlang().admin);
    }
    let _0x30a721 = (await groupdb.findOne({
      id: _0x3d214e.chat
    })) || (await groupdb.new({
      id: _0x3d214e.chat
    }));
    let _0x210ede = _0x55496f ? _0x55496f.toLowerCase().trim() : "";
    if (_0x210ede.startsWith("on") || _0x210ede.startsWith("act") || _0x210ede.startsWith("enable")) {
      if (_0x30a721.antidemote == "true") {
        return await _0x3d214e.send("*Anti_Demote Already Enabled In Current Chat!*");
      }
      await groupdb.updateOne({
        id: _0x3d214e.chat
      }, {
        antidemote: "true"
      });
      return await _0x3d214e.send("*Anti_Demote Enable Succesfully! _No One Demote Here Now_.*");
    } else if (_0x210ede.startsWith("off") || _0x210ede.startsWith("deact") || _0x210ede.startsWith("disable")) {
      if (_0x30a721.antidemote == "false") {
        return await _0x3d214e.send("*Anti_Demote Already Disabled In Current Chat!*");
      }
      await groupdb.updateOne({
        id: _0x3d214e.chat
      }, {
        antidemote: "false"
      });
      return await _0x3d214e.send("*Anti_Demote Disable Succesfully!*");
    } else {
      return await _0x3d214e.reply("*Uhh Dear, Please Toggle between \"On\" And \"Off\".* \n*_To Enable & Disable Stop Demoting Peoples!_*");
    }
  } catch (_0x3863b4) {
    _0x3d214e.error(_0x3863b4 + "\n\ncommand: antidemote", _0x3863b4);
  }
});
smd({
  pattern: "antipromote",
  desc: "Detects Promote and Automaticaly demote promoted person.",
  category: "group",
  filename: __filename
}, async (_0x3d1898, _0x4bf866) => {
  try {
    if (!_0x3d1898.isGroup) {
      return _0x3d1898.reply(tlang().group);
    }
    if (!_0x3d1898.isAdmin && !_0x3d1898.isCreator) {
      return _0x3d1898.reply(tlang().admin);
    }
    let _0x599352 = (await groupdb.findOne({
      id: _0x3d1898.chat
    })) || (await groupdb.new({
      id: _0x3d1898.chat
    }));
    let _0x41626b = _0x4bf866 ? _0x4bf866.toLowerCase().trim() : "";
    if (_0x41626b.startsWith("on") || _0x41626b.startsWith("act") || _0x41626b.startsWith("enable")) {
      if (_0x599352.antipromote == "true") {
        return await _0x3d1898.send("*Anti_Promote Already Enabled In Current Chat!*");
      }
      await groupdb.updateOne({
        id: _0x3d1898.chat
      }, {
        antipromote: "true"
      });
      return await _0x3d1898.send("*Anti_Promote Enable Succesfully! _No One Promote Here Now_.*");
    } else if (_0x41626b.startsWith("off") || _0x41626b.startsWith("deact") || _0x41626b.startsWith("disable")) {
      if (_0x599352.antipromote == "false") {
        return await _0x3d1898.send("*Anti_Promote Already Disabled In Current Chat!*");
      }
      await groupdb.updateOne({
        id: _0x3d1898.chat
      }, {
        antipromote: "false"
      });
      return await _0x3d1898.send("*Anti_Promote Disable Succesfully!*");
    } else {
      return await _0x3d1898.reply("*Uhh Dear, Please Toggle between \"On\" And \"Off\".* \n*_To Stop Promoting Peoples in Chat_*");
    }
  } catch (_0x424dfe) {
    _0x3d1898.error(_0x424dfe + "\n\ncommand: antipromote", _0x424dfe);
  }
});
smd({
  pattern: "pdm",
  desc: "Detect Promote/Demote Users And Send Alerts in Chat ",
  category: "group",
  filename: __filename
}, async (_0x47f7e9, _0x4bf96c) => {
  try {
    if (!_0x47f7e9.isGroup) {
      return _0x47f7e9.reply(tlang().group);
    }
    if (!_0x47f7e9.isAdmin && !_0x47f7e9.isCreator) {
      return _0x47f7e9.reply(tlang().admin);
    }
    let _0x9e3626 = (await groupdb.findOne({
      id: _0x47f7e9.chat
    })) || (await groupdb.new({
      id: _0x47f7e9.chat
    }));
    let _0x19e598 = _0x4bf96c ? _0x4bf96c.toLowerCase().trim() : "";
    if (_0x19e598.startsWith("on") || _0x19e598.startsWith("act") || _0x19e598.startsWith("enable")) {
      if (_0x9e3626.pdm == "true") {
        return await _0x47f7e9.send("*Promote/Demote Alerts Already Enabled In Current Chat!*");
      }
      await groupdb.updateOne({
        id: _0x47f7e9.chat
      }, {
        pdm: "true"
      });
      return await _0x47f7e9.send("*Promote/Demote Alerts Enable Succesfully!*");
    } else if (_0x19e598.startsWith("off") || _0x19e598.startsWith("deact") || _0x19e598.startsWith("disable")) {
      if (_0x9e3626.pdm == "false") {
        return await _0x47f7e9.send("*Promote/Demote Alerts Already Disabled In Current Chat!*");
      }
      await groupdb.updateOne({
        id: _0x47f7e9.chat
      }, {
        pdm: "false"
      });
      return await _0x47f7e9.send("*Promote/Demote Alerts Disable Succesfully!*");
    } else {
      return await _0x47f7e9.reply("*Uhh Dear, Please use between \"On\" And \"Off\".* \n*_To get And Stop Promote/Demote Alerts_*");
    }
  } catch (_0x2f089d) {
    _0x47f7e9.error(_0x2f089d + "\n\ncommand: pdm", _0x2f089d);
  }
});
smd({
  pattern: "amute",
  desc: "sets auto mute time in group.",
  category: "moderation"
}, async (_0x23aaae, _0xc0fcc0) => {
  try {
    if (!_0x23aaae.isGroup) {
      return _0x23aaae.reply(tlang().group);
    }
    if (!_0x23aaae.isAdmin && !_0x23aaae.isCreator) {
      return _0x23aaae.reply(tlang().admin);
    }
    let _0x4e4f77 = (await groupdb.findOne({
      id: _0x23aaae.chat
    })) || (await groupdb.new({
      id: _0x23aaae.chat
    }));
    if (!_0xc0fcc0) {
      return await _0x23aaae.reply("*Auto_Mute *" + (_0x4e4f77.mute === "false" ? "disable" : "enabled") + " for current group*" + (_0x4e4f77.mute !== "false" ? "\n *Auto mute status set at : " + _0x4e4f77.mute + "* " : ""));
    }
    let [_0x579533, _0x1c48cc] = _0xc0fcc0.split(":").map(Number);
    if (isNaN(_0x579533) || isNaN(_0x1c48cc) || _0x579533 < 0 || _0x579533 >= 24 || _0x1c48cc < 0 || _0x1c48cc >= 60) {
      return _0x23aaae.reply("Please provide correct form.\nEg: " + prefix + "amute 22:00");
    }
    let _0x37c60f = _0x579533.toString().padStart(2, "0") + ":" + _0x1c48cc.toString().padStart(2, "0");
    await groupdb.updateOne({
      id: _0x23aaae.chat
    }, {
      mute: _0x37c60f
    });
    return _0x23aaae.reply("*_Successfully done, Group auto mute at " + _0x37c60f + "_*");
  } catch (_0x47f0cd) {
    _0x23aaae.error(_0x47f0cd + "\n\ncommand: amute", _0x47f0cd);
  }
});
smd({
  pattern: "aunmute",
  desc: "sets unmute time in group.",
  category: "moderation"
}, async (_0x93dfcd, _0x13088a) => {
  try {
    if (!_0x93dfcd.isGroup) {
      return _0x93dfcd.reply(tlang().group);
    }
    if (!_0x93dfcd.isAdmin && !_0x93dfcd.isCreator) {
      return _0x93dfcd.reply(tlang().admin);
    }
    let _0x233212 = (await groupdb.findOne({
      id: _0x93dfcd.chat
    })) || (await groupdb.new({
      id: _0x93dfcd.chat
    }));
    if (!_0x13088a) {
      return await _0x93dfcd.reply("*Auto_Unmute *" + (_0x233212.unmute === "false" ? "disable" : "enabled") + " for current group*" + (_0x233212.unmute !== "false" ? "\n *Auto unmute status set at : " + _0x233212.unmute + "* " : ""));
    }
    let [_0x4566be, _0x302718] = _0x13088a.split(":").map(Number);
    if (isNaN(_0x4566be) || isNaN(_0x302718) || _0x4566be < 0 || _0x4566be >= 24 || _0x302718 < 0 || _0x302718 >= 60) {
      return _0x93dfcd.reply("Please provide correct form.\nEg: " + prefix + "aunmute 22:00");
    }
    let _0x47f5d3 = _0x4566be.toString().padStart(2, "0") + ":" + _0x302718.toString().padStart(2, "0");
    await groupdb.updateOne({
      id: _0x93dfcd.chat
    }, {
      unmute: _0x47f5d3
    });
    return _0x93dfcd.reply("*_Successfully done, Group auto unmute at " + _0x47f5d3 + "_*");
  } catch (_0x30bf1c) {
    _0x93dfcd.error(_0x30bf1c + "\n\ncommand: aunmute", _0x30bf1c);
  }
});
smd({
  pattern: "dunmute",
  desc: "Delete unmute from group.",
  category: "moderation"
}, async _0xe007b5 => {
  try {
    if (!_0xe007b5.isGroup) {
      return _0xe007b5.reply(tlang().group);
    }
    if (!_0xe007b5.isAdmin && !_0xe007b5.isCreator) {
      return _0xe007b5.reply(tlang().admin);
    }
    let _0xb4b312 = await groupdb.findOne({
      id: _0xe007b5.chat
    });
    if (!_0xb4b312 || !_0xb4b312.unmute || _0xb4b312.unmute == "false") {
      return await _0xe007b5.reply("*There's no auto unmute set in group.*");
    }
    await groupdb.updateOne({
      id: _0xe007b5.chat
    }, {
      unmute: "false"
    });
    return await _0xe007b5.reply("*Auto unmute deleted successfully.*");
  } catch (_0x243aed) {
    _0xe007b5.error(_0x243aed + "\n\ncommand: dunmute", _0x243aed);
  }
});
smd({
  pattern: "dmute",
  desc: "Delete mute from group.",
  category: "moderation"
}, async (_0x10542a, _0x2cc451) => {
  try {
    if (!_0x10542a.isGroup) {
      return _0x10542a.reply(tlang().group);
    }
    if (!_0x10542a.isAdmin && !_0x10542a.isCreator) {
      return _0x10542a.reply(tlang().admin);
    }
    let _0x529593 = await groupdb.findOne({
      id: _0x10542a.chat
    });
    if (!_0x529593 || !_0x529593.mute || _0x529593.mute == "false") {
      return await _0x10542a.reply("*There's no auto mute set in group.*");
    }
    await groupdb.updateOne({
      id: _0x10542a.chat
    }, {
      mute: "false"
    });
    return await _0x10542a.reply("*Auto mute deleted successfully.*");
  } catch (_0x137fa6) {
    _0x10542a.error(_0x137fa6 + "\n\ncommand: dmute", _0x137fa6);
  }
});
async function haveEqualMembers(_0x31ae7e, _0x107896) {
  if (_0x31ae7e.length === 0 || _0x107896.length === 0) {
    return false;
  }
  const _0x5aee47 = _0x31ae7e.filter(_0x44f6e4 => _0x107896.includes(_0x44f6e4));
  const _0x3a93d0 = _0x5aee47.length / _0x31ae7e.length * 100;
  return _0x3a93d0 >= 76;
}
smd({
  pattern: "antiword",
  desc: "Detects words from chat,and delete/warn senders.",
  category: "group",
  filename: __filename,
  use: "< action | words >"
}, async (_0x4626e9, _0x244587, {
  cmdName: _0xc43bcd
}) => {
  try {
    if (!_0x4626e9.isGroup) {
      return _0x4626e9.reply(tlang().group);
    }
    if (!_0x4626e9.isAdmin && !_0x4626e9.isCreator) {
      return _0x4626e9.reply(tlang().admin);
    }
    let _0x55ea26 = (await groupdb.findOne({
      id: _0x4626e9.chat
    })) || (await groupdb.new({
      id: _0x4626e9.chat,
      antiword: {
        status: "false",
        words: ""
      }
    }));
    let _0x14e9b0 = _0x244587 ? _0x244587.toLowerCase().trim() : false;
    let _0xe2e8cc = _0x55ea26.antiword;
    let _0x28cfe1 = "*Antiword Currently *" + (_0xe2e8cc.status !== "false" ? "enabled" : "disabled") + "!!!* ```\n  STATUS: " + (_0xe2e8cc.status ? _0xe2e8cc.status : "--Empty Yet--") + " \n  WORDS: " + (_0xe2e8cc.words ? _0xe2e8cc.words.replace(/,/gi, " -- ") : "--Empty Yet--") + "```\n\n*Available Cmds:* ```\n  " + (prefix + _0xc43bcd) + " off \n  " + (prefix + _0xc43bcd) + " reset\n  " + (prefix + _0xc43bcd) + " warn | bad,words\n  " + (prefix + _0xc43bcd) + " delete | hot,badas,etc\n``` \n\n\n " + Config.caption;
    if (!_0x14e9b0 || !_0x244587) {
      return await _0x4626e9.send(_0x28cfe1);
    }
    let _0x48cd39 = _0x14e9b0.split("|")[1] || "";
    let _0x431ae2 = _0x14e9b0.startsWith("on") || _0x14e9b0.startsWith("act") || _0x14e9b0.startsWith("enable") || _0x14e9b0.startsWith("del") ? "delete" : _0x14e9b0.startsWith("warn") ? "warn" : _0x14e9b0.startsWith("off") || _0x14e9b0.startsWith("deact") || _0x14e9b0.startsWith("disable") ? "false" : _0x14e9b0.startsWith("reset") ? "reset" : "";
    _0x431ae2 = !_0x431ae2 && _0x48cd39 && _0xe2e8cc.status !== "false" ? _0xe2e8cc.status : _0x431ae2;
    if (_0x431ae2 === "reset") {
      await groupdb.updateOne({
        id: _0x4626e9.chat
      }, {
        antiword: {}
      });
      return await _0x4626e9.send("*_Anti_Word status cleard!_*");
    } else if (_0x431ae2 === "delete" || _0x431ae2 === "warn") {
      if (_0xe2e8cc.status == _0x431ae2 && !_0x48cd39) {
        return await _0x4626e9.send("*Please provide badWords, like " + (prefix + _0xc43bcd) + " " + _0x431ae2 + " | bad,words");
      }
      _0x48cd39 = _0x48cd39 ? _0x48cd39 : _0xe2e8cc.words;
      await groupdb.updateOne({
        id: _0x4626e9.chat
      }, {
        antiword: {
          status: _0x431ae2,
          words: _0x48cd39
        }
      });
      return await _0x4626e9.send("*_Anti_Word succesfully set to '" + _0x431ae2 + "' badward!_*\n*Antiwords are:```" + (_0x48cd39 ? _0x48cd39.replace(/,/gi, " | ") : "--Empty Yet--") + "``` *");
    } else if (_0x431ae2 === "false") {
      if (_0xe2e8cc.status === _0x431ae2) {
        return await _0x4626e9.send("*Anti_Word Already Disabled In Current Chat!*");
      }
      await groupdb.updateOne({
        id: _0x4626e9.chat
      }, {
        antiword: {
          status: "false",
          words: _0xe2e8cc.words
        }
      });
      return await _0x4626e9.send("*Anti_Word Disable Succesfully!*");
    } else {
      return await _0x4626e9.reply("*Uhh dear, Please follow instructions!!*\n\n" + _0x28cfe1);
    }
  } catch (_0x5738c4) {
    _0x4626e9.error(_0x5738c4 + "\n\ncommand: antiword", _0x5738c4);
  }
});
let bott = false;
let chatbotCount = 0;
smd({
  on: "main"
}, async (_0x39f91d, _0x4baec9, {
  botNumber: _0x4ac038,
  isCreator: _0x184989,
  budy: _0x47409a,
  body: _0x66fc82,
  icmd: _0x250d65
}) => {
  try {
    if (global.MsgsInLog === "true") {
      console.log("" + (_0x39f91d.isGroup ? "[MESSAGE IN GROUP] From => " + _0x39f91d.metadata.subject + "\n[USER]:" : "[MESSAGE IN PRIVATE] From =>") + (" " + _0x39f91d.senderName + " " + _0x39f91d.senderNum + "\n[" + _0x39f91d.mtype.toUpperCase() + "]: " + _0x39f91d.body + "\n============== [SMD] ================="));
    }
    let _0x273393 = (await groupdb.findOne({
      id: _0x39f91d.chat
    })) || false;
    let _0xea5278 = false;
    try {
      if (!global.SmdOfficial && global.SmdOfficial !== "yes") {
        return;
      }
      if (_0x273393 && _0x273393.antitag == "true" && !_0x39f91d.checkBot() && _0x39f91d.mtype !== "reactionMessage" && _0x273393.botenable == "true") {
        const _0x50265a = await haveEqualMembers(_0x39f91d.metadata.participants.map(_0x406321 => _0x406321.id), _0x39f91d.mentionedJid);
        if (_0x50265a && _0x39f91d.isBotAdmin) {
          let _0x40ef27 = {
            reason: "tagging all members!",
            chat: _0x39f91d.metadata?.subject || "GROUP",
            warnedby: tlang().title,
            date: _0x39f91d.date
          };
          _0xea5278 = await warn.addwarn(_0x39f91d.sender, _0x39f91d.chat, _0x40ef27);
          await _0x39f91d.reply("*_[TAG DETECTED] Hey @" + _0x39f91d.senderNum + " warning!!_*\n*_Tagging all members is not allowed!_*", {
            mentions: [_0x39f91d.sender]
          });
          await _0x39f91d.delete();
        } else if (_0x50265a && !_0x39f91d.isBotAdmin) {
          await _0x39f91d.reply("*_[TAGALL DETECTED] Can't do anything, without getting admin role!_*", {
            mentions: [_0x39f91d.sender]
          });
        }
      }
      if (_0x273393 && _0x39f91d.isGroup && !_0x39f91d.isAdmin && !_0x184989 && _0x39f91d.mtype !== "reactionMessage" && _0x273393.botenable == "true") {
        if (_0x273393.antibot && _0x273393.antibot !== "false" && _0x39f91d.isBot && !_0x39f91d.checkBot(_0x39f91d.sender)) {
          if (_0x39f91d.isBotAdmin) {
            var _0x3c86e4 = "*_Bot user not allowed, please make it private!_*";
            if (_0x273393.antibot === "warn") {
              let _0x50d0d8 = {
                reason: "Bots not allowed!",
                chat: _0x39f91d.metadata?.subject || "GROUP",
                date: _0x39f91d.date
              };
              _0xea5278 = _0xea5278 ? _0xea5278 : await warn.addwarn(_0x39f91d.sender, _0x39f91d.chat, _0x50d0d8);
              if (_0xea5278.status) {
                _0x3c86e4 = "*_Hey @" + _0x39f91d.senderNum + " warning, Due To Antibot!_*";
              }
            } else if (_0x273393.antibot === "kick") {
              try {
                sleep(1000);
                await _0x39f91d.bot.groupParticipantsUpdate(_0x39f91d.chat, [_0x39f91d.sender], "remove");
                _0x3c86e4 = "*_User @" + _0x39f91d.senderNum + " kick Due To Antibot!_*";
              } catch {}
            }
            await _0x39f91d.delete();
            await _0x39f91d.send(_0x3c86e4, {
              mentions: [_0x39f91d.sender]
            });
          } else if (!_0x39f91d.isBotAdmin && _0x39f91d.isBot) {
            await _0x39f91d.reply("*_Uhh Please, Provide Admin Role To Kick Other Bot_*\n*_Or Disable Antibot (On/Off) In Current Group_*");
          }
        }
        if (_0x273393.onlyadmin && _0x273393.onlyadmin === "true" && SmdOfficial == "yes") {
          var _0x3c86e4 = "";
          if (_0x39f91d.isBotAdmin) {
            let _0x5c4aae = {
              reason: "Only Admin can Chat!",
              chat: _0x39f91d.metadata?.subject || "PRIVATE",
              warnedby: tlang().title,
              date: _0x39f91d.date
            };
            _0xea5278 = _0xea5278 ? _0xea5278 : await warn.addwarn(_0x39f91d.sender, _0x39f91d.chat, _0x5c4aae);
            if (_0xea5278.status) {
              _0x3c86e4 = "*Warns you for chat here!*\n";
            }
            await _0x39f91d.delete();
            sleep(1500);
            await _0x39f91d.send("*Hey @" + _0x39f91d.senderNum + "* " + _0x3c86e4 + "*Deleteing message,while onlyadmin activated!!* ", {
              mentions: [_0x39f91d.sender]
            });
          } else {
            await _0x39f91d.send("*_Provide admin role to kick Message Senders_*\n*Or _Disable onlyadmin(on/off) in currentchat_*");
          }
        }
        if (_0x273393.antilink && _0x273393.antilink !== "false" && SmdOfficial === "yes") {
          const _0x37bc15 = Config.antilink_values && Config.antilink_values !== "all" ? Config.antilink_values.split(",").filter(_0x3da281 => _0x3da281.trim() !== "") : ["https://", "chat.whatsapp.com", "fb.com"];
          let _0x5cbc1d = _0x66fc82.toLowerCase();
          if (_0x37bc15.some(_0x81b040 => _0x5cbc1d.includes(_0x81b040))) {
            if (!_0x39f91d.isBotAdmin) {
              let _0x26aa7f = " *[LINK DETECTED]*\nUser @" + _0x39f91d.sender.split("@")[0] + " detected sending a link.\nPromote " + Config.botname + " as admin to " + (_0x273393.antilink === "kick" ? "kick \nlink senders." : "delete \nlinks from this Chat") + " \n";
              await _0x39f91d.send(_0x26aa7f, {
                mentions: [_0x39f91d.sender]
              });
            } else if (_0x273393.antilink === "delete") {
              await _0x39f91d.send("*_Link Detected.. Deletion Done!_*");
              await _0x39f91d.delete();
            } else if (_0x273393.antilink === "warn" || _0x273393.antilink === "true") {
              let _0x75abf8 = {
                reason: "links not allowed!",
                chat: _0x39f91d.metadata?.subject || "PRIVATE",
                warnedby: tlang().title,
                date: _0x39f91d.date
              };
              _0xea5278 = _0xea5278 ? _0xea5278 : await warn.addwarn(_0x39f91d.sender, _0x39f91d.chat, _0x75abf8);
              var _0x3c86e4 = _0xea5278.status ? "*_[LINK DETECTED] Hey @" + _0x39f91d.senderNum + " warning!!_*\n*_links not allowed in current group!_*" : "*_[LINK DETECTED]!_*";
              await _0x39f91d.reply(_0x3c86e4, {
                mentions: [_0x39f91d.sender]
              });
              await _0x39f91d.delete();
            } else if (_0x273393.antilink === "kick") {
              await _0x39f91d.send("*_Link Detected!!_*");
              try {
                await _0x39f91d.delete();
                sleep(1500);
                await _0x39f91d.bot.groupParticipantsUpdate(_0x39f91d.chat, [_0x39f91d.sender], "remove");
              } catch {
                await _0x39f91d.send("*Link Detected*\n" + tlang().botAdmin);
              }
            }
          }
        }
      }
    } catch (_0x1a7fb0) {
      console.log("Error From Antilinks : ", _0x1a7fb0);
    }
    var _0x219875 = _0x273393?.antiword || {
      status: "false"
    };
    if (_0x4baec9.length > 1 && !_0x39f91d.isBot && _0x219875 && _0x219875.status !== "false" && _0x219875.words) {
      var _0x4e66ac = _0x219875.words.split(",") || [];
      let _0x2298c9 = false;
      _0x4e66ac.map(async _0x5e94de => {
        if (_0x39f91d.isAdmin || !global.SmdOfficial || global.SmdOfficial != "yes") {
          return;
        }
        let _0x520e96 = new RegExp("\\b" + _0x5e94de?.trim() + "\\b", "ig");
        let _0x1ae0c5 = _0x47409a.toLowerCase();
        if (!_0x2298c9 && _0x5e94de && _0x520e96.test(_0x1ae0c5)) {
          _0x2298c9 = true;
          await sleep(500);
          try {
            var _0x3dc4df = "";
            if (_0x219875.status === "warn") {
              let _0x5f3cee = {
                reason: "For using Bad Word",
                chat: _0x39f91d.metadata?.subject || "PRIVATE",
                warnedby: tlang().title,
                date: _0x39f91d.date
              };
              _0xea5278 = _0xea5278 ? _0xea5278 : await warn.addwarn(_0x39f91d.sender, _0x39f91d.chat, _0x5f3cee);
              if (_0xea5278.status) {
                _0x3dc4df = "\n*Warns you for using badWord!!*\n";
              }
            }
            if (_0x39f91d.isBotAdmin) {
              await _0x39f91d.send("*[BAD WORD DETECTED] Hey @" + _0x39f91d.senderNum + "* " + _0x3dc4df + " *Deleting your message from chat!*\n", {
                mentions: [_0x39f91d.sender]
              }, "asta", _0x39f91d);
              await _0x39f91d.delete();
            } else {
              await _0x39f91d.reply("*_[BAD WORD DETECTED] provide admin to take action!_*", {
                mentions: [_0x39f91d.sender]
              });
            }
          } catch (_0x44e136) {
            console.log("Error From Bad Words : ", _0x44e136);
          }
        }
      });
    }
    if (_0xea5278) {
      let _0x4cb16b = parseInt(global.warncount) || 3;
      if (_0xea5278.warning >= _0x4cb16b) {
        if (_0x39f91d.isGroup) {
          if (_0x39f91d.isBotAdmin) {
            await _0x39f91d.send("*_Hey @" + _0x39f91d.senderNum + " Kicking you from group!_*\n*_Because Your warn limit exceed!_*", {
              mentions: [_0x39f91d.sender]
            });
            await _0x39f91d.bot.groupParticipantsUpdate(_0x39f91d.chat, [_0x39f91d.sender], "remove");
          }
        } else {
          await _0x39f91d.send("*_Hey @" + _0x39f91d.senderNum + " Blocking you!_*\n*_Because Your warn limit exceed!_*", {
            mentions: [_0x39f91d.sender]
          });
          await _0x39f91d.bot.updateBlockStatus(_0x39f91d.sender, "block");
        }
      }
    }
    try {
      if (!global.SmdOfficial || _0x39f91d.mtype === "reactionMessage") {
        return;
      }
      let _0x294e10 = (await groupdb.findOne({
        id: _0x39f91d.chat
      })) || {
        chatbot: "false"
      };
      if (!bott || chatbotCount >= 10) {
        bott = (await bot_.findOne({
          id: "bot_" + _0x39f91d.user
        })) || {
          chatbot: "false"
        };
      } else {
        chatbotCount++;
      }
      let _0x3f3751 = bott && bott.chatbot && bott.chatbot == "true" ? "true" : _0x294e10.chatbot || "false";
      if (_0x3f3751 === "true" && !_0x250d65 && !_0x39f91d.isBot && _0x39f91d.text) {
        let _0x4c0917 = !_0x39f91d.isGroup ? _0x39f91d.user : _0x39f91d.quoted ? _0x39f91d.quoted.sender : _0x39f91d.mentionedJid[0] || false;
        if (_0x39f91d.isGroup && _0x4c0917 && !_0x39f91d.checkBot(_0x4c0917)) {
          return;
        }
        let {
          data: _0x1a5d20
        } = await axios.get("http://api.brainshop.ai/get?bid=175685&key=Pg8Wu8mrDQjfr0uv&uid=[" + _0x39f91d.senderNum + "]&msg=[" + _0x47409a + "]");
        if (_0x1a5d20 && _0x1a5d20.cnt) {
          _0x39f91d.send(_0x1a5d20.cnt, {}, "asta", _0x39f91d);
        } else {
          "";
        }
      }
    } catch (_0x418db7) {
      console.log("Error From ChatBot : ", _0x418db7);
    }
  } catch (_0x4eac84) {
    console.log("Group Settings error in command.main() \n", _0x4eac84);
  }
});
let users = {};
let user_warns = {};
smd({
  group: "add"
}, async (_0x28d76c, {
  Void: _0x4dedb6
}) => {
  try {
    let _0x3a7fc2 = await groupdb.findOne({
      id: _0x28d76c.chat
    });
    if (!_0x3a7fc2 || !_0x28d76c.isGroup || _0x3a7fc2.botenable !== "true" || _0x28d76c.blockJid || _0x28d76c.fromMe) {
      return;
    }
    let _0x21c5eb = _0x3a7fc2 && _0x3a7fc2.welcome ? _0x3a7fc2.welcome : "false";
    let _0x3fc86e = _0x3a7fc2 && _0x3a7fc2.antifake ? _0x3a7fc2.antifake.toLowerCase() : "false";
    let _0x5dd590 = _0x3fc86e.split(",");
    const _0xdb6223 = _0x5dd590.some(_0x25ffc0 => _0x28d76c.user.startsWith(_0x25ffc0));
    if (_0x3fc86e !== "false" && !_0xdb6223 && !_0x28d76c.isCreator) {
      if (_0x28d76c.isBotAdmin) {
        try {
          await _0x28d76c.kick();
          return await sendWelcome(_0x28d76c, "*[ANTIFAKE START] @User kicked automaticaly!* @pp");
        } catch (_0x52d6df) {
          await _0x28d76c.error(" Can't kick user in antifake\n❲❒❳ GROUP: " + _0x28d76c.metadata.subject + "\n❲❒❳ ERROR: " + _0x52d6df + "\n", _0x52d6df, false);
        }
      } else {
        await _0x28d76c.send("*[ANTI_FAKE ERROR] Need admin role to kick fake users!!*");
      }
    } else if (_0x21c5eb === "true") {
      await sendWelcome(_0x28d76c, _0x3a7fc2.welcometext);
    }
  } catch (_0x476537) {
    console.log("Error From Welcome : ", _0x476537);
  }
});
smd({
  group: "remove"
}, async (_0x1b9988, {
  Void: _0xcb3386
}) => {
  try {
    let _0xa3ec6 = (await groupdb.findOne({
      id: _0x1b9988.chat
    })) || false;
    if (!_0x1b9988 || !_0xa3ec6 || !_0x1b9988.isGroup || _0xa3ec6.botenable !== "true" || _0x1b9988.blockJid || _0x1b9988.fromMe) {
      return;
    }
    let _0x9f4c7b = _0xa3ec6 && _0xa3ec6.goodbye ? _0xa3ec6.goodbye : "false";
    if (_0x9f4c7b === "true") {
      await sendWelcome(_0x1b9988, _0xa3ec6.goodbyetext);
    }
  } catch (_0x442765) {
    console.log("Error From Goodbye : ", _0x442765);
  }
});
smd({
  group: "promote"
}, async (_0x482975, {
  Void: _0x3481d2
}) => {
  try {
    let _0x390d91 = (await groupdb.findOne({
      id: _0x482975.chat
    })) || false;
    if (!_0x390d91 || !_0x482975.isGroup || _0x390d91.botenable !== "true" || _0x482975.blockJid) {
      return;
    }
    if (!user_warns[_0x482975.sender]) {
      user_warns[_0x482975.sender] = {
        [_0x482975.action]: 1
      };
    } else {
      user_warns[_0x482975.sender][_0x482975.action]++;
    }
    let _0x4124fa;
    if (_0x390d91.antipromote == "true" && !_0x482975.isCreator) {
      _0x4124fa = _0x482975.isBotAdmin ? false : true;
      if (users[_0x482975.sender] && users[_0x482975.sender].previous_Action === "antidemote") {
        delete users[_0x482975.sender];
        return;
      }
      if (_0x482975.isBotAdmin) {
        try {
          await _0x482975.demote();
          users[_0x482975.sender] = {
            previous_Action: "antipromote"
          };
          if (user_warns[_0x482975.sender][_0x482975.action] > 2) {
            return;
          }
          return await sendWelcome(_0x482975, "*[ANTIPROMOTE START] @User Demoted Automatically!* @pp ");
        } catch (_0x5ae38b) {
          await _0x482975.error(" Can't demote user in antipromote\n❲❒❳ GROUP: " + _0x482975.metadata.subject + "\n❲❒❳ ERROR: " + _0x5ae38b + "\n", _0x5ae38b, false);
        }
      }
    }
    if (_0x390d91.pdm == "true" || _0x4124fa) {
      if (user_warns[_0x482975.sender][_0x482975.action] > 2) {
        return;
      }
      var _0x218901 = " *[SOMEONE PROMOTE HERE]*\n" + (_0x4124fa ? "*Note : _I'm Not Admin Here, So I Can't Demote Someone while Anti_Promote Activated_*" : "") + "\n           \n  ❲❒❳ *User:* _@user_\n❲❒❳ *Position:* _Member -> Admin_ @pp\n  ❲❒❳ *Total Members:* _@count_Members_\n❲❒❳ *Group Name:* @gname\n\n\n" + Config.caption;
      return await sendWelcome(_0x482975, _0x218901);
    }
  } catch (_0x3a436e) {
    console.log("Error From Promote : ", _0x3a436e);
  }
});
smd({
  group: "demote"
}, async (_0x2b38a5, {
  Void: _0x4676d7
}) => {
  try {
    let _0x1273fa = (await groupdb.findOne({
      id: _0x2b38a5.chat
    })) || false;
    if (!_0x1273fa || !_0x2b38a5.isGroup || _0x1273fa.botenable !== "true" || _0x2b38a5.blockJid) {
      return;
    }
    if (!user_warns[_0x2b38a5.sender]) {
      user_warns[_0x2b38a5.sender] = {
        [_0x2b38a5.action]: 1
      };
    } else {
      user_warns[_0x2b38a5.sender][_0x2b38a5.action]++;
    }
    let _0x5878b4;
    if (_0x1273fa.antidemote == "true" && !_0x2b38a5.isCreator) {
      _0x5878b4 = _0x2b38a5.isBotAdmin ? false : true;
      if (users[_0x2b38a5.sender] && users[_0x2b38a5.sender].previous_Action === "antipromote") {
        delete users[_0x2b38a5.sender];
        return;
      }
      if (_0x2b38a5.isBotAdmin) {
        try {
          await _0x2b38a5.promote();
          users[_0x2b38a5.sender] = {
            previous_Action: "antidemote"
          };
          if (user_warns[_0x2b38a5.sender][_0x2b38a5.action] > 2) {
            return;
          }
          return await sendWelcome(_0x2b38a5, "*[ANTIPROMOTE START] User promote automatically!* @pp ");
        } catch (_0x275310) {
          await _0x2b38a5.error(" Can't promote user in antidemote\n❲❒❳ GROUP: " + _0x2b38a5.metadata.subject + "\n❲❒❳ ERROR: " + _0x275310 + "\n", _0x275310, false);
        }
      }
    }
    if (_0x1273fa.pdm == "true" || _0x5878b4) {
      if (user_warns[_0x2b38a5.sender][_0x2b38a5.action] > 2) {
        return;
      }
      var _0x168c92 = " *[SOMEONE DEMOTE HERE]*\n  " + (_0x5878b4 ? "*Note : _I'm Not Admin Here, So I Can't promote Someone while Anti_Demote Activated_*" : "") + "\n\n  ❲❒❳ *User:* _@user_\n❲❒❳ *Position:* _Admin -> Member_ @pp\n  ❲❒❳ *Total Members:* _@count_Members_\n❲❒❳ *Group Name:* @gname\n  \n\n" + Config.caption;
      return await sendWelcome(_0x2b38a5, _0x168c92);
    }
  } catch (_0x3ef55d) {
    console.log("Error From Demote : ", _0x3ef55d);
  }
});
/*
{
   pattern: "groupsettings",
   type: "notes",
}
*/