'use strict'
const cheerio = require('cheerio')
const got = require('got')
const ai = require('../ai')
const fs = require('fs')
const dbPath = `${__dirname}/lastest-news.json`

const getAppleNews = (chatIDs)=> {
  const lastestNews = JSON.parse(fs.readFileSync(dbPath).toString())

  got.get('http://m.appledaily.com.tw/realtimenews/section/new')
    .then((res)=> {
      const $ = cheerio.load(res.body)
      const $news = $('.art.type-1')

      const lasestLink = $news.eq(0).find('>a').attr('href')
      if (lasestLink === lastestNews.link) return

      $news.each((idx, ne)=> {
        const $new = $(ne)
        const link = $new.find('>a').attr('href')
        const title = $new.find('.art-title').text()
        const time = $new.find('.time').text()
        const views = $new.find('.views').text()

        if (idx === 0) {
          lastestNews.link = link

          fs.writeFile(dbPath, JSON.stringify(lastestNews))
        }

        const msg = `[最新新聞快報] ${time}
${title}
views: ${views}
http://www.appledaily.com.tw${link}        
        `
        chatIDs.forEach((id)=> {
          ai.sendMessage(id, msg)
        })
      })
    })
}

const getAppleNewsPolling = (minutes, chatIDs)=> {
  getAppleNews(chatIDs)
  setTimeout(()=> {
    getAppleNewsPolling(minutes)
  }, minutes * 1000 * 60)
}

module.exports = getAppleNewsPolling
