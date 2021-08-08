const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

let getNewList = async () => {
    try {
        console.log("get url run ...");
        let keyWord=req.body.keyword;
        var enc = encodeURI(keyWord);
        let searchUrl="https://search.naver.com/search.naver?where=news&query="+enc+"&sm=tab_opt&sort=0&photo=0&field=0&pd=4&ds=&de=&docid=&related=0&mynews=0&office_type=0&office_section_code=0&news_office_checked=&nso=so%3Ar%2Cp%3A1d&is_sug_officeid=0"
        console.log( "[",keyWord,"] 1차 검색 결과중 ...");
        
        return await axios.get(searchUrl);
    } catch (error) {

        console.error(error);
        }
};

const dataPath = "./newsList_1.json"

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
            company : $(this).find('.news_wrap .news_area .news_info .info_group a').text(),
        };
    })
    // .then(res => res.json())
    // .then(json => {
    //     console.log(json.data)

    const data = ulList.filter(n => n.title);
    return data;
})
.then(res => {
    fs.writeFileSync(dataPath, JSON.stringify(res))
    console.log("get End \n", res)
    });

module.exports = { getNewList };