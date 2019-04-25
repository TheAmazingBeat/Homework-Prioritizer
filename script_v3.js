/*These are variables that are needed to be accessed in different functions*/
var classes = [];
classesList = document.querySelector(".class-list");
homeworks = [];
hwCounter = [];
instructions = document.querySelector(".instructions");
priorList = [];
priorityMajor = [];
priorityMinor = [];
var numOfClasses = 0;
var classItem;
/*Date objects*/
var date = new Date();
var year = date.getFullYear();
var month = date.getMonth() + 1;
var day = date.getDate();
/***************************************************************************/



/*Adds text input for the names of classes*/
function addClass(){
    numOfClasses++;

    classItem = document.createElement("li");
    classItem.classList.add("class-item");
    var classInput = document.createElement("input");
    classInput.classList.add("class-input");
    classInput.type = "text";
    classInput.placeholder = "Class Name";

    classes.push("class-item");
    classItem.appendChild(classInput);
    classesList.appendChild(classItem);
}


/*Deletes a text input*/
function deleteClass(){
    document.querySelector(".class-item").parentElement.removeChild(document.querySelector(".class-item"));
    numOfClasses--;
}


/*Input validation and moves on to the homework menu*/
function next(){
    for (x = 0; x < numOfClasses; x++) {
        if (document.querySelectorAll(".class-input")[x].value == "") {
            document.querySelector(".alert").classList.toggle("invisible");
        } else if (!document.querySelectorAll(".class-input")[x].value == ""){
            if(document.querySelector(".alert").classList.contains("invisible") == false){
                document.querySelector(".alert").classList.toggle("invisible");
            }

            for(i = 0; i < numOfClasses; i++){
                classes[i] = new Object();
                classes[i].name = document.querySelectorAll(".class-input")[i].value;
        
                document.querySelectorAll(".class-input")[i].readOnly = "true";
            }

            document.querySelector(".class-menu").classList.toggle("invisible");

            document.querySelector(".instructions").innerText = "Fill out the homework menu below and click prioritize:";
            document.querySelector(".hw-menu").classList.toggle("invisible");
        }
    }

}


/*Adds a text input, dropdown menus for type, class, and due date*/
function addHomework() {
    var homeworkItem = document.createElement("li");
    homeworkItem.classList.add("homework-item");

    var hwInput = document.createElement("input");
    hwInput.type = "text";
    hwInput.classList.add("homework-input");
    hwInput.placeholder = "Name of Homework";

    /*creates a dropdown menu for homework type, then the options in it*/
    var hwType = document.createElement("select");
    hwType.classList.add("hw-type-dropdown");
    var homeworkMinor = document.createElement("option");
    homeworkMinor.label = "Minor";
    homeworkMinor.setAttribute("value", "Minor");
    var homeworkMajor = document.createElement("option");
    homeworkMajor.label = "Major";
    homeworkMajor.setAttribute("value", "Major");
    hwType.appendChild(homeworkMinor);
    hwType.appendChild(homeworkMajor);

    /*creates a date dropdown menu*/
    var hwDate = document.createElement("input");
    hwDate.classList.add("hw-date");
    hwDate.setAttribute("type", "date");
    if(day < 10){
        hwDate.setAttribute("value", year + "-" + "0" + month + "-" + "0" + day);
    } else{
        hwDate.setAttribute("value", year + "-" + "0" + month + "-" + day);
    }
    
    /* creates a dropdown menu for what class the homework is for */
    var hwClass = document.createElement("select");
    hwClass.classList.add("hw-class");
    for (i = 0; i < numOfClasses; i++) {
        var classOption = document.createElement("option");
        var classOptionName = document.createTextNode(classes[i].name);
        classOption.appendChild(classOptionName);
        classOption.setAttribute("value", classes[i].name)
        hwClass.appendChild(classOption);
    }

    homeworkItem.appendChild(hwInput);
    homeworkItem.appendChild(hwType);
    homeworkItem.appendChild(hwDate);
    homeworkItem.appendChild(hwClass);

    hwCounter.push(document.querySelector(".hw-list").appendChild(homeworkItem));
}


/*Deletes a homework input*/
function deleteHomework(){
    document.querySelector(".homework-item").parentElement.removeChild(document.querySelector(".homework-item"));
    hwCounter--;
}


/*stores all values from input elements created in addHomework()*/
function storeHW(numOfHw) {
    for (i = 0; i < numOfHw; i++) {
        homeworks[i] = new Object();
        homeworks[i].name = document.querySelectorAll(".homework-input")[i].value;
        homeworks[i].type = document.querySelectorAll(".hw-type-dropdown")[i].value;
        homeworks[i].class = document.querySelectorAll(".hw-class")[i].value;
        homeworks[i].dueDate = document.querySelectorAll(".hw-date")[i].value;
    }
    console.log(homeworks);
}


function compareHW(numOfHw){
    for(i = 0; i < numOfHw; i++){

        if(i + 1 > numOfHw - 1){
            var otherPosIndex = numOfHw - 1;
        } else{
            var otherPosIndex = i + 1;
        }

        if(i - 1 <= 0){
            var otherNegIndex = 0;
        } else{
            var otherNegIndex = i - 1;
        }

        if(homeworks[i].type === "Major"){
            if(homeworks[i].dueDate <= homeworks[otherPosIndex].dueDate){
                priorList.unshift(homeworks[i].name);
                priorityMajor.unshift(homeworks[i].name);
                console.log("Majors: " + priorityMajor);
                console.log("priority:" + priorList);
            } else if(homeworks[i].dueDate <= homeworks[otherNegIndex].dueDate){
                priorList.splice(otherNegIndex, 0, homeworks[i].name);
                priorityMajor.splice(otherNegIndex, 0, homeworks[i].name);
                console.log("Majors: " + priorityMajor);
                console.log("priority:" + priorList);
            } else{
                priorList.push(homeworks[i].name);
                priorityMajor.push(homeworks[i].name);
                console.log("Majors: " + priorityMajor);
                console.log("priority:" + priorList);
            }

        } else if(homeworks[i].type === "Minor"){
            if(homeworks[i].dueDate <= homeworks[otherPosIndex].dueDate){
                priorList.unshift(homeworks[i].name)
                priorityMinor.unshift(homeworks[i].name);
                console.log("Minors: " + priorityMinor);
                console.log("priority:" + priorList);
            } else if (homeworks[i].dueDate <= homeworks[otherNegIndex].dueDate){
                priorList.splice(otherNegIndex, 0, homeworks[i].name);
                priorityMinor.splice(otherNegIndex, 0, homeworks[i].name);
                console.log("Minors: " + priorityMinor);
                console.log("priority:" + priorList);
            } else{
                priorList.push(homeworks[i].name);
                priorityMinor.push(homeworks[i].name);
                console.log("Minors: " + priorityMinor);
                console.log("priority:" + priorList);
            }
        }
    }
}


/*organizes the homework from highest difficulty and lowest difficulty*/
function prioritize(numOfHw) {
    priorList = [];

    storeHW(numOfHw);
    compareHW(numOfHw);
    console.log(priorList);

    /*makes homework menu invisble*/
    document.querySelector(".instructions").innerText = "Here's how you should do your homework in order:";
    document.querySelector(".hw-menu").classList.toggle("invisible");

    /*shows the priority onto the web page*/
    for (x = 0; x < numOfHw; x++) {
        var priorHomework = document.createElement("li");
        priorHomework.style = "list-style: numbered"
        var priorHomeworkName = document.createTextNode(priorList[x]);
        priorHomework.appendChild(priorHomeworkName);
        document.querySelector(".hw-prioritized").appendChild(priorHomework);
    }

}