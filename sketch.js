function setup(){
    createCanvas(400,400);
}
function draw(){
    background(51);
    stroke(255);
    branch(100);
}
function branch(len){
    line(200,height,200,height-len);

}