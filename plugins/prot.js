const { proto } = require('@whiskeysockets/baileys')

const msg = { conversation: 'some text' }
const jid = '123@newsletter'

const plaintext = proto.Message.encode(msg).finish()
const plaintextNode = {
	tag: 'plaintext',
	attrs: {},
	content: plaintext
}
const node = {
	tag: 'message',
	attrs: { to: jid, type: 'text' },
	content: [plaintextNode]
}

return sock.query(node)