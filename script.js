document.getElementById("sec").style.display="none"
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
      gravity: "top", // top or bottom
      position: "left", // left, center or right
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: background,
      },
    }).showToast();
  };


//   const inputField= (id)=>{
//     return document.getElementById("id").value
//   }


  const randomId=()=>{
    return Math.random().toString(36).slice(2)
  }
let users= [];

const addUser=(event)=>{
    event.preventDefault()
    // email= inputField(email)
    // password=inputField(password)

    email= document.getElementById("email1").value.trim()
    password=  document.getElementById("password1").value.trim()

    if (email.length<6 && password.length<6) {
      notify("please enter correct input field", "error")
    }
    let user={
        email,
        password
    
    }
    user.status= "active"
    user.CreatedAt=new Date()
    user.id=randomId()
    let userFound= users.find(item => item.email === user.email)

    if (!userFound) {
        users.push(user)
        notify("user is sucessfully added", "success")
        document.getElementById("fir").style.display="none"
        document.getElementById("sec").style.display="block"
        return
    }
    notify("user already exists","error")

    console.log(users);
   
}


// const validate = () => {
//   event.preventDefault();

//   let email = document.getElementById("email2").value.trim();
//   let password = document.getElementById("password2").value.trim();

//   let found = users.some(user => user.email === users.email && user.password === users.password);
//    console.log(found);
//   if (found) {
//     notify("User is successfully logged in", "success");
//     document.getElementById("login").innerHTML = email;
//     return;
//   }

//   notify("Invalid Information", "error");
// };

const validate = (event) => {
  event.preventDefault();

  const email = getInputValue("email2");
  const password = getInputValue("password2");

  const userFound = users.find(user => user.email === email && user.password === password);

  if (userFound) {
      notify("User is successfully logged in", "success");
      document.getElementById("login").innerHTML = email;
      return;
  }
  console.log(userFound);

  notify("Invalid Information", "error");
};