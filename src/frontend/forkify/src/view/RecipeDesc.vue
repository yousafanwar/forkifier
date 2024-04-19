<template>
    <!-- <h1>You are freaking out Maaaaaaaan!!!!!!!!!!!!</h1> -->
    <div class="row">
        <div class="col s12"><img class="responsive-img" :src="recipeDescription.image_url"></div>
        <div class="col s12 recipeTitle">{{ recipeDescription.title }}</div>
      <!-- <div class="col s12">{{ recipeDescription.image_url }}</div> -->
      
      <div class="center-align">
          <div class="row"></div>
          <div class="col s4"></div>
          <div class="col s4">
              <b>{{ servings }}</b>
              <b>Servings</b>
              <i class="material-icons" v-on:click="servings++; updateNumericValues(servings)">add_circle_outline</i>
              <i class="material-icons" v-on:click="servings > 1 && servings--; updateNumericValues(servings)">remove_circle_outline</i>
        </div>
        <div class="col s4">
            <i class="material-icons" v-on:click="addFav()">favorite_border</i>
        </div>
    </div>


    <div class="col s12 center-align">
        <h2>RECIPE INGREDIENTS</h2>
    </div>
    <div v-for="ing in recipeDescription.ingredients">
        <li class="col s6 ingList">{{ ing }}</li>
    </div>
      </div>
        
    <div class="col s12 center-align">
        <h3>HOW TO COOK IT</h3>
        <blockquote>This recipe was carefully designed and tested by Closet Cooking. Please check out directions at their website.</blockquote>
        <a class="waves-effect waves-light btn-large"><i class="material-icons right">arrow_forward</i>Directions</a>
        

    </div>

</template>

<script>
    export default {
        data(){
            return{
                    recipeDescription: [{
                    publisher: '',
                    ingredients: [],
                    source_url: '',
                    recipe_id: '',
                    image_url: '',
                    publisher_url: '',
                    title: '',
                }],
                servings: 4,                
                favArr: [],
            }
        },
        methods:{
            async getIndRecipe(recipeId){
                try{
                    const response = await fetch (`https://forkify-api.herokuapp.com/api/get?rId=${recipeId}`);
                    let result = await response.json();
                    this.recipeDescription = result.recipe;
                    this.recipe_Id = recipeId;
                }catch(err){
                    console.log(err)
                }
            },

            updateNumericValues() {
    this.recipeDescription.ingredients = this.recipeDescription.ingredients.map(ingredient => {
        // Extract the numeric part and the rest of the string
        const match = ingredient.match(/^(\d+)(?:\s+(\d+)\s*\/\s*(\d+))?(\.\d+)?\s+(.*)$/);
        if (match) {
            let wholeNumberPart = parseInt(match[1], 10) || 0;
            let numeratorPart = parseInt(match[2], 10) || 0;
            let denominatorPart = parseInt(match[3], 10) || 1;
            let decimalPart = parseFloat(match[4]) || 0;
            const restOfString = match[5];

            // Convert the mixed number to a decimal
            const mixedNumber = wholeNumberPart + numeratorPart / denominatorPart;

            // Add the decimal part to the mixed number
            let numericPart = mixedNumber + decimalPart;

            // Multiply or divide the numeric part by the change in servings
            numericPart *= this.servings / 4; // Adjusted for the initial servings of 4

            // Convert the new numeric part back to a mixed number if necessary
            let newWholeNumberPart = Math.floor(numericPart);
            let newFractionPart = numericPart - newWholeNumberPart;

            // Convert the fraction part to numerator/denominator
            let newNumeratorPart = Math.round(newFractionPart * denominatorPart);
            let newDenominatorPart = denominatorPart;

            // Simplify the fraction if necessary
            while (newNumeratorPart > 0 && newNumeratorPart % 2 === 0 && newDenominatorPart % 2 === 0) {
                newNumeratorPart /= 2;
                newDenominatorPart /= 2;
            }

            // Construct the updated ingredient string
            let updatedIngredient = '';
            if (newWholeNumberPart > 0) {
                updatedIngredient += `${newWholeNumberPart} `;
            }
            if (newNumeratorPart > 0) {
                updatedIngredient += `${newNumeratorPart}/${newDenominatorPart} `;
            }
            updatedIngredient += restOfString.trim();

            return updatedIngredient;
        } else {
            // If there is no numeric part, return the original string
            return ingredient;
        }
    });
},

    addFav(){
        this.favArr.push(this.recipeDescription);
        const favArrString = JSON.stringify(this.favArr);
        localStorage.setItem("favorite", favArrString);
    }




        },
    }
</script>

<style>
    img{
        height: auto;
        width: 100%;
    }
    .recipeTitle{
        position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 20%) skewY(-6deg);
    color: #fff;
    font-weight: 700;
    font-size: 3.25rem;
    text-transform: uppercase;
    width: 50%;
    line-height: 1.95;
    text-align: center;
    }
    .material-icons{
        cursor: pointer;
    }
    .ingList{
        margin: 5px 0;
    }
</style>