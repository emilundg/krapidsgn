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
        <div class="row container-row">
          <transition name="slideRight">
            <div class="header content col-6 col-sm-4 col-md-3 col-lg-3">
              <img class="logo" src="https://github.com/emilundg/krapidsgn/blob/master/src/assets/logo.png?raw=true" />
              <div class="motto-container">
                <img class="motto-img" src="https://cdn.rawgit.com/emilundg/eee17f6988f3f934b21e386bfecc89ed/raw/724c31904c17cf2cafc4b0af158394d1d6614173/quote.svg" />
                <p class="motto">Det skall varken vara dyrt eller svårt att ta hand om sin egna hemsida.</p>
              </div>
            </div>
          </transition>
          <transition name="slideRight">
            <div v-if="show" class="right-content col-sm-12 col-md-9 col-lg-9">
              <div class="row" style="justify-content: center;">
                <swiper :options="swiperOption" v-if="show" class="col-11 col-sm-10 col-md-10 col-lg-8">
                  <swiper-slide>
                    <b-card title="Kontakt">
                      <img class="card-icon" style="width: 40px" src="https://cdn.rawgit.com/emilundg/29eb090e9af059fb4a6ae8d93026b5df/raw/0385f98e2dcc5e0946f977e9f7a6eba3f93f33db/contact.svg" />
                      <div class="inputgroup">
                        <label for="comment">Mail:</label>
                        <b-form-input type="text" autocomplete="off" v-model="email" placeholder="Skriv mail" required></b-form-input>
                      </div>
                      <div class="inputgroup">
                        <label for="comment">Hemsida:</label>
                        <b-form-input type="text" autocomplete="off" v-model="company" placeholder="Skriv URL" required></b-form-input>
                      </div>
                      <button class="submit" @click="sendEmail()">Skicka</button>
                    </b-card>
                  </swiper-slide>
                  <swiper-slide>
                    <vue-flip v-if="window.width <= 640" active-click="true">
                      <div slot="front">
                        <b-card class="flipCard" title="Hur det fungerar">
                          <img class="card-icon" src="https://cdn.rawgit.com/emilundg/b25797bc55a0d006bf56914a14d58fd4/raw/5dd9732b57d6a7cbbe2f816c5de4fe42bb0b62fd/settings.svg" />
                          <p class="card-text">
                            Skicka en förfrågan med en länk till den nuvarande hemsidan av företaget. Efter det kommer vi att skicka tillbaka en offert på hur lång tid det kommer ta och hur mycket det kommer kosta.
                          </p>
                          <button class="submit centered">Läs mer</button>
                        </b-card>
                      </div>
                      <div slot="back">
                        <b-card class="flipCard" title="Hur det fungerar">
                          <p class="card-text" style="margin-top: 25%;">
                            Efter hemsidan är uppsatt kan man antingen få coaching-sessioner med en erfaren programmerare om man vill lära sig att ändra själv ELLER så tar vi hand om allting. Detta gör att man får full tillgång över hemsidan.
                          </p>
                          <button class="submit centered">Tillbaka</button>
                        </b-card>
                      </div>
                    </vue-flip>
                    <b-card v-else title="Hur det fungerar">
                      <img class="card-icon" src="https://cdn.rawgit.com/emilundg/b25797bc55a0d006bf56914a14d58fd4/raw/5dd9732b57d6a7cbbe2f816c5de4fe42bb0b62fd/settings.svg" />
                      <p class="card-text">
                        Skicka en förfrågan med en länk till den nuvarande hemsidan av företaget. Efter det kommer vi att skicka tillbaka en offert på hur lång tid det kommer ta och hur mycket det kommer kosta. <br><br> Efter hemsidan är uppsatt kan man
                        antingen få coaching-sessioner med en erfaren programmerare om man vill lära sig att ändra själv ELLER så tar vi hand om allting. Detta gör att man får full tillgång över hemsidan.
                      </p>
                    </b-card>
                  </swiper-slide>
                  <swiper-slide>
                    <b-card title="Pris">
                      <img class="card-icon" src="https://github.com/emilundg/krapidsgn/blob/master/src/assets/get.png?raw=true" />
                      <p class="card-text">
                        <ul class="standard-list">
                          <li>
                            <img class="icon" src="https://cdn.rawgit.com/emilundg/88276eb491839eac61d57317c4b00da6/raw/2fe0ba26fff195d67cff1e88ea32e94f78eaaf85/check.svg" /> Gratis evaluering och snabb leverans.
                          </li>
                          <li>
                            <img class="icon" src="https://cdn.rawgit.com/emilundg/88276eb491839eac61d57317c4b00da6/raw/2fe0ba26fff195d67cff1e88ea32e94f78eaaf85/check.svg" /> Alla tillgångar, 100% kontroll.
                          </li>
                          <li>
                            <img class="icon" src="https://cdn.rawgit.com/emilundg/88276eb491839eac61d57317c4b00da6/raw/2fe0ba26fff195d67cff1e88ea32e94f78eaaf85/check.svg" /> Betala mer för fler användare av hemsidan.
                          </li>
                          <li>
                            <img class="icon" src="https://cdn.rawgit.com/emilundg/88276eb491839eac61d57317c4b00da6/raw/2fe0ba26fff195d67cff1e88ea32e94f78eaaf85/check.svg" /> Valbar coaching eller underhåll av hemsidan för 250:-/timme.
                          </li>
                        </ul>
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

    <!-- <b-container v-if="tab === 1" class="container-fluid" fluid>
                                                <b-card tag="article" class="mb-5" style="margin: 30px auto;">
                                                  <h2>Random title</h2>
                                                </b-card>
                                              </b-container> -->
  </div>
</template>

<script>
  require('vue2-animate/dist/vue2-animate.min.css')
  import 'swiper/dist/css/swiper.css'
  import * as api from '../api'
  import VueFlip from 'vue-flip'

  import {
    swiper,
    swiperSlide
  } from 'vue-awesome-swiper'

  export default {
    name: 'app',
    components: {
      swiper,
      VueFlip,
      swiperSlide
    },
    data() {
      return {
        tab: 0,
        show: true,
        centeredSlides: true,
        email: '',
        company: '',
        window: {
          width: 0,
          height: 0
        },
        swiperOption: {
          slideToClickedSlide: true,
          direction: 'vertical',
          slidesPerView: 'auto',
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
    created() {
      window.addEventListener('resize', this.handleResize)
      this.handleResize();
    },
    destroyed() {
      window.removeEventListener('resize', this.handleResize)
    },
    mounted() {},
    methods: {
      handleResize() {
        this.window.width = window.innerWidth;
        this.window.height = window.innerHeight;
      },
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
  .motto-container {
    @media screen and (max-width: 640px) {
      display: none;
    }
    .motto-img {
      width: 40px;
      margin: 60px 0px 20px 0px;
      opacity: 0.87;
    }
    .motto {
      font-style: italic;
    }
  }

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
    @media screen and (max-width: 640px) {
      top: calc((100vh - 416px - 60px)/2);
    }
    @media screen and (min-width: 641px) {
      top: 25vh;
    }
    padding-right: 40px;
    .card {
      min-height: 50vh;
      ul {
        padding: 0px;
      }
    }
    .card,
    .flipCard {
      height: 416px;
    }
    &.swiper-slide-prev,
    &.swiper-slide-next {
      overflow: hidden;
    }
  }

  .row {
    @media screen and (max-width: 640px) {
      .content {
        margin: 2vh auto;
      }
      .header {
        height: 30px;
      }
    }
    @media screen and (min-width: 641px) {
      .content {
        margin: 30vh auto;
      }
    }
    &.container-row {
      height: 100%;
    }
  }

  .inputgroup {
    text-align: left;
    max-width: 375px !important;
    margin: 0px auto;
    margin-bottom: 30px;
  }

  .right-content {
    box-shadow: 0 0px 20px rgba(0, 0, 0, 0.19) inset, 0 0px 6px rgba(0, 0, 0, 0.23) inset;
    background: url('https://cdn.rawgit.com/emilundg/9321e86e792f684491444d6990413078/raw/7da13754a107a62032171b21ff48532056b4f8cb/background.svg') fixed center no-repeat no-repeat;
    background-size: cover;
  }

  .logo {
    width: 100%;
  }

  .centered {
    @media screen and (max-width: 640px) {
      margin: 30px auto;
    }
    @media screen and (min-width: 641px) {
      margin: 10vh auto;
    }
  }

  .flipCard {
    height: 65vh;
    position: relative;
    button {
      position: absolute;
      bottom: 10%;
      left: 0;
      right: 0;
      margin: 0 auto;
      width: 150px;
    }
  }

  .card-icon {
    width: 30%;
    margin: 15px 0px;
    max-width: 90px;
  }

  .front,
  .back {
    backface-visibility: hidden;
    -moz-backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
  }

  .flipper {
    -webkit-transition: background-color all 0.5s ease 0s;
    -moz-transition: background-color all 0.5s ease 0s;
    -o-transition: background-color all 0.5s ease 0s;
    transition: background-color all 0.5s ease 0s;
    -webkit-transform-style: preserve-3d;
    -moz-transform-style: preserve-3d;
    -o-transform-style: preserve-3d;
    transform-style: preserve-3d;
  }
</style>
