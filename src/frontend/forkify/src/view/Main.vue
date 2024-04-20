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
                  <button class="btn waves-effect waves-light" type="submit" name="action" v-on:click.prevent="fetchRecipe()">Submit</button>
                </form>
                
            
            <ul id="nav-mobile" class="right hide-on-med-and-down">
              <li><a href="sass.html">Sass</a></li>
              <li><a href="badges.html">Components</a></li>
              <!-- <li><a href="collapsible.html">JavaScript</a></li> -->
              <li class='dropdown-trigger' data-target='dropdown1'><a href="collapsible.html" class="material-icons" v-on:click.prevent="retrieveFromLocalStorage()">favorite_border</a></li>
              <li class="divider" tabindex="-1"></li>

              <!-- <i class="material-icons" v-on:click="addFav()">favorite_border</i> -->
            


              <!-- <a class='dropdown-trigger btn' href='#' data-target='dropdown1'>Drop Me!</a> -->

<!-- Dropdown Structure -->
<ul id='dropdown1' class='dropdown-content'>
  <div v-for="recipe in retrieveData">
  <li  ><a href="#!" class="collection-item avatar list-items" >
              <img :src=recipe.image_url alt="" class="circle">
              <span class="title">{{ recipe.title }}</span>
              <p>{{ recipe.publisher }} </p>
        </a></li></div>
  <!-- <li><a href="#!">one</a></li> -->
  <!-- <li><a href="#!">two</a></li>
  <li class="divider" tabindex="-1"></li>
  <li><a href="#!">three</a></li>
  <li><a href="#!"><i class="material-icons">view_module</i>four</a></li>
  <li><a href="#!"><i class="material-icons">cloud</i>five</a></li> -->
</ul>



<!-- 
              <div class="collection" v-for="recipe in retrieveData">
              <div v-on:click="emiterFunc(recipe.recipe_id)">
              <a href="#!" class="collection-item avatar list-items">
              <img :src=recipe.image_url alt="" class="circle">
              <span class="title">{{ recipe.title }}</span>
              <p>{{ recipe.publisher }} </p>
        </a>
    </div>
</div> -->
            </ul>


          </div>
      </nav>

      <div class="row">
      <div class="col s3 recipe-col-list">
        <RecipeList @emit="getEmit" v-if="list.length > 0" :arr="list"/>
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
      list: '',
      recipe_id: 0,
      retrieveData: [],      
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
        
        // console.log( result.recipes);
        // console.log( this.list);
      }catch(err){
        console.log(err);
      }
    },
    getEmit(recipeId){
      this.recipe_id = Number(recipeId);
      // RecipeDesc.getIndRecipe();
      this.$refs.recipeDesc.getIndRecipe(this.recipe_id);

    },
    retrieveFromLocalStorage(){
      // localStorage.clear();
      const retarray = JSON.parse(localStorage.getItem("favorite"));
      this.retrieveData = retarray;
      console.log(retarray);
      this.materializeCssInit()
      
    },
    materializeCssInit(){
      this.$nextTick(() => {
    const elems = document.querySelectorAll('.dropdown-trigger');
    const instances = M.Dropdown.init(elems);
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
    width: 100%; /* Ensure the navbar wrapper takes full width */
    display: flex;
    /* align-items: center; */
    justify-content: space-between; /* Align logo, search bar, and nav items horizontally */
  }
  .searchBarAndButton{
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* border: solid black; */
  }
  .input-field{
    background-color: white;
    border-radius: 12px;
    margin-right: 10px;
    /* border: solid red; */
    /* width: 100%; */
  }

  .searchBarAndButton button{
    width: 100px;
    height: 65px;
    border-radius: 5px;
    margin-left: 10px;
  }
  .recipe-col-list{
    /* border: solid gray;  */
    height: 800px;
    overflow-y: auto;
    background-color: #eeeeee;
  }
  .recipe-col-desc{
    /* border: solid gray;  */
    height: 800px;
    overflow-y: auto;
    background-color: #e0e0e0;
  }
  .recipeDropDown{
    width: 500px !important;
  }

</style>