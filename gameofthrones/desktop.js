function getParamValue(paramName) {
	var url = window.location.search.substring(1); //get rid of "?" in querystring
	var qArray = url.split('&'); //get key-value pairs
	for (var i = 0; i < qArray.length; i++) {
		var pArr = qArray[i].split('='); //split key and value
		if (pArr[0] == paramName)
			return pArr[1]; //return value
	}
}

var firstPlay = true;

var width = document.currentScript.getAttribute('playerWidth')||'800px';
var height = parseInt(width.replace('px', '')) * 0.5625 + 'px';
var fontSize = document.currentScript.getAttribute('fontSize')||'16px';
var newWidth = document.currentScript.getAttribute('shortPlayerWidth')||'480px';
var newHeight = parseInt(newWidth.replace('px', '')) * 0.5625 + 'px';

var marginTop = '60px';
var marginLeft = '10px';

var base_url = "https://jtorresdev.github.io/demo-video-vast/gameofthrones"
//var base_url = "./"

var hidePlayerButtons = function() {
	var hide = 'display:none';

	var fullscreen = document.getElementById('video-id_fluid_control_fullscreen');
	fullscreen.style = hide;
	var theatre = document.getElementById('video-id_fluid_control_theatre');
	theatre.style = hide;
	var progress = document.getElementById('video-id_fluid_control_duration');
	progress.style = hide;
};

var showPlayerButtons = function() {
	var show = 'display:block';

	var fullscreen = document.getElementById('video-id_fluid_control_fullscreen');
	fullscreen.style = show;
	var theatre = document.getElementById('video-id_fluid_control_theatre');
	theatre.style = show;
	var progress = document.getElementById('video-id_fluid_control_duration');
	progress.style = show;
};

var removeAllListener = function() {
	wrapper.removeEventListener('mouseleave', playerOut);
	wrapper.removeEventListener('mouseenter', playerIn);
};

var playerOut = function() {
	var video_wrapper = document.getElementById('fluid_video_wrapper_video-id');
	removeIfExists([ 'saveCalendarDropdown', 'avengers_container' ]);
	document.getElementsByClassName('active')[0].classList.remove('active');
	document.getElementById('videosItem').classList.add('active');
	// si no ha terminado la transicion, vuelve al tamaño inicial
	video_wrapper.style.width = width;
	video_wrapper.style.height = height;
	video_wrapper.style.marginTop = '0px';
	video_wrapper.style.marginLeft = '0px';
};

var playerIn = function() {
	removeIfExists([ 'unmuteButton' ])
	document.getElementById('paper').style.display = 'none';
	video.muteToggle('video-id', true);
	document.getElementById('video-id_fluid_controls_container').style.display = 'block';
	var video_wrapper = document.getElementById('fluid_video_wrapper_video-id');
	video_wrapper.style.width = newWidth;
	video_wrapper.style.height = newHeight;
	video_wrapper.style.marginTop = marginTop;
	video_wrapper.style.marginLeft = marginLeft;
};

var removeIfExists = function(ids) {
	ids.map((id) => {
		document.getElementById(id) ? document.getElementById(id).remove() : null;
	});
};

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

var hideControlBar = function() {
	document.getElementById('video-id_fluid_controls_container').style.display = 'none';
	document.getElementById('video-id_fluid_initial_play').style = 'cursor:none;display:none';
};

var playOnClick = function() {
	document.getElementById('video-id').addEventListener('click', function() {
		//playerIn();
	});
};

var makeUnmuteButton = function() {
	var unmuteButton = document.createElement('div');
	unmuteButton.id = "unmuteButton"
	unmuteButton.innerHTML = '<img src="'+ base_url +'/assets/unmute.png">';
	unmuteButton.style = "width: 100%;height: 100%;position: absolute;top: 0;right: 0;bottom: 0;left: 0;margin: auto;display: flex;flex-direction: column;justify-content: center;align-items: center;pointer-events: none;z-index: 999;cursor:pointer"

	wrapper.appendChild(unmuteButton)

	unmuteButton.addEventListener('click', playerIn);
};

var makePaper = function() {
	var paper = document.createElement('img');
	paper.src = ''+ base_url +'/assets/paper.png';
	paper.style = 'position: absolute;bottom: 0px;right: 0px;z-index: 99;cursor:pointer';
	paper.id = 'paper';
	paper.addEventListener('click', function() {
		document.getElementById('paper').style.display = 'none';
		video.muteToggle('video-id', true);
		document.getElementById('video-id_fluid_controls_container').style.display = 'block';
		video.play();
		var video_wrapper = document.getElementById('fluid_video_wrapper_video-id');
		video_wrapper.style.width = newWidth;
		video_wrapper.style.height = newHeight;
		video_wrapper.style.marginTop = marginTop;
		video_wrapper.style.marginLeft = marginLeft;
		removeAllListener();
		removeIfExists(['unmuteButton'])
	});
	document.getElementById('fluid_video_wrapper_video-id').appendChild(paper);
};

var options = {
	layoutControls: {
		primaryColor: '#fff',
		posterImage: ''+ base_url +'/assets/poster.png',
		playButtonShowing: true,
		persistentSettings: {
			volume: false
		},
		autoPlay: false,
		mute: true,
		playerInitCallback: function() {
			hidePlayerButtons();
			hideControlBar();

			playOnClick();

			makeUnmuteButton();
			makePaper();

			// obtenemos el contenedor del reproductor
			var video_wrapper = document.getElementById('fluid_video_wrapper_video-id');

			// si el reproductor ya se achicó en el siguiente bucle mantendra el tamaño
			video_wrapper.style = 'position: absolute;width: ' + width + ';height: ' + height + ';z-index: 10;';

			// si el primer bucle, agregamos el HTML del fondo
			if (firstPlay) {
				var background = document.createElement('div');
				var bannerRight = document.createElement('div');
				var logoTop = document.createElement('img');
				var powered = document.createElement('img');
				var close = document.createElement('img');
				var rrss = document.createElement('div');
				var rrss_links = document.createElement('div');
				var menu = document.createElement('div');
				var countdown = document.createElement('div')
				var date = document.createElement('img')
				var freemonth = document.createElement('a')

				date.src = base_url + "/assets/date.png"
				date.style = "position: absolute;top: 10px;left: 140px;width: 170px;"

				background.style = "background-image:url('" + base_url + "/assets/background.png');width:" + width + ';height:' + height +';background-repeat: no-repeat;';

				logoTop.src = ''+ base_url +'/assets/logo.png';
				logoTop.style = 'position:absolute;top:10px;left:10px;width: 80px;';

				countdown.id = "countdown"

				freemonth.style = 'background: rgb(241, 171, 27);width: 220px;padding: 10px;text-transform: uppercase;position: absolute;left: 0;top: 90px;right: 0;margin: 0 auto;border-radius: 4px;font-family: Bahnschrift, "Adobe NotDef";font-variation-settings: "wght" 400, "wdth" 75;font-size: 20px;color: #fff;letter-spacing: 1px;text-decoration:none'
				freemonth.innerText = "Prueba un mes gratis"
				freemonth.href = "#"
				freemonth.id = "freemonth"

				function n(n){
					return n > 9 ? "" + n: "0" + n;
				}

				var deadline = new Date("Apr 14, 2019 00:00:00").getTime(); 
				var x = setInterval(function() { 
				var now = new Date().getTime(); 
				var t = deadline - now; 
				var days = Math.floor(t / (1000 * 60 * 60 * 24)); 
				var hours = Math.floor((t%(1000 * 60 * 60 * 24))/(1000 * 60 * 60)); 
				var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60)); 
				var seconds = Math.floor((t % (1000 * 60)) / 1000); 
				countdown.style = 'font-size: 40px;color: white;background: rgba(0, 0, 0, 0.5);height: 55px;padding: 20px 10px 0px 10px;line-height: 20px;margin: 0px auto;display: table;font-family:"TrajanPro-Regular"'
				var countdownHTML = ''
					countdownHTML += '<div id="days" style="text-align:center;float: left;padding: 0 5px;"><div>'+ n(days) +'</div><span style="color:#9c97ae;font-size: 14px;">DÍAS</span></div>'
					countdownHTML += '<div id="hours" style="text-align:center;float: left;padding: 0 5px;"><div>'+ n(hours) +'</div><span style="color:#9c97ae;font-size: 14px;">HRS</span></div>'
					countdownHTML += '<div id="minutes" style="text-align:center;float: left;padding: 0 5px;"><div>'+ n(minutes) +'</div><span style="color:#9c97ae;font-size: 14px;">MINS</span></div>'
					countdownHTML += '<div id="seconds" style="text-align:center;float: left;padding: 0 5px;"><div>'+ n(seconds) +'</div><span style="color:#9c97ae;font-size: 14px;">SEGS</span></div>'
				countdown.innerHTML = countdownHTML; 
					if (t < 0) {
						clearInterval(x); 
						countdown.innerHTML = "EXPIRED"; 
					} 
				}, 1000);
			

				close.src = ''+ base_url +'/assets/close.png';
				close.style = 'position:absolute;top:10px;right:10px;cursor: pointer;';
				close.id = 'closeButton';

				bannerRight.style = 'position: absolute;right: 10px;top: 130px;width: 290px;text-align: center;';

				powered.src = ''+ base_url +'/assets/powered.png';
				powered.style = 'position:absolute;bottom:10px;right:10px';

				rrss.innerHTML = '<span class="hashtag">#PORELTRONO</span>';
				rrss.style =
					'position: absolute;bottom: 50px;right: 200px;letter-spacing: 1px;color: #fff;width: 125px;text-align: center;';
				rrss.id = "rrss"

				rrssHTML = '';
				rrssHTML +=
					'<a href="https://www.facebook.com/avengers/" style="float:left" target="_blank"><img src="'+ base_url +'/assets/fb.png"/></a>';
				rrssHTML +=
					'<a href="https://twitter.com/avengers" style="float:left;margin: 0px 30px;" target="_blank"><img src="'+ base_url +'/assets/tw.png"/></a>';
				rrssHTML +=
					'<a href="https://www.instagram.com/avengers" style="float:left" target="_blank"><img src="'+ base_url +'/assets/ig.png"/></a>';

				rrss_links.style.marginLeft = '5px';
				rrss_links.innerHTML = rrssHTML;

				rrss.appendChild(rrss_links);

				bannerRight.appendChild(countdown)
				bannerRight.appendChild(freemonth)

				menu.style = 'position:absolute;right:20px;top:20px';

				var menuHTML = '';

				menuHTML = '<ul>';
				menuHTML += '<li class="active" id="videosItem"><a href="#">Trailers</a></li>';
				menuHTML += '<li id="charactersItem"><a href="#">Personajes</a></li>';
				menuHTML += '<li id="exclusiveItem"><a href="#">Videos Exclusivos</a></li>';
				menuHTML += '</ul>';

				menu.innerHTML = menuHTML;
				menu.id = 'menu';

				wrapper.appendChild(menu);
				wrapper.appendChild(rrss);
				wrapper.appendChild(date)
				wrapper.appendChild(logoTop);
				wrapper.appendChild(close);
				wrapper.appendChild(powered);
				wrapper.appendChild(bannerRight);
				wrapper.appendChild(background);

				close.addEventListener('click', function() {
					removeIfExists([ 'synopsis', 'visitPageButton', 'date', 'avengers_container' ]);

					document.getElementById('fluid_video_wrapper_video-id').style.display = 'block';
					document.getElementById('thumbnail-videos').style.display = 'block';
					document.getElementById('paper').style.display = 'block';

					playerOut();

					removeAllListener();
					document.getElementById('video-id_fluid_controls_container').style.display = 'none';
					document.getElementById('video-id_fluid_initial_play').style = 'cursor:none;display:none';
					video.pause();
				});

				document.getElementById('exclusiveItem').addEventListener('click', function(e) {
					document.getElementById('video-id').pause();

					e.preventDefault();

					showIfExists(['rrss'])
					removeIfExists([ 'avengers_container', 'freemonth1' ]);

					document.getElementsByClassName('active')[0].classList.remove('active');
					document.getElementById('exclusiveItem').classList.add('active');

					video_wrapper.style.display = 'none';
					bannerRight.style.display = 'none';
					document.getElementById('thumbnail-videos').style.display = 'none';

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

						video_div.style = "position:absolute;left:10px;top:70px;width:480px;height:270px;" 

						playlist.style = "position:absolute;right:10px;top:70px;width:270px;background:rgba(0, 0, 0, 0.8);padding:10px 0" 

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
								thumb_div.innerHTML = '<img src="' + base_url + '/assets/'+ video.thumb + '" style="padding: 10px;float: left;"><span class="thumb-name">' + video.name + '</span>'
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
							freemonth2.style = 'background: rgb(241, 171, 27);width: 220px;padding: 10px;text-transform: uppercase;position: absolute;text-align: center;bottom: 55px;left: 20px;margin: 0px auto;border-radius: 4px;font-family: Bahnschrift, "Adobe NotDef";font-variation-settings: "wght" 400, "wdth" 75;font-size: 20px;color: rgb(255, 255, 255);letter-spacing: 1px;text-decoration: none'

							video_div.appendChild(video_tag)
							wrapper.appendChild(freemonth2)
							wrapper.appendChild(video_div);
							wrapper.appendChild(playlist)

							removeAllListener();
					}
				});

				document.getElementById('videosItem').addEventListener('click', function(e) {
					e.preventDefault();
					document.getElementsByClassName('active')[0].classList.remove('active');
					document.getElementById('videosItem').classList.add('active');

					removeIfExists(['synopsis', 'date', 'visitPageButton', 'avengers_container', 'freemonth1', 'exclusive_playlist', 'exclusive_video', 'freemonth2' ]);
					showIfExists(['rrss'])

					video_wrapper.style.display = 'block';
					bannerRight.style.display = 'block';
					document.getElementById('thumbnail-videos').style.display = 'block';
				});

				document.getElementById('charactersItem').addEventListener('click', function(e) {
					e.preventDefault();

					if(!document.getElementById('avengers_container')){

						document.getElementById('video-id').pause();

						document.getElementsByClassName('active')[0].classList.remove('active');
						document.getElementById('charactersItem').classList.add('active');
						
						removeIfExists(['synopsis', 'date', 'visitPageButton', 'exclusive_playlist', 'exclusive_video', 'freemonth2' ]);
						hideIfExists(['rrss'])

						var freemonth1 = document.getElementById('freemonth').cloneNode(true)
							freemonth1.id = "freemonth1"
							freemonth1.style = 'background: rgb(241, 171, 27);width: 220px;padding: 10px;text-transform: uppercase;position: absolute;text-align: center;top: 200px;right: 20px;margin: 0px auto;border-radius: 4px;font-family: Bahnschrift, "Adobe NotDef";font-variation-settings: "wght" 400, "wdth" 75;font-size: 20px;color: rgb(255, 255, 255);letter-spacing: 1px;text-decoration: none'
						wrapper.appendChild(freemonth1)

						video_wrapper.style.display = 'none';
						bannerRight.style.display = 'none';
						document.getElementById('thumbnail-videos').style.display = 'none';

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
							avengersHTML += '<div class="character" href="'+ character.url +'" target="_blank"><img src="' + base_url + '/assets/characters/' + character.image + '"/><span>' + character.name + '</span></div></div>'
						})

						avengers.style = "position: absolute;top: 10px;left: 10px;height: 100%;overflow: hidden;width: 70%;text-transform:uppercase"
						avengers.innerHTML = avengersHTML
						avengers_container.style = "width: 100%;height: 350px;position: absolute;top: 60px;overflow: hidden;"
						avengers_container.id = "avengers_container"

					
						avengers_container.appendChild(avengers)
						wrapper.appendChild(avengers_container)
					}

				});
			}

			// agregamos el listener para cuando termine de achicarse
			video_wrapper.addEventListener('transitionend', function(event) {
				if (event.propertyName === 'width') {
					if (event.elapsedTime <= 3 && video_wrapper.style.width === width) {
						document.getElementById('paper').style.display = 'block';
					}
				}
			});

			// agregamos el listener para cuando el mouse salga del reproductor
			wrapper.addEventListener('mouseleave', playerOut);

			firstPlay = false;
		}
	}
};

var video = fluidPlayer('video-id', options);

video.on('pause', function() {
	if(document.getElementById('unmuteButton')){
		document.getElementById('video-id_fluid_initial_play').style = "display:none !important";
		document.getElementById('video-id').play()
		video.muteToggle('video-id', true);
		removeIfExists(['unmuteButton'])
	}
});

video.on('play', function() {
	//wrapper.addEventListener('mouseenter', playerIn);
});

video.on('ended', function() {
	var videoPlayer = document.getElementById('video-id');

	var nextVideo = document.getElementById('thumb-video-' + (parseInt(videoPlayer.getAttribute('current-video')) + 1));
	var prevVideo = document.getElementById('thumb-video-' + parseInt(videoPlayer.getAttribute('current-video')));

	if (
		parseInt(videoPlayer.getAttribute('current-video')) + 1 <=
		document.getElementsByClassName('thumb-video').length
	) {
		nextVideo.classList.remove('stopped');
		prevVideo.classList.add('stopped');

		nextVideo.classList.add('currentVideo');
		prevVideo.classList.remove('currentVideo');

		videoPlayer.src = nextVideo.getAttribute('data-src');
		videoPlayer.setAttribute('current-video', parseInt(videoPlayer.getAttribute('current-video')) + 1);
		videoPlayer.play();
		removeAllListener();
		playerIn();
	} else {
		videoPlayer.pause();
		removeAllListener();
	}
});

var videoThumbs = document.getElementsByClassName('thumb-video');

for (let elem of videoThumbs) {
	elem.addEventListener('click', function(e) {
		var unmute = document.getElementById('video-id_fluid_initial_play');
		if (unmute.classList[0] != 'fluid_initial_play') {
			unmute.remove();
			document.getElementById('video-id_fluid_initial_play').style = 'display:block;background:#fff';
		}

		var videoPlayer = document.getElementById('video-id');

		var nextVideo = document.getElementById('thumb-video-' + parseInt(e.target.id.substr(-1)));
		var prevVideo = document.getElementById('thumb-video-' + parseInt(videoPlayer.getAttribute('current-video')));

		nextVideo.classList.add('currentVideo');
		prevVideo.classList.remove('currentVideo');

		nextVideo.classList.remove('stopped');
		prevVideo.classList.add('stopped');

		videoPlayer.src = elem.getAttribute('data-src');
		videoPlayer.setAttribute('current-video', parseInt(e.target.id.substr(-1)));

		video.play();
	});
}
