import { Styles } from "../lib/Styles.js";
import _0x2be120 from "fs";
import _0x5c3eaf from "node-fetch";
import { xpRange } from "../lib/levelling.js";
import _0x1e2cc9 from "moment-timezone";
const vV19 = {
  before: "\n *Salam* : %name\n *uptime* : %uptime\n%readMore",
  header: "â”â”â”â¬£ â‰¼ %category ",
  body: "â”ƒ âœŽ %cmd ",
  footer: "â”—â”â”â¬£  ",
  after: "*Ø±Ø¬Ø§Ø¡ Ù„Ø§ ØªØ­Ø§ÙˆÙ„ Ø§Ù„Ø¥ØªØµØ§Ù„ Ø¨Ø§Ù„Ø¨ÙˆØª Ù„Ø£Ù†Ù‡ Ø³ÙŠØªÙ… Ø­Ø¸Ø±Ùƒ Ø¥Ø°Ø§ Ù„Ù… ØªÙÙ‡Ù… Ø´ÙŠØ¦Ø§ ÙÙŠ Ø§Ù„Ø¨ÙˆØª Ø±Ø§Ø³Ù„ ØµØ§Ø­Ø¨Ù‡ ÙÙŠ Ø§Ù„Ø£Ù†Ø³ØªØºØ±Ø§Ù…*"
};
const vF4 = async (p7, {
  conn: _0x4752fe,
  usedPrefix: _0xe442a9,
  isOwner: _0x84df3e,
  isPremium: _0x33994c
}) => {
  const v20 = Object.values(global.plugins).filter(p8 => _0x84df3e ? !p8?.disabled : !p8?.disabled && !p8?.owner).map(p9 => {
    return {
      help: Array.isArray(p9?.help) ? p9?.help : p9?.help ? [p9?.help] : "",
      tags: Array.isArray(p9?.tags) ? p9?.tags[0] : p9?.tags ? [p9?.tags] : "",
      prefix: p9?.customPrefix ? true : false,
      limit: p9?.limit,
      premium: p9?.premium,
      enabled: !p9?.disabled,
      owner: _0x84df3e ? p9.owner : false
    };
  });
  let v21 = {};
  v20.forEach(p10 => {
    if (p10.tags && p10.tags.length) {
      Object.assign(v21, {
        [p10.tags]: Array.isArray(p10.tags) ? p10.tags.map(p11 => p11.charAt(p11.length >= 1 ? 0 : p11.length).toUpperCase() + p11.slice(1)) : [p10.tags][0]
      });
    }
  });
  _0x4752fe.menu = _0x4752fe.menu ? _0x4752fe.menu : {};
  const v22 = _0x4752fe.before || vV19.before;
  const v23 = _0x4752fe.header || vV19.header;
  const v24 = _0x4752fe.body || vV19.body;
  const v25 = _0x4752fe.footer || vV19.footer;
  const v26 = _0x4752fe.after || vV19.after;
  let v27 = [v22, ...Object.keys(v21).sort().map(p12 => {
    return v23.replace(/%category/g, "" + v21[p12] + " â‰½\n" + [...v20.filter(p13 => p13.tags && p13.tags.includes(p12) && p13.help && !p13.owner).map(p14 => {
      return p14.help.map(p15 => {
        return v24.replace(/%cmd/g, p14.prefix ? p15 : "%P" + p15).replace(/%islimit/g, p14.limit ? "(ðŸ…›)" : "").replace(/%isPremium/g, p14.premium ? "(ðŸ…Ÿ)" : "").trim();
      }).join("\n");
    }), v25].join("\n"));
  }), v26].join("\n");
  v27 = typeof _0x4752fe.menu === "string" ? _0x4752fe.menu : typeof _0x4752fe.menu === "object" ? v27 : "";
  const v28 = await _0x4752fe.getName(p7.sender);
  let v29 = _0x1e2cc9.tz("Africa/Casablanca").format("HH");
  let v30 = _0x1e2cc9.tz("Africa/Casablanca").format("mm");
  let v31 = _0x1e2cc9.tz("Africa/Casablanca").format("ss");
  let v32 = _0x1e2cc9.tz("Africa/Casablanca").format("HH:mm:ss");
  let v33 = _0x1e2cc9.tz("Africa/Casablanca").format("HH:mm:ss");
  let v34 = v29 + "." + v30 + "." + v31;
  const v35 = String.fromCharCode(8206);
  const v36 = v35.repeat(4001);
  const v37 = "https://files.catbox.moe/h9l4zk.mp3";
  let v38;
  if (process.send) {
    process.send("uptime");
    v38 = (await new Promise(p16 => {
      process.once("message", p16);
      setTimeout(p16, 1000);
    })) * 1000;
  }
  const vClockString = f2(v38);
  let v39 = "" + vClockString;
  let v40 = new Date(new Date() + 3600000);
  let v41 = "ar";
  let v43 = v40.toLocaleDateString(v41, {
    weekday: "long"
  });
  let v45 = v40.toLocaleDateString(v41, {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
  let v46 = Intl.DateTimeFormat(v41 + "-TN-u-ca-islamic", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(v40);
  let v48 = v40.toLocaleTimeString(v41, {
    hour: "numeric",
    minute: "numeric",
    second: "numeric"
  });
  let v49 = "" + f();
  let v50 = "@" + p7.sender.replace(/@.+/, "");
  let v51 = "" + (_0x84df3e ? "Owner" : _0x33994c ? "Premium" : "Free");
  let v52 = "@" + p7.sender.replace(/@.+/, "");
  let v53 = global.opts.self ? "Private" : "Publik";
  const v54 = {
    "%": "%",
    P: _0xe442a9,
    name: v28,
    wktuwib: v34,
    readMore: v36,
    tagname: v52,
    mode: v53,
    selamat: v49,
    uptime: v39,
    stats: v51,
    week: v43,
    date: v45,
    tagme: v50,
    dateIslamic: v46,
    who: "@" + p7.sender.replace(/[^0-9]/g, "")
  };
  v27 = v27.replace(new RegExp("%(" + Object.keys(v54).sort((p17, p18) => p18.length - p17.length).join("|") + ")", "g"), (p19, p20) => "" + v54[p20]);
  const v55 = {
    url: v37
  };
  const v56 = {
    audio: v55,
    ptt: true,
    mimetype: "audio/mpeg",
    fileName: "vn.mp3",
    waveform: [0, 3, 58, 44, 35, 32, 2, 4, 31, 35, 44, 34, 48, 13, 0, 54, 49, 40, 1, 44, 50, 51, 16, 0, 3, 40, 39, 46, 3, 42, 38, 44, 46, 0, 0, 47, 0, 0, 46, 19, 20, 48, 43, 49, 0, 0, 39, 40, 31, 18, 29, 17, 25, 37, 51, 22, 37, 34, 19, 11, 17, 12, 16, 19]
  };
  await _0x4752fe.sendMessage(p7.chat, {
    text: Styles(v27),
    mentions: [p7.sender],
    contextInfo: {
      forwardingScore: 9999999,
      isForwarded: false,
      mentionedJid: [p7.sender],
      externalAdReply: {
        showAdAttribution: false,
        renderLargerThumbnail: true,
        title: "Ø£Ù†Ø§ Ø³ÙŠÙ„Ø§Ù†Ø§ Ø±ÙÙŠÙ‚ØªÙƒ Ø§Ù„Ø°ÙƒÙŠØ© ðŸŒ¼ Ø¥Ø¶ØºØ· Ù‡Ù†Ø§ Ù„Ù…ØªØ§Ø¨Ø¹Ø© ØµØ§Ù†Ø¹ Ø§Ù„Ø¨ÙˆØª ÙÙŠ Ù‚Ù†Ø§ØªÙ‡ ",
        containsAutoReply: true,
        mediaType: 1,
        thumbnailUrl: "https://files.catbox.moe/6yol3y.jpg",
        mediaUrl: "",
        sourceUrl: "https://whatsapp.com/channel/0029VaX4b6J7DAWqt3Hhu01A"
      }
    }
  }, {
    quoted: p7
  }).then(() => _0x4752fe.sendMessage(p7.chat, v56, {
    quoted: p7
  }));
};
vF4.help = ["menu"];
vF4.command = ["allmenu", "menu", "help", "list"];
export default vF4;
function f() {
  const v58 = _0x1e2cc9.tz("Africa/Casablanca").format("HH");
  let v59 = "â™¥";
  if (v58 >= 4) {
    v59 = "(ØµØ¨Ø§Ø­ Ø§Ù„Ø®ÙŠØ±)";
  }
  if (v58 >= 10) {
    v59 = "(ØµØ¨Ø§Ø­ Ø§Ù„Ø®ÙŠØ±)";
  }
  if (v58 >= 15) {
    v59 = "(Ù…Ø³Ø§Ø¡ Ø§Ù„Ø®ÙŠØ±)";
  }
  if (v58 >= 18) {
    v59 = "(Ù…Ø³Ø§Ø¡ Ø§Ù„Ø®ÙŠØ±)";
  }
  return v59;
}
function f2(p21) {
  let v60 = isNaN(p21) ? "--" : Math.floor(p21 / 3600000);
  let v61 = isNaN(p21) ? "--" : Math.floor(p21 / 60000) % 60;
  let v62 = isNaN(p21) ? "--" : Math.floor(p21 / 1000) % 60;
  return [v60, " H ", v61, " M ", v62, " S "].map(p22 => p22.toString().padStart(2, 0)).join("");
}
function f3(p23) {
  return p23[Math.floor(Math.random() * p23.length)];
}