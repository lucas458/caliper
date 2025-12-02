
document.querySelectorAll(".movement").forEach(e => {
    e.onmousedown = ontouchstart = (event) => {
        event.stopImmediatePropagation();
        
        const clientX = (event.type == 'touchstart')? event.touches[0].clientX : event.clientX;
        initialPosition = clientX - position;
        pressed = true;
    }
});


onmouseup = ontouchend = () => { 
    pressed = false;
};


onmousemove = ontouchmove = (event) => {
    
    if ( !pressed ){
        return;
    }

    const clientX = (event.type == 'touchmove')? event.touches[0].clientX : event.clientX;    
    setCaliperPixel(clientX - initialPosition);

};


onwheel = (event) => {

    if ( pressed ){
        return;
    }

    let step = (event.deltaY < 0) ? 1 : -1;
    step *= event.shiftKey? 10 : 1;

    setCaliperPixel(position + step);
};