//Document elements defined to constants
const recipeName = document.getElementById("recipe-name");
const instructions = document.getElementById("instructions-list");
const ingredients = document.getElementById("ingredients-list");
const inputName = document.getElementById("name-text");
const inputIngredient = document.getElementById("ingredients-text");
const addIngredient = document.getElementById("add-ingredient");
const inputInstruction = document.getElementById("instructions-text");
const addInstruction = document.getElementById("add-instruction");
const imageInput = document.getElementById("image-input");
const submitRecipe = document.getElementById("submit");

let recipeInstruction = [];
let recipeIngredients = [];

//Fetch "pizza" on page load
window.addEventListener("load", function() {
    const target = "pizza";
    fetch("http://localhost:3000/recipe/" + target, {
        method: "get"
    })
    .then(response => response.text())
    .then(text => {
        const targetObject = JSON.parse(text);
        recipeName.innerText = targetObject.name;
        populateList(instructions, targetObject.instructions);
        populateList(ingredients, targetObject.ingredients);
    });
});

//Add ingredient
addIngredient.addEventListener("click", function() {
    recipeIngredients.push(inputIngredient.value);
    inputIngredient.value = "";
});

//Add instruction
addInstruction.addEventListener("click", function() {
    recipeInstruction.push(inputInstruction.value);
    inputInstruction.value = "";
});


//Recipe submit
submitRecipe.addEventListener("click", function() {
    fetch("http://localhost:3000/recipe/", {
        method: "post",
        headers: {
            "Content-type": "application/json"
        },
        body: '{ "name":"' + inputName.value + '", "instructions":"' + recipeInstruction + '", "ingredients":"' + recipeIngredients +'"}'
    })
    .then(response => response.text())
    .then(text => {
        //console.log(text);
        recipeInstruction = [];
        recipeIngredients = [];
        inputName.value = "";
    })
    if(imageInput.value != ''){
        const formData = new FormData();
        for(let i = 0; i < imageInput.files.length; i++){
            formData.append('images', imageInput.files[i]);
        }    
        fetch("http://localhost:3000/images", {
            method: "post",
            headers: {
                "Content-type": "multipart/form-data"
            },
            body: formData    
        })
        .then(response => response.text())
        .then(text => {
            imageInput.value = "";
            console.log(text)})
        .catch(error => console.log(error));
    }
});

//Function to populate lists, target is the list that is being populated with content "data"
function populateList(target, data){
    let content = "";
    for (let i = 0; i < data.length; i++){
        content = content + "<li>" + data[i] + "</li>";
    }
    target.innerHTML = content;
}