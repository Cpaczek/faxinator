<template>
    <div>
        <a @click="modal = true" class="button addcontactbutton is-primary">Add Contact</a>
        <div class="modal" :class="{'is-active': modal}">
            <div class="modal-background"></div>
            <div class="modal-content">
                <div class="container mb">
                    <h1 class="has-text-centered">Add New Contact</h1>
                    <div class="field">
                        <label class="label">Name</label>
                        <input v-model="addName" type="text" class="input">
                    </div>
                    <div class="field">
                        <label class="label">Fax Number</label>
                        <input v-model="addNumber" v-mask="'##########'" type="text" class="input">
                    </div>
                    <div class="field">
                        <label class="label">Category</label>
                        <div class="select">
                            <select v-model="addCat">
                                <option class="input" v-for="cat in getContacts.categories" :value="cat.id">{{cat.name}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Notes</label>
                        <textarea v-model="addNotes" type="text" class="input"></textarea>
                    </div>
                    <a @click="addContact()" class="button is-primary">Add Contact</a>
                </div>
            </div>
            <button @click="modal = false;" class="modal-close is-large" aria-label="close"></button>
        </div>
        <div class="modal" :class="{'is-active': editmode}">
            <div class="modal-background"></div>
            <div class="modal-content">
                <div class="container mb">
                    <h1 class="has-text-centered">Edit Contact</h1>
                    <div class="field">
                        <label class="label">Name</label>
                        <input type="text" v-model="name" class="input">
                    </div>
                    <div class="field">
                        <label class="label">Fax Number</label>
                        <input v-model="number" v-mask="'##########'" type="text" class="input">
                    </div>
                    <div class="field">
                        <label class="label">Category</label>
                        <div class="select">
                            <select v-model="category">
                                <option v-for="cat in getContacts.categories" :value="cat.id">{{cat.name}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Notes</label>
                        <input v-model="notes" type="text" class="input">
                    </div>
                    <a href="#" @click="saveContact()" v-if="editmode" class="button is-primary sendFax">Save</a>
                </div>
            </div>
            <button @click="editmode = false" class="modal-close is-large" aria-label="close"></button>
        </div>

        <div class="container">
            <div v-if="getContactDetails">
                <a href="#" @click="toggleEdit()" class="button is-secondary">Edit</a>

                <div class="info-container">
                    <h2>Name</h2>
                    <p v-if="!editmode">{{this.getContactDetails.name}}</p>
                </div>
                <div class="info-container">
                    <h2>Phone Number</h2>
                    <p v-if="!editmode">{{this.getContactDetails.number | VMask('+1 (###) ###-####')}}</p>
                </div>
                <div class="info-container">
                    <h2>Notes</h2>
                    <p v-if="!editmode">{{this.getContactDetails.notes}}</p>
                </div>

                <a href="#" @click="autoFillContact()" v-if="!editmode" class="button is-primary sendFax">Send Fax</a>
                <!--TODO: Add save func-->

            </div>

        </div>
    </div>
</template>
<script>
    import editJsonFile from 'edit-json-file'
    import state from '../selectedContact.js'

    export default {

        data: () => {
            return {
                editmode: false,
                appPath: null,
                name: null,
                number: null,
                notes: null,
                category: null,
                modal: false,
                addName: null,
                addNumber: null,
                addNotes: null,
                addCat: null,


            }

        },
        computed: {
            getConfig() {
                return this.$store.getters.getConfig;
            },
            getContacts() {
                return this.$store.getters.getContacts;
            },
            getSelectedContact() {
                return this.$store.getters.getSelectedContact;
            },
            getContactDetails() {
                if (this.getSelectedContact) {
                    return this.getContacts.contacts[this.getContactIndex]
                } else {
                    return null;
                }

            },
            getContactIndex() {
                return this.getContacts.contacts.findIndex(contacts => contacts.id === this.getSelectedContact)
            },
            getApppath() {
                return this.$store.getters.getApppath;
            }

        },

        methods: {
            autoFillContact() {
                let tempName = this.getContactDetails.name;
                let tempNumber = this.getContactDetails.number;
                state.selectedContact = {'name': tempName, 'number': tempNumber};
                this.$router.push({path: '/sendFax'})


            },
            toggleEdit() {
                this.editmode = !this.editmode;
                this.name = this.getContactDetails.name;
                this.number = this.getContactDetails.number;
                this.category = this.getContactDetails.category;
                this.notes = this.getContactDetails.notes;
            },
            saveContact() {


                let editContact = editJsonFile(this.getApppath + '\\..\\..\\data\\contact.json');
//                let editConfig = editJsonFile('C:\\Users\\cameron\\Documents\\config.json');
                let contacts = editContact.get('contacts')
                contacts[this.getContactIndex] = {
                    "id": this.getSelectedContact,
                    "number": this.number,
                    "category": this.category,
                    "name": this.name,
                    "notes": this.notes
                };
                editContact.set("contacts", contacts);
                editContact.save();
                this.editmode = false;
            },

            addContact() {
                let editContact = editJsonFile(this.getApppath + '\\..\\..\\data\\contact.json');
//                let editConfig = editJsonFile('C:\\Users\\cameron\\Documents\\config.json');
                let contacts = editContact.get('contacts')
                contacts.push({
                    "id": Date.now(),
                    "number": this.addNumber,
                    "name": this.addName,
                    "category": this.addCat,
                    "notes": this.addNotes
                });
                this.addNumber = null;
                this.addName = null;
                this.addNotes = null;
                this.addCat = null;

                editContact.set("contacts", contacts);
                editContact.save();
                this.modal = false;

            }
        }

    }
</script>
<style scoped>
.container{
    width: 90%;
}
    .info-container h2 {
        font-weight: bold;
        font-size: 1.5em;

    }

    .sendFax {
        margin-top: 25px;
    }

    .modal {
        z-index: 1200 !important;

    }

    h1 {
        font-size: 2em;
    }

    .mb {
        background: white;
        border-radius: 5px;
        padding: 20px;
        display: flex;
        justify-content: center;
        flex-direction: column;
    }

    a.button {
        maring: auto;
    }

    a.addcontactbutton {
        position: absolute;
        z-index: 1100;
        bottom: 10px;
        left: 10px;
    }
    .select{
        width: 100%;
    }
    select{
        width: 100%;
    }
</style>
