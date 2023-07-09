let data = [];

//Constructor
function recipeData(name, instruction, ingredient){
    this.name = name;
    this.instructions = instruction;
    this.ingredients = ingredient;
}

//Function to fetch recipe by name
function searchByName(name){
    for(let i = 0; i < data.length; i++){
        if (data[i].name == name){
            let response = new recipeData(name, data[i].instructions, data[i].ingredients);
            return response;
        }
    }
    let response = new recipeData(name, ["No instructions found"], ["No ingredients found"]);
    return response;
}

//Function to add new recipe
function addRecipe(name, instruction, ingredient){
    let newRecipe = new recipeData(name, instruction, ingredient);
    data.push(newRecipe);
    return data[data.length -1];
}

//Function to add images
function addImages(data){
    console.log(data);
    return ("Hi");
}

module.exports = { searchByName, addRecipe, addImages };