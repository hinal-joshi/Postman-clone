//Utility functions
//1. Utility function to get DOM element from string
function getElementFromString(string) {
  let div = document.createElement("div");
  div.innerHTML = string;
  return div.firstElementChild;
}

//Initialize no of parameters
let addedParamCount = 0;

//Hiding the parameters box initially
let parametersBox = document.getElementById("parametersBox");
parametersBox.style.display = "none";

//If the user clicks on params box, hide the json box
let paramsRadio = document.getElementById("paramsRadio");
paramsRadio.addEventListener("click", () => {
  document.getElementById("requestJsonBox").style.display = "none";
  document.getElementById("parametersBox").style.display = "block";
});

//If the user clicks on json box, hide the params box

let jsonRadio = document.getElementById("jsonRadio");
jsonRadio.addEventListener("click", () => {
  document.getElementById("parametersBox").style.display = "none";
  document.getElementById("requestJsonBox").style.display = "block";
});

//If the user clicks on + button, add more parameters
let addParam = document.getElementById("addParam");
addParam.addEventListener("click", () => {
  let params = document.getElementById("params");
  let string = `<div class="form-row my-2">
                  <label for="url" class="col-sm-2 col-form-label">Parameter ${
                    addedParamCount + 2
                  }</label>
                  <div class="col-md-4">
                    <input type="text" class="form-control" placeholder="Enter Parameter ${
                      addedParamCount + 2
                    } Key" id="parameterKey${addedParamCount + 2}" />
                  </div>
                  <div class="col-md-4">
                    <input type="text" class="form-control" placeholder="Enter Parameter ${
                      addedParamCount + 2
                    } Value" id="parameterValue${addedParamCount + 2}" />
                  </div>
                  <button class="btn btn-primary deleteParam"> - </button>
                </div>`;
  //Convert the element string to DOM node
  let paramElement = getElementFromString(string);
  params.appendChild(paramElement);
  // console.log(paramElement);
  //Add an event listener to remove the parameter on clicking - button
  let deleteParam = document.getElementsByClassName("deleteParam");
  for (item of deleteParam) {
    item.addEventListener("click", (e) => {
      e.target.parentElement.remove();
    });
  }
  addedParamCount++;
});

//If the user clicks on submit button
let submit = document.getElementById("submit");
submit.addEventListener("click", () => {
  document.getElementById("responseJsonText").value =
    "Please wait... Fetching response..";
  //Fetch all the values user has entered
  let urlField = document.getElementById("urlField").value;
  let requestType = document.querySelector("input[name='requestType']:checked")
    .value;
  let contentType = document.querySelector("input[name='contentType']:checked")
    .value;

  

  //If user has used params option,collect all the parameters in an object
  if (contentType == "params") 
  {
    data = {};
    for (let i = 0; i < addedParamCount + 1; i++)
    {
      if (document.getElementById("parameterKey" + (i + 1)) != undefined) {
        let key = document.getElementById("parameterKey" + (i + 1)).value;
        let value = document.getElementById("parameterValue" + (i + 1)).value;
        data[key] = value;
      }
    data = JSON.stringify(data);
    }
  }
  else{
    data = document.getElementById('requestJsonText').value;
  }
  //log all the values in the console for debugging
  console.log("URL is", urlField);
  console.log("request type is", requestType);
  console.log("Content type is", contentType);
  console.log('data is',data);
  //If the request type is get, invoke fetch api to create a post request
  if(requestType =='GET')
  {
    fetch(urlField,{
      method: 'GET'
    })
    .then(response=>response.text())
    .then((text)=>{
      document.getElementById('responseJsonText').value = text;
    }); 
  }
  else
  {
    fetch(urlField,{
      method: 'POST',
      body:data,
      headers:{
        "Content-type":"application/json; charset=UTF-8"
      }
    })
    .then(response=>response.text())
    .then((text)=>{
      document.getElementById('responseJsonText').value = text;
    }); 
  }
});
