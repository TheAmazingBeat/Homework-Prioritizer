/*These are variables that are needed to be accessed in different functions*/
var classes = [];
classesList = document.querySelector(".class-list");
homeworks = [];
hwCounter = [];
instructions = document.querySelector(".instructions");
priorList = [];
var numOfClasses = 0;
var classItem;

var date = new Data();
var year = date.getFullYear();
var month = date.getMonth() + 1;
var day = date.getDate();


function addClass(){
    numOfClasses++;

    classItem = document.createElement("li");
    classItem.classList.add("class-item");
    var classInput = document.createElement("input");
    classInput.classList.add("class-input");
    classInput.type = "text";

    classes.push("class-item");
    classItem.appendChild(classInput);
    classesList.appendChild(classItem);
}


function deleteClass(){
    document.querySelector(".class-item").parentElement.removeChild(document.querySelector(".class-item"));
}


function next(){
    for (x = 0; x < numOfClasses; x++) {
        if (document.querySelectorAll(".class-input")[x].value == "") {
            document.querySelector(".alert").classList.toggle("invisible");
            console.log("invisible");
        } else if (document.querySelector(".alert").classList.contains("invisible") == false){
            document.querySelector(".alert").classList.toggle("invisible");
            console.log("not invisible");
        }
    }

    for(i = 0; i < numOfClasses; i++){
        classes[i] = new Object();
        classes[i].name = document.querySelectorAll(".class-input")[i].value;

        document.querySelectorAll(".class-input")[i].readOnly = "true";
    }

    for (y = 0; y < document.querySelectorAll(".class-menu-button").length; y++){
        document.querySelectorAll(".class-menu-button")[y].classList.toggle("invisible");
    }

    document.querySelector(".instructions").innerText = "Fill in the menu and click prioritize:";
    document.querySelector(".hw-menu").classList.toggle("invisible");
}


/*Adds a text input, dropdown menus for type, class, and due date*/
function addHomework() {
    var homeworkItem = document.createElement("li");

    var hwInput = document.createElement("input");
    hwInput.type = "text";
    hwInput.classList.add("homework-input");

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
    hwDate.setAttribute("value", year + "-" + "0" + month + "-" + "0" + day);

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


/*organizes the homework from highest difficulty and lowest difficulty*/
function prioritize(numOfHw) {
    storeHW(numOfHw);

    for (i = 0; i < numOfHw; i++) {
        if (homeworks[i].type === 'Major') { //if it is a major homework, it will be the very first
            priorList.unshift(homeworks[i].name);
        } else if (homeworks[i].classDiff >= (Math.max(...homeworks[i].difficulty))) {
            if (priorList.indexOf(priorList[i - 1]) == 0 && homeworks[i - 1].type != 'Major') { //replaces the one in front, if and only the front is not a major homework
                priorList.splice(0, 0, homeworks[i].name);
            } else {
                priorList.splice(1, 0, homeworks[i].name);
            }
        } else if (homeworks[i].classDiff >= 8) { //8 and 9 difficulty are near the first
            priorList.splice(priorList.length - 4, 0, homeworks[i].name);
        } else if (homeworks[i].classDiff >= 6) { //6 and 7 difficulty are near the first
            priorList.splice(priorList.length - 3, 0, homeworks[i].name);
        } else if (homeworks[i].classDiff >= 4) { //4 and 5 difficulty are in the middle
            priorList.splice(priorList.length - 2, 0, homeworks[i].name);
        } else if (homeworks[i].classDiff >= 2) { //2 and 3 difficulty are near the last homework
            priorList.splice(priorList.length - 1, 0, homeworks[i].name);
        } else if (homeworks[i].classDiff <= (Math.min(...homeworkDifficulty))) { //homework pushed to the last if less difficult
            priorList.push(homeworks[i].name);
        }
    }
    console.log(priorList);

    /*shows the priority onto the web page*/
    document.querySelector(".hw-menu").appendChild(document.createElement("h3")).innerText = "Here's how you should do your homework in order";

    for (x = 0; x < numOfHw; x++) {
        var priorHomework = document.createElement("ul");
        var priorHomeworkName = document.createTextNode((x + 1) + ") " + priorList[x]);
        priorHomework.appendChild(priorHomeworkName);
        document.querySelector(".hw-menu").appendChild(priorHomework);
    }

}