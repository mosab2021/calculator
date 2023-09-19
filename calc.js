var previousValue = 0;
var operationStatus = false;
var lastOperation = null;

const digitBtns = document.querySelectorAll(".digitBtns");
const operationBtns = document.querySelectorAll(".opBtns");

const acBtn = document.getElementById("ac");

const equalBtn = document.getElementById("equal");

const resultInput = document.getElementById("resultInput");


function digitPressed(digit) {
    let rval = resultInput.value
    if (operationStatus) {
        rval = 0;
        operationStatus = false;
    }
    if (parseFloat(rval) != 0 && digit) {
        resultInput.value = rval + digit;
    } else if (digit) {
        resultInput.value = digit;
    }
}

function digitBtnClick(event) {
    digitPressed(event.target.value);
}

digitBtns.forEach(digitBtn => {
    digitBtn.addEventListener('click', digitBtnClick);
});

function calcOperation(lastOperation) {
    if (previousValue) {
        switch (lastOperation) {
            case "+":
                previousValue = parseInt(previousValue) + parseInt(resultInput.value);
                break;
            case "-":
                previousValue = parseInt(previousValue) - parseInt(resultInput.value);
                break;
            case "*":
                previousValue = parseInt(previousValue) * parseInt(resultInput.value);
                break;
            case "/":
                previousValue = parseInt(previousValue) * parseInt(resultInput.value);
                break;
        }
    } else {
        previousValue = resultInput.value;
    }
    operationStatus = true;
}

function opBtnClicks(event) {
    lastOperation = event.target.value;
    calcOperation(lastOperation);
}

operationBtns.forEach(operationBtn => {
    operationBtn.addEventListener('click', opBtnClicks);
});

function equalClicks() {
    console.log(parseInt(previousValue) + lastOperation + parseInt(resultInput.value) + " = ");
    switch (lastOperation) {
        case "+":
            resultInput.value = parseInt(previousValue) + parseInt(resultInput.value);
            break;
        case "-":
            resultInput.value = parseInt(previousValue) - parseInt(resultInput.value);
            break;
        case "*":
            resultInput.value = parseInt(previousValue) * parseInt(resultInput.value);
            break;
        case "/":
            resultInput.value = parseInt(previousValue) / parseInt(resultInput.value);
            break;
    }
    lastOperation = null;
    previousValue = 0;
    operationStatus = true;
}

equalBtn.addEventListener('click', equalClicks);

acBtn.addEventListener('click', function () {
    resultInput.value = 0;
    lastOperation = null;
    previousValue = 0;
    operationStatus = false;
});

function onKeyPressed(event) {
    if (event.key == '+' || event.key == '-' || event.key == '*' || event.key == '/') {
        lastOperation = event.key;
        calcOperation(lastOperation);
        event.preventDefault();
    }
    else if (event.key == 'Enter') {
        equalClicks();
    }
    else if (!(event.key >= 0 || event.key <= 9)) {
        event.preventDefault();
    } else {
        if (parseInt(resultInput.value) != 0 && !operationStatus) {
            digitPressed(null);
        }
        else if (parseInt(resultInput.value) == 0) { // first time when is zero           
            resultInput.value = event.key;
            event.preventDefault();
        } else if (operationStatus && parseInt(resultInput.value) != 0) {
            resultInput.value = "";
            digitPressed(null);
            // event.preventDefault();
        }
    }
}
resultInput.addEventListener('keypress', onKeyPressed);