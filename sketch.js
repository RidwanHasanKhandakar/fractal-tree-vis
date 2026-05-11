let mode = "recursive";
let angle =0;
let slider;
let axiom ="F";
let sentence=axiom;
let rules=[];
let len2=100;
let angle2;
let generateButton;
function setup(){
    createCanvas(400,400);
    slider = createSlider(0,TWO_PI,PI/4,0.01);
    angle2=radians(25);
    rules[0]={
        a:"F",
        b:"FF+[+F-F-F]-[-F+F+F]"
    };
    generateButton = createButton("Generate L-System");
    generateButton.mousePressed(generate);
    generateButton.hide();
}
function draw(){
    background(51);
    if(mode==="recusrsive"){
        generateButton.hide();
        angle=slider.value();
        stroke(255);
        translate(width/2,height);
        branch(100);
    }else if(mode==="lsystem"){
        generateButton.show();
        turtle();
    }
}
function branch(len){
    line(0,0,0,-len);
    translate(0,-len);
    //rotate(angle);
    //rotate(-angle);
    if(len>4){
        push();
        rotate(angle);
        branch(len*0.67);
        pop();
        push();
        rotate(-angle);
        branch(len*0.67);
        pop();
    }
    //line(0,0,0,-len*0.67);
}
function setMode(newMode){
    mode=newMode;
    background(51);
    if(mode==="lsystem"){
        turtle();
    }
}