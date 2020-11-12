let sphere;
let box,box1,box2,box3,box4,box5,box6,box7,box8,box9,box10,box11,box12,box13,box14,box15,box16,box17;
let keysQ = [];
var direction = new THREE.Vector3(1, 0, 0);
let reycaster;
var cube

var mesh = []

function createPacman(){
    const pacman = new THREE.SphereGeometry(5, 32, 32);
    const material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
    const wall1 = new THREE.BoxGeometry (10,260,10);
    const wall2 = new THREE.BoxGeometry (10,10,310);
    const wall3 = new THREE.BoxGeometry (10,250,10);
    const wall4 = new THREE.BoxGeometry (10,10,310);
    const wall5 = new THREE.BoxGeometry (10,250,10);
    const wall6 = new THREE.BoxGeometry (10,10,50);
    const wall7 = new THREE.BoxGeometry (10,10,100);
    const wall8 = new THREE.BoxGeometry (10,50,10);
    const wall9 = new THREE.BoxGeometry (10,100,10);
    const wall10 = new THREE.BoxGeometry (10,10,50);
    const wall11 = new THREE.BoxGeometry (10,100,10);
    const wall12 = new THREE.BoxGeometry (10,10,150);
    const wallmaterial = new THREE.MeshBasicMaterial( {color: 0xffff00} );
    box = new THREE.Mesh(wall1, wallmaterial);
    box1 = new THREE.Mesh(wall2, wallmaterial);
    box2 = new THREE.Mesh(wall3, wallmaterial);
    box3 = new THREE.Mesh(wall4, wallmaterial);
    box4 = new THREE.Mesh(wall5, wallmaterial);
    box5 = new THREE.Mesh(wall6, wallmaterial);
    box6 = new THREE.Mesh(wall7, wallmaterial);
    box7 = new THREE.Mesh(wall8, wallmaterial);
    box8 = new THREE.Mesh(wall9, wallmaterial);
    box9 = new THREE.Mesh(wall10, wallmaterial);
    box10 = new THREE.Mesh(wall11, wallmaterial);
    box11 = new THREE.Mesh(wall8, wallmaterial);
    box12 = new THREE.Mesh(wall10, wallmaterial);
    box13 = new THREE.Mesh(wall12, wallmaterial);
    
    mesh.push(box);
    mesh.push(box1);
    mesh.push(box2);
    mesh.push(box3);
    mesh.push(box4);
    mesh.push(box5);
    mesh.push(box6);
    mesh.push(box7);
    mesh.push(box);

    sphere = new THREE.Mesh( pacman, material );
    sphere.position.set(0, -20, 155);
    if (!NOP_VIEWER.overlays.hasScene('custom-scene')) {
        NOP_VIEWER.overlays.addScene('custom-scene');
    }

    

    NOP_VIEWER.overlays.addMesh(sphere, 'custom-scene');

    console.log(NOP_VIEWER);

    mesh.push(cube);

    move();
}

document.addEventListener('keydown', checkInput);

function checkInput(e){
    switch(e.keyCode){

        case 65:
            //sphere.position.add(new THREE.Vector3(0, 0, 1));
            keysQ.push(new THREE.Vector3(-1, 0, 0));
            break;

        case 68:
            //snake[0].position.add(new THREE.Vector3(0, 0, -1));
            keysQ.push(new THREE.Vector3(1, 0, 0));
            break;

        case 87:
            //snake[0].position.add(new THREE.Vector3(0, 1, 0));
            keysQ.push(new THREE.Vector3(0, 2, 0));
            break;

        case 83:
            //snake[0].position.add(new THREE.Vector3(0, -1, 0));
            keysQ.push(new THREE.Vector3(0, -2, 0));
            break;
    }
} 

function move(){
    requestAnimationFrame(move);
        viewer.impl.sceneUpdated(true);

        if(sphere == undefined)
            return;

        let dir = new THREE.Vector3(direction.x/10, direction.y/10, direction.z/10);
        reycaster.set(sphere.position, dir);
    
            
        const intersects = reycaster.intersectObjects( mesh );

        if(intersects.length == 0){
            direction = keysQ.length > 0 ? keysQ.pop(0) : direction;

            if(sphere != undefined){
                var newPosition = new THREE.Vector3(sphere.position.x + direction.x * 0.1, 
                sphere.position.y + direction.y * 0.1,
                sphere.position.z + direction.z * 0.1);
            }

            sphere.position.set(newPosition.x, newPosition.y, newPosition.z);
        }


        console.log(intersects);
        
}