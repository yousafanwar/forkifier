<template>
    <div class="row" v-show="recipeDescription.ingredients && recipeDescription.ingredients.length > 0">
        <div><img class="col s12 responsive-img" :src="recipeDescription.image_url" style="height:300px">
        <h2 class="col s12 recipeTitle truncate center-align" >{{ recipeDescription.title }}</h2>
        </div>
          <div class="row"></div>
          <div class="col s6 right-align">
              <b>{{ servings }}</b>
              <b>Servings</b>
              <i class="material-icons" v-on:click="servings++; updateNumericValues(servings)">add_circle_outline</i>
              <i class="material-icons" v-on:click="servings > 1 && servings--; updateNumericValues(servings)">remove_circle_outline</i>
        </div>
        <div class="col s6 right-align">
            <i class="material-icons" v-on:click="addRemoveFav()" v-show="isFav">favorite</i>
            <i class="material-icons" v-on:click="addRemoveFav()" v-show="!isFav">favorite_border</i>
        </div>


    <div class="col s12 center-align">
        <h2>RECIPE INGREDIENTS</h2>
    </div>
    <div v-for="ing in recipeDescription.ingredients">
        <li class="col s6 ingList">{{ ing }}</li>
    </div>
      </div>
        
    <div class="col s12 center-align" v-show="recipeDescription.ingredients && recipeDescription.ingredients.length > 0">
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
                isFav: false,
            }
        },
        methods:{
            async getIndRecipe(recipeId){
                try{
                    const response = await fetch (`https://forkify-api.herokuapp.com/api/get?rId=${recipeId}`);
                    let result = await response.json();
                    this.recipeDescription = result.recipe;
                    this.isFav = false;
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

    addRemoveFav(){
        if(this.favArr.length <= 0){
            this.favArr.push(this.recipeDescription);
            this.isFav = true;
            console.log("The arr was empty before but now it has the following values: ", this.favArr);
            // console.log("id ", this.recipeDescription.recipe_id);

        }else{
            this.favArr.forEach((ele, index) => {
            if (ele.recipe_id === this.recipeDescription.recipe_id) {
                this.favArr.splice(index, 1);
                // this.favArr.push(this.recipeDescription);
                console.log(`The recipe is already added at position ${index}`);
                this.isFav = false;
            }else{
                this.favArr.push(this.recipeDescription);
                this.isFav = true;
            }
});

            console.log("Array already has the following values:", this.favArr);
        }

        // const favArrString = JSON.stringify(this.favArr);
        // localStorage.setItem("favorite", favArrString);
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
        transform: translate(0%, -80%) skewY(-6deg);
        color: #fff;
        background-color: brown;
    }
    .material-icons{
        cursor: pointer;
    }
    .ingList{
        margin: 5px 0;
    }
</style>