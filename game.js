function load_images() {
    // load the images of player , corona , gem
    
    enemy_image = new Image;
    enemy_image.src = "Assets/virus.png";
    
    player_img  = new Image;
    player_img.src = "Assets/player.png";
    
    gem_image   = new Image;
    gem_image.src ="Assets/gem.jpg";
}

function init() {
    // define the objects of the game
    
    canvas = document.getElementById("mycanvas");
    
    console.log(canvas);
    H = 800 ;
    W = 1200 ;
    canvas.height = H;
    canvas.width = W;
    game_status = false;
    
    // create a context
    pen = canvas.getContext('2d');
    console.log(pen);
    
    e1 = {
      x : 150 ,
      y : 50 ,
          h : 60 ,
        w : 60  ,
        speed : 20
    };
    e2 = {
      x : 325 ,
      y : 30 ,
          h : 60 ,
        w : 60  ,
        speed : 30
    };
    e3 = {
      x : 500 ,
      y : 260 ,
          h : 60 ,
        w : 60  ,
        speed : 40
    };
    
    enemy = [e1,e2,e3];
    
    player = {
        x : 20,
        y : H/2,
        w : 60,
        h : 60,
        speed : 20 ,
        moving : false,
        health : 100
    }
    gem = {
        x : W -100,
        y : H/2,
        w : 60,
        h : 60
        
    };
    
    // add event listeners to ove the player
    
    canvas.addEventListener('mousedown',function(){
        console.log("mouse pressed");
        player.moving = true;
    });
    canvas.addEventListener('mouseup',function(){
        console.log("mouse up");
        player.moving = false;
    });
}
function collision(rect1,rect2){
    if (rect1.x < rect2.x + rect2.w && rect1.x + rect1.w > rect2.x && rect1.y < rect2.y + rect2.h && rect1.y + rect1.h > rect2.y) {
    return true;
    }
    return false;
}
function update() {
    // clear the old screen
    pen.clearRect(0,0,H,W);
    
    //pen.fillStyle = "green";
    //pen.fillRect( box.x,box.y,box.h,box.w);
    //pen.drawImage(enemy_image , box.x,box.y,box.h,box.w);
    
    // draw the player image
    
    pen.drawImage(player_img,player.x,player.y,player.w, player.h);
    
    //draw the gem image 
    pen.drawImage(gem_image,gem.x,gem.y,gem.w,gem.h);
    
    // move the player
    if(player.moving == true){
        player.x += player.speed;
        player.health += 20;
    }
    
    if(collision(player,gem)){
        console.log("you won");
        alert("you won");
        game_status = true;
    }
    for(let i=0;i<enemy.length; i++){
        if(collision(player,enemy[i])){
            player.health -= 40;
            if(player.health <0){
                game_status == true;
                alert("you lost "+ player.health);
                
            }
        }
    }
    
    for(let i=0;i<enemy.length;i++){
        pen.drawImage(enemy_image , enemy[i].x,enemy[i].y,enemy[i].h,enemy[i].w);
    }
    
    
}

function draw() {
    
    // move the box downwards
//    box.y += box.speed;
//    
//    if(box.y >= H - box.h || box.y <0){
//        box.speed *= -1;
//    }
    
    
    // update the enemy with the same logic
    for(let i =0 ;i<enemy.length;i++){
        enemy[i].y += enemy[i].speed;
        
        if(enemy[i].y >= H - enemy[i].h  ||  enemy[i].y< 0 ){
            enemy[i].speed *= -1;
        }
    }
    
    pen.fillStyle = "white";
    pen.fillText("score"+player.health,10,10);
    
}



function gameloop() {
    if(game_status == true){
        clearInterval(f);
    }
    update() ;
    draw() ;
    console.log("hihi") ;
    
}

load_images();
init();
var f = setInterval(gameloop,100) ;