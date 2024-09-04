document.addEventListener('DOMContentLoaded', (event) => {
  document.getElementsByName("contact").addEventListener("submit", function(e) {
      e.preventDefault() // Cancel the default action
      sendContactForm();
  });
});
function formvalidate(){
const fields = ["fname", "lname","email","query","message","checkbox"];
  document.querySelectorAll('.error').forEach(e => e.textContent = '');

var t=1;
fields.forEach(function (item, index){
    if(item=="query"){
      if(document.getElementsByName('rad').checked){
        ;
      }else{
        document.getElementById("error"+item).textContent = "Please select a query type";
      }
    }
    else if(item=="email"){
      if(document.forms["contact"][item].value==''){
        document.getElementById("error"+item).textContent = "This field is required";
      }
      // if(re.test(email)){
      //   ;
      // }else{
      //   document.getElementById("error"+item).textContent = "Please enter a valid email address";
      // }
    
    }
    else if(item=="checkbox"){
      if(document.getElementsByName(item).checked){
        ;
      }
      else{
        document.getElementById("error"+item).textContent = "To submit this form, please consent to being contacted";

      }
    }
    else {
      console.log(item);
         t= document.forms["contact"][item].value;
         if(t==''){
          document.getElementById("error"+item).textContent = "This field is required";
         }
      }
    
    });
    // alert("Hello");  
    // else{
    //     let x = document.forms["myForm"][field].value;
    //       if (x == "") {
            
    //       }
          
    //     }
    

}
// function changecolor(element) {
//   // Get the container div
//   element.parentNode.classList.add('active');
//   console.log(element.parentNode);
//   element.parentNode.toggle('active')
// }

function changecolor(selectedDivId) {
  // Get all radio container divs
  var containers = document.querySelectorAll('.query');

  // Remove 'active' class from all containers
  containers.forEach(function(container) {
    container.classList.remove('active');
  });

  // Add 'active' class to the selected container
  var selectedContainer = document.getElementById(selectedDivId);
  if (selectedContainer) {
    selectedContainer.classList.add('active');
  }
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

