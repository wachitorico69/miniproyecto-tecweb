// ******JUEGO******
class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' }); //no funciona sin esto
    }
    
    preload ()
        {
            //imagenes
            this.load.image('nivel1', 'assets/nivel1.png');
            this.load.image('ground', 'assets/platform.png');
            this.load.image('star', 'assets/star.png');
            this.load.image('bomb', 'assets/bomb.png');

            //sonidos
            this.load.audio('musicaN1', 'sonidos/nivel1.mp3');

            //personajes
            this.load.atlas('dude', 'assets/dio.png', 'assets/diosprites.json');   //DIO
            //this.load.atlas('dude', 'assets/jojo.png', 'assets/jojosprites.json'); //JOTARO
            
            life = 3;
            score = 0;

        }
    create ()
        {
            //  A simple background for our game
            this.add.image(480, 269, 'nivel1');

            //música nivel
            this.musicaN1 = this.sound.add('musicaN1');
            this.musicaN1.play();

            //  The platforms group contains the ground and the 2 ledges we can jump on
            platforms = this.physics.add.staticGroup();

            //  Here we create the ground.
            //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
            platforms.create(0, 525, 'ground'); 
            platforms.create(400, 525, 'ground'); 
            platforms.create(800, 525, 'ground');

            //  Now let's create some ledges
            platforms.create(600, 350, 'ground');
            platforms.create(50, 250, 'ground');
            platforms.create(750, 220, 'ground');

            // The player and its settings
            player = this.physics.add.sprite(100, 450, 'dude');

            //  Player physics properties. Give the little guy a slight bounce.
            //player.setBounce(0.2);
            player.setCollideWorldBounds(true);

            //DIO SETTINGS
            player.setOrigin(0.5, 0.5); 
            player.body.setSize(30, 95).setOffset(10, 10);

            //JOTARO SETTINGS
            //player.setOrigin(0.5, 0.5);
            //player.body.setSize(50, 90).setOffset(20, 10);
            
            //  Our player animations, turning, walking left and walking right.
            this.anims.create({
                key: 'left',
                frames: this.anims.generateFrameNames('dude', { prefix: 'izq', end: 15, zeroPad: 4}), //DIO
                //frames: this.anims.generateFrameNames('dude', { prefix: 'izq', end: 9, zeroPad: 4}),  //JOTARO
                frameRate: 10,
                repeat: -1
            });

            this.anims.create({
                key: 'turn',
                frames: this.anims.generateFrameNames('dude', { prefix: 'parado', end: 5, zeroPad: 4}),  //DIO
                //frames: this.anims.generateFrameNames('dude', { prefix: 'parado', end: 15, zeroPad: 4}),  //JOTARO
                frameRate: 8
            });

            this.anims.create({
                key: 'right',
                frames: this.anims.generateFrameNames('dude', { prefix: 'der', end: 15, zeroPad: 4}),  //DIO
                //frames: this.anims.generateFrameNames('dude', { prefix: 'der', end: 9, zeroPad: 4}),  //JOTARO
                frameRate: 10,
                repeat: -1
                });

            this.anims.create({
                key: 'saltoi',
                frames: this.anims.generateFrameNames('dude', { prefix: 'saltoi', end: 9, zeroPad: 4 }),  //DIO
                //frames: this.anims.generateFrameNames('dude', { prefix: 'saltoi', end: 10, zeroPad: 4 }), //JOTARO
                frameRate: 10,
                repeat: 0
            });
    
            this.anims.create({
                key: 'saltod',
                frames: this.anims.generateFrameNames('dude', { prefix: 'saltod', end: 9, zeroPad: 4 }),  //DIO
                //frames: this.anims.generateFrameNames('dude', { prefix: 'saltod', end: 10, zeroPad: 4 }),  //JOTARO
                frameRate: 10,
                repeat: 0
            });

            this.anims.create({
                key: 'daño',
                frames: [{ key: 'dude', frame: 'daño' }], // Usa un solo frame
                frameRate: 10,
                repeat: 0 // No se repite, ya que es un golpe
            }); 
            
            //  Input Events
            cursors = this.input.keyboard.createCursorKeys();

            //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
            stars = this.physics.add.group({
                key: 'star',
                repeat: 11,
                setXY: { x: 12, y: 0, stepX: 70 }
            });

            stars.children.iterate(function (child) {

                //  Give each star a slightly different bounce
                child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

            });

            bombs = this.physics.add.group();

            //  The score
            scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
            lifeText = this.add.text(260, 16, 'life: 3', { fontSize: '32px', fill: '#000' });
            //  Collide the player and the stars with the platforms
            this.physics.add.collider(player, platforms);
            this.physics.add.collider(stars, platforms);
            this.physics.add.collider(bombs, platforms);

            //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
            this.physics.add.overlap(player, stars, collectStar, null, this);

            this.physics.add.collider(player, bombs, hitBomb, null, this);
            
            this.escKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC); //pause game
            
        }
    update ()
        {
        if (cursors.left.isDown)
            {
                player.setVelocityX(-160);
            
                if (!player.body.touching.down) {
                    player.anims.play('saltoi', true);
                } else{
                    player.anims.play('left', true);
                }
                    
            }
            else if (cursors.right.isDown)
            {
                player.setVelocityX(160);
            
                if (!player.body.touching.down) {
                    player.anims.play('saltod', true);
                } else{
                    player.anims.play('right', true);
                }
            
            }
            else
            {
                player.setVelocityX(0);
            
                if (player.body.touching.down) {
                    player.anims.play('turn', true);
                }
            }
            
            if (cursors.up.isDown && player.body.touching.down)
            {
                player.setVelocityY(-330);
                    
                player.anims.play('saltod', true);  //DIO
                //player.anims.play('saltoi', true);  //JOTARO
            }
            
            if (Phaser.Input.Keyboard.JustDown(this.escKey)) {
                this.scene.launch('PauseScene'); // Open pause menu
                this.scene.pause(); // Pause game
            }
        }
}

// PAUSA
class PauseScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PauseScene' });
    }

    create() {
        this.add.text(300, 250, 'Game Paused', { fontSize: '32px', fill: '#fff' });

        // Opción para reanudar
        this.add.text(300, 290, 'Resume', { fontSize: '28px', fill: '#fff' })
            .setInteractive()
            .on('pointerdown', () => {
                this.scene.resume('GameScene'); // Reanudar el juego
                this.scene.stop(); // Detener la escena de pausa
            });

        // Opción para volver al menú principal
        this.add.text(300, 330, 'Back to Menu', { fontSize: '28px', fill: '#ff0' })
            .setInteractive()
            .on('pointerdown', () => {
                exitGame();
            });

        this.escKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC); // Tecla ESC para pausar el juego
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.escKey)) {
            this.scene.resume('GameScene'); // Reanudar el juego
            this.scene.stop(); // Detener la escena de pausa
        }
    }
}

//GAMEOVER
class GameOverS extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverS' });
    }

    create() {
        this.add.text(300, 250, 'Game Over', { fontSize: '32px', fill: '#fff' });

        // Opción para reanudar
        this.add.text(300, 290, 'Back to Menu', { fontSize: '28px', fill: '#fff' })
            .setInteractive()
            .on('pointerdown', () => {
                exitGame();
            });
    }
}

if (window.game) {
    window.game.destroy(true); // Destroy previous instance
    window.game = null;
}

function startPhaserGame() {
    window.game = new Phaser.Game({
        type: Phaser.AUTO,
        width: 960,
        height: 538,
        parent: 'gameContainer',
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 300 },
                debug: false
            }
        },
        scene: [GameScene, PauseScene, GameOverS] //escenas en el juego (menu,juego)
    });
};

var player;
var stars;
var bombs;
var platforms;
var cursors;
var score;
var gameOver = false;
var scoreText;
var life;
var lifeText;


function collectStar (player, star)
{
    star.disableBody(true, true);

    //  Add and update the score
    score += 10;
    scoreText.setText('Score: ' + score);

    if (stars.countActive(true) === 0)
    {
        //  A new batch of stars to collect
        stars.children.iterate(function (child) {

            child.enableBody(true, child.x, 0, true, true);

        });

        var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

        var bomb = bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        bomb.allowGravity = false;

    }
}

function hitBomb (player, bomb)
{
    if (life > 0) {
        player.setTint(0xff0000);
        life--;
        lifeText.setText('Life: ' + life);
        if (life === 0) {
            this.physics.pause();
            player.setTint(0xff0000);
            player.anims.play('daño', true);
            this.time.delayedCall(1000, () => {
                this.scene.start('GameOverS');
            })
        } else {
            player.setAlpha(0.5); 
            this.time.delayedCall(1000, () => { 
                player.clearTint();
                player.setAlpha(1); 
                player.anims.play('turn', true);
            }, [], this);
        }
    }
}

//     ********* HTML - MENU *********

// comienzo del juego mediante html
function startGame() {
    document.getElementById('menuContainer').style.display = 'none';
    document.getElementById('gameContainer').style.display = 'block';

    const images = document.body.getElementsByTagName('img'); //esconde imagenes
    for (let img of images) {
        img.style.display = 'none'; // Hide each image
    }

    if (!window.game) {
        startPhaserGame(); // Start Phaser only once
    } else {
        restartGame(); // If game exists, restart it
    }
}
//registra nombre y personaje
function prepareGame(){
    const menuContainer = document.getElementById('menuContainer');
    menuContainer.innerHTML = ''; //vacia html

    menuContainer.style.display = 'grid'; // CSS
    menuContainer.style.gridTemplateColumns = '1fr'; 
    menuContainer.style.gridGap = '10px';

    const title = document.createElement('h2'); //texto: Name
    title.textContent = 'Name';

    const alias = document.createElement('textarea');//areatext de alias
    alias.rows = 1; 
    alias.cols = 20;
    alias.textContent = 'insert alias'

    const title2 = document.createElement('h2'); //texto: Choose 
    title2.textContent = 'Choose';

    const canvas = document.createElement('canvas');//CANVA
    canvas.width = 400;
    canvas.height = 300;
    canvas.id = "myCanvas";
    canvas.style.backgroundColor = "lightblue";
    const ctx = canvas.getContext('2d');
    canvas.addEventListener('dragover', function (e) {
        e.preventDefault(); 
        e.dataTransfer.dropEffect = 'move';
    });
    canvas.addEventListener('drop', function (e) {
        e.preventDefault();
        // Get the drop position
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Get the image source from the drag event data
        const imgSrc = e.dataTransfer.getData('image');

        // Draw the image on the canvas at the drop position
        const imgElement = new Image();
        imgElement.src = imgSrc;
        imgElement.onload = function() {
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Optional: Clear canvas before drawing new image
            ctx.drawImage(imgElement, mouseX - 50, mouseY - 50, 100, 100); // Draw image at mouse position
        };
    });

    const start = document.createElement('button'); //comenzar juego
    start.textContent = 'START';
    start.onclick = () => startGame();

    const backButton = document.createElement('button'); //regresar menu
    backButton.textContent = 'Back to Menu';
    backButton.onclick = () => location.reload();

    const img = document.createElement('img'); //imagen DIO
    img.src = 'assets/dio-panel.gif';  
    img.alt = 'Dio'; 
    img.style.width = '150px'; 
    img.style.height = 'auto';
    img.style.cursor = 'move';
    img.setAttribute('draggable', true);
    img.addEventListener('dragstart', function (e) {
        e.dataTransfer.setData('image', img.src); // Store the image source in dataTransfer
        e.dataTransfer.effectAllowed = 'move';
    });

    const img2 = document.createElement('img'); //imagen JOJO
    img2.src = 'assets/jojo-panel.gif';  
    img2.alt = 'JOJO'; 
    img2.style.width = '150px'; 
    img2.style.height = 'auto';
    img2.style.cursor = 'move';
    img2.setAttribute('draggable', true);
    img2.addEventListener('dragstart', function (e) {
        e.dataTransfer.setData('image', img2.src); // Store the image source in dataTransfer
        e.dataTransfer.effectAllowed = 'move';
    });

    //appendChild
    menuContainer.appendChild(title);
    menuContainer.appendChild(alias);
    menuContainer.appendChild(title2);
    menuContainer.appendChild(canvas);
    menuContainer.appendChild(start);
    menuContainer.appendChild(backButton);
    document.body.appendChild(img2); //esta fuera del grid
    document.body.appendChild(img); //esta fuera del grid
 
}
//para regresar al menu
function exitGame() {
    if (window.game) { //evita memory leaks
        window.game.scene.scenes.forEach(scene => scene.scene.stop()); // Stop all scenes
        window.game.destroy(true); // Fully destroy the game
        window.game = null;
    }
    location.reload(); //refresca pagina 
}
//reinicia el juego para poder usar html
function restartGame() {
    if (window.game) {
        window.game.destroy(true); // Completely destroy Phaser instance
        window.game = null;
    }
    startPhaserGame(); // Create a fresh instance
}
//records de personas
function records(){
    const menuContainer = document.getElementById('menuContainer');
    menuContainer.innerHTML = ''; 

    const title = document.createElement('h2');
    title.textContent = 'Records';

    const backButton = document.createElement('button');
    backButton.textContent = 'Back to Menu';
    backButton.onclick = () => location.reload();

    //appendChild
    menuContainer.appendChild(title);
    menuContainer.appendChild(backButton);
}
//ayuda
function help(){
    const menuContainer = document.getElementById('menuContainer');
    menuContainer.innerHTML = ''; 

    const title = document.createElement('h2');
    title.textContent = 'Help Page';

    const backButton = document.createElement('button');
    backButton.textContent = 'Back to Menu';
    backButton.onclick = () => location.reload();

    //appendChild
    menuContainer.appendChild(title);
    menuContainer.appendChild(backButton);
}