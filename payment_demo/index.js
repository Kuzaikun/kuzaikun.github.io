'use strict'

// Post data when form is submitted

const form = document.getElementById('first_form');
form.addEventListener('submit', (evt) => {
	submitForm();
	evt.preventDefault();
	console.log(evt);
});

//
const submitForm = async function() {
	// Get data from query string
	const queryParams = new URLSearchParams(document.location.search);
	const userId = queryParams.get('userId');
	const conversationId = queryParams.get('convId');
	const botId = queryParams.get('botId');

	console.log('userid ' + userId);
	console.log('userid ' + conversationId);
	console.log('userid ' + botId);

	///Item seleccionado
	const mainItem1 = document.getElementById('gr1').checked;
	const mainItem2 = document.getElementById('gr2').checked;
	const mainItem3 = document.getElementById('gr3').checked;
	const mainItem4 = document.getElementById('gr4').checked;
	console.log(mainItem1 + ' ' + mainItem2);
	var itemSelected = null;
	if (mainItem1) {
		itemSelected = '7 piezas';
	} else if (mainItem2) {
		itemSelected = '10 piezas';
	} else if (mainItem3) {
		itemSelected = '12 piezas';
	} else if (mainItem4) {
		itemSelected = '15 piezas';
	} else {
		console.log('valor no seleccionado');
	}


	//
	const checkBox1 = document.getElementById('chk1').checked;
	const checkBox2 = document.getElementById('chk2').checked;
	const checkBox3 = document.getElementById('chk3').checked;
	const checkBox4 = document.getElementById('chk4').checked;
	const checkBox5 = document.getElementById('chk5').checked;
	const checkBox6 = document.getElementById('chk6').checked;
	const checkBox7 = document.getElementById('chk7').checked;
	const checkBox8 = document.getElementById('chk8').checked;
	const checkBox9 = document.getElementById('chk9').checked;


	var itemSelected_c = [];
	if (checkBox1) {
		itemSelected_c.push('sopa de arroz');
	}
	if (checkBox2) {
		itemSelected_c.push('ensalada de col');
	}
	if (checkBox3) {
		itemSelected_c.push('ensalada codito');
	}
	if (checkBox4) {
		itemSelected_c.push('puré de papa');
	}
	if (checkBox5) {
		itemSelected_c.push('frijoles charros');
	}
	if (checkBox6) {
		itemSelected_c.push('ensalada americana');
	}
	if (checkBox7) {
		itemSelected_c.push('ensalada fresca');
	}
	if (checkBox8) {
		itemSelected_c.push('frijoles refritos');
	}
	if (checkBox9) {
		itemSelected_c.push('papas francesa');
	}


	console.log('item selected: ' + itemSelected_c);

	////////////////////////////////////////////////////////////////////////////////

	const checkBox_a1 = document.getElementById('chk_m1').checked;
	const checkBox_b2 = document.getElementById('chk_m2').checked;
	const checkBox_c3 = document.getElementById('chk_m3').checked;

	var itemSelected_m = [];
	if (checkBox_a1) {
		itemSelected_m.push('quesadillas');
	}
	if (checkBox_b2) {
		itemSelected_m.push('nuggets');
	}
	if (checkBox_c3) {
		itemSelected_m.push('tacos dorados');
	}
	console.log('item selected: ' + itemSelected_m);
	// use correct domain for your region
	const domain = 'https://lo.bc-intg.liveperson.net/thirdparty-services-0.1/webview';
	// encode auth string
	const authString = conversationId+" || "+botId;
	console.log(authString);
	const auth = await SHA256(authString);
	//console.log('aaauth ' + auth);

  const data = {
    botId: botId,
    conversationId: conversationId,
    userId: userId,
    //message: "request successful" ,
    contextVariables: [{
        "name": "itemSelected",
        "value": itemSelected
      }]
  };

	const requestOptions = {
		method: 'POST',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': auth
		},
		body: JSON.stringify(data)
	};

	fetch(domain, requestOptions)
		.then(async res => {
			const isJson = res.headers.get('content-type')?.includes('application/json');
			const data = isJson && await res.json();
			// check for error response
			if (!res.ok) {
				//get error message from body or default to response status
				const error = (data && data.message) || res.status;

				return Promise.reject(error);
			}
			console.log("data: "+JSON.stringify(data));
			window.location.href = "item_selected.html";
		}).catch(err => {
			console.log('error: ' + err);
		});
}

/**
 * Secure Hash Algorithm (SHA256)
 * http://www.webtoolkit.info/
 * Original code by Angel Marin, Paul Johnston
 **/
function SHA256(s) {
	var chrsz = 8;
	var hexcase = 0;

	function safe_add(x, y) {
		var lsw = (x & 0xFFFF) + (y & 0xFFFF);
		var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
		return (msw << 16) | (lsw & 0xFFFF);
	}

	function S(X, n) {
		return (X >>> n) | (X << (32 - n));
	}

	function R(X, n) {
		return (X >>> n);
	}

	function Ch(x, y, z) {
		return ((x & y) ^ ((~x) & z));
	}

	function Maj(x, y, z) {
		return ((x & y) ^ (x & z) ^ (y & z));
	}

	function Sigma0256(x) {
		return (S(x, 2) ^ S(x, 13) ^ S(x, 22));
	}

	function Sigma1256(x) {
		return (S(x, 6) ^ S(x, 11) ^ S(x, 25));
	}

	function Gamma0256(x) {
		return (S(x, 7) ^ S(x, 18) ^ R(x, 3));
	}

	function Gamma1256(x) {
		return (S(x, 17) ^ S(x, 19) ^ R(x, 10));
	}

	function core_sha256(m, l) {
		var K = new Array(0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5, 0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5, 0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3, 0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174, 0xE49B69C1, 0xEFBE4786, 0xFC19DC6, 0x240CA1CC, 0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA, 0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7, 0xC6E00BF3, 0xD5A79147, 0x6CA6351, 0x14292967, 0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13, 0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85, 0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3, 0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070, 0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5, 0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3, 0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208, 0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2);
		var HASH = new Array(0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A, 0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19);
		var W = new Array(64);
		var a, b, c, d, e, f, g, h, i, j;
		var T1, T2;

		m[l >> 5] |= 0x80 << (24 - l % 32);
		m[((l + 64 >> 9) << 4) + 15] = l;

		for (var i = 0; i < m.length; i += 16) {
			a = HASH[0];
			b = HASH[1];
			c = HASH[2];
			d = HASH[3];
			e = HASH[4];
			f = HASH[5];
			g = HASH[6];
			h = HASH[7];

			for (var j = 0; j < 64; j++) {
				if (j < 16) W[j] = m[j + i];
				else W[j] = safe_add(safe_add(safe_add(Gamma1256(W[j - 2]), W[j - 7]), Gamma0256(W[j - 15])), W[j - 16]);

				T1 = safe_add(safe_add(safe_add(safe_add(h, Sigma1256(e)), Ch(e, f, g)), K[j]), W[j]);
				T2 = safe_add(Sigma0256(a), Maj(a, b, c));

				h = g;
				g = f;
				f = e;
				e = safe_add(d, T1);
				d = c;
				c = b;
				b = a;
				a = safe_add(T1, T2);
			}

			HASH[0] = safe_add(a, HASH[0]);
			HASH[1] = safe_add(b, HASH[1]);
			HASH[2] = safe_add(c, HASH[2]);
			HASH[3] = safe_add(d, HASH[3]);
			HASH[4] = safe_add(e, HASH[4]);
			HASH[5] = safe_add(f, HASH[5]);
			HASH[6] = safe_add(g, HASH[6]);
			HASH[7] = safe_add(h, HASH[7]);
		}
		return HASH;
	}

	function str2binb(str) {
		var bin = Array();
		var mask = (1 << chrsz) - 1;
		for (var i = 0; i < str.length * chrsz; i += chrsz) {
			bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (24 - i % 32);
		}
		return bin;
	}

	function Utf8Encode(string) {
		string = string.replace(/\r\n/g, '\n');
		var utftext = '';

		for (var n = 0; n < string.length; n++) {

			var c = string.charCodeAt(n);

			if (c < 128) {
				utftext += String.fromCharCode(c);
			} else if ((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			} else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}

		}

		return utftext;
	}

	function binb2hex(binarray) {
		var hex_tab = hexcase ? '0123456789ABCDEF' : '0123456789abcdef';
		var str = '';
		for (var i = 0; i < binarray.length * 4; i++) {
			str += hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8 + 4)) & 0xF) +
				hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8)) & 0xF);
		}
		return str;
	}

	s = Utf8Encode(s);
	return binb2hex(core_sha256(str2binb(s), s.length * chrsz));
}
