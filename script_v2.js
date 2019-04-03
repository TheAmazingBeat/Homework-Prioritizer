/*These are variables that are needed to be accessed in different functions*/
var classes = [];
classForm = document.querySelector(".class-form"); //the input for the name of the classes

//classDifficulty = [];

classValue = [];
homework = [];
homeworks = [];
homeworkDifficulty = [];
homeworkType = [];
hwCounter = [];
instructions = document.querySelector(".instructions");

//nameOfClasses = []; //name of the classes (value of the classesInput)

numOfClasses = document.querySelector(".number-of-classes");
numClassForm = document.querySelector(".num-class-form"); //the input for the number of classes
priorList = [];
startButton = document.querySelector(".start-button"); //start button



/*makes button invisible and number of classes input show
sets minimum value to 1 class and maximum value to 10 classes*/
function start() {
  document.querySelector(".start-div").classList.add("invisible");
  numClassForm.classList.toggle("invisible");
  instructions.classList.toggle("invisible");
  instructions.innerText = "How many classes do you have?";
  numOfClasses.min = "1";
  numOfClasses.max = "10";
}


/*creates the "next"button*/
function createNextButton(whichButton) {
  var nextButton = document.createElement("button");
  var nextButtonText = document.createTextNode("Next");

  nextButton.appendChild(nextButtonText);
  if (whichButton == 0) {
    nextButton.classList.add("submit-button");
    nextButton.classList.add("next-button");
    classForm.appendChild(nextButton);
  } else if (whichButton == 1) {
    nextButton.classList.add("submit-button");
    nextButton.classList.add("next-button");
    document.querySelector(".difficulty").appendChild(nextButton);
  }
}


/*makes numClassForm invisible and shows the classForm*/
function createClassForm() {
  numClassForm.classList.toggle("invisible");
  classForm.classList.toggle("invisible");
  instructions.innerText = "Write the name of your classes in order:";

  /*creates text inputs to write down the classes*/
  for (i = 0; i < (numOfClasses.value); i++) {
    var createClassForm = document.createElement("input");
    createClassForm.type = "text";
    createClassForm.classList.add("class-form-input");
    classForm.appendChild(createClassForm);
    classForm.appendChild(document.createElement("br"));
  }

  createNextButton(0);

  /*stores the name of the classes into nameOfClasses array*/
  document.querySelectorAll(".next-button")[0].onclick = function() {
    for (i = 0; i < (numOfClasses.value); i++) {
      classes[i] = new Object();
      classes[i].name = document.querySelectorAll(".class-form-input")[i].value;
      //nameOfClasses[i] = document.querySelectorAll(".class-form-input")[i].value;
    }

    //console.log("nameOfClasses: " + nameOfClasses);

    console.log(classes);
    difficulty();
  };
}

function difficulty() {
  classForm.classList.toggle("invisible");
  document.querySelector(".difficulty").classList.toggle("invisible");
  instructions.innerText = "Rank your classes' difficulty from least to greatest:";


  for (i = 0; i < (numOfClasses.value); i++) {
    /*rewrites the classes in a list*/

    //var className = nameOfClasses[i];
    
    var classItemList = document.createElement("ul");
    var classItemListName = document.createTextNode(classes[i].name);
    classItemList.appendChild(classItemListName);
    classItemList.classList.add("class-item");
    document.querySelector(".classes-list").appendChild(classItemList);

    /*making difficulty dropdown menu*/
    var difficultySelect = document.createElement("select");
    difficultySelect.classList.add("select-difficulty");
    var valueCounter = 1;
    /*creates the options in dropdown menu*/
    for (x = 0; x < (numOfClasses.value); x++) {
      var difficultyOption = document.createElement("option");
      var difficultyNum = document.createTextNode(valueCounter);
      difficultyOption.appendChild(difficultyNum);
      difficultyOption.setAttribute("value", valueCounter);
      difficultySelect.appendChild(difficultyOption);
      valueCounter++;
    }
    difficultySelect.options[i].selected = true;
    /*makes the dropdown menu beside each item in the list*/
    var classItems = document.querySelectorAll("ul.class-item");
    for (y = 0; y < classItems.length; y++) {
      classItems[y].appendChild(difficultySelect);
    }
  }

  createNextButton(1);

  /*stores the difficulty of each class into classDifficulty*/
  document.querySelectorAll(".next-button")[1].onclick = function() {
    for (z = 0; z < numOfClasses.value; z++) {
      classes[z].difficulty = document.querySelectorAll(".select-difficulty")[z].value;

      //classDifficulty[z] = document.querySelectorAll(".select-difficulty")[z].value;

    }

    //console.log("classDifficulty: " + classDifficulty);
    
    console.log(classes);
    document.querySelector(".difficulty").classList.toggle("invisible");
    document.querySelector(".hw-manager").classList.toggle("invisible");
    instructions.innerText = "Now, add your homework for any class";
  };
}


/*Adds a text input for homework's name, a dropdown for the type of homework, and a dropdown for which class its for*/
function addHomework() {
  var homeworkItem = document.createElement("ul");

  var homeworkInput = document.createElement("input");
    homeworkInput.type = "text";
    homeworkInput.classList.add("homework-input");

  /*creates options for the type of homework dropdown*/
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

  /*creates the options in the class dropdown*/
  var hwClass = document.createElement("select");
  hwClass.classList.add("hw-class");
  for (i = 0; i < numOfClasses.value; i++) {
    var classOption = document.createElement("option");
    var classOptionName = document.createTextNode(classes[i].name);
      classOption.appendChild(classOptionName);
      classOption.setAttribute("value", classes[i].difficulty);
      hwClass.appendChild(classOption);
  }

  homeworkItem.appendChild(homeworkInput);
  homeworkItem.appendChild(hwType);
  homeworkItem.appendChild(hwClass);

  hwCounter.push(document.querySelector(".hw-list").appendChild(homeworkItem));
}

/*organizes the homework from highest difficulty and lowest difficulty*/
function prioritize(numOfHw) {
  for (i = 0; i < numOfHw; i++) {
    homeworks[i] = new Object();
    homeworks[i].name = document.querySelectorAll(".homework-input")[i].value;
    homeworks[i].type = document.querySelectorAll(".hw-type-dropdown")[i].value;
    homeworks[i].class = document.querySelectorAll(".hw-class")[i].value;

    // homework[i] = document.querySelectorAll(".homework-input")[i].value;
    // homeworkType[i] = document.querySelectorAll(".hw-type-dropdown")[i].value;
    // homeworkDifficulty[i] = document.querySelectorAll(".hw-class")[i].value;
  }
  console.log(homeworks);

  // console.log(homeworkType);
  // console.log(homeworkDifficulty);

  for (i = 0; i < numOfHw; i++) {
    if (homeworks[i].type === 'Major') { //if it is a major homework, it will be the very first
      priorList.unshift(homeworks[i].name);
    } else if (homeworks[i].class >= (Math.max(...homeworks[i].difficulty))) {
        if(priorList.indexOf(priorList[i-1]) == 0 && homeworks[i-1].type != 'Major'){ //replaces the one in front, if and only the front is not a major homework
          priorList.splice(0, 0, homeworks[i].name);
        } else {
          priorList.splice(1, 0, homeworks[i].name);
        }
    } else if (homeworks[i].class >= 8) { //8 and 9 difficulty are near the first
      priorList.splice(priorList.length - 4, 0, homeworks[i].name);
    } else if (homeworks[i].class >= 6) { //6 and 7 difficulty are near the first
      priorList.splice(priorList.length - 3, 0, homeworks[i].name);
    } else if (homeworks[i].class >= 4) { //4 and 5 difficulty are in the middle
      priorList.splice(priorList.length - 2, 0, homeworks[i].name);
    } else if (homeworks[i].class >= 2) { //2 and 3 difficulty are near the last homework
      priorList.splice(priorList.length - 1, 0, homeworks[i].name);
    } else if (homeworks[i].class <= (Math.min(...homeworkDifficulty))) { //if it is the less difficult, homework will be pushed to the last
      priorList.push(homeworks[i].name);
    }
  }
  console.log(priorList);

  //shows the priority onto the web page
  document.querySelector(".hw-manager").appendChild(document.createElement("h3")).innerText = "Here's how you should do your homework in order";
  for(x = 0; x < numOfHw; x++){
    var priorHomework = document.createElement("ul");
    var priorHomeworkName = document.createTextNode((x+1) + ") " + priorList[x]);
    priorHomework.appendChild(priorHomeworkName);
    document.querySelector(".hw-manager").appendChild(priorHomework);
  }

}
