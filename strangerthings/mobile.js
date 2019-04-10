//var base_url = "https://jtorresdev.github.io/demo-video-vast/endgame"
var base_url = "./"

var removeIfExists = function (ids) {
    ids.map(id => {
        document.getElementById(id) ? document.getElementById(id).remove() : null
    })
}

var showIfExists = function(ids){
	ids.map((id) => {
		document.getElementById(id) ? document.getElementById(id).style.display = "block" : null;
	});
}

var hideIfExists = function(ids){
	ids.map((id) => {
		document.getElementById(id) ? document.getElementById(id).style.display = 'none' : null;
	});
}

var tapOnVideo = function () {

    if (document.getElementById('sidebar') || document.getElementById('header')) {
            // nothing...
    } else {

        document.getElementById('unmuteButton').remove()
        video.muteToggle('video-id', true)
        video.play()

        document.getElementById('video-id').style.background = 'transparent'

        var wrapper = document.getElementById('wrapper')
        var player = document.getElementById('player')
        var header = document.createElement('div')
        var closeButton = document.createElement('img')
        var menu = document.createElement('div')

        menu.style = 'position: absolute;right: 15px;top: 15px;'

        var menuHTML = ''

        menuHTML = '<ul>'
		menuHTML += '<li class="active" id="informationItem"><a href="#">Información</a></li>';
		menuHTML += '<li id="trailersItem"><a href="#">Trailers y más</a></li>';
		menuHTML += '<li id="similarItem"><a href="#">Similares</a></li>';
        menuHTML += '</ul>'

        menu.innerHTML = menuHTML
        menu.id = "menu"

        document.getElementById('paper').remove()

        closeButton.style = 'float:right;width:10px;height:10px;margin:5px;cursor: pointer;'
        closeButton.src = base_url + '/assets/close.png'

        header.id = "header"
        header.style =
            'width:100%;height:55px;text-align: center;'

        wrapper.style =
            'position: fixed;background-image: url('+ base_url +'/assets/background-mobile.png);height: 100%;top: 0px;background-size: cover;background-repeat: no-repeat;width: 100%;background-color: black;left: 0;z-index: 999999999;'

        /* demo */

        //document.getElementById('container').style.padding = '20px 0px'

        /* demo */


        // BANNERS

        var bottom_container = document.createElement('div')
        var bottom_left = document.createElement('div')
        var bottom_right = document.createElement('div')
        var synopsis = document.createElement('div')
        var powered = document.createElement('img')
    

        powered.src = base_url + '/assets/powered.png'
        powered.style = 'position:absolute;bottom: 10px; right: 10px;'
        powered.id = 'poweredbyvidoomy'

        bottom_container.id = "bottom_container"
        bottom_container.style =
            'width: 100%;margin: 0px auto; bottom: 130px;left: 0;right: 0;padding:0 10px'

        bottom_left.style =
            'letter-spacing: 1px;color:#fff;font-family: steelfishEb;font-size: 20px;width: 100px;text-align: center;margin: 0px;float: left;'
        bottom_right.style =
            'float: right;width: 160px;text-align: center;margin: 0px;padding: 5px 0;letter-spacing: 1px;color: #fff;font-family: RobotoRegular;font-size: 16px;'

        var bottom_left_HTML = ''
        bottom_left_HTML += '<img src="' + base_url + '/assets/date-mobile.png" id="date" width="150px" />'
        bottom_left_HTML += '<img src="'+ base_url + '/assets/logo.png" id="logo" style="padding: 15px 0;"/>'
        bottom_left.innerHTML = bottom_left_HTML
        bottom_left.id = "bottom_left"

        var bottom_right_HTML = ''

        bottom_right_HTML += '<span style="margin-left:-45px">#STRANGERTHINGS3</span>'
        bottom_right_HTML += '<div style="margin-left:0px">'
        bottom_right_HTML +=
            '<a href="https://www.facebook.com/StrangerThingsEspana/?brand_redir=1031174333634374" style="float:left;margin-left: 5px;" target="_blank"><img src="' + base_url + '/assets/fb.png"/></a>'
            bottom_right_HTML +=
            '<a href="https://twitter.com/stranger_things" style="float:left;margin: 0px 20px;" target="_blank"><img src="' + base_url + '/assets/tw.png"/></a>'
            bottom_right_HTML +=
            '<a href="https://www.instagram.com/strangerthingstv" style="float:left" target="_blank"><img src="' + base_url + '/assets/ig.png"/></a>'
        bottom_right_HTML += '</div>'
        bottom_right.innerHTML = bottom_right_HTML
        bottom_right.id = "bottom_right"

        synopsis.id = "synopsis"
        synopsis.style = "float: left;color: white;font-family: RobotoRegular;font-size: 16px;"
        synopsis.innerHTML = "<span>A raiz de la desaparición de un niño, un pueblo desvela un misterio relacionado con experimentos secretos, fuerzas sobrenaturales aterradoras y una niña muy extraña.</span>"

        var buttons = document.createElement('div')
        var subscribe = document.createElement('a')
        var watchNow = document.createElement('a')

        buttons.style = "float:left;clear:both;margin: 40px -20px;"
        buttons.id = "buttons"

        subscribe.style = "border: 1px solid rgb(229, 9, 20);background: #e50914; width: 15%; text-align:center; padding: 10px 20px; color: #fff; font-family: 'RobotoMedium'; font-size: 14px; text-transform: uppercase;border-radius: 3px;margin: 10px 10px 10px 20px;text-decoration:none"
        subscribe.id = "subscribe"
        subscribe.innerText = "Subscribirse"
        subscribe.href = "https://www.netflix.com/"
        subscribe.target = '_blank'

        watchNow.style = "background: transparent; width: 15%; text-align:center; padding: 10px 20px; color: #fff; font-family: 'RobotoMedium'; font-size: 14px; text-transform: uppercase;border-radius: 3px;    margin: 10px 0px;    border: 1px solid white;text-decoration:none"
        watchNow.innerHTML = '<img src="' + base_url + '/assets/triangle.png"> Ver ahora'
        watchNow.href = "https://www.netflix.com/"
        watchNow.id = "watchnow"
        watchNow.target = '_blank'

        buttons.appendChild(subscribe)
        buttons.appendChild(watchNow)
        
        bottom_container.appendChild(bottom_left)
        bottom_container.appendChild(bottom_right)
       
        bottom_container.appendChild(synopsis)
        bottom_container.appendChild(buttons)

        header.appendChild(closeButton)
        wrapper.insertBefore(header, wrapper.firstChild);
        wrapper.appendChild(bottom_container)
        wrapper.appendChild(powered)
        wrapper.appendChild(menu)

        var video_wrapper = document.getElementById('fluid_video_wrapper_video-id')

        document.getElementById('trailersItem').addEventListener('click', function(e) {
            document.getElementById('video-id').pause();

            e.preventDefault();

            document.getElementsByClassName('active')[0].classList.remove('active');
            document.getElementById('trailersItem').classList.add('active');

            video_wrapper.style.display = 'none';

            hideIfExists(['synopsis', 'buttons', 'rrss', 'similars', 'bottom_right', 'bottom_left' ]);
            showIfExists(['buttons1'])

            document.getElementById('trailers') ? document.getElementById('trailers').style.display = "inline-flex" : null

            if(!document.getElementById('buttons1')){
                var new_buttons = buttons.cloneNode(true);
                var new_logo = document.getElementById('logo').cloneNode(true);
                new_buttons.id = "buttons1";
                new_buttons.style = "display:block;position:absolute;bottom: 140px; left: 0"
                new_logo.id = "logo1"
                new_logo.style = 'padding:20px'
                new_buttons.insertBefore(new_logo, new_buttons.firstChild)
                wrapper.appendChild(new_buttons)
            }


            if (!document.getElementById('trailers')) {
                var trailers_container = document.createElement('div')
                var trailers_div = document.createElement('div')
                    trailers_div.id = "tra"
                var video_container = document.createElement('div')
                var thumbs = [
                    {'thumb' : 'thumb1.png', 'title' : 'Stranger Things (Tráiler)', 'video' : 'video1.mp4'},
                    {'thumb' : 'thumb2.png', 'title': 'Stranger Things: Temporada 3 - Anuncio de fecha de estreno', 'video' : 'video2.mp4'},
                    {'thumb' : 'thumb3.png', 'title' : 'Destacado: Noah', 'video' : 'video3.mp4'},
                    {'thumb' : 'thumb4.png', 'title' : 'Destacado: El mundo', 'video' : 'video4.mp4'}
                ]
                thumbs.map(video => {
                    var video_div = document.createElement('div')
                        video_div.className = "thumbnail"
                        video_div.addEventListener('click', function(){
                            hideIfExists(['trailers'])
                            showIfExists(['video_container'])

                            var trailer_video = document.createElement('div')
                                trailer_video.style = "position:absolute;width:80%;top:50px"
                            
                            var videoTag = document.createElement('video')
                            var source = document.createElement('source')
                                source.src = base_url + "/assets/videos/" + video.video
                                source.type = "video/mp4"
                                videoTag.style = "width: 315px;float: right;padding-right: 25px;"
                                videoTag.autoplay = true
                                videoTag.controls = true
                                videoTag.appendChild(source)
                                video_container.appendChild(videoTag)

                            var arrow = document.createElement('img')
                                arrow.src = base_url + "/assets/arrow.png"
                                arrow.style.cursor = "pointer"
                            
                            arrow.addEventListener('click', function(){
                                document.getElementById('video_container').innerHTML = ""
                                document.getElementById('trailers').style.display = "inline-flex"
                            })

                            video_container.appendChild(arrow)
                        })
                    var videoHTML = ''
                        videoHTML += '<img src="' + base_url + '/assets/' + video.thumb + '"><span>' + video.title +'</span>'
                        video_div.innerHTML = videoHTML
                        trailers_div.append(video_div)
                })
                trailers_container.style = "width: 100%;position: absolute;top: 60px;padding-left: 10px;"
                trailers_container.id = "trailers"

                video_container.id = "video_container"
                video_container.style = "position: absolute;top: 100px;left: 0;right: 0;margin: 0 auto;width: 100%;padding: 10px;"

                document.getElementById('buttons1').append()

                trailers_container.append(trailers_div)
                wrapper.append(trailers_container)
                wrapper.append(video_container)
            }
        });

        document.getElementById('informationItem').addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementsByClassName('active')[0].classList.remove('active');
            document.getElementById('informationItem').classList.add('active');

            showIfExists(['synopsis', 'buttons', 'rrss', 'bottom_right', 'bottom_left'])
            hideIfExists(['buttons1', 'trailers'])

            document.getElementById('video_container').innerHTML = ""

            video_wrapper.style.display = 'block';
            
        });

        document.getElementById('similarItem').addEventListener('click', function(e) {
            e.preventDefault();

            document.getElementsByClassName('active')[0].classList.remove('active');
            document.getElementById('similarItem').classList.add('active');

            document.getElementById('video-id').pause();

            hideIfExists(['synopsis', 'buttons', 'rrss', 'trailers', 'buttons1', 'bottom_right', 'bottom_left' ])
            showIfExists(['similars'])

            video_wrapper.style.display = 'none';

            if(!document.getElementById('similars')){
                var similars_container = document.createElement('div')
                var similars_div = document.createElement('div')

                    similars_div.id = "sim"

                var data = [
                    {'thumb' : 'similars_thumb1.png', 'title' : 'Crazy head', 'description' : 'No serán las chicas más adaptadas, pero tienen un duro trabajo por delante. ¿Qué podría salir mal?', 'year' : 2016, 'seasons' : 1, 'pg' : 16},
                    {'thumb' : 'similars_thumb2.png', 'title' : 'Santa clarita diet', 'description' : 'Mami se desespera por la carne humana. Papi anhela una vida normal. El compromiso es la base de todo buen matrimonio.', 'year' : 2019, 'seasons' : 3, 'pg' : 16},
                    {'thumb' : 'similars_thumb3.png', 'title' : 'Zombie', 'description' : '¿Quién se hubiese imaginado que convertirte en zombi también podía transformarte en una brillante detective?', 'year' : 2017, 'seasons' : 3, 'pg' : 13},
                    {'thumb' : 'similars_thumb4.png', 'title' : 'The umbrella academy', 'description' : 'De chicos eran superhéroes y ahora aspiran a ser supervivientes. Y solo tienen ocho días para evitar el fin del mundo', 'year' : 2016, 'seasons' : 1, 'pg' : 16}
                ]

                data.map(tvshow => {
                    var tvshow_div = document.createElement('a')
                    var tvshowHTML = ""
                        tvshowHTML += '<img src="'+ base_url +'/assets/' + tvshow.thumb + '" style="    margin-bottom: 5px;">'
                        tvshowHTML += '<span class="year">' + tvshow.year + '</span>'
                        tvshowHTML += '<span class="pg">' + tvshow.pg + '+</span>'
                        if(tvshow.seasons === 1){
                            tvshowHTML += '<span class="seasons">' + tvshow.seasons + ' Temporada</span>'
                        }else{
                            tvshowHTML += '<span class="seasons">' + tvshow.seasons + ' Temporadas</span>'
                        }
                        tvshowHTML += '<div class="title">' + tvshow.title + '</div>'
                        tvshowHTML += '<div class="description">' + tvshow.description + '</div>'
                        tvshow_div.innerHTML = tvshowHTML
                        tvshow_div.className = "thumbnail"
                        tvshow_div.href = "https://netflix.com"
                        tvshow_div.target = "_blank" 
                        similars_div.append(tvshow_div)
                })

                similars_container.style = "width: 100%;position: absolute;top: 50px;padding: 6px;"
                similars_container.id = "similars"
                
                similars_container.append(similars_div)
                wrapper.append(similars_container)
            }

        });

        closeButton.addEventListener('click', function () {
            removeIfExists(['header', 'visitPageButton', 'poweredbyvidoomy', 'bottom_container',
                'menu', 'synopsis', 'saveCalendarDropdown', 'avengers_container'
            ])

            document.getElementById('fluid_video_wrapper_video-id').style.display = 'block'

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