const handler = async (m, {conn, participants, usedPrefix, command}) => {
if (!global.db.data.settings[conn.user.jid].restrict) throw `${lenguajeGB['smsAvisoAG']()}${lenguajeGB['smsSoloOwner']()}`
let texto = `${lenguajeGB['smskick1']()}${usedPrefix + command} @0*`
if (!m.mentionedJid[0] && !m.quoted) return m.reply(texto, m.chat, {mentions: conn.parseMention(texto)})
if (m.mentionedJid.includes(conn.user.jid)) return
const user = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender
const owr = m.chat.split`-`[0]
await conn.groupParticipantsUpdate(m.chat, [user], 'remove')}
handler.command = /^(طرد|اطرده|اطردة|برا|انقلع)$/i
handler.admin = true
handler.group = true
handler.botAdmin = true
export default handler
