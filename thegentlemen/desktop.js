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

var marginTop = '130px';
var marginLeft = 'calc(100% - 440px)';

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

			makeUnmuteButton();

			// obtenemos el contenedor del reproductor
			var video_wrapper = document.getElementById('fluid_video_wrapper_video-id');

			// si el reproductor ya se achicó en el siguiente bucle mantendra el tamaño
			video_wrapper.style = 'position: absolute;width: ' + width + ';height: ' + height + ';z-index: 10;';

			// si el primer bucle, agregamos el HTML del fondo
			if (firstPlay) {
				var background = document.createElement('div');
				var bannerRight = document.createElement('div');
				var logoTop = document.createElement('img');

				var close = document.createElement('img');
				var text = document.createElement('img');

				var countdown = document.createElement('div');

				background.style =
					"background-image:url('" + base_url + "/assets/background.png');width:" + width + ';height:' + height + ';background-repeat: no-repeat;';

				logoTop.src = '' + base_url + '/assets/logo.png';
				logoTop.style = 'position:absolute;top:10px;left:10px;width: 170px;';

				countdown.id = 'countdown';

				function n(n) {
					return n > 9 ? '' + n : '0' + n;
				}

				var deadline = new Date('Feb 28, 2020 00:00:00').getTime();
				var x = setInterval(function() {
					var now = new Date().getTime();
					var t = deadline - now;
					var days = Math.floor(t / (1000 * 60 * 60 * 24));
					var hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
					var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
					countdown.style =
						'font-size: 60px;color: #9b6314;background: rgba(0, 0, 0, 0);height: 68px;padding: 20px 10px 0px 10px;line-height: 20px;margin: 0px auto;display: table;font-family:"Old Standard TT";font-weight:bold';
					var countdownHTML = '';
					countdownHTML +=
						'<div id="days" style="text-align:center;float: left;padding: 0 10px;"><div>' +
						n(days) +
						'</div><span style="color:#59380a;font-size: 14px;">DÍAS</span></div>';
					countdownHTML +=
						'<div id="hours" style="text-align:center;float: left;padding: 0 10px;"><div>' +
						n(hours) +
						'</div><span style="color:#59380a;font-size: 14px;">HRS</span></div>';
					countdownHTML +=
						'<div id="minutes" style="text-align:center;float: left;padding: 0 10px;"><div>' +
						n(minutes) +
						'</div><span style="color:#59380a;font-size: 14px;">MINS</span></div>';
					countdown.innerHTML = countdownHTML;
					if (t < 0) {
						clearInterval(x);
						countdown.innerHTML = 'EXPIRED';
					}
				}, 1000);

				close.src = base_url + '/assets/close.png';
				close.style = 'position:absolute;top:10px;right:10px;cursor: pointer;';
				close.id = 'closeButton';

				bannerRight.style = 'position: absolute;left: 35px;bottom: 12px;width: 290px;text-align: center;';

				text.style = 'position:absolute;bottom:0px;left:0px';

				bannerRight.appendChild(countdown);

				wrapper.appendChild(logoTop);
				wrapper.appendChild(close);
				wrapper.appendChild(text);
				wrapper.appendChild(bannerRight);
				wrapper.appendChild(background);

				close.addEventListener('click', function() {
					removeIfExists(['synopsis', 'visitPageButton', 'date']);

					document.getElementById('fluid_video_wrapper_video-id').style.display = 'block';

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
