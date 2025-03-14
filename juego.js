// ******JUEGO******
let modelo = 0; //si es 1 usa jojo, 2 dio
let knifeCounter = 0;
let Level2 = false; 
class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' }); //no funciona sin esto
    }
    
    preload ()
        {
            //imagenes
            this.load.image('nivel1', 'assets/nivel1.png');
            this.load.image('nivel2', 'assets/nivel2.png');
            this.load.image('ground', 'assets/platform.png');
            this.load.image('cherry', 'assets/cherry.png');
            this.load.image('knife', 'assets/knife.png');
            this.load.image('heart1', 'assets/heart.png');
            this.load.image('heart2', 'assets/heart.png');
            this.load.image('heart3', 'assets/heart.png');
            this.load.atlas('iggy', 'assets/iggy.png', 'assets/iggysprites.json');
            this.load.atlas('StoneMask', 'assets/StoneMask.png', 'assets/StoneMasksprites.json');

            //sonidos
            this.load.audio('musicaN1', 'sonidos/nivel1.mp3');
            this.load.audio('musicaN2', 'sonidos/nivel2.mp3');
            this.load.audio('jojopick', 'sonidos/jojopick.mp3');
            this.load.audio('diopick', 'sonidos/diopick.mp3');
            this.load.audio('jojoSpecial', 'sonidos/jojoSpecial.mp3');
            this.load.audio('dioSpecial', 'sonidos/dioSpecial.mp3');
            this.load.audio('jojodmg', 'sonidos/jojodmg.mp3');
            this.load.audio('diodmg', 'sonidos/diodmg.mp3');
            this.load.audio('bark', 'sonidos/bark.mp3');
            this.load.audio('knife', 'sonidos/knife.mp3');

            //personajes
            if(modelo === 1){
                this.load.atlas('dude', 'assets/jojo.png', 'assets/jojosprites.json'); //JOTARO
            }
            else if(modelo === 2){
                this.load.atlas('dude', 'assets/dio.png', 'assets/diosprites.json');   //DIO
            }
            
            life = 3;
            score = 0;

        }
    create ()
        {
            //  A simple background for our game
            this.background = this.add.image(480, 269, 'nivel1');
            this.heart1 = this.add.image(30, 30, 'heart1');
            this.heart2 = this.add.image(80, 30, 'heart2');
            this.heart3 = this.add.image(130, 30, 'heart3');

            //música nivel
            this.musicaN1 = this.sound.add('musicaN1');
            this.musicaN2 = this.sound.add('musicaN2');
            this.jojopick = this.sound.add('jojopick');
            this.diopick = this.sound.add('diopick');
            this.jojoSpecial = this.sound.add('jojoSpecial');
            this.dioSpecial = this.sound.add('dioSpecial');
            this.jojodmg = this.sound.add('jojodmg');
            this.diodmg = this.sound.add('diodmg');
            this.bark = this.sound.add('bark');
            this.knife = this.sound.add('knife');

            this.musicaN1.play();

            //  The platforms group contains the ground and the 2 ledges we can jump on
            platforms = this.physics.add.staticGroup();

            //  Here we create the ground.
            platforms.create(0, 525, 'ground'); platforms.create(400, 525, 'ground'); platforms.create(800, 525, 'ground');

            //  Now let's create some ledges
            platforms.create(600, 350, 'ground');
            platforms.create(50, 250, 'ground');
            platforms.create(775, 220, 'ground');

            // The player and its settings
            player = this.physics.add.sprite(100, 450, 'dude');
            player.setCollideWorldBounds(true); //choca con los limites

            playerName = document.querySelector('textarea').value || "No name"; // Guardar el nombre
            console.log(`Jugador: ${playerName}`);
            // Animaciones y hitboxes distintos según el personaje
            if(modelo === 1) { //JOTARO
                player.setOrigin(0.5, 0.5);
                player.body.setSize(50, 90).setOffset(20, 10);

                this.anims.create({
                    key: 'left',
                    frames: this.anims.generateFrameNames('dude', { prefix: 'izq', end: 9, zeroPad: 4}),  //JOTARO
                    frameRate: 10,
                    repeat: -1
                });
    
                this.anims.create({
                    key: 'turn',
                    frames: this.anims.generateFrameNames('dude', { prefix: 'parado', end: 15, zeroPad: 4}),  //JOTARO
                    frameRate: 8
                });
    
                this.anims.create({
                    key: 'right',
                    frames: this.anims.generateFrameNames('dude', { prefix: 'der', end: 9, zeroPad: 4}),  //JOTARO
                    frameRate: 10,
                    repeat: -1
                });
    
                this.anims.create({
                    key: 'saltoi',
                    frames: this.anims.generateFrameNames('dude', { prefix: 'saltoi', end: 10, zeroPad: 4 }), //JOTARO
                    frameRate: 10,
                    repeat: 0
                });
        
                this.anims.create({
                    key: 'saltod',
                    frames: this.anims.generateFrameNames('dude', { prefix: 'saltod', end: 10, zeroPad: 4 }),  //JOTARO
                    frameRate: 10,
                    repeat: 0
                });
            }
            if(modelo === 2) { //DIO
                player.setOrigin(0.5, 0.5); 
                player.body.setSize(30, 95).setOffset(10, 10);

                this.anims.create({
                    key: 'left',
                    frames: this.anims.generateFrameNames('dude', { prefix: 'izq', end: 15, zeroPad: 4}), //DIO
                    frameRate: 10,
                    repeat: -1
                });
                this.anims.create({
                    key: 'turn',
                    frames: this.anims.generateFrameNames('dude', { prefix: 'parado', end: 5, zeroPad: 4}),  //DIO
                    frameRate: 8
                });
                this.anims.create({
                    key: 'right',
                    frames: this.anims.generateFrameNames('dude', { prefix: 'der', end: 15, zeroPad: 4}),  //DIO
                    frameRate: 10,
                    repeat: -1
                });
                this.anims.create({
                    key: 'saltoi',
                    frames: this.anims.generateFrameNames('dude', { prefix: 'saltoi', end: 9, zeroPad: 4 }),  //DIO
                    frameRate: 10,
                    repeat: 0
                });
                this.anims.create({
                    key: 'saltod',
                    frames: this.anims.generateFrameNames('dude', { prefix: 'saltod', end: 9, zeroPad: 4 }),  //DIO
                    frameRate: 10,
                    repeat: 0
                });
            }

            this.anims.create({
                key: 'daño',
                frames: [{ key: 'dude', frame: 'daño' }], // Usa un solo frame
                frameRate: 10,
                repeat: 0 // No se repite, ya que es un golpe
            }); 

            this.anims.create({
                key: 'iggy',
                frames: this.anims.generateFrameNames('iggy', { prefix: 'iggy', end: 8, zeroPad: 4}),
                frameRate: 8,
                repeat: -1
            });

            this.anims.create({
                key: 'StoneMaskAnimation',
                frames: this.anims.generateFrameNames('StoneMask', { prefix: 'StoneMask', end: 8, zeroPad: 4 }),
                frameRate: 8,
                repeat: -1
            });
            
            //  Input Events
            cursors = this.input.keyboard.createCursorKeys();

            //  Some cherrys to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
            cherrys = this.physics.add.group({
                key: 'cherry',
                repeat: 14,
                setXY: { x: 12, y: 0, stepX: 65 }
            });

            iggys = this.physics.add.group();

            cherrys.children.iterate(function (child) {

                //  Give each cherry a slightly different bounce
                child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

            });

            knives = this.physics.add.group();

            const date = new Date().toLocaleDateString('es-MX');
            let colorTexto = modelo === 1 ? '#58deff' : '#fbff11'; 

            //score
            if (playerName.length === 8) {
                scoreText = this.add.text(400, 12, '0 ', { fontFamily: 'SF Fedora, sans-serif', fontSize: '25px', fill: colorTexto });
            } else if (playerName.length === 7) {
                scoreText = this.add.text(385, 12, '0 ', { fontFamily: 'SF Fedora, sans-serif', fontSize: '25px', fill: colorTexto });
            } else if (playerName.length === 6) {
                scoreText = this.add.text(370, 12, '0 ', { fontFamily: 'SF Fedora, sans-serif', fontSize: '25px', fill: colorTexto });
            } else if (playerName.length === 5) {
                scoreText = this.add.text(360, 12, '0 ', { fontFamily: 'SF Fedora, sans-serif', fontSize: '25px', fill: colorTexto });
            } else if (playerName.length === 4) {
                scoreText = this.add.text(340, 12, '0 ', { fontFamily: 'SF Fedora, sans-serif', fontSize: '25px', fill: colorTexto });
            }
            
            //tablero
            this.add.text(170, 15, playerName + "'s score: ", { fontFamily: 'SF Fedora, sans-serif', fontSize: '26px', fill: colorTexto }); //user
            this.levelText = this.add.text(700, 5, "Level: 1 ", { fontFamily: 'SF Fedora, sans-serif', fontSize: '26px', fill: colorTexto }); //Level
            this.add.text(810, 5, date + ' ', { fontFamily: 'SF Fedora, sans-serif', fontSize: '24px', fill: colorTexto }); //fecha
            itemTime = this.add.text(850, 30, ' ' + ' ', { fontFamily: 'SF Fedora, sans-serif', fontSize: '46px', fontStyle: 'bold', fill: '#ff2b2b' }); //tiempo iggy
            //FIN NIVEL 1
            this.blackOverlay = this.add.graphics({ fillStyle: { color: 0x000000 } });
            this.blackOverlay.fillRect(0, 0, this.cameras.main.width, this.cameras.main.height); // Fill the screen with black
            this.blackOverlay.setAlpha(0);
            this.levelCompletedText = this.add.text(480, 200, "LEVEL 1 COMPLETED ", { fontFamily: 'SF Fedora, sans-serif', fontSize: '32px', fill: '#ff0000' }).setOrigin(0.5);
            this.levelCompletedText.setVisible(false);
            //  Collide the player and the cherrys with the platforms
            this.physics.add.collider(player, platforms);
            this.physics.add.collider(cherrys, platforms);
            this.physics.add.collider(knives, platforms);
            this.physics.add.collider(iggys, platforms);

            //  Checks to see if the player overlaps with any of the cherrys, if he does call the collectCherry function
            this.physics.add.overlap(player, cherrys, collectCherry, null, this);

            this.physics.add.overlap(player, iggys, collectIggy, null, this);

            this.physics.add.collider(player, knives, hitKnife, null, this);
            
            this.escKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC); //pause game
            
        }
    update ()
        {
        if(player_is_dead){
            return;
        }
            
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
                
                if (modelo === 1) {
                    player.anims.play('saltoi', true);  //JOTARO
                } else {
                    player.anims.play('saltod', true);  //DIO
                }
            }
            
            if (Phaser.Input.Keyboard.JustDown(this.escKey)) {
                this.scene.launch('PauseScene'); // Open pause menu
                this.scene.pause(); // Pause game
            }

        if (knifeCounter === 4 && !Level2){
            this.levelUp();
        }
        if (knifeCounter === 1 && Level2 === true){
            this.gameEnded();
        }
    }
    levelUp() {
        knifeCounter = 0;
        //Cambia Musica
        this.musicaN1.pause();
        this.musicaN1 = this.sound.add('musicaN2');  // Change the source of musicaN1 to musicaN2's source
        this.musicaN1.play();
        //KNIFES
        knives.clear(true, true);
        
        this.playerInputEnabled = false;
        player.setPosition(100, 450);

        this.tweens.add({
            targets: this.blackOverlay,
            alpha: 1,  // Fade to a fully visible black screen
            duration: 100,  // Duration of the fade in
            ease: 'Power2'
        });
        this.levelCompletedText.setVisible(true);

        setTimeout(() => {
            this.levelCompletedText.setVisible(false);
            //FONDO
            this.background.setTexture('nivel2');
            //PLATFORM
            platforms.children.iterate(function (platform) {
                platform.disableBody(true, true);
            });
            platforms.create(0, 525, 'ground');
            platforms.create(400, 525, 'ground');
            platforms.create(800, 525, 'ground');

            platforms.create(470, 380, 'ground');

            platforms.create(-10, 300, 'ground');
            platforms.create(1000, 300, 'ground');

            platforms.create(470, 180, 'ground');

            player.setPosition(100, 450);
            //TEXTO
            this.levelText.setText("Level: 2 "); 
            this.playerInputEnabled = true;
            this.tweens.add({
                targets: this.blackOverlay,
                alpha: 0,  // Fade back to invisible
                duration: 1800,  // Duration of the fade out
                ease: 'Power2'
            });
            this.playerInputEnabled = true; 
            Level2 = true;
        }, 2000);
    }
    gameEnded() {
        // Pause the game world
        this.physics.world.isPaused = true;
        this.scene.start('VictoryS');
    
    }
}

// PAUSA
class PauseScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PauseScene' });
    }

    preload() {
        this.load.image('jojopausa', 'assets/jojopausa.gif');
        this.load.image('diopausa', 'assets/diopausa.png');
    }

    create() {
        const graphics = this.add.graphics();
        graphics.fillStyle(0xd400ff, 1);
        graphics.fillRect(230, 94, 500, 350);
        
        this.add.text(420, 100, 'GAME PAUSED ', { fontFamily: 'SF Fedora, sans-serif', fontStyle: 'bold', fontSize: '36px', fill: '#fff' });
        
        // Opción para reanudar
        this.add.text(500, 190, 'Resume ', { fontFamily: 'SF Fedora, sans-serif', fontSize: '28px', fill: '#fff' })
            .setInteractive()
            .on('pointerdown', () => {
                this.scene.resume('GameScene'); // Reanudar el juego
                this.scene.stop(); // Detener la escena de pausa
            });

        // Opción para activar o desactivar música
        this.musicaN1 = this.scene.get('GameScene').musicaN1;
        let musicButtonText = this.musicaN1.isPlaying ? 'ON ' : 'OFF ';

        this.add.text(480, 230, 'Music: ', { fontFamily: 'SF Fedora, sans-serif', fontSize: '28px', fill: '#fff'});
        let musicButton = this.add.text(580, 230, musicButtonText, { 
            fontFamily: 'SF Fedora, sans-serif', 
            fontSize: '28px', 
            fill: '#ff0'
        })
        .setInteractive()
        .on('pointerdown', () => {
            if (this.musicaN1.isPlaying) {
                this.musicaN1.pause();
                musicButton.setText('OFF ');
            } else {
                this.musicaN1.resume();
                musicButton.setText('ON ');
            }
        });

        // Opción para volver al menú principal
        this.add.text(450, 340, 'Back to Menu ', { fontFamily: 'SF Fedora, sans-serif', fontSize: '28px', fill: '#ff0' })
            .setInteractive()
            .on('pointerdown', () => {
                exitGame();
            });

        if (modelo === 1) {
            this.add.image(345, 294, 'jojopausa');
        } else {
            this.add.image(345, 295, 'diopausa');
        }

        this.escKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC); // Tecla ESC para pausar el juego
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.escKey)) {
            this.scene.resume('GameScene'); // Reanudar el juego
            this.scene.stop(); // Detener la escena de pausa
        }
    }
}

//VICTORY ROYALE
class VictoryS extends Phaser.Scene {
    constructor() {
        super({ key: 'VictoryS' });
    }

    preload() {
        this.load.audio('jojoMusicW', 'sonidos/jojoWIN.mp3');
        this.load.audio('dioMusicW', 'sonidos/dioWIN.mp3');
        this.load.spritesheet('jojoWIN', 'assets/jojoWIN.png', {frameWidth: 959, frameHeight: 556});
        this.load.spritesheet('dioWIN', 'assets/dioWIN.png', {frameWidth: 959, frameHeight: 556});
        this.load.image('jojopose', 'assets/jojopose.gif');
        this.load.image('diopose', 'assets/diopose.gif');
    }

    create() {
        this.anims.create({
            key: 'jojoWIN',
            frames: this.anims.generateFrameNumbers('jojoWIN', { start: 0, end: 23}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'dioWIN',
            frames: this.anims.generateFrameNumbers('dioWIN', { start: 0, end: 7}),
            frameRate: 10,
            repeat: -1
        });

        let scene = game.scene.keys['GameScene'];
        scene.musicaN1.stop(); //pause la musica del nivel

        if (modelo === 1) {
            this.jojoMusicW = this.sound.add('jojoMusicW');
            this.jojoMusicW.play();
            const jojoWIN = this.add.sprite(0, 0, 'jojoWIN').play('jojoWIN').setOrigin(0,0);
            const graphics = this.add.graphics();
            graphics.fillStyle(0x5343e7, 1);
            graphics.fillRect(660, 0, 300, 538);

            if (playerName.length === 4) {
                this.add.text(765, 115, '¡' + playerName + '! ', { fontFamily: 'SF Fedora, sans-serif', fontSize: '30px', fill: '#ff23da' });
            } else if (playerName.length === 5) {
                this.add.text(755, 115, '¡' + playerName + '! ', { fontFamily: 'SF Fedora, sans-serif', fontSize: '30px', fill: '#ff23da' });
            } else if (playerName.length === 6) {
                this.add.text(745, 115, '¡' + playerName + '! ', { fontFamily: 'SF Fedora, sans-serif', fontSize: '30px', fill: '#ff23da' });
            } else if (playerName.length === 7) {
                this.add.text(735, 115, '¡' + playerName + '! ', { fontFamily: 'SF Fedora, sans-serif', fontSize: '30px', fill: '#ff23da' });
            } else if (playerName.length === 8) {
                this.add.text(730, 115, '¡' + playerName + '! ', { fontFamily: 'SF Fedora, sans-serif', fontSize: '30px', fill: '#ff23da' });
            }

            this.add.text(710, 20, '¡VICTORY! ', { fontFamily: 'SF Fedora, sans-serif', fontSize: '40px', fill: '#ff23da' });
            this.add.text(680, 75, 'Congratulations ', { fontFamily: 'SF Fedora, sans-serif', fontSize: '30px', fill: '#ff23da' });
            this.add.text(710, 350, 'Total score: \n' + score + ' ', { fontFamily: 'SF Fedora, sans-serif', fontSize: '30px', fill: '#ff23da' });
            this.add.image(810, 250, 'jojopose').setScale(0.75);

            this.add.text(700, 450, 'Back to Menu ', { fontFamily: 'SF Fedora, sans-serif', fontSize: '28px', fill: '#fff' })
            .setInteractive()
            .on('pointerdown', () => {
                saveRecord(playerName, score);
                this.jojoMusicW.stop();
                exitGame();
            });
        } else {
            this.dioMusicW = this.sound.add('dioMusicW');
            this.dioMusicW.play();
            const dioWIN = this.add.sprite(0, 0, 'dioWIN').play('dioWIN').setOrigin(0,0);
            const graphics = this.add.graphics();
            graphics.fillStyle(0xfffe00, 1);
            graphics.fillRect(660, 0, 300, 538);

            if (playerName.length === 4) {
                this.add.text(765, 115, '¡' + playerName + '! ', { fontFamily: 'SF Fedora, sans-serif', fontSize: '30px', fill: '#53ab52' });
            } else if (playerName.length === 5) {
                this.add.text(755, 115, '¡' + playerName + '! ', { fontFamily: 'SF Fedora, sans-serif', fontSize: '30px', fill: '#53ab52' });
            } else if (playerName.length === 6) {
                this.add.text(745, 115, '¡' + playerName + '! ', { fontFamily: 'SF Fedora, sans-serif', fontSize: '30px', fill: '#53ab52' });
            } else if (playerName.length === 7) {
                this.add.text(735, 115, '¡' + playerName + '! ', { fontFamily: 'SF Fedora, sans-serif', fontSize: '30px', fill: '#53ab52' });
            } else if (playerName.length === 8) {
                this.add.text(730, 115, '¡' + playerName + '! ', { fontFamily: 'SF Fedora, sans-serif', fontSize: '30px', fill: '#53ab52' });
            }

            this.add.text(710, 20, '¡VICTORY! ', { fontFamily: 'SF Fedora, sans-serif', fontSize: '40px', fill: '#53ab52' });
            this.add.text(680, 75, 'Congratulations ', { fontFamily: 'SF Fedora, sans-serif', fontSize: '30px', fill: '#53ab52' });
            this.add.text(710, 350, 'Total score: \n' + score + ' ', { fontFamily: 'SF Fedora, sans-serif', fontSize: '30px', fill: '#53ab52' });
            this.add.image(807, 250, 'diopose').setScale(0.75);

            this.add.text(700, 450, 'Back to Menu ', { fontFamily: 'SF Fedora, sans-serif', fontSize: '28px', fill: '#000' })
            .setInteractive()
            .on('pointerdown', () => {
                saveRecord(playerName, score);
                this.dioMusicW.stop();
                exitGame();
            });
        }
    }
}

//GAMEOVER
class GameOverS extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverS' });
    }

    preload() {
        this.load.atlas('dioL', 'assets/dioL.png', 'assets/dioLsprites.json');
        this.load.atlas('jojoL', 'assets/jojoL.png', 'assets/jojoLsprites.json');
        this.load.audio('muerte', 'sonidos/gameover.mp3');
    }

    create() {
        this.muerte = this.sound.add('muerte');
        this.muerte.play();

        this.anims.create({
            key: 'dioL',
            frames: this.anims.generateFrameNames('dioL', { prefix: 'dioL', end: 13, zeroPad: 4}),  //DIO
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'jojoL',
            frames: this.anims.generateFrameNames('jojoL', { prefix: 'jojoL', end: 8, zeroPad: 4}),  //DIO
            frameRate: 10,
            repeat: -1
        });

        if (modelo === 1) {
            const jojoSprite = this.add.sprite(460, 240, 'jojoL').play('jojoL').setScale(1.5);
        } else {
            const dioSprite = this.add.sprite(475, 240, 'dioL').play('dioL').setScale(1.5);
        }
        
        this.add.text(280, 40, 'Game Over ', { fontFamily: 'SF Fedora, sans-serif', fontSize: '70px', fill: '#ff23da' });
        this.add.text(340, 360, 'Total score: ' + score + ' ', { fontFamily: 'SF Fedora, sans-serif', fontSize: '30px', fill: '#ff23da' });

        // Opción para reanudar
        this.add.text(365, 420, 'Back to Menu ', { fontFamily: 'SF Fedora, sans-serif', fontSize: '28px', fill: '#fff' })
            .setInteractive()
            .on('pointerdown', () => {
                this.muerte.stop();
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
        scene: [GameScene, PauseScene, VictoryS, GameOverS] //escenas en el juego (menu,juego)
    });
};

var player;
var cherrys;
var iggys;
var knives;
var platforms;
var cursors;
var score;
var gameOver = false;
var scoreText;
var life;
var plus;
var itemTime;
let playerName = '';
var player_is_dead = false;
var iggyTimer = null;

function collectIggy (player, iggy) {
    iggy.destroy(); // Elimina a Iggy cuando el jugador lo toca
    score += 50; // Aumenta el puntaje

    if (this.iggyTimer) {
        this.iggyTimer.remove(); // eliminar temp
        this.iggyTimer = null;
    }

    if (modelo === 1) {
        player.setTint(0x659df7);
        this.jojoSpecial.play();
    } else {
        player.setTint(0x5bf502);
        this.dioSpecial.play();
    }

    plus = true;
    
    this.time.delayedCall(5000, () => { 
        player.clearTint();
        plus = false;
    }, [], this);
    
    scoreText.setText(score + ' ');

    itemTime.setText(' ');
}


function collectCherry (player, cherry)
{
    cherry.disableBody(true, true);

    //  Add and update the score

    if (modelo === 1) {
        this.jojopick.play();
    } else {
        this.diopick.play();
    }

    if (plus === true) {
        score += 20;
    } else {
        score += 10;
    }

    scoreText.setText(score + ' ');
    //let rand = Math.floor(Math.random() * 15);
    if (cherrys.countActive(true) === 10) {
        let pos = [[650, 320], [200, 220], [775, 190], [200, 480], [500, 480], [800, 480]]; 
        let random = Math.floor(Math.random() * 6); 

        var iggy = iggys.create(pos[random][0], pos[random][1],'iggy');
        iggy.anims.play('iggy');
        this.bark.play();

        let count = 5;
        itemTime.setText(count.toString() + ' '); 
        
        // eliminar temp antes de crear uno nuevo
        if (this.iggyTimer) {
            this.iggyTimer.remove();
        }

        this.iggyTimer = this.time.addEvent({
            delay: 1000, // 1 segundo
            repeat: count - 1, // 5 veces
            callback: () => {
                count--;
                itemTime.setText(count.toString() + ' ');

                if (count === 0) {
                    iggy.destroy();
                    itemTime.setText(' ');
                    this.iggyTimer = null; // referencia temp
                }
            }
        });
               
    }

    //let rand = Math.floor(Math.random() * 15);
    if (cherrys.countActive(true) === 10) {
        let pos = [[650, 320], [200, 220], [775, 190], [200, 480], [500, 480], [800, 480]]; 
        let random = Math.floor(Math.random() * 6); 

        var iggy = iggys.create(pos[random][0], pos[random][1],'iggy');
        iggy.anims.play('iggy');
        this.bark.play();

        let count = 5;
        itemTime.setText(count.toString() + ' '); 
        
        // eliminar temp antes de crear uno nuevo
        if (this.iggyTimer) {
            this.iggyTimer.remove();
        }

        this.iggyTimer = this.time.addEvent({
            delay: 1000, // 1 segundo
            repeat: count - 1, // 5 veces
            callback: () => {
                count--;
                itemTime.setText(count.toString() + ' ');

                if (count === 0) {
                    iggy.destroy();
                    itemTime.setText(' ');
                    this.iggyTimer = null; // referencia temp
                }
            }
        });
               
    }

    if (cherrys.countActive(true) === 0)
    {
        //  A new batch of cherrys to collect
        cherrys.children.iterate(function (child) {

            child.enableBody(true, child.x, 0, true, true);

        });

        var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

        knifeCounter++;
        var knife = knives.create(x, 16, 'knife');
        knife.setBounce(1);
        knife.setCollideWorldBounds(true);
        knife.setVelocity(Phaser.Math.Between(-200, 200), 20);
        knife.allowGravity = false;

        knife.setAngularVelocity(Phaser.Math.Between(-200, 200)); //hace que el cuchillo rote
    }
}

function hitKnife (player, knife)
{
    if (player.invulnerable || life <= 0) {
        return; // Si el jugador es invulnerable, no hacer nada
    }

    let scene = game.scene.keys['GameScene'];
    player.invulnerable = true; // Activar invulnerabilidad temporal
    player.setTint(0xff0000);
    life--;
    if (life === 2) {
        scene.heart3.setVisible(false);
    } else if (life === 1) {
        scene.heart2.setVisible(false);
    }
    if (life === 0) {
        player.setTint(0xff0000);
        scene.heart1.setVisible(false);
        player_is_dead = true;
        this.musicaN1.stop();
        this.musicaN2.stop();
    
        if (modelo === 1) {
            this.jojodmg.play();
        } else {
            this.diodmg.play();
        }

        this.physics.pause();
        player.anims.play('daño');
        saveRecord(playerName, score);
        this.time.delayedCall(1000, () => {
            this.scene.start('GameOverS');
        });
    } else {
        this.knife.play();
        player.setAlpha(0.5);
        this.time.delayedCall(1000, () => { 
            player.clearTint();
            player.setAlpha(1);
            player.invulnerable = false; // Restaurar vulnerabilidad después de 1 segundo
        }, [], this);
    }
}
//Guardar records
function saveRecord(name, score) {
    let records = JSON.parse(localStorage.getItem("gameRecords")) || [];
    const date = new Date().toLocaleDateString('es-MX'); // Fecha actual en formato YYYY-MM-DD

    // Convertir el nombre a minúsculas para evitar duplicados con diferente capitalización
    const normalizedName = name.toLowerCase();

    // Buscar si el nombre ya existe en los registros 
    let existingRecord = records.find(record => record.name.toLowerCase() === normalizedName);

    if (!existingRecord || score > existingRecord.score) {
        records = records.filter(record => record.name.toLowerCase() !== normalizedName); 
        records.push({ name, score, date });
        records.sort((a, b) => b.score - a.score); // Ordenar de mayor a menor
        records = records.slice(0, 10); // Mantener solo los 10 mejores

        localStorage.setItem("gameRecords", JSON.stringify(records));
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
function prepareGame() {
    const menuContainer = document.getElementById('menuContainer');
    menuContainer.innerHTML = ''; // Vaciar el HTML

    menuContainer.style.display = 'grid'; // Usamos grid para un diseño organizado
    menuContainer.style.gridTemplateColumns = '1fr'; // Una columna
    menuContainer.style.gridGap = '20px'; // Espaciado entre elementos

    // Título principal
    const title = document.createElement('h2');
    title.textContent = 'Name';
    menuContainer.appendChild(title);

    // Area de texto para el alias
    const alias = document.createElement('textarea');
    alias.rows = 1;
    alias.cols = 20;
    alias.placeholder = 'insert alias';
    menuContainer.appendChild(alias);

    // Segundo título
    const title2 = document.createElement('h2');
    title2.textContent = 'Choose';
    menuContainer.appendChild(title2);

    // Canvas
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 200;
    canvas.id = "myCanvas";
    canvas.style.backgroundColor = "lightblue";
    menuContainer.appendChild(canvas);

    // Obtener contexto para el canvas
    const ctx = canvas.getContext('2d');
    canvas.addEventListener('dragover', function (e) {
        e.preventDefault(); 
        e.dataTransfer.dropEffect = 'move';
    });
    canvas.addEventListener('drop', function (e) {
        e.preventDefault();
        // Obtener la posición del mouse dentro del canvas
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Obtener la fuente de la imagen arrastrada
        const imgSrc = e.dataTransfer.getData('image');

        // Dibujar la imagen en el canvas
        const imgElement = new Image();
        imgElement.src = imgSrc;
        imgElement.onload = function() {
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas antes de dibujar
            ctx.drawImage(imgElement, mouseX - 50, mouseY - 50, 100, 100); // Dibujar imagen en la posición
            console.log('Dropped image source:', imgSrc);

            if (imgSrc === 'http://localhost:880/assets/dio-panel.gif') {
                modelo = 2;
            } else if (imgSrc === 'http://localhost:880/assets/jojo-panel.gif') {
                modelo = 1;
            }
        };
    });
    const start = document.createElement('button'); //comenzar juego
    const onlyLetters = /^[A-Za-z]+$/; // Regex for only letters
    start.textContent = 'START';
    start.onclick = () => {
        if (modelo === 0) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please select a character before starting the game!",
                background: '#58deff',
            });
        }else 
        if (alias.value.length > 8 || alias.value.length < 4){
            Swal.fire({
                icon: "error",
                title: "Invalid Alias",
                text: "The alias must be between 4 and 8 characters!",
                background: '#58deff',
            });
        }else
        if(!onlyLetters.test(alias.value)){
            Swal.fire({
                icon: "error",
                title: "Invalid Alias",
                text: "Only letters are allowed in the alias!",
                background: '#58deff',
            });
        }
        else {
            startGame()
        }
    };

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
function records() {
    const recordsP = JSON.parse(localStorage.getItem("gameRecords")) || [];

    const menuContainer = document.getElementById('menuContainer');
    menuContainer.innerHTML = ''; // Limpiar pantalla

    const title = document.createElement('h1');
    title.textContent = 'Records';

    // Crear la tabla
    const table = document.createElement('table');
    table.id = 'recordsTable'; // ID para aplicar estilos en CSS

    // Crear encabezados
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    ['#', 'Name', 'Score', 'date'].forEach(text => {
        const th = document.createElement('th');
        th.textContent = text;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Crear cuerpo de la tabla
    const tbody = document.createElement('tbody');
    recordsP.forEach((record, index) => {
        const row = document.createElement('tr');

        // Columnas
        const numberCell = document.createElement('td');
        numberCell.textContent = index + 1;

        const nameCell = document.createElement('td');
        nameCell.textContent = record.name;

        const scoreCell = document.createElement('td');
        scoreCell.textContent = record.score;

        const dateCell = document.createElement('td');
        dateCell.textContent = record.date;

        // Agregar celdas a la fila
        row.appendChild(numberCell);
        row.appendChild(nameCell);
        row.appendChild(scoreCell);
        row.appendChild(dateCell);
        tbody.appendChild(row);
    });

    table.appendChild(tbody);

    const backButton = document.createElement('button');
    backButton.textContent = 'Back to Menu';
    backButton.onclick = () => location.reload();

    menuContainer.appendChild(title);
    menuContainer.appendChild(table);
    menuContainer.appendChild(backButton);
}

//ayuda
function help(){
    const menuContainer = document.getElementById('menuContainer');
    menuContainer.innerHTML = ''; 

    const title = document.createElement('h2');
    title.textContent = 'Help Page';

    const subTitle = document.createElement('h3');
    subTitle.textContent = 'Objetive';

    const description = document.createElement('p');
    description.innerHTML = 'Dodge your nemesis\'s relentless attacks with skill and precision,<br> allowing you to survive long enough to find an opportunity to strike back.<br> Only by outmaneuvering and outlasting your foe will you be <br> able to defeat him and ultimately accomplish your objectives.';    const helpContainer = document.createElement('div');
    helpContainer.style.display = 'flex';
    helpContainer.style.alignItems = 'center'; 

    const movementImg = document.createElement('img');
    movementImg.src = 'assets/movement-help.png';
    movementImg.alt = 'movement-help';
    movementImg.style.width = '300px'; 

    const pauseImg = document.createElement('img');
    pauseImg.src = 'assets/pause-help.png';
    pauseImg.alt = 'pause-help';
    pauseImg.style.width = '100px'; 

    const backButton = document.createElement('button');
    backButton.textContent = 'Back to Menu';
    backButton.onclick = () => location.reload();

    //appendChild
    menuContainer.appendChild(title);
    menuContainer.appendChild(subTitle);
    menuContainer.appendChild(description);
    helpContainer.appendChild(pauseImg);
    helpContainer.appendChild(movementImg);
    document.getElementById('menuContainer').appendChild(helpContainer);
    menuContainer.appendChild(backButton);
}
//creditos
function credits(){
    const menuContainer = document.getElementById('menuContainer');
    menuContainer.innerHTML = ''; 

    const title = document.createElement('h1');
    title.textContent = 'Credits';

    const textb = document.createElement('h3');
    textb.textContent = 'Tecnologías Web\n\nIntegrantes:';
    textb.style.whiteSpace = 'pre-line';

    // Lista de integrantes con imágenes
    const integrantes = [
        { nombre: "Richard Allen Campos Acero", img: "assets/richard.jpg" },
        { nombre: "Christopher Martínez González", img: "assets/Chris.jpg" },
        { nombre: "Dario Miguel Moreno González", img: "assets/Dario.jpg" }
    ];

    const integrantesContainer = document.createElement('div');
    integrantesContainer.id = "team";
    integrantes.forEach(integrante => {
        const integranteDiv = document.createElement('div');

        const img = document.createElement('img');
        img.src = integrante.img;
        img.alt = integrante.nombre;

        const name = document.createElement('p');
        name.textContent = integrante.nombre;

        integranteDiv.appendChild(img);
        integranteDiv.appendChild(name);
        integrantesContainer.appendChild(integranteDiv);
    });

    // Fecha
    const fecha = document.createElement('p');
    fecha.textContent = 'Fecha: 14/03/2025';

    const backButton = document.createElement('button');
    backButton.textContent = 'Back to Menu';
    backButton.onclick = () => location.reload();

    // appendChild
    menuContainer.appendChild(title);
    menuContainer.appendChild(textb);
    menuContainer.appendChild(integrantesContainer);
    menuContainer.appendChild(fecha);
    menuContainer.appendChild(backButton);
}