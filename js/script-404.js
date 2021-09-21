(function () {

	const buttonStart = document.getElementById('game-start');
	const character = document.getElementById('game-character');
	const block = document.getElementById('game-block');
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
				let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue('top'));
				let blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue('left'));
				if (blockLeft < 20 && blockLeft > -20 && characterTop >= 130) {
					block.style.animation = 'none';
					alert('Game Over. score: ' + Math.floor(counter / 100));
					counter = 0;
					block.style.animation = 'block 3s infinite linear';
				} else {
					counter++;
					score.innerHTML = Math.floor(counter / 100);
				}
			}, 30);

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


