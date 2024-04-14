<template>
            <nav>
          <div class="nav-wrapper">
            <a href="#" class="brand-logo">
            <img v-bind:src="logo" alt="" class="circle responsive-img" style="width: 120px; height: 60px;"> <!-- notice the "circle" class -->
          </a>
            <ul id="nav-mobile" class="right hide-on-med-and-down">
              <li><a href="sass.html">Sass</a></li>
              <li><a href="badges.html">Components</a></li>
              <li><a href="collapsible.html">JavaScript</a></li>
            </ul>
          </div>
      </nav>
</template>

<script>
  import logo from '../assets/img/logo.png';

export default{
  data(){
    return{
      logo: logo
    }
  }
}
</script>

<style>
    nav{
      background-color: #e0f7fa
    }
</style>