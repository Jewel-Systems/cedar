$(document).ready(function() {

	$(".loginForm input[name='email']").prop('readonly', false);

	var scanner;

	function go() {
		if(scanner) {
			scanner.stop();
		}

		scanner = new SayCheese('#camera', {
			snapshots : true
		});

		scanner.on('error',function(error) {
			$('#camera').html('<p class="text-danger">This plugin cannot run. Check if your browser blocks it.</p>');
		});

		scanner.on('snapshot', function(snapshot) {
			qrCodeDecoder(snapshot.toDataURL());
		});

		qrcode.callback = showInfo;

		scanner.on('success', function() {
			scanCode(scanner);
		});

		scanner.start();
	}

	go();

	// recursive function for scanning code
	function scanCode(scanner) {
		scanner.takeSnapshot();
		setTimeout(function() {
			scanCode(scanner);
		}, 1000);
	}

	// decode the img
	function qrCodeDecoder(dataUrl) {
		qrcode.decode(dataUrl);
	}

	// show info from qr code
	function showInfo(data) {
		if (data !== 'error decoding QR Code') {
			$("#qrStatus p").html(data);
			$(".loginForm input[name='email']").val(data);
			$(".loginForm input[name='email']").prop('readonly', true);
			$(".loginForm input[name='email']").css('background-color', 'rgb(212, 212, 212)');
			$(".loginForm input[name='pass']").focus();
		} else {
			$("#qrStatus p").html('No QR Code in sight.');
		}
	}

});
