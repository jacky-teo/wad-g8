var scene = new THREE.Scene()
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)
var renderer = new THREE.WebGLRenderer({antialias: true})

camera.position.z = 5
renderer.setClearColor("#e5e5e5")
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// Responsive when resizing window
window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.aspect = window.window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
})

var geometry = new THREE.SphereGeometry(1, 100, 100)
var material = new THREE.MeshLambertMaterial({color: 0xF7F7F7})
var cubeMesh = new THREE.Mesh(geometry, material)

scene.add(cubeMesh)

var light = new THREE.PointLight(0xFFFFFF, 1, 1000);
light.position.set(0,10,25);
scene.add(light);

var previous = [0, true]

var render = () => {
    requestAnimationFrame(render);

    if (previous[0] <= 20 && previous[1]) {
        cubeMesh.scale.x -= 0.01
        cubeMesh.scale.y -= 0.01
        cubeMesh.scale.z -= 0.01
        previous[0]++
        if (previous[0] == 20) {
            previous[1] = false
        }
    } else {
        cubeMesh.scale.x += 0.01
        cubeMesh.scale.y += 0.01
        cubeMesh.scale.z += 0.01
        previous[0]--
        if (previous[0] == 0) {
            previous[1] = true
        }
    }

    renderer.render(scene, camera);
}

render();