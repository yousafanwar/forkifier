<template>
  <nav>
<div class="nav-wrapper">
  <div>

    <a href="#" class="brand-logo">
    <img v-bind:src="logo" alt="" class="circle responsive-img" style="width: 120px; height: 60px;">
  </a>
  </div>
          
  
    <form class="searchBarAndButton">
        <div class="input-field">
          <input  id="search" type="search" required v-model="input">
          <label class="label-icon" for="search"><i class="material-icons" style="color:antiquewhite  ;">search</i></label>
        </div>
        <button class="btnStyle" type="submit" name="action" v-on:click.prevent="fetchRecipe()">Search</button>
      </form> 
      
  
  <ul id="nav-mobile" class="right hide-on-med-and-down">
    <li><a href="sass.html">Sass</a></li>
    <li><a href="badges.html">Components</a></li>
    <li class='dropdown-trigger custom-width' data-target='dropdown1'><a href="collapsible.html" class="material-icons" v-on:click.prevent="retrieveFromLocalStorage()">favorite_border</a></li>
 
    <!-- <li class="divider" tabindex="-1"></li> -->

<ul id='dropdown1' class='dropdown-content'>
<div v-for="recipe in retrieveData">
<li><a href="#!" class="collection-item avatar" v-on:click="renderFavItem(recipe.recipe_id)">
    <img :src=recipe.image_url alt="" class="circle">
    <span class="title">{{ recipe.title }}</span>
    <p>{{ recipe.publisher }} </p>
</a></li></div>

</ul>
  </ul>


</div>
</nav>

<div class="row">
<div class="col s3 recipe-col-list">
<RecipeList :key="list.length" @emit="getEmit" v-if="list.length > 0" :arr="list"/>
</div>

<div class="col s9 recipe-col-desc">
<RecipeDesc ref="recipeDesc"/>
</div>

</div>
</template>

<script>
import logo from '../assets/img/logo.png';
import RecipeList from './RecipeList.vue';
import RecipeDesc from './RecipeDesc.vue';
import M from 'materialize-css';

export default{
data(){
return{
logo: logo,
input: '',
recipe_id: 0,
retrieveData: [],
list: '',
}
},
components:{
RecipeList,
RecipeDesc
},
mounted(){
},
methods:{
async fetchRecipe(){
try{
const response = await fetch(`https://forkify-api.herokuapp.com/api/search?q=${this.input}`);

if(!response.ok){
throw new Error("Recipe not found");
}
const result = await response.json();
this.list = result.recipes;

}catch(err){
console.log(err);
}
},
getEmit(recipeId){
this.recipe_id = recipeId;
this.$refs.recipeDesc.getIndRecipe(this.recipe_id);

},
retrieveFromLocalStorage(){
// localStorage.clear();
const retarray = JSON.parse(localStorage.getItem("favorite"));
this.retrieveData = retarray;
console.log(retarray);
this.materializeCssInit()
},
renderFavItem(id){
this.$refs.recipeDesc.getIndRecipe(id);

},
materializeCssInit(){
this.$nextTick(() => {
const elems = document.querySelectorAll('.dropdown-trigger');
const options = {
  constrainWidth: true,
}
const instances = M.Dropdown.init(elems, options);
});
}
}
}
</script>

<style scoped>
nav{
background-color: #bdbdbd;
padding: 0 10px;
}
li a{
color: black;
}

.nav-wrapper {
width: 100%; 
display: flex;
justify-content: space-between;
}
.searchBarAndButton{
display: flex;
justify-content: space-between;
align-items: center;
}
.input-field{
background-color: white;
border-radius: 12px;
/* margin-right: 10px; */
border-radius: 0 0 85px 25px;;

}
.input-field:active{
  border-radius: 0 0 85px 25px;
  background-color: red;

}
.searchBarAndButton button{
width: 100px;
height: 55px;
border-radius: 55px 0 5px 5px;
/* margin-left: 10px; */
}
.recipe-col-list{
height: 800px;
overflow-y: auto;
background-color: #eeeeee;
}
.recipe-col-desc{
height: 800px;
overflow-y: auto;
background-color: #e0e0e0;
}
.custom-width.dropdown-content {
        width: 100px; 
    }
.btnStyle{
 background-color: inherit;
 color: black;
 border: black solid; 
}
.btnStyle:hover{
  background-color: black;
  color: white;
  cursor: pointer;
}
.btnStyle:active  {
  background-color: inherit;
}
</style>