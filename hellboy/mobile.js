var base_url = "https://www.vidoomy.com/hellboy_desktop"

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
        menuHTML += '<li class="active" id="videosItem"><a href="#">Videos</a></li>'
        menuHTML += '<li id="saveCalendarItem"><a href="#">Guardar en calendario</a></li>'
        menuHTML += '<li id="synopsisItem"><a href="#">Sinopsis</a></li>'
        menuHTML += '</ul>'

        menu.innerHTML = menuHTML
        menu.id = "menu"

        document.getElementById('paper').remove()

        closeButton.style = 'float:right;width:10px;height:10px;margin:5px;cursor: pointer;'
        closeButton.src = base_url + '/assets/close.png'

        header.id = "header"
        header.style =
            'width:100%;height:40px;text-align: center;'

        logo.src = base_url + '/assets/logo.png'
        logo.style = 'width:100px;float:left;margin: 10px;'

        wrapper.style =
            'position: fixed;background-image: url(https://www.vidoomy.com/hellboy_desktop/assets/background-mobile.png);height: 100%;top: 0px;background-size: cover;background-repeat: no-repeat;width: 100%;background-color: black;left: 0;z-index: 999999999;'

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

        powered.src = base_url + '/assets/powered.png'
        powered.style = 'position:absolute;bottom: 10px; right: 10px;display:none'
        powered.id = 'poweredbyvidoomy'

        bottom_container.id = "bottom_container"
        bottom_container.style =
            'width: 330px;margin: 0px auto; bottom: 130px;left: 0;right: 0;'

        bottom_left.style =
            'letter-spacing: 5px;color: rgb(255, 226, 0);font-family: steelfishEb;font-size: 20px;width: 100px;text-align: center;margin: 15px;float: left;margin-right: 20px;'
        bottom_right.style =
            'float: left;width: 150px;text-align: center;margin: 10px 15px;padding: 5px 0;border-top: 3px solid #f9f9cd;border-bottom: 3px solid #f9f9cd;'

        var bottom_left_HTML = ''

        bottom_left_HTML += '<img src="'+ base_url + '/assets/logo.png" width="100px"/>'
        bottom_left_HTML += '<span>#HELLBOY</span>'
        bottom_left_HTML +=
            '<a href="https://www.facebook.com/hellboymovie/" style="float:left;margin-left: 5px;" target="_blank"><img src="' + base_url + '/assets/fb.png"/></a>'
        bottom_left_HTML +=
            '<a href="https://twitter.com/hellboymovie" style="float:left;margin: 0px 20px;" target="_blank"><img src="' + base_url + '/assets/tw.png"/></a>'
        bottom_left_HTML +=
            '<a href="https://www.instagram.com/hellboymovie" style="float:left" target="_blank"><img src="' + base_url + '/assets/ig.png"/></a>'

        bottom_left.innerHTML = bottom_left_HTML

        var bottom_right_HTML = ''

        bottom_right_HTML = '<img src="' + base_url + '/assets/date.png" width="150px" />'

        bottom_right.innerHTML = bottom_right_HTML

        VisitPageButton.style =
            'bottom: 70px;margin: 0 auto;display: table;width: 200px;left: 0;right: 0;height: 45px;border: 1px solid rgb(255, 225, 0);color: rgb(255, 225, 0);font-size: 16px;font-family: bahnschrift;text-transform: uppercase;text-align: center;line-height: 45px;cursor: pointer;text-decoration: none;'

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
                'color: #fef9d1;width: 90%;padding: 10px;font-size: 12px;font-family: bahnschrift;text-transform: uppercase;line-height: 22px;'
            synopsis.id = 'synopsis'
            var synopsisHTML = ''
            synopsisHTML +=
                '<p style="font-size: 25px;margin-bottom: 0px;color: #ffe100;">Vuelve Hellboy,</p>'
            synopsisHTML +=
                "<p>el gran demonio de piel roja, con cola, cuernos y un brazo de piedra. Atrapado entre los mundos de lo sobrenatural y lo humano, el apodado como 'El más grande Investigador de lo Paranormal del Mundo' junto con la Agencia para la Investigación y Defensa Paranormal (A.I.D.P.) tendrán un nuevo y peligroso desafío. Su misión será enfrentarse a una nueva y poderosa amenaza: Nimue (Milla Jovovich), conocida como La Reina de la Sangre, un espíritu ancestral de la época del rey Arturo que ha vuelto a nuestro mundo llena de sed de venganza para sembrar el terror y destruir a la raza humana.</p>"
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

        document.getElementById('saveCalendarItem').addEventListener('click', function (e) {
            e.preventDefault()
            if (!document.getElementById('saveCalendarDropdown')) {
                document.getElementsByClassName('active')[0].classList.remove(
                    'active')
                document.getElementById('saveCalendarItem').classList.add('active')

                var dropdown = document.createElement('div')
                dropdown.style =
                    'background: rgb(0, 0, 0);width: 260px;height: 153px;position: absolute;top: 60px;right: 5px;z-index: 99;'
                dropdown.id = "saveCalendarDropdown"
                dropdownHTML = ''
                dropdownHTML +=
                    '<a href="https://www.google.com/calendar/render?action=TEMPLATE&text=Hellboy%3A%20Get%20Tickets&dates=20190412/20190413&details=Buy%20tickets%20now%20for%20Hellboy%20at%20http%3A%2F%2Fwww.hellboymovie.co.uk&sprop=&sprop=name:" class="dropdown-link" target="_blank">Google Calendar</a>'
                dropdownHTML += '<a href="https://www.hellboymovie.co.uk/calendar.ics" class="dropdown-link">Apple iCal</a>'
                dropdownHTML +=
                    '<a href="data:text/calendar;charset=utf8,BEGIN%3AVCALENDAR%0D%0AVERSION%3A2.0%0D%0APRODID%3A-%2F%2Fpowster%2F%2FNONSGML%20v1.0%2F%2FEN%0D%0ABEGIN%3AVEVENT%0D%0AURL%3BVALUE%3DURI%3Ahttp%3A%2F%2Fwww.hellboymovie.co.uk%0D%0ADTSTART%3BVALUE%3DDATE%3A20190412%0D%0ADTEND%3A20190413%0D%0ASUMMARY%3AHellboy%3A%20Get%20Tickets%0D%0ADESCRIPTION%3ABuy%20tickets%20now%20for%20Hellboy%20at%20http%3A%2F%2Fwww.hellboymovie.co.uk%0D%0AEND%3AVEVENT%0D%0AEND%3AVCALENDAR%0D%0A" class="dropdown-link">Microsoft Outlook</a>'
                dropdown.innerHTML = dropdownHTML
                wrapper.appendChild(dropdown)
            } else {
                document.getElementById('saveCalendarDropdown').remove()

                document.getElementById('saveCalendarItem').classList.remove(
                    'active')

                if (document.getElementById('synopsis')) {
                    document.getElementById('fluid_video_wrapper_video-id').style
                        .display

                    document.getElementById('synopsisItem').classList.add(
                        'active')

                } else {
                    document.getElementById('videosItem').classList.add(
                        'active')
                }
            }
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
        posterImage: "' + base_url + '/assets/poster.png",
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