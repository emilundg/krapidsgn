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
  .v-spinner {
    position: absolute;
    top: 50vh;
    left: 47.5vw;
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

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  .vdp-datepicker {
    input {
      width: 100%;
      color: rgba(0, 0, 0, 0.87);
      border: none;
    }
  }

  .card {
    border: none;
    border-radius: 0px;
    margin: 4vh;
    padding: 0px;
    width: 85vw;
    min-height: 80vh;
    box-shadow: 0 3px 8px 0 rgba(68, 45, 45, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.08);
    h2 {
      margin-bottom: 20px;
    }
  }

  h1,
  h2 {
    font-weight: normal;
  }

  .table {
    text-align: left;
    td {
      padding: 7px;
      border: none;
    }
  }

  .inputfield,
  .form-group {
    text-align: left;
    margin-bottom: 30px;
  }

  .outcomes {
    font-weight: 400;
    margin-bottom: 30px;
    .bord {
      margin: 0 auto;
      max-width: 60px;
      border: 2px solid transparent;
    }
    &.neu {
      &:hover {
        p {
          color: rgba(45, 183, 245, 0.8);
        }
        .bord {
          border: 1.5px solid rgba(45, 183, 245, 0.8);
        }
      }
    }
    &.neg {
      &:hover {
        p {
          color: rgba(245, 45, 83, 0.7);
        }
        .bord {
          border: 1.5px solid rgba(245, 45, 83, 0.7);
        }
      }
    }
    &.pos {
      &:hover {
        p {
          color: rgba(38, 207, 91, 0.7);
        }
        .bord {
          border: 1.5px solid rgba(38, 207, 91, 0.7);
        }
      }
    }
    .header {
      color: rgba(0, 0, 0, 0.56);
      margin: 0px;
      font-size: 14px;
    }
    .content {
      font-size: 18px;
      color: rgba(0, 0, 0, 0.87);
      margin-bottom: 6px;
    }
  }
</style>