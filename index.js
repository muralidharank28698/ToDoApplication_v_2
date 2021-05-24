// id getting from html page

const $inputBox=document.getElementById("inputbox");
const $btnClick=document.getElementById("btnEvent");
const $taskListVar = document.getElementById("taskList");

// create array to store the task in local storage
let taskArr=[];

//toggle function
function toggleFn(){
   this.classList.toggle("listStyle");
   const taskValues=this.innerText;
   
// to store the task value in array with object model
   for(i=0;i<taskArr.length;i++){
      const taskObj=taskArr[i];
      if(taskObj.value===taskValues){
         taskObj.isCompleted = !taskObj.isCompleted;
      }
   }
   setTask();
}

// setTask Function
function setTask(){
   localStorage.setItem("tasks",JSON.stringify(taskArr));
}

// getTasks function
function getTasks(){
  let tasks=localStorage.getItem("tasks");
   if(!tasks){
     return;
  }
   tasks = JSON.parse(tasks);

   // to push the task in taskArr using forin loop
   for(index in tasks){
   createTask(tasks[index].value,tasks[index].isCompleted);
   taskArr.push(tasks[index]);
}
}
getTasks();

// createTask Function
function createTask($userInputValue,isCompleted){
   const $inputLength= $userInputValue.length;
   let count=0;
   for(let i=0;i<$inputLength;i++){
      if($userInputValue[i]===" "){
         count++;
      }
   }

// if user type only space at that time it will show alert message
   if($inputLength===count){
      return alert("enter valid task...");
   }
   const $newElement=document.createElement("div");
   $newElement.innerText= $userInputValue;
   if(isCompleted){
      $newElement.setAttribute("class","listStyle taskStyle");
   }else{
      $newElement.setAttribute("class","taskStyle");
   }

   // addEventListener
   $newElement.addEventListener('click',toggleFn);
   $newElement.addEventListener('dblclick',handleRemove);
   $taskListVar.append($newElement);
   $inputBox.value="";
}

//remove function
function handleRemove(){
   this.remove();
     let newTaskArr=taskArr.filter(task =>{
      return task.value != this.innerHTML;
   })
   taskArr=newTaskArr;
   setTask();
}

//button press function 
function btnFunction(){
const $userInputValue =$inputBox.value;

//if user didn't type anything at that time it will show alert msg
if($userInputValue.length===0){
   return alert("enter some task...");
}

// if task value are equal to show alert message
for(i=0;i<taskArr.length;i++){
   const taskObj=taskArr[i];
   if(taskObj.value===$userInputValue){
      return alert("task already exist");
   }
}

// to create empty object
let taskObj={};
taskObj.value=$userInputValue;
taskObj.isCompleted=false;
taskArr.push(taskObj);
setTask();
createTask($userInputValue,false);
}

//keypress event function
function keyPressFunction(e){
      if (e.code==="Enter" && e.target.value !==''){
      btnFunction();
   }
}

//event lintener
$btnClick.addEventListener('click',btnFunction);
$inputBox.addEventListener('keyup',keyPressFunction);



     




 
