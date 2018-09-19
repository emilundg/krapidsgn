<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style lang="scss">
  html,
  body {
    margin: 0;
    height: 100%;
    overflow: hidden
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    background: white;
  }

  .body {
    height: 100vh;
  }

  .submit {
    display: block;
    margin: 30px auto;
    height: 38px;
    padding: 0 30px;
    line-height: 38px;
    text-transform: uppercase;
    background-color: transparent;
    border-radius: 4px;
    border: 1px solid #bbb;
    cursor: pointer;
    letter-spacing: 0.1rem;
    transition: all ease-in 0.2s;
    color: rgba(0, 0, 0, 0.87);
    outline: none;
    &:focus {
      outline: none;
    }
    &:hover {
      border-color: rgb(134, 134, 134);
    }
  }

  .card {
    border: none;
    border-radius: 0px;
    padding: 0px;
    box-shadow: 0 3px 8px 0 rgba(68, 45, 45, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.08);
    h2 {
      margin-bottom: 20px;
    }
  }

  h1,
  h2 {
    font-weight: normal;
  }
</style>