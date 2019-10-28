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
                        <input v-model="addNumber" type="text" class="input">
                    </div>
                    <div class="field">
                        <label class="label">Notes</label>
                        <input v-model="addNotes" type="text" class="input">
                    </div>
                    <a @click="addContact()" class="button is-primary">Add Contact</a>
                </div>
            </div>
            <button @click="modal = false;"  class="modal-close is-large" aria-label="close"></button>
        </div>
        <div class="container">
            <div v-if="getContactDetails">
                <a href="#" @click="toggleEdit()" class="button is-secondary">Edit</a>

                <div class="info-container">
                    <h2>Name</h2>
                    <p v-if="!editmode">{{this.getContactDetails.name}}</p>
                    <div v-if="editmode">
                        <input type="text" v-model="name" class="input">
                    </div>

                </div>
                <div class="info-container">
                    <h2>Phone Number</h2>
                    <p v-if="!editmode">{{this.getContactDetails.number}}</p>
                    <div v-if="editmode">
                        <input type="text" v-model="number" class="input">
                    </div>
                </div>
                <div class="info-container">
                    <h2>Notes</h2>
                    <p v-if="!editmode">{{this.getContactDetails.notes}}</p>
                    <div v-if="editmode">
                        <input type="text" v-model="notes" class="input">
                    </div>
                </div>

                <a href="#" @click="autoFillContact()" v-if="!editmode" class="button is-primary sendFax">Send Fax</a>
                <!--TODO: Add save func-->
                <a href="#" @click="saveContact()" v-if="editmode" class="button is-primary sendFax">Save</a>
            </div>

        </div>
    </div>
</template>
<script>
    import {EventBus} from '../eventbus.js';
    import {ipcRenderer} from 'electron'
    import editJsonFile from 'edit-json-file'
    import state from '../selectedContact.js'

    export default{

        data: () => {
            return {
                editmode: false,
                appPath: null,
                name: null,
                number: null,
                notes: null,
                modal: false,
                addName: null,
                addNumber: null,
                addNotes: null,


            }

        },
        computed: {
            getConfig(){
                return this.$store.getters.getConfig;
            },
            getSelectedContact(){
                return this.$store.getters.getSelectedContact;
            },
            getContactDetails(){
                if (this.getSelectedContact) {
                    return this.getConfig.contacts[this.getContactIndex]
                } else {
                    return null;
                }

            },
            getContactIndex(){
                return this.getConfig.contacts.findIndex(contacts => contacts.id === this.getSelectedContact)
            },
            getApppath(){
                return this.$store.getters.getApppath;
            }

        },

        methods: {
            autoFillContact(){
                let tempName = this.getContactDetails.name;
                let tempNumber = this.getContactDetails.number;
                console.log("type of computed prop" + typeof(this.getContactDetails.name))
                console.log("type of name" + typeof(tempName));
                state.selectedContact = {'name': tempName, 'number': tempNumber};
                this.$router.push({path: '/sendFax'})


            },
            toggleEdit(){
                this.editmode = !this.editmode;
                this.name = this.getContactDetails.name;
                this.number = this.getContactDetails.number;
                this.notes = this.getContactDetails.notes;
            },
            saveContact(){


                let editConfig = editJsonFile(this.getApppath + '\\..\\..\\config.json');
//                let editConfig = editJsonFile('C:\\Users\\cameron\\Documents\\config.json');
                let contacts = editConfig.get('contacts')
                console.log("contacts: " + contacts);
                contacts[this.getContactIndex] = {
                    "id": this.getSelectedContact,
                    "number": this.number,
                    "name": this.name,
                    "notes": this.notes
                };
                editConfig.set("contacts", contacts);
                editConfig.save();
                this.editmode = false;
            },
            addContact(){
                let editConfig = editJsonFile(this.getApppath + '\\..\\..\\config.json');
//                let editConfig = editJsonFile('C:\\Users\\cameron\\Documents\\config.json');
                let contacts = editConfig.get('contacts')
                console.log("contacts: " + contacts);
                contacts.push({
                    "id": Date.now(),
                    "number": this.addNumber,
                    "name": this.addName,
                    "notes": this.addNotes
                });
                this.addNumber = null;
                this.addName = null;
                this.addNotes = null;

                editConfig.set("contacts", contacts);
                editConfig.save();
                this.modal = false;

            }
        }

    }
</script>
<style scoped>
    .container {
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
    h1{
        font-size: 2em;
    }
    .mb{
        background:white;
        border-radius: 5px;
        padding: 20px;
        display:flex;
        justify-content: center;
        flex-direction: column;
    }
    a.button{
        maring: auto;
    }
    a.addcontactbutton{
        position:absolute;
        z-index:1100;
        bottom: 10px;
        left: 10px;
    }
</style>