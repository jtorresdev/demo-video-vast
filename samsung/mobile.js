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

		document.getElementById("video-id").style.background = "transparent";

		var wrapper = document.getElementById("wrapper");
		var player = document.getElementById("player");
		var header = document.createElement("div");
		var closeButton = document.createElement("img");
		var menu = document.createElement("div");

		var wrapperSwitch = document.createElement('div');
		var containerImg = document.createElement('div');

		menu.style = "position:absolute;width:100%;display:flex;top:76px;justify-content:center;z-index:1;";
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

		document.getElementById("paper").remove();

		closeButton.style = "float:right;width:10px;height:10px;margin:5px;cursor: pointer;";
		closeButton.id = "closeButton";
		closeButton.src = base_url + "/assets/close.png";

		header.id = "header";
		header.style = "width:100%;height:25px;text-align: center;";

		wrapper.style =
			`position: fixed;background-image: url(${base_url}/assets/background-mobile.png);height: 100%;top: 0px;background-size: 85%;background-repeat: no-repeat;background-position:bottom;width: 100%;background-color: black;left: 0;z-index: 999999999;`;
		wrapperSwitch.style = 'width:100%;position:absolute;top:25px;height:41px;z-index:1;';
		wrapperSwitch.id = 'switch-div';
		wrapperSwitch.innerHTML = `
		<div id="wrapper-switch" style="display:flex; width:70%;margin:auto;border:solid 1px #ffffff; border-radius:5px;">
			<label id="sw-s20" style="height:40px;width:50%;background-color:white;border-radius:4px 0 0 4px;"><img src="${base_url}/assets/switch-1-mobil.png" style="width:20px;position:relative;top:3px;left:6px;"/> <span id="sw-text-s20" style="color:#000000;position:relative;bottom:12px;left:10px;font-family:Samsung Sharp Sans;font-size:9px;">Galaxy S20 | S20+</span></label>		
			<label id="sw-s20-ultra" style="height:40px;width:50%;background-color:#000000;border-radius:0 4px 4px 0;"><img src="${base_url}/assets/switch-2-mobil.png" style="width:20px;position:relative;top:6px;left:6px;"/> <span id="sw-text-s20-ultra" style="color:#ffffff;position:relative;bottom:6px;left:10px;font-family:Samsung Sharp Sans;font-size:9px;">Galaxy S20 Ultra</span></label>
		</div>`;

		containerImg.style = 'position:absolute;top:25px;display:none;height:max-content;padding-bottom:5%;'
		containerImg.id = 'containerImg';
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
			if (document.getElementsByClassName('active').length > 0) {
				document.getElementsByClassName('active')[0].classList.remove('active');
			}
			if (document.getElementsByClassName('active-w').length > 0) {
				document.getElementsByClassName('active-w')[0].classList.remove('active-w');
			}
		}

		function ChangeColorSwitch(color1, color2, color3) {
			document.getElementById('wrapper-switch').style.border = '1px solid' + color3;
			document.getElementById('sw-s20').style.backgroundColor = color1;
			document.getElementById('sw-text-s20').style.color = color2;
			document.getElementById('sw-s20-ultra').style.backgroundColor = color2;
			document.getElementById('sw-text-s20-ultra').style.color = color1;
		}

		function ChangeMenuColor(color) {
			var menu = document.querySelectorAll('a');
			menu.forEach(opcion => {
				opcion.style.color = color;
			});
		}

		function ChangeColorHomeAndClose() {
			document.getElementById('img-home').setAttribute('src', base_url + "/assets/home-black.png");
			document.getElementById('closeButton').setAttribute('src', base_url + "/assets/close-w.png");
		}

		document.getElementById('homeItem').addEventListener('click', () => {
			ChangeColorSwitch('#ffffff', '#000000', '#ffffff');
			ChangeMenuColor('#ffffff');
			document.getElementById('img-home').setAttribute('src', base_url + "/assets/home-white.png");
			document.getElementById('closeButton').setAttribute('src', base_url + "/assets/close.png");
			DeleteActiveClass();
			document.getElementById('homeItem').classList.add('active');

			document.getElementById('containerImg').style.display = 'none';
			document.getElementById('fluid_video_wrapper_video-id').style.display = 'block';
			document.getElementById('wrapper').style.backgroundImage = `url(${base_url}/assets/background-mobile.png)`;
			document.getElementById('wrapper').style.backgroundColor = '#000000';

			document.getElementById('sw-s20').addEventListener('click', () => {
				ChangeColorSwitch('#ffffff', '#000000', '#ffffff');
			});

			document.getElementById('sw-s20-ultra').addEventListener('click', () => {
				ChangeColorSwitch('#000000', '#ffffff', '#ffffff');
			});
		});

		document.getElementById('destacadosItem').addEventListener('click', () => {
			document.getElementById('fluid_video_wrapper_video-id').style.display = 'none';
			document.getElementById("video-id").pause();
			document.getElementById('wrapper').style.backgroundImage = 'none';
			document.getElementById('wrapper').style.backgroundColor = '#ffffff';
			document.getElementById('containerImg').style.display = 'block';

			ChangeMenuColor('#000000');
			ChangeColorHomeAndClose();
			DeleteActiveClass();
			document.getElementById('destacadosItem').classList.add('active-w');

			const ChangeDestacadosS20 = function () {
				document.getElementById('dotDiv1').style.display = 'flex';
				document.getElementById('dotDiv2').style.display = 'none';
				document.getElementById('dotDiv3').style.display = 'none';
				document.getElementById('dotDiv4').style.display = 'none';
				document.getElementById('dotDiv5').style.display = 'none';
				document.getElementById('dotDiv6').style.display = 'none';
				document.getElementById('dotDiv7').style.display = 'none';
				document.getElementById('dotDiv8').style.display = 'none';

				document.getElementById('btnDestacadoDiv').style.display = 'flex';
				document.getElementById('btn-destacado-s20').style.display = 'flex';
				document.getElementById('btn-destacado-s20-plus').style.display = 'flex';

				ChangeColorSwitch('#000000', '#ffffff', '#000000');
				document.getElementById('img-src').src = base_url + '/assets/bg-destacados-1-mobil.png';
				document.getElementById('destacado-1').click();

				document.getElementById('destacado-1').addEventListener('click', () => {
					document.getElementById('btnDestacadoDiv').style.display = 'flex';
					document.getElementById('img-src').src = base_url + '/assets/bg-destacados-1-mobil.png';
					document.getElementById('destacado-1').style.backgroundColor = 'grey';
					document.getElementById('destacado-2').style.backgroundColor = 'lightgrey';
					document.getElementById('destacado-3').style.backgroundColor = 'lightgrey';
					document.getElementById('dotDiv1').style.margin = '50px auto';

				});
				document.getElementById('destacado-2').addEventListener('click', () => {
					document.getElementById('btnDestacadoDiv').style.display = 'none';
					document.getElementById('img-src').src = base_url + '/assets/bg-destacados-3-mobil.png';
					document.getElementById('destacado-1').style.backgroundColor = 'lightgrey';
					document.getElementById('destacado-2').style.backgroundColor = 'grey';
					document.getElementById('destacado-3').style.backgroundColor = 'lightgrey';
					document.getElementById('dotDiv1').style.margin = '70px auto';
				});

				document.getElementById('destacado-3').addEventListener('click', () => {
					document.getElementById('btnDestacadoDiv').style.display = 'none';
					document.getElementById('img-src').src = base_url + '/assets/bg-destacados-4-mobil.png';
					document.getElementById('destacado-1').style.backgroundColor = 'lightgrey';
					document.getElementById('destacado-2').style.backgroundColor = 'lightgrey';
					document.getElementById('destacado-3').style.backgroundColor = 'grey';
					document.getElementById('dotDiv1').style.margin = '25px auto';
				});

				document.getElementById('btn-destacado-s20').addEventListener('click', () => {
					document.getElementById('btn-destacado-s20').style.color = 'black';
					document.getElementById('btn-destacado-s20').style.borderColor = 'black';
					document.getElementById('btn-destacado-s20-plus').style.color = '#a3a3a3';
					document.getElementById('btn-destacado-s20-plus').style.borderColor = '#a3a3a3';
					document.getElementById('img-src').src = base_url + '/assets/bg-destacados-1-mobil.png';

				});

				document.getElementById('btn-destacado-s20-plus').addEventListener('click', () => {
					document.getElementById('btn-destacado-s20').style.color = '#a3a3a3';
					document.getElementById('btn-destacado-s20').style.borderColor = '#a3a3a3';
					document.getElementById('btn-destacado-s20-plus').style.color = 'black';
					document.getElementById('btn-destacado-s20-plus').style.borderColor = 'black';
					document.getElementById('img-src').src = base_url + '/assets/bg-destacados-2-mobil.png';
				});
			}

			const ChangeDestacadosS20Ultra = function () {
				document.getElementById('dotDiv1').style.display = 'none';
				document.getElementById('dotDiv2').style.display = 'flex';
				document.getElementById('dotDiv3').style.display = 'none';
				document.getElementById('dotDiv4').style.display = 'none';
				document.getElementById('dotDiv5').style.display = 'none';
				document.getElementById('dotDiv6').style.display = 'none';
				document.getElementById('dotDiv7').style.display = 'none';
				document.getElementById('dotDiv8').style.display = 'none';

				document.getElementById('btnDestacadoDiv').style.display = 'none';
				document.getElementById('btn-destacado-s20').style.display = 'none';
				document.getElementById('btn-destacado-s20-plus').style.display = 'none';

				ChangeColorSwitch('#ffffff', '#000000', '#000000');
				document.getElementById('img-src').src = base_url + '/assets/bg-destacados-5-mobil.png';
				document.getElementById('destacado-1-plus').click();

				document.getElementById('destacado-1-plus').addEventListener('click', () => {
					// document.getElementById('btnDestacadoDiv').style.display = 'flex';
					document.getElementById('img-src').src = base_url + '/assets/bg-destacados-5-mobil.png';
					document.getElementById('destacado-1-plus').style.backgroundColor = 'grey';
					document.getElementById('destacado-2-plus').style.backgroundColor = 'lightgrey';
					document.getElementById('destacado-3-plus').style.backgroundColor = 'lightgrey';
					document.getElementById('dotDiv2').style.margin = '50px auto';

				});
				document.getElementById('destacado-2-plus').addEventListener('click', () => {
					// document.getElementById('btnDestacadoDiv').style.display = 'none';
					document.getElementById('img-src').src = base_url + '/assets/bg-destacados-3-mobil.png';
					document.getElementById('destacado-1-plus').style.backgroundColor = 'lightgrey';
					document.getElementById('destacado-2-plus').style.backgroundColor = 'grey';
					document.getElementById('destacado-3-plus').style.backgroundColor = 'lightgrey';
					document.getElementById('dotDiv2').style.margin = '70px auto';
				});

				document.getElementById('destacado-3-plus').addEventListener('click', () => {
					// document.getElementById('btnDestacadoDiv').style.display = 'none';
					document.getElementById('img-src').src = base_url + '/assets/bg-destacados-4-mobil.png';
					document.getElementById('destacado-1-plus').style.backgroundColor = 'lightgrey';
					document.getElementById('destacado-2-plus').style.backgroundColor = 'lightgrey';
					document.getElementById('destacado-3-plus').style.backgroundColor = 'grey';
					document.getElementById('dotDiv2').style.margin = '25px auto';
				});
			}

			document.getElementById('sw-s20').addEventListener('click', () => {
				ChangeDestacadosS20();
			});

			document.getElementById('sw-s20-ultra').addEventListener('click', () => {
				ChangeDestacadosS20Ultra();
			});

			ChangeDestacadosS20();
		});

		document.getElementById('camaraItem').addEventListener('click', () => {
			document.getElementById('fluid_video_wrapper_video-id').style.display = 'none';
			document.getElementById("video-id").pause();
			document.getElementById('wrapper').style.backgroundImage = 'none';
			document.getElementById('wrapper').style.backgroundColor = '#ffffff';
			document.getElementById('containerImg').style.display = 'block';

			ChangeMenuColor('#000000');
			ChangeColorHomeAndClose();
			DeleteActiveClass();
			document.getElementById('camaraItem').classList.add('active-w');

			const ChangeCamaraS20 = function () {
				document.getElementById('dotDiv1').style.display = 'none';
				document.getElementById('dotDiv2').style.display = 'none';
				document.getElementById('dotDiv3').style.display = 'flex';
				document.getElementById('dotDiv4').style.display = 'none';
				document.getElementById('dotDiv5').style.display = 'none';
				document.getElementById('dotDiv6').style.display = 'none';
				document.getElementById('dotDiv7').style.display = 'none';
				document.getElementById('dotDiv8').style.display = 'none';

				document.getElementById('btnDestacadoDiv').style.display = 'none';

				ChangeColorSwitch('#000000', '#ffffff', '#000000');
				document.getElementById('img-src').src = base_url + '/assets/bg-camara-1-mobil.png';
				document.getElementById('camara-1').click();

				document.getElementById('camara-1').addEventListener('click', () => {
					document.getElementById('img-src').src = base_url + '/assets/bg-camara-1-mobil.png';
					document.getElementById('camara-1').style.backgroundColor = 'grey';
					document.getElementById('camara-2').style.backgroundColor = 'lightgrey';
					document.getElementById('camara-3').style.backgroundColor = 'lightgrey';
				});
				document.getElementById('camara-2').addEventListener('click', () => {
					document.getElementById('img-src').src = base_url + '/assets/bg-camara-3-mobil.png';
					document.getElementById('camara-1').style.backgroundColor = 'lightgrey';
					document.getElementById('camara-2').style.backgroundColor = 'grey';
					document.getElementById('camara-3').style.backgroundColor = 'lightgrey';
				});
				document.getElementById('camara-3').addEventListener('click', () => {
					document.getElementById('img-src').src = base_url + '/assets/bg-camara-5-mobil.png';
					document.getElementById('camara-1').style.backgroundColor = 'lightgrey';
					document.getElementById('camara-2').style.backgroundColor = 'lightgrey';
					document.getElementById('camara-3').style.backgroundColor = 'grey';
				});
			}

			const ChangeCamaraS20Ultra = function () {
				document.getElementById('dotDiv1').style.display = 'none';
				document.getElementById('dotDiv2').style.display = 'none';
				document.getElementById('dotDiv3').style.display = 'none';
				document.getElementById('dotDiv4').style.display = 'flex';
				document.getElementById('dotDiv5').style.display = 'none';
				document.getElementById('dotDiv6').style.display = 'none';
				document.getElementById('dotDiv7').style.display = 'none';
				document.getElementById('dotDiv8').style.display = 'none';

				document.getElementById('btnDestacadoDiv').style.display = 'none';

				ChangeColorSwitch('#ffffff', '#000000', '#000000');
				document.getElementById('img-src').src = base_url + '/assets/bg-camara-2-mobil.png';

				document.getElementById('camara-1-plus').click();

				document.getElementById('camara-1-plus').addEventListener('click', () => {
					document.getElementById('img-src').src = base_url + '/assets/bg-camara-2-mobil.png';
					document.getElementById('camara-1-plus').style.backgroundColor = 'grey';
					document.getElementById('camara-2-plus').style.backgroundColor = 'lightgrey';
					document.getElementById('camara-3-plus').style.backgroundColor = 'lightgrey';
				});
				document.getElementById('camara-2-plus').addEventListener('click', () => {
					document.getElementById('img-src').src = base_url + '/assets/bg-camara-4-mobil.png';
					document.getElementById('camara-1-plus').style.backgroundColor = 'lightgrey';
					document.getElementById('camara-2-plus').style.backgroundColor = 'grey';
					document.getElementById('camara-3-plus').style.backgroundColor = 'lightgrey';
				});
				document.getElementById('camara-3-plus').addEventListener('click', () => {
					document.getElementById('img-src').src = base_url + '/assets/bg-camara-5-mobil.png';
					document.getElementById('camara-1-plus').style.backgroundColor = 'lightgrey';
					document.getElementById('camara-2-plus').style.backgroundColor = 'lightgrey';
					document.getElementById('camara-3-plus').style.backgroundColor = 'grey';
				});
			}

			document.getElementById('sw-s20').addEventListener('click', () => {
				ChangeCamaraS20();
			});

			document.getElementById('sw-s20-ultra').addEventListener('click', () => {
				ChangeCamaraS20Ultra();
			});

			ChangeCamaraS20();
		});

		document.getElementById('diseñoItem').addEventListener('click', () => {
			document.getElementById('fluid_video_wrapper_video-id').style.display = 'none';
			document.getElementById("video-id").pause();
			document.getElementById('wrapper').style.backgroundImage = 'none';
			document.getElementById('wrapper').style.backgroundColor = '#ffffff';
			document.getElementById('containerImg').style.display = 'block';

			ChangeMenuColor('#000000');
			ChangeColorHomeAndClose();
			DeleteActiveClass();
			document.getElementById('diseñoItem').classList.add('active-w');

			const ChangeDiseñoS20 = function () {
				document.getElementById('dotDiv1').style.display = 'none';
				document.getElementById('dotDiv2').style.display = 'none';
				document.getElementById('dotDiv3').style.display = 'none';
				document.getElementById('dotDiv4').style.display = 'none';
				document.getElementById('dotDiv5').style.display = 'flex';
				document.getElementById('dotDiv6').style.display = 'none';
				document.getElementById('dotDiv7').style.display = 'none';
				document.getElementById('dotDiv8').style.display = 'none';

				document.getElementById('btnDestacadoDiv').style.display = 'none';

				ChangeColorSwitch('#000000', '#ffffff', '#000000');
				document.getElementById('img-src').src = base_url + '/assets/bg-diseño-1-mobil.png';
				document.getElementById('diseño-1').click();

				document.getElementById('diseño-1').addEventListener('click', () => {
					document.getElementById('img-src').src = base_url + '/assets/bg-diseño-1-mobil.png';
					document.getElementById('diseño-1').style.backgroundColor = 'grey';
					document.getElementById('diseño-2').style.backgroundColor = 'lightgrey';
				});
				document.getElementById('diseño-2').addEventListener('click', () => {
					document.getElementById('img-src').src = base_url + '/assets/bg-diseño-3-mobil.png';
					document.getElementById('diseño-1').style.backgroundColor = 'lightgrey';
					document.getElementById('diseño-2').style.backgroundColor = 'grey';
				});
			}

			const ChangeDiseñoS20Ultra = function () {
				document.getElementById('dotDiv1').style.display = 'none';
				document.getElementById('dotDiv2').style.display = 'none';
				document.getElementById('dotDiv3').style.display = 'none';
				document.getElementById('dotDiv4').style.display = 'none';
				document.getElementById('dotDiv5').style.display = 'none';
				document.getElementById('dotDiv6').style.display = 'flex';
				document.getElementById('dotDiv7').style.display = 'none';
				document.getElementById('dotDiv8').style.display = 'none';

				document.getElementById('btnDestacadoDiv').style.display = 'none';

				ChangeColorSwitch('#ffffff', '#000000', '#000000');
				document.getElementById('img-src').src = base_url + '/assets/bg-diseño-2-mobil.png';
				document.getElementById('diseño-1-plus').click();

				document.getElementById('diseño-1-plus').addEventListener('click', () => {
					document.getElementById('img-src').src = base_url + '/assets/bg-diseño-2-mobil.png';
					document.getElementById('diseño-1-plus').style.backgroundColor = 'grey';
					document.getElementById('diseño-2-plus').style.backgroundColor = 'lightgrey';
				});
				document.getElementById('diseño-2-plus').addEventListener('click', () => {
					document.getElementById('img-src').src = base_url + '/assets/bg-diseño-3-mobil.png';
					document.getElementById('diseño-1-plus').style.backgroundColor = 'lightgrey';
					document.getElementById('diseño-2-plus').style.backgroundColor = 'grey';
				});
			}

			document.getElementById('sw-s20').addEventListener('click', () => {
				ChangeDiseñoS20();
			});

			document.getElementById('sw-s20-ultra').addEventListener('click', () => {
				ChangeDiseñoS20Ultra();
			});

			ChangeDiseñoS20();
		});

		document.getElementById('rendimientoItem').addEventListener('click', () => {
			document.getElementById('fluid_video_wrapper_video-id').style.display = 'none';
			document.getElementById("video-id").pause();
			document.getElementById('wrapper').style.backgroundImage = 'none';
			document.getElementById('wrapper').style.backgroundColor = '#ffffff';
			document.getElementById('containerImg').style.display = 'block';

			ChangeMenuColor('#000000');
			ChangeColorHomeAndClose();
			DeleteActiveClass();
			document.getElementById('rendimientoItem').classList.add('active-w');

			const ChangeRendimientoS20 = function () {
				document.getElementById('dotDiv1').style.display = 'none';
				document.getElementById('dotDiv2').style.display = 'none';
				document.getElementById('dotDiv3').style.display = 'none';
				document.getElementById('dotDiv4').style.display = 'none';
				document.getElementById('dotDiv5').style.display = 'none';
				document.getElementById('dotDiv6').style.display = 'none';
				document.getElementById('dotDiv7').style.display = 'flex';
				document.getElementById('dotDiv8').style.display = 'none';

				document.getElementById('btnDestacadoDiv').style.display = 'none';
				ChangeColorSwitch('#000000', '#ffffff', '#000000');
				document.getElementById('img-src').src = base_url + '/assets/bg-rendimiento-1-mobil.png';
				document.getElementById('rendimiento-1').click();

				document.getElementById('rendimiento-1').addEventListener('click', () => {
					document.getElementById('img-src').src = base_url + '/assets/bg-rendimiento-1-mobil.png';
					document.getElementById('rendimiento-1').style.backgroundColor = 'grey';
					document.getElementById('rendimiento-2').style.backgroundColor = 'lightgrey';
				});
				document.getElementById('rendimiento-2').addEventListener('click', () => {
					document.getElementById('img-src').src = base_url + '/assets/bg-rendimiento-2-mobil.png';
					document.getElementById('rendimiento-1').style.backgroundColor = 'lightgrey';
					document.getElementById('rendimiento-2').style.backgroundColor = 'grey';
				});
			}

			const ChangeRendimientoS20Ultra = function () {
				document.getElementById('dotDiv1').style.display = 'none';
				document.getElementById('dotDiv2').style.display = 'none';
				document.getElementById('dotDiv3').style.display = 'none';
				document.getElementById('dotDiv4').style.display = 'none';
				document.getElementById('dotDiv5').style.display = 'none';
				document.getElementById('dotDiv6').style.display = 'none';
				document.getElementById('dotDiv7').style.display = 'none';
				document.getElementById('dotDiv8').style.display = 'flex';

				document.getElementById('btnDestacadoDiv').style.display = 'none';
				ChangeColorSwitch('#ffffff', '#000000', '#000000');
				document.getElementById('img-src').src = base_url + '/assets/bg-rendimiento-1-mobil.png';
				document.getElementById('rendimiento-1-plus').click();

				document.getElementById('rendimiento-1-plus').addEventListener('click', () => {
					document.getElementById('img-src').src = base_url + '/assets/bg-rendimiento-1-mobil.png';
					document.getElementById('rendimiento-1-plus').style.backgroundColor = 'grey';
					document.getElementById('rendimiento-2-plus').style.backgroundColor = 'lightgrey';
				});
				document.getElementById('rendimiento-2-plus').addEventListener('click', () => {
					document.getElementById('img-src').src = base_url + '/assets/bg-rendimiento-2-mobil.png';
					document.getElementById('rendimiento-1-plus').style.backgroundColor = 'lightgrey';
					document.getElementById('rendimiento-2-plus').style.backgroundColor = 'grey';
				});
			}

			document.getElementById('sw-s20').addEventListener('click', () => {
				ChangeRendimientoS20();
			});

			document.getElementById('sw-s20-ultra').addEventListener('click', () => {
				ChangeRendimientoS20Ultra();
			});
			ChangeRendimientoS20();
		});

		closeButton.addEventListener("click", function () {
			removeIfExists(['header', 'switch-div', 'menu', 'containerImg']);
			document.getElementById("fluid_video_wrapper_video-id").style.display = "block";

			document.getElementById("player").style = "width:100%;height:100%;";
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
		noop = function () { },
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
	document.getElementById('player').style = 'position:absolute;top:118px;';
	if (document.getElementById("wrapper").style.height === "100%") {
		document.getElementById("video-id_fluid_controls_container").style.display = "block";
	}
});
