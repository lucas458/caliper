const clamp = (value, min, max) => {
    if (value < min) return min;
    if (value > max) return max;
    return value;
};

const map = (x, in_min, in_max, out_min, out_max) => {
    return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;  
};



let pressed = false;
let initialPosition = 0;
let position = 0;
let unitIsMilimeters = true;
let zeroPosition = 0;
let isPowered = false;



function onClickUnit(){

    if ( !isPowered ){
        return;
    }

    unitIsMilimeters = !(document.getElementById("unit").getAttribute("milimeters") == 'true');
    document.getElementById("unit").setAttribute("milimeters", unitIsMilimeters);

    updateCaliper();
}


function onClickPower(){
    isPowered = !isPowered;
    readoutContainer.classList.toggle("powered", isPowered);

    if ( !isPowered ){
        unitIsMilimeters = true;
    }

}


function onClickZero(){
    zeroPosition = position;
    updateCaliper();
}






function updateCaliper(){

    if ( !isPowered ){
        onClickPower();
    }

    const VALUE = unitIsMilimeters ? getCaliperMilimeters() : getCaliperInch();
    number.innerHTML = VALUE.toFixed(2);
}









function setCaliperPixel( distance = 0 ){
    distance = clamp(distance, 0, 1956 + 312);
    position = distance;
    document.querySelectorAll('.movement').forEach(e => e.style.transform = `translateX(${-312 + distance}px)`);
    updateCaliper();
}



// Milimeters
function setCaliperMilimeters( distance = 0 ){
    distance = clamp(distance, 0, 180);
    const OFFSET = map(distance, 0, 180, 0, 1956 + 312);
    setCaliperPixel(OFFSET);
}

function getCaliperMilimeters(){
    return map(position - zeroPosition, 0, 1956 + 312, 0, 180);
}


// Inches
function setCaliperInch( distance = 0 ){
    distance = clamp(distance, 0, 7);
    const OFFSET = map(distance, 0, 7, 0, 1928 + 312);
    setCaliperPixel(OFFSET);
}

function getCaliperInch(){
    return map(position - zeroPosition, 0, 1928 + 312, 0, 7);
}




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





function onClickSetValue(){

    const VALUE = document.querySelector(".UI_textField_input").value;
    
    if ( unitIsMilimeters ){
        setCaliperMilimeters(VALUE);
        return;
    }

    setCaliperInch(VALUE);
}



// TEXT FIELD: ONINPUT
document.querySelector(".UI_textField").onkeydown = (event) => {

    if ( event.key != "Enter" ){
        return;
    }

    onClickSetValue();
};


document.querySelector(".UI_textField").oninput = (event) => {
    console.log( event.target )
    const input = event.target;
    const isError = event.target.parentElement.classList.toggle("UI_textField_error", input.value.length == 0);
    buttonSetValue.disabled = isError;
};
