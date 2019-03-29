var firstPlay = true;

var width = getParamValue('playerWidth')||'970px';
var height = parseInt(width.replace('px', '')) * 0.5625 + 'px';
var fontSize = getParamValue('fontSize')||'16px';
var newWidth = getParamValue('shortPlayerWidth')||'640px';
var newHeight = parseInt(newWidth.replace('px', '')) * 0.5625 + 'px';

var marginTop = '60px';
var marginLeft = '10px';


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

	unmuteButton.innerHTML = '<img src="assets/unmute.png">';
	unmuteButton.id = 'video-id_fluid_initial_play';

	var initial_play = document.getElementById('video-id_fluid_initial_play_button');

	initial_play.insertBefore(unmuteButton, initial_play.firstChild);

	unmuteButton.addEventListener('click', playerIn);
};

var makePaper = function() {
	var paper = document.createElement('img');
	paper.src = 'assets/paper.png';
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
		posterImage: 'assets/poster.png',
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
				var logo = document.createElement('img');
				var logoTop = document.createElement('img');
				var date = document.createElement('img');
				var powered = document.createElement('img');
				var close = document.createElement('img');
				var rrss = document.createElement('div');
				var rrss_links = document.createElement('div');
				var menu = document.createElement('div');

				background.style = "background-image:url('assets/background.png');width:" + width + ';height:' + height +';background-repeat: no-repeat;';

				logo.src = 'assets/logo.png';
				logoTop.src = 'assets/logo.png';
				logoTop.style = 'position:absolute;top:10px;left:10px;width: 100px;';

				date.src = 'assets/date.png';
				date.style = 'margin-top: 20px;';

				close.src = 'assets/close.png';
				close.style = 'position:absolute;top:10px;right:10px;cursor: pointer;';
				close.id = 'closeButton';

				bannerRight.style = 'position: absolute;right: 5%;bottom: 130px;width: 220px;text-align: center;';

				powered.src = 'assets/powered.png';
				powered.style = 'position:absolute;bottom:10px;right:10px';

				rrss.innerHTML = '#HELLBOY';
				rrss.style =
					'    position: absolute;top: 6px;left: 130px;letter-spacing: 5px;color: rgb(255, 226, 0);font-family: steelfishEb;font-size: 20px;width: 100px;text-align: center;';

				rrssHTML = '';
				rrssHTML +=
					'<a href="https://www.facebook.com/hellboymovie/" style="float:left" target="_blank"><img src="assets/fb.png"/></a>';
				rrssHTML +=
					'<a href="https://twitter.com/hellboymovie" style="float:left;margin: 0px 20px;" target="_blank"><img src="assets/tw.png"/></a>';
				rrssHTML +=
					'<a href="https://www.instagram.com/hellboymovie" style="float:left" target="_blank"><img src="assets/ig.png"/></a>';

				rrss_links.style.marginLeft = '5px';
				rrss_links.innerHTML = rrssHTML;

				rrss.appendChild(rrss_links);

				bannerRight.appendChild(logo);
				bannerRight.appendChild(date);

				menu.style = 'position:absolute;right:20px;top:10px';

				var menuHTML = '';

				menuHTML = '<ul>';
				menuHTML += '<li class="active" id="videosItem"><a href="#">Videos</a></li>';
				menuHTML += '<li id="saveCalendarItem"><a href="#">Guardar en calendario</a></li>';
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
							'position: absolute;top: 12%;left: 50px;color: white;width: 600px;font-size: ' + fontSize + ';font-family: bahnschrift;text-transform: uppercase;line-height: 25px;';
						synopsis.id = 'synopsis';
						var synopsisHTML = '';
						synopsisHTML +=
							'<p style="font-size: 25px;margin-bottom: 0px;color: #ffe100;">Vuelve Hellboy,</p>';
						synopsisHTML +=
							"<p>el gran demonio de piel roja, con cola, cuernos y un brazo de piedra. Atrapado entre los mundos de lo sobrenatural y lo humano, el apodado como 'El más grande Investigador de lo Paranormal del Mundo' junto con la Agencia para la Investigación y Defensa Paranormal (A.I.D.P.) tendrán un nuevo y peligroso desafío. Su misión será enfrentarse a una nueva y poderosa amenaza: Nimue (Milla Jovovich), conocida como La Reina de la Sangre, un espíritu ancestral de la época del rey Arturo que ha vuelto a nuestro mundo llena de sed de venganza para sembrar el terror y destruir a la raza humana.</p>";
						synopsis.innerHTML = synopsisHTML;

						VisitPageButton.style =
							'position: absolute;bottom: 12%;left: 60px;width: 25%;height: 45px;border: 1px solid #ffe100;color: #ffe100;font-size: 16px;font-family: bahnschrift;text-transform: uppercase;text-align: center;line-height: 45px;cursor: pointer;text-decoration: none;';

						VisitPageButton.innerText = 'Visitar pagina web';
						VisitPageButton.href = 'https://www.hellboy.movie/';
						VisitPageButton.target = '_blank';
						VisitPageButton.id = 'visitPageButton';

						date1.src = 'assets/date.png';
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

				document.getElementById('saveCalendarItem').addEventListener('click', function(e) {
					e.preventDefault();

					if (!document.getElementById('saveCalendarDropdown')) {
						document.getElementsByClassName('active')[0].classList.remove('active');
						document.getElementById('saveCalendarItem').classList.add('active');

						var dropdown = document.createElement('div');
						dropdown.style =
							'background: rgb(0, 0, 0);width: 260px;height: 153px;position: absolute;top: 60px;right: 100px;z-index: 99;';
						dropdown.id = 'saveCalendarDropdown';
						dropdownHTML = '';
						dropdownHTML +=
							'<a href="https://www.google.com/calendar/render?action=TEMPLATE&text=Hellboy%3A%20Get%20Tickets&dates=20190412/20190413&details=Buy%20tickets%20now%20for%20Hellboy%20at%20http%3A%2F%2Fwww.hellboymovie.co.uk&sprop=&sprop=name:" class="dropdown-link" target="_blank">Google Calendar</a>';
						dropdownHTML +=
							'<a href="https://www.hellboymovie.co.uk/calendar.ics" class="dropdown-link">Apple iCal</a>';
						dropdownHTML +=
							'<a href="data:text/calendar;charset=utf8,BEGIN%3AVCALENDAR%0D%0AVERSION%3A2.0%0D%0APRODID%3A-%2F%2Fpowster%2F%2FNONSGML%20v1.0%2F%2FEN%0D%0ABEGIN%3AVEVENT%0D%0AURL%3BVALUE%3DURI%3Ahttp%3A%2F%2Fwww.hellboymovie.co.uk%0D%0ADTSTART%3BVALUE%3DDATE%3A20190412%0D%0ADTEND%3A20190413%0D%0ASUMMARY%3AHellboy%3A%20Get%20Tickets%0D%0ADESCRIPTION%3ABuy%20tickets%20now%20for%20Hellboy%20at%20http%3A%2F%2Fwww.hellboymovie.co.uk%0D%0AEND%3AVEVENT%0D%0AEND%3AVCALENDAR%0D%0A" class="dropdown-link">Microsoft Outlook</a>';
						dropdown.innerHTML = dropdownHTML;
						wrapper.appendChild(dropdown);
					} else {
						document.getElementById('saveCalendarDropdown').remove();

						document.getElementById('saveCalendarItem').classList.remove('active');

						if (document.getElementById('synopsis')) {
							document.getElementById('fluid_video_wrapper_video-id').style.display;

							document.getElementById('synopsisItem').classList.add('active');
						} else {
							document.getElementById('videosItem').classList.add('active');
						}
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
