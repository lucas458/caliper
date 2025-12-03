
document.querySelectorAll(".movement").forEach(e => {
    e.onmousedown = ontouchstart = (event) => {
        event.stopImmediatePropagation();
        
        const clientX = (event.type == 'touchstart')? event.touches[0].clientX : event.clientX;
        initialPosition = clientX - currentPosition;
        isPressed = true;
    }
});


onmouseup = ontouchend = () => { 
    isPressed = false;
};


onmousemove = ontouchmove = (event) => {
    
    if ( !isPressed ){
        return;
    }

    const clientX = (event.type == 'touchmove')? event.touches[0].clientX : event.clientX;    
    setCaliperPixel(clientX - initialPosition);

};


onwheel = (event) => {

    if ( isPressed || event.ctrlKey ){
        return;
    }

    let step = (event.deltaY < 0) ? 1 : -1;

    step *= event.altKey? 0.1 : 1;
    step *= event.shiftKey? 10 : 1;

    if ( unitIsMilimeters ){
        setCaliperMilimeters( getCaliperMilimeters() + step );
        return;
    }

    setCaliperInch( getCaliperInch() + step );
    
};