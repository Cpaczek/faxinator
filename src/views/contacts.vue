<template>
    <div>


        <sidebar></sidebar>
        <div class="contacts-container">

            <h1 class="header">Contacts</h1>

            <div class="container">
                <div class="field">
                    <label class="label">Name</label>
                    <div class="control">
                        <input class="input" type="text" placeholder="Text input">
                    </div>
                </div>
                <div class="field">
                    <label class="label">Name</label>
                    <div class="control">
                        <input class="input" type="text" placeholder="Text input">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import sidebar from '../components/sidebar.vue'
    export default{
        components: {
            sidebar
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