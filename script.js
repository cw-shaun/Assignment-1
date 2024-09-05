function formvalidate(){
const fields = ["fname", "lname","email","query","message","checkbox"];
  document.querySelectorAll('.error').forEach(e => e.textContent = '');
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

var valid=true;
fields.forEach(function (item, index){
    if(item=="query"){
      if(document.getElementById('q1').checked || document.getElementById('q2').checked){
        ;
      }else{
        document.getElementById("error"+item).textContent = "Please select a query type";
        valid=false;
      }
    }
    else if(item=="email"){
      if(document.forms["contact"][item].value==''){
        document.getElementById("error"+item).textContent = "This field is required";
        document.getElementById(item).style.border="1px solid red";
        valid=false;
      }
      else if (emailPattern.test(document.forms["contact"][item].value)){
        document.getElementById(item).style.border="1px solid black";
      }else{
        document.getElementById("error"+item).textContent = "Please enter a valid email address";
        document.getElementById(item).style.border="1px solid red";
        valid=false;
      }
    
    }
    else if(item=="checkbox"){
      if(document.getElementById(item).checked){
        ;
      }
      else{
        document.getElementById("error"+item).textContent = "To submit this form, please consent to being contacted";
        valid=false;
      }
    }
    else {
      console.log(item);
      document.getElementById(item).style.border="1px solid black";
      t= document.forms["contact"][item].value;
      if(t==''){
        document.getElementById("error"+item).textContent = "This field is required";
        document.getElementById(item).style.border="1px solid red";
          valid=false;
         }
      }
    
    });
    if (valid){
      // function showMessage() {
      //   document.getElementById("customAlert").style.display = "flex";
      // }
      const messageDiv = document.getElementById('successMessage');
      messageDiv.style.display = 'block'; // Show the message

      // Optionally, hide the message after 3 seconds
      setTimeout(() => {
        messageDiv.style.display = 'none';
      }, 3000);
    }
    
  
      // showMessage();
    }
  


function changecolor(selectedDivId) {
  var containers = document.querySelectorAll('.query');

  containers.forEach(function(container) {
    container.classList.remove('active');
  });

  var selectedContainer = document.getElementById(selectedDivId);
  if (selectedContainer) {
    selectedContainer.classList.add('active');
  }
}
function removeNumbers(input) {
  input.value = input.value.replace(/[0-9]/g, '');
}


// function validateForm() {
//   // Clear previous errors
//   document.querySelectorAll('.error').forEach(e => e.textContent = '');

//   // Array of input names and their respective validation functions
//   const validations = [
//       {
//           name: 'fname',
//           validate: value => value.trim() !== '',
//           errorId: 'errorFirstName',
//           errorMsg: 'This field is required.'
//       },
//       {
//           name: 'lastName',
//           validate: value => value.trim() !== '',
//           errorId: 'errorLastName',
//           errorMsg: 'This field is required.'
//       },
//       {
//           name: 'email',
//           validate: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
//           errorId: 'errorEmail',
//           errorMsg: 'Please enter a valid email address'
//       },
//       {
//           name: 'message',
//           validate: value => value.trim() !== '',
//           errorId: 'errorMessage',
//           errorMsg: 'This field is required'
//       },
//       {
//           name: 'checkbox',
//           validate: () => document.getElementById('checkbox').checked,
//           errorId: 'errorCheckbox',
//           errorMsg: 'To submit this form, please consent to being contacted'
//       },
//       {
//           name: 'queryType',
//           validate: () => document.querySelector('input[name="queryType"]:checked') !== null,
//           errorId: 'errorQueryType',
//           errorMsg: 'Please select a query type.'
//       }
//   ];

//   let isValid = true;

//   // Perform validation
//   validations.forEach(({ name, validate, errorId, errorMsg }) => {
//       let value;
//       if (name === 'queryType') {
//           value = document.querySelector('input[name="queryType"]:checked');
//       } else {
//           value = document.getElementById(name).value;
//       }

//       if (!validate(value)) {
//           document.getElementById(errorId).textContent = errorMsg;
//           isValid = false;
//       }
//   });

//   // If valid, you can proceed with form submission
//   if (isValid) {
//       alert('Form submitted successfully!');
//       // Perform form submission or further processing
//   }
// }

