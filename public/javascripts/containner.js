function Scroll_Top() {
    window.scrollTo({top:0, left:0, behavior:'smooth'});
}

function url_link(val){
    var str = document.getElementsByTagName('td')[val].childNodes[0].nodeValue;
    window.open(str);
}

/* ===== Modal =====*/
function modal() {
    const open = () =>{
        document.querySelector(".modal").classList.remove("hidden");
    }

    const close = () =>{
        document.querySelector(".modal").classList.add("hidden");
    }
	document.querySelector(".M_Btn").addEventListener("click", open);
    document.querySelector(".bg").addEventListener("click", close);

    var reset = document.getElementById("today");
        reset.innerHTML="";

    const today = document.getElementById("today");
    const day = new Date();
    const month = day.getMonth() + 1;
    const date = day.getDate();
    
    var d = day.getDay();

    switch (d) {
        case 0:d="일"; break;
        case 1:d="월"; break;
        case 2:d="화"; break;
        case 3:d="수"; break;
        case 4:d="목"; break;
        case 5:d="금"; break;
        case 6:d="토"; break;
    }

    var n = document.querySelector('input[name="time"]:checked').value;
    if (n==1) {
        today.append(month+"월 "+date+"일 "+d+"요일 뉴스투데이");
    }
    else if (n==2) {
        today.append(month+"월 "+date+"일 "+d+"요일 7시 40분 이후 14시 현재까지 실시간 언론 모니터링 현황입니다.");
    }
    else {
        today.append(month+"월 "+date+"일 "+d+"요일 14시 이후 17시 현재까지 실시간 언론 모니터링 현황입니다.");
    }
}
/* ===== End Modal =====*/

function add_content(id, i){

    var box = document.getElementById("num"+i);
        box.style.backgroundColor = "rgb(143, 253, 158)";

    const pre = document.createElement("pre");
    const content = document.getElementById("content_"+id);
    const title = document.getElementById("title"+i).innerHTML;
    const a = document.getElementById("company"+i).innerHTML;
    const company = a.replace("네이버뉴스", "");
    const b = document.getElementById("sameNews"+i).innerHTML;
    const c = b.replace("관련뉴스", "");
    const sameNews = c.replace("전체보기", "");
    const vola = document.getElementById("vola"+i+"_url").innerHTML;

    pre.setAttribute("id", "pre"+vola);
    pre.textContent = title+" ("+company+" 외"+sameNews+")" + '\n'+vola+'\n\n';
    content.appendChild(pre);
}

function del_all(){

    var reset = document.getElementById("content_1");
        reset.innerHTML="-해당없음-";

    var reset = document.getElementById("content_2");
        reset.innerHTML="-해당없음-";

    var reset = document.getElementById("content_3");
        reset.innerHTML="-해당없음-";

    alert("삭제되었습니다.")
}

function del_content(i){
    var box = document.getElementById("num"+i);
        box.style.backgroundColor = "white";

    const vola = document.getElementById("vola"+i+"_url").innerHTML;

    var reset = document.getElementById("pre"+vola);
        reset.remove();
}

/* ===== Top_memu =====*/
function onMenu(){
	document.querySelector(".TopMenu").classList.toggle("menuon"); 
}

function downMenu(){
	document.querySelector(".TopMenu").classList.toggle("menuon"); 
}
/* ===== End Top_memu =====*/