const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys");
const pino = require('pino');
const readline = require("readline");
const NodeCache = require('node-cache');

// إعداد التخزين المؤقت لحالة الحماية
const protectionCache = new NodeCache();
const color = ['\x1b[31m', '\x1b[32m', '\x1b[33m', '\x1b[34m', '\x1b[35m', '\x1b[36m', '\x1b[37m', '\x1b[90m'];
const xeonColor = color[Math.floor(Math.random() * color.length)];
const xColor = '\x1b[0m';

async function XeonProject() {
    const { state, saveCreds } = await useMultiFileAuthState('./80/session');
    const bot = makeWASocket({
        logger: pino({ level: "silent" }),
        printQRInTerminal: false,
        auth: state,
        connectTimeoutMs: 60000,
        keepAliveIntervalMs: 10000,
        emitOwnEvents: true,
        markOnlineOnConnect: true,
        browser: ["Ubuntu", "Chrome", "20.0.04"],
    });

    bot.ev.on('messages.upsert', async ({ messages }) => {
        const m = messages[0];
        const text = m.message?.conversation?.trim();
        const command = text.split(' ')[0].substring(1); // استخراج الأمر
        const args = text.substring(command.length + 2).trim(); // بقية النص

        const isProtected = protectionCache.get('protected');
        if (isProtected && command === 'spam') {
            await bot.sendMessage(m.key.remoteJid, { text: '❌ الحماية مفعلة، لا يمكنك استخدام هذا الأمر!' });
            return;
        }

        switch (command) {
            case 'spam':
                await startPairingNotification(bot, m, args);
                break;
            case 'delete':
                await cancelNotification(bot, m);
                break;
            case 'protect':
                enableProtection(bot, m);
                break;
            case 'unprotect':
                disableProtection(bot, m);
                break;
            default:
                await bot.sendMessage(m.key.remoteJid, { text: '❓ أمر غير معروف!' });
                break;
        }
    });

    bot.ev.on('creds.update', saveCreds);
}

async function startPairingNotification(bot, m, phoneNumber) {
    try {
        if (!/^\d+$/.test(phoneNumber)) throw '⚠️ الرقم المدخل غير صحيح!';
        const code = await bot.requestPairingCode(phoneNumber);
        const formattedCode = code?.match(/.{1,4}/g)?.join('-') || code;
        await bot.sendMessage(m.key.remoteJid, { text: `🔑 كود الربط: ${formattedCode}` });
    } catch (error) {
        await bot.sendMessage(m.key.remoteJid, { text: `⚠️ حدث خطأ: ${error.message}` });
    }
}

async function cancelNotification(bot, m) {
    await bot.sendMessage(m.key.remoteJid, { text: '🚫 تم إلغاء الإشعار.' });
}

function enableProtection(bot, m) {
    protectionCache.set('protected', true);
    bot.sendMessage(m.key.remoteJid, { text: '🛡️ تم تفعيل الحماية.' });
}

function disableProtection(bot, m) {
    protectionCache.del('protected');
    bot.sendMessage(m.key.remoteJid, { text: '🔓 تم إلغاء الحماية.' });
}

console.log(xeonColor + `═╗ ╦┌─┐┌─┐┌┐┌  ╔═╗┌─┐┌─┐┌┬┐  ╔╗╔┌─┐┌┬┐┬┌─┐┬┌─┐┌─┐┌┬┐┬┌─┐┌┐┌
╔╩╦╝├┤ │ ││││  ╚═╗├─┘├─┤│││  ║║║│ │ │ │├┤ ││  ├─┤ │ ││ ││││
╩ ╚═└─┘└─┘┘└┘  ╚═╝┴  ┴ ┴┴ ┴  ╝╚╝└─┘ ┴ ┴└  ┴└─┘┴ ┴ ┴ ┴└─┘┘└┘` + xColor);

XeonProject().catch((err) => console.error(err));
