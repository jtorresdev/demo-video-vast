var base_url = './';

var removeIfExists = function (ids) {
	ids.map((id) => {
		document.getElementById(id) ? document.getElementById(id).remove() : null;
	});
};

var hideIfExists = function (ids) {
	ids.map((id) => {
		document.getElementById(id) ? (document.getElementById(id).style.display = 'none') : null;
	});
};

var showIfExists = function (ids) {
	ids.map((id) => {
		document.getElementById(id) ? (document.getElementById(id).style.display = 'block') : null;
	});
};

var tapOnVideo = function () {
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
		var headerImg = document.createElement('img');
		var logo = document.createElement('img');
		var firstMenu = document.createElement('div');
		var secondMenu = document.createElement('div');

		document.getElementById('paper').remove();

		header.id = 'header';
		header.style = 'width: 100%;text-align: center;position: relative;top: 0;left: 0;';

		headerImg.src = base_url + '/assets/header-mobile.svg';
		headerImg.style = 'text-align: center;width: 100%;position: relative;top: 0;left: 0;';

		firstMenu.style = 'position: absolute; top: 7px; width: 100%;';

		var menuFlex = document.createElement('div');
		menuFlex.style = 'display: flex; flex-direction: row; justify-content: space-between; width: 100%;';

		firstMenu.appendChild(menuFlex);

		var rrss = document.createElement('div');
		var rrss_links = document.createElement('div');

		rrss.innerHTML = '';
		rrss.style = 'opacity: 0.5;';

		rrssHTML = '';
		rrssHTML += '<a href="https://www.facebook.com/" target="_blank"><img src="' + base_url + '/assets/fb.png"/></a>';
		rrssHTML += '<a href="https://twitter.com" target="_blank"><img src="' + base_url + '/assets/tw.png"/></a>';
		rrssHTML += '<a href="https://www.instagram.com/" target="_blank"><img src="' + base_url + '/assets/ig.png"/></a>';

		rrssHTML += '<a href="https://www.linkedin.com/" style="margin-top: -2px;" target="_blank"><img src="' + base_url + '/assets/linkedin.png"/></a>';

		rrss_links.style = 'display: flex;justify-content: space-between;width: 100px;margin-top: 5px;margin-left: 10px;';
		rrss_links.id = 'rrss';
		rrss_links.innerHTML = rrssHTML;

		rrss.appendChild(rrss_links);

		logo.style = 'width: 35%;';
		logo.src = base_url + '/assets/logo.svg';

		closeButton.style = 'width: 10px;height: 10px;cursor: pointer;margin-left: 10%;margin-right: 4%;';
		closeButton.src = base_url + '/assets/close.png';

		menuFlex.appendChild(rrss);
		menuFlex.appendChild(logo);
		menuFlex.appendChild(closeButton);

		secondMenu.style = 'position: absolute;top: calc(100% / 2);width: 100%;';
		secondMenu.id = 'menu';

		var menuHTML = '';

		menuHTML = '<ul>';
		menuHTML += '<li class="active" id=""><img src="' + base_url + '/assets/home.png" style=" width: 2.5%; " /></li>';
		menuHTML +=
			'<li><a href="#"><img src="' + base_url + '/assets/calidad.svg" style="width:3%;padding: 0px 2px;margin: 0px 3px -3px;" /> Calidad</a></li>';
		menuHTML +=
			'<li><a href="#"><img src="' +
			base_url +
			'/assets/ayuda.svg" style="width:4%;padding: 0px 2px;margin: 0px 3px -3px;"/> Ayuda y contacto</a></li>';
		menuHTML += '</ul>';

		secondMenu.innerHTML = menuHTML;

		header.appendChild(headerImg);
		header.appendChild(firstMenu);

		header.appendChild(secondMenu);

		// bottom part

		wrapper.style =
			'position: fixed; height: 100%; top: 0px; background-size: cover; background-repeat: no-repeat; width: 100%; background-color: black; left: 0px; z-index: 999999999; background-position: center center;';

		var offers = document.createElement('div');
		offers.id = 'offers';
		offers.style =
			"background-image: url('" + base_url + "/assets/offers.png'); background-size: contain; height: 20%; background-repeat: no-repeat;'";
		var offersBtn = document.createElement('a');
		offersBtn.setAttribute('href', '#');
		offersBtn.setAttribute('target', '_blank');
		offersBtn.style = 'position: relative;top: calc(80% - 51px);left: 7%;';

		var offersBtnImg = document.createElement('img');

		offersBtnImg.src = '' + base_url + '/assets/offersBtn.png';
		offersBtnImg.style = 'margin-top: 20px;width: 35%;';

		offersBtn.appendChild(offersBtnImg);
		offers.appendChild(offersBtn);

		wrapper.appendChild(offers);

		var codes = document.createElement('div');
		codes.id = 'codes';
		codes.style =
			"background-image: url('" +
			base_url +
			"/assets/codes.png'); background-color: white;background-size: contain;height: 50%;background-repeat: no-repeat;background-position-y: 25px;";
		var codesBtn = document.createElement('a');

		codesBtn.setAttribute('href', '#');
		codesBtn.setAttribute('target', '_blank');
		codesBtn.style = 'position: relative;top: calc(50% - 51px);left: 32%;';

		var codesBtnImg = document.createElement('img');

		codesBtnImg.src = '' + base_url + '/assets/codigos.png';
		codesBtnImg.style = 'margin-top: 20px;width: 35%;';

		codesBtn.appendChild(codesBtnImg);
		codes.appendChild(codesBtn);

		wrapper.appendChild(codes);

		wrapper.insertBefore(header, wrapper.firstChild);

		closeButton.addEventListener('click', function () {
			removeIfExists([
				'header',
				'visitPageButton',
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

var makeUnmuteButton = function () {
	var unmuteButton = document.createElement('div');
	unmuteButton.style = 'position: absolute;top: 70px;width: 100%;text-align: center;display: block;';
	unmuteButton.innerHTML = '<img src="' + base_url + '/assets/unmute.png" width="80px">';
	unmuteButton.id = 'unmuteButton';

	document.getElementById('fluid_video_wrapper_video-id').appendChild(unmuteButton);

	unmuteButton.addEventListener('click', tapOnVideo);
};

var makePaper = function () {
	var paper = document.createElement('img');
	paper.src = base_url + '/assets/paper.png';
	paper.style = 'position: absolute;bottom: 0px;right: 0px;z-index: 99;cursor:pointer;width: 120px;';
	paper.id = 'paper';

	paper.addEventListener('click', tapOnVideo);

	document.getElementById('fluid_video_wrapper_video-id').appendChild(paper);
};

/**
 * Get the user IP throught the webkitRTCPeerConnection
 * @param onNewIP {Function} listener function to expose the IP locally
 * @return undefined
 */
function getUserIP(onNewIP) {
	//  onNewIp - your listener function for new IPs
	//compatibility for firefox and chrome
	var myPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
	var pc = new myPeerConnection({
			iceServers: [],
		}),
		noop = function () {},
		localIPs = {},
		ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g,
		key;

	function iterateIP(ip) {
		if (!localIPs[ip]) onNewIP(ip);
		localIPs[ip] = true;
	}

	//create a bogus data channel
	pc.createDataChannel('');

	// create offer and set local description
	pc.createOffer()
		.then(function (sdp) {
			sdp.sdp.split('\n').forEach(function (line) {
				if (line.indexOf('candidate') < 0) return;
				line.match(ipRegex).forEach(iterateIP);
			});

			pc.setLocalDescription(sdp, noop, noop);
		})
		.catch(function (reason) {
			// An error occurred, so handle the failure to connect
		});

	//listen for candidate events
	pc.onicecandidate = function (ice) {
		if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
		ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
	};
}

var track = function (params, action) {
	params.push('action=' + action);

	var http = new XMLHttpRequest();
	var url = 'backend/track.php';
	http.open('POST', url, true);

	http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

	http.onreadystatechange = function () {
		if (http.readyState == 4 && http.status == 200) {
			console.log(http.responseText);
		}
	};

	getUserIP(function (ip) {
		params.push('ip=' + ip);
		http.send(params.join('&'));
	});
};

var hidePlayerButtons = function () {
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
		//posterImage: '' + base_url + '/assets/poster.png',
		persistentSettings: {
			volume: false,
		},
		autoPlay: true,
		mute: true,
		playerInitCallback: function () {
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

document.getElementById('video-id').addEventListener('click', function (e) {
	tapOnVideo();
	video.muteToggle('video-id', true);
	//video.play()
});

video.on('pause', function () {
	var unmute = document.getElementById('video-id_fluid_initial_play');
	if (unmute.classList[0] != 'fluid_initial_play') {
		unmute.remove();
		document.getElementById('video-id_fluid_initial_play').style = 'display:block;background:#fff';
	}
});

var videoThumbs = document.getElementsByClassName('thumb-video');

document.getElementById('player').addEventListener('transitionend', function (event) {
	if (document.getElementById('wrapper').style.height === '100%') {
		document.getElementById('video-id_fluid_controls_container').style.display = 'block';
	}
});
