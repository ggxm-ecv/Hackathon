(function () {
	const buttonStart = document.getElementById('game-start');
	const character = document.getElementById('game-character');
	const obstacles = document.querySelectorAll('.game-obstacle');
	const score = document.getElementById('game-score');
	const scoreDeath = document.getElementById('scoreGameOver');
	var counter = 0;
	var rythm = new Rythm();
	var restartCounter = 1;
	var restartCounterEnable = false;

	// Random image position generator 
	function imgGenerator() {
		var gameBg = document.getElementById('gameBackground');
		var newImg = document.createElement('img');
		var num = Math.floor(Math.random() * (2000 - 0 + 1)) + 0;;
		newImg.src = 'img/trollface.png';
		var randomClass = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
		if (randomClass == 1) {
			newImg.classList.add('blur1');
		} else if (randomClass == 2) {
			newImg.classList.add('blur2');
		} else if (randomClass == 3) {
			newImg.classList.add('blur3');
		}
		newImg.classList.add('trollface');
		var pos_x = Math.floor(Math.random() * (-200));
		var pos_y = Math.floor(Math.random() * (1200 - (-200) + 1)) + (-200);
		newImg.style.left = pos_x + 'px';
		newImg.style.top = pos_y + 'px';
		newImg.style.width = Math.floor(Math.random() * (5 - 2 + 1)) + 2 + '%';
		var styleEl = document.createElement('style');
		var toppx = Math.floor(Math.random() * (1000 - (-500) + 1)) + (-500);
		var leftpx = Math.floor(Math.random() * (2000 - 1800 + 1)) + 1800;
		styleEl.innerHTML = `@keyframes randomImg` + num + `{
      0%{transform:rotate(0deg)}
      100%{top:`+ toppx + `px;left:` + leftpx + `px;transform:rotate(360deg)}
    }`;
		document.head.appendChild(styleEl);
		var animTime = Math.floor(Math.random() * (7 - 3 + 1)) + 3;
		newImg.style.animation = 'randomImg' + num + ' ' + animTime + 's linear infinite';
		gameBg.appendChild(newImg);
	}

	imgGenerator();

	function gameStart() {

		// Game Init
		rythm.setMusic('./sounds/Chameleon.mp3');
		rythm.start();
		allDances();

		// pause button

		// Game Process
		let gameProcess = setTimeout(function () {

			document.addEventListener('click', function (e) {
				e.preventDefault();
				jump();
			});

			document.onkeydown = checkKey;
			function checkKey(e) {
				e = e || window.event;

				if (e.keyCode == '38' || e.keyCode == '32') {
					e.preventDefault();
					jump();
				}
			}

			var checkDead = setInterval(function () {

				let characterBottom = parseInt(window.getComputedStyle(character).getPropertyValue('bottom'));
				let characterWidth = character.offsetWidth;

				obstacles.forEach(elem => {

					let obstacleLeft = parseInt(window.getComputedStyle(elem).getPropertyValue('left'));

					let obstacleWidth = elem.offsetWidth;
					let obstacleHeight = elem.offsetHeight;

					let leftTargetMax = characterWidth / 2.4;
					let leftTargetMin = 0 - (characterWidth / 2.4) - obstacleWidth;

					if (obstacleLeft < leftTargetMax && obstacleLeft > leftTargetMin && characterBottom <= obstacleHeight) {

						rythm.stop();

						document.getElementById('death').play();
						document.getElementById('explosion').classList.add('active');
						setTimeout(function () {
							document.getElementById('explosion').classList.remove('active');
						}, 600)

						document.getElementById('gameOver').classList.remove('hide');
						document.getElementById('game-score-death').innerHTML = Math.round(counter);

						character.classList.remove('active');
						document.getElementById('character-1').classList.remove('active');
						document.getElementById('character-2').classList.remove('active');
						document.getElementById('character-3').classList.remove('active');
						document.getElementById('character-4').classList.remove('active');
						document.getElementById('borderGame').classList.remove('borderColor2');

						counter = 0;

						obstacles.forEach(element => {
							element.classList.add('stop-anim');
						});

			
					}

				});

			}, 30);


			// foreach obstacle check if passed and add score

			obstacles.forEach(elem => {

				let obstaclePosistion = parseInt(window.getComputedStyle(elem).getPropertyValue('left'));

				setInterval(() => {

					let obstacleNewPosistion = parseInt(window.getComputedStyle(elem).getPropertyValue('left'));

					if (obstacleNewPosistion <= -20 && obstaclePosistion >= -20) {

						if (restartCounter > 1) {
							counter = counter + 1 / restartCounter;
							if (restartCounterEnable == true) {
								score.innerHTML = Math.round(counter);
								imgGenerator();
								restartCounterEnable = false;
							} else {
								restartCounterEnable = true;
							}
						} else {
							// counter++;
							counter = Math.round(counter) + 1;
							score.innerHTML = counter;
							imgGenerator();
						}


						document.getElementById('score').play();

						

						// change perso
						if (counter == 2) {
							document.getElementById('switch').play();
							character.classList.add('active');
							document.getElementById('character-1').classList.add('active');
							document.getElementById('character-2').classList.remove('active');
							document.getElementById('character-3').classList.remove('active');
							document.getElementById('character-4').classList.remove('active');
							document.getElementById('section-main-404').classList.add('bgcolor1');
						} else if (counter == 12) {
							document.getElementById('switch').play();
							document.getElementById('character-1').classList.remove('active');
							document.getElementById('character-2').classList.add('active');
							document.getElementById('character-3').classList.remove('active');
							document.getElementById('character-4').classList.remove('active');
							document.getElementById('section-main-404').classList.remove('bgcolor1');
							document.getElementById('section-main-404').classList.add('bgcolor2');
							document.getElementById('borderGame').classList.add('borderColor2');
						} else if (counter == 22) {
							document.getElementById('switch').play();
							document.getElementById('character-1').classList.remove('active');
							document.getElementById('character-2').classList.remove('active');
							document.getElementById('character-3').classList.add('active');
							document.getElementById('character-4').classList.remove('active');
							document.getElementById('section-main-404').classList.remove('bgcolor2');
							document.getElementById('section-main-404').classList.add('bgcolor3');
						} else if (counter == 32) {
							document.getElementById('switch').play();
							document.getElementById('character-1').classList.remove('active');
							document.getElementById('character-2').classList.remove('active');
							document.getElementById('character-3').classList.remove('active');
							document.getElementById('character-4').classList.add('active');
							document.getElementById('section-main-404').classList.remove('bgcolor3');
							document.getElementById('section-main-404').classList.add('bgcolor4');
						} else if (counter == 42) {
							// END of the Game
							document.getElementById('victory').play();
							document.getElementById('applause').play();

							document.getElementById('gameSuccess').classList.remove('hide');
							document.getElementById('game-score-success').innerHTML = counter;
							obstacles.forEach(element => {
								element.classList.add('stop-anim');
							});

						} else if (counter == 0) {
							// reset Game
							character.classList.remove('active');
							document.getElementById('character-1').classList.remove('active');
							document.getElementById('character-2').classList.remove('active');
							document.getElementById('character-3').classList.remove('active');
							document.getElementById('character-4').classList.remove('active');
						}

					}

					obstaclePosistion = obstacleNewPosistion;

				}, 100);


			});


		}, 400);

	}


	function allDances() {
		rythm.addRythm('pulse1', 'pulse', 0, 10)
		rythm.addRythm('pulse2', 'pulse', 0, 10, { min: 0.1, max: 1 })
		rythm.addRythm('pulse3', 'pulse', 0, 10, { min: 1, max: 1.75 })
		rythm.addRythm('jump1', 'jump', 0, 10)
		rythm.addRythm('jump2', 'jump', 150, 40, { min: -20, max: 20 })
		rythm.addRythm('shake1', 'shake', 0, 10)
		rythm.addRythm('shake2', 'shake', 0, 10, { min: 0, max: 20 })
		rythm.addRythm('shake3', 'shake', 0, 10, { direction: 'left' })
		rythm.addRythm('twist1', 'twist', 0, 10)
		rythm.addRythm('twist2', 'twist', 0, 10, { min: 20, max: 180 })
		rythm.addRythm('twist3', 'twist', 0, 10, { direction: 'left' })
		rythm.addRythm('vanish1', 'vanish', 0, 10)
		rythm.addRythm('vanish2', 'vanish', 0, 10, { reverse: true })
		rythm.addRythm('color1', 'color', 0, 10)
		rythm.addRythm('color2', 'color', 0, 10, {
			from: [0, 0, 255],
			to: [255, 0, 255],
		})
		rythm.addRythm('color3', 'color', 0, 10, {
			from: [255, 255, 0],
			to: [255, 0, 0],
		})
		rythm.addRythm('bgcolor1', 'color', 0, 6, {
			from: [1, 8, 19],
			to: [16, 48, 99],
		})
		rythm.addRythm('bgcolor2', 'color', 0, 6, {
			from: [16, 48, 99],
			to: [61, 8, 123],
		})
		rythm.addRythm('bgcolor3', 'color', 0, 6, {
			from: [61, 8, 123],
			to: [255, 0, 228],
		})
		rythm.addRythm('bgcolor4', 'color', 0, 6, {
			from: [255, 0, 228],
			to: [223, 46, 46],
		})
		rythm.addRythm('borderColor1', 'borderColor', 0, 10)
		rythm.addRythm('borderColor2', 'borderColor', 0, 10, {
			from: [0, 0, 255],
			to: [255, 0, 255],
		})
		rythm.addRythm('borderColor3', 'borderColor', 0, 10, {
			from: [255, 255, 0],
			to: [255, 0, 0],
		})
		rythm.addRythm('borderWidth1', 'borderWidth', 0, 2)
		rythm.addRythm('borderWidth2', 'borderWidth', 0, 2, { min: 2, max: 9 })
		rythm.addRythm('fontSize1', 'fontSize', 0, 2)
		rythm.addRythm('fontSize2', 'fontSize', 0, 2, { min: 0.9, max: 1.1 })
		rythm.addRythm('radius1', 'radius', 0, 10, { min: 0, max: 30 })
		rythm.addRythm('radius2', 'radius', 0, 10, { reverse: true, min: 0, max: 30 })
		rythm.addRythm('blur1', 'blur', 0, 10)
		rythm.addRythm('blur2', 'blur', 0, 10, { reverse: true })
		rythm.addRythm('blur3', 'blur', 0, 10, { max: 16 })
		rythm.addRythm('swing1', 'swing', 0, 10)
		rythm.addRythm('swing2', 'swing', 0, 10, { curve: 'up' })
		rythm.addRythm('swing3', 'swing', 0, 10, { direction: 'left' })
		rythm.addRythm('swing4', 'swing', 0, 10, { radius: 10 })
		rythm.addRythm('neon1', 'neon', 0, 10)
		rythm.addRythm('neon2', 'neon', 0, 10, {
			from: [0, 0, 255],
			to: [255, 0, 255],
		})
		rythm.addRythm('neon3', 'neon', 0, 10, {
			from: [255, 255, 0],
			to: [255, 0, 0],
		})
		rythm.addRythm('kern1', 'kern', 0, 10, { min: -5, max: 5 })
		rythm.addRythm('kern2', 'kern', 0, 10, { min: -5, max: 5, reverse: true })
		rythm.addRythm('thanks', 'shake', 0, 10, { min: -10, max: 10 })
		rythm.addRythm('contributor-avatar', 'pulse', 0, 10, { min: 0.5, max: 1.1 })
		rythm.addRythm('contributor-login-link', 'kern', 0, 10, { min: 0, max: 5 })
		rythm.addRythm('tilt1', 'tilt', 0, 10)
		rythm.addRythm('tilt2', 'tilt', 0, 10, { reverse: true })
		rythm.addRythm('fontColor1', 'fontColor', 0, 10)
		rythm.addRythm('fontColor2', 'fontColor', 0, 10, {
			from: [0, 0, 255],
			to: [255, 0, 255],
		})
	}


	function jump() {
		document.getElementById('jumpSound').play();
		if (character.classList == 'animate') { return }
		character.classList.add('animate');
		setTimeout(function () {
			character.classList.remove('animate');
		}, 800);
	}


	// Start Game
	buttonStart.addEventListener('click', function () {
		if (document.body.classList == "game-started") {

			rythm.stop();
			
			document.body.classList.remove('game-started');
			document.body.classList.add('game-started');
			document.getElementById('gameSuccess').classList.add('hide');
			document.getElementById('gameOver').classList.add('hide');
			obstacles.forEach(element => {
				element.classList.add('stop-anim');
			});
			setTimeout(() => {
				obstacles.forEach(element => {
					element.classList.remove('stop-anim');
				});
			}, 30);
			restartCounter++;
			counter = 0;
			score.innerHTML = Math.round(counter);

			document.getElementById('gameBackground').innerHTML = '';
			document.getElementById('section-main-404').classList.remove('bgcolor1');
			document.getElementById('section-main-404').classList.remove('bgcolor2');
			document.getElementById('section-main-404').classList.remove('bgcolor3');
			document.getElementById('section-main-404').classList.remove('bgcolor4');
			character.classList.remove('active');
			document.getElementById('character-1').classList.remove('active');
			document.getElementById('character-2').classList.remove('active');
			document.getElementById('character-3').classList.remove('active');
			document.getElementById('character-4').classList.remove('active');
			document.getElementById('borderGame').classList.remove('borderColor2');

			setTimeout(() => {
				gameStart();
			}, 40);


		} else {

			document.body.classList.add('game-started');
			buttonStart.innerHTML = "Restart";
			buttonStart.classList.add('restart');
			counter = 0;
			gameStart();

		}
	});

})();
