import axios from 'axios'
let handler = async(m, { conn, usedPrefix, command }) => {
let cristiano = (await axios.get(`https://raw.githubusercontent.com/BrunoSobrino/TheMystic-Bot-MD/master/src/JSON/CristianoRonaldo.json`)).data  
let ronaldo = await cristiano[Math.floor(cristiano.length * Math.random())]
//conn.sendFile(m.chat, ronaldo, 'error.jpg', `*Siiiuuuuuu*`, m)}
conn.sendButton(m.chat, "> *سووووووووووو*", wm, ronaldo, [['⬅️¦ الـمـزيـد ¦➡️', `${usedPrefix + command}`]], null, null, m)}
handler.help = ['رونالدو', 'كرستيانو']
handler.tags = ['صور']
handler.command = /^(رونالدو|كرستيانو)$/i
export default handler
