function modalClose(){
    modal.classList.remove("modalOpen");
    distanceToCenter.innerHTML = "";
    modal.querySelectorAll('input').forEach(e => e.value = "");
}
function modalOpen(){
    modal.classList.add("modalOpen");
}


function onClickModalOk(){
    const distance = parseFloat(document.getElementById("inputDistance").value);
    const diameterA = parseFloat(document.getElementById("inputDiameterA").value);
    const diameterB = parseFloat(document.getElementById("inputDiameterB").value);
    const distanceCenter = distance - (diameterA + diameterB) / 2;
    distanceToCenter.innerHTML = distanceCenter;
}