let supportTree = {};
let componentsTree = {};
let items = [];
let items_map = {};
let lastSelectedItem = null;
let waitingForClick = false;


function initTable(id) {
    let treeInfo = id === 1 ? componentsTree : supportTree;
    items = [];
    items_map = {};
    items.push(null);
    let index = 1;
    let table = document.querySelector(`.items_table${id} tbody`);
    for (let key in treeInfo) {

        let tr = document.createElement("tr");
        let tdId = document.createElement("td");
        let tdName = document.createElement("td");
        let tdCount = document.createElement("td");
        tr.classList.add("table-item");
        table.append(tr);
        tr.append(tdId);
        tr.append(tdName);
        tr.append(tdCount);

        tdId.innerText = index;
        tdName.innerText = key;
        tdCount.innerText = treeInfo[key].length;
        items.push(tr);
        items_map[index] = Array.isArray(treeInfo[key]) ? treeInfo[key] : [treeInfo[key]];

        index++;
    }
    let highligts_itemsId = new Set();

    for (let i = 1; i < items.length; i++) {
        let key = items[i].childNodes[0].innerText;

        items[i].onclick = (flag) => {
            if (!items[i].classList.contains("step_active")) {
                if (lastSelectedItem) {
                    lastSelectedItem.classList.remove("step_active");
                }
                items[i].classList.add("step_active");
                let selection = typeof flag === "boolean" ? NOP_VIEWER.getSelection()[0] : items_map[key][0];

                NOP_VIEWER.isolate(selection);
                NOP_VIEWER.fitToView(selection);
                lastSelectedItem = items[i];
            } else {
                items[i].classList.remove("step_active");
                NOP_VIEWER.isolate();
                NOP_VIEWER.fitToView();
            }
        }
        items[i].onmouseenter = (e) => {
            items[i].classList.add("table-item_active");
            if (!items[i].classList.contains("step_active")) {
                NOP_VIEWER.select(items_map[key]);
            }
        }
        items[i].onmouseleave = (e) => {
            items[i].classList.remove("table-item_active")
            NOP_VIEWER.select();
        }
    }
}

document.querySelector("#viewer").addEventListener("click", onItemClick, false);
document.querySelector("#viewer").addEventListener('mousemove', onMouseMove, false);


function onItemClick(event) {
    switch (event.detail) {
        case 2:
            let selection = NOP_VIEWER.getSelection()[0]
            if (selection) {
                for (key in items_map) {
                    if (items_map[key].indexOf(selection) !== -1) {
                        setImmediate(() => items[key].onclick(true));
                        NOP_VIEWER.select();
                        break;
                    }
                }
            }
    }
}

let prevIds = "";

function onMouseMove(e) {
    if (!viewer) return
    let x = e.clientX;
    let y = e.clientY;
    let res = viewer.impl.castRay(x, y, true);

    if (res) {
        if (prevIds && (prevIds.indexOf(res.dbId) === -1)) {
            higlightItem(prevIds, false);
        }
        for (let key in items_map) {
            if (items_map[key].indexOf(res.dbId) !== -1) {
                higlightItem(items_map[key], true)
                prevIds = items_map[key];
            }
        }
    } else {
        NOP_VIEWER.select();
        if (prevIds) {
            higlightItem(prevIds, false)
            prevIds = null;
        }
    }
}

function higlightItem(itemIds, flag) {
    let rowIndex;
    for (let key in items_map) {
        if (items_map[key][0] === itemIds[0]) {
            rowIndex = key;
        }
    }
    if (flag) {
        items[rowIndex].onmouseenter();
    } else {
        items[rowIndex].onmouseleave();
    }
}