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

var base_url = "http://localwebapp/video/endgame"


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
	removeIfExists([ 'saveCalendarDropdown' ]);
	document.getElementsByClassName('active')[0].classList.remove('active');
	document.getElementById('videosItem').classList.add('active');
	// si no ha terminado la transicion, vuelve al tamaño inicial
	video_wrapper.style.width = width;
	video_wrapper.style.height = height;
	video_wrapper.style.marginTop = '0px';
	video_wrapper.style.marginLeft = '0px';
};

var playerIn = function() {
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

var hideControlBar = function() {
	document.getElementById('video-id_fluid_controls_container').style.display = 'none';
	document.getElementById('video-id_fluid_initial_play').style = 'cursor:none;display:none';
};

var playOnClick = function() {
	document.getElementById('video-id').addEventListener('click', function() {
		playerIn();
	});
};

var makeUnmuteButton = function() {
	var unmuteButton = document.createElement('div');

	unmuteButton.innerHTML = '<img src="'+ base_url +'/assets/unmute.png">';
	unmuteButton.id = 'video-id_fluid_initial_play';

	var initial_play = document.getElementById('video-id_fluid_initial_play_button');

	initial_play.insertBefore(unmuteButton, initial_play.firstChild);

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
	});
	document.getElementById('fluid_video_wrapper_video-id').appendChild(paper);
};

var options = {
	layoutControls: {
		primaryColor: '#d9c408',
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
				var date = document.createElement('img');
				var powered = document.createElement('img');
				var close = document.createElement('img');
				var rrss = document.createElement('div');
				var rrss_links = document.createElement('div');
				var menu = document.createElement('div');
				var countdown = document.createElement('div')

				background.style = "background-image:url('" + base_url + "/assets/background.png');width:" + width + ';height:' + height +';background-repeat: no-repeat;';

				logoTop.src = ''+ base_url +'/assets/logo.png';
				logoTop.style = 'position:absolute;top:10px;left:10px;width: 100px;';

				date.src = ''+ base_url +'/assets/date.png';
				date.style = 'margin-top: 20px;';

				countdown.id = "countdown"

				var deadline = new Date("Apr 26, 2019 00:00:00").getTime(); 
				var x = setInterval(function() { 
				var now = new Date().getTime(); 
				var t = deadline - now; 
				var days = Math.floor(t / (1000 * 60 * 60 * 24)); 
				var hours = Math.floor((t%(1000 * 60 * 60 * 24))/(1000 * 60 * 60)); 
				var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60)); 
				var seconds = Math.floor((t % (1000 * 60)) / 1000); 
				countdown.style = "font-size: 40px;font-family: steelfishEb;color: white;background: rgba(0, 0, 0, 0.5);height:55px;padding: 10px 10px;line-height: 30px;margin: 0 auto;display: table;"
				var countdownHTML = ''
					countdownHTML += '<div id="days" style="text-align:center;float: left;padding: 0 10px;"><div>'+ days +'</div><span style="color:#9c97ae;font-size: 20px;">DIAS</span></div>'
					countdownHTML += '<div id="hours" style="text-align:center;float: left;padding: 0 10px;"><div>'+ hours +'</div><span style="color:#9c97ae;font-size: 20px;">HORAS</span></div>'
					countdownHTML += '<div id="minutes" style="text-align:center;float: left;padding: 0 10px;"><div>'+ minutes +'</div><span style="color:#9c97ae;font-size: 20px;">MINUTOS</span></div>'
					countdownHTML += '<div id="seconds" style="text-align:center;float: left;padding: 0 10px;"><div>'+ seconds +'</div><span style="color:#9c97ae;font-size: 20px;">SEGUNDOS</span></div>'
				countdown.innerHTML = countdownHTML; 
					if (t < 0) {
						clearInterval(x); 
						countdown.innerHTML = "EXPIRED"; 
					} 
				}, 1000);
			

				close.src = ''+ base_url +'/assets/close.png';
				close.style = 'position:absolute;top:10px;right:10px;cursor: pointer;';
				close.id = 'closeButton';

				bannerRight.style = 'position: absolute;right: 10px;bottom: 130px;width: 290px;text-align: center;';

				powered.src = ''+ base_url +'/assets/powered.png';
				powered.style = 'position:absolute;bottom:10px;right:10px';

				rrss.innerHTML = '#AVENGERSENDGAME';
				rrss.style =
					'    position: absolute;top: 6px;left: 130px;letter-spacing: 1px;color: #fff;font-family: steelfishEb;font-size: 20px;width: 125px;text-align: center;';

				rrssHTML = '';
				rrssHTML +=
					'<a href="https://www.facebook.com/hellboymovie/" style="float:left" target="_blank"><img src="'+ base_url +'/assets/fb.png"/></a>';
				rrssHTML +=
					'<a href="https://twitter.com/hellboymovie" style="float:left;margin: 0px 30px;" target="_blank"><img src="'+ base_url +'/assets/tw.png"/></a>';
				rrssHTML +=
					'<a href="https://www.instagram.com/hellboymovie" style="float:left" target="_blank"><img src="'+ base_url +'/assets/ig.png"/></a>';

				rrss_links.style.marginLeft = '5px';
				rrss_links.innerHTML = rrssHTML;

				rrss.appendChild(rrss_links);

				bannerRight.appendChild(date);
				bannerRight.appendChild(countdown)

				menu.style = 'position:absolute;right:20px;top:10px';

				var menuHTML = '';

				menuHTML = '<ul>';
				menuHTML += '<li class="active" id="videosItem"><a href="#">Trailers</a></li>';
				menuHTML += '<li id="avengersItem"><a href="#">Vengadores</a></li>';
				menuHTML += '<li id="synopsisItem"><a href="#">Sinopsis</a></li>';
				menuHTML += '</ul>';

				menu.innerHTML = menuHTML;
				menu.id = 'menu';

				wrapper.appendChild(menu);
				wrapper.appendChild(rrss);
				wrapper.appendChild(logoTop);
				wrapper.appendChild(close);
				wrapper.appendChild(powered);
				wrapper.appendChild(bannerRight);
				wrapper.appendChild(background);

				close.addEventListener('click', function() {
					removeIfExists([ 'synopsis', 'visitPageButton', 'date' ]);

					document.getElementById('fluid_video_wrapper_video-id').style.display = 'block';
					document.getElementById('thumbnail-videos').style.display = 'block';
					document.getElementById('paper').style.display = 'block';

					playerOut();

					removeAllListener();
					document.getElementById('video-id_fluid_controls_container').style.display = 'none';
					document.getElementById('video-id_fluid_initial_play').style = 'cursor:none;display:none';
					video.pause();
				});

				document.getElementById('synopsisItem').addEventListener('click', function(e) {
					document.getElementById('video-id').pause();

					e.preventDefault();

					removeIfExists([ 'saveCalendarDropdown' ]);

					document.getElementsByClassName('active')[0].classList.remove('active');
					document.getElementById('synopsisItem').classList.add('active');

					video_wrapper.style.display = 'none';
					bannerRight.style.display = 'none';
					document.getElementById('thumbnail-videos').style.display = 'none';

					if (!document.getElementById('synopsis')) {
						var synopsis = document.createElement('div');
						var VisitPageButton = document.createElement('a');
						var date1 = document.createElement('img');

						synopsis.style =
							'position: absolute;top: 20%;left: 50px;color: white;width:90%;font-size: ' + fontSize + ';font-family: bahnschrift;text-transform: uppercase;line-height: 25px;';
						synopsis.id = 'synopsis';
						var synopsisHTML = '';
						synopsisHTML +=
							'<p style="font-size: 25px;margin-bottom: 0px;">Avengers end game</p>';
						synopsisHTML +=
							'<p>Después de los eventos devastadores de Avengers: Infinity War, el universo está en ruinas debido a las acciones de Thanos, el Titán Loco. Con la ayuda de los aliados que quedaron, los Vengadores deben reunirse una vez más para deshacer sus acciones y restaurar el orden en el universo de una vez por todas, si importar cuáles son las consecuencias. Cuarta entrega de la saga "Vengadores".</p>';
						synopsis.innerHTML = synopsisHTML;

						VisitPageButton.style =
							'position: absolute;bottom: 12%;left: 60px;width: 25%;height: 50px;color: #fff;background: #eb0d0d;font-size: 16px;font-family: bahnschrift;text-transform: uppercase;text-align: center;line-height: 50px;cursor: pointer;text-decoration: none;-webkit-clip-path: polygon(9% 0, 100% 0, 100% 0, 100% 74%, 91% 100%, 0 100%, 0 100%, 0 29%);clip-path: polygon(9% 0, 100% 0, 100% 0, 100% 74%, 91% 100%, 0 100%, 0 100%, 0 29%);';

						VisitPageButton.innerText = 'Visitar pagina web';
						VisitPageButton.href = 'https://www.hellboy.movie/';
						VisitPageButton.target = '_blank';
						VisitPageButton.id = 'visitPageButton';

						date1.src = ''+ base_url +'/assets/date.png';
						date1.style = 'position: relative;bottom: 25%;margin: 0px auto;display: block;width: 20%;';
						date1.id = 'date';

						wrapper.appendChild(date1);
						wrapper.appendChild(VisitPageButton);
						wrapper.appendChild(synopsis);

						removeAllListener();
					}
				});

				document.getElementById('videosItem').addEventListener('click', function(e) {
					e.preventDefault();
					document.getElementsByClassName('active')[0].classList.remove('active');
					document.getElementById('videosItem').classList.add('active');

					removeIfExists([ 'saveCalendarDropdown', 'synopsis', 'date', 'visitPageButton' ]);

					video_wrapper.style.display = 'block';
					bannerRight.style.display = 'block';
					document.getElementById('thumbnail-videos').style.display = 'block';
				});

				document.getElementById('avengersItem').addEventListener('click', function(e) {
					e.preventDefault();

					document.getElementById('video-id').pause();

					document.getElementsByClassName('active')[0].classList.remove('active');
					document.getElementById('avengersItem').classList.add('active');
					

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
	var unmute = document.getElementById('video-id_fluid_initial_play');
	if (unmute.classList[0] != 'fluid_initial_play') {
		unmute.remove();
		document.getElementById('video-id_fluid_initial_play').style = 'display:block;background:#d9c408';
	}
});

video.on('play', function() {
	wrapper.addEventListener('mouseenter', playerIn);
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
			document.getElementById('video-id_fluid_initial_play').style = 'display:block;background:#d9c408';
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
