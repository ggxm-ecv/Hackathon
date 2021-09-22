var character = document.getElementById("character");
var block = document.getElementById("block");
var counter=0;

block.style.animation = "none";

setTimeout(function(){

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

var rythm = new Rythm();
rythm.setMusic('./sounds/Chameleon.mp3');
rythm.start();
allDances();
block.style.animation = "block 3s linear infinite";

console.log('test');

document.onkeydown = checkKey;
function checkKey(e) {
    e = e || window.event;

    if (e.keyCode == '38') {
        console.log('en haut');
        if(character.classList == "animate"){return}
        character.classList.add("animate");
        setTimeout(function(){
            character.classList.remove("animate");
        },800);
        // up arrow
    }
    else if (e.keyCode == '40') {
        console.log('en bas');
        if(character.classList == "animateDown"){return}
        character.classList.add("animateDown");
        setTimeout(function(){
            character.classList.remove("animateDown");
        },800);
        // down arrow
    }
}

// BLOCK GENERATOR 

var game = document.getElementById('game');

function blockGenerator() {
    var newDiv = document.createElement('div');
    newDiv.style.width = '20px';
    newDiv.style.height = '20px';
    newDiv.style.backgroundColor = "#" + ((1<<24)*Math.random() | 0).toString(16);
    newDiv.style.position = 'relative';
    newDiv.style.left = '480px';
    newDiv.style.top = '80px';
    newDiv.style.animation = 'block 3s infinite linear';
    game.appendChild(newDiv);
    console.log('block added');
}

setInterval( function() {
    let blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    if(blockLeft<45 && blockLeft>40){
        console.log('dqddq');
        blockGenerator();
    }
}, 30);


var checkDead = setInterval(function() {
    let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    let blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    if(blockLeft<45 && blockLeft>5 && characterTop>=130){ // COLLISION
        rythm.stop();
        block.style.animation = "none";
        // alert("Game Over. score: "+Math.floor(counter/100));
        if (confirm("Game Over. score: "+Math.floor(counter/100))) {
            rythm = new Rythm();
            rythm.setMusic('./sounds/Chameleon.mp3');
            rythm.start();
            allDances();
        } else {
            // BACK TO HOME ???
        }
        counter=0;
        block.style.animation = "block 3s infinite linear";
    } else {
        counter++;
        document.getElementById("scoreSpan").innerHTML = Math.floor(counter/100);
    }
}, 30);



}, 3000);