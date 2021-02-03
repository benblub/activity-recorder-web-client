<template>
    <div class="activityCreate">
        <h1>Create Activity</h1>

        <div v-if="errors.length > 0" class="alert alert-danger" role="alert">
            <p v-for="error in errors" :key="error">{{ error }}</p>
        </div>

        <form v-on:submit.prevent>
            <div class="form-group">
                <label for="date">Date</label>
                <input
                        v-model="date"
                        type="date"
                        class="form-control"
                        v-bind:class="{'is-invalid': dateError}"
                        id="date"
                        placeholder="date"
                >
            </div>
            <div class="form-group">
                <label for="time">Time</label>
                <input v-model="time" type="number"
                       class="form-control"
                       v-bind:class="{'is-invalid': timeError}"
                       id="time"
                       placeholder="time"
                >
            </div>
            <div class="form-group">
                <label for="description">Description</label>
                <textarea v-model="description"
                          class="form-control"
                          v-bind:class="{'is-invalid': descriptionError}"
                          id="description"
                          rows="3">
                </textarea>
                <small style="color: red">{{ descriptionError }}</small>
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
                description: null,
                descriptionError: null,
                timeError: null,
                dateError: null,
                errors: []
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


                    if (e.response.data.violations) {
                        for(let i in e.response.data.violations) {
                            // map on top or on form field path
                            if (e.response.data.violations[i].propertyPath == '') {
                                this.errors.push(e.response.data.violations[i].message)
                            } else if (e.response.data.violations[i].propertyPath == 'description') {
                                this.descriptionError = e.response.data.violations[i].message
                            } else if (e.response.data.violations[i].propertyPath == 'performendTime') {
                                this.timeError = e.response.data.violations[i].message
                            } else if (e.response.data.violations[i].propertyPath == 'activityDate') {
                                this.dateError = e.response.data.violations[i].message
                            }
                        }
                    }
                }
                console.log(response)
            }
        }
    }
</script>