import fs from 'fs'
import acrcloud from 'acrcloud'

let acr = new acrcloud({
    host: 'identify-eu-west-1.acrcloud.com',
    access_key: 'c33c767d683f78bd17d4bd4991955d81',
    access_secret: 'bvgaIAEtADBTbLwiPGYlxupWqkNGIjT7J9Ag2vIu'
})

let handler = async (m) => {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (/audio|video/.test(mime)) {
        if ((q.msg || q).seconds > 20) return m.reply('> *◞❕◜ ان الـفـيـديـو/الـصـورة تـزيـد عـن 20/10 ثـوان*')
        await conn.reply(m.chat, wait, m)
        let media = await q.download()
        let ext = mime.split('/')[1]
        fs.writeFileSync(`./tmp/${m.sender}.${ext}`, media)
        let res = await acr.identify(fs.readFileSync(`./tmp/${m.sender}.${ext}`))
        let { code, msg } = res.status
        if (code !== 0) throw msg
        let { title, artists, album, genres, release_date } = res.metadata.music[0]
        let txt = `
نتائج البحث:
╮⭒⭒ ─── ┈ ★ ★ ★ ┈ ── ⭒⭒╭
> *◞اسـم الـاغـنـيـة🎚◜: ${title}*
> *◞الـمـغـنـي🎙◜: ${artists !== undefined ? artists.map(v => v.name).join(', ') : 'لم يتم العثور عليه'}*
> *◞الـألـبـوم📙◜: ${album.name || 'لم يتم العثور عليه'}*
> *◞الـنـوع🗺◜: ${genres !== undefined ? genres.map(v => v.name).join(', ') : 'لم يتم العثور عليه'}*
> *◞تـاريـخ الـإصـدار📅◜: ${release_date || 'لم يتم العثور عليه'}*
 ╯⭒⭒ ─── ┈ ★ ★ ★ ┈ ── ⭒⭒╰`.trim()
        fs.unlinkSync(`./tmp/${m.sender}.${ext}`)
        m.reply(txt)
    } else {
        throw '> *◞❕◜ قـم بـي الـاشـارة عـلـي الـفـيـديـو/الـصـوت*'
    }
}

handler.command = /^موسيقي|quemusicaes|whatmusic$/i
export default handler
