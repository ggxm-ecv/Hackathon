(function () {

	const buttonStart = document.getElementById('game-start');
	const character = document.getElementById('game-character');
	const obstacles = document.querySelectorAll('.game-obstacle')
	const obstacle = document.getElementById('game-obstacle');
	const score = document.getElementById('game-score');

	var counter = 0;

	function gameStart() {

		// Game Init



		// Game Process
		let gameProcess = setTimeout(function(){

			document.addEventListener('click', function () {
				jump();
			});
	
			var checkDead = setInterval(function () {

				let characterBottom = parseInt(window.getComputedStyle(character).getPropertyValue('bottom'));
				let characterWidth = character.offsetWidth;

				obstacles.forEach(elem => {

					let obstacleLeft = parseInt(window.getComputedStyle(elem).getPropertyValue('left'));

					let obstacleWidth = elem.offsetWidth;
					let obstacleHeight = elem.offsetHeight;

					let leftTargetMax = characterWidth/2;
					let leftTargetMin = 0-(characterWidth/2)-obstacleWidth;
					
					if (obstacleLeft < leftTargetMax && obstacleLeft > leftTargetMin && characterBottom <= obstacleHeight) {

						elem.style.animation = 'none';
						alert('Game Over. score: ' + counter);
						counter = 0;
						score.innerHTML = counter;
						elem.style.animation = 'obstacle 6s infinite linear';
						
					}
					
				});

			}, 30);


			// foreach obstacle check if passed and add score

			obstacles.forEach(elem => {

				let obstaclePosistion = parseInt(window.getComputedStyle(elem).getPropertyValue('left'));

				setInterval(() => {

					let obstacleNewPosistion = parseInt(window.getComputedStyle(elem).getPropertyValue('left'));

					if (obstacleNewPosistion <= 0 && obstaclePosistion >= 0) {

						counter++;
						score.innerHTML = counter;
						
					}

					obstaclePosistion = obstacleNewPosistion;
					
				}, 30);

				
			});
			

		}, 400);
		
	}

	function jump() {
		if (character.classList == 'animate') { return }
		character.classList.add('animate');
		setTimeout(function () {
			character.classList.remove('animate');
		}, 800);
	}


	// Start Game
	buttonStart.addEventListener('click', function () {
		document.body.classList.add('game-strated');
		gameStart();
	});


})();


