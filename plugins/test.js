import makeWASocket from '@whiskeysockets/baileys';
import { Boom } from '@hapi/boom';

let activePairings = new Map(); // لتخزين الجلسات النشطة
let protectedNumbers = new Set(); // الأرقام المحمية من الإشعارات

// معالجة الأوامر: pair، unpair، protect، unprotect
let handler = async (m, { conn, text, command }) => {
    let [number] = text.trim().split(/\s+/);

    if (!number) throw '*مثال* :\n*.pair* 1234567890';
    if (!/^\d+$/.test(number)) throw '*خطأ* :\n*الرقم المدخل غير صحيح*';

    let jid = `${number}@s.whatsapp.net`;

    switch (command) {
        case 'pair':
            if (protectedNumbers.has(jid)) {
                return m.reply(`🚫 الرقم ${number} محمي من الإشعارات.`);
            }
            if (activePairings.has(jid)) {
                return m.reply(`🔄 الإشعارات قيد الإرسال بالفعل لهذا الرقم: ${number}`);
            }

            activePairings.set(jid, true);
            m.reply(`✅ تم بدء إرسال إشعارات الربط إلى ${number}.`);
            sendPairingNotifications(conn, jid);
            break;

        case 'unpair':
            if (activePairings.has(jid)) {
                activePairings.delete(jid);
                return m.reply(`🛑 تم إيقاف إشعارات الربط إلى ${number}.`);
            } else {
                return m.reply(`⚠️ لا توجد إشعارات قيد الإرسال لهذا الرقم: ${number}.`);
            }

        case 'protect':
            if (protectedNumbers.has(jid)) {
                return m.reply(`⚠️ الرقم ${number} محمي بالفعل.`);
            }
            protectedNumbers.add(jid);
            m.reply(`✅ تم حماية الرقم ${number} من الإشعارات.`);
            break;

        case 'unprotect':
            if (protectedNumbers.has(jid)) {
                protectedNumbers.delete(jid);
                m.reply(`✅ تم إلغاء حماية الرقم ${number}.`);
            } else {
                return m.reply(`⚠️ الرقم ${number} غير محمي.`);
            }
            break;

        default:
            m.reply('⚠️ أمر غير معروف!');
    }
};

// إرسال إشعارات الربط بشكل مستمر
async function sendPairingNotifications(conn, jid) {
    while (activePairings.has(jid)) {
        try {
            let pairingCode = generatePairingCode(); // توليد كود ربط
            await conn.sendMessage(jid, { text: `🔗 كود الربط: ${pairingCode}` });

            console.log(`تم إرسال كود الربط إلى ${jid}: ${pairingCode}`);
        } catch (error) {
            console.error(`⚠️ خطأ أثناء إرسال إشعار الربط إلى ${jid}:`, error);
        }
        await new Promise((resolve) => setTimeout(resolve, 1000)); // انتظار ثانية واحدة
    }
}

// توليد كود الربط العشوائي
function generatePairingCode() {
    return Math.floor(100000 + Math.random() * 900000).toString(); // رقم من 6 أرقام
}

// إعداد الاتصال باستخدام Baileys
const conn = makeWASocket({
    logger: console,
    printQRInTerminal: true,
});

conn.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === 'close') {
        const shouldReconnect = lastDisconnect.error && lastDisconnect.error.output && lastDisconnect.error.output.statusCode !== 401;
        console.log('Connection closed. Reconnecting...', shouldReconnect);
        if (shouldReconnect) connect(); // إعادة الاتصال
    } else if (connection === 'open') {
        console.log('✅ Connected to WhatsApp');
    }
});

// الأوامر المتاحة
handler.command = handler.help = ['pair', 'unpair', 'protect', 'unprotect'];
handler.tags = ['tools'];

export default handler;
