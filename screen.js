//https://codedump.io/share/umYcNju9TDVO/1/copy-paste-big-dictionary-into-chrome-console
//209
function cap(index) {
    var player, title, state = "ready",
        url = "http://localhost:8000/";
    if (!window.image) {
        var image = document.createElement("img");
        document.body.appendChild(image);
        window.image = image;
        var folder = document.querySelectorAll(".ant-menu-submenu-title");
        folder.forEach(function(e,i){
	  var evt = document.createEvent('MouseEvents');
	    evt.initEvent('click', true, false);
	    e.dispatchEvent(evt);
        });
    }
    
    var list = document.querySelectorAll(".ant-menu-item");
    // document.documentElement.childNodes[1].childNodes[0].childNodes[0].childNodes[0].style.display = "none"
    document.body.childNodes[0].childNodes[0].childNodes[0].style.display = "none"
    //隐藏滚动条
    document.documentElement.style.overflow = "hidden";
    //取消宽度限制
    var layout = document.querySelector(".ant-layout-content div");
    layout.style.width = "100%";
    layout.style.padding = "0";
    //使用最大空间
    var ct = document.querySelector(".ant-row div")
    ct.className = "ant-col-md-24";
    //隐藏视频标题
    var player_title = ct.querySelector("div");
    player_title.style.display = "none";
    //设置播放器包裹标签高度
    var player_wraper = ct.querySelector("div + div");
    var player_height = "768px";
    player_wraper.style.height = player_height;
    index = index || 0;

    function start() {
        var evt = document.createEvent('MouseEvents');
        evt.initEvent('click', true, false);
        list[index].dispatchEvent(evt);
	var chapter = list[index].parentNode.previousSibling.innerText;
        var li = list[index].querySelector("p");
        li.childNodes.forEach(function (e, i) {
            //文本子节点
            if (e.nodeType == 3) {
                title = chapter + "-" + e.textContent;
            }
        });
        index++;
    }
    //当触发播放事件时，FLASH尝试调用JS函数
    window.s2j_onVideoPlay = function () {
        if ("ready" === state) {
            state = "play";
            var obj = document.querySelector('.polyvFlashObject');
            obj.style.height = player_height;
            var embed = document.querySelector("object");
            embed.height = 768;
            player = polyvObject.getPlayer(obj.id);
            // player.j2s_banUI();
            console.log(new Date(),index,title,"第一次播放缓存！")
        } else if ("over" === state) {
            state = "replay";
            window.image.src = url + "start/" + encodeURIComponent(title);
            console.log(new Date(),index,title,"第二次播放，开始录屏！")
        }

    }

    //视频播放结束后，会调用此函数
    window.s2j_onPlayOver = function () {
        if ("play" === state) {
            state = "over";
            console.log(new Date(),index,title,"重新播放视频！")
            player.j2s_resumeVideo();
        } else if ("replay" === state) {
            window.image.src = url + "stop";
            state = "ready";
            console.log(new Date(),index,title,"结束录屏！")
            start();
        }
    }
    setTimeout(start,3000);
}
