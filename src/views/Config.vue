<template>
    <div>
        <div class="header">
            <h1 class="has-text-centered is-size-1">Configuration</h1>
        </div>
        <div class="container">

            <div class="field">
                <label class="label">Prepend</label>
                <div class="control">
                    <input v-model="prepend" class="input" type="text" placeholder="Text input">
                </div>
            </div>
            <div class="field">
                <label class="label">API Secret</label>
                <div class="control">
                    <input v-model="api" class="input" type="text" placeholder="Text input">
                </div>
            </div>
            <div class="field">
                <label class="label">Function Domain</label>
                <div class="control">
                    <input v-model="funcdomain" class="input" type="text" placeholder="Text input">
                </div>
            </div>
            <div class="control">
                <button @click="saveConfig()" class="button is-primary">Save</button>
            </div>
            <hr>
            <h2 class="is-size-2">Categories</h2>
            <table class="table cattable">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Order</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="category in getContacts.categories">
                    <th>{{category.id}}</th>
                    <td>{{category.name}}</td>
                    <td>{{category.order}}</td>
                    <td><button class="button is-danger" @click="confirmDelete(category.id)">Delete</button></td>
                </tr>
                </tbody>
            </table>
            <hr>
            <h2 class="is-size-2">Add New Category</h2>
            <div class="field">
                <label class="label">Name</label>
                <div class="control">
                    <input v-model="catName" class="input" type="text" placeholder="Text input">
                </div>
            </div>
            <div class="field">
                <label class="label">Order</label>
                <div class="control">
                    <input v-model="catOrder" class="input" type="text" placeholder="Number input">
                </div>
            </div>
            <div class="control">
                <button @click="saveCategory()" class="button is-primary">Save</button>
            </div>
            <hr>
        </div>
    </div>
</template>
<script>
    import editJsonFile from 'edit-json-file'
    import Swal from 'sweetalert2'

    export default {
        data: () => {
            return {
                prepend: null,
                api: null,
                funcdomain: null,
                catName: null,
                catOrder: null,
            }
        },
        mounted() {
            this.prepend = this.getConfig.prepend;
            this.api = this.getConfig.secret;
            this.funcdomain = this.getConfig.functionsDomain;
        },
        computed: {
            getConfig() {
                return this.$store.getters.getConfig;
            },
            getContacts() {
                return this.$store.getters.getContacts;
            },
        },
        methods: {

            saveConfig() {
                let editConfig = editJsonFile(this.getApppath + '\\..\\..\\data\\config.json');
                editConfig.set("prepend", this.prepend);
                editConfig.set("secret", this.api);
                editConfig.set("functionsDomain", this.funcdomain);
                editConfig.save();
                Swal.fire('Congrats', 'You did it you updated the config', 'success');
            },
            saveCategory() {
                let editContact = editJsonFile(this.getApppath + '\\..\\..\\data\\contact.json');
//                let editConfig = editJsonFile('C:\\Users\\cameron\\Documents\\config.json');
                let contacts = editContact.get('categories')
                contacts.push({
                    "id": Date.now(),
                    "order": this.catOrder,
                    "name": this.catName,
                });
                this.catOrder = null;
                this.catName = null;

                editContact.set("categories", contacts);
                editContact.save();
                Swal.fire('You did it you added a category', 'Give yourself a pat on the back', 'success');

            },
            confirmDelete(id){
                Swal.fire({
                    title: 'Are you sure?',
                    text: "Once deleted you must make sure no contacts have a missing category",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                    if (result.value) {
                        this.deleteCategory(id)
                    }
                })

            },
            deleteCategory(id){
                let index = this.getContacts.categories.findIndex(ct => ct.id === id)
                let editContact = editJsonFile(this.getApppath + '\\..\\..\\data\\contact.json');
//                let editConfig = editJsonFile('C:\\Users\\cameron\\Documents\\config.json');
                let contacts = editContact.get('categories');
                console.log("contacts: " + JSON.stringify(contacts));
                contacts.splice(index, 1);

                editContact.set("categories", contacts);
                editContact.save();
                Swal.fire('You did it you deleted a category', 'Give yourself a pat on the back', 'success');

            }
        }
    }
</script>
<style scoped>
    .header {
        margin-top: 30px;
    }

    .container {
        width: 90%;
    }

    .cattable {
        width: 100%;
    }
</style>
