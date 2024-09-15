let handler = async (m, { conn, participants, groupMetadata, args, usedPrefix, text, command }) => {
  if (!text) return m.reply(`> *◞❕◜ قـم بـي كـتـابـة رسـالـة لـي اسـتـدعـاء بـهـا الـمـشـرفـيـن*`)
const pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => null) || './src/admins.jpg'
const groupAdmins = participants.filter(p => p.admin)
const listAdmin = groupAdmins.map((v, i) => `*» ${i + 1}. @${v.id.split('@')[0]}*`).join('\n')
const owner = groupMetadata.owner || groupAdmins.find(p => p.admin === 'superadmin')?.id || m.chat.split`-`[0] + '@s.whatsapp.net'
let pesan = args.join` `
let oi = `${lenguajeGB.smsAddB5()} _${pesan}_`

let textoA = 
`
╮⭒⭒ ─── ┈ ★ ★ ★ ┈ ── ⭒⭒╭
> *◞الـرسـالـة📩◜: ${oi}*
⭒⭒ ── ┈ ★ ◞${vs}◜ ★ ┈ ─ ⭒⭒`

let textoB = 
`${listAdmin}

⛔ ${lenguajeGB.smsAddB4()} ⛔`.trim()
await conn.sendFile(m.chat, pp, 'error.jpg', textoA + textoB, m, false, { mentions: [...groupAdmins.map(v => v.id), owner] })
//await conn.sendButton(m.chat, textoA, textoB, pp, [[lenguajeGB.smsConMenu(), `.menu`]], m, { mentions: [...groupAdmins.map(v => v.id), owner] })
}
handler.command = /^(المشرفين|مشرفين|ادمنز)$/i
handler.group = true
export default handler
