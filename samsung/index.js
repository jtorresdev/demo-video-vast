var desktop = () => {
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

					var btnDestacadoS20 = document.createElement("button");
					var btnDestacadoS20Plus = document.createElement("button");
					var dotsDestacadosS20 = document.createElement("div");
					var dotsDestacados = document.createElement("div");
					var dotsdesign = document.createElement("div");
					var dotsdesignS20 = document.createElement("div");
					var dotsCamaraS20 = document.createElement("div");
					var dotsCamara = document.createElement("div");
					var dotsRendimiento = document.createElement("div");
					var dotsRendimientoPlus = document.createElement("div");

					background.id = "bg-samsung";
					background.style = "background-image:url('" + base_url + "/assets/background.png');width:" + width + ";height:" + height + ";background-repeat: no-repeat;";
					wrapperSwitch.style = "position:absolute;top:0;height:50px;width:326px;margin:10px; border:2px solid #ffffff; border-radius:10px;";
					wrapperSwitch.id = "wrapper-switch";

					close.src = "" + base_url + "/assets/close.png";
					close.style = "position:absolute;top:10px;right:10px;cursor: pointer;";
					close.id = "closeButton";

					wrapperSwitch.innerHTML = `
				<div style="display:flex;">	
					<label id="sw-s20" style="height:50px;width:163px;background-color:white;border-radius:7px;"><img src="${base_url}/assets/swi-1.png" style="height:40px;width:32px;background-size:unset;position:relative;top:5px;left:4px;"/> <span id="sw-text-s20" style="color:#000000;position:relative;bottom:12px;">Galaxy S20 | S20+</span>
					</label>		
					<label id="sw-s20-ultra" style="height:50px;width:163px;background-color:#000000;border-radius:7px;"><img src="${base_url}/assets/swi-2.png" style="height:40px;width:35px;background-size:unset;position:relative;top:5px;left:4px;"/> <span id="sw-text-s20-ultra" style="color:#ffffff;position:relative;bottom:12px;">Galaxy S20 Ultra</span>
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
						<input type="radio" name="slider-design"  style="display:none;"/>
					</label>
					<label style="background:none;height:14px;width:14px;border-radius:50%;" id="second-destacados-s20">
						<input type="radio" name="slider-design"  style="display:none;"/>
					</label>	
					<label style="background:none;height:14px;width:14px;border-radius:50%;" id="third-destacados-s20">
						<input type="radio" name="slider-design"  style="display:none;"/>
					</label>				
				</div>`;

					dotsDestacados.style = "width:100%;height:50px;display:none;justify-content:center;position:relative;bottom:50px;align-items:center;";
					dotsDestacados.id = "dotsDestacados";
					dotsDestacados.setAttribute("class", "dots");
					dotsDestacados.innerHTML = `
				<div style="width:100px;display:flex;justify-content:space-around;">
					<label style="background:none;height:14px;width:14px;border-radius:50%;" id="first-destacados">
						<input type="radio" name="slider-design"  style="display:none;"/>
					</label>
					<label style="background:none;height:14px;width:14px;border-radius:50%;" id="second-destacados">
						<input type="radio" name="slider-design"  style="display:none;"/>
					</label>	
					<label style="background:none;height:14px;width:14px;border-radius:50%;" id="third-destacados">
						<input type="radio" name="slider-design"  style="display:none;"/>
					</label>				
				</div>`;

					dotsdesignS20.style = "width:100%;height:50px;display:none;justify-content:center;position:relative;bottom:50px;align-items:center;";
					dotsdesignS20.id = "dotsdesignS20";
					dotsdesignS20.setAttribute("class", "dots");
					dotsdesignS20.innerHTML = `
				<div style="width:100px;display:flex;justify-content:space-evenly;">
					<label style="background:none;height:18px;width:18px;border-radius:50%;" id="first-design-s20">
						<input type="radio" name="slider-design"  style="display:none;"/>
					</label>
					<label style="background:none;height:18px;width:18px;border-radius:50%;" id="second-design-s20">
						<input type="radio" name="slider-design"  style="display:none;"/>
					</label>												
				</div>`;

					dotsdesign.style = "width:100%;height:50px;display:none;justify-content:center;position:relative;bottom:50px;align-items:center;";
					dotsdesign.id = "dotsdesign";
					dotsdesign.setAttribute("class", "dots");
					dotsdesign.innerHTML = `
				<div style="width:100px;display:flex;justify-content:space-evenly;">
					<label style="background:none;height:18px;width:18px;border-radius:50%;" id="first-design">
						<input type="radio" name="slider-design"  style="display:none;"/>
					</label>
					<label style="background:none;height:18px;width:18px;border-radius:50%;" id="second-design">
						<input type="radio" name="slider-design"  style="display:none;"/>
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
						<input type="radio" name="slider-design"  style="display:none;"/>
					</label>
					<label style="background:none;height:18px;width:18px;border-radius:50%;" id="second-rendimiento">
						<input type="radio" name="slider-design"  style="display:none;"/>
					</label>				
				</div>`;

					dotsRendimientoPlus.style = "width:100%;height:50px;display:none;justify-content:center;position:relative;bottom:50px;align-items:center;";
					dotsRendimientoPlus.id = "dotsRendimientoPlus";
					dotsRendimientoPlus.setAttribute("class", "dots");
					dotsRendimientoPlus.innerHTML = `
				<div style="width:100px;display:flex;justify-content:space-evenly;">
					<label style="background:none;height:18px;width:18px;border-radius:50%;" id="first-rendimiento-plus">
						<input type="radio" name="slider-design"  style="display:none;"/>
					</label>
					<label style="background:none;height:18px;width:18px;border-radius:50%;" id="second-rendimiento-plus">
						<input type="radio" name="slider-design"  style="display:none;"/>
					</label>				
				</div>`;

					menu.style = "position:absolute;right:-33px;top:30px";

					var menuHTML = "";

					menuHTML = "<ul>";
					menuHTML += `<li class="active" id="homeItem"><a ><img id="img-home" src="${base_url}/assets/home-white.png"></a></li>`;
					menuHTML += '<li id="destacadosItem"><a >DESTACADOS</a></li>';
					menuHTML += '<li id="camaraItem"><a>CÁMARA</a></li>';
					menuHTML += '<li id="designItem"><a >DISEÑO</a></li>';
					menuHTML += '<li id="rendimientoItem"><a>RENDIMIENTO</a></li>';
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
					wrapper.appendChild(dotsdesign);
					wrapper.appendChild(dotsdesignS20);
					wrapper.appendChild(dotsCamara);
					wrapper.appendChild(dotsCamaraS20);
					wrapper.appendChild(dotsRendimiento);
					wrapper.appendChild(dotsRendimientoPlus);

					close.addEventListener("click", function () {
						document.getElementById("homeItem").click();
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
	}

	function ChangeColorHomeAndClose() {
		document.getElementById("img-home").setAttribute("src", base_url + "/assets/home-black.png");
		document.getElementById("closeButton").setAttribute("src", base_url + "/assets/close-w.png");
	}

	let modelActive = 1;
	let isHome = true;
	let menuActive = "home";

	const contentActive = (menuActive) => {
		console.log(menuActive);
		console.log(isHome);

		switch (menuActive) {
			case "destacados":
				destacadosFunc();
				break;

			case "camara":
				camaraFunc();
				break;

			case "design":
				designFunc();
				break;

			case "rendimiento":
				rendimientoFunc();
				break;

			default:
				homeFunc();
				break;
		}
	};

	console.log(menuActive);
	console.log(isHome);

	document.getElementById("sw-s20").addEventListener("click", () => {
		if (isHome) {
			ChangeColorSwitch("#ffffff", "#000000", "#ffffff");
		} else {
			ChangeColorSwitch("#000000", "#ffffff", "#000000");
		}

		modelActive = 1;
		contentActive(menuActive);
	});

	document.getElementById("sw-s20-ultra").addEventListener("click", () => {
		if (isHome) {
			ChangeColorSwitch("#000000", "#ffffff", "#ffffff");
		} else {
			ChangeColorSwitch("#ffffff", "#000000", "#000000");
		}

		modelActive = 2;
		contentActive(menuActive);
	});

	/** funciones de pestañas */

	const homeFunc = () => {
		isHome = true;
		menuActive = "home";
		document.getElementById("fluid_video_wrapper_video-id").style.display = "block";

		document.getElementById("bg-samsung").style.backgroundImage = "url('" + base_url + "/assets/background.png')";

		document.getElementById("img-home").setAttribute("src", base_url + "/assets/home-white.png");
		document.getElementById("closeButton").setAttribute("src", base_url + "/assets/close.png");

		HideDots();
		ChangeMenuColor("#ffffff");
		DeleteActiveClass();
		document.getElementById("homeItem").classList.add("active");

		ChangeColorSwitch("#ffffff", "#000000", "#ffffff");

		if (modelActive === 1) {
			document.getElementById("bg-samsung").style.backgroundImage = "url('" + base_url + "/assets/background.png')";
			ChangeColorSwitch("#ffffff", "#000000", "#ffffff");
		} else {
			document.getElementById("bg-samsung").style.backgroundImage = "url('" + base_url + "/assets/background.png')";
			ChangeColorSwitch("#000000", "#ffffff", "#ffffff");
		}
	};

	const destacadosFunc = () => {
		isHome = false;
		menuActive = "destacados";
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
		};

		function SwitchDestacadosS20Ultra() {
			//Se ocultan los demas dots
			HideDots();
			//Se muestran los dots
			document.getElementById("dotsDestacados").style.display = "flex";
			document.getElementById("btn-destacado-s20").style.display = "none";
			document.getElementById("btn-destacado-s20+").style.display = "none";
			document.getElementById("bg-samsung").style.backgroundImage = "url('" + base_url + "/assets/background-destacados-s20ultra.png')";
			//Se hace click en los dots
			document.getElementById("first-destacados").addEventListener("click", () => {
				document.getElementById("bg-samsung").style.backgroundImage = "url('" + base_url + "/assets/background-destacados-s20ultra.png')";
				ChangeColorSwitch("#ffffff", "#000000", "#000000");
			});
			document.getElementById("second-destacados").addEventListener("click", () => {
				document.getElementById("bg-samsung").style.backgroundImage = "url('" + base_url + "/assets/camara-ultra.png')";
				ChangeColorSwitch("#ffffff", "#000000", "#000000");
			});
			document.getElementById("third-destacados").addEventListener("click", () => {
				document.getElementById("bg-samsung").style.backgroundImage = "url('" + base_url + "/assets/background-destacados-s20-3.png')";
				ChangeColorSwitch("#ffffff", "#000000", "#000000");
			});
		}

		if (modelActive === 1) {
			SwitchDestacadosS20();
			ChangeColorSwitch("#000000", "#ffffff", "#000000");
		} else {
			SwitchDestacadosS20Ultra();
			ChangeColorSwitch("#ffffff", "#000000", "#000000");
		}
	};

	const camaraFunc = () => {
		isHome = false;
		menuActive = "camara";
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
				ChangeColorSwitch("#ffffff", "#000000", "#000000");
			});
		};

		if (modelActive === 1) {
			SwitchCamaraS20();
			ChangeColorSwitch("#000000", "#ffffff", "#000000");
		} else {
			SwitchCamaraS20Ultra();
			ChangeColorSwitch("#ffffff", "#000000", "#000000");
		}
	};

	const designFunc = () => {
		isHome = false;
		menuActive = "design";
		document.getElementById("video-id").pause();
		document.getElementById("fluid_video_wrapper_video-id").style.display = "none";

		DeleteActiveClass();
		document.getElementById("designItem").setAttribute("class", "active-w");

		ChangeColorHomeAndClose();
		ChangeMenuColor("#000000");
		ChangeColorSwitch("#000000", "#ffffff", "#000000");

		const SwitchdesignS20 = function () {
			HideDots();
			document.getElementById("dotsdesignS20").style.display = "flex";
			ChangeColorSwitch("#000000", "#ffffff", "ffffff");
			document.getElementById("bg-samsung").style.backgroundImage = "url('" + base_url + "/assets/background-diseño-1.png')";

			//se pone una escucha en los dots
			document.getElementById("first-design-s20").addEventListener("click", () => {
				document.getElementById("bg-samsung").style.backgroundImage = "url('" + base_url + "/assets/background-diseño-1.png')";
				ChangeColorSwitch("#000000", "#ffffff", "ffffff");
			});
			document.getElementById("second-design-s20").addEventListener("click", () => {
				document.getElementById("bg-samsung").style.backgroundImage = "url('" + base_url + "/assets/background-diseño-3.png')";
				ChangeColorSwitch("#000000", "#ffffff", "ffffff");
			});
		};

		const SwitchdesignS20Ultra = function () {
			HideDots();
			document.getElementById("dotsdesign").style.display = "flex";
			ChangeColorSwitch("#ffffff", "#000000", "#000000");
			document.getElementById("bg-samsung").style.backgroundImage = "url('" + base_url + "/assets/background-diseño-2.png')";
			//se pone una escucha en los dots
			document.getElementById("first-design").addEventListener("click", () => {
				document.getElementById("bg-samsung").style.backgroundImage = "url('" + base_url + "/assets/background-diseño-2.png')";
			});
			document.getElementById("second-design").addEventListener("click", () => {
				document.getElementById("bg-samsung").style.backgroundImage = "url('" + base_url + "/assets/background-diseño-3.png')";
			});
		};

		if (modelActive === 1) {
			SwitchdesignS20();
			ChangeColorSwitch("#000000", "#ffffff", "#000000");
		} else {
			SwitchdesignS20Ultra();
			ChangeColorSwitch("#ffffff", "#000000", "#000000");
		}
	};

	const rendimientoFunc = () => {
		isHome = false;
		menuActive = "rendimiento";
		document.getElementById("video-id").pause();
		document.getElementById("fluid_video_wrapper_video-id").style.display = "none";

		DeleteActiveClass();
		document.getElementById("rendimientoItem").setAttribute("class", "active-w");

		ChangeColorHomeAndClose();
		ChangeMenuColor("#000000");
		ChangeColorSwitch("#000000", "#ffffff", "#000000");

		const ChangeRendimientoS20 = function () {
			HideDots();
			document.getElementById("dotsRendimiento").style.display = "flex";
			ChangeColorSwitch("#000000", "#ffffff", "#000000");

			document.getElementById("bg-samsung").style.backgroundImage = "url('" + base_url + "/assets/background-rendimiento-bateria.png')";

			//Se escucha los dots
			document.getElementById("first-rendimiento").addEventListener("click", () => {
				ChangeColorSwitch("#000000", "#ffffff", "#000000");
				document.getElementById("bg-samsung").style.backgroundImage = "url('" + base_url + "/assets/background-rendimiento-bateria.png')";
			});
			document.getElementById("second-rendimiento").addEventListener("click", () => {
				ChangeColorSwitch("#000000", "#ffffff", "#000000");
				document.getElementById("bg-samsung").style.backgroundImage = "url('" + base_url + "/assets/background-rendimiento-memoria.png')";
			});
		};

		const ChangeRendimientoS20Ultra = function () {
			HideDots();
			document.getElementById("dotsRendimientoPlus").style.display = "flex";
			ChangeColorSwitch("#ffffff", "#000000", "#000000");

			document.getElementById("bg-samsung").style.backgroundImage = "url('" + base_url + "/assets/background-rendimiento-bateria.png')";

			//Se escucha los dots
			document.getElementById("first-rendimiento-plus").addEventListener("click", () => {
				ChangeColorSwitch("#ffffff", "#000000", "#000000");
				document.getElementById("bg-samsung").style.backgroundImage = "url('" + base_url + "/assets/background-rendimiento-bateria.png')";
			});
			document.getElementById("second-rendimiento-plus").addEventListener("click", () => {
				ChangeColorSwitch("#ffffff", "#000000", "#000000");
				document.getElementById("bg-samsung").style.backgroundImage = "url('" + base_url + "/assets/background-rendimiento-memoria.png')";
			});
		};

		if (modelActive === 1) {
			ChangeRendimientoS20();
			ChangeColorSwitch("#000000", "#ffffff", "#000000");
		} else {
			ChangeRendimientoS20Ultra();
			ChangeColorSwitch("#ffffff", "#000000", "#000000");
		}
	};

	/** listeners */

	document.getElementById("homeItem").addEventListener("click", homeFunc);
	document.getElementById("destacadosItem").addEventListener("click", destacadosFunc);

	document.getElementById("camaraItem").addEventListener("click", camaraFunc);

	document.getElementById("designItem").addEventListener("click", designFunc);

	document.getElementById("rendimientoItem").addEventListener("click", rendimientoFunc);
};

var mobile = () => {
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
			document.getElementById("unmuteButton").style.opacity = "0";
			video.muteToggle("video-id", true);
			video.play();

			document.getElementById("video-id").style.background = "transparent";

			var wrapper = document.getElementById("wrapper");
			var player = document.getElementById("player");
			var header = document.createElement("div");
			var closeButton = document.createElement("img");
			var menu = document.createElement("div");

			var wrapperSwitch = document.createElement("div");
			var containerImg = document.createElement("div");

			menu.style.cssText = "position:absolute;width:100%;display:flex;top:76px;justify-content:center;z-index:1;";
			var menuHTML = "";
			menuHTML = "<ul style='margin:0; padding:12px 0;display:flex;justify-content:space-between;;width:90%;'>";
			menuHTML += `<li class="active" id="homeItem"><a href="#"><img id="img-home" src="${base_url}/assets/home-white.png"'></a></li>`;
			menuHTML += '<li id="destacadosItem"><a href="#">DESTACADOS</a></li>';
			menuHTML += '<li id="camaraItem"><a href="#">CÁMARA</a></li>';
			menuHTML += '<li id="diseñoItem"><a href="#">DISEÑO</a></li>';
			menuHTML += '<li id="rendimientoItem"><a href="#">RENDIMIENTO</a></li>';
			menuHTML += "</ul>";
			menu.innerHTML = menuHTML;
			menu.id = "menu";

			document.getElementById("paper").style.opacity = "0";

			closeButton.style.cssText = "float:right;width:10px;height:10px;margin:5px;cursor: pointer;";
			closeButton.id = "closeButton";
			closeButton.src = base_url + "/assets/close.png";

			header.id = "header";
			header.style.cssText = "width:100%;height:25px;text-align: center;";

			wrapper.style.cssText = `position: fixed;background-image: url(${base_url}/assets/background-mobile.png);height: 100%;top: 0px;background-size: 85%;background-repeat: no-repeat;background-position:bottom;width: 100%;background-color: black;left: 0;z-index: 999999999;`;
			wrapperSwitch.style.cssText = "width:100%;position:absolute;top:25px;height:41px;z-index:1;";
			wrapperSwitch.id = "switch-div";
			wrapperSwitch.innerHTML = `
		<div id="wrapper-switch" style="display:flex; width:70%;margin:auto;border:solid 1px #ffffff; border-radius:5px;">
			<label id="sw-s20" style="height:40px;width:50%;background-color:white;border-radius:4px 0 0 4px;"><img src="${base_url}/assets/switch-1-mobil.png" style="width:20px;position:relative;top:3px;left:6px;"/> <span id="sw-text-s20" style="color:#000000;position:relative;bottom:12px;left:10px;font-family:Samsung Sharp Sans;font-size:9px;">Galaxy S20 | S20+</span></label>		
			<label id="sw-s20-ultra" style="height:40px;width:50%;background-color:#000000;border-radius:0 4px 4px 0;"><img src="${base_url}/assets/switch-2-mobil.png" style="width:20px;position:relative;top:6px;left:6px;"/> <span id="sw-text-s20-ultra" style="color:#ffffff;position:relative;bottom:6px;left:10px;font-family:Samsung Sharp Sans;font-size:9px;">Galaxy S20 Ultra</span></label>
		</div>`;

			containerImg.style.cssText = "position:absolute;top:25px;display:none;height:max-content;padding-bottom:5%;";
			containerImg.id = "containerImg";
			containerImg.innerHTML = `
		<img id="img-src" src="${base_url}/assets/bg-destacados-1-mobil.png" style="width:100%;"/>
		<div id="btnDestacadoDiv" style="display:flex;width:100%;">
			<button id="btn-destacado-s20" style="background:none;border:none;display:none;position:relative;top:0;left:8%;width:66px;height:20px;font-family:Samsung Sharp Sans;font-size:12px;border-bottom:solid 1px; padding:0;">Galaxy S20</button>
			<button id="btn-destacado-s20-plus" style="background:none;border:none;display:none;position:relative;top:0;left:13%;width:72px;height:20px;font-family:Samsung Sharp Sans;font-size:12px;border-bottom:solid 1px white; padding:0;color:#a3a3a3;">Galaxy S20+</button>
		</div>
		<div id="dotDiv1" style="display:flex;width:30%;justify-content:space-around;margin:50px auto">
			<label id="destacado-1" style="width:15px;height:15px; border-radius:50%; background:grey"></label>
			<label id="destacado-2" style="width:15px;height:15px; border-radius:50%; background:lightgrey"></label>
			<label id="destacado-3" style="width:15px;height:15px; border-radius:50%; background:lightgrey"></label>
		</div>
		<div id="dotDiv2" style="display:none;width:30%;justify-content:space-around;margin:52px auto">
			<label id="destacado-1-plus" style="width:15px;height:15px; border-radius:50%; background:grey"></label>
			<label id="destacado-2-plus" style="width:15px;height:15px; border-radius:50%; background:lightgrey"></label>
			<label id="destacado-3-plus" style="width:15px;height:15px; border-radius:50%; background:lightgrey"></label>
		</div>
		<div id="dotDiv3" style="display:none;width:30%;justify-content:space-around;margin:0 auto">
			<label id="camara-1" style="width:15px;height:15px; border-radius:50%; background:grey"></label>
			<label id="camara-2" style="width:15px;height:15px; border-radius:50%; background:lightgrey"></label>
			<label id="camara-3" style="width:15px;height:15px; border-radius:50%; background:lightgrey"></label>
		</div>
		<div id="dotDiv4" style="display:none;width:30%;justify-content:space-around;margin:0 auto">
			<label id="camara-1-plus" style="width:15px;height:15px; border-radius:50%; background:grey"></label>
			<label id="camara-2-plus" style="width:15px;height:15px; border-radius:50%; background:lightgrey"></label>
			<label id="camara-3-plus" style="width:15px;height:15px; border-radius:50%; background:lightgrey"></label>
		</div>
		<div id="dotDiv5" style="display:none;width:30%;justify-content:space-around;margin:0 auto">
			<label id="diseño-1" style="width:15px;height:15px; border-radius:50%; background:grey"></label>
			<label id="diseño-2" style="width:15px;height:15px; border-radius:50%; background:lightgrey"></label>
		</div>
		<div id="dotDiv6" style="display:none;width:30%;justify-content:space-around;margin:0 auto">
			<label id="diseño-1-plus" style="width:15px;height:15px; border-radius:50%; background:grey"></label>
			<label id="diseño-2-plus" style="width:15px;height:15px; border-radius:50%; background:lightgrey"></label>
		</div>
		<div id="dotDiv7" style="display:none;width:30%;justify-content:space-around;margin:0 auto">
			<label id="rendimiento-1" style="width:15px;height:15px; border-radius:50%; background:grey"></label>
			<label id="rendimiento-2" style="width:15px;height:15px; border-radius:50%; background:lightgrey"></label>
		</div>
		<div id="dotDiv8" style="display:none;width:30%;justify-content:space-around;margin:0 auto">
			<label id="rendimiento-1-plus" style="width:15px;height:15px; border-radius:50%; background:grey"></label>
			<label id="rendimiento-2-plus" style="width:15px;height:15px; border-radius:50%; background:lightgrey"></label>
		</div>
		`;

			header.appendChild(closeButton);
			wrapper.appendChild(wrapperSwitch);
			wrapper.insertBefore(header, wrapper.firstChild);
			wrapper.appendChild(menu);
			wrapper.appendChild(containerImg);

			function DeleteActiveClass() {
				//Se quita las clases no active
				if (document.getElementsByClassName("active").length > 0) {
					document.getElementsByClassName("active")[0].classList.remove("active");
				}
				if (document.getElementsByClassName("active-w").length > 0) {
					document.getElementsByClassName("active-w")[0].classList.remove("active-w");
				}
			}

			function ChangeColorSwitch(color1, color2, color3) {
				document.getElementById("wrapper-switch").style.border = "1px solid" + color3;
				document.getElementById("sw-s20").style.backgroundColor = color1;
				document.getElementById("sw-text-s20").style.color = color2;
				document.getElementById("sw-s20-ultra").style.backgroundColor = color2;
				document.getElementById("sw-text-s20-ultra").style.color = color1;
			}

			function ChangeMenuColor(color) {
				var menu = document.querySelectorAll("a");
				menu.forEach((opcion) => {
					opcion.style.color = color;
				});
			}

			function ChangeColorHomeAndClose() {
				document.getElementById("img-home").setAttribute("src", base_url + "/assets/home-black.png");
				document.getElementById("closeButton").setAttribute("src", base_url + "/assets/close-w.png");
			}

			let modelActive = 1;
			let isHome = true;
			let menuActive = "home";

			const contentActive = (menuActive) => {
				console.log(menuActive);
				console.log(isHome);

				switch (menuActive) {
					case "destacados":
						destacadosFunc();
						break;

					case "camara":
						camaraFunc();
						break;

					case "design":
						designFunc();
						break;

					case "rendimiento":
						rendimientoFunc();
						break;

					default:
						homeFunc();
						break;
				}
			};

			document.getElementById("sw-s20").addEventListener("click", () => {
				if (isHome) {
					ChangeColorSwitch("#ffffff", "#000000", "#ffffff");
				} else {
					ChangeColorSwitch("#000000", "#ffffff", "#000000");
				}

				modelActive = 1;
				contentActive(menuActive);
			});

			document.getElementById("sw-s20-ultra").addEventListener("click", () => {
				if (isHome) {
					ChangeColorSwitch("#000000", "#ffffff", "#ffffff");
				} else {
					ChangeColorSwitch("#ffffff", "#000000", "#000000");
				}

				modelActive = 2;
				contentActive(menuActive);
			});

			/* funciones de pestañas */

			const homeFunc = () => {
				isHome = true;
				menuActive = "home";
				ChangeColorSwitch("#ffffff", "#000000", "#ffffff");
				ChangeMenuColor("#ffffff");
				document.getElementById("img-home").setAttribute("src", base_url + "/assets/home-white.png");
				document.getElementById("closeButton").setAttribute("src", base_url + "/assets/close.png");
				DeleteActiveClass();
				document.getElementById("homeItem").classList.add("active");

				document.getElementById("containerImg").style.display = "none";
				document.getElementById("fluid_video_wrapper_video-id").style.display = "block";
				document.getElementById("wrapper").style.backgroundImage = `url(${base_url}/assets/background-mobile.png)`;
				document.getElementById("wrapper").style.backgroundColor = "#000000";

				if (modelActive === 1) {
					ChangeColorSwitch("#ffffff", "#000000", "#ffffff");
				} else {
					ChangeColorSwitch("#000000", "#ffffff", "#ffffff");
				}
			};

			const destacadosFunc = () => {
				isHome = false;
				menuActive = "destacados";
				document.getElementById("fluid_video_wrapper_video-id").style.display = "none";
				document.getElementById("video-id").pause();
				document.getElementById("wrapper").style.backgroundImage = "none";
				document.getElementById("wrapper").style.backgroundColor = "#ffffff";
				document.getElementById("containerImg").style.display = "block";

				ChangeMenuColor("#000000");
				ChangeColorHomeAndClose();
				DeleteActiveClass();
				document.getElementById("destacadosItem").classList.add("active-w");

				const ChangeDestacadosS20 = function () {
					document.getElementById("dotDiv1").style.display = "flex";
					document.getElementById("dotDiv2").style.display = "none";
					document.getElementById("dotDiv3").style.display = "none";
					document.getElementById("dotDiv4").style.display = "none";
					document.getElementById("dotDiv5").style.display = "none";
					document.getElementById("dotDiv6").style.display = "none";
					document.getElementById("dotDiv7").style.display = "none";
					document.getElementById("dotDiv8").style.display = "none";

					document.getElementById("btnDestacadoDiv").style.display = "flex";
					document.getElementById("btn-destacado-s20").style.display = "flex";
					document.getElementById("btn-destacado-s20-plus").style.display = "flex";

					ChangeColorSwitch("#000000", "#ffffff", "#000000");
					document.getElementById("img-src").src = base_url + "/assets/bg-destacados-1-mobil.png";
					document.getElementById("destacado-1").click();

					document.getElementById("destacado-1").addEventListener("click", () => {
						document.getElementById("btnDestacadoDiv").style.display = "flex";
						document.getElementById("img-src").src = base_url + "/assets/bg-destacados-1-mobil.png";
						document.getElementById("destacado-1").style.backgroundColor = "grey";
						document.getElementById("destacado-2").style.backgroundColor = "lightgrey";
						document.getElementById("destacado-3").style.backgroundColor = "lightgrey";
						document.getElementById("dotDiv1").style.margin = "50px auto";
					});
					document.getElementById("destacado-2").addEventListener("click", () => {
						document.getElementById("btnDestacadoDiv").style.display = "none";
						document.getElementById("img-src").src = base_url + "/assets/bg-destacados-3-mobil.png";
						document.getElementById("destacado-1").style.backgroundColor = "lightgrey";
						document.getElementById("destacado-2").style.backgroundColor = "grey";
						document.getElementById("destacado-3").style.backgroundColor = "lightgrey";
						document.getElementById("dotDiv1").style.margin = "70px auto";
					});

					document.getElementById("destacado-3").addEventListener("click", () => {
						document.getElementById("btnDestacadoDiv").style.display = "none";
						document.getElementById("img-src").src = base_url + "/assets/bg-destacados-4-mobil.png";
						document.getElementById("destacado-1").style.backgroundColor = "lightgrey";
						document.getElementById("destacado-2").style.backgroundColor = "lightgrey";
						document.getElementById("destacado-3").style.backgroundColor = "grey";
						document.getElementById("dotDiv1").style.margin = "25px auto";
					});

					document.getElementById("btn-destacado-s20").addEventListener("click", () => {
						document.getElementById("btn-destacado-s20").style.color = "black";
						document.getElementById("btn-destacado-s20").style.borderColor = "black";
						document.getElementById("btn-destacado-s20-plus").style.color = "#a3a3a3";
						document.getElementById("btn-destacado-s20-plus").style.borderColor = "#a3a3a3";
						document.getElementById("img-src").src = base_url + "/assets/bg-destacados-1-mobil.png";
					});

					document.getElementById("btn-destacado-s20-plus").addEventListener("click", () => {
						document.getElementById("btn-destacado-s20").style.color = "#a3a3a3";
						document.getElementById("btn-destacado-s20").style.borderColor = "#a3a3a3";
						document.getElementById("btn-destacado-s20-plus").style.color = "black";
						document.getElementById("btn-destacado-s20-plus").style.borderColor = "black";
						document.getElementById("img-src").src = base_url + "/assets/bg-destacados-2-mobil.png";
					});
				};

				const ChangeDestacadosS20Ultra = function () {
					document.getElementById("dotDiv1").style.display = "none";
					document.getElementById("dotDiv2").style.display = "flex";
					document.getElementById("dotDiv3").style.display = "none";
					document.getElementById("dotDiv4").style.display = "none";
					document.getElementById("dotDiv5").style.display = "none";
					document.getElementById("dotDiv6").style.display = "none";
					document.getElementById("dotDiv7").style.display = "none";
					document.getElementById("dotDiv8").style.display = "none";

					document.getElementById("btnDestacadoDiv").style.display = "none";
					document.getElementById("btn-destacado-s20").style.display = "none";
					document.getElementById("btn-destacado-s20-plus").style.display = "none";

					ChangeColorSwitch("#ffffff", "#000000", "#000000");
					document.getElementById("img-src").src = base_url + "/assets/bg-destacados-5-mobil.png";
					document.getElementById("destacado-1-plus").click();

					document.getElementById("destacado-1-plus").addEventListener("click", () => {
						// document.getElementById('btnDestacadoDiv').style.display = 'flex';
						document.getElementById("img-src").src = base_url + "/assets/bg-destacados-5-mobil.png";
						document.getElementById("destacado-1-plus").style.backgroundColor = "grey";
						document.getElementById("destacado-2-plus").style.backgroundColor = "lightgrey";
						document.getElementById("destacado-3-plus").style.backgroundColor = "lightgrey";
						document.getElementById("dotDiv2").style.margin = "50px auto";
					});
					document.getElementById("destacado-2-plus").addEventListener("click", () => {
						// document.getElementById('btnDestacadoDiv').style.display = 'none';
						document.getElementById("img-src").src = base_url + "/assets/camara-ultra-movil.png";
						document.getElementById("destacado-1-plus").style.backgroundColor = "lightgrey";
						document.getElementById("destacado-2-plus").style.backgroundColor = "grey";
						document.getElementById("destacado-3-plus").style.backgroundColor = "lightgrey";
						document.getElementById("dotDiv2").style.margin = "70px auto";
					});

					document.getElementById("destacado-3-plus").addEventListener("click", () => {
						// document.getElementById('btnDestacadoDiv').style.display = 'none';
						document.getElementById("img-src").src = base_url + "/assets/bg-destacados-4-mobil.png";
						document.getElementById("destacado-1-plus").style.backgroundColor = "lightgrey";
						document.getElementById("destacado-2-plus").style.backgroundColor = "lightgrey";
						document.getElementById("destacado-3-plus").style.backgroundColor = "grey";
						document.getElementById("dotDiv2").style.margin = "25px auto";
					});
				};

				if (modelActive === 1) {
					ChangeDestacadosS20();
					ChangeColorSwitch("#000000", "#ffffff", "#000000");
				} else {
					ChangeDestacadosS20Ultra();
					ChangeColorSwitch("#ffffff", "#000000", "#000000");
				}
			};

			const camaraFunc = () => {
				isHome = false;
				menuActive = "camara";
				document.getElementById("fluid_video_wrapper_video-id").style.display = "none";
				document.getElementById("video-id").pause();
				document.getElementById("wrapper").style.backgroundImage = "none";
				document.getElementById("wrapper").style.backgroundColor = "#ffffff";
				document.getElementById("containerImg").style.display = "block";

				ChangeMenuColor("#000000");
				ChangeColorHomeAndClose();
				DeleteActiveClass();
				document.getElementById("camaraItem").classList.add("active-w");

				const ChangeCamaraS20 = function () {
					document.getElementById("dotDiv1").style.display = "none";
					document.getElementById("dotDiv2").style.display = "none";
					document.getElementById("dotDiv3").style.display = "flex";
					document.getElementById("dotDiv4").style.display = "none";
					document.getElementById("dotDiv5").style.display = "none";
					document.getElementById("dotDiv6").style.display = "none";
					document.getElementById("dotDiv7").style.display = "none";
					document.getElementById("dotDiv8").style.display = "none";

					document.getElementById("btnDestacadoDiv").style.display = "none";

					ChangeColorSwitch("#000000", "#ffffff", "#000000");
					document.getElementById("img-src").src = base_url + "/assets/bg-camara-1-mobil.png";
					document.getElementById("camara-1").click();

					document.getElementById("camara-1").addEventListener("click", () => {
						document.getElementById("img-src").src = base_url + "/assets/bg-camara-1-mobil.png";
						document.getElementById("camara-1").style.backgroundColor = "grey";
						document.getElementById("camara-2").style.backgroundColor = "lightgrey";
						document.getElementById("camara-3").style.backgroundColor = "lightgrey";
					});
					document.getElementById("camara-2").addEventListener("click", () => {
						document.getElementById("img-src").src = base_url + "/assets/bg-camara-3-mobil.png";
						document.getElementById("camara-1").style.backgroundColor = "lightgrey";
						document.getElementById("camara-2").style.backgroundColor = "grey";
						document.getElementById("camara-3").style.backgroundColor = "lightgrey";
					});
					document.getElementById("camara-3").addEventListener("click", () => {
						document.getElementById("img-src").src = base_url + "/assets/bg-camara-5-mobil.png";
						document.getElementById("camara-1").style.backgroundColor = "lightgrey";
						document.getElementById("camara-2").style.backgroundColor = "lightgrey";
						document.getElementById("camara-3").style.backgroundColor = "grey";
					});
				};

				const ChangeCamaraS20Ultra = function () {
					document.getElementById("dotDiv1").style.display = "none";
					document.getElementById("dotDiv2").style.display = "none";
					document.getElementById("dotDiv3").style.display = "none";
					document.getElementById("dotDiv4").style.display = "flex";
					document.getElementById("dotDiv5").style.display = "none";
					document.getElementById("dotDiv6").style.display = "none";
					document.getElementById("dotDiv7").style.display = "none";
					document.getElementById("dotDiv8").style.display = "none";

					document.getElementById("btnDestacadoDiv").style.display = "none";

					ChangeColorSwitch("#ffffff", "#000000", "#000000");
					document.getElementById("img-src").src = base_url + "/assets/bg-camara-2-mobil.png";

					document.getElementById("camara-1-plus").click();

					document.getElementById("camara-1-plus").addEventListener("click", () => {
						document.getElementById("img-src").src = base_url + "/assets/bg-camara-2-mobil.png";
						document.getElementById("camara-1-plus").style.backgroundColor = "grey";
						document.getElementById("camara-2-plus").style.backgroundColor = "lightgrey";
						document.getElementById("camara-3-plus").style.backgroundColor = "lightgrey";
					});
					document.getElementById("camara-2-plus").addEventListener("click", () => {
						document.getElementById("img-src").src = base_url + "/assets/bg-camara-4-mobil.png";
						document.getElementById("camara-1-plus").style.backgroundColor = "lightgrey";
						document.getElementById("camara-2-plus").style.backgroundColor = "grey";
						document.getElementById("camara-3-plus").style.backgroundColor = "lightgrey";
					});
					document.getElementById("camara-3-plus").addEventListener("click", () => {
						document.getElementById("img-src").src = base_url + "/assets/bg-camara-5-mobil.png";
						document.getElementById("camara-1-plus").style.backgroundColor = "lightgrey";
						document.getElementById("camara-2-plus").style.backgroundColor = "lightgrey";
						document.getElementById("camara-3-plus").style.backgroundColor = "grey";
					});
				};

				if (modelActive === 1) {
					ChangeCamaraS20();
				} else {
					ChangeCamaraS20Ultra();
				}
			};

			const designFunc = () => {
				isHome = false;
				menuActive = "design";
				document.getElementById("fluid_video_wrapper_video-id").style.display = "none";
				document.getElementById("video-id").pause();
				document.getElementById("wrapper").style.backgroundImage = "none";
				document.getElementById("wrapper").style.backgroundColor = "#ffffff";
				document.getElementById("containerImg").style.display = "block";

				ChangeMenuColor("#000000");
				ChangeColorHomeAndClose();
				DeleteActiveClass();
				document.getElementById("diseñoItem").classList.add("active-w");

				const ChangeDiseñoS20 = function () {
					document.getElementById("dotDiv1").style.display = "none";
					document.getElementById("dotDiv2").style.display = "none";
					document.getElementById("dotDiv3").style.display = "none";
					document.getElementById("dotDiv4").style.display = "none";
					document.getElementById("dotDiv5").style.display = "flex";
					document.getElementById("dotDiv6").style.display = "none";
					document.getElementById("dotDiv7").style.display = "none";
					document.getElementById("dotDiv8").style.display = "none";

					document.getElementById("btnDestacadoDiv").style.display = "none";

					ChangeColorSwitch("#000000", "#ffffff", "#000000");
					document.getElementById("img-src").src = base_url + "/assets/bg-diseño-1-mobil.png";
					document.getElementById("diseño-1").click();

					document.getElementById("diseño-1").addEventListener("click", () => {
						document.getElementById("img-src").src = base_url + "/assets/bg-diseño-1-mobil.png";
						document.getElementById("diseño-1").style.backgroundColor = "grey";
						document.getElementById("diseño-2").style.backgroundColor = "lightgrey";
					});
					document.getElementById("diseño-2").addEventListener("click", () => {
						document.getElementById("img-src").src = base_url + "/assets/bg-diseño-3-mobil.png";
						document.getElementById("diseño-1").style.backgroundColor = "lightgrey";
						document.getElementById("diseño-2").style.backgroundColor = "grey";
					});
				};

				const ChangeDiseñoS20Ultra = function () {
					document.getElementById("dotDiv1").style.display = "none";
					document.getElementById("dotDiv2").style.display = "none";
					document.getElementById("dotDiv3").style.display = "none";
					document.getElementById("dotDiv4").style.display = "none";
					document.getElementById("dotDiv5").style.display = "none";
					document.getElementById("dotDiv6").style.display = "flex";
					document.getElementById("dotDiv7").style.display = "none";
					document.getElementById("dotDiv8").style.display = "none";

					document.getElementById("btnDestacadoDiv").style.display = "none";

					ChangeColorSwitch("#ffffff", "#000000", "#000000");
					document.getElementById("img-src").src = base_url + "/assets/bg-diseño-2-mobil.png";
					document.getElementById("diseño-1-plus").click();

					document.getElementById("diseño-1-plus").addEventListener("click", () => {
						document.getElementById("img-src").src = base_url + "/assets/bg-diseño-2-mobil.png";
						document.getElementById("diseño-1-plus").style.backgroundColor = "grey";
						document.getElementById("diseño-2-plus").style.backgroundColor = "lightgrey";
					});
					document.getElementById("diseño-2-plus").addEventListener("click", () => {
						document.getElementById("img-src").src = base_url + "/assets/bg-diseño-3-mobil.png";
						document.getElementById("diseño-1-plus").style.backgroundColor = "lightgrey";
						document.getElementById("diseño-2-plus").style.backgroundColor = "grey";
					});
				};

				if (modelActive === 1) {
					ChangeDiseñoS20();
				} else {
					ChangeDiseñoS20Ultra();
				}
			};

			const rendimientoFunc = () => {
				isHome = false;
				menuActive = "rendimiento";
				document.getElementById("fluid_video_wrapper_video-id").style.display = "none";
				document.getElementById("video-id").pause();
				document.getElementById("wrapper").style.backgroundImage = "none";
				document.getElementById("wrapper").style.backgroundColor = "#ffffff";
				document.getElementById("containerImg").style.display = "block";

				ChangeMenuColor("#000000");
				ChangeColorHomeAndClose();
				DeleteActiveClass();
				document.getElementById("rendimientoItem").classList.add("active-w");

				const ChangeRendimientoS20 = function () {
					document.getElementById("dotDiv1").style.display = "none";
					document.getElementById("dotDiv2").style.display = "none";
					document.getElementById("dotDiv3").style.display = "none";
					document.getElementById("dotDiv4").style.display = "none";
					document.getElementById("dotDiv5").style.display = "none";
					document.getElementById("dotDiv6").style.display = "none";
					document.getElementById("dotDiv7").style.display = "flex";
					document.getElementById("dotDiv8").style.display = "none";

					document.getElementById("btnDestacadoDiv").style.display = "none";
					ChangeColorSwitch("#000000", "#ffffff", "#000000");
					document.getElementById("img-src").src = base_url + "/assets/bg-rendimiento-1-mobil.png";
					document.getElementById("rendimiento-1").click();

					document.getElementById("rendimiento-1").addEventListener("click", () => {
						document.getElementById("img-src").src = base_url + "/assets/bg-rendimiento-1-mobil.png";
						document.getElementById("rendimiento-1").style.backgroundColor = "grey";
						document.getElementById("rendimiento-2").style.backgroundColor = "lightgrey";
					});
					document.getElementById("rendimiento-2").addEventListener("click", () => {
						document.getElementById("img-src").src = base_url + "/assets/bg-rendimiento-2-mobil.png";
						document.getElementById("rendimiento-1").style.backgroundColor = "lightgrey";
						document.getElementById("rendimiento-2").style.backgroundColor = "grey";
					});
				};

				const ChangeRendimientoS20Ultra = function () {
					document.getElementById("dotDiv1").style.display = "none";
					document.getElementById("dotDiv2").style.display = "none";
					document.getElementById("dotDiv3").style.display = "none";
					document.getElementById("dotDiv4").style.display = "none";
					document.getElementById("dotDiv5").style.display = "none";
					document.getElementById("dotDiv6").style.display = "none";
					document.getElementById("dotDiv7").style.display = "none";
					document.getElementById("dotDiv8").style.display = "flex";

					document.getElementById("btnDestacadoDiv").style.display = "none";
					ChangeColorSwitch("#ffffff", "#000000", "#000000");
					document.getElementById("img-src").src = base_url + "/assets/bg-rendimiento-1-mobil.png";
					document.getElementById("rendimiento-1-plus").click();

					document.getElementById("rendimiento-1-plus").addEventListener("click", () => {
						document.getElementById("img-src").src = base_url + "/assets/bg-rendimiento-1-mobil.png";
						document.getElementById("rendimiento-1-plus").style.backgroundColor = "grey";
						document.getElementById("rendimiento-2-plus").style.backgroundColor = "lightgrey";
					});
					document.getElementById("rendimiento-2-plus").addEventListener("click", () => {
						document.getElementById("img-src").src = base_url + "/assets/bg-rendimiento-2-mobil.png";
						document.getElementById("rendimiento-1-plus").style.backgroundColor = "lightgrey";
						document.getElementById("rendimiento-2-plus").style.backgroundColor = "grey";
					});
				};

				if (modelActive === 1) {
					ChangeRendimientoS20();
				} else {
					ChangeRendimientoS20Ultra();
				}
			};
			/* listeners */

			document.getElementById("homeItem").addEventListener("click", homeFunc);

			document.getElementById("destacadosItem").addEventListener("click", destacadosFunc);

			document.getElementById("camaraItem").addEventListener("click", camaraFunc);

			document.getElementById("diseñoItem").addEventListener("click", designFunc);

			document.getElementById("rendimientoItem").addEventListener("click", rendimientoFunc);

			closeButton.addEventListener("click", function () {
				removeIfExists(["header", "switch-div", "menu", "containerImg"]);
				document.getElementById("fluid_video_wrapper_video-id").style.display = "block";

				document.getElementById("player").style.cssText = "width:100%;height:100%;";
				document.getElementById("wrapper").style.cssText = "width: 100%;margin-top: 10px;";
				document.getElementById("container").style.padding = "0px 10px";
				document.getElementById("video-id").pause();

				document.getElementById("video-id_fluid_controls_container").style.display = "none";
				document.getElementById("video-id_fluid_initial_play").style.cssText = "cursor:none;display:none";

				makeUnmuteButton();

				makePaper();
			});

			document.getElementById("homeItem").click();
			// efecto achicarse
			player.style.height = "100%";
			player.style.height = "230px";
		}
	};

	var makeUnmuteButton = function () {
		if (document.getElementById("unmuteButton")) {
			document.getElementById("unmuteButton").style.opacity = "1";
			return;
		}
		var unmuteButton = document.createElement("div");
		unmuteButton.style.cssText = "position: absolute;top: 200px;width: 100%;text-align: center;display: block;";
		unmuteButton.innerHTML = '<img src="' + base_url + '/assets/unmute.png" width="80px">';
		unmuteButton.id = "unmuteButton";

		document.getElementById("player").appendChild(unmuteButton);

		unmuteButton.addEventListener("click", tapOnVideo);
	};

	var makePaper = function () {
		if (document.getElementById("paper")) {
			document.getElementById("paper").style.opacity = "1";
			return;
		}
		var paper = document.createElement("img");
		paper.src = base_url + "/assets/paper.png";
		paper.style.cssText = "position: absolute;bottom: 0px;right: 0px;z-index: 99;cursor:pointer;width: 120px;";
		paper.id = "paper";

		paper.addEventListener("click", tapOnVideo);

		document.getElementById("player").appendChild(paper);
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
		fullscreen.style.cssText = hide;
		var theatre = document.getElementById("video-id_fluid_control_theatre");
		theatre.style.cssText = hide;
		var progress = document.getElementById("video-id_fluid_control_duration");
		progress.style.cssText = hide;
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
				document.getElementById("video-id_fluid_initial_play").style.cssText = "cursor:none;display:none";

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
			document.getElementById("video-id_fluid_initial_play").style.cssText = "display:block;background:#fff";
		}
	});

	document.getElementById("player").addEventListener("transitionend", function (event) {
		document.getElementById("player").style.cssText = "position:absolute;top:118px;";
		if (document.getElementById("wrapper").style.height === "100%") {
			document.getElementById("video-id_fluid_controls_container").style.display = "block";
		}
	});
};

(function () {
	"use strict";

	var module = {
		options: [],
		header: [navigator.platform, navigator.userAgent, navigator.appVersion, navigator.vendor, window.opera],
		dataos: [
			{ name: "Windows Phone", value: "Windows Phone", version: "OS" },
			{ name: "Windows", value: "Win", version: "NT" },
			{ name: "iPhone", value: "iPhone", version: "OS" },
			{ name: "iPad", value: "iPad", version: "OS" },
			{ name: "Kindle", value: "Silk", version: "Silk" },
			{ name: "Android", value: "Android", version: "Android" },
			{ name: "PlayBook", value: "PlayBook", version: "OS" },
			{ name: "BlackBerry", value: "BlackBerry", version: "/" },
			{ name: "Macintosh", value: "Mac", version: "OS X" },
			{ name: "Linux", value: "Linux", version: "rv" },
			{ name: "Palm", value: "Palm", version: "PalmOS" }
		],
		databrowser: [
			{ name: "Chrome", value: "Chrome", version: "Chrome" },
			{ name: "Firefox", value: "Firefox", version: "Firefox" },
			{ name: "Safari", value: "Safari", version: "Version" },
			{ name: "Internet Explorer", value: "MSIE", version: "MSIE" },
			{ name: "Opera", value: "Opera", version: "Opera" },
			{ name: "BlackBerry", value: "CLDC", version: "CLDC" },
			{ name: "Mozilla", value: "Mozilla", version: "Mozilla" }
		],
		init: function () {
			var agent = this.header.join(" "),
				os = this.matchItem(agent, this.dataos),
				browser = this.matchItem(agent, this.databrowser);

			return { os: os, browser: browser };
		},
		matchItem: function (string, data) {
			var i = 0,
				j = 0,
				html = "",
				regex,
				regexv,
				match,
				matches,
				version;

			for (i = 0; i < data.length; i += 1) {
				regex = new RegExp(data[i].value, "i");
				match = regex.test(string);
				if (match) {
					regexv = new RegExp(data[i].version + "[- /:;]([\\d._]+)", "i");
					matches = string.match(regexv);
					version = "";
					if (matches) {
						if (matches[1]) {
							matches = matches[1];
						}
					}
					if (matches) {
						matches = matches.split(/[._]+/);
						for (j = 0; j < matches.length; j += 1) {
							if (j === 0) {
								version += matches[j] + ".";
							} else {
								version += matches[j];
							}
						}
					} else {
						version = "0";
					}
					return {
						name: data[i].name,
						version: parseFloat(version)
					};
				}
			}
			return { name: "unknown", version: 0 };
		}
	};

	var e = module.init(),
		debug = "";

	debug = e.os.name;

	if (debug === "Windows" || "Macintosh" || "Linux" || "PlayBook" || "iPad" || "Kindle") {
		console.log("soy una pc");
		desktop();
	} else {
		mobile();
	}
})();
