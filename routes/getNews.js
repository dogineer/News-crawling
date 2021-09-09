var express = require('express');
var router = express.Router();
const cors = require('cors');
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();
app.use(cors());

router.post("/1",async(req,res)=> {
    console.log("\n1차 라우터 포스트 : ",req.body.keyword);
    console.log("\n1차 라우터 페이지 : ",req.body.page);

    let getNewList = () => {
        try {
            console.log("get url run ...");
            let keyWord=req.body.keyword;
            let page=req.body.page;
            var enc = encodeURI(keyWord);
            let searchUrl="https://search.naver.com/search.naver?where=news&query="+enc+"&sm=tab_opt&sort=0&photo=0&field=0&pd=4&ds=&de=&docid=&related=0&mynews=0&office_type=0&office_section_code=0&news_office_checked=&nso=so:r,p:1d,a:all&start="+page;
            console.log( "[",keyWord,"] 1차 검색 결과중 ...");

            return axios.get(searchUrl);
        } catch (error) {
            console.error(error);
            }
    };

    getNewList()
        .then(html => {
            let ulList = [];
            const $ = cheerio.load(html.data);
            const $bodyList = $("ul.list_news").children("li")
            $bodyList.each(function(i, elem) {
            ulList[i] =
                {
                    title: $(this).find('.news_wrap .news_area a.news_tit').text(),
                    url: $(this).find('.news_wrap .news_area a.news_tit').attr('href'),
                    company : $(this).find('.news_wrap .news_area .news_info .info_group .press').text(),
                    sameNews :  $(this).find('a.news_more').text(),
                    sameNewsUrl :  $(this).find('a.news_more').attr('href'),
                    time :  $(this).find('.news_wrap .news_area .news_info .info_group span.info').text(),
                };
            })
            const data = ulList.filter(n => n.title);
            return data;
        })
        .then(response => {
            const News = JSON.stringify(response)
            res.send(News)
        })

}) // end 1st

router.post("/2",async(req,res)=> {
    console.log("\n2차 라우터 포스트 : ",req.body.keyword);
    console.log("\n2차 라우터 페이지 : ",req.body.page);

    let getNewList = () => {
        try {
            console.log("get url run ...");
            let keyWord=req.body.keyword;
            let page=req.body.page;
            var enc = encodeURI(keyWord);
            let searchUrl="https://search.naver.com/search.naver?where=news&query="+enc+"&sm=tab_opt&sort=0&photo=0&field=0&pd=12&ds=&de=&docid=&related=0&mynews=0&office_type=0&office_section_code=0&news_office_checked=&nso=so:r,p:1d,a:all&start="+page;
            console.log( "[",keyWord,"] 2차 검색 결과중 ...");

            return axios.get(searchUrl);
        } catch (error) {

            console.error(error);
            }
    };

    getNewList()
        .then(res => {
            let ulList = [];
            const $ = cheerio.load(res.data);
            const $bodyList = $("ul.list_news").children("li")
            $bodyList.each(function(i, elem) {
            ulList[i] =
                {
                    title:      $(this).find('.news_wrap .news_area a.news_tit').text(),
                    url:        $(this).find('.news_wrap .news_area a.news_tit').attr('href'),
                    company :   $(this).find('.news_wrap .news_area .news_info .info_group a').text(),
                    sameNews :  $(this).find('a.news_more').text(),
                };
            })
            const data = ulList.filter(n => n.title);
            return data;
        })
        .then(response => {
            const News = JSON.stringify(response)
            res.send(News)
        })
})  // end 2st

router.post("/3",async(req,res)=> {
    console.log("\n3차 라우터 포스트 : ",req.body.keyword);
    console.log("\n3차 라우터 페이지 : ",req.body.page);

    let getNewList = () => {
        try {
            console.log("get url run ...");
            let keyWord=req.body.keyword;
            let page=req.body.page;
            var enc = encodeURI(keyWord);
            let searchUrl="https://search.naver.com/search.naver?where=news&query="+enc+"&sm=tab_opt&sort=0&photo=0&field=0&pd=9&ds=&de=&docid=&related=0&mynews=0&office_type=0&office_section_code=0&news_office_checked=&nso=so:r,p:1d,a:all&start="+page;
            console.log( "[",keyWord,"] 3차 검색 결과중 ...");

            return axios.get(searchUrl);
        } catch (error) {

            console.error(error);
            }
    };

    getNewList()
        .then(res => {
            let ulList = [];
            const $ = cheerio.load(res.data);
            const $bodyList = $("ul.list_news").children("li")
            $bodyList.each(function(i, elem) {
            ulList[i] =
                {
                    title: $(this).find('.news_wrap .news_area a.news_tit').text(),
                    url: $(this).find('.news_wrap .news_area a.news_tit').attr('href'),
                    company : $(this).find('.news_wrap .news_area .news_info .info_group a').text(),
                    sameNews :  $(this).find('a.news_more').text(),
                };
            })
            const data = ulList.filter(n => n.title);
            return data;
        })
        .then(response => {
            const News = JSON.stringify(response)
            res.send(News)
        })
}) //end 3st

module.exports = router;

/* ========== < End rest apis > ========== */
