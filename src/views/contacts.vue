<template>
    <div>


        <sidebar></sidebar>
        <div class="contacts-container">

            <h1 class="header">Selected Contact</h1>

            <viewContact></viewContact>


        </div>
    </div>
</template>
<script>
    import sidebar from '../components/sidebar.vue'
    import viewContact from '../components/viewContact.vue'
    export default{
        components: {
            sidebar,
            viewContact
        }
    }
</script>
<style scoped>
.contacts-container{
    margin-left: 30vw;
}
    .header {
        font-size: 2em;
        text-align: center;
        margin-top: 100px;
    }
</style>