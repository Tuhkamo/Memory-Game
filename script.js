'use strict';
(function() {

	const tyylit = ['tyhja','t1','t2','t3','t4','t5','t6','t7','t8'];
	const taso = [1, 2, 8, 4, 5, 6, 8, 7, 4, 6, 3, 7, 1, 2, 3, 5];

	let elementtitaulukko;
	let valintataulukko;
	let uusitaso;
	let pelialue;
	let pisteet;
	let pistelkm;
	let nappi;

	document.addEventListener('DOMContentLoaded', alusta);

	function alusta() {
		pelialue=document.getElementById('pelialue');
		pisteet=document.getElementById('pisteet');
		nappi = document.getElementById('suorita');
		nappi.addEventListener('click', resetoi);
		valintataulukko = [];
		uusitaso=[];
		pistelkm = 0;


		randomisoi();
		luoUusitaso();
		elementtitaulukko = luoTaulukko(uusitaso);
	}

	function resetoi(){

		pelialue.textContent='';
		valintataulukko = [];
		uusitaso=[];
		pistelkm = 0;
		pisteet.textContent = pistelkm;


		randomisoi();
		luoUusitaso();
		elementtitaulukko = luoTaulukko(uusitaso);
	}

	function luoUusitaso() {
		let sarake=0;
		let rivi =[];
		for (let alkio of taso){
			rivi.push(alkio);
			sarake++;
			if (sarake >= 4) {
				uusitaso.push(rivi);
				sarake=0;
				rivi=[];
			}
		}
	}

	function randomisoi() {
		let ind = taso.length, i, randomInd;

		while (0 !== ind) {

			randomInd = Math.ceil(Math.random() * ind);
			ind -= 1;

			i = taso[ind];
			taso[ind] = taso[randomInd];
			taso[randomInd] = i;
		}
		return taso;
	}


	function luoTaulukko(uusitaso) {
		elementtitaulukko = [];
		for (let rivi = 0; rivi < uusitaso.length; rivi++) {
			let tr = document.createElement('tr');
			let elementtirivi = [];
			for (let sarake = 0; sarake < uusitaso[rivi].length; sarake++) {
				let td = document.createElement('td');
				td.addEventListener('click', e => paivitaTila(e.target, rivi, sarake));
				elementtirivi.push(td);
				tr.appendChild(td);
			}
			elementtitaulukko.push(elementtirivi);
			pelialue.appendChild(tr);
		}
		return elementtitaulukko;
	}


	function paivitaTila(elementti, rivi, sarake) {
		if (uusitaso[rivi][sarake] === 0 || elementti.className === 'tyhja') {
			return;
		} else {
			if (valintataulukko.length===0) {
				elementti.setAttribute('class', tyylit[uusitaso[rivi][sarake]]);
				valintataulukko.push({rivi:rivi, sarake:sarake});
			}
			else if (valintataulukko.length===1) {
				elementti.setAttribute('class', tyylit[uusitaso[rivi][sarake]]);
				valintataulukko.push({rivi:rivi, sarake:sarake});
				if (elementtitaulukko[valintataulukko[0].rivi][valintataulukko[0].sarake]===elementtitaulukko[valintataulukko[1].rivi][valintataulukko[1].sarake]) {
					elementtitaulukko[valintataulukko[0].rivi][valintataulukko[0].sarake].removeAttribute('class');
					elementtitaulukko[valintataulukko[1].rivi][valintataulukko[1].sarake].removeAttribute('class');
					valintataulukko = [];
					pistelkm -= 2;
					pisteet.textContent = pistelkm;
					return;
				}
			}
			else if (valintataulukko.length===2) {

				if (uusitaso[valintataulukko[0].rivi][valintataulukko[0].sarake]===uusitaso[valintataulukko[1].rivi][valintataulukko[1].sarake]) {
					elementtitaulukko[valintataulukko[0].rivi][valintataulukko[0].sarake].setAttribute('class','tyhja');
					elementtitaulukko[valintataulukko[1].rivi][valintataulukko[1].sarake].setAttribute('class','tyhja');
					uusitaso[valintataulukko[0].rivi][valintataulukko[0].sarake]=0;
					uusitaso[valintataulukko[1].rivi][valintataulukko[1].sarake]=0;
					pistelkm += 5;
					pisteet.textContent = pistelkm;
				} else {
					elementtitaulukko[valintataulukko[0].rivi][valintataulukko[0].sarake].removeAttribute('class');
					elementtitaulukko[valintataulukko[1].rivi][valintataulukko[1].sarake].removeAttribute('class');
					pistelkm -= 1;
					pisteet.textContent = pistelkm;
				}
				valintataulukko = [];
			}
		}
	}
})();
