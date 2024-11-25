var siteNameInput = document.getElementById("SiteName");
var siteURLinput = document.getElementById("SiteLink");
var siteNameRegex = /^[a-z0-9]{3,}$/i; //regex el name input
var siteURL_Regex = /^(https:\/\/)[a-z]{3,}(\.com)$/i; // regex el URL mslan -> https://google.com 

var storedBookmarks = localStorage.getItem('allBookmarks');
if (storedBookmarks) {
    allBookmarks = JSON.parse(storedBookmarks);
    displayItems();
} else {
    allBookmarks = []; 
}


// 3shan ye3red kol el fel storage b3 el refresh

function Additem() { // lama yetdas 3la el add button
if(CheckIfSameName(siteNameInput.value)==1){

    var validationCall = validation(siteNameInput.value, siteURLinput.value);
    if (validationCall == true) {

        var Webinfo = {
            Name: siteNameInput.value,
            link: siteURLinput.value,
        };
        allBookmarks.push(Webinfo);
        clearInputs();
        displayItems();
        var arrToString = JSON.stringify(allBookmarks);
        localStorage.setItem("allBookmarks", arrToString);


    }
    else {
        alert(validationCall);
    }

}
else{
    alert("The name is already taken, Please write another Name");
}


}


function clearInputs() {
    siteNameInput.value = "";
    siteURLinput.value = "";

}

function displayItems() { //printing kol el fel array lel html
    var sum = " ";
    for (var i = 0; i < allBookmarks.length; i++) {
        sum += `
       <tr class="text-center">
                    <th scope="row">${i + 1}</th>
                    <td>${allBookmarks[i].Name}</td>
                    <td>
                        <a href="${allBookmarks[i].link}" target="_blank">
                            <button class="btn btn-success">
                                <i class="fa-regular fa-eye "></i>
                                Visit
                            </button>
                        </a>
                    </td>
                    <td>
                        <button class="btn btn-danger" onclick="DeleteElement(${i})">
                            <i class="fa-solid fa-trash"></i>
                            Delete
                        </button>
                    </td>

                    <td>
                    <button class="btn btn-warning" onclick="UpdateSecBtn(${i})">
                        <i class="fa-solid fa-wrench"></i>
                        Update
                    </button>
                </td>
                </tr>
        `


    }
    document.getElementById("tableBody").innerHTML = sum;




}

//deleting el element mn el array 
function DeleteElement(idx) { 
    allBookmarks.splice(idx, 1);
    localStorage.setItem('allBookmarks', JSON.stringify(allBookmarks)); // ta3dil 3la el local storage b3d el deletion
    displayItems();

}

var primaryButton = document.getElementById("primaryButton");

function UpdateSecBtn(idx) {
    siteNameInput.value = allBookmarks[idx].Name;
    siteURLinput.value = allBookmarks[idx].link;
    primaryButton.innerHTML = `
    <button class="btn btn-danger mt-4 px-5" onclick="Updateitem(${idx})" > Update</button>  
    `         //replace el add b update button

}

function Updateitem(idx) {
    allBookmarks[idx].Name = siteNameInput.value;
    allBookmarks[idx].link = siteURLinput.value;
    displayItems();
    primaryButton.innerHTML = `<button class="btn btn-danger mt-4 px-5" onclick="Additem()" > Submit</button>` // replace el update b add button tany
    clearInputs();


}
// search function
function SearchElement(key) {
    sum = "";

    for (var i = 0; i < allBookmarks.length; i++) {
        if (allBookmarks[i].Name.toLowerCase().includes(key.toLowerCase())) {
            sum += `
            <tr class="text-center">
                         <th scope="row">${i + 1}</th>
                         <td>${allBookmarks[i].Name}</td>
                         <td>
                             <a href="${allBookmarks[i].link}" target="_blank">
                                 <button class="btn btn-success">
                                     <i class="fa-regular fa-eye "></i>
                                     Visit
                                 </button>
                             </a>
                         </td>
                         <td>
                             <button class="btn btn-danger" onclick="DeleteElement(${i})">
                                 <i class="fa-solid fa-trash"></i>
                                 Delete
                             </button>
                         </td>
     
                         <td>
                         <button class="btn btn-warning" onclick="UpdateSecBtn(${i})">
                             <i class="fa-solid fa-wrench"></i>
                             Update
                         </button>
                     </td>
                     </tr>
             `
        }
    }
    document.getElementById("tableBody").innerHTML = sum;

}


//function to check 3ala el validation bta3 el inputs


function validation(val1, val2) {
    Name_Test = siteNameRegex.test(val1);
    URL_Test = siteURL_Regex.test(val2);
   
    if (Name_Test && URL_Test) {

        return true;

    }

    else if (Name_Test == false) {
        return "Web-site name should start with at least 3 letters"

    }
    else {
        return "website Url should start with (https://) and end with (.com)"
    }




}


// Functions to add el is-valid w el is-invalid classes mn el bootstrap ==>

function addingValidClassesForName(key){
    if(siteNameRegex.test(key)){
        siteNameInput.classList.add("is-valid");
        siteNameInput.classList.remove("is-invalid");
    }
    else{
        siteNameInput.classList.add("is-invalid");
        siteNameInput.classList.remove("is-valid");
    }
}

function addingValidClassesForUrl(key){

    if(siteURL_Regex.test(key)){
        siteURLinput.classList.add("is-valid");
        siteURLinput.classList.remove("is-invalid");
    }
    else{
        siteURLinput.classList.add("is-invalid");
        siteURLinput.classList.remove("is-valid");
    }
}

//


function CheckIfSameName(NewName){
    var flag=1;
    for (var i=0; i<allBookmarks.length; i++){
        if(NewName.toLowerCase()===allBookmarks[i].Name.toLowerCase()){
            flag=0
        }
    }
    return flag;
}