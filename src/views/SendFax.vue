<template>
    <div>
        <div class="background" style="background-image: url('https://source.unsplash.com/1600x900/?fruit')">


        <div class="container sendFaxHeader has-text-centered">
            <h1>Send Fax</h1>
            <div class="field">
                <label v-if="name" class="label">Name</label>
                <div class="control">
                    <h2 class="has-text-centered">{{name}}</h2>
                </div>
            </div>
            <div class="field">
                <label class="label">Phone Number</label>
                <div class="control">
                    <input v-model="number" v-mask="'##########'" type="text" class="input">
                </div>
            </div>
            <a href="#" @click="chooseFile()" class="button is-primary">Choose File</a>
            <p>{{getFileName()}}</p>
            <br>
            <a href="#" v-if="number && getSelectedDir" @click="sendFax()" class="button is-primary">Send</a>

        </div>
        </div>
    </div>
</template>
<script>
    import {ipcRenderer} from 'electron'
    import state from '../selectedContact.js'
    import {createReadStream} from 'fs';
    import fs from 'fs'
    import Swal from 'sweetalert2'
    import axios from 'axios'

    export default {
        data: () => {
            return {
                //TODO: add selected dir to vuex
                number: null,
                name: null,
                tempViewUrl: "",
                tempUploadUrl: "",
            }
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                if (from.path === '/contacts' && to.path === '/sendFax' && state.selectedContact.name) {
                    vm.number = state.selectedContact.number;
                    vm.name = state.selectedContact.name;

                    state.selectedContact = {'name': null, 'number': null}
                }
            }) // from is the "old" $route object


        },
        methods: {
            chooseFile() {

                ipcRenderer.send('fileUpload');
                ipcRenderer.on('fileUploadReply', (event, arg) => {
                    this.setSelectedDir(arg[0]);
                })
            },
            getFileName() {
                if (this.getSelectedDir) {
                    return this.getSelectedDir.split('\\').pop()
                }

            },
            sendFax() {
                let _this = this;
                this.setLoadingMessage("Requesting Upload URL");
                this.setLoading(true);

                axios.post(this.getConfig.functionsDomain + '/request-upload-url', {
                    authtoken: _this.getConfig.secret,
                    filename: Date.now() + ".pdf"
                })
                    .then(function (response) {
                        //upload url
                        _this.tempUploadUrl = response.data.uploadurl;
                        _this.tempViewUrl = response.data.viewurl;
                        _this.setLoadingMessage("Converting PDF")
                        let pdf = null;
                        pdf = fs.readFileSync(_this.getSelectedDir);
                        _this.setLoadingMessage("Uploading PDF")
                        axios.put(_this.tempUploadUrl, pdf, {
                            headers: {
                                "Content-Type": "application/pdf",
                            }
                        }).then((res) => {
                            //Twilio Post Request
                            _this.setLoadingMessage("Queueing")
                            axios.post(_this.getConfig.functionsDomain + '/send-fax', {
                                authtoken: _this.getConfig.secret,
                                destination: _this.getConfig.prepend + _this.number,
                                fileurl: _this.tempViewUrl
                            })
                                .then(function (response) {
                                    let loop = setInterval(() => {
                                        axios.get(_this.getConfig.functionsDomain + '/get-fax', {
                                            params: {
                                                authtoken: _this.getConfig.secret,
                                                id: response.data.sid
                                            }
                                        }).then(function (response) {
                                                let done = ['queued', 'processing', 'sending'];

                                                if (done.includes(response.data.status)) {
                                                    Swal.fire(response.data.status.charAt(0).toUpperCase() + response.data.status.slice(1))
                                                } else if (response.data.status === 'delivered') {
                                                    _this.setSelectedDir(null)
                                                    _this.number = null;
                                                    _this.name = null;
                                                    Swal.fire('Fax Delivered', 'Your message has been delivered', 'success');

                                                    clearInterval(loop)
                                                    _this.setLoading(false)
                                                } else {
                                                    Swal.fire('Fax Failed', 'Your message has not been delivered', 'error');
                                                    _this.setLoading(false);
                                                    clearInterval(loop)

                                                }
                                            })
                                            .catch(function (error) {
                                                Swal.fire('Fax Failed', 'Your message has not been delivered', 'error');
                                                _this.setLoading(false);
                                                clearInterval(loop)

                                            });
                                    }, 3000)

                                })
                                .catch(function (error) {
                                    Swal.fire('Fax Failed', 'Your message has not been delivered', 'error');
                                    _this.setLoading(false);

                                });
                        }).catch((err) => {

                            Swal.fire('Fax Failed', 'Your message has not been delivered', 'error');
                            _this.setLoading(false);
                        });
                        //end upload url
                    })
                    .catch(function (error) {

                        _this.setLoading(false);
                        //TODO: add error message
                    });

            },
            setLoading(val) {
                this.$store.commit('setLoading', val);
            },
            setLoadingMessage(val) {
                this.$store.commit('setLoadingMessage', val);
            },
            setSelectedDir(val) {
                this.$store.commit('setSelectedDir', val);
            }


        },
        computed: {
            getConfig() {
                return this.$store.getters.getConfig;
            },
            getSelectedDir() {
                return this.$store.getters.getSelectedDir;
            }
        }

    }
</script>
<style scoped>
    .sendFaxHeader {
        margin-top: 80px;
        padding-top: 20px;
        background: white;
        border-radius: 20px;

    }

    h1 {
        font-size: 2em;
    }

    h2 {
        font-size: 1.5em;
    }
    .background{
        background-size: cover;
        background-repeat: no-repeat;
        padding-top: 100px;
        height: 100vh;
    }
    .control {
        width: 30%;
        margin: auto;
    }
</style>
