<template>
  <div id="app">
<div>
  <div class="App-logo" style="padding: 10px;"><div class="App-title"><h2>Le Cukbook</h2><p>A simple collection of recipes</p></div></div>
 <b-navbar class="b-navbar" toggleable="md" type="light" variant="light" style="padding: 0px;">

  <b-navbar-toggle style="background: white; border-radius: 0px; border-top: 0px; border-bottom: 0px;" target="nav_collapse"></b-navbar-toggle>
  <b-collapse is-nav id="nav_collapse">
    <b-navbar-nav style="margin: 0 auto; background: white;">
      <b-nav-item class="button" v-bind:active="tab === 1" v-on:click="tab = 1" href="#">Recipes</b-nav-item>
      <b-nav-item class="button" v-bind:active="tab === 2" v-on:click="tab = 2" href="#">Add Recipe</b-nav-item>
    </b-navbar-nav>
  </b-collapse>
</b-navbar>
 <b-card v-if="tab === 1"
          tag="article"
          class="mb-5">
    <b-carousel id="carousel1"
                controls
                indicators
                :interval="0"
                v-model="slide"
                @sliding-start="onSlideStart"
                @sliding-end="onSlideEnd"
    >
      <!-- Slides with img slot -->
      <!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
      <b-carousel-slide class="carousel-slide" v-for="recipe in recipes" :key="recipe.id" v-touch:swipe.left="swipeHandlerLeft" v-touch:swipe.right="swipeHandlerRight">
        <div class="row">
          <div class="col-sm">
                <h2>{{recipe.title}}</h2>
                <p>Recipe by: {{recipe.author}}</p>
                <img alt="recipe-img" :src="recipe.imgSrc"/>
                <p>{{recipe.description}}</p>
          </div>
          <div class="col-sm">
                <h3>Ingredients</h3>
                <ul style="columns: 2; padding: 0px;">
                   <li style="list-style: none;" v-for="ingredient in recipe.ingredients.split(',')" :key="ingredient.id">
                     {{ingredient}}
                   </li>
                  </ul>
                <h3>How to</h3>
                <span>{{recipe.instructions}}</span>
          </div>
        </div>
      </b-carousel-slide>
    </b-carousel>
  </b-card>

  </div>

<b-container class="container-fluid" v-if="tab === 2" style="width: 85vw;" fluid>
              <b-form id="app" class="row" @submit="onSubmit">
              <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                  <div class="inputfield">
                    <label for="comment">Title:</label>
                    <b-form-input v-model="title"
                    type="text"
                    placeholder="Enter title" required></b-form-input>
                  </div>

                  <div class="inputfield">
                    <label for="comment">Image URL:</label>
                    <b-form-input v-model="imgUrl"
                    type="text"
                    placeholder="Enter image URL" required></b-form-input>
                  </div>

                  <div class="inputfield">
                    <label for="comment">Short Description:</label>
                    <b-form-input v-model="description"
                    type="text"
                    placeholder="Enter short description" required></b-form-input>
                  </div>

                  <div class="inputfield">
                    <label for="comment">Author/Name:</label>
                    <b-form-input v-model="author"
                    type="text"
                    placeholder="Enter author/name" required></b-form-input>
                  </div>

                </div>

                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                  <div class="form-group">
                    <label for="comment">Ingredients:</label>
                    <textarea class="form-control" rows="5" id="comment" v-model="ingredients" required placeholder="Lök, Ostron, Oumph.."></textarea>
                </div>

                <div class="form-group">
                    <label for="comment">Instructions:</label>
                    <textarea class="form-control" rows="5" id="comment" v-model="instructions" required placeholder="Först hackar man löken sen.."></textarea>
                </div>
                </div>
                <button type="submit" class="submit">
                  Submit
                </button>
            </b-form>
            <dot-loader :loading="loading" :color="color"></dot-loader>
        </b-container>
</div>
</template>

<script>
import Firebase from 'firebase/app'
import 'firebase/firestore'
import DotLoader from 'vue-spinner/src/DotLoader.vue'

var config = {
  apiKey: "AIzaSyAyrkfsB8IPaRXu4mAKUhoUwwJ0Gr3hEKk",
  authDomain: "cuukbook.firebaseapp.com",
  databaseURL: "https://cuukbook.firebaseio.com",
  projectId: "cuukbook",
  storageBucket: "cuukbook.appspot.com",
  messagingSenderId: "278176339543"
};

export default {
  name: 'app',
  components: {
        'DotLoader': DotLoader
  },
  data () {
    return {
      color: "rgba(33, 147, 245, 0.5)",
      errors: [],
      slide: 0,
      loading: false,
      sliding: null,
      recipes: [],
      tab: 1,
      ingredients: '',
      instructions: '',
      title: '',
      imgUrl: '',
      description: '',
      author: ''
    }
  },
  created () {
  if (!Firebase.apps.length) {
    Firebase.initializeApp(config)
  }

  Firebase.firestore().settings({timestampsInSnapshots: true});

  this.$binding("recipes", Firebase.firestore().collection("recipes"))
   .then((recipes) => {
     this.recipes = recipes
   })
  },
  methods: {
    swipeHandlerLeft () {
      document.getElementsByClassName('carousel-control-next')[0].click();
    },
    swipeHandlerRight () {
      document.getElementsByClassName('carousel-control-prev')[0].click();
    },
    onSlideStart (slide) {
      this.sliding = true
    },
    onSlideEnd (slide) {
      this.sliding = false
    },
    onSubmit (e) {
        this.loading = true;
        // Add a new document with a generated id.
      e.preventDefault();
        const collectionRef = Firebase.firestore().collection("recipes");
        collectionRef
            .add({
                description: this.description,
                imgSrc: this.imgUrl,
                ingredients: this.ingredients,
                instructions: this.instructions,
                title: this.title,
                author: this.author
            })
            .then(function () {
                window
                    .location
                    .reload();
            })
            .catch(function (error) {
                console.error("Error adding document: ", error);
            });
    }
  }
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
    color: rgba(0,0,0, 0.87);
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

.carousel-inner {
  width: 100%;
  display: block;
  margin: 0 auto;

}

.container-fluid {
  margin: 30px auto;
  width: 65vw;
  > .row {
    margin: 15px !important;
  }
}

.App-logo {
    background-image: url(https://github.com/emilundg/cukbook/blob/master/src/header-inTheKitchen1.jpg?raw=true);
    height: 100px;
    box-shadow: inset 0 -10px 40px rgba(0,0,0,0.5);
    > .App-title {
      color: rgba(255,255,255, 0.87);
    }
}

.carousel-caption {
  color:#2c3e50 !important;
  position: static;
  outline: none;
}

.carousel-slide {
  outline: none;
  background: white;
  margin-bottom: 20px;

  img {
    width: 30vw;
    min-width: 260px;
    padding: 10px;
    border: 1px solid #d9d9d9;
  }

  img, h3 {
    margin-bottom: 2vh;
  }

  span {
    width: 100%;
    height: 100%;
    border: none;
  }
}

  .carousel-indicators {
    margin-top: 30px;
    li {
      background: rgba(0,0,0, 0.2);

      &.active {
        background: rgba(0,0,0, 0.45);
      }
    }
  }

.carousel-control-next {
  float: right;
}

.carousel-control-next, .carousel-control-prev {
  width: 7%;
}

.carousel-control-next-icon {
  background-image: url('./assets/next_icon.svg')!important;
}

.carousel-control-prev-icon {
  background-image: url('./assets/prev_icon.svg')!important;
}

.b-navbar {
    background: repeating-linear-gradient(135deg, #d9d9d9, #d9d9d9 .05em /* black stripe */, white 0,white 1.5em /* blue stripe */ );
    border: 1px solid #d9d9d9;
    ul {
      li:nth-child(1) {
        border-left: 1px solid #d9d9d9;
      }
    }
    .button {
      border-right: 1px solid #d9d9d9;
      margin: 0;

      &:hover {
        background: rgba(45,183,245, 0.07);
      }
    }
}

.card {
  border: none;
  border-radius: 0px;
  margin: 5vh;
  box-shadow: 0 3px 8px 0 rgba(68, 45, 45, 0.2), 0 0 0 1px rgba(0,0,0,0.08);
  width: 85vw;
  margin: 30px auto;
}

h1, h2 {
  font-weight: normal;
}

.inputfield, .form-group {
  text-align: left;
  margin-bottom: 30px;
}

</style>
