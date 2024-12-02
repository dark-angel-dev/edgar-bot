import _0x355fd8 from "axios";
let handler = async (_0x7c0d90, {
  conn: _0xd6c9f0,
  args: _0x26bedc,
  usedPrefix: _0x2a12f3,
  command: _0x44fb6b
}) => {
  let _0x2de0ef;
  if (_0x26bedc.length >= 1) {
    _0x2de0ef = _0x26bedc.slice(0).join(" ");
  } else if (_0x7c0d90.quoted && _0x7c0d90.quoted.text) {
    _0x2de0ef = _0x7c0d90.quoted.text;
  } else {
    throw "Ø§Ù„Ø°ÙƒØ§Ø¡ Ø§Ù„Ø§ØµØ·Ù†Ø§Ø¹ÙŠ : ÙŠÙ…ÙƒÙ†Ùƒ Ø§Ù† ØªØªØ®ÙŠÙ„ Ø§ÙŠ ØµÙˆØ±Ø© Ø«Ù… Ø§Ø·Ù„Ø¨ Ù…Ù† Ø§Ù„Ø¨ÙˆØª Ø§Ù† ÙŠØ±Ø³Ù…Ù‡Ø§ Ù…Ø«Ø§Ù„ Ù†ÙƒØªØ¨ Ù„Ù‡ Ø§Ù† ÙŠØªØ®ÙŠÙ„ ØµÙˆØ±Ø© ÙØªØ§Ø© ØªÙ„Ø¹Ø¨ Ù…Ø¹ Ù‚Ø·Ø© Ù†ÙƒØªØ¨ Ù‡ÙƒØ°Ø§ : \n\n*.photoleap* girl play with black cat";
  }
  await _0x7c0d90.reply("> Ø§Ù†ØªØ¸Ø± ....");
  try {
    let _0x5a90f9 = await textToImage(_0x2de0ef);
    if (_0x5a90f9) {
      await _0xd6c9f0.sendFile(_0x7c0d90.chat, _0x5a90f9.result_url, "", "instagram.com/noureddine_ouafy\nØµÙ€Ù€ÙˆØ±Ø© Ù„Ù€Ù€Ù€:\n " + _0x2de0ef, _0x7c0d90, false, {
        mentions: [_0x7c0d90.sender]
      });
    }
  } catch (_0x3d9139) {
    await _0x7c0d90.reply("ÙˆÙ‚Ø¹Øª Ù…Ø´ÙƒÙ„Ø©â™¥");
  }
};
handler.help = ["photoleap"];
handler.tags = ["drawing"];
handler.command = /^(photoleap)$/i;
handler.premium = false;
export default handler;
async function textToImage(_0x5993d2) {
  try {
    const {
      data: _0x42f739
    } = await _0x355fd8.get("https://tti.photoleapapp.com/api/v1/generate?prompt=" + _0x5993d2);
    return _0x42f739;
  } catch (_0x2860d2) {
    return null;
  }
}