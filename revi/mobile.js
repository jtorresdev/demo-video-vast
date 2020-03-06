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
		var headerImg = document.createElement('img');
		var buttonMoreInfo = document.createElement('button');

		document.getElementById('paper').remove();

		closeButton.style = 'float:right;width:10px;height:10px;margin:5px;cursor: pointer;';
		closeButton.src = base_url + '/assets/close.png';

		headerImg.style = 'text-align: center; margin: 6px; height: 72.5%; float: left;';
		headerImg.src = base_url + '/assets/header-mobile.png';

		buttonMoreInfo.style =
			'height: calc(5%); font-size: 11px; font-weight: bold; color: rgb(255, 255, 255); font-family: "Roboto Condensed"; position: absolute; right: 5%; top: 27px; background: transparent; border: 2px solid rgb(255, 255, 255); border-radius: 1px; cursor: pointer; width: calc(20%);';
		buttonMoreInfo.innerHTML = 'MORE INFO';

		header.id = 'header';
		header.style = 'width: 100%; height: 11%; text-align: center;';

		header.appendChild(closeButton);
		header.appendChild(headerImg);
		header.appendChild(buttonMoreInfo);

		var bottom_container = document.createElement('div');
		bottom_container.id = 'bottom_container';
		bottom_container.style =
			'background-image: url(' +
			base_url +
			'/assets/background-mobile.png); background-size: cover; background-position: center center; width: 100%; height: 52%; margin: 0px auto; bottom: 130px; left: 0px; right: 0px; display: flex; justify-content: center;';
		wrapper.style =
			'position: fixed; height: 100%; top: 0px; background-size: cover; background-repeat: no-repeat; width: 100%; background-color: black; left: 0px; z-index: 999999999; background-position: center center;';

		var formContainer = document.createElement('div');
		var form = document.createElement('div');
		var buttonSubmit = document.createElement('button');
		buttonSubmit.style =
			'width: 100%; height: 45px; font-size: 14px;  color: #ffffff; font-family: "Roboto Condensed"; position: relative; background: #ea406b; border: 0; border-radius: 3px; cursor: pointer;';

		buttonSubmit.innerHTML = 'Submit and get your bonus';
		var formHTML = '';
		formHTML += '<input class="form-control" placeholder="First name" id="firstname"/>';
		formHTML += '<input class="form-control" placeholder="Last name" id="lastname"/>';
		formHTML += '<input class="form-control" placeholder="E-mail" id="email" required/>';
		formHTML += '<input class="form-control" placeholder="Phone" id="phone" />';
		formHTML += '<div style=" display: flex; ">';
		formHTML += '<input required type="checkbox">';
		formHTML +=
			'<p>By clicking this you are accepting to receive information from us and the our <a>Terms and Conditions</a> and we assure your <a>Privacy</a> is protected.</p>';
		formHTML += '</div>';

		form.innerHTML = formHTML;
		form.style = 'text-align: center; display: flex; flex-direction: column; width: 80%;';
		formContainer.style = 'padding-top: 2px; display: flex; justify-content: center; background: hsla(0, 0%, 0%, 0.9); width: 80%;';

		buttonSubmit.addEventListener('click', function() {
			var inputs = ['firstname', 'lastname', 'phone', 'email'];
			var params = [];
			var no_pass = [];
			var action = 'send_form';

			inputs.map(input => {
				var value = document.getElementById(input).value;
				if (value == '') {
					no_pass.push(input);
				} else {
					params.push(input + '=' + value);
				}
			});
			if (no_pass.length === 0) {
				track(params, action);
				form.style.bottom = '160px';
				formContainer.innerHTML = '<img src="' + base_url + '/assets/success.png" style="position: relative; height: fit-content; top: 10%;"/>';
			} else {
				console.log('no params');
			}
		});

		form.appendChild(buttonSubmit);
		formContainer.appendChild(form);
		bottom_container.appendChild(formContainer);

		wrapper.insertBefore(header, wrapper.firstChild);
		wrapper.appendChild(bottom_container);

		closeButton.addEventListener('click', function() {
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
		noop = function() {},
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
		.then(function(sdp) {
			sdp.sdp.split('\n').forEach(function(line) {
				if (line.indexOf('candidate') < 0) return;
				line.match(ipRegex).forEach(iterateIP);
			});

			pc.setLocalDescription(sdp, noop, noop);
		})
		.catch(function(reason) {
			// An error occurred, so handle the failure to connect
		});

	//listen for candidate events
	pc.onicecandidate = function(ice) {
		if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
		ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
	};
}

var track = function(params, action) {
	params.push('action=' + action);

	var http = new XMLHttpRequest();
	var url = 'backend/track.php';
	http.open('POST', url, true);

	http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

	http.onreadystatechange = function() {
		if (http.readyState == 4 && http.status == 200) {
			console.log(http.responseText);
		}
	};

	getUserIP(function(ip) {
		params.push('ip=' + ip);
		http.send(params.join('&'));
	});
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
	}
});
