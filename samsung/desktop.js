function getParamValue(paramName) {
	var url = window.location.search.substring(1); //get rid of "?" in querystring
	var qArray = url.split("&"); //get key-value pairs
	for (var i = 0; i < qArray.length; i++) {
		var pArr = qArray[i].split("="); //split key and value
		if (pArr[0] == paramName) return pArr[1]; //return value
	}
}

var firstPlay = true;

var width = document.currentScript.getAttribute("playerWidth") || "800px";
var height = parseInt(width.replace("px", "")) * 0.5625 + "px";
var fontSize = document.currentScript.getAttribute("fontSize") || "16px";
var newWidth = document.currentScript.getAttribute("shortPlayerWidth") || "430px";
var newHeight = parseInt(newWidth.replace("px", "")) * 0.5625 + "px";

var marginTop = "80px";
var marginLeft = "10px";
var imgurl = "./";
var base_url = "./";

var hidePlayerButtons = function () {
	var hide = "display:none";

	var fullscreen = document.getElementById("video-id_fluid_control_fullscreen");
	fullscreen.style = hide;
	var theatre = document.getElementById("video-id_fluid_control_theatre");
	theatre.style = hide;
	var progress = document.getElementById("video-id_fluid_control_duration");
	progress.style = hide;
};

var showPlayerButtons = function () {
	var show = "display:block";

	var fullscreen = document.getElementById("video-id_fluid_control_fullscreen");
	fullscreen.style = show;
	var theatre = document.getElementById("video-id_fluid_control_theatre");
	theatre.style = show;
	var progress = document.getElementById("video-id_fluid_control_duration");
	progress.style = show;
};

var removeAllListener = function () {
	wrapper.removeEventListener("mouseleave", playerOut);
	wrapper.removeEventListener("mouseenter", playerIn);
};

var playerOut = function () {
	var video_wrapper = document.getElementById("fluid_video_wrapper_video-id");
	removeIfExists(["saveCalendarDropdown", "avengers_container"]);
	// si no ha terminado la transicion, vuelve al tamaño inicial
	video_wrapper.style.width = width;
	video_wrapper.style.height = height;
	video_wrapper.style.marginTop = "0px";
	video_wrapper.style.marginLeft = "0px";
};

var playerIn = function () {
	removeIfExists(["unmuteButton"]);
	document.getElementById("paper").style.display = "none";
	video.muteToggle("video-id", true);
	document.getElementById("video-id_fluid_controls_container").style.display = "block";
	var video_wrapper = document.getElementById("fluid_video_wrapper_video-id");
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
	document.getElementById("video-id_fluid_controls_container").style.display = "none";
	document.getElementById("video-id_fluid_initial_play").style = "cursor:none;display:none";
};

var playOnClick = function () {
	document.getElementById("video-id").addEventListener("click", function () {
		removeIfExists(["unmuteButton"]);
	});
};

var makeUnmuteButton = function () {
	var unmuteButton = document.createElement("div");
	unmuteButton.id = "unmuteButton";
	unmuteButton.innerHTML = '<img src="' + base_url + '/assets/unmute.png">';
	unmuteButton.style =
		"width: 100%;height: 100%;position: absolute;top: 0;right: 0;bottom: 0;left: 0;margin: auto;display: flex;flex-direction: column;justify-content: center;align-items: center;pointer-events: none;z-index: 999;cursor:pointer";

	wrapper.appendChild(unmuteButton);

	unmuteButton.addEventListener("click", playerIn);
};

var makePaper = function () {
	var paper = document.createElement("img");
	paper.src = "" + base_url + "/assets/paper.png";
	paper.style = "position: absolute;bottom: 0px;right: 0px;z-index: 99;cursor:pointer; opacity:0";
	paper.id = "paper";
	paper.addEventListener("click", function () {
		document.getElementById("paper").style.display = "none";
		video.muteToggle("video-id", true);
		document.getElementById("video-id_fluid_controls_container").style.display = "block";
		video.play();
		var video_wrapper = document.getElementById("fluid_video_wrapper_video-id");
		video_wrapper.style.width = newWidth;
		video_wrapper.style.height = newHeight;
		video_wrapper.style.marginTop = marginTop;
		video_wrapper.style.marginLeft = marginLeft;
		removeAllListener();
		removeIfExists(["unmuteButton"]);
	});
	document.getElementById("fluid_video_wrapper_video-id").appendChild(paper);
};

var options = {
	layoutControls: {
		primaryColor: "#fff",
		posterImage: "" + base_url + "/assets/poster.png",
		playButtonShowing: true,
		persistentSettings: {
			volume: false
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
			var video_wrapper = document.getElementById("fluid_video_wrapper_video-id");

			// si el reproductor ya se achicó en el siguiente bucle mantendra el tamaño
			video_wrapper.style = "position: absolute;width: " + width + ";height: " + height + ";z-index: 10;";

			// si el primer bucle, agregamos el HTML del fondo
			if (firstPlay) {
				var background = document.createElement("div");
				var switchs = document.createElement("div");
				var close = document.createElement("img");
				var menu = document.createElement("div");

				var btnDestacadoS20 = document.createElement("button");
				var btnDestacadoS20Plus = document.createElement("button");
				var dotsDestacados = document.createElement("div");
				var dotsDiseño = document.createElement("div");
				var dotsCamara = document.createElement("div");
				var dotsRendimiento = document.createElement("div");
				background.id = "bg-samsung";
				background.style = "background-image:url('" + base_url + "/assets/background.png');width:" + width + ";height:" + height + ";background-repeat: no-repeat;";
				switchs.style = "position:absolute;top:0;height:50px;width:326px;margin:10px; border:2px solid #ffffff; border-radius:10px;";
				switchs.id = "wrapper-switch";

				close.src = "" + base_url + "/assets/close.png";
				close.style = "position:absolute;top:10px;right:10px;cursor: pointer;";
				close.id = "closeButton";

				switchs.innerHTML = `
				<form style="display:flex;">	
				<label id="sw-s20" style="height:50px;width:163px;background-color:white;border-radius:7px;"><img src="assets/swi-1.png" style="height:40px;width:32px;background-size:unset;position:relative;top:5px;left:4px;"/> <span id="sw-text-s20" style="color:#000000;position:relative;bottom:12px;">Galaxy S20 | S20+</span>
				<input type="radio" id="s20" name="modelo" style="display:none;" checked>
				</label>		
				<label id="sw-s20-ultra" style="height:49px;width:162px;background-color:#000000;border-radius:9px;"><img src="assets/swi-2.png" style="height:40px;width:35px;background-size:unset;position:relative;top:5px;left:4px;"/> <span id="sw-text-s20-ultra" style="color:#ffffff;position:relative;bottom:12px;">Galaxy S20 Ultra</span>
  				<input type="radio" id="sultra" name="modelo" style="display:none;">
				</form>
				</label>`;

				btnDestacadoS20.id = "btn-destacado-s20";
				btnDestacadoS20.style = "display:none; position: absolute;height: 24px;width: 83px;background: none;left: 422px;bottom: 134px;outline: none;border: none;cursor:pointer;";
				btnDestacadoS20Plus.id = "btn-destacado-s20+";

				btnDestacadoS20Plus.style =
					"display:none;position: absolute;height: 24px;width: 100px;background: none;left:516px;bottom: 134px;outline: none;border: none;cursor:pointer;";
				dotsDestacados.style = "width:100%;height:50px;display:none;justify-content:center;position:relative;bottom:50px;align-items:center;";
				dotsDestacados.id = "dotsDestacados";

				dotsDestacados.setAttribute("class", "dots");
				dotsDestacados.innerHTML = `
				<div style="width:100px;display:flex;justify-content:space-around;">
				<label style="background:grey;height:15px;width:15px;border-radius:50%;" id="first-destacados">
				<input type="radio" name="slider-diseño"  style="display:none;"/>
				</label>
				<label style="background:#ced2d8;height:15px;width:15px;border-radius:50%;" id="second-destacados">
				<input type="radio" name="slider-diseño"  style="display:none;"/>
				</label>	
				<label style="background:#ced2d8;height:15px;width:15px;border-radius:50%;" id="third-destacados">
				<input type="radio" name="slider-diseño"  style="display:none;"/>
				</label>				
				</div>`;

				dotsDiseño.style = "width:100%;height:50px;display:none;justify-content:center;position:relative;bottom:50px;align-items:center;";
				dotsDiseño.id = "dotsDiseño";
				dotsDiseño.setAttribute("class", "dots");
				dotsDiseño.innerHTML = `
				<div style="width:100px;display:flex;justify-content:space-around;">
				<label style="background:grey;height:15px;width:15px;border-radius:50%;" id="first-diseño">
				<input type="radio" name="slider-diseño"  style="display:none;"/>
				</label>
				<label style="background:#ced2d8;height:15px;width:15px;border-radius:50%;" id="second-diseño">
				<input type="radio" name="slider-diseño"  style="display:none;"/>
				</label>
				<label style="background:#ced2d8;height:15px;width:15px;border-radius:50%;" id="third-diseño">
				<input type="radio" name="slider-diseño"  style="display:none;"/>
				</label>				
				</div>`;

				dotsCamara.style = "width:100%;height:50px;display:none;justify-content:center;position:relative;bottom:50px;align-items:center;";
				dotsCamara.id = "dotsCamara";
				dotsCamara.setAttribute("class", "dots");
				dotsCamara.innerHTML = `
				<div style="width:100px;display:flex;justify-content:space-around;">
				<label style="background:grey;height:15px;width:15px;border-radius:50%;" id="first-camara">
				<input type="radio" name="slider-camara"  style="display:none;"/>
				</label>
				<label style="background:#ced2d8;height:15px;width:15px;border-radius:50%;" id="second-camara">
				<input type="radio" name="slider-camara"  style="display:none;"/>
				</label>
				<label style="background:#ced2d8;height:15px;width:15px;border-radius:50%;" id="third-camara">
				<input type="radio" name="slider-camara"  style="display:none;"/>
				</label>				
				</div>`;

				dotsRendimiento.style = "width:100%;height:50px;display:none;justify-content:center;position:relative;bottom:50px;align-items:center;";
				dotsRendimiento.id = "dotsRendimiento";
				dotsRendimiento.setAttribute("class", "dots");
				dotsRendimiento.innerHTML = `
				<div style="width:100px;display:flex;justify-content:space-around;">
				<label style="background:grey;height:15px;width:15px;border-radius:50%;" id="first-r">
				<input type="radio" name="slider-diseño"  style="display:none;"/>
				</label>
				<label style="background:#ced2d8;height:15px;width:15px;border-radius:50%;" id="second-r">
				<input type="radio" name="slider-diseño"  style="display:none;"/>
				</label>				
				</div>`;

				menu.style = "position:absolute;right:-33px;top:30px";

				var menuHTML = "";

				menuHTML = "<ul>";
				menuHTML +=
					'<li class="active" id="homeItem"><a href="#"><img id="img-home" src="https://github.com/SarAbigail/video/blob/ghpages/assets/home-white.png?raw=true"></a></li>';
				menuHTML += '<li id="destacadosItem"><a href="#">DESTACADOS</a></li>';
				menuHTML += '<li id="diseñoItem"><a href="#">DISEÑO</a></li>';
				menuHTML += '<li id="camaraItem"><a href="#">CÁMARA</a></li>';
				menuHTML += '<li id="rendimiento"><a href="#">RENDIMIENTO</a></li>';
				menuHTML += "</ul>";

				menu.innerHTML = menuHTML;
				menu.id = "menu";

				wrapper.appendChild(menu);
				wrapper.appendChild(close);
				wrapper.appendChild(background);
				wrapper.appendChild(switchs);
				wrapper.appendChild(btnDestacadoS20);
				wrapper.appendChild(btnDestacadoS20Plus);
				wrapper.appendChild(dotsDestacados);
				wrapper.appendChild(dotsDiseño);
				wrapper.appendChild(dotsCamara);
				wrapper.appendChild(dotsRendimiento);

				close.addEventListener("click", function () {
					document.getElementById("sw-s20").click();
					document.getElementById("fluid_video_wrapper_video-id").style.display = "block";
					document.getElementById("paper").style.display = "block";

					playerOut();

					removeAllListener();
					document.getElementById("video-id_fluid_controls_container").style.display = "none";
					document.getElementById("video-id_fluid_initial_play").style = "cursor:none;display:none";
					video.pause();
				});
			}

			// agregamos el listener para cuando termine de achicarse
			video_wrapper.addEventListener("transitionend", function (event) {
				if (event.propertyName === "width") {
					if (event.elapsedTime <= 3 && video_wrapper.style.width === width) {
					}
				}
			});

			// agregamos el listener para cuando el mouse salga del reproductor
			wrapper.addEventListener("mouseleave", playerOut);

			firstPlay = false;
		}
	}
};

var video = fluidPlayer("video-id", options);

video.on("pause", function () {
	var unmute = document.getElementById("video-id_fluid_initial_play");
	if (unmute.classList[0] != "fluid_initial_play") {
		unmute.remove();
		document.getElementById("video-id_fluid_initial_play").style = "display:block;background:#d9c408";
	}
});

video.on("play", function () {
	wrapper.addEventListener("mouseenter", playerIn);
});

video.on("ended", function () {
	var videoPlayer = document.getElementById("video-id");

	var nextVideo = document.getElementById("thumb-video-" + (parseInt(videoPlayer.getAttribute("current-video")) + 1));
	var prevVideo = document.getElementById("thumb-video-" + parseInt(videoPlayer.getAttribute("current-video")));

	if (parseInt(videoPlayer.getAttribute("current-video")) + 1 <= document.getElementsByClassName("thumb-video").length) {
		nextVideo.classList.remove("stopped");
		prevVideo.classList.add("stopped");

		nextVideo.classList.add("currentVideo");
		prevVideo.classList.remove("currentVideo");

		videoPlayer.src = nextVideo.getAttribute("data-src");
		videoPlayer.setAttribute("current-video", parseInt(videoPlayer.getAttribute("current-video")) + 1);
		videoPlayer.play();
		removeAllListener();
		playerIn();
	} else {
		videoPlayer.pause();
		removeAllListener();
	}
});

function HideDots() {
	var dots = document.getElementsByClassName("dots");
	if (dots.length > 0) {
		for (i = 0; i < dots.length; i++) {
			dots[i].style.display = "none";
		}
	}
}
function DeleteActiveClass() {
	//Se quita las clases no active
	if (document.getElementsByClassName("active").length > 0) {
		document.getElementsByClassName("active")[0].classList.remove("active");
	}
	if (document.getElementsByClassName("active-w").length > 0) {
		document.getElementsByClassName("active-w")[0].classList.remove("active-w");
	}
}
function ChangeMenuColor(color) {
	var menu = document.querySelectorAll("a");
	menu.forEach((opcion) => {
		opcion.style.color = color;
	});
}
function ChangeColorSwitch() {
	document.getElementById("wrapper-switch").style.border = "2px solid #000000";
	document.getElementById("sw-s20").style.backgroundColor = "#000000";
	document.getElementById("sw-text-s20").style.color = "#ffffff";
	document.getElementById("sw-s20-ultra").style.backgroundColor = "#ffffff";
	document.getElementById("sw-text-s20-ultra").style.color = "#000000";
	document.getElementById("s20").checked = true;
}
document.getElementById("sw-s20").addEventListener("click", () => {
	document.getElementById("homeItem").click();
});

document.getElementById("sw-s20-ultra").addEventListener("click", () => {
	document.getElementById("destacadosItem").click();
});

document.getElementById("homeItem").addEventListener("click", () => {
	document.getElementById("bg-samsung").style.backgroundImage = "url('" + imgurl + "/assets/background.png?raw=true')";
	document.getElementById("fluid_video_wrapper_video-id").style.display = "block";
	document.getElementById("img-home").setAttribute("src", imgurl + "/assets/home-white.png?raw=true");
	document.getElementById("closeButton").setAttribute("src", "/assets/close.png?raw=true");
	HideDots();
	ChangeMenuColor("#ffffff");
	//Se quita las clases no active
	DeleteActiveClass();
	document.getElementById("homeItem").classList.add("active");
	document.getElementById("sw-s20").addEventListener("click", () => {
		document.getElementById("sw-text-s20").style.color = "#000000";
		document.getElementById("sw-s20").style.backgroundColor = "#ffffff";
		document.getElementById("sw-text-s20-ultra").style.color = "#ffffff";
		document.getElementById("sw-s20-ultra").style.backgroundColor = "#000000";
	});
	document.getElementById("sw-s20-ultra").addEventListener("click", () => {
		document.getElementById("destacadosItem").click();
	});
	document.getElementById("wrapper-switch").style.border = "2px solid #ffffff";
	document.getElementById("sw-s20").style.backgroundColor = "#ffffff";
	document.getElementById("sw-text-s20").style.color = "#000000";
	document.getElementById("sw-s20-ultra").style.backgroundColor = "#000000";
	document.getElementById("sw-text-s20-ultra").style.color = "#ffffff";
});

document.getElementById("destacadosItem").addEventListener("click", () => {
	document.getElementById("bg-samsung").style.backgroundImage = "url('" + imgurl + "/assets/background-destacados-s20-2-s20+.png?raw=true')";
	document.getElementById("video-id").pause();
	document.getElementById("fluid_video_wrapper_video-id").style.display = "none";

	ChangeColorSwitch();
	//Se ocultan los demas dots
	HideDots();
	//Se muestran los dots
	document.getElementById("dotsDestacados").style.display = "flex";
	//Se muestran los botones de la primera imagen
	document.getElementById("btn-destacado-s20").style.display = "block";
	document.getElementById("btn-destacado-s20+").style.display = "block";
	//Se escuchan las imagenes
	document.getElementById("btn-destacado-s20").addEventListener("click", () => {
		document.getElementById("bg-samsung").style.backgroundImage = "url('" + imgurl + "/assets/background-destacados-s20-2-s20+.png?raw=true')";
	});
	document.getElementById("btn-destacado-s20+").addEventListener("click", () => {
		document.getElementById("bg-samsung").style.backgroundImage = "url('" + imgurl + "/assets/background-destacados-s20-1-s20+.png?raw=true')";
	});
	//Se hace click en los dots
	document.getElementById("first-destacados").addEventListener("click", () => {
		document.getElementById("bg-samsung").style.backgroundImage = "url('" + imgurl + "/assets/background-destacados-s20-2-s20+.png?raw=true')";
		document.getElementById("first-destacados").style.backgroundColor = "grey";
		document.getElementById("second-destacados").style.backgroundColor = "#ced2d8";
		document.getElementById("third-destacados").style.backgroundColor = "#ced2d8";
	});
	document.getElementById("second-destacados").addEventListener("click", () => {
		document.getElementById("bg-samsung").style.backgroundImage = "url('" + imgurl + "/assets/background-destacados-s20-2.png?raw=true')";
		document.getElementById("first-destacados").style.backgroundColor = "#ced2d8";
		document.getElementById("second-destacados").style.backgroundColor = "grey";
		document.getElementById("third-destacados").style.backgroundColor = "#ced2d8";
	});
	document.getElementById("third-destacados").addEventListener("click", () => {
		document.getElementById("bg-samsung").style.backgroundImage = "url('" + imgurl + "/assets/background-destacados-s20-3.png?raw=true')";
		document.getElementById("first-destacados").style.backgroundColor = "#ced2d8";
		document.getElementById("second-destacados").style.backgroundColor = "#ced2d8";
		document.getElementById("third-destacados").style.backgroundColor = "grey";
	});
	//Se quita las clases no active
	DeleteActiveClass();
	//Se le coloca clase active
	document.getElementById("destacadosItem").setAttribute("class", "active-w");
	ChangeMenuColor("#000000");
	document.getElementById("img-home").setAttribute("src", imgurl + "/assets/home-black.png?raw=true");
	document.getElementById("closeButton").setAttribute("src", "/assets/close-w.png?raw=true");
});

document.getElementById("diseñoItem").addEventListener("click", () => {
	//Se ocultan los demas dots
	HideDots();
	document.getElementById("dotsDiseño").style.display = "flex";
	//Se quita las clases no active
	DeleteActiveClass();
	//Se le coloca clase active
	document.getElementById("diseñoItem").setAttribute("class", "active-w");
	//la imagen de fondo es diferente
	document.getElementById("bg-samsung").style.backgroundImage = "url('" + imgurl + "/assets/background-diseño-1.png?raw=true')";
	//pausa el video
	document.getElementById("video-id").pause();
	//oculta el reproductor del video
	document.getElementById("fluid_video_wrapper_video-id").style.display = "none";
	//el home icon se vuelve negro
	document.getElementById("img-home").setAttribute("src", imgurl + "/assets/home-black.png?raw=true");
	document.getElementById("closeButton").setAttribute("src", imgurl + "/assets/close-w.png?raw=true");
	ChangeMenuColor("#000000");
	//se pone una escucha en los dots
	document.getElementById("first-diseño").addEventListener("click", () => {
		document.getElementById("bg-samsung").style.backgroundImage = "url('" + imgurl + "/assets/background-diseño-1.png?raw=true')";
		document.getElementById("first-diseño").style.backgroundColor = "grey";
		document.getElementById("second-diseño").style.backgroundColor = "#ced2d8";
		document.getElementById("third-diseño").style.backgroundColor = "#ced2d8";
	});
	document.getElementById("second-diseño").addEventListener("click", () => {
		document.getElementById("bg-samsung").style.backgroundImage = "url('" + imgurl + "/assets/background-diseño-2.png?raw=true')";
		document.getElementById("first-diseño").style.backgroundColor = "#ced2d8";
		document.getElementById("second-diseño").style.backgroundColor = "grey";
		document.getElementById("third-diseño").style.backgroundColor = "#ced2d8";
	});
	document.getElementById("third-diseño").addEventListener("click", () => {
		document.getElementById("bg-samsung").style.backgroundImage = "url('" + imgurl + "/assets/background-dise%C3%B1o-3.png?raw=true')";
		document.getElementById("first-diseño").style.backgroundColor = "#ced2d8";
		document.getElementById("second-diseño").style.backgroundColor = "#ced2d8";
		document.getElementById("third-diseño").style.backgroundColor = "grey";
	});
	ChangeColorSwitch();
});

document.getElementById("camaraItem").addEventListener("click", () => {
	//Se ocultan los demas dots
	HideDots();
	document.getElementById("dotsCamara").style.display = "flex";
	//Se quita las clases no active
	DeleteActiveClass();
	//Se le coloca clase active
	document.getElementById("camaraItem").setAttribute("class", "active-w");
	document.getElementById("bg-samsung").style.backgroundImage = "url('" + imgurl + "/assets/background-camara-1.png?raw=true')";
	document.getElementById("video-id").pause();
	document.getElementById("fluid_video_wrapper_video-id").style.display = "none";
	document.getElementById("img-home").setAttribute("src", imgurl + "/assets/home-black.png?raw=true");
	document.getElementById("closeButton").setAttribute("src", imgurl + "/assets/close-w.png?raw=true");
	ChangeMenuColor("#000000");
	//Se escucha los dots
	document.getElementById("first-camara").addEventListener("click", () => {
		document.getElementById("bg-samsung").style.backgroundImage = "url('" + imgurl + "/assets/background-camara-1.png?raw=true')";
		document.getElementById("first-camara").style.backgroundColor = "grey";
		document.getElementById("second-camara").style.backgroundColor = "#ced2d8";
		document.getElementById("third-camara").style.backgroundColor = "#ced2d8";
	});
	document.getElementById("second-camara").addEventListener("click", () => {
		document.getElementById("bg-samsung").style.backgroundImage = "url('" + imgurl + "/assets/background-camara-2.png?raw=true')";
		document.getElementById("first-camara").style.backgroundColor = "#ced2d8";
		document.getElementById("second-camara").style.backgroundColor = "grey";
		document.getElementById("third-camara").style.backgroundColor = "#ced2d8";
	});
	document.getElementById("third-camara").addEventListener("click", () => {
		document.getElementById("bg-samsung").style.backgroundImage = "url('" + imgurl + "/assets/background-camara-3.png?raw=true')";
		document.getElementById("first-camara").style.backgroundColor = "#ced2d8";
		document.getElementById("second-camara").style.backgroundColor = "#ced2d8";
		document.getElementById("third-camara").style.backgroundColor = "grey";
	});
	ChangeColorSwitch();
});

document.getElementById("rendimiento").addEventListener("click", () => {
	//Se ocultan los demas dots
	HideDots();
	document.getElementById("dotsRendimiento").style.display = "flex";
	//Se quita las clases no active
	DeleteActiveClass();
	//Se le coloca clase active
	document.getElementById("rendimiento").setAttribute("class", "active-w");
	//Se escucha los dots
	document.getElementById("first-r").addEventListener("click", () => {
		document.getElementById("bg-samsung").style.backgroundImage = "url('" + imgurl + "/assets/background-rendimiento-bateria.png?raw=true')";
		document.getElementById("first-r").style.backgroundColor = "grey";
		document.getElementById("second-r").style.backgroundColor = "#ced2d8";
	});
	document.getElementById("second-r").addEventListener("click", () => {
		document.getElementById("bg-samsung").style.backgroundImage = "url('" + imgurl + "/assets/background-rendimiento-memoria.png?raw=true')";
		document.getElementById("first-r").style.backgroundColor = "#ced2d8";
		document.getElementById("second-r").style.backgroundColor = "grey";
	});
	document.getElementById("bg-samsung").style.backgroundImage = "url('" + imgurl + "/assets/background-rendimiento-bateria.png?raw=true')";
	document.getElementById("video-id").pause();
	document.getElementById("fluid_video_wrapper_video-id").style.display = "none";
	document.getElementById("img-home").setAttribute("src", imgurl + "/assets/home-black.png?raw=true");
	document.getElementById("closeButton").setAttribute("src", imgurl + "/assets/close-w.png?raw=true");
	ChangeMenuColor("#000000");
	ChangeColorSwitch();
});
