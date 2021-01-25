function dragFeature( { elemRef, onDrag } ) {

    elemRef.current.setAttribute( 'draggable', 'true' );

    elemRef.current.ondragstart = event => {
        event.dataTransfer.effectAllowed = 'move';
        onDrag();
    };

}

function dropFeature( { elemRef, onDrop } ) {

    elemRef.current.ondragover = event => event.preventDefault();  // allowDrop

    elemRef.current.ondrop = event => {
        event.preventDefault();
        onDrop();
    };

}

export { dragFeature, dropFeature };