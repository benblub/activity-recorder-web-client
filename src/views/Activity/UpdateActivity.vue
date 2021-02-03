<template>
    <div class="updateActivity">
        <h1>Update Activity</h1>

        <ActivityForm></ActivityForm>
    </div>
</template>

<script>
    import ActivityForm from "../../components/Activity/ActivityForm";

    export default {
        name: 'updateActivity',
        components: {ActivityForm}
    }
</script>