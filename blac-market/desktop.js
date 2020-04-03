function getParamValue(paramName) {
	var url = window.location.search.substring(1); //get rid of "?" in querystring
	var qArray = url.split('&'); //get key-value pairs
	for (var i = 0; i < qArray.length; i++) {
		var pArr = qArray[i].split('='); //split key and value
		if (pArr[0] == paramName) return pArr[1]; //return value
	}
}

var firstPlay = true;

var width = document.currentScript.getAttribute('playerWidth') || '800px';
var height = parseInt(width.replace('px', '')) * 0.5625 + 'px';
var fontSize = document.currentScript.getAttribute('fontSize') || '16px';
var newWidth = document.currentScript.getAttribute('shortPlayerWidth') || '409px';
var newHeight = parseInt(newWidth.replace('px', '')) * 0.5625 + 'px';

var marginTop = '100px';
var marginLeft = '20px';
var base_url = './';

var hidePlayerButtons = function () {
	var hide = 'display:none';

	var fullscreen = document.getElementById('video-id_fluid_control_fullscreen');
	fullscreen.style = hide;
	var theatre = document.getElementById('video-id_fluid_control_theatre');
	theatre.style = hide;
	var progress = document.getElementById('video-id_fluid_control_duration');
	progress.style = hide;
};

var showPlayerButtons = function () {
	var show = 'display:block';

	var fullscreen = document.getElementById('video-id_fluid_control_fullscreen');
	fullscreen.style = show;
	var theatre = document.getElementById('video-id_fluid_control_theatre');
	theatre.style = show;
	var progress = document.getElementById('video-id_fluid_control_duration');
	progress.style = show;
};

var removeAllListener = function () {
	wrapper.removeEventListener('mouseleave', playerOut);
	wrapper.removeEventListener('mouseenter', playerIn);
};

var playerOut = function () {
	var video_wrapper = document.getElementById('fluid_video_wrapper_video-id');
	removeIfExists(['saveCalendarDropdown']);
	// si no ha terminado la transicion, vuelve al tamaño inicial
	video_wrapper.style.width = width;
	video_wrapper.style.height = height;
	video_wrapper.style.marginTop = '0px';
	video_wrapper.style.marginLeft = '0px';
};

var playerIn = function () {
	removeIfExists(['unmuteButton']);
	document.getElementById('paper').style.display = 'none';
	//video.muteToggle('video-id', true);
	document.getElementById('video-id_fluid_controls_container').style.display = 'block';
	var video_wrapper = document.getElementById('fluid_video_wrapper_video-id');
	video_wrapper.style.width = newWidth;
	video_wrapper.style.height = newHeight;
	video_wrapper.style.marginTop = marginTop;
	video_wrapper.style.marginLeft = marginLeft;
};

var removeIfExists = function (ids) {
	ids.map((id) => {
		document.getElementById(id) ? document.getElementById(id).remove() : null;
	});
};

var hideControlBar = function () {
	document.getElementById('video-id_fluid_controls_container').style.display = 'none';
	document.getElementById('video-id_fluid_initial_play').style = 'cursor:none;display:none';
};

var playOnClick = function () {
	document.getElementById('video-id').addEventListener('click', function () {
		//removeIfExists(['unmuteButton'])
	});
};

var makeUnmuteButton = function () {
	var unmuteButton = document.createElement('div');
	unmuteButton.id = 'unmuteButton';
	unmuteButton.innerHTML = '<img src="' + base_url + '/assets/unmute.png">';
	unmuteButton.style =
		'width: 100%;height: 100%;position: absolute;top: 0;right: 0;bottom: 0;left: 0;margin: auto;display: flex;flex-direction: column;justify-content: center;align-items: center;pointer-events: none;z-index: 999;cursor:pointer';

	var initial_play = document.getElementById('video-id_fluid_initial_play_button');

	initial_play.insertBefore(unmuteButton, initial_play.firstChild);

	wrapper.appendChild(unmuteButton);

	unmuteButton.addEventListener('click', playerIn);
};

var makePaper = function () {
	var paper = document.createElement('img');
	paper.src = '' + base_url + '/assets/paper.png';
	paper.style = 'position: absolute;bottom: 0px;right: 0px;z-index: 99;cursor:pointer; opacity:0';
	paper.id = 'paper';
	paper.addEventListener('click', function () {
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
		removeIfExists(['unmuteButton']);
	});
	document.getElementById('fluid_video_wrapper_video-id').appendChild(paper);
};

var options = {
	layoutControls: {
		primaryColor: '#d9c408',
		posterImage: '' + base_url + '/assets/poster.png',
		playButtonShowing: true,
		persistentSettings: {
			volume: false,
		},
		autoPlay: true,
		mute: true,
		playerInitCallback: function () {
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
				var offers = document.createElement('a');
				var logo = document.createElement('img');
				var logoTop = document.createElement('img');
				var date = document.createElement('img');
				var powered = document.createElement('a');
				var close = document.createElement('img');
				var rrss = document.createElement('div');
				var rrss_links = document.createElement('div');
				var menu = document.createElement('div');

				background.style =
					"background-image:url('" + base_url + "/assets/background.png');width:" + width + ';height:' + height + ';background-repeat: no-repeat;';

				date.src = '' + base_url + '/assets/date.png';
				date.style = 'margin-top: 20px;';

				close.src = '' + base_url + '/assets/close.png';
				close.style = 'position:absolute;top:10px;right:10px;cursor: pointer;';
				close.id = 'closeButton';

				offers.setAttribute('href', '#');
				offers.style = 'position: absolute;right: -10px;bottom: 153px;width: 220px;text-align: center;';

				powered.setAttribute('href', '#');
				powered.innerHTML = '<img src="' + base_url + '/assets/codigos.png" /></a >';
				powered.style = 'position:absolute;bottom:37px;right:50px';

				rrss.innerHTML = '';
				rrss.style = 'position: absolute;top: 28px;left: 197px;opacity: 0.5;';

				rrssHTML = '';
				rrssHTML += '<a href="https://www.facebook.com/" target="_blank"><img src="' + base_url + '/assets/fb.png"/></a>';
				rrssHTML += '<a href="https://twitter.com" target="_blank"><img src="' + base_url + '/assets/tw.png"/></a>';
				rrssHTML += '<a href="https://www.instagram.com/" target="_blank"><img src="' + base_url + '/assets/ig.png"/></a>';

				rrssHTML +=
					'<a href="https://www.linkedin.com/" style="margin-top: -2px;" target="_blank"><img src="' + base_url + '/assets/linkedin.png"/></a>';

				rrss_links.style = 'display: flex;justify-content: space-evenly;width: 150px;';
				rrss_links.innerHTML = rrssHTML;

				rrss.appendChild(rrss_links);

				offers.appendChild(date);

				menu.style = 'position:absolute;right:20px;top:10px';

				var menuHTML = '';

				menuHTML = '<ul>';
				menuHTML += '<li class="active" id=""><img src="' + base_url + '/assets/home.png" /></li>';
				menuHTML += '<li id="videosItem"><a href="#"><img src="' + base_url + '/assets/CALIDAD.png" /></a></li>';
				menuHTML += '<li id="synopsisItem"><a href="#"><img src="' + base_url + '/assets/AYUDA.png" /></a></li>';
				menuHTML += '</ul>';

				menu.innerHTML = menuHTML;
				menu.id = 'menu';

				wrapper.appendChild(menu);
				wrapper.appendChild(rrss);

				wrapper.appendChild(close);
				wrapper.appendChild(powered);
				wrapper.appendChild(offers);
				wrapper.appendChild(background);

				close.addEventListener('click', function () {
					removeIfExists(['synopsis', 'visitPageButton', 'date']);

					document.getElementById('fluid_video_wrapper_video-id').style.display = 'block';
					document.getElementById('paper').style.display = 'block';

					playerOut();

					removeAllListener();
					document.getElementById('video-id_fluid_controls_container').style.display = 'none';
					document.getElementById('video-id_fluid_initial_play').style = 'cursor:none;display:none';
					video.pause();
				});
			}

			// agregamos el listener para cuando termine de achicarse
			video_wrapper.addEventListener('transitionend', function (event) {
				if (event.propertyName === 'width') {
					if (event.elapsedTime <= 3 && video_wrapper.style.width === width) {
					}
				}
			});

			// agregamos el listener para cuando el mouse salga del reproductor
			wrapper.addEventListener('mouseleave', playerOut);

			firstPlay = false;
		},
	},
};

var video = fluidPlayer('video-id', options);

video.on('pause', function () {
	var unmute = document.getElementById('video-id_fluid_initial_play');
	if (unmute.classList[0] != 'fluid_initial_play') {
		unmute.remove();
		document.getElementById('video-id_fluid_initial_play').style = 'display:block;background:#d9c408';
	}
});

video.on('play', function () {
	wrapper.addEventListener('mouseenter', playerIn);
});
