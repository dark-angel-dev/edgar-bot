import jimp from 'jimp';

const handler = async (m, { conn, usedPrefix, isPrems }) => {
  try {
    const { exp, limit, level } = global.db.data.users[m.sender];
    const totalUsers = Object.keys(global.db.data.users).length;
    const more = String.fromCharCode(8206);
    const readMore = more.repeat(850);
    const taguser = '@' + m.sender.split('@s.whatsapp.net')[0];

    m.react('🤩');

    const str = `▢ *مرحبا 👋,* ${taguser}

_*< معلومات JEEN-MD />*_

▢ *عدد المستخدمين : ${totalUsers}*

_*< حسابك />*_

▢ *المستوى :* ${level}
▢ *اكس بي :* ${exp}
▢ *الجواهر :* ${limit}
▢ *عضوية :* ${isPrems ? '✅' : '❌'}
▢ *تسجيل :* ${true ? '✅' : '❌'}\n${readMore}

_*< الاوامر />*_
┏━━━━━━━━━━┓
┣ *السلام عليكم , ${taguser}*
┗━━━━━━━━━━┛
┏━━━━━━━━━━┓
┣ ඬ⃟ 🤖 _${usedPrefix}apk_
┣ ඬ⃟ 🤖 _${usedPrefix}ig_
┣ ඬ⃟ 🤖 _${usedPrefix}pinterest_
┣ ඬ⃟ 🤖 _${usedPrefix}fb_
┣ ඬ⃟ 🤖 _${usedPrefix}play_
┣ ඬ⃟ 🤖 _${usedPrefix}tiktok_
┏━━━━━━━━━━┓
┣ الذكاء الاصطناعي
┗━━━━━━━━━━┛
┣ ඬ⃟ 🤖 _${usedPrefix}chatgpt_
┣ ඬ⃟ 🤖 _${usedPrefix}jeenmaker_
┣ ඬ⃟ 🤖 _${usedPrefix}aivoice_
┏━━━━━━━━━━┓
┣ *القران*
┗━━━━━━━━━━┛
┣ ඬ⃟ 🤖 _${usedPrefix}ayati_
┣ ඬ⃟ 🤖 _${usedPrefix}asmaeallah_
┏━━━━━━━━━━┓
┣ *كتب و صور*
┗━━━━━━━━━━┛
┣ ඬ⃟ 🤖 _${usedPrefix}hd_
┣ ඬ⃟ 🤖 _${usedPrefix}recolor_
┣ ඬ⃟ 🤖 _${usedPrefix}tofanime_
┣ ඬ⃟ 🤖 _${usedPrefix}logo_
┣ ඬ⃟ 🤖 _${usedPrefix}animestory_
┣ ඬ⃟ 🤖 _${usedPrefix}kora_
┣ ඬ⃟ 🤖 _${usedPrefix}kitab_
┣ ඬ⃟ 🤖 _${usedPrefix}tozombie
┣ ඬ⃟ 🤖 _${usedPrefix}kick_

┏━━━━━━━━━━┓
┣ *القنوات*
┗━━━━━━━━━━┛
┏━━━━━━━━━━┓
instagram.com/majnon._.98

instagram.com/_ayoub_x5

https://whatsapp.com/channel/0029VaiJnhbD38CbP5YcSK0K


┗━━━━━━━━━┛`.trim().replace('%readMore', readMore);

    // Generate the menu image
    const image = await generateMenuImage();
    const caption = str; // Caption for the image

    if (m.isGroup) {
      conn.sendMessage(m.chat, { image: image, caption: caption }, { quoted: m });
    } else {
      conn.sendMessage(m.chat, { image: image, caption: caption }, { quoted: m });
    }
  } catch (error) {
    conn.reply(m.chat, '*[ ℹ️ ] Este menu tiene un error interno, por lo cual no fue posible enviarlo.*', m);
    console.error(error); // Log the error for debugging purposes
  }
};

handler.command = /^(menu)$/i;

export default handler;

async function generateMenuImage() {
  try {
    // Load the base image using JIMP
    const baseImage = await jimp.read('https://telegra.ph/file/60c85ff0cd62ca1972213.jpg'); // Replace with your image URL
    baseImage.resize(500, 500); // Resize the image if necessary

    // Add text to the image
    const font = await jimp.loadFont(jimp.FONT_SANS_16_WHITE); // You can change the font and size as needed
    baseImage.print(font, 10, 10, {
      text: ' by majnon ',
      alignmentX: jimp.HORIZONTAL_ALIGN_CENTER,
      alignmentY: jimp.VERTICAL_ALIGN_MIDDLE
    }, 480); // Adjust text position and width

    // Convert the image to buffer
    return await baseImage.getBufferAsync(jimp.MIME_JPEG);
  } catch (e) {
    console.error(e);
    return null;
  }
}