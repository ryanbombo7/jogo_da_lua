var chao;
var nave;
var imagem_nave;
var espaco;
var nave2;
var esquerda;
var direita;
var nave_quebrada;
var nave_fly;
var normal;
var rocha;
var seguro;
var temporizador
var vx = 0;
var vy = 0;
var g = 0.05;
var combustivel = 100;

function preload () {
imagem_nave = loadImage ("normal.png");
espaco = loadImage ("bg_sur.png");
nave2 = loadAnimation ("b_thrust_1.png", "b_thrust_2.png", "b_thrust_3.png", "lander.png");
nave_quebrada = loadAnimation ("crash1.png", "crash2.png", "crash3.png");
nave_fly = loadAnimation ("landing1.png", "landing2.png", "landing_3.png");
esquerda = loadAnimation ("left_thruster_1.png", "left_thruster_2.png");
direita = loadAnimation ("right_thruster_1.png", "right_thruster_2.png");
normal = loadAnimation ("normal.png");
rocha = loadImage ("obstacle.png");
seguro = loadImage ("lz.png");
nave2.playing = true;
nave2.looping = false;
nave_fly.looping = false;
nave_quebrada.looping = false;
esquerda.looping = false;
direita.looping = false;
}
function setup () {
createCanvas (1000,700);
frameRate (80);
temporizador = 1500;
nave2.frameDelay = 5;
nave_fly.frameDelay = 5;
nave_quebrada.frameDelay = 10;
esquerda.frameDelay = 5;
nave = createSprite (100,50,30,30);
nave.addImage (imagem_nave);
nave.scale = 0.1;
nave.setCollider ("rectangle", 0,0,200,200);
nave.addAnimation ("nave_fly",nave_fly);
nave.addAnimation ("nave_quebrada",nave_quebrada);
nave.addAnimation ("voando",nave2);
nave.addAnimation ("esquerda",esquerda);
nave.addAnimation ("normal",normal);
nave.addAnimation ("direita",direita);
chao = createSprite (500,690,1000,20);
parede = createSprite (320,530,50,100);
parede.addImage (rocha);
parede.scale = 0.5;
parede.setCollider ("rectangle",0,100,300,300);
base = createSprite (880,610,50,30);
base.addImage (seguro);
base.scale = 0.3;
base.setCollider ("rectangle",0,180,400,100);
rectMode (CENTER);
textSize (15);
}
function draw () {
    background (51);
    image (espaco,0,0);
    push ();
    fill (255);
    text ("velocidade horizontal: "+round (vx,2),800,50);
    text ("combustivel: "+combustivel,800,25);
    text ("velocidade vertical: "+round (vy),800,75);
    pop ();
    vy += g;
    nave.position.y += vy;
    nave.position.x += vx;
    if (nave.collide (parede)==true) {
      nave.changeAnimation ('nave_quebrada');
      stop ();
    }
    var d = dist (nave.position.x,nave.position.y,base.position.x,base.position.y);
    if (d <= 15) {
      vx = 0;
      vy = 0;
      g = 0;
      nave.changeAnimation ("nave_fly");
      nave.x = 880;
      nave.y = 620;
    }
    drawSprites ();
}
function keyPressed () {
    if (keyCode == UP_ARROW && combustivel > 0) {
      pracima ();
      nave.changeAnimation ("voando");
      nave2.nextFrame ();
    }
    if (keyCode == RIGHT_ARROW && combustivel > 0) {
        pradireita ();
        nave.changeAnimation ("esquerda");
      }
    if (keyCode == LEFT_ARROW && combustivel > 0) {
        praesquerda ();
        nave.changeAnimation ("direita");
      }
}
function pracima () {
  vy = -1;
  combustivel -= 1;
}
function praesquerda () {
  vx -= 0.2;
  combustivel -= 1;
}
function pradireita () {
  vx += 0.2;
  combustivel -= 1;
}
function stop () {
  vx = 0;
  vy = 0;
  g = 0;
  combustivel = 0;
}