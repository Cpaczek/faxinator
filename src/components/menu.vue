<template>
    <div style="margin-left: 10px;">
        <a role="button" @click="active = !active" class="navbar-burger" aria-label="menu" aria-expanded="false">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
        </a>
        <div class="dropdown" :class="{ 'is-active': active }">
            <div class="dropdown-menu" id="dropdown-menu" role="menu">
                <div class="dropdown-content" @click="active = false">
                    <router-link to="/contacts" class="dropdown-item">
                        Contacts
                    </router-link>
                    <router-link to="/sendFax" class="dropdown-item">
                        Send Fax
                    </router-link>
                    <router-link to="/faxStatus" class="dropdown-item">
                        All Faxes
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        name: "hammy",
        data: () => {
            return {
                active: false
            }
        }
    }
</script>
<style scoped>
    .navbar-burger {
        margin-left: auto;
        margin-right: 0;
        position: absolute;
        top: 5px;
        right: 5px;
        z-index: 200;
        color: #4a4a4a;
        background: #e0e0e0;
        border-radius:2px;
    }
    .dropdown{
        margin-top: 3.25rem;
        right: 210px;
        top: 10px;
        position: absolute;
        z-index: 200;
    }
    @media screen and (min-width: 1024px) {
        .navbar-burger {
            display: block;
        }
    }
    a.dropdown-item.is-active{
        background-color: #00d1b2 !important;
        color: white;
    }

</style>