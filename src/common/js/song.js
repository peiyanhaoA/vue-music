export default class Song {
    constructor({id, mid, singer, name, album, duration, image, url}){
        this.id = id
        this.mid = mid
        this.singer = singer
        this.name = name
        this.album = album
        this.duration = duration
        this.image = image
        this.url = url
    }
}

export function createSong(musicData){
    return new Song({
        id: musicData.songid,
        mid: musicData.songmid,
        singer: filterSinger(musicData.singer),
        name: musicData.songname,
        album: musicData.albumname,
        duration: musicData.interval,
        image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
        url: `http://dl.stream.qqmusic.qq.com/C4${musicData.songid}.m4a?fromtag=46`
        // url: 'http://dl.stream.qqmusic.qq.com/C400001Qu4I30eVFYb.m4a?vkey=2F1C51774FBE482A696D70FCE535F071B35D3B52B5BECF96E7D7B312028F6138FA71DB8E621C303784DB3EC2E3332BC64AA1D20F37C880F9&guid=2658601480&uin=1901459886&fromtag=66'
    })
}
// http://dl.stream.qqmusic.qq.com/C40000481cWs2JgWe0.m4a?vkey=C9A6967A43B4D8F767DD408F81D2A3F2D7B9FFC4D23347DEF2115542FBB349C2ABC267C4413AB4F8381A44FC08A67A136178EE3F100F73D5&guid=2658601480&uin=1901459886&fromtag=66

function filterSinger(singer){
    let ret = []
    if(!singer){
        return ''
    }

    singer.forEach(s => {
        ret.push(s.name)
    });
    return ret.join('/')
}