// let firstHeader=document.getElementById("date").innerHTML=new Date()
document.getElementById("btnUpdate").style.display="none"
const notify = (msg, type) => {
    let background = "";
    switch (type) {
      case "success":
        background = "linear-gradient(to right, #00b09b, #96c93d)"; // Green gradient
        break;
      case "error":
        background = "linear-gradient(to right, #ff5f6d, #ffc371)"; // Red gradient
        break;
      default:
        background = "linear-gradient(to right, #434343, #000000)"; // Black gradient
    }
    Toastify({
      text: msg,
      duration: 3000,
      gravity: "top", // `top` or `bottom`
      position: "left", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: background,
      },
    }).showToast();
  };
const showOutput=(result)=>{
return document.getElementById("output").innerHTML= result;
}

function clearOuput(){
return document.getElementById("output").innerHTML=""
}
const emptyInputfield=()=>{
    document.getElementById("title").value=""
    document.getElementById("location").value=""
    document.getElementById("description").value=""
}
const getInput=(input)=>{
    return document.getElementById(input).value;
}
const setFieldValue=(FieldId,value)=>{
   document.getElementById(input).value=value 
}
const randomId=()=>{
    return Math.random().toString(36).slice(2);
}
const handleSubmit=()=>{
  event.preventDefault()
    let title=getInput("title").trim()
    let location=getInput("location").trim()
    let description=getInput("description").trim()
    if (title.length<3) {
        notify("please enter your title properly","error");
        return
    }
    if (location.length<3) {
        notify("please enter your location properly","error");
        return
    }
    if (description.length<3) {
        notify("please enter your description properly","error");
        return
    }
    let todo= {title,location,description}
    let id =randomId()
     todo.status= "ACTIVE"
     let todos= JSON.parse(localStorage.getItem("todos"))|| []
     todos.push(todo)
     localStorage.setItem("todos",JSON.stringify(todos))
     notify("User is successfully added")
     showtodos()
     emptyInputfield()
}

function showtodos(){

  clearOuput()
  const todos=JSON.parse(localStorage.getItem("todos"))|| []
// console.log(todos.length);
  if (!todos.length) {
    showOutput("<h5 class='text-center m-2'>Hurray ! there is no task.Please press add  your task </h5>")
    return;
  }

  let tableStartingCode = '<div class="table-responsive"><table class="table">';
  let tableHead = '<thead><tr><th scope="col">#</th><th scope="col">Title</th><th scope="col">Location</th><th scope="col">Description</th><th scope="col">Action</th></tr></thead>';
  let tableEnding = '</table><div>';

  let tableBody = '';
  for (let i = 0; i < todos.length; i++) {
   let todo= todos[i]
      tableBody += `<tr><th scope="row">${i + 1}</th><td>${todo.title}</th><td>${todo.location}</td><td>${todo.description}</td><td> 
      <button class ="btn btn-sm btn-info" data-value="${todo.id}"onclick=editTodo(event)>Edit </button>
      <button class="btn btn-sm btn-danger ms-2" data-value="${todo.id}" onclick="deleteTodo(event)">Delete </td> </td></tr>`;
      
  }

  let table = tableStartingCode + tableHead + '<tbody>' + tableBody + '</tbody>' + tableEnding;
  // console.log(table);
  showOutput(table)
}

showtodos()






