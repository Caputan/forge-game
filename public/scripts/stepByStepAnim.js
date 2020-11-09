let id = [0, 0, 99, 0, 0, [113, 115, 117, 119, 121, 123]];
let i = 1;
let prev = 0;
let anim
let panel = document.querySelector("#panel");
function checkSeconds() {
    anim = window.requestAnimationFrame(checkSeconds);
    try {
        if (animationExt.isPlaying() == false && prev != 0) {
            second = document.getElementById("op" + prev);
            second.classList.remove("step_active");
            i = 1;
            NOP_VIEWER.setSelectionColor(new THREE.Color(0x6f8ece));
        }

        if (animationExt.isPlaying() & animationExt.getCurrentTime() > sec[i]) {
            // NOP_VIEWER.setSelectionColor(new THREE.Color(1, 1, 0));
            first = document.getElementById("op" + i);
            first.classList.add("step_active");
            panel.scrollTop = first.offsetTop - 10;
            // setTimeout(turnSelected, 2100);
            // setTimeout(turnUnselected, 2200);
            // setTimeout(turnSelected, 2400);
            // setTimeout(turnUnselected, 2600);
            if (prev != 0) {
                second = document.getElementById("op" + prev);
                second.classList.remove("step_active");
            }
            prev = i;
            i++;
        }
    } catch {
        cancelAnimationFrame(anim);
    }
}

function turnSelected() {
    console.log(id[i - 1]);
    NOP_VIEWER.select(id[i - 1]);
}

function turnUnselected() {
    NOP_VIEWER.select(0);
}