const handler = async (m, {isOwner, isAdmin, conn, text, participants, args, command, usedPrefix}) => {
  if (usedPrefix == 'a' || usedPrefix == 'A') return;
  if (!(isAdmin || isOwner)) {
    global.dfail('admin', m, conn);
    return;
  }
  const pesan = args.join` `;
  const colombia = `> *◞الـرســ💌ـالـة◜:* ${pesan}`;
  let teks = `> *‹◝مـنـشـن جــ🎡ـمـاعـي⌯*\n${colombia}\n╮⭒⭒ ─── ┈ ★ ★ ★ ┈ ── ⭒⭒╭\n> *◞الاعـضـاء👥◜*\n`;
  for (const mem of participants) {
    teks += `> @${mem.id.split('@')[0]}\n`;
  }
  conn.sendMessage(m.chat, {text: teks, mentions: participants.map((a) => a.id)} );
};
handler.help = ['منشن *<الرسالة>*', 'اجتماع *<الرسالة>*'];
handler.tags = ['جروب'];
handler.command = ['منشن', 'اجتماع'];
handler.admin = true;
handler.group = true;
export default handler;