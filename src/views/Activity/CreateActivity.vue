<template>
    <div class="activityCreate">
        <h1>Create Activity</h1>

        <ActivityForm></ActivityForm>
    </div>
</template>

<script>
    import ActivityForm from "../../components/Activity/ActivityForm";

    export default {
        name: 'createActivity',
        components: {ActivityForm},
        data() {
            return {
            }
        },
    }
</script>