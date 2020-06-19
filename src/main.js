import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import fs from 'fs'
import {ipcRenderer} from 'electron'
import VueMask from 'v-mask'
import { VueMaskFilter } from 'v-mask'
import { EventBus } from './event-bus.js';
Vue.config.productionTip = false

Vue.use(VueMask);
Vue.filter('VMask', VueMaskFilter);
new Vue({
    router,
    store,
    render: h => h(App),

    mounted(){
        ipcRenderer.send('appPath');
        ipcRenderer.on('appPathReply', (event, arg) => {
            this.setAppPath(arg);
            this.setConfig(JSON.parse(fs.readFileSync(this.getAppPath + '\\..\\..\\data\\config.json')));
            this.setContacts(JSON.parse(fs.readFileSync(this.getAppPath + '\\..\\..\\data\\contact.json')));
            EventBus.$emit('loaded');
        });
        // this.setConfig(JSON.parse(fs.readFileSync('C:\\Users\\cameron\\Documents\\config.json')));

        setInterval(()=>{
            // this.setConfig(JSON.parse(fs.readFileSync('C:\\Users\\cameron\\Documents\\config.json')));
            this.setConfig(JSON.parse(fs.readFileSync(this.getAppPath + '\\..\\..\\data\\config.json')));
            this.setContacts(JSON.parse(fs.readFileSync(this.getAppPath + '\\..\\..\\data\\contact.json')));
        }, 3000);




        let allowedKeys = {
            37: 'left',
            38: 'up',
            39: 'right',
            40: 'down',
            65: 'a',
            66: 'b'
        };
        let konamiCodeBefore = ['up', 'up', 'down', 'down', 'left', 'right', 'left', 'right', 'b', 'a'];
        let konamiCode = konamiCodeBefore.reverse();
        let konamiCodePosition = 0;
        document.addEventListener('keydown', function (e) {
            let key = allowedKeys[e.keyCode];
            let requiredKey = konamiCode[konamiCodePosition];
            if (key == requiredKey) {
                konamiCodePosition++;
                if (konamiCodePosition == konamiCode.length) {
                    activateCheats();
                    konamiCodePosition = 0;
                }
            } else {
                konamiCodePosition = 0;
            }
        });
        function activateCheats() {
            router.push({path: 'supersecertpagethatwillallowyoutoedittheconfig'});
        }
    },
    methods: {
        setConfig(val){
            this.$store.commit('setConfig', val)
        },
        setContacts(val){
            this.$store.commit('setContacts', val)
        },
        setAppPath(val){
            this.$store.commit('setAppPath', val);
        },

    },
    computed:{
        getAppPath(){
            return this.$store.getters.getApppath;
        }
    }
}).$mount('#app')
