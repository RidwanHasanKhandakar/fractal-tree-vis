let mode="recursive";

let angle=0;
let slider;

let axiom="F";
let sentence=axiom;
let rules=[];

let len2=120;
let angle2;

let generateButton;
let resetButton;

let presetSelect;

let drawIndex=0;

let canvas;

function setup(){

    canvas=createCanvas(windowWidth,windowHeight);

    angleMode(RADIANS);

    slider=createSlider(0,TWO_PI,PI/4,0.01);
    slider.position(20,20);
    slider.style("width","220px");

    generateButton=createButton("Generate");
    generateButton.position(20,60);
    generateButton.mousePressed(generate);
    generateButton.hide();

    resetButton=createButton("Reset");
    resetButton.position(120,60);
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

function windowResized(){

    resizeCanvas(windowWidth,windowHeight);
}

function draw(){

    background(8);

    if(mode==="recursive"){

        slider.show();

        generateButton.hide();
        resetButton.hide();
        presetSelect.hide();

        angle=slider.value();

        push();

        translate(width/2,height-40);

        strokeWeight(2);

        branch(160);

        pop();
    }

    else if(mode==="lsystem"){

        slider.hide();

        generateButton.show();
        resetButton.show();
        presetSelect.show();

        turtle();
    }

    else if(mode==="koch"){

        slider.hide();

        generateButton.hide();
        resetButton.hide();
        presetSelect.hide();

        drawKoch();
    }

    drawUI();
}

function drawUI(){

    noStroke();

    fill(0,170);

    rect(0,0,width,160);

    fill(0,255,200);

    textSize(34);

    text("Fractal Generator",20,140);

    textSize(17);

    fill(255);

    text("1 = Recursive Tree",350,40);
    text("2 = L-System",350,70);
    text("3 = Koch Snowflake",350,100);
    text("S = Save Screenshot",350,130);
}

function branch(len){

    stroke(
        map(len,0,160,80,255),
        255,
        map(mouseX,0,width,120,255)
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
}

function setMode(newMode){

    mode=newMode;

    background(8);
}

function keyPressed(){

    if(key==="1"){

        setMode("recursive");
    }

    if(key==="2"){

        setMode("lsystem");
    }

    if(key==="3"){

        setMode("koch");
    }

    if(key==="s"||key==="S"){

        saveCanvas("fractal","png");
    }
}

function generate(){

    let nextSentence="";

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

    translate(width/2,height-20);

    strokeWeight(1.5);

    drawIndex=min(drawIndex+25,sentence.length);

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






/* ========================= */
/* ===== KOCH FRACTAL ====== */
/* ========================= */

function drawKoch(){

    translate(width/2,height/2);

    strokeWeight(2);

    let size=min(width,height)*0.45;

    let p1=createVector(-size/2,size/3);
    let p2=createVector(size/2,size/3);

    let h=sqrt(3)*size/2;

    let p3=createVector(0,-h/2);

    let level=floor(map(mouseX,0,width,0,6));

    stroke(
        map(mouseY,0,height,50,255),
        200,
        255
    );

    kochLine(p1,p2,level);
    kochLine(p2,p3,level);
    kochLine(p3,p1,level);
}

function kochLine(a,b,level){

    if(level===0){

        line(a.x,a.y,b.x,b.y);

        return;
    }

    let v=p5.Vector.sub(b,a);

    v.div(3);

    let p1=p5.Vector.add(a,v);

    let p3=p5.Vector.sub(b,v);

    let peak=v.copy();

    peak.rotate(-PI/3);

    let p2=p5.Vector.add(p1,peak);

    kochLine(a,p1,level-1);
    kochLine(p1,p2,level-1);
    kochLine(p2,p3,level-1);
    kochLine(p3,b,level-1);
}