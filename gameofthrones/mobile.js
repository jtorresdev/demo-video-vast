//var base_url = "https://jtorresdev.github.io/demo-video-vast/endgame"
var base_url = "./"

var removeIfExists = function (ids) {
    ids.map(id => {
        document.getElementById(id) ? document.getElementById(id).remove() : null
    })
}

var hideIfExists = function(ids){
	ids.map((id) => {
		document.getElementById(id) ? document.getElementById(id).style.display = 'none' : null;
	});
}

var showIfExists = function(ids){
	ids.map((id) => {
		document.getElementById(id) ? document.getElementById(id).style.display = "block" : null;
	});
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
        var menu = document.createElement('div')

        menu.style = 'position: absolute;right: 0px;top: 15px;'

        var menuHTML = ''

        menuHTML = '<ul>'
        menuHTML += '<li class="active" id="videosItem"><a href="#">Trailers</a></li>'
        menuHTML += '<li id="charactersItem"><a href="#">Personajes</a></li>'
        menuHTML += '<li id="exclusiveItem"><a href="#">Videos Exclusivos</a></li>'
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

        var bottom_container = document.createElement('div')
        var bottom_left = document.createElement('div')
        var bottom_right = document.createElement('div')
        var VisitPageButton = document.createElement('a')
        var powered = document.createElement('img')
        var countdown = document.createElement('div')

        countdown.id = "countdown"

        var deadline = new Date("Apr 14, 2019 00:00:00").getTime(); 

        function n(n){
            return n > 9 ? "" + n: "0" + n;
        }

        var updateTime = function(){
        var now = new Date().getTime(); 
        var t = deadline - now; 
        var days = Math.floor(t / (1000 * 60 * 60 * 24)); 
        var hours = Math.floor((t%(1000 * 60 * 60 * 24))/(1000 * 60 * 60)); 
        var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60)); 
        var seconds = Math.floor((t % (1000 * 60)) / 1000); 
        countdown.style = 'font-size: 20px;color: white;background: rgba(0, 0, 0, 0.5);height: 50px;padding: 10px 0px 0px 0px;line-height: 20px;margin: 0px auto;display: table;font-family:"TrajanPro-Regular"'
        var countdownHTML = ''
            countdownHTML += '<div id="days" style="text-align:center;float: left;padding: 0 5px;"><div>'+ n(days) +'</div><span style="color:#9c97ae;font-size: 11px;">DIAS</span></div>'
            countdownHTML += '<div id="hours" style="text-align:center;float: left;padding: 0 5px;"><div>'+ n(hours) +'</div><span style="color:#9c97ae;font-size: 11px;">HRS</span></div>'
            countdownHTML += '<div id="minutes" style="text-align:center;float: left;padding: 0 5px;"><div>'+ n(minutes) +'</div><span style="color:#9c97ae;font-size: 11px;">MINS</span></div>'
            countdownHTML += '<div id="seconds" style="text-align:center;float: left;padding: 0 5px;"><div>'+ n(seconds) +'</div><span style="color:#9c97ae;font-size: 11px;">SEGS</span></div>'
        countdown.innerHTML = countdownHTML; 
            if (t < 0) {
                clearInterval(x); 
                countdown.innerHTML = "EXPIRED"; 
            }
        }

        updateTime()

        var x = setInterval(function() { 
            updateTime()
        }, 1000);
    

        powered.src = base_url + '/assets/powered.png'
        powered.style = 'position:absolute;bottom: 10px; right: 10px;display:none'
        powered.id = 'poweredbyvidoomy'

        bottom_container.id = "bottom_container"
        bottom_container.style =
            'width: 330px;margin: 0px auto; bottom: 130px;left: 0;right: 0;'

        bottom_left.style =
            'letter-spacing: 1px;color:#fff;font-family: steelfishEb;font-size: 20px;width: 120px;text-align: center;margin: 5px 5px 15px 15px;float: left;'
        bottom_right.style =
            'float: left;width: 160px;text-align: center;margin: 10px 15px;padding: 5px 0'

        var bottom_left_HTML = ''

        bottom_left_HTML += '<img src="'+ base_url + '/assets/logo.png" width="100px" style="margin-bottom:10px"/>'
        bottom_left_HTML += '<span class="hashtag">#PORELTRONO</span>'
        bottom_left_HTML +=
            '<a href="https://www.facebook.com/juegodetronos/" style="float:left;margin-left: 10px;" target="_blank"><img src="' + base_url + '/assets/fb.png"/></a>'
        bottom_left_HTML +=
            '<a href="https://twitter.com/JuegoDeTronosTM" style="float:left;margin: 0px 20px;" target="_blank"><img src="' + base_url + '/assets/tw.png"/></a>'
        bottom_left_HTML +=
            '<a href="https://www.instagram.com/gameofthronesnotofficial/?hl=es" style="float:left" target="_blank"><img src="' + base_url + '/assets/ig.png"/></a>'

        bottom_left.innerHTML = bottom_left_HTML

        var bottom_right_HTML = ''

        bottom_right_HTML = '<img src="' + base_url + '/assets/date.png" width="150px" style="margin-bottom:10px" />'
        
        bottom_right.innerHTML = bottom_right_HTML

        bottom_right.appendChild(countdown)

        bottom_left.style.marginBottom = "40px"
        bottom_right.style.marginBottom = "40px"

        VisitPageButton.style =
            'background: rgb(241, 171, 27);width: 220px;padding: 10px;text-transform: uppercase;position: relative;border-radius: 4px;font-family: Bahnschrift, "Adobe NotDef";font-variation-settings: "wght" 400, "wdth" 75;font-size: 20px;color: rgb(255, 255, 255);letter-spacing: 1px;text-decoration: none;text-align: center;'

        VisitPageButton.innerText = 'Prueba un mes gratis'
        VisitPageButton.href = 'https://es.hboespana.com/'
        VisitPageButton.target = '_blank'
        VisitPageButton.id = 'freemonth'

       var vpbutton_container = document.createElement('div')
        vpbutton_container.style = 'width:100%;text-align:center'

        vpbutton_container.appendChild(VisitPageButton)
        
        bottom_container.appendChild(bottom_left)
        bottom_container.appendChild(bottom_right)
       
        bottom_container.appendChild(vpbutton_container)

        header.appendChild(closeButton)
        wrapper.insertBefore(header, wrapper.firstChild);
        wrapper.appendChild(bottom_container)
        wrapper.appendChild(powered)
        wrapper.appendChild(menu)

        var video_wrapper = document.getElementById('fluid_video_wrapper_video-id')

        document.getElementById('exclusiveItem').addEventListener('click', function (e) {

            var player = document.getElementById('player')

            e.preventDefault()
            document.getElementById('video-id').pause()
            removeIfExists(['avengers_container'])
            document.getElementsByClassName('active')[0].classList.remove('active')
            document.getElementById('exclusiveItem').classList.add('active')

            document.getElementById('bottom_container').style.marginTop = '100px'

            video_wrapper.style.display = 'none'
            document.getElementById('thumbnail-videos').style.display = 'none'
            document.getElementById('bottom_container').style.display = 'block';

            hideIfExists(['bottom_container'])

            if (!document.getElementById('exclusive_video')) {
                var video_div = document.createElement('div');
                var playlist = document.createElement('div');

                var video_tag = document.createElement('video')
                var source = document.createElement('source')

                video_div.id = "exclusive_video"
                playlist.id = "exclusive_playlist"

                source.type = "video/mp4"
                video_tag.appendChild(source)
                video_tag.controls = true
                video_tag.style = "width:100%"

                video_div.style = "position:absolute;left:10px;top:70px;width:95%;" 

                playlist.style = "position: absolute;left: 0px;right:0;margin: 0 auto;bottom: 130px;width: 320px;background: rgba(0, 0, 0, 0.8);padding: 0px 0px;" 

                var videos = [
                    {'name' : 'Making Off', 'source' : 'makingoff.mp4', 'thumb' : 'exclusive_thumb1.png' },
                    {'name' : 'Las Casas', 'source' : 'lascasas.mp4', 'thumb' : 'exclusive_thumb1.png' },
                    {'name' : 'Escenas rodadas por España', 'source' : 'rodajesespaña.mp4', 'thumb' : 'exclusive_thumb1.png' },
                    {'name' : 'Los mejores besos', 'source' : 'mejoresbesos.mp4', 'thumb' : 'exclusive_thumb1.png' }
                ]

                videos.map((video,i) => {
                
                    var thumb_div = document.createElement('div')
                        thumb_div.className = "thumb"
                        thumb_div.setAttribute('video-src', video.source)
                        thumb_div.innerHTML = '<img src="' + base_url + '/assets/'+ video.thumb + '" style="padding: 5px;float: left;"><span class="thumb-name">' + video.name + '</span>'
                        thumb_div.addEventListener('click', function(e){
                            video_tag.src = base_url + "/assets/videos/" + thumb_div.getAttribute('video-src')

                            document.getElementsByClassName('thumb-active')[0].className = "thumb"
                            thumb_div.className = "thumb thumb-active"

                            video_tag.play()
                        })
                        playlist.appendChild(thumb_div)
                        if(i === 0){
                            thumb_div.className = "thumb thumb-active"
                            video_tag.src = base_url + "/assets/videos/" + video.source
                        }
                })

                var freemonth2 = document.getElementById('freemonth').cloneNode(true)
                    freemonth2.id = "freemonth2"
                    freemonth2.style = 'background: rgb(241, 171, 27);width: 220px;padding: 10px;text-transform: uppercase;position: absolute;text-align: center;bottom: 70px;left: 0px;right: 0;margin: 0px auto;border-radius: 4px;font-family: Bahnschrift, "Adobe NotDef";font-variation-settings: "wght" 400, "wdth" 75;font-size: 20px;color: rgb(255, 255, 255);letter-spacing: 1px;text-decoration: none'
                    freemonth2.href = "https://es.hboespana.com/"
                    freemonth2.target = "_blank"
                    wrapper.appendChild(freemonth2)
                    video_div.appendChild(video_tag)
                    
                    wrapper.appendChild(video_div);
                    wrapper.appendChild(playlist)
            }
        })

        document.getElementById('videosItem').addEventListener('click', function (e) {
            e.preventDefault()
            document.getElementById('bottom_container').style.marginTop = '0px'
            document.getElementById('video-id').pause()
            removeIfExists(['avengers_container', 'synopsis', 'exclusive_playlist', 'exclusive_video', 'freemonth2'])
            document.getElementsByClassName('active')[0].classList.remove('active')
            document.getElementById('videosItem').classList.add('active')

            video_wrapper.style.display = 'block'
            document.getElementById('thumbnail-videos').style.display = 'block'
            document.getElementById('bottom_container').style.display = 'block';
        })

        document.getElementById('charactersItem').addEventListener('click', function(e) {
            e.preventDefault();

            if(!document.getElementById('avengers_container')){

                document.getElementById('video-id').pause();

                document.getElementsByClassName('active')[0].classList.remove('active');
                document.getElementById('charactersItem').classList.add('active');
                
                removeIfExists(['synopsis', 'date',  'exclusive_playlist', 'exclusive_video', 'freemonth2' ]);

                showIfExists(['bottom_container'])

                video_wrapper.style.display = 'none';
                document.getElementById('thumbnail-videos').style.display = 'none';
                //document.getElementById('bottom_container').style.display = 'none';
                document.getElementById('bottom_container').style.marginTop = '50px'

                var avengers_container = document.createElement('div')
                var avengers = document.createElement('div')
                
                var data = [
                    {name: "Cersei Lannister", url : "#", image : "cerseilannister.png"},
                    {name: "Tyrion Lannister", url : "#", image : "tyrionlannister.png"},
                    {name: "Daenerys Targaryen", url : "#", image : "daenerystargaryen.png"},
                    {name: "Jon Nieve", url : "#", image : "jonnieve.png"},
                    {name: "Sansa Stark", url : "#", image : "sansastark.png"},
                    {name: "Arya Stark", url : "#", image : "aryastark.png"},
                    {name: "Euron Greyjoy", url : "#", image : "eurongreyjoy.png"},
                    {name: "Podrick Payne", url : "#", image : "podrickpayne.png"}
                ]


                var avengersHTML = ''

                data.map(character => {
                    avengersHTML += '<div class="character" href="'+ character.url +'" target="_blank"><a target="_blank" href="http://viewers-guide.hbo.com/game-of-thrones/season-7/episode-7/people"><img src="' + base_url + '/assets/characters/' + character.image + '"/><span>' + character.name + '</span></a></div>'
                })

                avengers.style = "position: absolute;top: 30px;left: 10px;height: 550px;overflow: hidden;width: 100%;text-transform:uppercase"
                avengers.innerHTML = avengersHTML
                avengers_container.style = "width: 100%;height:300px;position: absolute;top: 30px;overflow: hidden;"
                avengers_container.id = "avengers_container"


                avengers_container.appendChild(avengers)
                wrapper.appendChild(avengers_container)
            }

        });

        closeButton.addEventListener('click', function () {
            removeIfExists(['header', 'visitPageButton', 'poweredbyvidoomy', 'bottom_container',
                'menu', 'synopsis', 'saveCalendarDropdown', 'avengers_container', 'exclusive_video', 'exclusive_playlist', 'freemonth2'
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