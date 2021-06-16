const nums = document.querySelectorAll(".num");
const operations = document.querySelectorAll(".oper");
const showBtn = document.querySelector(".show");
const resultBtn = document.querySelector(".result");
const resetBtn = document.querySelector(".reset");
let numStrA = "";
let numStrB = "";
let operationType = "";

// input number
for (let num of nums){
    num.addEventListener("click", function(){
        // button animation
        if (operationType!="="){
        buttonAnimation(this)
        }
        // Show numbers
        showNumbers(num.textContent);
    }
    )}

// input operation type
for (let i = 0; i<operations.length; i++){
    operations[i].addEventListener("click", function(){
        // button animation
        if (operationType!="="){
            buttonAnimation(this);
            }
        // show Calculation
        showCalculate(i);
    })
}
// reset button
resetBtn.addEventListener("click", function(){
    // button animation
    buttonAnimation(this);
    showBtn.textContent = "";
    resultBtn.textContent="0";
    numStrA = "";
    numStrB = "";
    if (operationType === "="){
        for (let num of nums){
            num.classList.remove("equaled");
        }
        for (let operation of operations){
            operation.classList.remove("equaled");
        }
        resultBtn.classList.remove("result-letter");
    }
    operationType = "";
})

// from keyboard input
document.addEventListener("keydown", function(event){
    const key = event.key;
    if (!isNaN(key)|| key==="."){
        const keyObj = {
            ".":"0", "1":"7", "2":"8", "3":"9", "4":"4", "5":"5", "6":"6", "7":"1", "8":"2", "9":"3", "0":"10"
        }
        // button animation
        if (operationType!="="){
            buttonAnimation(nums[keyObj[key]]);
            }
        // Show numbers
        showNumbers(key);
    }

    const operArray =["/", "*", "-", "+", "="];
    const numIndex = operArray.indexOf(key)
    if(numIndex != -1){
        console.log(key);
        showCalculate(numIndex);
    }
});

function showNumbers(item){
    // show the second number
    if (operationType!="" && operationType!="="){
        numStrB += item;
        showBtn.innerHTML += item;
        console.log("Current Second Number", numStrB);
    }
    // show the first number
    else if (operationType!="="){
        numStrA += item;
        showBtn.innerHTML += item;
        console.log("Current First Number", numStrA);
    }
}

function showCalculate(num){
        //calculate 
        if (operationType!= "" && numStrB != ""){
            let num1 = numStrA;
            let num2 = numStrB;
            numStrA = calcOperation(num1, num2, operationType);
            numStrB = "";
            resultBtn.innerHTML = numStrA;
            if (numStrA === "Can't divide by 0"){
                operationType = "=";
                console.log("Operation type1", operationType);
            }
        }
        //Show the opration type and not for adding the operation types twice
        const operArray =["/", "*", "-", "+", "="];
        const fontAwesomeArray = [
            '<i class="fas fa-divide"></i>', 
            '<i class="fas fa-times"></i>',
            '<i class="fas fa-minus"></i>',
            '<i class="fas fa-plus"></i>',
            '<i class="fas fa-equals"></i>'
            ]
        const condition1 = showBtn.innerHTML.slice(-1) != ">";
        const condition2 = resultBtn.textContent != "Can't divide by 0";
        if (condition1 && condition2){
            showBtn.innerHTML += fontAwesomeArray[num];
            operationType = operArray[num];
            console.log("Operation Type2", operationType);
        }
        //in case of pressed "="
        if (operationType === "="){
            for (let num of nums){
                num.classList.add("equaled");
            }
            for (let operation of operations){
                operation.classList.add("equaled");
            }
            resultBtn.classList.add("result-letter");
        }
}

// calculation function
function calcOperation(num1, num2, oper){
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    let result;
    switch (oper) {
        case "+":
            result = num1 + num2;
            break;
        case "-":
            result = num1 - num2;
            break;
        case "*":
            result = num1 * num2;
            break;
        case "/":
            if(num2 === 0){
                result = "Can't divide by 0";
            } else {
                result = Math.round((num1 / num2)*10000)/10000;
            }
        break;
    }
    return result;
}

//animation effect of buttons
function buttonAnimation(btn){
    btn.classList.add("pressed");
    setTimeout(function(){
        btn.classList.remove("pressed");
    }, 200)
}





