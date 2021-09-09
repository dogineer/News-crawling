const getData = () => {
    onMenu()
    Scroll_Top()
    var n = document.querySelector('input[name="time"]:checked').value
    var p = document.querySelector('input[id="page_num"]:checked').value

    for(let i=0; i<=9; i++){
        var reset = document.getElementById("title"+i);
        reset.innerHTML="";
        var reset = document.getElementById("company"+i);
        reset.innerHTML="";
        var reset = document.getElementById("url"+i);
        reset.innerHTML="";
        var reset = document.getElementById("vola"+i+"_url");
        reset.innerHTML="";
        var reset = document.getElementById("sameNews"+i);
        reset.innerHTML="";
        var reset = document.getElementById("sameNewsUrl"+i);
        reset.innerHTML="";
        var reset = document.getElementById("time"+i);
        reset.innerHTML="";
    }
    
    const word = document.getElementById("keyword").value;

    fetch('/getNews/'+n, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
            },
        body: JSON.stringify({
            keyword : word,
            page    : p
        })
    })
        .then(function(res){
            if(res.ok){
                console.log('POST success.');
                return res.json()
            }
            throw new Error('POST failed.');
            })
        .then(data => {
        for(let i=0; i<=9; i++){
            const News_title       = document.getElementById("title"+i);
            const News_url         = document.getElementById("url"+i);
            const News_company     = document.getElementById("company"+i);
            const News_sameNews    = document.getElementById("sameNews"+i);
            const News_vola        = document.getElementById("vola"+i+"_url");
            const News_sameNewsUrl = document.getElementById("sameNewsUrl"+i);
            const News_time        = document.getElementById("time"+i);

            News_title.append(data[i].title);
            News_company.append(data[i].company);
            News_sameNews.append(data[i].sameNews);
            News_time.append(data[i].time);

            News_url.append(data[i].url);
            News_vola.append("https://vo.la/q/?u="+data[i].url);
            News_sameNewsUrl.append("https://search.naver.com/search.naver"+data[i].sameNewsUrl);
        }
    })
    .catch(function(error){
    console.log(error);
    })
}