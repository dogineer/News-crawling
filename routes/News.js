var express = require('express');
var router = express.Router();
const fs = require("fs");
const cron = require("node-cron");
const cors = require('cors');

const app = express();
app.use(cors());

/* ========== < async get News > ==========*/


/* ========== < async get News > ==========*/

/* ========== < rest apis > ========== */
// post : "keyword"

router.get("/1",async(req,res)=> {
    const { get1stList } = require("../Controller/1st.js");

    async function get1stAsync() {
        const News_data = await get1stList();
        console.log("News = ", News_data);
        console.log(NewsJSON.text);
    }

    const NewsJSON = fs.readFile("./newsList_1.json");
    res.send(NewsJSON);
}) // end 1st

router.get("/2",async(req,res)=> {
    const { get2stList } = require("../Controller/2st.js");

    async function get2stAsync() {
        const News_data = await get2stList();
        console.log("News = ", News_data);
        console.log(NewsJSON.text);
    }
    cron.schedule("*/1 * * * *", async () => {
        console.log("running a task every two minutes");
        await get2stAsync();
    }); // end 2st

    const NewsJSON = fs.readFileSync("./newsList_2.json");
    res.send(NewsJSON);
})  // end 2st

router.get("/3",async(req,res)=> {
    const { get3stList } = require("../Controller/3st.js");

    async function get3stAsync() {
        const News_data = await get3stList();
        console.log("News = ", News_data);
        console.log(NewsJSON.text);
    }
    cron.schedule("*/1 * * * *", async () => {
        console.log("running a task every two minutes");
        await get3stAsync();
    }); // end 3st

    const NewsJSON = fs.readFileSync("./newsList_3.json");
    res.send(NewsJSON);
}) //end 3st

router.post('/0', function (req, res) {
    response = {
        kewWord:req.body.keyWord
    };
    console.log(response);
    res.end(JSON.stringify(response));
})

module.exports = router;

/* ========== < End rest apis > ========== */