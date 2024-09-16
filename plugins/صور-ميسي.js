import axios from 'axios'
let handler = async(m, { conn, usedPrefix, command }) => {
let res = (await axios.get(`https://raw.githubusercontent.com/BrunoSobrino/TheMystic-Bot-MD/master/src/JSON/Messi.json`)).data  
let url = await res[Math.floor(res.length * Math.random())]
//conn.sendFile(m.chat, url, 'error.jpg', `*Messi 🇦🇷*`, m)}
conn.sendButton(m.chat, "> *انـكـرا مـيـسـي انـكـرا مـيـسـي*", wm, url, [['⬅️¦ الـمـزيـد ¦➡️', `${usedPrefix + command}`]], null, null, m)}
handler.help = ['ميسي']
handler.tags = ['صور']
handler.command = /^(ميسي)$/i
export default handler
