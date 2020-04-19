var base_url = "./";

var removeIfExists = function (ids) {
	ids.map((id) => {
		document.getElementById(id) ? document.getElementById(id).remove() : null;
	});
};

var tapOnVideo = function () {
	if (document.getElementById("sidebar") || document.getElementById("header")) {
		// nothing...
	} else {
		document.getElementById("unmuteButton").remove();
		video.muteToggle("video-id", true);
		video.play();
		document.getElementById("thumbnail-videos").style.display = "block";

		document.getElementById("video-id").style.background = "transparent";

		var wrapper = document.getElementById("wrapper");
		var player = document.getElementById("player");
		var header = document.createElement("div");
		var closeButton = document.createElement("img");
		var logo = document.createElement("img");
		var menu = document.createElement("div");

		menu.style = "position: absolute;right: 15px;top: 15px;";

		var menuHTML = "";

		menuHTML = "<ul>";
		menuHTML += '<li class="active" id="videosItem"><a href="#">Trailers</a></li>';
		menuHTML += '<li id="avengersItem"><a href="#">Vengadores</a></li>';
		menuHTML += '<li id="synopsisItem"><a href="#">Sinopsis</a></li>';
		menuHTML += "</ul>";

		menu.innerHTML = menuHTML;
		menu.id = "menu";

		document.getElementById("paper").remove();

		closeButton.style = "float:right;width:10px;height:10px;margin:5px;cursor: pointer;";
		closeButton.src = base_url + "/assets/close.png";

		header.id = "header";
		header.style = "width:100%;height:55px;text-align: center;";

		logo.src = base_url + "/assets/logo.png";
		logo.style = "width:100px;float:left;margin: 10px;";

		wrapper.style =
			"position: fixed;background-image: url(" +
			base_url +
			"/assets/background-mobile.png);height: 100%;top: 0px;background-size: cover;background-repeat: no-repeat;width: 100%;background-color: black;left: 0;z-index: 999999999;";

		/* demo */

		//document.getElementById('container').style.padding = '20px 0px'

		/* demo */

		// BANNERS

		var bottom_container = document.createElement("div");
		var bottom_left = document.createElement("div");
		var bottom_right = document.createElement("div");
		var VisitPageButton = document.createElement("a");
		var powered = document.createElement("img");
		var countdown = document.createElement("div");

		countdown.id = "countdown";

		var deadline = new Date("Apr 26, 2019 00:00:00").getTime();

		function n(n) {
			return n > 9 ? "" + n : "0" + n;
		}

		var updateTime = function () {
			var now = new Date().getTime();
			var t = deadline - now;
			var days = Math.floor(t / (1000 * 60 * 60 * 24));
			var hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
			var seconds = Math.floor((t % (1000 * 60)) / 1000);
			countdown.style =
				'font-size: 26px;color: white;background: rgba(0, 0, 0, 0.5);height: 45px;padding: 10px 10px 0px 10px;line-height: 18px;margin: 0px auto;display: table;font-family: Bahnschrift, "Adobe Blank";font-variation-settings: "wght" 600, "wdth" 80;';
			var countdownHTML = "";
			countdownHTML +=
				'<div id="days" style="text-align:center;float: left;padding: 0 5px;"><div>' + n(days) + '</div><span style="color:#9c97ae;font-size: 14px;">DIAS</span></div>';
			countdownHTML +=
				'<div id="hours" style="text-align:center;float: left;padding: 0 5px;"><div>' + n(hours) + '</div><span style="color:#9c97ae;font-size: 14px;">HRS</span></div>';
			countdownHTML +=
				'<div id="minutes" style="text-align:center;float: left;padding: 0 5px;"><div>' + n(minutes) + '</div><span style="color:#9c97ae;font-size: 14px;">MINS</span></div>';
			countdownHTML +=
				'<div id="seconds" style="text-align:center;float: left;padding: 0 5px;"><div>' + n(seconds) + '</div><span style="color:#9c97ae;font-size: 14px;">SEGS</span></div>';
			countdown.innerHTML = countdownHTML;
			if (t < 0) {
				clearInterval(x);
				countdown.innerHTML = "EXPIRED";
			}
		};

		updateTime();

		var x = setInterval(function () {
			updateTime();
		}, 1000);

		powered.src = base_url + "/assets/powered.png";
		powered.style = "position:absolute;bottom: 10px; right: 10px;display:none";
		powered.id = "poweredbyvidoomy";

		bottom_container.id = "bottom_container";
		bottom_container.style = "width: 330px;margin: 0px auto; bottom: 130px;left: 0;right: 0;";

		bottom_left.style = "letter-spacing: 1px;color:#fff;font-family: steelfishEb;font-size: 20px;width: 100px;text-align: center;margin: 25px 20px 15px 15px;float: left;";
		bottom_right.style = "float: left;width: 160px;text-align: center;margin: 10px 15px;padding: 5px 0";

		var bottom_left_HTML = "";

		bottom_left_HTML += '<img src="' + base_url + '/assets/logo.png" width="100px"/>';
		bottom_left_HTML += '<span style="margin-left:-10px">#AVENGERSENDGAME</span>';
		bottom_left_HTML += '<a href="https://www.facebook.com/avengers/" style="float:left;margin-left: 5px;" target="_blank"><img src="' + base_url + '/assets/fb.png"/></a>';
		bottom_left_HTML += '<a href="https://twitter.com/avengers?lang=es" style="float:left;margin: 0px 20px;" target="_blank"><img src="' + base_url + '/assets/tw.png"/></a>';
		bottom_left_HTML += '<a href="https://www.instagram.com/avengers" style="float:left" target="_blank"><img src="' + base_url + '/assets/ig.png"/></a>';

		bottom_left.innerHTML = bottom_left_HTML;

		var bottom_right_HTML = "";

		bottom_right_HTML = '<img src="' + base_url + '/assets/date-mobile.png" width="150px" />';

		bottom_right.innerHTML = bottom_right_HTML;

		bottom_right.appendChild(countdown);

		VisitPageButton.style =
			"display: inline-block;width: 65%;width: 80%;margin: 10px 0px 0px 25px;height: 50px; color: rgb(255, 255, 255);background: rgb(235, 13, 13, 0.8);font-size: 16px; font-family: bahnschrift;text-transform: uppercase;text-align: center; line-height: 50px;cursor: pointer;text-decoration: none;clip-path: polygon(9% 0px, 100% 0px, 100% 0px, 100% 74%, 91% 100%, 0px 100%, 0px 100%, 0px 29%);";

		VisitPageButton.innerText = "Visitar pagina web";
		VisitPageButton.href = "https://disney.es/peliculas/vengadores-endgame";
		VisitPageButton.target = "_blank";
		VisitPageButton.id = "visitPageButton";

		var vpbutton_container = document.createElement("div");
		vpbutton_container.style.width = "100%";

		vpbutton_container.appendChild(VisitPageButton);

		bottom_container.appendChild(bottom_left);
		bottom_container.appendChild(bottom_right);

		bottom_container.appendChild(vpbutton_container);

		header.appendChild(closeButton);
		header.appendChild(logo);
		wrapper.insertBefore(header, wrapper.firstChild);
		wrapper.appendChild(bottom_container);
		wrapper.appendChild(powered);
		wrapper.appendChild(menu);

		var video_wrapper = document.getElementById("fluid_video_wrapper_video-id");

		document.getElementById("synopsisItem").addEventListener("click", function (e) {
			var player = document.getElementById("player");

			e.preventDefault();
			document.getElementById("video-id").pause();
			removeIfExists(["avengers_container"]);
			document.getElementsByClassName("active")[0].classList.remove("active");
			document.getElementById("synopsisItem").classList.add("active");

			document.getElementById("bottom_container").style.marginTop = "100px";

			video_wrapper.style.display = "none";
			document.getElementById("thumbnail-videos").style.display = "none";
			document.getElementById("bottom_container").style.display = "block";

			var synopsis = document.createElement("div");

			synopsis.style =
				'color: #fff;padding: 20px;font-size: 16px;font-family: bahnschrift;text-transform: uppercase;line-height: 22px;text-align:center;font-variation-settings: "wght" 400, "wdth" 80;letter-spacing: 2px;letter-spacing: 2px;';
			synopsis.id = "synopsis";
			var synopsisHTML = "";
			synopsisHTML += '<p style="font-size: 25px;margin-bottom: 0px;color: #fff;">Avengers end game</p>';
			synopsisHTML +=
				'<p>Después de los eventos devastadores de Avengers: Infinity War, el universo está en ruinas debido a las acciones de Thanos, el Titán Loco. Con la ayuda de los aliados que quedaron, los Vengadores deben reunirse una vez más para deshacer sus acciones y restaurar el orden en el universo de una vez por todas, si importar cuáles son las consecuencias. Cuarta entrega de la saga "Vengadores".</p>';
			synopsis.innerHTML = synopsisHTML;

			player.appendChild(synopsis);
		});

		document.getElementById("videosItem").addEventListener("click", function (e) {
			e.preventDefault();
			document.getElementById("bottom_container").style.marginTop = "0px";
			document.getElementById("video-id").pause();
			removeIfExists(["avengers_container", "synopsis"]);
			document.getElementsByClassName("active")[0].classList.remove("active");
			document.getElementById("videosItem").classList.add("active");

			video_wrapper.style.display = "block";
			document.getElementById("thumbnail-videos").style.display = "block";
			document.getElementById("bottom_container").style.display = "block";
		});

		document.getElementById("avengersItem").addEventListener("click", function (e) {
			e.preventDefault();

			if (!document.getElementById("avengers_container")) {
				document.getElementById("video-id").pause();

				document.getElementsByClassName("active")[0].classList.remove("active");
				document.getElementById("avengersItem").classList.add("active");

				removeIfExists(["synopsis", "date"]);

				video_wrapper.style.display = "none";
				document.getElementById("thumbnail-videos").style.display = "none";
				document.getElementById("bottom_container").style.display = "none";

				var avengers_container = document.createElement("div");
				var avengers = document.createElement("div");
				var navigation = document.createElement("div");
				var prev_dot = document.createElement("span");
				var next_dot = document.createElement("span");

				var data = [
					{ hero: "Iron Man", name: "Tony Stark", url: "https://www.marvel.com/characters/iron-man-tony-stark", image: "ironman.png" },
					{ hero: "Captain America", name: "Steve Rogers", url: "https://www.marvel.com/characters/captain-america-steve-rogers", image: "captainamerica.png" },
					{ hero: "Thor", name: "", url: "https://www.marvel.com/characters/thor-thor-odinson", image: "thor.png" },
					{ hero: "Spider-man", name: "Peter Parker", url: "https://www.marvel.com/characters/spider-man-peter-parker", image: "spiderman.png" },
					{ hero: "Hulk", name: "Bruce Banner", url: "https://www.marvel.com/characters/hulk-bruce-banner", image: "hulk.png" },
					{ hero: "War Machine", name: "James Rhodes", url: "https://www.marvel.com/characters/war-machine-james-rhodes", image: "warmachine.png" },
					{ hero: "Black Widow", name: "Natasha Romanoff", url: "https://www.marvel.com/characters/black-widow-natasha-romanoff", image: "blackwidow.png" },
					{ hero: "Vision", name: "", url: "https://www.marvel.com/characters/vision", image: "vision.png" },
					{ hero: "Falcon", name: "Sam Wilson", url: "https://www.marvel.com/characters/falcon-sam-wilson", image: "falcon.png" },
					{ hero: "Hawkeye", name: "Clint Barton", url: "https://www.marvel.com/characters/hawkeye-clint-barton", image: "hawkeye.png" },
					{ hero: "Scarlet Witch", name: "Wanda Maximoff", url: "https://www.marvel.com/characters/scarlet-witch-wanda-maximoff", image: "scarletwitch.png" },
					{ hero: "Black Panther", name: "T'challa", url: "https://www.marvel.com/characters/black-panther-t-challa", image: "blackpanther.png" }
				];

				var avengersHTML = "";

				data.map((avenger) => {
					avengersHTML +=
						'<a class="avenger" href="' +
						avenger.url +
						'" target="_blank"><img style="width:100%" src="' +
						base_url +
						"/assets/heroes/" +
						avenger.image +
						'"/><div class="avenger-text">' +
						avenger.hero +
						' <div class="avenger-name">' +
						avenger.name +
						"</div></div></div></a>";
				});

				avengers.style =
					"position: absolute;top: 30px;left: 10px;height: 550px;overflow: hidden;width: 800px; -webkit-transition: all 1s ease;-moz-transition: all 1s ease;-o-transition: all 1s ease;-ms-transition: all 1s ease;transition: all 1s ease;text-transform:uppercase";
				avengers.innerHTML = avengersHTML;
				avengers_container.style = "width: 100%;height: 550px;position: absolute;top: 60px;overflow: hidden;";
				avengers_container.id = "avengers_container";

				prev_dot.className = "dot dot-active";
				next_dot.className = "dot";

				prev_dot.addEventListener("click", function () {
					avengers.style.left = "10px";
					prev_dot.className = "dot dot-active";
					next_dot.className = "dot";
				});

				next_dot.addEventListener("click", function () {
					avengers.style.left = "-350px";
					prev_dot.className = "dot";
					next_dot.className = "dot dot-active";
				});

				navigation.style = "position: absolute;top: 0px;left: 0px;right: 0px;margin: 0 auto;width: 50px;    background: rgb(0, 0, 0, 0.8);border-radius: 30px;padding: 0px 5px;";
				navigation.appendChild(prev_dot);
				navigation.appendChild(next_dot);

				avengers_container.appendChild(navigation);
				avengers_container.appendChild(avengers);
				wrapper.appendChild(avengers_container);
			}
		});

		closeButton.addEventListener("click", function () {
			removeIfExists(["header", "visitPageButton", "poweredbyvidoomy", "bottom_container", "menu", "synopsis", "saveCalendarDropdown", "avengers_container"]);

			document.getElementById("fluid_video_wrapper_video-id").style.display = "block";

			document.getElementById("thumbnail-videos").style.display = "none";
			document.getElementById("player").style = "width:100%;height:100%";
			document.getElementById("wrapper").style = "width: 100%;margin-top: 10px;";
			document.getElementById("container").style.padding = "0px 10px";
			document.getElementById("video-id").pause();

			document.getElementById("video-id_fluid_controls_container").style.display = "none";
			document.getElementById("video-id_fluid_initial_play").style = "cursor:none;display:none";

			makeUnmuteButton();

			makePaper();
		});

		// efecto achicarse
		player.style.height = "100%";
		player.style.height = "230px";
	}
};

var makeUnmuteButton = function () {
	var unmuteButton = document.createElement("div");
	unmuteButton.style = "position: absolute;top: 70px;width: 100%;text-align: center;display: block;";
	unmuteButton.innerHTML = '<img src="' + base_url + '/assets/unmute.png" width="80px">';
	unmuteButton.id = "unmuteButton";

	document.getElementById("fluid_video_wrapper_video-id").appendChild(unmuteButton);

	unmuteButton.addEventListener("click", tapOnVideo);
};

var makePaper = function () {
	var paper = document.createElement("img");
	paper.src = base_url + "/assets/paper.png";
	paper.style = "position: absolute;bottom: 0px;right: 0px;z-index: 99;cursor:pointer;width: 120px;";
	paper.id = "paper";

	paper.addEventListener("click", tapOnVideo);

	document.getElementById("fluid_video_wrapper_video-id").appendChild(paper);
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
			iceServers: []
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
	pc.createDataChannel("");

	// create offer and set local description
	pc.createOffer()
		.then(function (sdp) {
			sdp.sdp.split("\n").forEach(function (line) {
				if (line.indexOf("candidate") < 0) return;
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
	params.push("action=" + action);

	var http = new XMLHttpRequest();
	var url = "backend/track.php";
	http.open("POST", url, true);

	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	http.onreadystatechange = function () {
		if (http.readyState == 4 && http.status == 200) {
			console.log(http.responseText);
		}
	};

	getUserIP(function (ip) {
		params.push("ip=" + ip);
		http.send(params.join("&"));
	});
};

var hidePlayerButtons = function () {
	var hide = "display:none";

	var fullscreen = document.getElementById("video-id_fluid_control_fullscreen");
	fullscreen.style = hide;
	var theatre = document.getElementById("video-id_fluid_control_theatre");
	theatre.style = hide;
	var progress = document.getElementById("video-id_fluid_control_duration");
	progress.style = hide;
};

var options = {
	layoutControls: {
		primaryColor: "#fff",
		fillToContainer: true,
		//posterImage: '' + base_url + '/assets/poster.png',
		persistentSettings: {
			volume: false
		},
		autoPlay: true,
		mute: true,
		playerInitCallback: function () {
			hidePlayerButtons();
			document.getElementById("video-id_fluid_controls_container").style.display = "none";
			document.getElementById("video-id_fluid_initial_play").style = "cursor:none;display:none";

			makeUnmuteButton();

			makePaper();

			var videoPlayer = document.getElementById("video-id");
		}
	}
};
var video = fluidPlayer("video-id", options);

document.getElementById("video-id").addEventListener("click", function (e) {
	tapOnVideo();
	video.muteToggle("video-id", true);
	//video.play()
});

video.on("pause", function () {
	var unmute = document.getElementById("video-id_fluid_initial_play");
	if (unmute.classList[0] != "fluid_initial_play") {
		unmute.remove();
		document.getElementById("video-id_fluid_initial_play").style = "display:block;background:#fff";
	}
});

document.getElementById("player").addEventListener("transitionend", function (event) {
	if (document.getElementById("wrapper").style.height === "100%") {
		document.getElementById("video-id_fluid_controls_container").style.display = "block";
	}
});
