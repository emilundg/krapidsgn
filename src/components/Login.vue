<template>
  <div class="login">
    <h3>Sign In</h3>
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

        <button v-on:click="signIn" class="submit">Connection</button>
        <p>You don't have an account ? You can
          <router-link to="/sign-up">create one</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import firebase from 'firebase'
  export default {
    name: 'login',
    data: function() {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      signIn: function() {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
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
  .login {
    margin-top: 40px;
  }

  p {
    margin-top: 40px;
    font-size: 13px;
  }

  p a {
    text-decoration: underline;
    cursor: pointer;
  }
</style>