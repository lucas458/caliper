
document.querySelectorAll(".movement").forEach(e => {
    e.onmousedown = (event) => {
        event.stopImmediatePropagation();
        initialPosition = event.clientX - position;
        pressed = true;
    }
});


onmouseup = () => { 
    pressed = false;
};


onmousemove = (event) => {
    
    if ( !pressed ){
        return;
    }
    
    setCaliperPixel(event.clientX - initialPosition);
};


onwheel = (event) => {

    if ( pressed ){
        return;
    }

    let step = (event.deltaY < 0) ? 1 : -1;
    step *= event.shiftKey? 10 : 1;

    setCaliperPixel(position + step);
};