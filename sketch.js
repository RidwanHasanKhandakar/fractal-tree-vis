let mode = "recursive";
let angle =0;
let slider;
let axiom ="F";
let sentence=axiom;
let rules=[];
let len2=120;
let angle2;
let generateButton;
let resetButton;
let presetSelect;
let drawIndex=0;
function setup(){
    createCanvas(900,700);

    angleMode(RADIANS);

    slider=createSlider(0,TWO_PI,PI/4,0.01);
    slider.position(20,20);
    slider.style("width","200px");

    generateButton=createButton("Generate");
    generateButton.position(20,60);
    generateButton.mousePressed(generate);
    generateButton.hide();

    resetButton=createButton("Reset");
    resetButton.position(110,60);
    resetButton.mousePressed(resetLSystem);
    resetButton.hide();

    presetSelect=createSelect();
    presetSelect.position(20,100);

    presetSelect.option("Tree");
    presetSelect.option("Bush");
    presetSelect.option("Plant");
    presetSelect.option("Weed");
    presetSelect.option("Coral");

    presetSelect.changed(changePreset);

    presetSelect.hide();

    loadPreset("Tree");
}
function draw(){
     background(10);

    if(mode==="recursive"){

        slider.show();

        generateButton.hide();
        resetButton.hide();
        presetSelect.hide();

        angle=slider.value();

        push();

        translate(width/2,height);

        stroke(255);

        branch(140);

        pop();

    }

    else if(mode==="lsystem"){

        slider.hide();

        generateButton.show();
        resetButton.show();
        presetSelect.show();

        turtle();

    }

    drawUI();
}

function drawUI(){

    noStroke();

    fill(0,180);

    rect(0,0,width,150);

    fill(0,255,200);

    textSize(30);

    text("Fractal Generator",20,140);

    textSize(16);

    fill(255);

    text("Press 1 = Recursive Tree",300,40);
    text("Press 2 = L-System",300,70);
    text("Move Mouse = Dynamic Colors",300,100);
}

function branch(len){
   stroke(
        map(len,0,140,50,255),
        255,
        map(mouseX,0,width,100,255)
    );

    line(0,0,0,-len);

    translate(0,-len);

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
    background(10);
}

function keyPressed(){

    if(key==="1"){
        setMode("recursive");
    }

    if(key==="2"){
        setMode("lsystem");
    }

    if(key==="s"||key==="S"){
        saveCanvas("fractal","png");
    }
}

function generate(){
    et nextSentence="";

    for(let i=0;i<sentence.length;i++){

        let current=sentence.charAt(i);

        let found=false;

        for(let j=0;j<rules.length;j++){

            if(current===rules[j].a){

                found=true;

                nextSentence+=rules[j].b;

                break;
            }
        }

        if(!found){
            nextSentence+=current;
        }
    }

    sentence=nextSentence;

    len2*=0.55;

    drawIndex=0;
}

function resetLSystem(){

    sentence=axiom;

    len2=120;

    drawIndex=0;
}

function turtle(){
    resetMatrix();

    translate(width/2,height);

    strokeWeight(1.5);

    drawIndex=min(drawIndex+20,sentence.length);

    for(let i=0;i<drawIndex;i++){

        let current=sentence.charAt(i);

        stroke(
            map(i,0,sentence.length,50,255),
            255,
            map(mouseY,0,height,100,255)
        );

        if(current==="F"){

            line(0,0,0,-len2);

            translate(0,-len2);
        }

        else if(current==="+"){

            rotate(angle2);
        }

        else if(current==="-"){

            rotate(-angle2);
        }

        else if(current==="["){

            push();
        }

        else if(current==="]"){

            pop();
        }
    }
}
function changePreset(){

    loadPreset(presetSelect.value());
}

function loadPreset(type){

    sentence="";
    rules=[];

    if(type==="Tree"){

        axiom="F";

        sentence=axiom;

        angle2=radians(25);

        rules.push({
            a:"F",
            b:"FF+[+F-F-F]-[-F+F+F]"
        });
    }

    else if(type==="Bush"){

        axiom="X";

        sentence=axiom;

        angle2=radians(22);

        rules.push({
            a:"X",
            b:"F+[[X]-X]-F[-FX]+X"
        });

        rules.push({
            a:"F",
            b:"FF"
        });
    }

    else if(type==="Plant"){

        axiom="X";

        sentence=axiom;

        angle2=radians(20);

        rules.push({
            a:"X",
            b:"F-[[X]+X]+F[+FX]-X"
        });

        rules.push({
            a:"F",
            b:"FF"
        });
    }

    else if(type==="Weed"){

        axiom="F";

        sentence=axiom;

        angle2=radians(35);

        rules.push({
            a:"F",
            b:"F[+F]F[-F][F]"
        });
    }

    else if(type==="Coral"){

        axiom="F";

        sentence=axiom;

        angle2=radians(27);

        rules.push({
            a:"F",
            b:"FF-[-F+F+F]+[+F-F-F]"
        });
    }

    len2=120;

    drawIndex=0;
}