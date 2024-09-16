//import * as baileys from '@adiwajshing/baileys'
let baileys = (await import(global.baileys)).default

let handler = async (m, { conn, text }) => {
    let [, code] = text.match(/chat\.whatsapp\.com\/(?:invite\/)?([0-9A-Za-z]{20,24})/i) || []
    if (!code) throw `> *◞❕◜ قـم بـي الـرسـال رابـط الـمـجـمـوعـو*`
    
    let res = await conn.query({ tag: 'iq', attrs: { type: 'get', xmlns: 'w:g2', to: '@g.us' }, content: [{ tag: 'invite', attrs: { code } }] }),
        data = extractGroupMetadata(res),
        txt = Object.keys(data).map(v => `*${v.capitalize()}:* ${data[v]}`).join('\n'),
        pp = await conn.profilePictureUrl(data.id, 'image').catch(console.error)
        
    let groupinfo = `╮⭒⭒ ─── ┈ ★ ★ ★ ┈ ── ⭒⭒╭

> *◞الـمـعـرف◜: ${data.id}*

> *◞الـاسـم◜: ${data.subject}*

> *◞تـاريـخ الـانـشـاء◜: ${data.creation}*

> *◞مـنـشـئ الـمـجـمـوعـة◜: ${data.owner}*

╯⭒⭒ ─── ┈ ★ ★ ★ ┈ ── ⭒⭒╰
> لـنـسـخ الـوصـف اضـغـط عـلـي 

    

> COPY `
        
    await conn.sendButton(m.chat, groupinfo, `*نسخ الوصف 👇*`, pp, [['📜¦ الـاوامـر ¦📜', '/menu']], `https://www.whatsapp.com/otp/copy/${data.desc}`, null, null, m)
}

handler.command = /^(المالك)$/i

export default handler
handler.owner = false

const extractGroupMetadata = (result) => {
    const group = baileys.getBinaryNodeChild(result, 'group')
    const descChild = baileys.getBinaryNodeChild(group, 'description')
    let desc
    if (descChild) desc = baileys.getBinaryNodeChild(descChild, 'body')?.content
    const metadata = {
        id: group.attrs.id.includes('@') ? group.attrs.id : baileys.jidEncode(group.attrs.id, 'g.us'),
        subject: group.attrs.subject,
        creation: new Date(+group.attrs.creation * 1000).toLocaleString('ar', { timeZone: 'America/Los_Angeles' }),
        owner: group.attrs.creator ? 'wa.me/' + baileys.jidNormalizedUser(group.attrs.creator).split('@')[0] : undefined,
        desc
    }
    return metadata
}
