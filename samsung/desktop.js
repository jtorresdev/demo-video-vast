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
				var wrapperSwitch = document.createElement("div");
				var close = document.createElement("img");
				var menu = document.createElement("div");
				var countdown = document.createElement("div");
				var btnDestacadoS20 = document.createElement("button");
				var btnDestacadoS20Plus = document.createElement("button");
				var dotsDestacadosS20 = document.createElement("div");
				var dotsDestacados = document.createElement("div");
				var dotsDiseño = document.createElement("div");
				var dotsDiseñoS20 = document.createElement("div");
				var dotsCamaraS20 = document.createElement("div");
				var dotsCamara = document.createElement("div");
				var dotsRendimiento = document.createElement("div");
				background.id = "bg-samsung";
				background.style =
					"background-image:url('https://jtorresdev.github.io/demo-video-vast/samsung/assets/background.png');width:" +
					width +
					";height:" +
					height +
					";background-repeat: no-repeat;";
				wrapperSwitch.style = "position:absolute;top:0;height:50px;width:326px;margin:10px; border:2px solid #ffffff; border-radius:10px;";
				wrapperSwitch.id = "wrapper-switch";
				countdown.id = "countdown";
				function n(n) {
					return n > 9 ? "" + n : "0" + n;
				}
				var deadline = new Date("Apr 26, 2019 00:00:00").getTime();
				var x = setInterval(function () {
					var now = new Date().getTime();
					var t = deadline - now;
					var days = Math.floor(t / (1000 * 60 * 60 * 24));
					var hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
					var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
					var seconds = Math.floor((t % (1000 * 60)) / 1000);
					countdown.style =
						'font-size: 50px;color: white;background: rgba(0, 0, 0, 0.5);height: 55px;padding: 20px 10px 0px 10px;line-height: 20px;margin: 0px auto;display: table;font-family: Bahnschrift, "Adobe Blank";font-variation-settings: "wght" 600, "wdth" 80;';
					var countdownHTML = "";
					countdownHTML +=
						'<div id="days" style="text-align:center;float: left;padding: 0 10px;"><div>' + n(days) + '</div><span style="color:#9c97ae;font-size: 20px;">DÍAS</span></div>';
					countdownHTML +=
						'<div id="hours" style="text-align:center;float: left;padding: 0 10px;"><div>' + n(hours) + '</div><span style="color:#9c97ae;font-size: 20px;">HRS</span></div>';
					countdownHTML +=
						'<div id="minutes" style="text-align:center;float: left;padding: 0 10px;"><div>' + n(minutes) + '</div><span style="color:#9c97ae;font-size: 20px;">MINS</span></div>';
					countdownHTML +=
						'<div id="seconds" style="text-align:center;float: left;padding: 0 10px;"><div>' + n(seconds) + '</div><span style="color:#9c97ae;font-size: 20px;">SEGS</span></div>';
					countdown.innerHTML = countdownHTML;
					if (t < 0) {
						clearInterval(x);
						countdown.innerHTML = "EXPIRED";
					}
				}, 1000);
				close.src = "" + base_url + "/assets/close.png";
				close.style = "position:absolute;top:10px;right:10px;cursor: pointer;";
				close.id = "closeButton";

				wrapperSwitch.innerHTML = `
				<div style="display:flex;">	
					<label id="sw-s20" style="height:50px;width:163px;background-color:white;border-radius:7px;"><img src="assets/swi-1.png" style="height:40px;width:32px;background-size:unset;position:relative;top:5px;left:4px;"/> <span id="sw-text-s20" style="color:#000000;position:relative;bottom:12px;">Galaxy S20 | S20+</span>
						<input type="radio" id="s20" name="modelo" style="display:none;" checked>
					</label>		
					<label id="sw-s20-ultra" style="height:50px;width:163px;background-color:#000000;border-radius:7px;"><img src="assets/swi-2.png" style="height:40px;width:35px;background-size:unset;position:relative;top:5px;left:4px;"/> <span id="sw-text-s20-ultra" style="color:#ffffff;position:relative;bottom:12px;">Galaxy S20 Ultra</span>
						<input type="radio" id="sultra" name="modelo" style="display:none;">
					</label>
				</div>`;

				btnDestacadoS20.id = "btn-destacado-s20";
				btnDestacadoS20.style = "display:none; position: absolute;height: 24px;width: 83px;background: none;left: 422px;bottom: 134px;outline: none;border: none;cursor:pointer;";
				btnDestacadoS20Plus.id = "btn-destacado-s20+";
				btnDestacadoS20Plus.style =
					"display:none;position: absolute;height: 24px;width: 100px;background: none;left:516px;bottom: 134px;outline: none;border: none;cursor:pointer;";

				dotsDestacadosS20.style = "width:100%;height:50px;display:none;justify-content:center;position:relative;bottom:50px;align-items:center;";
				dotsDestacadosS20.id = "dotsDestacadosS20";
				dotsDestacadosS20.setAttribute("class", "dots");
				dotsDestacadosS20.innerHTML = `
				<div style="width:100px;display:flex;justify-content:space-around;">
					<label style="background:none;height:14px;width:14px;border-radius:50%;" id="first-destacados-s20">
						<input type="radio" name="slider-diseño"  style="display:none;"/>
					</label>
					<label style="background:none;height:14px;width:14px;border-radius:50%;" id="second-destacados-s20">
						<input type="radio" name="slider-diseño"  style="display:none;"/>
					</label>	
					<label style="background:none;height:14px;width:14px;border-radius:50%;" id="third-destacados-s20">
						<input type="radio" name="slider-diseño"  style="display:none;"/>
					</label>				
				</div>`;

				dotsDestacados.style = "width:100%;height:50px;display:none;justify-content:center;position:relative;bottom:50px;align-items:center;";
				dotsDestacados.id = "dotsDestacados";
				dotsDestacados.setAttribute("class", "dots");
				dotsDestacados.innerHTML = `
				<div style="width:100px;display:flex;justify-content:space-around;">
					<label style="background:none;height:14px;width:14px;border-radius:50%;" id="first-destacados">
						<input type="radio" name="slider-diseño"  style="display:none;"/>
					</label>
					<label style="background:none;height:14px;width:14px;border-radius:50%;" id="second-destacados">
						<input type="radio" name="slider-diseño"  style="display:none;"/>
					</label>	
					<label style="background:none;height:14px;width:14px;border-radius:50%;" id="third-destacados">
						<input type="radio" name="slider-diseño"  style="display:none;"/>
					</label>				
				</div>`;

				dotsDiseñoS20.style = "width:100%;height:50px;display:none;justify-content:center;position:relative;bottom:50px;align-items:center;";
				dotsDiseñoS20.id = "dotsDiseñoS20";
				dotsDiseñoS20.setAttribute("class", "dots");
				dotsDiseñoS20.innerHTML = `
				<div style="width:100px;display:flex;justify-content:space-evenly;">
					<label style="background:none;height:18px;width:18px;border-radius:50%;" id="first-diseño-s20">
						<input type="radio" name="slider-diseño"  style="display:none;"/>
					</label>
					<label style="background:none;height:18px;width:18px;border-radius:50%;" id="second-diseño-s20">
						<input type="radio" name="slider-diseño"  style="display:none;"/>
					</label>												
				</div>`;

				dotsDiseño.style = "width:100%;height:50px;display:none;justify-content:center;position:relative;bottom:50px;align-items:center;";
				dotsDiseño.id = "dotsDiseño";
				dotsDiseño.setAttribute("class", "dots");
				dotsDiseño.innerHTML = `
				<div style="width:100px;display:flex;justify-content:space-evenly;">
					<label style="background:none;height:18px;width:18px;border-radius:50%;" id="first-diseño">
						<input type="radio" name="slider-diseño"  style="display:none;"/>
					</label>
					<label style="background:none;height:18px;width:18px;border-radius:50%;" id="second-diseño">
						<input type="radio" name="slider-diseño"  style="display:none;"/>
					</label>								
				</div>`;

				dotsCamaraS20.style = "width:100%;height:50px;display:none;justify-content:center;position:relative;bottom:50px;align-items:center;";
				dotsCamaraS20.id = "dotsCamaraS20";
				dotsCamaraS20.setAttribute("class", "dots");
				dotsCamaraS20.innerHTML = `
				<div style="width:100px;display:flex;justify-content:space-around;">
					<label style="background:none;height:13px;width:13px;border-radius:50%;" id="first-camara-s20">
						<input type="radio" name="slider-camara"  style="display:none;"/>
					</label>
					<label style="background:none;height:13px;width:13px;border-radius:50%;" id="second-camara-s20">
						<input type="radio" name="slider-camara"  style="display:none;"/>
					</label>
					<label style="background:none;height:13px;width:13px;border-radius:50%;" id="third-camara-s20">
						<input type="radio" name="slider-camara"  style="display:none;"/>
					</label>				
				</div>`;

				dotsCamara.style = "width:100%;height:50px;display:none;justify-content:center;position:relative;bottom:50px;align-items:center;";
				dotsCamara.id = "dotsCamara";
				dotsCamara.setAttribute("class", "dots");
				dotsCamara.innerHTML = `
				<div style="width:100px;display:flex;justify-content:space-around;">
					<label style="background:none;height:13px;width:13px;border-radius:50%;" id="first-camara">
						<input type="radio" name="slider-camara" style="display:none;"/>
					</label>
					<label style="background:none;height:13px;width:13px;border-radius:50%;" id="second-camara">
						<input type="radio" name="slider-camara" style="display:none;"/>
					</label>
					<label style="background:none;height:13px;width:13px;border-radius:50%;" id="third-camara">
						<input type="radio" name="slider-camara" style="display:none;"/>
					</label>				
				</div>`;

				dotsRendimiento.style = "width:100%;height:50px;display:none;justify-content:center;position:relative;bottom:50px;align-items:center;";
				dotsRendimiento.id = "dotsRendimiento";
				dotsRendimiento.setAttribute("class", "dots");
				dotsRendimiento.innerHTML = `
				<div style="width:100px;display:flex;justify-content:space-evenly;">
					<label style="background:none;height:18px;width:18px;border-radius:50%;" id="first-rendimiento">
						<input type="radio" name="slider-diseño"  style="display:none;"/>
					</label>
					<label style="background:none;height:18px;width:18px;border-radius:50%;" id="second-rendimiento">
						<input type="radio" name="slider-diseño"  style="display:none;"/>
					</label>				
				</div>`;

				menu.style = "position:absolute;right:-33px;top:30px";

				var menuHTML = "";

				menuHTML = "<ul>";
				menuHTML += '<li class="active" id="homeItem"><a href="#"><img id="img-home" src="https://jtorresdev.github.io/demo-video-vast/samsung/assets/home-white.png"></a></li>';
				menuHTML += '<li id="destacadosItem"><a href="#">DESTACADOS</a></li>';
				menuHTML += '<li id="camaraItem"><a href="#">CÁMARA</a></li>';
				menuHTML += '<li id="diseñoItem"><a href="#">DISEÑO</a></li>';
				menuHTML += '<li id="rendimientoItem"><a href="#">RENDIMIENTO</a></li>';
				menuHTML += "</ul>";

				menu.innerHTML = menuHTML;
				menu.id = "menu";

				wrapper.appendChild(menu);
				wrapper.appendChild(close);
				wrapper.appendChild(background);
				wrapper.appendChild(wrapperSwitch);
				wrapper.appendChild(btnDestacadoS20);
				wrapper.appendChild(btnDestacadoS20Plus);
				wrapper.appendChild(dotsDestacadosS20);
				wrapper.appendChild(dotsDestacados);
				wrapper.appendChild(dotsDiseño);
				wrapper.appendChild(dotsDiseñoS20);
				wrapper.appendChild(dotsCamara);
				wrapper.appendChild(dotsCamaraS20);
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
						document.getElementById("paper").style.display = "block";
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
function ChangeColorSwitch(color1, color2, color3) {
	document.getElementById("wrapper-switch").style.border = "2px solid" + color3;
	document.getElementById("sw-s20").style.backgroundColor = color1;
	document.getElementById("sw-text-s20").style.color = color2;
	document.getElementById("sw-s20-ultra").style.backgroundColor = color2;
	document.getElementById("sw-text-s20-ultra").style.color = color1;
	document.getElementById("s20").checked = true;
}

function ChangeColorHomeAndClose() {
	document.getElementById("img-home").setAttribute("src", base_url + "/assets/home-black.png");
	document.getElementById("closeButton").setAttribute("src", base_url + "/assets/close-w.png");
}

document.getElementById("homeItem").addEventListener("click", () => {
	document.getElementById("fluid_video_wrapper_video-id").style.display = "block";

	document.getElementById("bg-samsung").style.backgroundImage = "url('" + base_url + "/assets/background.png')";

	document.getElementById("img-home").setAttribute("src", base_url + "/assets/home-white.png");
	document.getElementById("closeButton").setAttribute("src", base_url + "/assets/close.png");

	HideDots();
	ChangeMenuColor("#ffffff");
	DeleteActiveClass();
	document.getElementById("homeItem").classList.add("active");

	ChangeColorSwitch("#ffffff", "#000000", "#ffffff");

	document.getElementById("sw-s20").addEventListener("click", () => {
		document.getElementById("bg-samsung").style.backgroundImage = "url('" + base_url + "/assets/background.png')";
		ChangeColorSwitch("#ffffff", "#000000", "#ffffff");
	});
	document.getElementById("sw-s20-ultra").addEventListener("click", () => {
		document.getElementById("bg-samsung").style.backgroundImage = "url('" + base_url + "/assets/background.png')";
		ChangeColorSwitch("#ffffff", "#000000", "#ffffff");
	});
});

document.getElementById("destacadosItem").addEventListener("click", () => {
	document.getElementById("video-id").pause();
	document.getElementById("fluid_video_wrapper_video-id").style.display = "none";

	DeleteActiveClass();
	document.getElementById("destacadosItem").setAttribute("class", "active-w");
	ChangeColorHomeAndClose();
	ChangeMenuColor("#000000");

	const SwitchDestacadosS20 = function () {
		HideDots();
		document.getElementById("dotsDestacadosS20").style.display = "flex";
		document.getElementById("bg-samsung").style.backgroundImage = "url('" + base_url + "/assets/background-destacados-s20-2-s20+.png')";
		//Se muestran los botones de la primera imagen
		document.getElementById("btn-destacado-s20").style.display = "block";
		document.getElementById("btn-destacado-s20+").style.display = "block";
		//Se escuchan las imagenes
		document.getElementById("btn-destacado-s20").addEventListener("click", () => {
			document.getElementById("bg-samsung").style.backgroundImage = "url('" + base_url + "/assets/background-destacados-s20-2-s20+.png')";
		});
		document.getElementById("btn-destacado-s20+").addEventListener("click", () => {
			document.getElementById("bg-samsung").style.backgroundImage = "url('" + base_url + "/assets/background-destacados-s20-1-s20+.png')";
		});

		//Se hace click en los dots
		document.getElementById("first-destacados-s20").addEventListener("click", () => {
			document.getElementById("bg-samsung").style.backgroundImage = "url('" + base_url + "/assets/background-destacados-s20-2-s20+.png')";
		});
		document.getElementById("second-destacados-s20").addEventListener("click", () => {
			document.getElementById("bg-samsung").style.backgroundImage = "url('" + base_url + "/assets/background-destacados-s20-2.png')";
		});
		document.getElementById("third-destacados-s20").addEventListener("click", () => {
			document.getElementById("bg-samsung").style.backgroundImage = "url('" + base_url + "/assets/background-destacados-s20-3.png')";
		});
		ChangeColorSwitch("#000000", "#ffffff", "#000000");
	};

	function SwitchDestacadosS20Ultra() {
		//Se ocultan los demas dots
		HideDots();
		//Se muestran los dots
		document.getElementById("dotsDestacados").style.display = "flex";
		document.getElementById("btn-destacado-s20").style.display = "none";
		document.getElementById("btn-destacado-s20+").style.display = "none";
		document.getElementById("bg-samsung").style.backgroundImage = "url(/assets/background-destacados-s20ultra.png)";
		//Se hace click en los dots
		document.getElementById("first-destacados").addEventListener("click", () => {
			document.getElementById("bg-samsung").style.backgroundImage = "url('" + base_url + "/assets/background-destacados-s20ultra.png')";
			ChangeColorSwitch("#ffffff", "#000000", "#000000");
		});
		document.getElementById("second-destacados").addEventListener("click", () => {
			document.getElementById("bg-samsung").style.backgroundImage = "url('" + base_url + "/assets/background-destacados-s20-2.png')";
			ChangeColorSwitch("#000000", "#ffffff", "#000000");
		});
		document.getElementById("third-destacados").addEventListener("click", () => {
			document.getElementById("bg-samsung").style.backgroundImage = "url('" + base_url + "/assets/background-destacados-s20-3.png')";
			ChangeColorSwitch("#000000", "#ffffff", "#000000");
		});
	}

	document.getElementById("sw-s20").addEventListener("click", () => {
		SwitchDestacadosS20();
	});

	document.getElementById("sw-s20-ultra").addEventListener("click", () => {
		SwitchDestacadosS20Ultra();
		ChangeColorSwitch("#ffffff", "#000000", "#000000");
	});

	SwitchDestacadosS20();
});

document.getElementById("camaraItem").addEventListener("click", () => {
	document.getElementById("video-id").pause();
	document.getElementById("fluid_video_wrapper_video-id").style.display = "none";

	HideDots();
	document.getElementById("dotsCamaraS20").style.display = "flex";

	DeleteActiveClass();
	document.getElementById("camaraItem").setAttribute("class", "active-w");

	ChangeColorHomeAndClose();
	ChangeMenuColor("#000000");

	const SwitchCamaraS20 = function () {
		ChangeColorSwitch("#000000", "#ffffff", "#000000");
		HideDots();

		document.getElementById("dotsCamaraS20").style.display = "flex";
		document.getElementById("bg-samsung").style.backgroundImage = "url('" + base_url + "/assets/background-camara-1.png')";

		document.getElementById("first-camara-s20").addEventListener("click", () => {
			document.getElementById("bg-samsung").style.backgroundImage = "url('" + base_url + "/assets/background-camara-1.png')";
		});
		document.getElementById("second-camara-s20").addEventListener("click", () => {
			document.getElementById("bg-samsung").style.backgroundImage = "url('" + base_url + "/assets/background-camara-3.png')";
		});
		document.getElementById("third-camara-s20").addEventListener("click", () => {
			document.getElementById("bg-samsung").style.backgroundImage = "url('" + base_url + "/assets/background-camara-4.png')";
		});
	};

	const SwitchCamaraS20Ultra = function () {
		ChangeColorSwitch("#ffffff", "#000000", "#000000");
		HideDots();

		document.getElementById("dotsCamara").style.display = "flex";
		document.getElementById("bg-samsung").style.backgroundImage = "url('" + base_url + "/assets/background-camara-2.png')";

		document.getElementById("first-camara").addEventListener("click", () => {
			document.getElementById("bg-samsung").style.backgroundImage = "url('" + base_url + "/assets/background-camara-2.png')";
			ChangeColorSwitch("#ffffff", "#000000", "#000000");
		});
		document.getElementById("second-camara").addEventListener("click", () => {
			document.getElementById("bg-samsung").style.backgroundImage = "url('" + base_url + "/assets/background-camara-5.png')";
			ChangeColorSwitch("#ffffff", "#000000", "#000000");
		});
		document.getElementById("third-camara").addEventListener("click", () => {
			document.getElementById("bg-samsung").style.backgroundImage = "url('" + base_url + "/assets/background-camara-4.png')";
			ChangeColorSwitch("#000000", "#ffffff", "#000000");
		});
	};

	document.getElementById("sw-s20").addEventListener("click", () => {
		SwitchCamaraS20();
	});

	document.getElementById("sw-s20-ultra").addEventListener("click", () => {
		SwitchCamaraS20Ultra();
	});

	SwitchCamaraS20();
});

document.getElementById("diseñoItem").addEventListener("click", () => {
	document.getElementById("video-id").pause();
	document.getElementById("fluid_video_wrapper_video-id").style.display = "none";

	DeleteActiveClass();
	document.getElementById("diseñoItem").setAttribute("class", "active-w");

	ChangeColorHomeAndClose();
	ChangeMenuColor("#000000");
	ChangeColorSwitch("#000000", "#ffffff", "#000000");

	const SwitchDiseñoS20 = function () {
		HideDots();
		document.getElementById("dotsDiseñoS20").style.display = "flex";
		ChangeColorSwitch("#000000", "#ffffff", "ffffff");
		document.getElementById("bg-samsung").style.backgroundImage = "url('" + base_url + "/assets/background-diseño-1.png')";

		//se pone una escucha en los dots
		document.getElementById("first-diseño-s20").addEventListener("click", () => {
			document.getElementById("bg-samsung").style.backgroundImage = "url('" + base_url + "/assets/background-diseño-1.png')";
			ChangeColorSwitch("#000000", "#ffffff", "ffffff");
		});
		document.getElementById("second-diseño-s20").addEventListener("click", () => {
			document.getElementById("bg-samsung").style.backgroundImage = "url('" + base_url + "/assets/background-diseño-2.png')";
			ChangeColorSwitch("#ffffff", "#000000", "#000000");
			SwitchDiseñoS20Ultra();
		});
	};

	const SwitchDiseñoS20Ultra = function () {
		HideDots();
		document.getElementById("dotsDiseño").style.display = "flex";
		ChangeColorSwitch("#ffffff", "#000000", "#000000");
		document.getElementById("bg-samsung").style.backgroundImage = "url('" + base_url + "/assets/background-diseño-2.png')";
		//se pone una escucha en los dots
		document.getElementById("first-diseño").addEventListener("click", () => {
			document.getElementById("bg-samsung").style.backgroundImage = "url('" + base_url + "/assets/background-diseño-2.png')";
		});
		document.getElementById("second-diseño").addEventListener("click", () => {
			document.getElementById("bg-samsung").style.backgroundImage = "url('" + base_url + "/assets/background-diseño-3.png')";
		});
	};

	document.getElementById("sw-s20").addEventListener("click", () => {
		SwitchDiseñoS20();
		console.log("diseños20");
	});

	document.getElementById("sw-s20-ultra").addEventListener("click", () => {
		SwitchDiseñoS20Ultra();
		console.log("diseños20ultra");
	});
	SwitchDiseñoS20();
});

document.getElementById("rendimientoItem").addEventListener("click", () => {
	document.getElementById("video-id").pause();
	document.getElementById("fluid_video_wrapper_video-id").style.display = "none";

	HideDots();
	document.getElementById("dotsRendimiento").style.display = "flex";

	DeleteActiveClass();
	document.getElementById("rendimientoItem").setAttribute("class", "active-w");

	document.getElementById("bg-samsung").style.backgroundImage = "url('" + base_url + "/assets/background-rendimiento-bateria.png')";

	ChangeColorHomeAndClose();
	ChangeMenuColor("#000000");
	ChangeColorSwitch("#000000", "#ffffff", "#000000");

	//Se escucha los dots
	document.getElementById("first-rendimiento").addEventListener("click", () => {
		document.getElementById("bg-samsung").style.backgroundImage = "url('" + base_url + "/assets/background-rendimiento-bateria.png')";
	});
	document.getElementById("second-rendimiento").addEventListener("click", () => {
		document.getElementById("bg-samsung").style.backgroundImage = "url('" + base_url + "/assets/background-rendimiento-memoria.png')";
	});
});
