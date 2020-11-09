function onMenuItemClickHandler(id){
    switch(id){
        case 'catalog':
            stopViewer();
            startViewer(()=>loadModel(),()=>console.log("fail"));
            break;
        case 'animation':
            stopViewer();
            startViewer((doc)=>{loadAnimation(doc, 0)},()=>{console.log("fail")})
            break;
    }
}