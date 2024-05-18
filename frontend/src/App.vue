<template>
    <div class="container">
      <Login />
      <!-- <Main /> -->
    </div>
</template>


<script>
import Main from './view/Main.vue';
import Login from './view/Login.vue';

export default{
  components:{
    Main,
    Login,
  }
}
</script>

<style>
  body{
    /* background-color: #424242; */
  }
</style>
