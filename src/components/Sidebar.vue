<template>
    <aside class="menu">
        <p class="menu-label">
            Contacts
        </p>
        <div class="scrollbox">
            <input type="text" class="input search-bar" v-model="search">
            <ul class="menu-list" v-for="category in categories" :key="category.id">
                <p class="category">{{category.name}}</p>
                <hr class="category-ruler">

                <div v-for="contact in filteredList" :key="contact.id">

                    <li v-if="contact.category === category.id">
                        <a @click="setContact(contact.id)">
                            <p class="contact-name">{{contact.name}}</p>
                            <p class="contact-number">{{contact.number | VMask('(###) ###-####') }}</p>
                        </a>
                    </li>
                </div>

            </ul>
        </div>

    </aside>
</template>
<script>

    export default {
        data: () => {
            return {
                search: '',
            }
        },
        computed: {
            getConfig() {
                return this.$store.getters.getConfig;
            },
            getContacts() {
                return this.$store.getters.getContacts;
            },
            filteredList() {
                if (this.getContacts.contacts) {
                    return this.getContacts.contacts.filter(contact => {
                        return contact.name.toLowerCase().includes(this.search.toLowerCase())
                    })
                }
                return this.getContacts.contacts

            },
            categories() {
                let cat = this.getContacts.categories;
                if (cat) {
                    return cat.sort(function (a, b) {
                        return parseFloat(a.order) - parseFloat(b.order);
                    });
                } else {
                    return this.getContacts.categories
                }

            }

        },
        methods: {
            setContact(id) {
                this.$store.commit('setSelectedContact', id);
            }
        }

    }
</script>
<style scoped>
    aside {
        width: 30vw;
        height: 100vh;
        padding: 20px 0 20px 20px;
        position: fixed;
        top: 0;
        z-index: 100;
        background-color: #f4f4f4;
    }

    .scrollbox {
        height: 100vh;

    }

    .menu-list {
        overflow-y: auto;
        max-height: 80vh;
    }

    .menu-list a:hover {
        background-color: #d8d8d8;
        color: #363636;
    }

    .search-bar {
        width: 90%;
    }

    .category {
        font-size: .75em;
        margin-left: 10px;
        margin-top: 10px;
    }

    .category-ruler {
        margin: 5px;
        background-color: black;
        width: 80%;
    }
</style>
