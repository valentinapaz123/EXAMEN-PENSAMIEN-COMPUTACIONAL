let estado = 0;

//POSICION JUGADOR
let jugadorX = 60;
let jugadorY = 60;

//MUSICA 
let sonido;
let sonidoVictoria;

function preload() {
  sonido = loadSound("tick.mp3");
  sonidoVictoria = loadSound("victoria.mp3"); 
}

function setup() {
  createCanvas(800,600);

  nuevaMeta();
}

//ESTADOS 0, 1, 2
function draw() {

  //ESTADO 0
  if(estado == 0){
    pantallaInicio();
  }
// ESTADO 1
  else if(estado == 1){
    jugar();
  }
// ESTADO 2
  else if(estado == 2){
    pantallaFinal();
    }
  }
//PANTALLA INICIO ESTADO = 0
function pantallaInicio(){

  background(0);

  for(let x = 0; x < width; x += 60){

    for(let y = 0; y < height; y += 60){

//CUADRADOS AZULES
     if(y < 200){
        fill(0,0,255);
        noStroke();
        rect(x, y, 20, 20);
      }
//CIRCULOS ROJOS
      else if(y < 400){  
        fill(255,0,0);
        noStroke();
        ellipse(x, y, 20);
      }
//CUADRADOS AMARILLOS
      else{
        fill(255,255,0);
        noStroke();
        rect(x, y, 20, 20);
      }
    }
  }

//TEXTO 
  textAlign(CENTER);

  fill(255)
  textSize(40);
  text("LABERINTO BAUHAUS",width/2,220);

  textSize(22);
  text("Presiona ENTER para empezar",width/2,300);

   textSize(10);
  text("JUEGA CON LAS FLECHAS PARA MOVERTE ↑←↓→",width/2,400); 
}

//ESTO APARECE EN LOS ESTADOS, DENTRO DE JUGAR APARECE TODO ESTO DURANTE EL JUEGO
function jugar(){

  dibujarMuros();

  dibujarMeta();

  dibujarJugador();

  comprobarMeta();

}

//LABERINTO
function dibujarMuros(){

  background(255);

  // marco 
  fill(0);
  noStroke();
  rect(0,0,800,20);
  rect(0,0,20,600);
  rect(780,0,20,600);
  rect(0,580,800,20);

  // interior

  fill(0);
  rect(20, 120, 600, 20);
  rect(120, 120, 20, 300);
  rect(120, 400, 300, 20);
  rect(400, 200, 20, 220);
  rect(200, 200, 220, 20);
  rect(500, 300, 200, 20);
  rect(500, 300, 20, 200);
  rect(620, 420, 80, 20);

  fill(255,0,0);
  ellipse(200, 260, 60, 60);
  
  fill(0,0,255);
  rect(350, 260, 40, 40);

  fill(255,220,0);
  ellipse(600, 200, 90, 90);
}

//JUGADOR
function dibujarJugador(){

  stroke(0);
  strokeWeight(4);
  fill(220,0,0);
  rect(jugadorX, jugadorY, 30, 30);

}

//CUADRADO META 
//INICIA EL JUEGO CON RANDOM
function nuevaMeta(){

  metaX = random(50,730);

  metaY = random(50,530);

}
//DIBUJA LA META CON TEXTO
function dibujarMeta(){

  stroke(0);
  strokeWeight(4);

  fill(255,220,0);
  rect(metaX, metaY, 30, 30);

  // TEXTO DENTRO DEL CUADRADO
  fill(0);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(8);
  text("META", metaX + 15, metaY + 15);

  
}

//PASAR A LA PANTALLA FINAL
function comprobarMeta(){
  if(dist(jugadorX,jugadorY,metaX,metaY)<20){
    estado = 2
  }
}

//ESTADO 2 PANTALLA FINAL
function pantallaFinal(){

  background(0);
  let tamaño = map(mouseX, 0, width, 10, 50);
  for(let x = 0; x < width; x += 60){
    for(let y = 0; y < height; y += 60){
      if(mouseX > width/2){
        fill(0,0,255);
        noStroke();
        rect(x, y, tamaño, tamaño);
      }
      else{
        fill(255,0,0);
        noStroke();
        ellipse(x, y, tamaño);
      }
    }
  }
//TEXTO 
  fill(255);
  textAlign(CENTER);

  textSize(90);
  textStyle(BOLD);
  text("¡GANASTE!", width/2, 250)
  
  textSize(22);
  text("PASASTE EL NIVEL 1", width/2, 350);
  
//SONIDO DE VICTORIA
  if (!sonidoVictoria.isPlaying()) {
    sonidoVictoria.play();
  }
}
 //COMO SE JUEGA
function keyPressed() {

  // Comenzar el juego 
  if (estado == 0 && keyCode === ENTER) {
    estado = 1;
  }

  if (keyCode == LEFT_ARROW) {
    jugadorX -= 30;
    if (!sonido.isPlaying()) sonido.play();
  }

  if (keyCode == RIGHT_ARROW) {
    jugadorX += 30;
    if (!sonido.isPlaying()) sonido.play();
  }

  if (keyCode == UP_ARROW) {
    jugadorY -= 30;
    if (!sonido.isPlaying()) sonido.play();
  }

  if (keyCode == DOWN_ARROW) {
    jugadorY += 30;
    if (!sonido.isPlaying()) sonido.play();
  }
}