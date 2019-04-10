function getParamValue(paramName) {
	var url = window.location.search.substring(1); //get rid of "?" in querystring
	var qArray = url.split('&'); //get key-value pairs
	for (var i = 0; i < qArray.length; i++) {
		var pArr = qArray[i].split('='); //split key and value
		if (pArr[0] == paramName)
			return pArr[1]; //return value
	}
}

var firstPlay = true;

var width = document.currentScript.getAttribute('playerWidth')||'800px';
var height = parseInt(width.replace('px', '')) * 0.5625 + 'px';
var fontSize = document.currentScript.getAttribute('fontSize')||'16px';
var newWidth = document.currentScript.getAttribute('shortPlayerWidth')||'450px';
var newHeight = parseInt(newWidth.replace('px', '')) * 0.5625 + 'px';

var marginTop = '60px';
var marginRight = '10px';

var base_url = "https://jtorresdev.github.io/demo-video-vast/strangerthings"
//var base_url = "./"

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
	removeIfExists([ 'saveCalendarDropdown', 'avengers_container' ]);
	document.getElementsByClassName('active')[0].classList.remove('active');
	document.getElementById('informationItem').classList.add('active');
	// si no ha terminado la transicion, vuelve al tamaño inicial
	video_wrapper.style.width = width;
	video_wrapper.style.height = height;
	video_wrapper.style.marginTop = '0px';
	video_wrapper.style.marginRight = '0px';
};

var playerIn = function() {
	removeIfExists([ 'unmuteButton' ])
	document.getElementById('paper').style.display = 'none';
	video.muteToggle('video-id', true);
	document.getElementById('video-id_fluid_controls_container').style.display = 'block';
	var video_wrapper = document.getElementById('fluid_video_wrapper_video-id');
	video_wrapper.style.width = newWidth;
	video_wrapper.style.height = newHeight;
	video_wrapper.style.marginTop = marginTop;
	video_wrapper.style.marginRight = marginRight;
};

var removeIfExists = function(ids) {
	ids.map((id) => {
		document.getElementById(id) ? document.getElementById(id).remove() : null;
	});
};

var showIfExists = function(ids){
	ids.map((id) => {
		document.getElementById(id) ? document.getElementById(id).style.display = "block" : null;
	});
}

var hideIfExists = function(ids){
	ids.map((id) => {
		document.getElementById(id) ? document.getElementById(id).style.display = 'none' : null;
	});
}

var hideControlBar = function() {
	document.getElementById('video-id_fluid_controls_container').style.display = 'none';
	document.getElementById('video-id_fluid_initial_play').style = 'cursor:none;display:none';
};

var playOnClick = function() {
	document.getElementById('video-id').addEventListener('click', function() {
		//playerIn();
	});
};

var makeUnmuteButton = function() {
	var unmuteButton = document.createElement('div');
	unmuteButton.id = "unmuteButton"
	unmuteButton.innerHTML = '<img src="'+ base_url +'/assets/unmute.png">';
	unmuteButton.style = "width: 100%;height: 100%;position: absolute;top: 0;right: 0;bottom: 0;left: 0;margin: auto;display: flex;flex-direction: column;justify-content: center;align-items: center;pointer-events: none;z-index: 999;cursor:pointer"

	wrapper.appendChild(unmuteButton)

	unmuteButton.addEventListener('click', playerIn);
};

var makePaper = function() {
	var paper = document.createElement('img');
	paper.src = ''+ base_url +'/assets/paper.png';
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
		video_wrapper.style.marginRight = marginRight;
		removeAllListener();
		removeIfExists(['unmuteButton'])
	});
	document.getElementById('fluid_video_wrapper_video-id').appendChild(paper);
};

var options = {
	layoutControls: {
		primaryColor: '#fff',
		posterImage: ''+ base_url +'/assets/poster.png',
		playButtonShowing: true,
		persistentSettings: {
			volume: false
		},
		autoPlay: false,
		mute: true,
		playerInitCallback: function() {
			hidePlayerButtons();
			hideControlBar();

			playOnClick();

			makeUnmuteButton();
			makePaper();

			// obtenemos el contenedor del reproductor
			var video_wrapper = document.getElementById('fluid_video_wrapper_video-id');

			// si el reproductor ya se achicó en el siguiente bucle mantendra el tamaño
			video_wrapper.style = 'position: absolute;width: ' + width + ';height: ' + height + ';z-index: 10;right:0px';

			// si el primer bucle, agregamos el HTML del fondo
			if (firstPlay) {
				var background = document.createElement('div');
				var bannerRight = document.createElement('div');
				var logoTop = document.createElement('img');
				var date = document.createElement('img');
				var powered = document.createElement('img');
				var close = document.createElement('img');
				var rrss = document.createElement('div');
				var rrss_links = document.createElement('div');
				var menu = document.createElement('div');

				background.style = "background-image:url('" + base_url + "/assets/background.png');width:" + width + ';height:' + height +';background-repeat: no-repeat;';

				logoTop.src = ''+ base_url +'/assets/logo.png';
				logoTop.style = 'float:left; margin: 20px';

				date.src = ''+ base_url +'/assets/date.png';
				date.style = 'margin-top: 20px;';

				close.src = ''+ base_url +'/assets/close.png';
				close.style = 'position:absolute;top:10px;right:10px;cursor: pointer;';
				close.id = 'closeButton';

				bannerRight.style = 'position: absolute;right: 30px;bottom: 50px;text-align: center;';

				powered.src = ''+ base_url +'/assets/powered.png';
				powered.style = 'position:absolute;bottom:10px;right:10px';

				rrss.innerHTML = '#STRANGERTHINGS3';
				rrss.style =
					'position: absolute;bottom: 20px;left: 30px;letter-spacing: 1px;color: #fff;font-family: RobotoRegular;font-size: 16px;width: 170px;text-align: center;';
				rrss.id = "rrss"

				rrssHTML = '';
				rrssHTML +=
					'<a href="https://www.facebook.com/StrangerThingsEspana/?brand_redir=1031174333634374" style="float:left" target="_blank"><img src="'+ base_url +'/assets/fb.png"/></a>';
				rrssHTML +=
					'<a href="https://twitter.com/stranger_things" style="float:left;margin: 0px 30px;" target="_blank"><img src="'+ base_url +'/assets/tw.png"/></a>';
				rrssHTML +=
					'<a href="https://www.instagram.com/strangerthingstv" style="float:left" target="_blank"><img src="'+ base_url +'/assets/ig.png"/></a>';

				rrss_links.style.marginLeft = '30px';
				rrss_links.innerHTML = rrssHTML;

				rrss.appendChild(rrss_links);
				bannerRight.appendChild(date);

				menu.style = 'float:right; margin: 10px;';

				var menuHTML = '';

				menuHTML = '<ul>';
				menuHTML += '<li class="active" id="informationItem"><a href="#">Información</a></li>';
				menuHTML += '<li id="trailersItem"><a href="#">Trailers y más</a></li>';
				menuHTML += '<li id="similarItem"><a href="#">Similares</a></li>';
				menuHTML += '</ul>';

				menu.innerHTML = menuHTML;
				menu.id = 'menu';

				var synopsis = document.createElement('div')
				synopsis.id = "synopsis"
				synopsis.style = "color: white;width: 40%;font-family: 'RobotoRegular';font-size: 15px;letter-spacing: 1px;line-height: 26px;float:left;clear:both;margin:10px 20px"

				synopsis.innerHTML = "<span>A raiz de la desaparición de un niño, un pueblo desvela un misterio relacionado con experimentos secretos, fuerzas sobrenaturales aterradoras y una niña muy extraña.</span>"

				var buttons = document.createElement('div')
				var subscribe = document.createElement('a')
				var watchNow = document.createElement('a')

				buttons.style = "float:left;clear:both;margin:20px 0"
				buttons.id = "buttons"

				subscribe.style = "border: 1px solid rgb(229, 9, 20);background: #e50914; width: 15%; text-align:center; padding: 10px 20px; color: #fff; font-family: 'RobotoMedium'; font-size: 14px; text-transform: uppercase;border-radius: 3px;margin: 10px 10px 10px 20px;text-decoration:none"
				subscribe.id = "subscribe"
				subscribe.innerText = "Subscribirse"
				subscribe.href = "https://www.netflix.com/"
				subscribe.target = '_blank'

				watchNow.style = "background: transparent; width: 15%; text-align:center; padding: 10px 20px; color: #fff; font-family: 'RobotoMedium'; font-size: 14px; text-transform: uppercase;border-radius: 3px;    margin: 10px 0px;    border: 1px solid white;text-decoration:none"
				watchNow.innerHTML = '<img src="' + base_url + '/assets/triangle.png"> Ver ahora'
				watchNow.href = "https://www.netflix.com/"
				watchNow.id = "watchnow"
				watchNow.target = '_blank'

				buttons.appendChild(subscribe)
				buttons.appendChild(watchNow)

				wrapper.appendChild(menu);
				wrapper.appendChild(rrss);
				wrapper.appendChild(logoTop);
				wrapper.appendChild(synopsis)
				wrapper.appendChild(buttons)
				wrapper.appendChild(close);
				wrapper.appendChild(powered);
				wrapper.appendChild(bannerRight);
				wrapper.appendChild(background);

				close.addEventListener('click', function() {
					document.getElementById('fluid_video_wrapper_video-id').style.display = 'block';
					document.getElementById('paper').style.display = 'block';

					playerOut();

					removeAllListener();
					document.getElementById('video-id_fluid_controls_container').style.display = 'none';
					document.getElementById('video-id_fluid_initial_play').style = 'cursor:none;display:none';
					video.pause();

					showIfExists(['synopsis', 'buttons', 'rrss'])
					hideIfExists(['buttons1', 'trailers', 'similars'])
					removeIfExists(['similars_right_arrow', 'similars_left_arrow', 'trailers_right_arrow', 'trailers_left_arrow'])

					document.getElementById('video_container').innerHTML = ""

					video_wrapper.style.display = 'block';
					bannerRight.style.display = 'block';
				});

				document.getElementById('trailersItem').addEventListener('click', function(e) {
					document.getElementById('video-id').pause();

					e.preventDefault();

					document.getElementsByClassName('active')[0].classList.remove('active');
					document.getElementById('trailersItem').classList.add('active');

					video_wrapper.style.display = 'none';
					bannerRight.style.display = 'none';

					hideIfExists(['synopsis', 'buttons', 'rrss', 'similars' ]);
					showIfExists(['buttons1'])
					removeIfExists(['similars_right_arrow', 'similars_left_arrow'])

					document.getElementById('trailers') ? document.getElementById('trailers').style.display = "inline-flex" : null

					if(!document.getElementById('buttons1')){
						var new_buttons = buttons.cloneNode(true);
						new_buttons.id = "buttons1";
						new_buttons.style = "display:block;position:absolute;bottom: 40px; left: 0"
						
						wrapper.appendChild(new_buttons)
					}

					if(!document.getElementById('rightArrow')&&!document.getElementById('leftArrow')){
						var right_arrow = document.createElement('div')
						var left_arrow = document.createElement('div')

							right_arrow.innerHTML = '<img src="'+ base_url +'/assets/right_arrow.png">'
							right_arrow.style = "position:absolute;left:15px;top: 180px;cursor:pointer"
							left_arrow.innerHTML = '<img src="'+ base_url +'/assets/left_arrow.png">'
							left_arrow.style = "position:absolute;right:15px;top: 180px;cursor:pointer"

							right_arrow.id = "trailers_right_arrow"
							left_arrow.id = "trailers_left_arrow"

							right_arrow.addEventListener('click', function(){
								document.getElementById('tra').style.marginLeft = '0px'
							})

							left_arrow.addEventListener('click', function(){
								document.getElementById('tra').style.marginLeft = '-230px'
							})

							wrapper.append(right_arrow)
							wrapper.append(left_arrow)
					}

					if (!document.getElementById('trailers')) {
						var trailers_container = document.createElement('div')
						var trailers_div = document.createElement('div')
							trailers_div.style = 'display:inline-flex;transition: all 1s ease-in-out;'
							trailers_div.id = "tra"
						var video_container = document.createElement('div')
						var thumbs = [
							{'thumb' : 'thumb1.png', 'title' : 'Stranger Things (Tráiler)', 'video' : 'video1.mp4'},
							{'thumb' : 'thumb2.png', 'title': 'Stranger Things: Temporada 3 - Anuncio de fecha de estreno', 'video' : 'video2.mp4'},
							{'thumb' : 'thumb3.png', 'title' : 'Destacado: Noah', 'video' : 'video3.mp4'},
							{'thumb' : 'thumb4.png', 'title' : 'Destacado: El mundo', 'video' : 'video4.mp4'}
						]
						thumbs.map(video => {
							var video_div = document.createElement('div')
								video_div.className = "thumbnail"
								video_div.addEventListener('click', function(){
									hideIfExists(['trailers'])
									showIfExists(['video_container'])

									var trailer_video = document.createElement('div')
										trailer_video.style = "position:absolute;width:80%;top:50px"
									
									var videoTag = document.createElement('video')
									var source = document.createElement('source')
										source.src = base_url + "/assets/videos/" + video.video
										source.type = "video/mp4"
										videoTag.style = "width: 420px;float: right;"
										videoTag.autoplay = true
										videoTag.controls = true
										videoTag.appendChild(source)
										video_container.appendChild(videoTag)

									var arrow = document.createElement('img')
										arrow.src = base_url + "/assets/arrow.png"
										arrow.style.cursor = "pointer"
									
									arrow.addEventListener('click', function(){
										document.getElementById('video_container').innerHTML = ""
										document.getElementById('trailers').style.display = "inline-flex"
									})

									video_container.appendChild(arrow)
								})
							var videoHTML = ''
								videoHTML += '<img src="' + base_url + '/assets/' + video.thumb + '"><span>' + video.title +'</span>'
								video_div.innerHTML = videoHTML
								trailers_div.append(video_div)
						})
						trailers_container.style = "display: inline-flex;position: absolute;top: 140px;left: 0px;right: 0px;margin-left: auto;margin-right: auto;width: 705px;overflow: hidden;"
						trailers_container.id = "trailers"

						video_container.id = "video_container"
						video_container.style = "position: absolute;top: 100px;left: 0;right: 0;margin: 0 auto;width: 460px;"

						trailers_container.append(trailers_div)
						wrapper.append(trailers_container)
						wrapper.append(video_container)
					}
				});

				document.getElementById('informationItem').addEventListener('click', function(e) {
					e.preventDefault();
					document.getElementsByClassName('active')[0].classList.remove('active');
					document.getElementById('informationItem').classList.add('active');

					showIfExists(['synopsis', 'buttons', 'rrss'])
					hideIfExists(['buttons1', 'trailers', 'similars'])
					removeIfExists(['similars_right_arrow', 'similars_left_arrow', 'trailers_right_arrow', 'trailers_left_arrow'])

					document.getElementById('video_container') ? document.getElementById('video_container').innerHTML = "" : null

					video_wrapper.style.display = 'block';
					bannerRight.style.display = 'block';
					
				});

				document.getElementById('similarItem').addEventListener('click', function(e) {
					e.preventDefault();

					document.getElementsByClassName('active')[0].classList.remove('active');
					document.getElementById('similarItem').classList.add('active');

					document.getElementById('video-id').pause();

					document.getElementById('video_container').innerHTML = ""

					hideIfExists(['synopsis', 'buttons', 'rrss', 'trailers', 'buttons1' ])
					removeIfExists(['trailers_right_arrow', 'trailers_left_arrow'])
					showIfExists(['similars'])

					video_wrapper.style.display = 'none';
					bannerRight.style.display = 'none';

					if(!document.getElementById('rightArrow')&&!document.getElementById('leftArrow')){
						var right_arrow = document.createElement('div')
						var left_arrow = document.createElement('div')

							right_arrow.innerHTML = '<img src="'+ base_url +'/assets/right_arrow.png">'
							right_arrow.style = "position:absolute;left:15px;top: 160px;cursor:pointer"
							left_arrow.innerHTML = '<img src="'+ base_url +'/assets/left_arrow.png">'
							left_arrow.style = "position:absolute;right:15px;top: 160px;cursor:pointer"

							right_arrow.id = "similars_right_arrow"
							left_arrow.id = "similars_left_arrow"

							right_arrow.addEventListener('click', function(){
								document.getElementById('sim').style.marginLeft = '0px'
							})

							left_arrow.addEventListener('click', function(){
								document.getElementById('sim').style.marginLeft = '-240px'
							})

							wrapper.append(right_arrow)
							wrapper.append(left_arrow)
					}

					if(!document.getElementById('similars')){
						var similars_container = document.createElement('div')
						var similars_div = document.createElement('div')

							similars_div.style = "display:inline-flex;transition: all 1s ease-in-out;"
							similars_div.id = "sim"

						var data = [
							{'thumb' : 'similars_thumb1.png', 'title' : 'Crazy head', 'description' : 'No serán las chicas más adaptadas, pero tienen un duro trabajo por delante. ¿Qué podría salir mal?', 'year' : 2016, 'seasons' : 1, 'pg' : 16},
							{'thumb' : 'similars_thumb2.png', 'title' : 'Santa clarita diet', 'description' : 'Mami se desespera por la carne humana. Papi anhela una vida normal. El compromiso es la base de todo buen matrimonio.', 'year' : 2019, 'seasons' : 3, 'pg' : 16},
							{'thumb' : 'similars_thumb3.png', 'title' : 'Zombie', 'description' : '¿Quién se hubiese imaginado que convertirte en zombi también podía transformarte en una brillante detective?', 'year' : 2017, 'seasons' : 3, 'pg' : 13},
							{'thumb' : 'similars_thumb4.png', 'title' : 'The umbrella academy', 'description' : 'De chicos eran superhéroes y ahora aspiran a ser supervivientes. Y solo tienen ocho días para evitar el fin del mundo', 'year' : 2016, 'seasons' : 1, 'pg' : 16}
						]

						data.map(tvshow => {
							var tvshow_div = document.createElement('a')
							var tvshowHTML = ""
								tvshowHTML += '<img src="'+ base_url +'/assets/' + tvshow.thumb + '" style="    margin-bottom: 5px;">'
								tvshowHTML += '<span class="year">' + tvshow.year + '</span>'
								tvshowHTML += '<span class="pg">' + tvshow.pg + '+</span>'
								if(tvshow.seasons === 1){
									tvshowHTML += '<span class="seasons">' + tvshow.seasons + ' Temporada</span>'
								}else{
									tvshowHTML += '<span class="seasons">' + tvshow.seasons + ' Temporadas</span>'
								}
								tvshowHTML += '<div class="title">' + tvshow.title + '</div>'
								tvshowHTML += '<div class="description">' + tvshow.description + '</div>'
								tvshow_div.innerHTML = tvshowHTML
								tvshow_div.className = "thumbnail"
								tvshow_div.href = "https://netflix.com"
								tvshow_div.target = "_blank"
								similars_div.append(tvshow_div)
						})

						similars_container.style = "display: inline-flex;position: absolute;top: 120px;left: 0px;right: 0px;margin-left: auto;margin-right: auto;width: 705px;overflow: hidden;"
						similars_container.id = "similars"
						
						similars_container.append(similars_div)
						wrapper.append(similars_container)
					}

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
		}
	}
};

var video = fluidPlayer('video-id', options);

video.on('pause', function() {
	if(document.getElementById('unmuteButton')){
		document.getElementById('video-id_fluid_initial_play').style = "display:none !important";
		document.getElementById('video-id').play()
		video.muteToggle('video-id', true);
		removeIfExists(['unmuteButton'])
	}
});

video.on('play', function(){
	video.muteToggle('video-id', true);
	removeIfExists(['unmuteButton'])
	wrapper.addEventListener('mouseenter', playerIn);
})