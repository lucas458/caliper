
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
