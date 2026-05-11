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
    if(mode==="recursive"){
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
}

function generate(){
    let nextSentence="";
    for(let i=0;i<sentence.length;i++){
        let current = sentence.charAt(i);
        let found = false;
        for (let j=0;j<rules.length;j++){
            if(current==rules[j].a){
                found = true;
                nextSentence+=rules[j].b;
                break;
            }
        }
        if(!found){
            nextSentence+=current;
        }
    }
    sentence=nextSentence;
    len2*=0.5;
}
function turtle(){
    resetMatrix();
    translate(width/2,height);
    stroke(0,255,120);
    for(let i=0;i<sentence.length;i++){
        let current = sentence.charAt(i);
        if(current=="F"){
            line(0,0,0,-len2);
            translate(0,-len2);
        }
        else if (current=="+"){
            rotate(angle2);
        }else if(current=="-"){
            rotate(-angle2);
        }else if(current=="["){
            push();
        }else if(current=="]"){
            pop();
        }
    }
}