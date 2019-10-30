import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import fs from 'fs'
import {ipcRenderer} from 'electron'
import "./../node_modules/bulma/bulma.sass";

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App),

    mounted(){
        ipcRenderer.send('appPath');
        ipcRenderer.on('appPathReply', (event, arg) => {
            this.setAppPath(arg);
            this.setConfig(JSON.parse(fs.readFileSync(this.getApppath + '\\..\\..\\config.json')));
        });
        // this.setConfig(JSON.parse(fs.readFileSync('C:\\Users\\cameron\\Documents\\config.json')));

        setInterval(()=>{
            // this.setConfig(JSON.parse(fs.readFileSync('C:\\Users\\cameron\\Documents\\config.json')));
            this.setConfig(JSON.parse(fs.readFileSync(this.getApppath + '\\..\\..\\config.json')));
        }, 3000)




        let allowedKeys = {
            37: 'left',
            38: 'up',
            39: 'right',
            40: 'down',
            65: 'a',
            66: 'b'
        };
        let konamiCode = ['up', 'up', 'down', 'down', 'left', 'right', 'left', 'right', 'b', 'a'];
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
        setAppPath(val){
            this.$store.commit('setAppPath', val);
        },

    },
    computed:{
        getApppath(){
            return this.$store.getters.getApppath;
        }
    }
}).$mount('#app')
