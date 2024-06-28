<template>
    <div class="row">
    <h1>Create Recipe</h1>
    <form class="col s12" method="POST" @submit.prevent ="createRecipe">
      <div class="row">
        <div class="input-field col s12">
          <input id="title" type="text" class="validate" v-model="recipeTitle">
          <label for="title">Recipe Title</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input id="description" type="text" class="validate" v-model="recipeDescription">
          <label for="description">Recipe Description</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input id="publisher" type="text" class="validate" v-model="publisher">
          <label for="publisher">publisher</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input id="ingredientsArr" type="text" class="validate" v-model="ingredient" @change="addIng">
          <label for="ingredientsArr">Ingredients</label>
        </div>
      </div>

      <div class="file-field input-field">
        <div class="btn">
          <span>File</span>
          <input type="file" name="image-upload" id="image-upload" @change="handleFileUpload">
        </div>
        <div class="file-path-wrapper">
          <input class="file-path validate" type="text">
        </div>  
      </div>

      <button class="btn" type="submit">Submit</button>

    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userData: {},
      recipeTitle: '',
      recipeDescription: '',
      publisher: '',
      ingredientsArr: [],
      ingredient: '',
      selectedFile: null
    }
  },
  methods: {
    handleFileUpload(e) {
      this.selectedFile = e.target.files[0];
    },
    addIng(){
      this.ingredientsArr.push(this.ingredient);
    },
    async createRecipe() {

      let ingredientsArrString = `{${this.ingredientsArr.join(',')}}`;

      this.loginData();
      const formData = new FormData();
      formData.append('title', this.recipeTitle);
      formData.append('description', this.recipeDescription);
      formData.append('publisher', this.publisher);
      formData.append('ingredientsArr', ingredientsArrString);
      formData.append('image_data', this.selectedFile);
      formData.append('user_id', this.userData.id);
      // console.log(formData.get('ingredientsArr'));
      try {
        const response = await fetch ('http://localhost:3000/api/createRecipe', {
          method: 'POST',
          headers: {
            'authorization': `Bearer ${this.userData.token}`
          },
          body: formData
        });


        if(!response.ok){
          console.log('Response failed');
        }
        else{
          this.clearForm();
          console.log('recipe created fromt the frontend');
        }

      }
      catch (err) {
        console.log('An error has occrred');
      }

    },
    loginData() {
      this.userData = JSON.parse(localStorage.getItem('userInfo'));
    },
    clearForm(){
      this.recipeTitle = '',
      this.recipeDescription = '',
      this.publisher = '',
      this.ingredientsArr = [],
      this.ingredient = '',
      this.selectedFile = null
    }
  }
}
</script>

<style scoped>
h1 {
  text-align: center;
}

form {
  background-color: aliceblue
}
</style>
