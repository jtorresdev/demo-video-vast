
var selectorType = 'class'
var idOrclass = 'article'
var lineBreak = 5

var widthByAttribute = getAttribute('playerWidth')

function getAttribute(attr){
    return document.currentScript.getAttribute(attr)
}

function makeDesktop(){
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
        style.innerHTML = ".fluid_video_wrapper{-webkit-transition:width 3s,height 3s,margin 3s;transition:width 3s,height 3s,margin 3s}#menu ul{font-size:24px;font-family:steelfishEb;list-style-type:none;display:inline}#menu ul li{float:left;margin:0 10px;padding:0 10px 5px 10px;text-align:center;cursor:pointer}#menu ul li:hover{border-bottom:5px solid #ffe200}#menu ul li a{color:#ffe200;text-decoration:none}#menu ul li.active{border-bottom:5px solid #ffe200}@font-face{font-family:steelfishEb;src:url(https://www.vidoomy.com/hellboy_desktop/assets/steelfish_eb.otf)}@font-face{font-family:bahnschrift;src:url(https://www.vidoomy.com/hellboy_desktop/assets/bahnschrift.ttf)}.dropdown-link{float:left;width:100%;color:#ffe200;text-decoration:none;font-size:24px;font-family:steelfishEb;text-align:center;padding:10px 0;border:1px solid;box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box}.thumbnail-videos{position:absolute;bottom:0;left:10px;height:105px}.thumb-video{float:left;margin:0 5px;height:80px;width:140px;background:red;cursor:pointer;overflow:hidden;outline:1px solid #fff}.stopped::after{content:url(//www.vidoomy.com/hellboy_mobile/assets/play.png);margin:20px auto;display:block;width:40px;height:40px}.currentVideo{outline:3px solid #b29813!important}"

    var wrapper = document.createElement('div')
        wrapper.className = 'wrapper'
        wrapper.id = 'wrapper'
        wrapper.style = "width:" + width + ";height:" + height + ";position: relative;float: left;"

    var bigVideo = document.createElement('div')
        bigVideo.className = 'big-video'

    var video = document.createElement('video')
        video.id = 'video-id'
        video.setAttribute('current-video', '1')
        video.muted = "muted"

    var source = document.createElement('source')
        source.src = "https://www.vidoomy.com/hellboy_mobile/assets/videos/video1.mp4"
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
        thumbVideo1.setAttribute('data-src', 'https://www.vidoomy.com/hellboy_mobile/assets/videos/video1.mp4')
        thumbVideo1.style = "background-image:url('https://www.vidoomy.com/hellboy_mobile/assets/thumb1.png')";
        thumbnailVideos.appendChild(thumbVideo1)

    var thumbVideo2 = document.createElement('div')
        thumbVideo2.id = "thumb-video-2"
        thumbVideo2.className = "thumb-video stopped"
        thumbVideo2.setAttribute('data-src', 'https://www.vidoomy.com/hellboy_mobile/assets/videos/video2.mp4')
        thumbVideo2.style = "background-image:url('https://www.vidoomy.com/hellboy_mobile/assets/thumb2.png')";
        thumbnailVideos.appendChild(thumbVideo2)

    var thumbVideo3 = document.createElement('div')
        thumbVideo3.id = "thumb-video-3"
        thumbVideo3.className = "thumb-video stopped"
        thumbVideo3.setAttribute('data-src', 'https://www.vidoomy.com/hellboy_mobile/assets/videos/video3.mp4')
        thumbVideo3.style = "background-image:url('https://www.vidoomy.com/hellboy_mobile/assets/thumb3.png')";
        thumbnailVideos.appendChild(thumbVideo3)

        wrapper.appendChild(thumbnailVideos)

        var playerJs = document.createElement('script')

        playerJs.onload = function(){

            var desktopScript = document.createElement('script')
                desktopScript.src = "http://localwebapp/video/desktop.js"
                desktopScript.setAttribute('playerWidth', width)
                desktopScript.setAttribute('fontSize', '12px')
                desktopScript.setAttribute('shortPlayerWidth', parseInt(width.replace('px', '')) - 300 + 'px')
                container.appendChild(desktopScript)

        }
        
        playerJs.src = 'https://www.vidoomy.com/hellboy_desktop/fluidplayer.min.js'

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
        style.innerHTML = "body{margin:0}.player{-webkit-transition:width 1s,height 1s,margin 1s,left 2s;transition:width 1s,height 1s,margin 1s,left 2s}#menu ul{font-size:20px;font-family:steelfishEb;list-style-type:none;display:inline}#menu ul li{float:left;margin:0 0;padding:0 5px 5px 5px;text-align:center;cursor:pointer}#menu ul li:hover{border-bottom:5px solid #ffe200}#menu ul li a{color:#ffe200;text-decoration:none}#menu ul li.active{border-bottom:5px solid #ffe200}@font-face{font-family:steelfishEb;src:url(https://www.vidoomy.com/hellboy_desktop/assets/steelfish_eb.otf)}@font-face{font-family:bahnschrift;src:url(https://www.vidoomy.com/hellboy_desktop/assets/bahnschrift.ttf)}.dropdown-link{float:left;width:100%;color:#ffe200;text-decoration:none;font-size:24px;font-family:steelfishEb;text-align:center;padding:10px 0;border:1px solid;box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box}.thumbnail-videos{height:60px;padding:15px;margin-top:10px;display:none}.thumb-video{float:left;margin:0 5px;height:60px;width:100px;background:#fff;cursor:pointer;overflow:hidden;outline:1px solid #fff}.stopped::after{content:url(https://www.vidoomy.com/hellboy_desktop/assets/play.png);margin:10px auto;display:block;width:40px;height:40px}.currentVideo{outline:3px solid #b29813!important}.smartphone{position:relative;width:360px;height:640px;margin:auto;border:16px #000 solid;border-top-width:60px;border-bottom-width:60px;border-radius:36px;overflow:hidden}.smartphone:before{content:'';display:block;width:60px;height:5px;position:absolute;top:-30px;left:50%;transform:translate(-50%,-50%);background:#333;border-radius:10px}.smartphone:after{content:'';display:block;width:35px;height:35px;position:absolute;left:50%;bottom:-65px;transform:translate(-50%,-50%);background:#333;border-radius:50%}.smartphone .content{width:360px;height:640px;background:#fff}.header-container{height:60px;border-bottom:1px solid #e6ebf0;padding:0 10px}.header{width:100%;height:100%;position:relative;margin:0 auto}.header img{padding:10px 0 0 0}.container{padding:0 10px;position:relative;margin:0 auto;display:block}"

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
        source.src = "https://www.vidoomy.com/hellboy_mobile/assets/videos/video1.mp4"
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
        thumbVideo1.setAttribute('data-src', 'https://www.vidoomy.com/hellboy_mobile/assets/videos/video1.mp4')
        thumbVideo1.style = "background-image:url('https://www.vidoomy.com/hellboy_mobile/assets/thumb1.png')";
        thumbnailVideos.appendChild(thumbVideo1)

    var thumbVideo2 = document.createElement('div')
        thumbVideo2.id = "thumb-video-2"
        thumbVideo2.className = "thumb-video stopped"
        thumbVideo2.setAttribute('data-src', 'https://www.vidoomy.com/hellboy_mobile/assets/videos/video2.mp4')
        thumbVideo2.style = "background-image:url('https://www.vidoomy.com/hellboy_mobile/assets/thumb2.png')";
        thumbnailVideos.appendChild(thumbVideo2)

    var thumbVideo3 = document.createElement('div')
        thumbVideo3.id = "thumb-video-3"
        thumbVideo3.className = "thumb-video stopped"
        thumbVideo3.setAttribute('data-src', 'https://www.vidoomy.com/hellboy_mobile/assets/videos/video3.mp4')
        thumbVideo3.style = "background-image:url('https://www.vidoomy.com/hellboy_mobile/assets/thumb3.png')";
        thumbnailVideos.appendChild(thumbVideo3)

        wrapper.appendChild(thumbnailVideos)

        var playerJs = document.createElement('script')

        playerJs.onload = function(){

            var desktopScript = document.createElement('script')
                desktopScript.src = "http://localwebapp/video/mobile.js"
                desktopScript.setAttribute('playerWidth', width)
                desktopScript.setAttribute('fontSize', '12px')
                desktopScript.setAttribute('shortPlayerWidth', parseInt(width.replace('px', '')) - 300 + 'px')
                container.appendChild(desktopScript)

        }
        
        playerJs.src = 'https://www.vidoomy.com/hellboy_desktop/fluidplayer.min.js'

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
    

