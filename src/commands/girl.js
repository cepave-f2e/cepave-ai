'use strict'
const ai = require('../ai')
const got = require('got')
const util = require('../utils')
const cheerio = require('cheerio')
const random = util.random
module.exports = (msg, match) => {
  const fromId = msg.from.id
  const chatId = msg.chat.id

  const girl = [
    function xuiteHotGirlWall() {
      // origin from http://photo.xuite.net/_hgwall
      const xuiteRequestBody = {
        start: random(0, 908),
        limit: 1,
        category: 'all',
        act: 'getBeauty'
      }

      got.post('http://photo.xuite.net/_hgwall/list/getbeauty',{
          body: xuiteRequestBody
        })
        .then((res) => {
          const imgURL = JSON.parse(res.body).data[0]['3']
          ai.sendMessage(chatId, imgURL)
        })
    },
    function ck101() {
      got.get(`http://ck101.com/forum-1345-${random(1, 10)}.html`)
        .then((res) => {
          const $ = cheerio.load(res.body)
          const $girlList = $('.waterfall > li')
          const gLeng = $girlList.length

          const aSectionLink = $girlList.eq(random(0, gLeng - 1)).find('> .cl_box > a').attr('href')

          return got.get(aSectionLink)
        })
        .then((res) => {
          const $ = cheerio.load(res.body)
          const imgs = $('#lightboxwrap img[file]')
          const imgsLeng = imgs.length
          const imgURL = imgs.eq(random(0, imgsLeng - 1)).attr('file')

          ai.sendMessage(chatId, imgURL)
        })
    },
    function cuteJpTumblr() {
      got.get('http://cu-te-jp.tumblr.com/')
        .then((res) => {
          const $ = cheerio.load(res.body)
          const totalPages = $('.page-info').text().split(' ').pop()
          const randomPage = random(1, totalPages)

          got.get(`http://cu-te-jp.tumblr.com/page/${randomPage}`)
            .then((res) => {
              const $ = cheerio.load(res.body)
              const randomImage = random(0, $('.photo-post-photo').length - 1)
              const imgURL = $('.photo-post-photo').eq(randomImage).attr('data-retina')

              ai.sendMessage(chatId, imgURL)
            })
        })
    }
  ]

  girl[random(0,2)]()
}
