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
var newWidth = document.currentScript.getAttribute('shortPlayerWidth') || '408px';
var newHeight = parseInt(newWidth.replace('px', '')) * 0.5625 + 'px';

var marginTop = '137px';
var marginLeft = '30px';

//var base_url = "https://jtorresdev.github.io/demo-video-vast/audi"
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
		playerIn();
	});
};

var makeUnmuteButton = function() {
	var unmuteButton = document.createElement('div');

	unmuteButton.innerHTML = '<img src="' + base_url + '/assets/unmute.png">';
	unmuteButton.id = 'video-id_fluid_initial_play';

	var initial_play = document.getElementById('video-id_fluid_initial_play_button');

	initial_play.insertBefore(unmuteButton, initial_play.firstChild);

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
	});
	document.getElementById('fluid_video_wrapper_video-id').appendChild(paper);
};

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

var options = {
	layoutControls: {
		primaryColor: '#fff',
		posterImage: '' + base_url + '/assets/poster.png',
		playButtonShowing: true,
		persistentSettings: {
			volume: false,
		},
		autoPlay: false,
		mute: true,
		playerInitCallback: function() {
			hidePlayerButtons();
			hideControlBar();

			playOnClick();

			// makeUnmuteButton();
			makePaper();

			// obtenemos el contenedor del reproductor
			var video_wrapper = document.getElementById('fluid_video_wrapper_video-id');

			// si el reproductor ya se achicó en el siguiente bucle mantendra el tamaño
			video_wrapper.style = 'position: absolute;width: ' + width + ';height: ' + height + ';z-index: 10;';

			// si el primer bucle, agregamos el HTML del fondo
			if (firstPlay) {
				var background = document.createElement('div');
				var bannerRight = document.createElement('div');
				var close = document.createElement('img');

				background.style =
					"background-image:url('" + base_url + "/assets/background.png');width:" + width + ';height:' + height + ';background-repeat: no-repeat;';

				close.src = base_url + '/assets/close.png';
				close.style = 'position:absolute;top:10px;right:10px;cursor: pointer;';
				close.id = 'closeButton';

				bannerRight.style = 'position: absolute;right: 10px;bottom: 120px;width: 290px;text-align: center;';

				bannerRight.style.display = 'none';

				var form = document.createElement('div');
				var button = document.createElement('button');
				button.style =
					'width: 100%; height: 45px; font-size: 14px;  color: #ffffff; font-family: "Roboto"; position: relative; background: #ea406b; border: 0; border-radius: 3px; cursor: pointer;';
				var buttonHTML = '';
				buttonHTML += 'Submit and get your bonus';
				button.innerHTML = buttonHTML;
				var formHTML = '';
				formHTML += `<img class="banner" src="${base_url}/assets/banner.png">`;
				formHTML += '<input class="form-control" placeholder="First name" id="firstname"/>';
				formHTML += '<input class="form-control" placeholder="Last name" id="lastname"/>';
				formHTML += '<input class="form-control" placeholder="E-mail" id="email" required/>';
				formHTML += '<input class="form-control" placeholder="Phone" id="phone" />';
				formHTML +=
					'<span>By clicking this you are accepting to receive information from us and the our <a>Terms and Conditions</a> and we assure your <a>Privacy</a> is protected.</span>';

				form.style = 'position: absolute; right: 65px; top: 24px; width: 238px; text-align: center;';
				form.innerHTML = formHTML;

				button.addEventListener('click', function() {
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
						form.innerHTML = '<img src="' + base_url + '/assets/success.png" style="position: relative; top: 25%;"/>';
					} else {
						console.log('no params');
					}
				});

				form.appendChild(button);
				wrapper.appendChild(form);

				wrapper.appendChild(close);
				wrapper.appendChild(bannerRight);
				wrapper.appendChild(background);

				close.addEventListener('click', function() {
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
	var unmute = document.getElementById('video-id_fluid_initial_play');
	if (unmute.classList[0] != 'fluid_initial_play') {
		unmute.remove();
		document.getElementById('video-id_fluid_initial_play').style = 'display:block;background:#d9c408';
	}
});

video.on('play', function() {
	wrapper.addEventListener('mouseenter', playerIn);
	track(['created_at=' + new Date() + '', 'url=' + window.location.href + ''], 'play');
});
