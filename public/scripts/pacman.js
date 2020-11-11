let sphere;

function createPacman(posX, posY){
    const pacman = new THREE.SphereGeometry(10, 32, 32);
    const material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
    sphere = new THREE.Mesh( pacman, material );
    sphere.position.set(0, 0, 100);
    if (!NOP_VIEWER.overlays.hasScene('custom-scene')) {
        NOP_VIEWER.overlays.addScene('custom-scene');
    }

    NOP_VIEWER.overlays.addMesh(sphere, 'custom-scene');

    console.log(NOP_VIEWER.impl.scene);
}

move();

document.addEventListener('keydown', move);

function move(e){
    requestAnimationFrame(move);
    if(viewer != undefined){
        viewer.impl.sceneUpdated(true);

        if(sphere == undefined)
            return;
        switch(e.keyCode){

            case 65:
                sphere.position.add(new THREE.Vector3(-100, 0, 0));
                break;

            case 68:
                sphere.position.add(new THREE.Vector3(100, 0, 0));
                break;

            case 87:
                sphere.position.add(new THREE.Vector3(0, 100, 0));
                break;

            case 83:
                sphere.position.add(new THREE.Vector3(0, -100, 0));
                break;
        }
    }
}
function createPoints(){
    
}
