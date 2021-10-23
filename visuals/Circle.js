            const canvas = document.getElementById('canvas')

            const sizes = {
                    width: window.innerWidth,
                    height: window.innerHeight
                    } // Objects storing the sizes
            // create scene, camera, renderer 
            const [scene,camera,renderer] = [new THREE.Scene(),
                                            new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 ),
                                            new THREE.WebGLRenderer({canvas:canvas,alpha:true})]
            

            // Set controls for objects
            const controls = new OrbitControls(camera, renderer.domElement)
            
            // WEBAUDIO
            const button = document.getElementById('button')
            //Add Event Listener to start Instance
            button.addEventListener( 'click', init );
            const fftSize = 128;
            const listener = new THREE.AudioListener();
            const audio = new THREE.Audio( listener );

            var file = 'wad-g8/sounds/The Kid LAROI, Justin Bieber - Stay.mp3'; // Include directory to audio files

            const analyser = new THREE.AudioAnalyser(audio,fftSize) // Create THREE 3JS analyzer
            const loader = new THREE.AudioLoader(); // Create audio loader
            
            //set the size of renderer to the whole screen
            renderer.setSize( window.innerWidth, window.innerHeight );
            renderer.setClearColor('#A9A9A9') // Change color of background
            // Add the enterire renderer into the DOM
            // document.body.appendChild(renderer.domElement);
            
            //Allow for resizing 
            const colorsArr = ['#D90452', '#8C0F61', '#3D1773', '#03658C','#000000']
            const numBoxes = 3;
            const positions = [[0,0,1],[-3,0,1],[3,0,1]] // Initial positions of boxes

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
            const materialArr =createMaterials(numBoxes)
            const BOXES = createObjects(numBoxes)
            const LINES = createLines(numLines)

            var circleGeo = new THREE.CircleGeometry( 4, 32 );
            var circleMat = new THREE.MeshBasicMaterial( { color: '#FDF5E6' } );
            var circle = new THREE.Mesh( circleGeo, circleMat );
            circle.position.set(0,0,0)
            scene.add( circle );    
            
            // WEBAUDIO
            function init(){
            loader.load(file,function(buffer){
                audio.setBuffer(buffer);
                audio.play();
            })
            animate()
        }
            //Screen Resizing
            window.addEventListener('resize', () =>
            {
                // Update sizes
                sizes.width = window.innerWidth
                sizes.height = window.innerHeight
                // Update camera
                camera.aspect = sizes.width / sizes.height
                camera.updateProjectionMatrix()
                // Update renderer
                renderer.setSize(sizes.width, sizes.height)
                renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
            })

            //Camera angle cahnge
            camera.position.z = 10// Depth
            scene.add(camera)

            // Conditions for boxes to bouce
            var [conditionX2,conditionY2,conditionX3,conditionY3, counter,index]= [false,false,false,false,0,0]
            
            //AUDIO REACTIONS
            function BoxScaling(data){
                for(let i=0;i<BOXES.length;i++){
                    BOXES[i].scale.set(0.5*0.01*data,0.5*0.01*data)
                }
                circle.scale.set(0.01*data,0.01*data)
            }

            const clock = new THREE.Clock()
            function render(){
                var data = analyser.getAverageFrequency();
                BoxScaling(data)
                renderer.render(scene,camera)
            }

            function createLines(numLines){
                var LINES = []
                for(let i=0;i<numLines;i++){
                    var lineMat = new THREE.LineBasicMaterial( { color: '#000000' } )
                    var lineGeo = new THREE.BufferGeometry().setFromPoints( POINTS[i] )
                    var line = new THREE.Line( lineGeo, lineMat )
                    scene.add(line)
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
                    scene.add(box)
                }
                return BOXES
            }

            function createBoxes(numBoxes){
                var boxArr =[]
                for(let i=0;i<numBoxes;i++){
                    var box =new THREE.CircleGeometry( 1, 32 )
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

            function changeColors(){
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
            function spinCircle(){
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

            function animate() {
                render();
                const elapsedTime = clock.getElapsedTime()
                requestAnimationFrame( animate );
                renderer.render( scene, camera );
                changeColors()
                spinCircle()
            }
