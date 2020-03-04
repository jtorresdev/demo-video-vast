//var base_url = 'https://jtorresdev.github.io/demo-video-vast/gameofthrones';
var base_url = './';

var removeIfExists = function(ids) {
	ids.map(id => {
		document.getElementById(id) ? document.getElementById(id).remove() : null;
	});
};

var hideIfExists = function(ids) {
	ids.map(id => {
		document.getElementById(id) ? (document.getElementById(id).style.display = 'none') : null;
	});
};

var showIfExists = function(ids) {
	ids.map(id => {
		document.getElementById(id) ? (document.getElementById(id).style.display = 'block') : null;
	});
};

var tapOnVideo = function() {
	if (document.getElementById('sidebar') || document.getElementById('header')) {
		// nothing...
	} else {
		document.getElementById('unmuteButton').remove();
		video.muteToggle('video-id', true);
		video.play();

		document.getElementById('video-id').style.background = 'transparent';

		var wrapper = document.getElementById('wrapper');
		var player = document.getElementById('player');
		var header = document.createElement('div');
		var closeButton = document.createElement('img');

		document.getElementById('paper').remove();

		closeButton.style = 'float:right;width:10px;height:10px;margin:5px;cursor: pointer;';
		closeButton.src = base_url + '/assets/close.png';

		header.id = 'header';
		header.style = 'width: 100%; height:11%; text-align: center;';

		wrapper.style =
			'position: fixed;background-image: url(' +
			base_url +
			'/assets/background-mobile.png); height: 100%; top: 0px; background-size: contain; background-repeat: no-repeat; width: 100%; background-color: black; left: 0px; z-index: 999999999; background-position: 0px -83px;';

		var bottom_container = document.createElement('div');

		bottom_container.id = 'bottom_container';
		bottom_container.style = 'width: 330px;margin: 0px auto; bottom: 130px;left: 0;right: 0;';

		header.appendChild(closeButton);
		wrapper.insertBefore(header, wrapper.firstChild);
		wrapper.appendChild(bottom_container);
		wrapper.appendChild(powered);
		wrapper.appendChild(menu);

		var video_wrapper = document.getElementById('fluid_video_wrapper_video-id');

		closeButton.addEventListener('click', function() {
			removeIfExists([
				'header',
				'visitPageButton',
				'poweredbyvidoomy',
				'bottom_container',
				'menu',
				'synopsis',
				'saveCalendarDropdown',
				'avengers_container',
				'exclusive_video',
				'exclusive_playlist',
				'freemonth2',
			]);

			document.getElementById('fluid_video_wrapper_video-id').style.display = 'block';

			document.getElementById('thumbnail-videos').style.display = 'none';
			document.getElementById('player').style = 'width:100%;';
			document.getElementById('wrapper').style = 'width: 100%;margin-top: 10px;';
			document.getElementById('container').style.padding = '0px 10px';
			document.getElementById('video-id').pause();

			document.getElementById('video-id_fluid_controls_container').style.display = 'none';
			document.getElementById('video-id_fluid_initial_play').style = 'cursor:none;display:none';

			makeUnmuteButton();

			makePaper();
		});

		// efecto achicarse
		player.style.height = '100%';
		player.style.height = '230px';
	}
};

var makeUnmuteButton = function() {
	var unmuteButton = document.createElement('div');
	unmuteButton.style = 'position: absolute;top: 70px;width: 100%;text-align: center;display: block;';
	unmuteButton.innerHTML = '<img src="' + base_url + '/assets/unmute.png" width="80px">';
	unmuteButton.id = 'unmuteButton';

	document.getElementById('fluid_video_wrapper_video-id').appendChild(unmuteButton);

	unmuteButton.addEventListener('click', tapOnVideo);
};

var makePaper = function() {
	var paper = document.createElement('img');
	paper.src = base_url + '/assets/paper.png';
	paper.style = 'position: absolute;bottom: 0px;right: 0px;z-index: 99;cursor:pointer;width: 120px;';
	paper.id = 'paper';

	paper.addEventListener('click', tapOnVideo);

	document.getElementById('fluid_video_wrapper_video-id').appendChild(paper);
};

var hidePlayerButtons = function() {
	var hide = 'display:none';

	var fullscreen = document.getElementById('video-id_fluid_control_fullscreen');
	fullscreen.style = hide;
	var theatre = document.getElementById('video-id_fluid_control_theatre');
	theatre.style = hide;
	var progress = document.getElementById('video-id_fluid_control_duration');
	progress.style = hide;
};

var options = {
	layoutControls: {
		primaryColor: '#fff',
		fillToContainer: true,
		posterImage: '' + base_url + '/assets/poster.png',
		persistentSettings: {
			volume: false,
		},
		autoPlay: true,
		mute: true,
		playerInitCallback: function() {
			hidePlayerButtons();
			document.getElementById('video-id_fluid_controls_container').style.display = 'none';
			document.getElementById('video-id_fluid_initial_play').style = 'cursor:none;display:none';

			makeUnmuteButton();

			makePaper();

			var videoPlayer = document.getElementById('video-id');
		},
	},
};
var video = fluidPlayer('video-id', options);

document.getElementById('video-id').addEventListener('click', function(e) {
	tapOnVideo();
	video.muteToggle('video-id', true);
	//video.play()
});

video.on('pause', function() {
	var unmute = document.getElementById('video-id_fluid_initial_play');
	if (unmute.classList[0] != 'fluid_initial_play') {
		unmute.remove();
		document.getElementById('video-id_fluid_initial_play').style = 'display:block;background:#fff';
	}
});

var videoThumbs = document.getElementsByClassName('thumb-video');

document.getElementById('player').addEventListener('transitionend', function(event) {
	if (document.getElementById('wrapper').style.height === '100%') {
		document.getElementById('video-id_fluid_controls_container').style.display = 'block';
		document.getElementById('poweredbyvidoomy').style.display = 'block';
	}
});
