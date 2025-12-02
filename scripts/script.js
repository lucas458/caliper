
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





function onClickSetValue(){

    const VALUE = document.querySelector(".UI_textField_input").value;
    
    if ( unitIsMilimeters ){
        setCaliperMilimeters(VALUE);
        return;
    }

    setCaliperInch(VALUE);
}


