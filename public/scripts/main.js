let viewer;
const documentId = 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6bW9kZWwyMDIwLTEwLTE5LTE5LTI0LTA0LWQ0MWQ4Y2Q5OGYwMGIyMDRlOTgwMDk5OGVjZjg0MjdlLyVEMCU5NyVEMCVCMCVEMCVCMSVEMCVCRSVEMSU4MCUyMCVEMCU5NiVEMCVCMCVEMCVCQiVEMSU4RSVEMCVCNyVEMCVCOCUyMHYzNC5mM2Q'
const options = {
    env: 'AutodeskProduction',
    api: 'derivativeV2',  // for models uploaded to EMEA change this option to 'derivativeV2_EU'
    getAccessToken: getForgeToken,
}


function getForgeToken(onTokenReady) {
    $.get("/oauth", (data) => {
        const token = data.access_token;
        const timeInSeconds = data.expires_in; // Use value provided by Forge Authentication (OAuth) API
        onTokenReady(token, timeInSeconds);
    })
}

Autodesk.Viewing.Initializer(options, function () {

    loadModel();

    viewer.addEventListener(Autodesk.Viewing.OBJECT_TREE_CREATED_EVENT, function () {
        componentsTree = {};
        const tree = viewer.model.getInstanceTree();
        const rootId = tree.getRootId();

        tree.enumNodeChildren(
            rootId,
            function (dbId) {
                let name = tree.getNodeName(dbId).replace(/(\(([1-9])\))*:[0-9]+$/, '').trim();
                // console.log(tree.getNodeParentId(dbId), name)
                if (tree.getNodeParentId(dbId) > 1 && tree.getChildCount(dbId) === 1) {
                    tree.enumNodeChildren(
                        dbId,
                        function (id) {
                            if (tree.getChildCount(id) === 0)
                                if (Array.isArray(componentsTree[name])) {
                                    componentsTree[name].push(id)
                                } else {
                                    componentsTree[name] = [id];
                                }

                        }, true
                    )
                    // componentsTree[name] = dbId;
                }
            }, true
        );
        initTable(1);
    });
});

function loadModel() {
    const htmlDiv = document.getElementById('viewer');
    const config = {
        disabledExtensions: {
            measure: true,
            // explode: true,
            // section: true,
        }
    };

    viewer = new Autodesk.Viewing.GuiViewer3D(htmlDiv, config);
    const startedCode = viewer.start();
    if (startedCode > 0) {
        console.error('Failed to create a Viewer: WebGL not supported.');
        return;
    }

    console.log('Initialization complete, loading a model next...');
    // const documentId = 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6bW9kZWwyMDIwLTEwLTA1LTIwLTE3LTM5LWQ0MWQ4Y2Q5OGYwMGIyMDRlOTgwMDk5OGVjZjg0MjdlL0ZlbmNlX0dyYW5kTGluZS5mM2Q'//dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6bW9kZWwyMDIwLTEwLTA1LTE3LTIyLTQ5LWQ0MWQ4Y2Q5OGYwMGIyMDRlOTgwMDk5OGVjZjg0MjdlL0ZlbmNlX0dyYW5kTGluZS5mM2Q';
    viewer.addEventListener(Autodesk.Viewing.GEOMETRY_LOADED_EVENT, (e) => { // Функция, срабатывает после полной загрузки модели
        viewer.setLightPreset(8);
    })

    viewer.addEventListener(Autodesk.Viewing.TOOLBAR_CREATED_EVENT, onToolBarCreated)

    Autodesk.Viewing.Document.load(documentId, onDocumentLoadSuccess, onDocumentLoadFailure);
}

function stopViewer() {
    viewer.finish();
    viewer = null;
    document.getElementById('viewer').innerHTML = '';
}

function startViewer(success, fail) {
    Autodesk.Viewing.Initializer(options, function onInitialized() {
        // Загрузка документа CAD модели
        Autodesk.Viewing.Document.load(documentId, success, fail);
    });
}

function loadAnimation(doc, id) {
    // Create Viewer instance
    var viewerDiv = document.getElementById('viewer');
    var config = {
        extensions: ['Autodesk.Fusion360.Animation', 'Autodesk.NPR'],
        externals: { EventsEmitter: 'EventsEmmitter' },
        disabledExtensions: {
            measure: true,
            explode: true,
            section: true,
        }
    };

    // Create the Viewer 3D instance with default UI
    viewer = new Autodesk.Viewing.Private.GuiViewer3D(viewerDiv, config);

    let animationsFolder = doc.getRoot().search({ 'type': 'folder', 'role': 'animation' });
    if (animationsFolder.length === 0) {
        console.error('Document contains no animations.');
        return;
    }

    let animations = animationsFolder[0];
    let animationUrl = doc.getViewablePath(animations.children[id]);


    viewer.addEventListener(Autodesk.Viewing.TOOLBAR_CREATED_EVENT, onToolBarCreated)

    viewer.start(animationUrl, {}, onLoadModelSuccess, onLoadModelError);
}

function onLoadModelSuccess(model) {
    // console.log('onLoadModelSuccess()!');
    // console.log('Validate model loaded: ' + (viewer.model === model));
    // console.log(model);

    viewer.addEventListener(Autodesk.Viewing.CAMERA_CHANGE_EVENT, (e) => { // Функция, срабатывает после полной загрузки модели
        // onTimerTick();
    })

    viewer.addEventListener(Autodesk.Viewing.GEOMETRY_LOADED_EVENT, (e) => { // Функция, срабатывает после полной загрузки модели
        viewer.setLightPreset(8);
    })

    viewer.addEventListener(Autodesk.Viewing.ANIMATION_READY_EVENT, (e) => {
        animationExt = viewer.getExtension("Autodesk.Fusion360.Animation");
        checkSeconds();
    })
}

function onLoadModelError(viewerErrorCode) {
    console.error('onLoadModelError() - errorCode:' + viewerErrorCode);
}

function onDocumentLoadSuccess(doc) {
    const defaultModel = doc.getRoot().getDefaultGeometry();
    viewer.loadDocumentNode(doc, defaultModel);
    console.log(NOP_VIEWER);
}

function onDocumentLoadFailure() {
    console.error('Failed fetching Forge manifest');
}

function onToolBarCreated() {
    const toolbar = viewer.toolbar;
    toolbar._controls.forEach((c) => {
        if (c.getId() !== "modelTools") {
            c.setDisplay('none');
        }
    })


}


