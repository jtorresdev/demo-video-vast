
var selectorType = 'class'
var idOrclass = 'article'
var lineBreak = 5
var base_url = '..'

var widthByAttribute = getAttribute('playerWidth')

function getAttribute(attr){
    return document.currentScript.getAttribute(attr)
}

function makeDesktop(){
    var container = document.createElement('div')
    var element = selectorType == 'class' ? document.getElementsByClassName(idOrclass)[0] : document.getElementById(idOrclass)
    var width = widthByAttribute||element.offsetWidth + 'px'
    container.style.width = width
    var height = container.style.width.replace('px', '') * 0.5625 + 'px';
    container.style.height = height
    container.style.overflow = "hidden"

    var playerStyle = document.createElement('link')
        playerStyle.type = "text/css";
        playerStyle.rel = "stylesheet";
        playerStyle.href = "https://cdn.fluidplayer.com/v2/current/fluidplayer.min.css";


    var style = document.createElement('style')
        style.innerHTML = '@font-face{font-family:steelfishEb;src:url(https://www.vidoomy.com/vengadores_desktop/assets/steelfish_eb.otf)}@font-face{font-family:steelfish;src:url(https://www.vidoomy.com/vengadores_desktop/assets/steelfish_rg.ttf)}@font-face{font-family:bahnschrift;src:url(https://www.vidoomy.com/vengadores_desktop/assets/bahnschrift.ttf)}.fluid_video_wrapper{-webkit-transition:width 3s,height 3s,margin 3s;transition:width 3s,height 3s,margin 3s}.avenger{width:115px;float:left;margin:0 5px;cursor:pointer}.avenger:hover>.avenger-text{background:#eb0d0d}.dot{height:15px;width:15px;background-color:#818699;border-radius:50%;display:inline-block;margin:5px 5px 2px 5px;cursor:pointer}.dot-active{background-color:#eb0d0d}.avenger-text{height:110px;width:95px;float:left;background:rgba(0,0,0,.8);margin-top:-5px;color:#fff;padding:10px;-webkit-clip-path:polygon(0 0,100% 0,100% 0,100% 80%,80% 100%,0 100%,0 100%,0 0);clip-path:polygon(0 0,100% 0,100% 0,100% 80%,80% 100%,0 100%,0 100%,0 0);border-top:4px solid #eb0d0d;font-family:Bahnschrift,"Adobe Blank";font-variation-settings:"wght" 400,"wdth" 80;font-size:18px}.avenger-name{position:absolute;bottom:10px;color:#b4b4b4;font-size:14px}#menu ul{font-size:26px;font-family:steelfish;list-style-type:none;display:inline;font-style:italic}#menu ul li{float:left;margin:0 10px;padding:0 10px 5px 10px;text-align:center;cursor:pointer}#menu ul li:hover{border-bottom:5px solid #eb0d0d}#menu ul li a{color:#fff;text-decoration:none}#menu ul li.active{border-bottom:5px solid #eb0d0d}.thumbnail-videos{position:absolute;bottom:0px;left:10px;height:105px}.thumb-video{float:left;margin:0 5px;height:75px;width:140px;background:red;cursor:pointer;overflow:hidden;outline:1px solid #fff}.stopped::after{content:url(https://www.vidoomy.com/vengadores_desktop/assets/play.png);margin:18px auto;display:block;width:40px;height:40px}.currentVideo{outline:3px solid #ac282c!important}.header-container{height:60px;border-bottom:1px solid #e6ebf0;padding:0 45px}.header{width:1260px;height:100%;position:relative;margin:0 auto}.header img{padding:10px 0 0 0}.container{padding:20px 0;position:relative;margin:0 auto;width:1260px;display:block}body{margin:0}'

    var wrapper = document.createElement('div')
        wrapper.className = 'wrapper'
        wrapper.id = 'wrapper'
        wrapper.style = "width:" + width + ";height:" + height + ";position: relative;float: left"

    var bigVideo = document.createElement('div')
        bigVideo.className = 'big-video'

    var video = document.createElement('video')
        video.id = 'video-id'
        video.setAttribute('current-video', '1')
        video.muted = "muted"
        video.autoplay = true

    var source = document.createElement('source')
        source.src = "https://www.vidoomy.com/vengadores_desktop/assets/videos/video1.mp4"
        source.type = "video/mp4"

        video.appendChild(source)
        bigVideo.appendChild(video)
        wrapper.appendChild(bigVideo)

    var thumbnailVideos = document.createElement('div')
        thumbnailVideos.id = "thumbnail-videos"
        thumbnailVideos.className = "thumbnail-videos"

    var thumbVideo1 = document.createElement('div')
        thumbVideo1.id = "thumb-video-1"
        thumbVideo1.className = "thumb-video currentVideo"
        thumbVideo1.setAttribute('data-src', 'https://www.vidoomy.com/vengadores_desktop/assets/videos/video1.mp4')
        thumbVideo1.style = "background-image:url('https://www.vidoomy.com/vengadores_desktop/assets/thumb1.png')";
        thumbnailVideos.appendChild(thumbVideo1)

    var thumbVideo2 = document.createElement('div')
        thumbVideo2.id = "thumb-video-2"
        thumbVideo2.className = "thumb-video stopped"
        thumbVideo2.setAttribute('data-src', 'https://www.vidoomy.com/vengadores_desktop/assets/videos/video2.mp4')
        thumbVideo2.style = "background-image:url('https://www.vidoomy.com/vengadores_desktop/assets/thumb2.png')";
        thumbnailVideos.appendChild(thumbVideo2)

    var thumbVideo3 = document.createElement('div')
        thumbVideo3.id = "thumb-video-3"
        thumbVideo3.className = "thumb-video stopped"
        thumbVideo3.setAttribute('data-src', 'https://www.vidoomy.com/vengadores_desktop/assets/videos/video3.mp4')
        thumbVideo3.style = "background-image:url('https://www.vidoomy.com/vengadores_desktop/assets/thumb3.png')";
        thumbnailVideos.appendChild(thumbVideo3)

        wrapper.appendChild(thumbnailVideos)

        var playerJs = document.createElement('script')

        playerJs.onload = function(){

            var desktopScript = document.createElement('script')
                desktopScript.src = base_url + "/desktop.js"
                desktopScript.setAttribute('playerWidth', width)
                desktopScript.setAttribute('fontSize', '12px')
                desktopScript.setAttribute('shortPlayerWidth', parseInt(width.replace('px', '')) - 300 + 'px')
                container.appendChild(desktopScript)

        }
        
        playerJs.src = 'https://www.vidoomy.com/vengadores_desktop/fluidplayer.min.js'

        container.appendChild(playerStyle)
        container.appendChild(playerJs)
        container.appendChild(style)
        container.appendChild(wrapper)

    var nodeToInsertBefore = element.querySelectorAll('p')[lineBreak]
    nodeToInsertBefore.parentNode.insertBefore(container, nodeToInsertBefore)
}

function makeMobile(){
    var container = document.createElement('div')
    var element = selectorType == 'class' ? document.getElementsByClassName(idOrclass)[0] : document.getElementsById(idOrclass)
    var width = widthByAttribute||element.offsetWidth + 'px'
    container.style.width = width
    var height = container.style.width.replace('px', '') * 0.5625 + 'px';
    container.style.height = height

    var playerStyle = document.createElement('link')
        playerStyle.type = "text/css";
        playerStyle.rel = "stylesheet";
        playerStyle.href = "https://cdn.fluidplayer.com/v2/current/fluidplayer.min.css";


    var style = document.createElement('style')
        style.innerHTML = 'body{margin:0;background:#fff}@font-face{font-family:steelfishEb;src:url(https://www.vidoomy.com/vengadores_desktop/assets/steelfish_eb.otf)}@font-face{font-family:steelfish;src:url(https://www.vidoomy.com/vengadores_desktop/assets/steelfish_rg.ttf)}@font-face{font-family:bahnschrift;src:url(https://www.vidoomy.com/vengadores_desktop/assets/bahnschrift.ttf)}.player{-webkit-transition:width 1s,height 1s,margin 1s,left 2s;transition:width 1s,height 1s,margin 1s,left 2s}.avenger{width:115px;float:left;margin:5px 5px 5px 0;cursor:pointer;position:relative}.avenger:hover>.avenger-text{background:#eb0d0d}.dot{height:15px;width:15px;background-color:#818699;border-radius:50%;display:inline-block;margin:5px 5px 2px 5px;cursor:pointer}.dot-active{background-color:#eb0d0d}.avenger-text{height:90px;width:95px;float:left;background:rgba(0,0,0,.8);margin-top:-5px;color:#fff;padding:10px;-webkit-clip-path:polygon(0 0,100% 0,100% 0,100% 80%,80% 100%,0 100%,0 100%,0 0);clip-path:polygon(0 0,100% 0,100% 0,100% 80%,80% 100%,0 100%,0 100%,0 0);border-top:4px solid #eb0d0d;font-family:Bahnschrift,"Adobe Blank";font-variation-settings:"wght" 400,"wdth" 80;font-size:18px}.avenger-name{position:absolute;bottom:10px;color:#b4b4b4;font-size:12px}#menu ul{font-size:20px;font-family:steelfish;list-style-type:none;display:inline;font-style:italic}#menu ul li{float:left;margin:0 0;padding:0 5px 5px 5px;text-align:center;cursor:pointer}#menu ul li:hover{border-bottom:5px solid #eb0d0d}#menu ul li a{color:#fff;text-decoration:none}#menu ul li.active{border-bottom:5px solid #eb0d0d}.thumbnail-videos{height:60px;padding:15px;margin-top:10px;display:none}.thumb-video{float:left;margin:0 5px;height:60px;width:100px;background:#fff;cursor:pointer;overflow:hidden;outline:1px solid #fff}.stopped::after{content:url(https://www.vidoomy.com/vengadores_desktop/assets/play.png);margin:10px auto;display:block;width:40px;height:40px}.currentVideo{outline:3px solid #ac282c!important}'

    var wrapper = document.createElement('div')
        wrapper.className = 'wrapper'
        wrapper.id = 'wrapper'
        wrapper.style = "width:" + width + ";height:" + height + ";position: relative;float: left;"

    var bigVideo = document.createElement('div')
        bigVideo.className = 'player'
        bigVideo.id = 'player'

    var video = document.createElement('video')
        video.id = 'video-id'
        video.setAttribute('current-video', '1')
        video.muted = "muted"

    var source = document.createElement('source')
        source.src = "https://www.vidoomy.com/vengadores_desktop/assets/videos/video1.mp4"
        source.type = "video/mp4"

        video.appendChild(source)
        bigVideo.appendChild(video)
        wrapper.appendChild(bigVideo)

    var thumbnailVideos = document.createElement('div')
        thumbnailVideos.id = "thumbnail-videos"
        thumbnailVideos.className = "thumbnail-videos"

    var thumbVideo1 = document.createElement('div')
        thumbVideo1.id = "thumb-video-1"
        thumbVideo1.className = "thumb-video currentVideo"
        thumbVideo1.setAttribute('data-src', 'https://www.vidoomy.com/vengadores_desktop/assets/videos/video1.mp4')
        thumbVideo1.style = "background-image:url('https://www.vidoomy.com/vengadores_desktop/assets/thumb1.png')";
        thumbnailVideos.appendChild(thumbVideo1)

    var thumbVideo2 = document.createElement('div')
        thumbVideo2.id = "thumb-video-2"
        thumbVideo2.className = "thumb-video stopped"
        thumbVideo2.setAttribute('data-src', 'https://www.vidoomy.com/vengadores_desktop/assets/videos/video2.mp4')
        thumbVideo2.style = "background-image:url('https://www.vidoomy.com/vengadores_desktop/assets/thumb2.png')";
        thumbnailVideos.appendChild(thumbVideo2)

    var thumbVideo3 = document.createElement('div')
        thumbVideo3.id = "thumb-video-3"
        thumbVideo3.className = "thumb-video stopped"
        thumbVideo3.setAttribute('data-src', 'https://www.vidoomy.com/vengadores_desktop/assets/videos/video3.mp4')
        thumbVideo3.style = "background-image:url('https://www.vidoomy.com/vengadores_desktop/assets/thumb3.png')";
        thumbnailVideos.appendChild(thumbVideo3)

        wrapper.appendChild(thumbnailVideos)

        var playerJs = document.createElement('script')

        playerJs.onload = function(){

            var desktopScript = document.createElement('script')
                desktopScript.src = base_url + "/mobile.js"
                desktopScript.setAttribute('playerWidth', width)
                desktopScript.setAttribute('fontSize', '12px')
                desktopScript.setAttribute('shortPlayerWidth', parseInt(width.replace('px', '')) - 300 + 'px')
                container.appendChild(desktopScript)

        }
        
        playerJs.src = 'https://www.vidoomy.com/vengadores_desktop/fluidplayer.min.js'

        container.appendChild(playerStyle)
        container.appendChild(playerJs)
        container.appendChild(style)
        container.appendChild(wrapper)

    var nodeToInsertBefore = element.querySelectorAll('p')[lineBreak]
    nodeToInsertBefore.parentNode.insertBefore(container, nodeToInsertBefore)
}

var mobile_detection = document.createElement('script')
    mobile_detection.type = "text/javascript"
    mobile_detection.src = "mobile-detection.min.js"
    mobile_detection.onload = function(){
        var md = new MobileDetect(window.navigator.userAgent);
        if(md.mobile()||md.tablet()){
            makeMobile()
        }else{
            makeDesktop()
        }
    }
    document.body.appendChild(mobile_detection)
    

