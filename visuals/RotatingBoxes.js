import * as THREE from 'https://cdn.skypack.dev/three@0.133.1';

export let  scene4 = new THREE.Scene();

//Allow for resizing 
const colorsArr = ['#D90452', '#8C0F61', '#3D1773', '#03658C','#000000']
const numBoxes = 3;
const positions = [[0,0,0],[-300,0,1],[300,0,1]] // Initial positions of boxes

// Creating 3 Boxes
const boxArr = createBoxes(numBoxes)
const materialArr = createMaterials(numBoxes)
const BOXES = createObjects(numBoxes)


var torusGeo = new THREE.TorusGeometry( 200, 1, 16, 200);
var torusMat = new THREE.MeshNormalMaterial();
var donut = new THREE.Mesh( torusGeo , torusMat );

scene4.add( donut );

// Conditions for boxes to bouce
var [conditionX2,conditionY2,conditionX3,conditionY3, counter,index]= [false,false,false,false,0,0]

//AUDIO REACTIONS
export function boxScaling(data){
    for(let i=0;i<BOXES.length;i++){
        BOXES[i].scale.set(0.5*data,0.5*data)
    }
    donut.scale.set(data,data)
}

// Creating Circles
function createObjects(numBoxes){
    var BOXES =[]
    for(let i=0;i<numBoxes;i++){
        var box = new THREE.Mesh(boxArr[i],materialArr[i]);
        box.position.set(positions[i][0],positions[i][1],positions[i][2])
        BOXES.push(box)
        scene4.add(box)
    }
    return BOXES
}

function createBoxes(numBoxes){
    var boxArr =[]
    for(let i=0;i<numBoxes;i++){
        var box =new THREE.BoxGeometry(100, 100, 100)
        // ( 1, 1, 1 )
        boxArr.push(box)
    }
    return boxArr
}

function createMaterials(numBoxes){
    var materialArr =[]
    for(let i=0;i<numBoxes;i++){
        materialArr.push(new THREE.MeshBasicMaterial({color:colorsArr[i]}))
    }
    return materialArr
}

export function changeColors(){
    counter +=1
    if(counter%100 == 0){
        BOXES[0].material.color.set(colorsArr[index])
        BOXES[1].material.color.set(colorsArr[index-2])
        BOXES[2].material.color.set(colorsArr[index-2])
        index += 1
        if(index-1>=colorsArr.length){
            index = 0;
        }
    }
}

export function spinCircle(){
    if(BOXES[1].position.x<300 && conditionX2 == false){
        BOXES[1].position.x += 5; // Move right 
        if(BOXES[1].position.x>=300){
            conditionX2 = true
        }
    }
    else{
        BOXES[1].position.x -= 5; 
        if(BOXES[1].position.x<=-300){
            conditionX2 = false
        }
    }

    if(BOXES[1].position.y<300 && conditionY2 == false){
        BOXES[1].position.y += 5; // Move up 
        if(BOXES[1].position.y>=300){
            conditionY2 = true
        }
    }
    else{
        BOXES[1].position.y -= 5; //bounce
        if(BOXES[1].position.y<=-300){
            conditionY2 = false
        }
    }
    // Rotate Box 3 Around X and Y axis
    if(BOXES[2].position.x>-300 && conditionX3 == false){
        BOXES[2].position.x -= 5; // Move left 
        if(BOXES[2].position.x<=-300){
            conditionX3 = true
        }
    }
    else{
        BOXES[2].position.x += 5;  //bounce
        if(BOXES[2].position.x>=300){
            conditionX3 = false
        }
    }
    if(BOXES[2].position.y>-300 && conditionY3 == false){
        BOXES[2].position.y -= 5; // Move down 
        if(BOXES[2].position.y<=-300){
            conditionY3 = true
        }
    }
    else{
        BOXES[2].position.y += 5;  //bounce
        if(BOXES[2].position.y>=300){
            conditionY3 = false
        }
    }
}