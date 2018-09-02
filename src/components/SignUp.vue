<template>
  <div class="sign-up">
    <h3>Sign Up</h3>
    <div id="app" class="row" style="justify-content: center;">
      <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
        <div class="inputfield">
          <label for="comment">Email:</label>
          <b-form-input v-model="email" type="text" placeholder="Email" required></b-form-input>
        </div>
        <div class="inputfield">
          <label for="comment">Password:</label>
          <b-form-input v-model="password" type="password" placeholder="Password" required></b-form-input>
        </div>

        <button v-on:click="signUp" class="submit">Sign Up</button>
        <span>or go back to <router-link to="/login">login</router-link>.</span>
      </div>
    </div>
  </div>
</template>

<script>
  import firebase from 'firebase'

  export default {
    name: 'signUp',
    data: function() {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      signUp: function() {
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
          (user) => {
            this.$router.replace('main')
          },
          (err) => {
            alert('Oops. ' + err.message)
          }
        );
      }
    }
  }
</script>

<style scoped>
  .sign-up {
    margin-top: 40px;
  }

  span {
    display: block;
    margin-top: 20px;
    font-size: 11px;
  }
</style>
