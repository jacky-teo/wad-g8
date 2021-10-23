import * as THREE from 'https://cdn.skypack.dev/three@0.133.1';

export let  scene4 = new THREE.Scene();

//Allow for resizing 
const colorsArr = ['#D90452', '#8C0F61', '#3D1773', '#03658C','#000000']
const numBoxes = 3;
const positions = [[0,0,1],[-30,0,1],[30,0,1]] // Initial positions of boxes

//LINES
const numLines = 4;
const lineColor = '#000000'
const POINTS =[
    [new THREE.Vector3(-5,2,0),new THREE.Vector3(5,-2,0)],
    [new THREE.Vector3(0,5,4),new THREE.Vector3(0,-5,4)],
    [new THREE.Vector3(2,-2,-5),new THREE.Vector3(2,-2,5)],
    [new THREE.Vector3(-2,3,-5),new THREE.Vector3(-2,3,5)]
]
// Creating 3 Boxes
const boxArr = createBoxes(numBoxes)
const materialArr = createMaterials(numBoxes)
const BOXES = createObjects(numBoxes)
const LINES = createLines(numLines)

var circleGeo = new THREE.CircleGeometry( 40, 32 );
var circleMat = new THREE.MeshBasicMaterial( { color: '#FDF5E6' } );
var circle = new THREE.Mesh( circleGeo, circleMat );
circle.position.set(0,0,0)
scene4.add( circle );

// Conditions for boxes to bouce
var [conditionX2,conditionY2,conditionX3,conditionY3, counter,index]= [false,false,false,false,0,0]

//AUDIO REACTIONS
export function boxScaling(data){
    for(let i=0;i<BOXES.length;i++){
        BOXES[i].scale.set(0.5*0.01*data,0.5*0.01*data)
    }
    circle.scale.set(0.01*data,0.01*data)
}

function createLines(numLines){
    var LINES = []
    for(let i=0;i<numLines;i++){
        var lineMat = new THREE.LineBasicMaterial( { color: '#000000' } )
        var lineGeo = new THREE.BufferGeometry().setFromPoints( POINTS[i] )
        var line = new THREE.Line( lineGeo, lineMat )
        scene4.add(line)
        LINES.push(line)
    }
    return LINES
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
        var box =new THREE.CircleGeometry( 10, 32 )
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
    if(BOXES[1].position.x<3 && conditionX2 == false){
        BOXES[1].position.x += 0.01; // Move right 
        if(BOXES[1].position.x>=3){
            conditionX2 = true
        }
    }
    else{
        BOXES[1].position.x -= 0.01; 
        if(BOXES[1].position.x<=-3){
            conditionX2 = false
        }
    }

    if(BOXES[1].position.y<3 && conditionY2 == false){
        BOXES[1].position.y += 0.01; // Move up 
        if(BOXES[1].position.y>=3){
            conditionY2 = true
        }
    }
    else{
        BOXES[1].position.y -= 0.01; //bounce
        if(BOXES[1].position.y<=-3){
            conditionY2 = false
        }
    }
    // Rotate Box 3 Around X and Y axis
    if(BOXES[2].position.x>-3 && conditionX3 == false){
        BOXES[2].position.x -= 0.01; // Move left 
        if(BOXES[2].position.x<=-3){
            conditionX3 = true
        }
    }
    else{
        BOXES[2].position.x += 0.01;  //bounce
        if(BOXES[2].position.x>=3){
            conditionX3 = false
        }
    }
    if(BOXES[2].position.y>-3 && conditionY3 == false){
        BOXES[2].position.y -= 0.01; // Move down 
        if(BOXES[2].position.y<=-3){
            conditionY3 = true
        }
    }
    else{
        BOXES[2].position.y += 0.01;  //bounce
        if(BOXES[2].position.y>=3){
            conditionY3 = false
        }
    }
}