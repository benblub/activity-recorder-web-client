<template>
  <div class="home">

    <!-- NEW -->
    <div class="p-3">
      <button type="button" class="btn btn-secondary">New Activity</button>
    </div>


    <!-- SEARCH -->
    <div class="row p-3">
      <div class="col input-group">
        <input
                type="text"
                class="form-control"
                placeholder="search description"
                v-model="searchDescription"
        >

        <div
                v-show="searchDescription !== ''"
                class="input-group-append"
        >
          <button
                  class="btn btn-outline-secondary"
                  @click="eraseSearchDescription"
          >
            x
          </button>
        </div>
      </div>


      <div class="col">
        <date-picker v-model="searchActivityDateAfter">
          <template v-slot="{ inputValue, inputEvents }">
            <div class="input-group">
              <input
                      placeholder="Search ActivityDate after"
                      class="form-control"
                      :value="inputValue"
                      v-on="inputEvents"
              />

              <div
                v-show="searchActivityDateAfter !== ''"
                class="input-group-append"
              >
                <button
                  class="btn btn-outline-secondary"
                  @click="ereaseSearchActivityDateAfter"
                >
                  x
                </button>
              </div>
            </div>
          </template>
        </date-picker>
      </div>

      <!-- SEARCH DATE BEFORE -->
      <div class="col">
        <date-picker v-model="searchActivityDateBefore">
          <template v-slot="{ inputValue, inputEvents }">
            <div class="input-group">
            <input
                    placeholder="Search ActivityDate before"
                    class="form-control"
                    :value="inputValue"
                    v-on="inputEvents"
            />

              <div
                v-show="searchActivityDateBefore !== ''"
                class="input-group-append"
              >
                <button
                  class="btn btn-outline-secondary"
                  @click="eraseSearchActivityDateBefore"
                  >
                  x
                </button>
              </div>
            </div>
          </template>
        </date-picker>
      </div>

      <div class="col">
        <button
                @click="eraseFilter"
                v-show="searchDescription !== '' || searchActivityDateBefore !== ''"
                class="btn btn-outline-secondary
        ">clear Filter</button>
      </div>

    </div>

    <!-- DATA -->
    <div class="p-3">
      <div v-if="loading" class="loading">
        Loading...
      </div>

      <div v-if="error" class="error">
        {{ error }}
      </div>


      <div v-if="activities" class="content">
        <h1>My Activities</h1>

        <table class="table">
          <thead>
          <tr>
            <th>id</th>
            <th>Date</th>
            <th>performed time</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
          </thead>

          <tr v-for="activity in activities" v-bind:key="activity.id">
            <td>{{ activity.id }}</td>
            <td>{{ new Date(activity.activityDate) | formatDate() }}</td>
            <td>{{ activity.performendTime }}</td>
            <td>{{ activity.description }}</td>
            <td>
              <button type="button" class="btn btn-secondary">Edit</button>
              <button type="button" class="btn btn-danger">Delete</button>
            </td>
          </tr>
        </table>
      </div>
    </div>

    <!-- PAGINATION -->
    <b-pagination
            v-model="page"
            :total-rows="totalItems"
            :per-page="5"
            aria-controls="my-table"
            @input="paginationUpdate"
    ></b-pagination>
    <p>Total Items: {{ totalItems }}</p>

  </div>
</template>

<script>
  import { fetchActivities } from "../service/fetchActivities";

  export default {
  name: 'Home',
    data () {
      return {
        loading: false,
        activities: null,
        error: null,
        searchDescription: '',
        searchActivityDateAfter: '',
        searchActivityDateBefore: '',
        page: 1, // our current Page from Pagination
        totalItems: 0,
        totalPages: 0,
        hydraView: null,
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      paginationUpdate: async function (event) {
        // now we have access to the native event
        if (event) {
          this.page = event;
          this.fetchData();
        }
      },
      async fetchData() {
        this.loading = true
        let response;

        try {
          console.log(this.page)
          response = await fetchActivities(
                  this.page,
                  this.searchDescription,
                  this.searchActivityDateAfter,
                  this.searchActivityDateBefore
          )
          this.loading = false

        } catch (e) {
          this.loading = false
          console.log(e)
          this.error = true
        }

        this.activities = response.data['hydra:member'];
        this.hydraView = response.data['hydra:view'];
        this.totalItems = response.data['hydra:totalItems'];

        //this.page = this.hydraView.id;
        this.totalPages = parseInt(this.totalItems / 5);
      },
      eraseSearchDescription() {
        this.searchDescription = ''
      },
      ereaseSearchActivityDateAfter() {
        this.searchActivityDateAfter = ''
      },
      eraseSearchActivityDateBefore() {
        this.searchActivityDateBefore = ''
      },
      eraseFilter() {
        this.searchDescription = ''
        this.searchActivityDateAfter = ''
        this.searchActivityDateBefore = ''
      }
    },
    watch: {
      // call again the method if the route changes
      '$route': 'fetchData',
      searchDescription: function () {
        this.fetchData()
      },
      searchActivityDateAfter: function () {
        this.fetchData()
      },
      searchActivityDateBefore: function () {
        this.fetchData()
      }
    }
}
</script>
