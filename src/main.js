import Vue from 'vue'
import App from './App.vue'
import router from './router'
import "./../node_modules/bulma/bulma.sass";

Vue.config.productionTip = false


new Vue({
    router,
    render: h => h(App),
    mounted(){
        router.push({ path: '/' })
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
        document.addEventListener('keydown', function(e) {
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
    }
}).$mount('#app')
