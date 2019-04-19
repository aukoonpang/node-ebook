const Base64 = require('js-base64').Base64
const md5 = require('js-md5')
//qs对字符串进行处理，使其变成post请求中可以识别的键值对形式
const qs = require('qs')
const http = require('http')
const mp3FilePath = require('./const').mp3FilePath
const resUrl = require('./const').resUrl
const fs = require('fs')

function createVoice(req, res) {
    const text = req.query.text
    const lang = req.query.lang
    //const text = '测试科大讯飞在线语音合成api的功能，合成成功后返回正确语音返回给客户端'
    //const lang = 'cn'

    let engineType = 'intp65'
    if (lang.toLowerCase() === 'en') {
        engineType = 'intp65_en'
    }
    let speed = '30'
    const voiceParam = {
        auf: 'audio/L16;rate=16000',
        aue: 'lame',
        voice_name: 'xiaoyan',
        speed,
        volum: '50',
        pitch: '50',
        engine_type: engineType,
        text_type: 'text'
    }

    const currentTime = Math.floor(new Date().getTime() / 1000)
    const appId = '5cb98e74'
    const apiKey = 'b1703d75e716a147122b9f533c4a2152'
    const xParam = Base64.encode(JSON.stringify(voiceParam))
    const checkSum = md5(apiKey + currentTime + xParam)
    const headers = {}
    headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'
    headers['X-Param'] = xParam
    headers['X-Appid'] = appId
    headers['X-CurTime'] = currentTime
    headers['X-CheckSum'] = checkSum
    headers['X-Real-Ip'] = '127.0.0.1'
    const data = qs.stringify({
        text: text
    })
    const options = {
        host: 'api.xfyun.cn',
        path: '/v1/service/v1/tts',
        method: 'POST',
        headers
    }
    const request = http.request(options, response => {
        let mp3 = ''
        const contentLength = response.headers['content-length']
        response.setEncoding('binary')
        response.on('data', data => {
            mp3 += data
            const progress = data.length / contentLength * 100
            const percent = parseInt(progress.toFixed(2))

        })
        response.on('end', () => {
            const contentType = response.headers['content-type']
            if (contentType === 'text/html') {
                res.send(mp3)
            } else if (contentType === 'text/plain') {
                res.send(mp3)
            } else {
                const fileName = new Date().getTime()
                const filePath = `${mp3FilePath}\\${fileName}.mp3`
                const downloadUrl = `${resUrl}/mp3/${fileName}.mp3`
                fs.writeFile(filePath, mp3, 'binary', err => {
                    if (err) {
                        res.json({
                            error: 1,
                            msg: '下载失败'
                        })
                    } else {
                        res.json({
                            error: 0,
                            msg: '下载成功',
                            path: downloadUrl
                        })
                    }
                })
                console.log(filePath, downloadUrl)
            }
        })
    })
    request.write(data)
    request.end()
}

module.exports = createVoice