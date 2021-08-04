const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

const keyWord = "원자력";
const searchUrl = "https://search.naver.com/search.naver?where=news&query=" + keyWord + "&sm=tab_opt&sort=0&photo=0&field=0&pd=4&ds=&de=&docid=&related=0&mynews=0&office_type=0&office_section_code=0&news_office_checked=&nso=so%3Ar%2Cp%3A1d&is_sug_officeid=0"
console.log(searchUrl);

const getNewList = async () => {
try {
    const url = "https://search.naver.com/search.naver?where=news&query=%EC%9B%90%EC%9E%90%EB%A0%A5&sm=tab_opt&sort=0&photo=0&field=0&pd=4&ds=&de=&docid=&related=0&mynews=0&office_type=0&office_section_code=0&news_office_checked=&nso=so%3Ar%2Cp%3A1d&is_sug_officeid=0" 
    console.log("get url run ...");
    console.log("원자력 2차 검색 결과중 ...");
    return await axios.get(url);
} catch (error) {
    console.error(error);
    }
};

const dataPath = "./newsList_2.json"

getNewList()
.then(html => {
    let ulList = [];
    
    const $ = cheerio.load(html.data);
    const $bodyList = $("ul.list_news").children("li")
    $bodyList.each(function(i, elem) {
    ulList[i] = {
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
    console.log("news on json file !! \n");
    

module.exports = { getNewList };