<template>
    <div class="container">
      <Nav />
      <Recipe />
    </div>
</template>


<script>
// import Recipe from '../components/Recipe';
import Recipe from './components/Recipe.vue';
import Nav from './components/NavBar.vue';

export default{
  components:{
    Recipe,
    Nav
  }
}
</script>

<style>
  body{
    background-color: #b2ebf2;
    /* #757575 grey darken-1 */

  }
</style>
