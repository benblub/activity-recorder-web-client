<template>
    <div class="activityCreate">
        <h1>Create Activity</h1>
        <form v-on:submit.prevent>
            <div class="form-group">
                <label for="date">Date</label>
                <input v-model="date" type="date" class="form-control" id="date" placeholder="date">
            </div>
            <div class="form-group">
                <label for="time">Time</label>
                <input v-model="time" type="number" class="form-control" id="time" placeholder="time">
            </div>
            <div class="form-group">
                <label for="description">Description</label>
                <textarea v-model="description" class="form-control" id="description" rows="3"></textarea>
            </div>

            <button
                    @click="create"
                    class="btn btn-outline-secondary">save</button>
        </form>
    </div>
</template>

<script>
    import {createActivity} from "../../service/Activity/createActivity";

    export default {
        name: 'createActivity',
        data() {
            return {
                date: null,
                time: null,
                description: null
            }
        },
        methods: {
            async create() {
                let response = 'foo'
                try {
                    response = await createActivity(
                        this.date,
                        this.time,
                        this.description
                    )
                } catch (e) {
                    // @todo show/map errors Message to propertyPath. (violations)
                    console.log(e.message)
                    console.log(e.response)
                    console.log(e.response.data)
                }

                console.log(response)
            }
        }
    }
</script>