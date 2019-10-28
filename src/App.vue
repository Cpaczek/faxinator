<template>
    <div>
        <loader></loader>
        <hamburger></hamburger>
        <router-view></router-view>
    </div>

</template>

<script>
    import hamburger from './components/menu.vue'
    import loader from './components/loader.vue'
    export default {
        name: 'app',
        mounted(){
                this.$router.push({ path: '/sendFax' })

        },
        components: {
            hamburger,
            loader

        }
    }
</script>

<style>

    /*@import "./assets/sass/styles.scss";*/
    @import url('https://fonts.googleapis.com/css?family=Nunito&display=swap');

    * {
        font-family: 'Nunito', sans-serif;
    }
    hamburger{
        margin-bottom: 3.25rem;
    }
</style>
