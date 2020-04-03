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
	removeIfExists(['saveCalendarDropdown']);
	document.getElementsByClassName('active')[0].classList.remove('active');
	document.getElementById('videosItem').classList.add('active');
	// si no ha terminado la transicion, vuelve al tamaño inicial
	/* video_wrapper.style.width = width;
	video_wrapper.style.height = height;
	video_wrapper.style.marginTop = '0px';
	video_wrapper.style.marginLeft = '0px'; */
};

var playerIn = function() {
	removeIfExists(['unmuteButton']);
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
	ids.map(id => {
		document.getElementById(id) ? document.getElementById(id).remove() : null;
	});
};

var hideControlBar = function() {
	document.getElementById('video-id_fluid_controls_container').style.display = 'none';
	document.getElementById('video-id_fluid_initial_play').style = 'cursor:none;display:none';
};

var playOnClick = function() {
	document.getElementById('video-id').addEventListener('click', function() {
		//removeIfExists(['unmuteButton'])
	});
};

var makeUnmuteButton = function() {
	var unmuteButton = document.createElement('div');
	unmuteButton.id = 'unmuteButton';
	unmuteButton.innerHTML = '<img src="' + base_url + '/assets/unmute.png">';
	unmuteButton.style =
		'width: 100%;height: 100%;position: absolute;top: 0;right: 0;bottom: 0;left: 0;margin: auto;display: flex;flex-direction: column;justify-content: center;align-items: center;pointer-events: none;z-index: 999;cursor:pointer';

	wrapper.appendChild(unmuteButton);

	unmuteButton.addEventListener('click', playerIn);
};

var makePaper = function() {
	var paper = document.createElement('img');
	paper.src = '' + base_url + '/assets/paper.png';
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
				var offers = document.createElement('a');
				var logo = document.createElement('img');
				var logoTop = document.createElement('img');
				var date = document.createElement('img');
				var powered = document.createElement('img');
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
				offers.style = 'position: absolute;right: 5%;bottom: 130px;width: 220px;text-align: center;';

				powered.src = '' + base_url + '/assets/codigos.png';
				powered.style = 'position:absolute;bottom:10px;right:10px';

				rrss.innerHTML = '';
				rrss.style = 'position: absolute;top: 28px;left: 197px;opacity: 0.5;';

				rrssHTML = '';
				rrssHTML += '<a href="https://www.facebook.com/" style="float:left" target="_blank"><img src="' + base_url + '/assets/fb.png"/></a>';
				rrssHTML +=
					'<a href="https://twitter.com" style="float:left;margin: 0px 20px;" target="_blank"><img src="' + base_url + '/assets/tw.png"/></a>';
				rrssHTML += '<a href="https://www.instagram.com/" style="float:left" target="_blank"><img src="' + base_url + '/assets/ig.png"/></a>';

				rrssHTML += '<a href="https://www.linkedin.com/" style="float:left" target="_blank"><img src="' + base_url + '/assets/linkedin.png"/></a>';

				rrss_links.style.marginLeft = '5px';
				rrss_links.innerHTML = rrssHTML;

				rrss.appendChild(rrss_links);

				offers.appendChild(date);

				menu.style = 'position:absolute;right:20px;top:10px';

				var menuHTML = '';

				menuHTML = '<ul>';
				menuHTML += '<li class="active" id=""><img src="' + base_url + '/assets/home.png" /></li>';
				menuHTML += '<li id="videosItem"><a href="#"><img src="' + base_url + '/assets/calidad.png" /></a></li>';
				menuHTML += '<li id="synopsisItem"><a href="#"><img src="' + base_url + '/assets/ayuda.png" /></a></li>';
				menuHTML += '</ul>';

				menu.innerHTML = menuHTML;
				menu.id = 'menu';

				wrapper.appendChild(menu);
				wrapper.appendChild(rrss);

				wrapper.appendChild(close);
				wrapper.appendChild(powered);
				wrapper.appendChild(offers);
				wrapper.appendChild(background);

				close.addEventListener('click', function() {
					removeIfExists(['synopsis', 'visitPageButton', 'date']);

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

					removeIfExists(['saveCalendarDropdown']);

					document.getElementsByClassName('active')[0].classList.remove('active');
					document.getElementById('synopsisItem').classList.add('active');

					video_wrapper.style.display = 'none';
					offers.style.display = 'none';
					document.getElementById('thumbnail-videos').style.display = 'none';

					if (!document.getElementById('synopsis')) {
						var synopsis = document.createElement('div');
						var VisitPageButton = document.createElement('a');

						synopsis.style =
							'position: absolute;top: 20%;left: 50px;color: white;width:90%;font-size: ' +
							fontSize +
							';font-family: bahnschrift;text-transform: uppercase;line-height: 25px;';
						synopsis.id = 'synopsis';
						var synopsisHTML = '';
						synopsisHTML += '<p style="font-size: 25px;margin-bottom: 0px;color: #ffe100;">Vuelve Hellboy,</p>';
						synopsisHTML +=
							"<p>el gran demonio de piel roja, con cola, cuernos y un brazo de piedra. Atrapado entre los mundos de lo sobrenatural y lo humano, el apodado como 'El más grande Investigador de lo Paranormal del Mundo' junto con la Agencia para la Investigación y Defensa Paranormal (A.I.D.P.) tendrán un nuevo y peligroso desafío. Su misión será enfrentarse a una nueva y poderosa amenaza: Nimue (Milla Jovovich), conocida como La Reina de la Sangre, un espíritu ancestral de la época del rey Arturo que ha vuelto a nuestro mundo llena de sed de venganza para sembrar el terror y destruir a la raza humana.</p>";
						synopsis.innerHTML = synopsisHTML;

						VisitPageButton.style =
							'position: absolute;bottom: 12%;left: 60px;width: 25%;height: 45px;border: 1px solid #ffe100;color: #ffe100;font-size: 16px;font-family: bahnschrift;text-transform: uppercase;text-align: center;line-height: 45px;cursor: pointer;text-decoration: none;';

						VisitPageButton.innerText = 'Visitar pagina web';
						VisitPageButton.href = 'https://www.hellboy.movie/';
						VisitPageButton.target = '_blank';
						VisitPageButton.id = 'visitPageButton';

						wrapper.appendChild(VisitPageButton);
						wrapper.appendChild(synopsis);

						removeAllListener();
					}
				});

				document.getElementById('videosItem').addEventListener('click', function(e) {
					e.preventDefault();
					document.getElementsByClassName('active')[0].classList.remove('active');
					document.getElementById('videosItem').classList.add('active');

					removeIfExists(['saveCalendarDropdown', 'synopsis', 'date', 'visitPageButton']);

					video_wrapper.style.display = 'block';
					offers.style.display = 'block';
					document.getElementById('thumbnail-videos').style.display = 'block';
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
		},
	},
};

var video = fluidPlayer('video-id', options);

video.on('pause', function() {
	if (document.getElementById('unmuteButton')) {
		document.getElementById('video-id_fluid_initial_play').style = 'display:none !important';
		document.getElementById('video-id').play();
		video.muteToggle('video-id', true);
		removeIfExists(['unmuteButton']);
	}
});

video.on('play', function() {
	//wrapper.addEventListener('mouseenter', playerIn);
});

video.on('ended', function() {
	var videoPlayer = document.getElementById('video-id');

	var nextVideo = document.getElementById('thumb-video-' + (parseInt(videoPlayer.getAttribute('current-video')) + 1));
	var prevVideo = document.getElementById('thumb-video-' + parseInt(videoPlayer.getAttribute('current-video')));

	if (parseInt(videoPlayer.getAttribute('current-video')) + 1 <= document.getElementsByClassName('thumb-video').length) {
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
