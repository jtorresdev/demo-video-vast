var base_url = "http://localwebapp/video/endgame"

var removeIfExists = function (ids) {
    ids.map(id => {
        document.getElementById(id) ? document.getElementById(id).remove() : null
    })
}

var tapOnVideo = function () {

    if (document.getElementById('sidebar') || document.getElementById('header')) {
            // nothing...
    } else {

        document.getElementById('unmuteButton').remove()
        video.muteToggle('video-id', true)
        video.play()
        document.getElementById('thumbnail-videos').style.display = 'block'

        document.getElementById('video-id').style.background = 'transparent'

        var wrapper = document.getElementById('wrapper')
        var player = document.getElementById('player')
        var header = document.createElement('div')
        var closeButton = document.createElement('img')
        var logo = document.createElement('img')
        var menu = document.createElement('div')

        menu.style = 'position: absolute;right: -15px;top: 15px;'

        var menuHTML = ''

        menuHTML = '<ul>'
        menuHTML += '<li class="active" id="videosItem"><a href="#">Trailers</a></li>'
        menuHTML += '<li id="avengersItem"><a href="#">Vengadores</a></li>'
        menuHTML += '<li id="synopsisItem"><a href="#">Sinopsis</a></li>'
        menuHTML += '</ul>'

        menu.innerHTML = menuHTML
        menu.id = "menu"

        document.getElementById('paper').remove()

        closeButton.style = 'float:right;width:10px;height:10px;margin:5px;cursor: pointer;'
        closeButton.src = base_url + '/assets/close.png'

        header.id = "header"
        header.style =
            'width:100%;height:55px;text-align: center;'

        logo.src = base_url + '/assets/logo.png'
        logo.style = 'width:100px;float:left;margin: 10px;'

        wrapper.style =
            'position: fixed;background-image: url('+ base_url +'/assets/background-mobile.png);height: 100%;top: 0px;background-size: cover;background-repeat: no-repeat;width: 100%;background-color: black;left: 0;z-index: 999999999;'

        /* demo */

        //document.getElementById('container').style.padding = '20px 0px'

        /* demo */

        // efecto achicarse
        player.style.height = '100%'
        player.style.height = '230px'


        // BANNERS

        var bottom_container = document.createElement('div')
        var bottom_left = document.createElement('div')
        var bottom_right = document.createElement('div')
        var VisitPageButton = document.createElement('a')
        var powered = document.createElement('img')
        var countdown = document.createElement('div')

        countdown.id = "countdown"

        var deadline = new Date("Apr 26, 2019 00:00:00").getTime(); 
        var x = setInterval(function() { 
        var now = new Date().getTime(); 
        var t = deadline - now; 
        var days = Math.floor(t / (1000 * 60 * 60 * 24)); 
        var hours = Math.floor((t%(1000 * 60 * 60 * 24))/(1000 * 60 * 60)); 
        var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60)); 
        var seconds = Math.floor((t % (1000 * 60)) / 1000); 
        countdown.style = "font-size: 24px;font-family: steelfishEb;color: white;background: rgba(0, 0, 0, 0.5);height:40px;padding: 5px;line-height: 20px;margin: 0 auto;display: table;"
        var countdownHTML = ''
            countdownHTML += '<div id="days" style="text-align:center;float: left;padding: 0 5px;"><div>'+ days +'</div><span style="color:#9c97ae;font-size: 14px;">DIAS</span></div>'
            countdownHTML += '<div id="hours" style="text-align:center;float: left;padding: 0 5px;"><div>'+ hours +'</div><span style="color:#9c97ae;font-size: 14px;">HORAS</span></div>'
            countdownHTML += '<div id="minutes" style="text-align:center;float: left;padding: 0 5px;"><div>'+ minutes +'</div><span style="color:#9c97ae;font-size: 14px;">MINUTOS</span></div>'
            countdownHTML += '<div id="seconds" style="text-align:center;float: left;padding: 0 5px;"><div>'+ seconds +'</div><span style="color:#9c97ae;font-size: 14px;">SEGUNDOS</span></div>'
        countdown.innerHTML = countdownHTML; 
            if (t < 0) {
                clearInterval(x); 
                countdown.innerHTML = "EXPIRED"; 
            } 
        }, 1000);
    

        powered.src = base_url + '/assets/powered.png'
        powered.style = 'position:absolute;bottom: 10px; right: 10px;display:none'
        powered.id = 'poweredbyvidoomy'

        bottom_container.id = "bottom_container"
        bottom_container.style =
            'width: 330px;margin: 0px auto; bottom: 130px;left: 0;right: 0;'

        bottom_left.style =
            'letter-spacing: 1px;color:#fff;font-family: steelfishEb;font-size: 20px;width: 100px;text-align: center;margin: 25px 20px 15px 15px;float: left;'
        bottom_right.style =
            'float: left;width: 160px;text-align: center;margin: 10px 15px;padding: 5px 0'

        var bottom_left_HTML = ''

        bottom_left_HTML += '<img src="'+ base_url + '/assets/logo.png" width="100px"/>'
        bottom_left_HTML += '<span style="margin-left:-10px">#AVENGERSENDGAME</span>'
        bottom_left_HTML +=
            '<a href="https://www.facebook.com/hellboymovie/" style="float:left;margin-left: 5px;" target="_blank"><img src="' + base_url + '/assets/fb.png"/></a>'
        bottom_left_HTML +=
            '<a href="https://twitter.com/hellboymovie" style="float:left;margin: 0px 20px;" target="_blank"><img src="' + base_url + '/assets/tw.png"/></a>'
        bottom_left_HTML +=
            '<a href="https://www.instagram.com/hellboymovie" style="float:left" target="_blank"><img src="' + base_url + '/assets/ig.png"/></a>'

        bottom_left.innerHTML = bottom_left_HTML

        var bottom_right_HTML = ''

        bottom_right_HTML = '<img src="' + base_url + '/assets/date-mobile.png" width="150px" />'
        
        bottom_right.innerHTML = bottom_right_HTML

        bottom_right.appendChild(countdown)

        VisitPageButton.style =
            'position: absolute;bottom: 12%;left: 60px;width: 65%;height: 50px;color: #fff;background: #eb0d0d;font-size: 16px;font-family: bahnschrift;text-transform: uppercase;text-align: center;line-height: 50px;cursor: pointer;text-decoration: none;-webkit-clip-path: polygon(9% 0, 100% 0, 100% 0, 100% 74%, 91% 100%, 0 100%, 0 100%, 0 29%);clip-path: polygon(9% 0, 100% 0, 100% 0, 100% 74%, 91% 100%, 0 100%, 0 100%, 0 29%);'

        VisitPageButton.innerText = 'Visitar pagina web'
        VisitPageButton.href = 'https://www.hellboy.movie/'
        VisitPageButton.target = '_blank'
        VisitPageButton.id = 'visitPageButton'

       var vpbutton_container = document.createElement('div')
        vpbutton_container.style.width = '100%'
        vpbutton_container.appendChild(VisitPageButton)


        bottom_container.appendChild(bottom_left)
        bottom_container.appendChild(bottom_right)
        bottom_container.appendChild(vpbutton_container)


        header.appendChild(closeButton)
        header.appendChild(logo)
        wrapper.insertBefore(header, wrapper.firstChild);
        wrapper.appendChild(bottom_container)
        //wrapper.appendChild(VisitPageButton)
        wrapper.appendChild(powered)
        wrapper.appendChild(menu)

        var video_wrapper = document.getElementById('fluid_video_wrapper_video-id')

        document.getElementById('synopsisItem').addEventListener('click', function (e) {

            var player = document.getElementById('player')

            e.preventDefault()
            document.getElementById('video-id').pause()
            removeIfExists(['saveCalendarDropdown'])
            document.getElementsByClassName('active')[0].classList.remove('active')
            document.getElementById('synopsisItem').classList.add('active')

            document.getElementById('bottom_container').style.marginTop = '100px'

            video_wrapper.style.display = 'none'
            document.getElementById('thumbnail-videos').style.display = 'none'

            var synopsis = document.createElement('div')

            synopsis.style =
                'color: #fef9d1;padding: 20px;font-size: 16px;font-family: bahnschrift;text-transform: uppercase;line-height: 22px;text-align:center'
            synopsis.id = 'synopsis'
            var synopsisHTML = ''
            synopsisHTML +=
                '<p style="font-size: 25px;margin-bottom: 0px;color: #fff;">Avengers end game</p>'
            synopsisHTML +=
                '<p>Después de los eventos devastadores de Avengers: Infinity War, el universo está en ruinas debido a las acciones de Thanos, el Titán Loco. Con la ayuda de los aliados que quedaron, los Vengadores deben reunirse una vez más para deshacer sus acciones y restaurar el orden en el universo de una vez por todas, si importar cuáles son las consecuencias. Cuarta entrega de la saga "Vengadores".</p>'
            synopsis.innerHTML = synopsisHTML

            player.appendChild(synopsis)
        })

        document.getElementById('videosItem').addEventListener('click', function (e) {
            e.preventDefault()
            document.getElementById('bottom_container').style.marginTop = '0px'
            document.getElementById('video-id').pause()
            removeIfExists(['saveCalendarDropdown', 'synopsis'])
            document.getElementsByClassName('active')[0].classList.remove('active')
            document.getElementById('videosItem').classList.add('active')

            video_wrapper.style.display = 'block'
            document.getElementById('thumbnail-videos').style.display = 'block'
        })

        document.getElementById('avengersItem').addEventListener('click', function (e) {
            e.preventDefault()
            document.getElementById('video-id').pause()
        })

        closeButton.addEventListener('click', function () {
            removeIfExists(['header', 'visitPageButton', 'poweredbyvidoomy', 'bottom_container',
                'menu', 'synopsis', 'saveCalendarDropdown'
            ])

            document.getElementById('fluid_video_wrapper_video-id').style.display = 'block'

            document.getElementById('thumbnail-videos').style.display = 'none'
            document.getElementById('player').style = 'width:100%;height:100%'
            document.getElementById('wrapper').style = 'width: 100%;margin-top: 10px;'
            document.getElementById('container').style.padding = '0px 10px'
            document.getElementById('video-id').pause()

            document.getElementById('video-id_fluid_controls_container').style.display = 'none'
            document.getElementById('video-id_fluid_initial_play').style =
                'cursor:none;display:none'

            makeUnmuteButton()

            makePaper()

        })

    }

}

var makeUnmuteButton = function(){
    var unmuteButton = document.createElement('div')
        unmuteButton.style = "position: absolute;top: 70px;width: 100%;text-align: center;display: block;"
        unmuteButton.innerHTML = '<img src="' + base_url + '/assets/unmute.png" width="80px">'
        unmuteButton.id = 'unmuteButton'

        document.getElementById('fluid_video_wrapper_video-id').appendChild(unmuteButton)

        unmuteButton.addEventListener('click', tapOnVideo)
}

var makePaper = function () {
    var paper = document.createElement('img')
    paper.src = base_url + '/assets/paper.png'
    paper.style =
        'position: absolute;bottom: 0px;right: 0px;z-index: 99;cursor:pointer;width: 120px;'
    paper.id = 'paper'

    paper.addEventListener('click', tapOnVideo)

    document.getElementById('fluid_video_wrapper_video-id').appendChild(paper)
}

var hidePlayerButtons = function () {
    var hide = "display:none"

    var fullscreen = document.getElementById('video-id_fluid_control_fullscreen')
    fullscreen.style = hide
    var theatre = document.getElementById('video-id_fluid_control_theatre')
    theatre.style = hide
    var progress = document.getElementById('video-id_fluid_control_duration')
    progress.style = hide
}

var options = {
    layoutControls: {
        primaryColor: "#d9c408",
        fillToContainer: true,
        posterImage: ''+ base_url +'/assets/poster.png',
        persistentSettings: {
            volume: false
        },
        autoPlay: true,
        mute: true,
        playerInitCallback: (function () {
            hidePlayerButtons()
            document.getElementById('video-id_fluid_controls_container').style.display = 'none'
            document.getElementById('video-id_fluid_initial_play').style =
                'cursor:none;display:none'
                
            makeUnmuteButton()

            makePaper()

            var videoPlayer = document.getElementById('video-id',)
        })
    }
}
var video = fluidPlayer("video-id", options);


document.getElementById('video-id').addEventListener('click', function (e) {
    tapOnVideo()
    video.muteToggle('video-id', true)
    //video.play()
})

video.on('ended', function () {
    var videoPlayer = document.getElementById('video-id')

    var nextVideo = document.getElementById('thumb-video-' + (parseInt(videoPlayer.getAttribute(
        "current-video")) + 1))
    var prevVideo = document.getElementById('thumb-video-' + parseInt(videoPlayer.getAttribute(
        "current-video")))


    if ((parseInt(videoPlayer.getAttribute("current-video")) + 1) <= document.getElementsByClassName(
            'thumb-video').length) {

        nextVideo.classList.remove('stopped')
        prevVideo.classList.add('stopped')

        nextVideo.classList.add('currentVideo')
        prevVideo.classList.remove('currentVideo')

        videoPlayer.src = nextVideo.getAttribute('data-src');
        videoPlayer.setAttribute('current-video', (parseInt(videoPlayer.getAttribute("current-video")) +
            1))
        videoPlayer.play();
    } else {
        videoPlayer.pause()
    }
})

video.on('pause', function () {
    var unmute = document.getElementById('video-id_fluid_initial_play')
    if (unmute.classList[0] != 'fluid_initial_play') {
        unmute.remove()
        document.getElementById('video-id_fluid_initial_play').style =
            'display:block;background:#d9c408'
    }
})

var videoThumbs = document.getElementsByClassName('thumb-video')

document.getElementById('player').addEventListener("transitionend", function (event) {
    if (document.getElementById('wrapper').style.height === '100%') {
        document.getElementById('video-id_fluid_controls_container').style.display = 'block'
        document.getElementById('poweredbyvidoomy').style.display = 'block'
    }

});

for (let elem of videoThumbs) {
    elem.addEventListener('click', function (e) {

        var unmute = document.getElementById('video-id_fluid_initial_play')
        if (unmute.classList[0] != 'fluid_initial_play') {
            unmute.remove()
            document.getElementById('video-id_fluid_initial_play').style =
                'display:block;background:#d9c408'
        }

        var videoPlayer = document.getElementById('video-id')

        var nextVideo = document.getElementById('thumb-video-' + parseInt(e.target.id.substr(-1)))
        var prevVideo = document.getElementById('thumb-video-' + parseInt(videoPlayer.getAttribute(
            "current-video")))

        nextVideo.classList.add('currentVideo')
        prevVideo.classList.remove('currentVideo')

        nextVideo.classList.remove('stopped')
        prevVideo.classList.add('stopped')


        videoPlayer.src = elem.getAttribute("data-src")
        videoPlayer.setAttribute('current-video', parseInt(e.target.id.substr(-1)))

        video.play()
    })
}