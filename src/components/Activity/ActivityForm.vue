<template>
    <div>
        <div v-if="errors.length > 0">
            <div v-for="error in errors" :key="error" class="alert alert-danger" role="alert">{{ error }}</div>
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
                <textarea v-model="description2"
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

            <div v-if="success">
                <p style="color: green">saved!</p>
            </div>

        </form>
    </div>
</template>

<script>
    import {createActivity} from "../../service/Activity/createActivity";
    import {updateActivity} from "../../service/Activity/updateActivity";
    import moment from "moment";

    export default {
        name: 'ActivityForm',
        created() {
            this.date = this.frontEndDateFormat(this.date)
        },
        data: function () {
            return {
                date: this.dateProp,
                descriptionError: null,
                timeError: null,
                dateError: null,
                errors: [],
                success: null,
                description2: this.description,
                time: this.timeProp
            }
        },
        methods: {
            frontEndDateFormat: function(value) {
                return moment(String(value)).format('MM.DD.YYYY')
            },
            resetErrors() {
                this.descriptionError =  null,
                this.errors = [],
                this.success = null,
                this.timeError = null,
                this.dateError = null
            },
            async create() {
                this.resetErrors()

                try {
                    if (this.action === 'update') {
                        await updateActivity(
                            this.$route.params.id,
                            this.date,
                            this.time,
                            this.description2
                        )

                        this.success = true
                    }

                    if (this.action === 'create') {
                        await createActivity(
                            this.date,
                            this.time,
                            this.description2
                        )
                    }
                } catch (e) {
                    if (e.response.data.message) {
                        this.errors.push(e.response.data.message)
                    }

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
            }
        },
        props: ['description', 'timeProp', 'action', 'dateProp']
    }
</script>