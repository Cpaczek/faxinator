<template>
    <aside class="menu">
        <p class="menu-label">
            Contacts
        </p>
        <div class="scrollbox">
            <ul class="menu-list">
                <li v-for="contact in getConfig.contacts" :key="contact.id">
                    <a @click="setContact(contact.id)">
                        <p class="contact-name">{{contact.name}}</p>
                        <p class="contact-number">{{contact.number}}</p>
                    </a>
                </li>

            </ul>
        </div>

    </aside>
</template>
<script>
    export default{
        computed:{
            getConfig(){
                return this.$store.getters.getConfig;
            },

        },
        methods:{
            setContact(id){
                this.$store.commit('setSelectedContact', id);
            }
        }

    }
</script>
<style scoped>
    aside{
        width: 30vw;
        height: 100vh;
        padding: 20px 0 20px 20px;
        position: fixed;
        top: 0;
        z-index: 100;
        background-color: #f4f4f4;
    }
    .scrollbox{
        height: 100vh;

    }
    .menu-list{
        overflow-y: scroll;
        max-height: 80vh;
    }
    .menu-list a:hover {
        background-color: #d8d8d8;
        color: #363636;
    }
</style>