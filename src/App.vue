<template>
  <div id="app" class="container">
    <nav
            v-if="isLoggedIn"
            class="navbar navbar-expand-lg navbar-light bg-light">

      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="navbar-collapse collapse justify-content-between align-items-center w-100" id="navbarTogglerDemo02">
        <ul class="nav">
          <li class="nav-item">
            <router-link to="/" class="nav-link">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/about" class="nav-link">About</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/settings" class="nav-link">Settings</router-link>
          </li>
        </ul>

        <ul class="nav navbar-nav flex-row justify-content-md-center justify-content-start flex-nowrap">
          <li class="nav-item">
            <span class="navbar-text font-weight-light mr-3" v-if="isLoggedIn">{{ email }}</span>
          </li>
          <li class="nav-item">
            <a @click="logout" class="btn btn-outline-secondary" v-if="isLoggedIn">Logout</a>
          </li>
        </ul>
      </div>
    </nav>

    <router-view/>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        email: localStorage.email
      }
    },
    computed : {
      isLoggedIn : function(){
        return this.$store.getters.isLoggedIn
      }
    },
    methods: {
      logout: function () {
        this.$store.dispatch('logout')
                .then(() => {
                  this.$router.push('/login')
                })
      }
    }
  }
</script>
