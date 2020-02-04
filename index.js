var inputField = document.getElementById('todo-input-field');

/* <div class="todo-item">
<h3 class="todo-message">Buy Apples</h3>
<i class="fas fa-trash-alt"></i>
</div> */

var todoList = document.getElementById('todo-list');
function gettodos(){
  var todolist = localStorage.getItem("todo-list");
  todolist = todolist === null ? [] :JSON.parse(todolist);
  return todolist; 
}

function renderTODOcreation(message ){
  
  if(message){
    var newCard = createTODOCard(message);
  var firstElem = todoList.firstElementChild;
  todoList.insertBefore(newCard, firstElem);
  }else{
    alert("Input field can't be left empty")
  }
}



function fromstorage(){
  var todolistfromstorage = gettodos();
  if(todolistfromstorage !==[]){
    for(var i=0; i<todolistfromstorage.length; i++){
      console.log(todolistfromstorage[i]);
      renderTODOcreation(todolistfromstorage[i].message);
    }
  }
}
fromstorage();
// localStorage.setItem("todo-list",JSON.parse([]));
function createTODOCard(msg) {

      // <div id="first-elem" class="todo-item">
      //           <div class="horizontal-align todo-message-cont">
      //           <h3 class="todo-message">Buy Apples</h3>
      //       </div>
      //           <div>
      //           <i class="far fa-edit"></i>
      //           <i class="fas fa-trash-alt"></i>
      //           </div>
      //           <div class="horizontal-align todo-edit">
      //               <input class="edit" type="text" placeholder="todo" /><button>Update</button>
      //           </div>
      // </div>



  var todolistfromstorage=gettodos();
    var mainCard = document.createElement('div');
    mainCard.className = 'todo-item';
    mainCard.id = 'todo' + (todolistfromstorage.length + 1);


    todoList.appendChild(mainCard)
    
    var message = document.createElement('h3');
    // console.log(message);
    message.innerHTML = msg;
    message.className = 'todo-message'
    mainCard.appendChild(message);
    var messagecontainer = document.createElement('input');
     messagecontainer.className = 'input-update-field';
     messagecontainer.style.display="none";
     mainCard.appendChild(messagecontainer);
     
     var updateBtn = document.createElement("button")
     updateBtn.innerHTML = "Update";
     updateBtn.style.display="none";
     updateBtn.onclick = function (){
         var textData = messagecontainer.value;
         console.log(textData)
         if(textData===''){
             alert("please update any value")
         }else{
             message.innerHTML= textData; 
             messagecontainer.style.display="none";
             updateBtn.style.display="none";
             
         }
         messagecontainer.value = '';
     }
     
     mainCard.appendChild(updateBtn)
    
     var editIcon = document.createElement('i');
     editIcon.className = 'fas fa-edit';
     editIcon.onclick= function(){
         messagecontainer.style.display="block";
         updateBtn.style.display="block";
     }
     mainCard.appendChild(editIcon);
    var deleteIcon = document.createElement('i');
    deleteIcon.className = 'fas fa-trash-alt';

    deleteIcon.onclick = function() {
        // alert('Delete Icon was clicked for Element with ID => ' +  mainCard.id);
        // console.log("todo-list".indexOf(mainCard.id));
        // console.log(JSON.parse(localStorage.getItem("todo-list"))[1]);
        var selectedElem = document.getElementById(mainCard.id);
        selectedElem.remove();
        // console.log(selectedElem.message);
        remove.localStorage();
        
    }

    mainCard.appendChild(deleteIcon);
  
 

    return mainCard;
}

function handleTODOcreation(){
  var message=inputField.value;
  if(message){
    var newCard = createTODOCard(message);
    console.log(newCard)
  var firstElem = todoList.firstElementChild;
  todoList.insertBefore(newCard, firstElem);
  inputField.value = '';

  var mObj={
    id: newCard.id,
    message:message
  }
  var todolist = gettodos();
  todolist.push(mObj);
  localStorage.setItem('todo-list', JSON.stringify(todolist));
  console.log(todolist);
  }else{
    alert("Input field can't be left empty")
  }
}
inputField.onkeyup = function(e) {
    // console.log(e.key)
    if(e.key === 'Enter') {
        var inputValue = inputField.value;
      handleTODOcreation()
    }
}

var btnAddTODO = document.getElementById('btn-add-todo');
btnAddTODO.onclick = function(e) {
  handleTODOcreation();
}
