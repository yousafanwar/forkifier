<template>
    <div class="row container1">
    <form class="col s12">
      <div class="row container2">
        <div class="input-field col s12">
          <input id="email" type="email" class="validate" v-model="email">
          <label for="email">Email</label>
        </div>        
      </div>
      <div class="row container2">
        <div class="input-field col s12">
          <input id="password" type="password" class="validate" v-model="password">
          <label for="password">Password</label>
        </div>
    </div>
    
    <div class="btnContainer">
        <button class="btn1" @click.prevent="authenticateUser()">Submit</button>
    </div>
</form>
  </div>
  
        
</template>

<script>
import router from '@/router';

  export default{
    data(){
      return{
        email: '',
        password: '',        
      }
    },
    methods:{
      async authenticateUser (){
        // debugger;
        try{
          const response = await fetch(`http://localhost:3000/api/login`, {
            method: 'POST',
            headers:{
              'content-type': 'application/json',
            },
            body:JSON.stringify({
              email: this.email,
              password: this.password,
            })
          });
          if(!response.ok){
            throw new Error("An error has occured");
          }else{
            const result = await response.json();
            localStorage.setItem('userInfo', JSON.stringify(result));
            console.log(result);
            router.push('/');
          }
                    
        }catch(error){
          console.log(`Yo yo yo that\'s an ${error} yo`);
        }
      },
      displayOnConsole(){
        console.log(this.name, this.password);
      }
    }
  }
</script>

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
    }
    .container2{
        margin-top: 5%;
        padding: 0 25px 0 25px;
    }
    .btn1{
        height: 55px;
        width: 35%;
        text-align: center;
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