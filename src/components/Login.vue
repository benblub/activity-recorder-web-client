<template>
    <div>
        <form class="login" @submit.prevent="login">
            <h1>SignIn</h1>

            <div class="form-group">
                <label for="email">Email</label>
                <input required v-model="email" class="form-control" id="email" type="email">
            </div>

            <div class="form-group">
                <label for="password">Password</label>
                <input required v-model="password" class="form-control" type="password" id="password">
            </div>

            <button
                    @click="login"
                    class="btn btn-outline-secondary">Login</button>
        </form>

        <div v-if="error" class="error">
            Email or Password wrong, please try again!
        </div>

    </div>
</template>

<script>
    import {login} from "../service/login";
    import Vue from "vue";
    import store from "../store";

    export default {
        data () {
            return {
                email: '',
                password: '',
                error: null,
            }
        },
        methods: {
            async login () {
                 try {
                     let response = await login(this.email, this.password)

                     localStorage.apitoken = response.data.apiToken
                     localStorage.userIri = response.data.iri

                     Vue.prototype.$http.defaults.headers.common['X-AUTH-TOKEN'] = response.data.apiToken

                     store.commit('auth_success', response.data.apiToken, response.data.iri)

                     this.$router.push('/')
                 } catch (e) {
                     console.log(e)
                     localStorage.removeItem('apiToken')
                     this.error = true
                 }

            }
        }
    }
</script>