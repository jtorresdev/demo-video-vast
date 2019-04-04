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

//var base_url = "https://jtorresdev.github.io/demo-video-vast/endgame"
var base_url = "http://localwebapp/video/toystory"

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
				var logo = document.createElement('img');
				var powered = document.createElement('img');
				var close = document.createElement('img');
				var rrss = document.createElement('div');
				var rrss_links = document.createElement('div');
				var menu = document.createElement('a');
				var text = document.createElement('div')
				var buytickets = document.createElement('div')

				background.style = "background-image:url('" + base_url + "/assets/background.png');width:" + width + ';height:' + height +';background-repeat: no-repeat;';

				logoTop.src = ''+ base_url +'/assets/logo.png';
				logoTop.style = 'position:absolute;top:10px;left:10px;width: 170px;';

				logo.src = ''+ base_url +'/assets/logo1.png';
				logo.style = 'z-index:5;position:relative';
				
				text.innerHTML = '<div style="font-family: FatFrank;font-size: 80px;color: #ffe65c;text-transform: uppercase;line-height: 65px;margin-top: -20px;z-index: 5;">¡ya en cines!</div>'

				buytickets.innerHTML = '<a href="#" style="text-decoration: none"><div style="width: 250px;height: 60px;font-size: 16px;font-family: FatFrank;color: #ffd900;letter-spacing: 2px;text-transform: uppercase;line-height: 60px;position: relative;margin: 0 auto;background-image: url(assets/buytickets.png);background-repeat: no-repeat;"><span style="margin-right: 15px;">Comprar entradas</span><img style="position: absolute;top: 20px;right: 20px;" src="'+ base_url +'/assets/arrow-yellow.png"/></div></div></a>'

				close.src = ''+ base_url +'/assets/close.png';
				close.style = 'position:absolute;top:10px;right:10px;cursor: pointer;';
				close.id = 'closeButton';

				bannerRight.style = 'position: absolute;right: 10px;bottom: 90px;width: 290px;text-align: center;';

				powered.src = ''+ base_url +'/assets/powered.png';
				powered.style = 'position:absolute;bottom:10px;right:10px';

				rrss.innerHTML = '<span style="z-index: 5;position: relative;">#ToyStory4</span>';

				rrss.style =
					'position: absolute;top: 6px;letter-spacing: -1px;color: #ffd900;font-family: Montserrat_Bold;font-size: 20px;width: 130px;text-align: center;margin: 0 auto;left: 0;right: 0;';

				rrssHTML = '';
				rrssHTML +=
					'<a href="https://www.facebook.com/avengers/" style="float:left" target="_blank"><img src="'+ base_url +'/assets/fb.png"/></a>';
				rrssHTML +=
					'<a href="https://twitter.com/avengers" style="float:left;margin: 0px 30px;" target="_blank"><img src="'+ base_url +'/assets/tw.png"/></a>';
				rrssHTML +=
					'<a href="https://www.instagram.com/avengers" style="float:left" target="_blank"><img src="'+ base_url +'/assets/ig.png"/></a>';

				rrss_links.style = 'margin-bottom: 5px;background: #e20025;clip-path: polygon(20% 0%, 100% 6%, 100% 6%, 100% 83%, 100% 84%, 0px 89%, 0px 91%, 3% 0px);  width: 120px;height: 30px;padding: 12px 0 0 10px;top: 15px;position: absolute;z-index: 2;';

				rrss_links.innerHTML = rrssHTML;

				rrss.appendChild(rrss_links);

				bannerRight.appendChild(logo);
				bannerRight.appendChild(text);
				bannerRight.appendChild(buytickets);

				menu.style = 'position:absolute;right:20px;top:15px';
				menu.href = "#"

				var menuHTML = '';

				menuHTML += '<div style="color:#fff;font-family:FatFrank;text-transform: uppercase;line-height: 22px;text-align: center;">'
				menuHTML += '<div style="float:left">'
				menuHTML += '<div style="font-size: 30px;">Descubre la</div>'
				menuHTML += '<div style="font-size: 21px;">nueva aventura</div>'
				menuHTML += '</div>'
				menuHTML += '<div class="circlebutton"><img style="padding: 11px;" src="'+ base_url +'/assets/arrow-blue.png"/></div>'
				menuHTML += '</div>';

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
