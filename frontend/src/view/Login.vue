<template>
    <div class="row container1">
    <form class="col s12">

      <div class="row container2">
        <div class="input-field col s12">
          <input id="email" type="email" class="validate">
          <label for="email">Email</label>
        </div>        
      </div>
      <div class="row container2">
        <div class="input-field col s12">
          <input id="password" type="password" class="validate">
          <label for="password">Password</label>
        </div>
    </div>
    
    <div class="btnContainer">
        <button class="btn1">Submit</button>
    </div>
</form>
  </div>
        
</template>

<script></script>

<style>
    body{
        background-color: hsl(0, 1%, 66%);
    }
    .container1{
        background-color: #424242;
        max-width: 550px;
        display: grid;
        margin-top: 15%;
        border-radius: 5px;
        height: 45vh;
    }
    .container2{
        margin-top: 5%;
        /* max-width: 85%; */
        padding: 0 25px 0 25px;
    }
    .btn1{
        height: 8vh;
        width: 35%;
        /* text-align: center; */
        background-color: hsl(0, 0%, 20%);
        color: white;
    }
    .btn1:hover{
        background-color: white;
        color: black;
        cursor: pointer;
        
    }
    .btnContainer{
        margin: 15px;
        /* margin-bottom: 55px; */
        display: flex;
        justify-content: center;        
    }
</style>