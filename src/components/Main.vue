<template>
  <div id="app">
    <div>
      <!-- <b-navbar class="b-navbar" toggleable="md" type="dark" variant="dark">

                                                                                                                                                      <b-navbar-brand href="#">KrappiDesign</b-navbar-brand>

                                                                                                                                                      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
                                                                                                                                                      <b-collapse is-nav id="nav_collapse">
                                                                                                                                                        <b-navbar-nav class="ml-auto">
                                                                                                                                                          <b-nav-item class="button" v-bind:active="tab === 1" v-on:click="tab = 1" href="#">Home</b-nav-item>
                                                                                                                                                        </b-navbar-nav>
                                                                                                                                                      </b-collapse>
                                                                                                                                                    </b-navbar> -->
    </div>

    <b-container v-if="tab === 0" class="container-fluid" fluid>
      <div class="body">
        <div class="row" style="justify-content: center;">
          <div v-if="!show" class="landing-content col-8 col-sm-6 col-md-6 col-lg-3 align-middle mb-2">
            <img class="logo" src="https://github.com/emilundg/krapidsgn/blob/master/src/assets/logo.png?raw=true" />
            <button class="submit centered" @click="show = true">Contact</button>
          </div>
        </div>

        <div class="row container-row">
          <transition name="slideRight">
            <div v-if="show" class="content col-6 col-sm-4 col-md-3 col-lg-3">
              <img class="logo" src="https://github.com/emilundg/krapidsgn/blob/master/src/assets/logo.png?raw=true" />
            </div>
          </transition>
          <transition name="slideRight">
            <div v-if="show" class="right-content col-sm-12 col-md-9 col-lg-9">
              <div class="row" style="justify-content: center;">
                <swiper :options="swiperOption" v-if="show" class="col-11 col-sm-10 col-md-10 col-lg-8">
                  <swiper-slide>
                    <b-card title="Pricing">
                      <img class="card-icon" src="https://github.com/emilundg/krapidsgn/blob/master/src/assets/get.png?raw=true" />
                      <p class="card-text">
                        <ul class="standard-list">
                          <li>
                            <img class="icon" src="https://github.com/emilundg/krapidsgn/blob/master/src/assets/check.png?raw=true" /> Free site evaluation and fast delivery.
                          </li>
                          <li>
                            <img class="icon" src="https://github.com/emilundg/krapidsgn/blob/master/src/assets/check.png?raw=true" /> Pay as you scale.
                          </li>
                          <li>
                            <img class="icon" src="https://github.com/emilundg/krapidsgn/blob/master/src/assets/check.png?raw=true" /> Coaching sessions for 250 SEK/h.
                          </li>
                        </ul>
                      </p>
                    </b-card>
                  </swiper-slide>
                  <swiper-slide>
                    <b-card title="Contact">
                      <div class="inputgroup">
                        <label for="comment">Company email:</label>
                        <b-form-input type="text" autocomplete="off" v-model="email" placeholder="Enter company email" required></b-form-input>
                      </div>
                      <div class="inputgroup">
                        <label for="comment">Webpage:</label>
                        <b-form-input type="text" autocomplete="off" v-model="company" placeholder="Enter URL" required></b-form-input>
                      </div>
                      <button class="submit" @click="sendEmail()">Submit</button>
                    </b-card>
                  </swiper-slide>
                  <swiper-slide>
                    <b-card title="How it works">
                      <p class="card-text">
                        Submit a request with a link to the current webpage of the company. After that the company will get an offer of how much time it will take and how much the cost will be. Sounds pretty basic right? <br> <br> The part where KrapiDsgn.
                        differs from other web-design companies is the part after where you'll get coaching sessions on how to change parts of the code by yourself. This enables full control of YOUR website.
                      </p>
                    </b-card>
                  </swiper-slide>
                  <swiper-slide>
                    <b-card title="About us">
                      <p class="card-text">
                        KrapiDsgn. was created as a protest against the current web-design systems. Or motto is that it should not be expensive to lack knowledge of creating websites and it should not be hard to manage the companies site.
                      </p>
                    </b-card>
                  </swiper-slide>
                  <div class="swiper-pagination" slot="pagination"></div>
                </swiper>
              </div>
            </div>
          </transition>
        </div>

      </div>
    </b-container>

    <b-container v-if="tab === 1" class="container-fluid" fluid>
      <b-card tag="article" class="mb-5" style="margin: 30px auto;">
        <h2>Random title</h2>
      </b-card>
    </b-container>
  </div>
</template>

<script>
  require('vue2-animate/dist/vue2-animate.min.css')
  import 'swiper/dist/css/swiper.css'
  import * as api from '../api'

  import {
    swiper,
    swiperSlide
  } from 'vue-awesome-swiper'

  export default {
    name: 'app',
    components: {
      swiper,
      swiperSlide
    },
    data() {
      return {
        tab: 0,
        show: false,
        centeredSlides: true,
        email: '',
        company: '',
        swiperOption: {
          slideToClickedSlide: true,
          direction: 'vertical',
          slidesPerView: 'auto',
          spaceBetween: -200,
          initialSlide: 1,
          speed: 400,
          mousewheel: true,
          keyboard: {
            enabled: true,
            onlyInViewport: false,
          },
          pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            dynamicBullets: true
          }
        }
      }
    },
    created() {},
    mounted() {},
    methods: {
      async sendEmail() {
        var response = await api.sendEmail(this.email, this.company, 'Here you go madafaka, new customer!')
        if (response.status === 200) {
          window.location.reload();
        }
      }
    }
  }
</script>

<style lang="scss">
  .standard-list {
    text-align: left;
    list-style: none;
  }

  .icon {
    height: 12px;
    margin-right: 8px;
  }

  .swiper-container {
    height: 100vh;
    overflow: hidden;
  }

  .swiper-slide {
    top: 30%;
    padding-right: 40px;
    .card {
      min-height: 50vh;
    }
    &.swiper-slide-prev,
    &.swiper-slide-next {
      .card {
        color: rgba(255, 255, 255, 0.87);
        box-shadow: none;
        background: rgba(255, 255, 255, 0.25);
        input {
          background: rgba(255, 255, 255, 0.25);
          border: none;
          &::placeholder {
            color: rgba(255, 255, 255, 0.87);
          }
        }
        button {
          border: none;
          color: rgba(255, 255, 255, 0.87);
        }
      }
    }
  }

  .row {
    .landing-content {
      margin: 30vh auto;
    }
    .content {
      @media screen and (max-width: 640px) {
        margin: 2vh auto;
      }
      @media screen and (min-width: 641px) {
        margin: 30vh auto;
      }
    }
    &.container-row {
      height: 100%;
    }
  }

  .inputgroup {
    text-align: left;
    margin-bottom: 30px;
  }

  .right-content {
    box-shadow: 0 0px 20px rgba(0, 0, 0, 0.19) inset, 0 0px 6px rgba(0, 0, 0, 0.23) inset;
    background: url('https://github.com/emilundg/krapidsgn/blob/master/src/assets/background.png?raw=true');
  }

  .logo {
    width: 100%;
  }

  .centered {
    margin: 10vh auto;
  }

  .card-icon {
    width: 30%;
    margin: 30px 0px;
    max-width: 90px;
  }
</style>