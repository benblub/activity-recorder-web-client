<template>
  <div class="home">

    <!-- NEW -->
    <div class="p-3">
      <button type="button" class="btn btn-secondary">New Activity</button>
    </div>


    <!-- SEARCH -->
    <div class="row p-3">
      <div class="col">
        <input
                type="text"
                class="form-control"
                placeholder="search description"
                v-model="searchDescription"
        >
      </div>
      <div class="col">
        <date-picker v-model="searchActivityDateAfter">
          <template v-slot="{ inputValue, inputEvents }">
            <input
                    placeholder="Search ActivityDate after"
                    class="form-control"
                    :value="inputValue"
                    v-on="inputEvents"
            />
          </template>
        </date-picker>
      </div>
    </div>

    <!-- DATA -->
    <b-pagination
            v-model="page"
            :total-rows="totalItems"
            :per-page="30"
            aria-controls="my-table"
            @input="paginationUpdate"
    ></b-pagination>
    <p class="mt-3">Current Page: {{ page }}</p>
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
        searchActivityDateAfter: null,
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
                  this.searchActivityDateAfter
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
        this.totalPages = parseInt(this.totalItems / 30);
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
      }
    }
}
</script>
