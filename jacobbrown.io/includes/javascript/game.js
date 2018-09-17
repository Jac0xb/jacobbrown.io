console.log("Game Loaded");

// X Size,Y Size, ???, DOM element attached to, function hooks.
var game = new Phaser.Game(450, 300, Phaser.AUTO, 'main-game', { preload: preload, create: create, update: update  });

function preload() {
    game.load.image('ground', 'assets/images/game/circle.png');
    game.load.image('background', 'assets/images/game/background.png');
    game.load.image('player', 'assets/images/game/circle.png')
}

var jumpTimer = 0;
var jumpButton;
var growButton;
var shrinkButton;
var playerSize;

function create() {

    //  Arcade physics.
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // Tiled background for game.
    game.add.tileSprite(0, 0, 1920, 1920, 'background');

    // World boundaries.
    game.world.setBounds(0, 0, 900, 300);

    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = game.add.group();
    platforms.enableBody = true;

    new generateWall(0, 0, 18, 1, game, platforms);

    // Create a player object.
    player = game.add.sprite(25, game.world.height - 25, 'player');
    player.anchor.setTo(0.5, 0.5);

    // Create physics for player.
    game.physics.arcade.enable(player);

    // Physics settings.
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;
    player.body.allowRotation = true;
    playerSize = 1.0;

    // Camera follow player.
    game.camera.follow(player);

    // Hook key board inputs to variables.
    cursors = game.input.keyboard.createCursorKeys();

    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    growButton = game.input.keyboard.addKey(Phaser.Keyboard.X);
    shrinkButton = game.input.keyboard.addKey(Phaser.Keyboard.Z);

}

function update() {

    // Check collisions.
    var hitPlatform = game.physics.arcade.collide(player, platforms);

    // Calculating X-Velocity.
    var signBit = 1;
    var normalVelocity = Math.abs(player.body.velocity.x);
    if( player.body.velocity.x < 0 ) { signBit = -1; }
    player.body.velocity.x = (Math.abs(player.body.velocity.x) - Math.abs(player.body.velocity.x)*.1) * signBit;

    // Shrink functionality.
    if (growButton.isDown && playerSize < 10.0)
    {
        player.scale.setTo(playerSize + 0.1, playerSize + 0.1);

        playerSize = playerSize + 0.1;
        player.body.gravity.y = 300 * playerSize;
    }

    // Grow functionality.
    if (shrinkButton.isDown && playerSize > 0.01)
    {
        player.scale.setTo(playerSize - 0.1, playerSize - 0.1);

        playerSize = playerSize - 0.1;

        player.body.gravity.y = 100 + (300 * playerSize);
    }

    // Movement functionality.
    if (cursors.left.isDown)
    {
        //  Move to the left
        player.body.velocity.x = -150;

        //player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        player.body.velocity.x = 150;

        //player.animations.play('right');
    }

    //  Jumping functionality.
    if (jumpButton.isDown && (player.body.touching.down || player.body.onFloor()) && game.time.now > jumpTimer)
    {
        player.body.velocity.y = -300 + (10 * (1/playerSize));
        jumpTimer = game.time.now + 750;
    }




}

function render() {

    game.debug.cameraInfo(game.camera, 32, 32);
    game.debug.spriteCoords(player, 32, 500);

}

function generateSector(sectorNum) {

    sectorNum = sectorNum * 450;


}

class generateWall {

    constructor(xPos, yPos, xScale, yScale, game, group) {

        console.log("plaform created");

        this.group = group;
        this.xPos = xPos;
        this.yPos = yPos;
        this.sprite = game.add.sprite(xPos,yPos, 'ground');

        group.add(this.sprite);


        this.sprite.scale.setTo(xScale,yScale);

    }


}
