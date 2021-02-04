<template>
    <div class="updateActivity">
        <h1>Update Activity</h1>

        <ActivityForm v-if='data.description' :description="data.description"></ActivityForm>
    </div>
</template>

<script>
    // We need the activity data from api
    import ActivityForm from "../../components/Activity/ActivityForm";
    import {fetchActivity} from "../../service/Activity/fetchActivity";

    export default {
        name: 'updateActivity',
        components: {ActivityForm},
        data() {
            return {
                activityId: null,
                data: 'foo'
            }
        },
        created() {
            this.activityId = this.$route.params.id
            this.fetchData()
        },
        methods: {
            async fetchData() {
                let response
                try {
                    response = await fetchActivity(this.activityId)
                } catch (e) {
                    console.log(e)
                }

                if (response) {
                    this.data = response.data
                }
                console.log(response.data)
            }
        }
    }
</script>