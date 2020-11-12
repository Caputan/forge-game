let sphere;
let keysQ = [];
var direction = new THREE.Vector3(1, 0, 0);

function createPacman(){
    const pacman = new THREE.SphereGeometry(2.5, 32, 32);
    const material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
    sphere = new THREE.Mesh( pacman, material );
    sphere.position.set(0, 0, -50);
    if (!NOP_VIEWER.overlays.hasScene('custom-scene')) {
        NOP_VIEWER.overlays.addScene('custom-scene');
    }

    NOP_VIEWER.overlays.addMesh(sphere, 'custom-scene');

    console.log(NOP_VIEWER);



    move();
    
}

document.addEventListener('keydown', checkInput);

function checkInput(e){
    switch(e.keyCode){

        case 65:
            //sphere.position.add(new THREE.Vector3(0, 0, 1));
            keysQ.push(new THREE.Vector3(1, 0, 0));
            break;

        case 68:
            //snake[0].position.add(new THREE.Vector3(0, 0, -1));
            keysQ.push(new THREE.Vector3(-1, 0, 0));
            break;

        case 87:
            //snake[0].position.add(new THREE.Vector3(0, 1, 0));
            keysQ.push(new THREE.Vector3(0, 1, 0));
            break;

        case 83:
            //snake[0].position.add(new THREE.Vector3(0, -1, 0));
            keysQ.push(new THREE.Vector3(0, -1, 0));
            break;
    }
} 

function move(){
    requestAnimationFrame(move);
        viewer.impl.sceneUpdated(true);

        if(sphere == undefined)
            return;

        direction = keysQ.length > 0 ? keysQ.pop(0) : direction;

        if(sphere != undefined){
            var newPosition = new THREE.Vector3(sphere.position.x + direction.x * 0.1, 
            sphere.position.y + direction.y * 0.1,
            sphere.position.z + direction.z * 0.1);
        }

        sphere.position.set(newPosition.x, newPosition.y, newPosition.z);
}

function checkReycast(){

}
