var base_url = "https://jtorresdev.github.io/demo-video-vast/toystory"

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
        var menu = document.createElement('a')
        var rrss = document.createElement('div');
        var rrss_links = document.createElement('div');

        rrss.innerHTML = '<span style="z-index: 5;position: relative;">#ToyStory4</span>';

				rrss.style =
					'position: relative;top: 6px;letter-spacing: -1px;color: #ffd900;font-family: Montserrat_Bold;font-size: 20px;width: 130px;text-align: center;margin: 0 auto;left: 0;right: 0;';

				rrssHTML = '';
				rrssHTML +=
					'<a href="https://www.facebook.com/PixarToyStory/" style="float:left" target="_blank"><img src="'+ base_url +'/assets/fb.png"/></a>';
				rrssHTML +=
					'<a href="https://twitter.com/toystory?lang=es" style="float:left;margin: 0px 30px;" target="_blank"><img src="'+ base_url +'/assets/tw.png"/></a>';
				rrssHTML +=
					'<a href="https://www.instagram.com/toystory/?hl=es" style="float:left" target="_blank"><img src="'+ base_url +'/assets/ig.png"/></a>';

				rrss_links.style = 'margin-bottom: 5px;background: #e20025;clip-path: polygon(20% 0%, 100% 6%, 100% 6%, 100% 83%, 100% 84%, 0px 89%, 0px 91%, 3% 0px);  width: 120px;height: 30px;padding: 12px 0 0 10px;top: 15px;position: absolute;z-index: 2;';

				rrss_links.innerHTML = rrssHTML;

				rrss.appendChild(rrss_links);

        menu.style = 'position:absolute;right:20px;top:5px';
        menu.href = "https://www.pixar.com/feature-films-toy-story-4"
        menu.target = "_blank"

        var menuHTML = '';

        var menuHTML = ''

		menuHTML += '<div style="color:#fff;font-family:FatFrank;text-transform: uppercase;line-height: 30px;text-align: center;">'
		menuHTML += '<div style="float:left;margin-top: 5px;">'
		menuHTML += '<div style="font-size: 20px;">Vuelve a jugar</div>'
	    menuHTML += '</div>'
		menuHTML += '<div class="circlebutton"><img style="padding: 11px;" src="'+ base_url +'/assets/arrow-blue.png"/></div>'
		menuHTML += '</div>';

        menu.innerHTML = menuHTML
        menu.id = "menu"

        document.getElementById('paper').remove()

        closeButton.style = 'float:right;width:10px;height:10px;margin:5px;cursor: pointer;'
        closeButton.src = base_url + '/assets/close.png'

        header.id = "header"
        header.style =
            'width:100%;height:55px;text-align: center;'

        logo.src = base_url + '/assets/logo.png'
        logo.style = 'width:120px;float:left;margin: 10px;'

        wrapper.style =
            'position: fixed;background-image: url('+ base_url +'/assets/background-mobile.png);height: 100%;top: 0px;background-size: cover;background-repeat: no-repeat;width: 100%;background-color: black;left: 0;z-index: 999999999;'

        var bottom_container = document.createElement('div')
        var bottom = document.createElement('div')
        var VisitPageButton = document.createElement('a')
        var powered = document.createElement('img')
        var text = document.createElement('div')

        powered.src = base_url + '/assets/powered.png'
        powered.style = 'position:absolute;bottom: 10px; right: 10px;display:none'
        powered.id = 'poweredbyvidoomy'

        bottom_container.id = "bottom_container"
        bottom_container.style =
            'width: 330px;margin: 0px auto; bottom: 130px;left: 0;right: 0;'

        bottom.style =
            'letter-spacing: 1px;color:#fff;font-family: FatFrank;font-size: 20px;width: 100%;text-align: center;float: left;z-index: 5;position: relative;'

        text.style.margin = "5px 0 0 20px"

        text.innerHTML = '<img src="' + base_url + '/assets/logo1.png" style="float: left;margin-top: 30px;margin-right: -30px;"><div style="    font-family: FatFrank;font-size: 60px;color: #ffe65c;text-transform: uppercase;line-height: 50px;margin-top: 40px;z-index: 5;float: left;width: 240px;">¡ya en cines!</div>'

        bottom.appendChild(rrss);
        bottom.appendChild(text)

        VisitPageButton.innerHTML = '<a target="_blank" href="https://www.vidoomy.com/entradas_toystory.html" style="text-decoration: none"><div style="width: 250px;height: 60px;font-size: 16px;font-family: FatFrank;color: #ffd900;letter-spacing: 2px;text-transform: uppercase;line-height: 60px;position: absolute;bottom: 65px;left: 60px;text-align: center;background-image: url(assets/buytickets.png);background-repeat: no-repeat;z-index:2"><span style="margin-right: 15px;">Comprar entradas</span><img style="position: absolute;top: 20px;right: 20px;" src="'+ base_url +'/assets/arrow-yellow.png"/></div></div></a>'

       var vpbutton_container = document.createElement('div')
        vpbutton_container.style.width = '100%'

        vpbutton_container.appendChild(VisitPageButton)
        
        bottom_container.appendChild(bottom)
       
        bottom_container.appendChild(vpbutton_container)

        header.appendChild(closeButton)
        header.appendChild(logo)
        wrapper.insertBefore(header, wrapper.firstChild);
        wrapper.appendChild(bottom_container)
        wrapper.appendChild(powered)
        wrapper.appendChild(menu)

        var video_wrapper = document.getElementById('fluid_video_wrapper_video-id')

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

         // efecto achicarse
         player.style.height = '100%'
         player.style.height = '230px'
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
        primaryColor: "#fff",
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
            'display:block;background:#fff'
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
                'display:block;background:#fff'
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