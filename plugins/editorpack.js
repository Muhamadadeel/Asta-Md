const {
   smd,
   getBuffer,
   lang,
   botpic,
   photoEditor,
   prefix,
   Config
 } = require("../lib");
 const util = require("util");
 const fs = require("fs-extra");
 const axios = require("axios");
 const fetch = require("node-fetch");
 const {
   TelegraPh
 } = require("../lib/scraper");
 let cap = Config.caption || "";
 smd({
   pattern: "ad",
   type: "editor",
   filename: __filename,
   info: "add view pic Editor."
 }, async (_0x4bdaef, _0x54b253, {
   smd: _0x15dac4
 }) => {
   try {
     await photoEditor(_0x4bdaef, _0x15dac4, cap);
   } catch (_0x1a0b1a) {
     await _0x4bdaef.error(_0x1a0b1a + "\n\ncommand: " + _0x15dac4, _0x1a0b1a);
   }
 });
 smd({
   pattern: "jail",
   type: "editor",
   filename: __filename,
   info: "jail pic Editor."
 }, async (_0x39af23, _0x27af63, {
   smd: _0x200133
 }) => {
   try {
     await photoEditor(_0x39af23, _0x200133, cap);
   } catch (_0x498fcd) {
     await _0x39af23.error(_0x498fcd + "\n\ncommand: " + _0x200133, _0x498fcd);
   }
 });
 smd({
   pattern: "uncover",
   type: "editor",
   filename: __filename,
   info: "pic Editor."
 }, async (_0x42eba7, _0x500336, {
   smd: _0x581007
 }) => {
   try {
     await photoEditor(_0x42eba7, _0x581007, cap);
   } catch (_0x508214) {
     await _0x42eba7.error(_0x508214 + "\n\ncommand: " + _0x581007, _0x508214);
   }
 });
 smd({
   pattern: "clown",
   type: "editor",
   filename: __filename,
   info: "pic Editor."
 }, async (_0x4c3cda, _0x2debe7, {
   smd: _0x9e1832
 }) => {
   try {
     await photoEditor(_0x4c3cda, _0x9e1832, cap);
   } catch (_0x1efde7) {
     await _0x4c3cda.error(_0x1efde7 + "\n\ncommand: " + _0x9e1832, _0x1efde7);
   }
 });
 smd({
   pattern: "mnm",
   type: "editor",
   filename: __filename,
   info: "pic Editor."
 }, async (_0x287198, _0x18c684, {
   smd: _0x43f7ea
 }) => {
   try {
     await photoEditor(_0x287198, _0x43f7ea, cap);
   } catch (_0x16aee2) {
     await _0x287198.error(_0x16aee2 + "\n\ncommand: " + _0x43f7ea, _0x16aee2);
   }
 });
 smd({
   pattern: "pet",
   type: "editor",
   filename: __filename,
   info: "pic Editor."
 }, async (_0x25ffdd, _0x68f059, {
   smd: _0x40c11d
 }) => {
   try {
     await photoEditor(_0x25ffdd, _0x40c11d, cap);
   } catch (_0x7ea4a5) {
     await _0x25ffdd.error(_0x7ea4a5 + "\n\ncommand: " + _0x40c11d, _0x7ea4a5);
   }
 });
 smd({
   pattern: "greyscale",
   type: "editor",
   filename: __filename,
   info: "pic Editor."
 }, async (_0x4399ac, _0x231bbe, {
   smd: _0x21c93a
 }) => {
   try {
     await photoEditor(_0x4399ac, _0x21c93a, cap);
   } catch (_0x36a8d4) {
     await _0x4399ac.error(_0x36a8d4 + "\n\ncommand: " + _0x21c93a, _0x36a8d4);
   }
 });
 smd({
   pattern: "invert",
   type: "editor",
   filename: __filename,
   info: "pic Editor."
 }, async (_0x5a0dbe, _0x44c635, {
   smd: _0x4e4012
 }) => {
   try {
     await photoEditor(_0x5a0dbe, _0x4e4012, cap);
   } catch (_0x1f7431) {
     await _0x5a0dbe.error(_0x1f7431 + "\n\ncommand: " + _0x4e4012, _0x1f7431);
   }
 });
 smd({
   pattern: "blur",
   type: "editor",
   filename: __filename,
   info: "pic Editor."
 }, async (_0x29ce3f, _0x4fb6a1, {
   smd: _0x2e3c40
 }) => {
   try {
     await photoEditor(_0x29ce3f, _0x2e3c40, cap);
   } catch (_0x3c1bff) {
     await _0x29ce3f.error(_0x3c1bff + "\n\ncommand: " + _0x2e3c40, _0x3c1bff);
   }
 });
 smd({
   pattern: "drip",
   type: "editor",
   filename: __filename,
   info: "pic Editor."
 }, async (_0x6fbd1d, _0x4b6227, {
   smd: _0x162dd2
 }) => {
   try {
     await photoEditor(_0x6fbd1d, _0x162dd2, cap);
   } catch (_0x150b93) {
     await _0x6fbd1d.error(_0x150b93 + "\n\ncommand: " + _0x162dd2, _0x150b93);
   }
 });
 smd({
   pattern: "colorify",
   type: "editor",
   filename: __filename,
   info: "pic Editor."
 }, async (_0x4dba4a, _0xbd8e3d, {
   smd: _0x5c26af
 }) => {
   try {
     await photoEditor(_0x4dba4a, _0x5c26af, cap);
   } catch (_0x4e4aea) {
     await _0x4dba4a.error(_0x4e4aea + "\n\ncommand: " + _0x5c26af, _0x4e4aea);
   }
 });
 smd({
   pattern: "gun",
   type: "editor",
   filename: __filename,
   info: "pic Editor."
 }, async (_0x503c9a, _0x1d4d24, {
   smd: _0x5384f4
 }) => {
   try {
     await photoEditor(_0x503c9a, _0x5384f4, cap);
   } catch (_0x36c5af) {
     await _0x503c9a.error(_0x36c5af + "\n\ncommand: " + _0x5384f4, _0x36c5af);
   }
 });
 smd({
   pattern: "wanted",
   type: "editor",
   filename: __filename,
   info: "pic Editor."
 }, async (_0x206282, _0x320948, {
   smd: _0x173bc1
 }) => {
   try {
     await photoEditor(_0x206282, _0x173bc1, cap);
   } catch (_0x75b2ac) {
     await _0x206282.error(_0x75b2ac + "\n\ncommand: " + _0x173bc1, _0x75b2ac);
   }
 });