// ******JUEGO******
let modelo = 0; //si es 1 usa jojo, 2 dio
class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' }); //no funciona sin esto
    }
    
    preload ()
        {
            //imagenes
            this.load.image('nivel1', 'assets/nivel1.png');
            this.load.image('ground', 'assets/platform.png');
            this.load.image('cherry', 'assets/cherry.png');
            this.load.image('knife', 'assets/knife.png');
            this.load.atlas('iggy', 'assets/iggy.png', 'assets/iggysprites.json');

            //sonidos
            this.load.audio('musicaN1', 'sonidos/nivel1.mp3');
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
            this.add.image(480, 269, 'nivel1');

            //música nivel
            this.musicaN1 = this.sound.add('musicaN1');
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

            
            let colorTexto = modelo === 1 ? '#9400ff' : '#fbff11'; 
            // The score
            scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: colorTexto });
            lifeText = this.add.text(260, 16, 'life: 3', { fontSize: '32px', fill: colorTexto });
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
var lifeText;
let playerName = '';
var player_is_dead = false;
var iggyAp = false;

function collectIggy (player, iggy) {
    iggy.destroy(); // Elimina a Iggy cuando el jugador lo toca
    score += 50; // Aumenta el puntaje

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
    
    scoreText.setText('Score: ' + score);
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

    scoreText.setText('Score: ' + score);

    let rand = Math.floor(Math.random() * 15);
    if (cherrys.countActive(true) === rand && iggyAp === false) {
        iggyAp = true;
        let pos = [[650, 320], [200, 220], [775, 190], [200, 480], [500, 480], [800, 480]]; 
        let random = Math.floor(Math.random() * 6); 

        var iggy = iggys.create(pos[random][0], pos[random][1],'iggy');
        iggy.anims.play('iggy');
        this.bark.play();
        setTimeout(() => {
            iggy.destroy(); // iggy desaparece
        }, 5000);
    }

    if (cherrys.countActive(true) === 0)
    {
        iggyAp = false;
        //  A new batch of cherrys to collect
        cherrys.children.iterate(function (child) {

            child.enableBody(true, child.x, 0, true, true);

        });

        var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

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

    player.invulnerable = true; // Activar invulnerabilidad temporal
    player.setTint(0xff0000);
    life--;
    lifeText.setText('Life: ' + life);
    if (life === 0) {
        player_is_dead = true;
        this.musicaN1.stop();
    
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

function saveRecord(name, score) {
    let records = JSON.parse(localStorage.getItem("gameRecords")) || [];

    // Guardar solo si el puntaje es mayor al mínimo registrado o si hay menos de 5 récords
    records.push({ name, score });
    records.sort((a, b) => b.score - a.score); // Ordenar de mayor a menor
    records = records.slice(0, 10); // Mantener solo los 5 mejores

    localStorage.setItem("gameRecords", JSON.stringify(records));
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
    start.textContent = 'START';
    start.onclick = () => {
        if (modelo === 0) {
            alert('Please select a character before starting the game!');
        } else {
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
    ['#', 'Name', 'Score'].forEach(text => {
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

        // Agregar celdas a la fila
        row.appendChild(numberCell);
        row.appendChild(nameCell);
        row.appendChild(scoreCell);

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

    const backButton = document.createElement('button');
    backButton.textContent = 'Back to Menu';
    backButton.onclick = () => location.reload();

    //appendChild
    menuContainer.appendChild(title);
    menuContainer.appendChild(backButton);
}
//creditos
function credits(){
    const menuContainer = document.getElementById('menuContainer');
    menuContainer.innerHTML = ''; 

    const title = document.createElement('h1');
    title.textContent = 'Credits';

    const textb = document.createElement('h3');
    textb.textContent = 'Tecnologías Web\nIntegrantes:';
    textb.style.whiteSpace = 'pre-line';

    // Lista de integrantes con imágenes
    const integrantes = [
        { nombre: "Richard Allen Campos Acero", img: "assets/richard.jpg" },
        { nombre: "Christopher Martínez González", img: "assets/chris.jpg" },
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