/*Only needed for the controls*/
(phone = document.getElementById('phone_1')), (iframe = document.getElementById('frame_1'));

/*View*/
function updateView(view) {
	if (view) {
		phone.className = 'phone view_' + view;
	}
}

/*Controls*/
function updateIframe() {
	// preload iphone width and height
	phone.style.width = '375px';
	phone.style.height = '667px';

	/*Idea by /u/aerosole*/
	document.getElementById('wrapper').style.perspective = 'none';
}

updateIframe();

iframe = document.getElementById('frame_1');

if (iframe.attachEvent) {
	iframe.attachEvent('onload', function() {
		afterLoading();
	});
} else {
	iframe.onload = function() {
		afterLoading();
	};
}

function afterLoading() {
	setTimeout(function() {
		phone.className = 'phone view_2';
		setTimeout(function() {
			// do second thing
			phone.className = 'phone view_2 rotate';
			//document.getElementById('loader').style.display = 'none';
		}, 1000);
	}, 1000);
}
