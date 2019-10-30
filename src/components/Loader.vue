<template>
    <div>
        <div  v-if="getLoading" class="curtain">
            <div class="lds-ripple">
                <div></div>
                <div></div>
            </div>
            <p>{{getLoadingMessage}}</p>

        </div>

    </div>
</template>
<script>
    export default{
        computed:{
            getLoading(){
                return this.$store.getters.getLoading;
            },
            getLoadingMessage(){
                return this.$store.getters.getLoadingMessage;
            }
        }
    }
</script>
<style scoped>
    .curtain{
        top: 0;
        width: 100vw;
        height: 100vh;
        position: absolute;
        z-index: 1000;
        background-color: rgba(66, 66, 66, 0.89)

    }
    p{
        position: absolute;
        top: 45%;
        width: 100vw;
        color: white;
        font-weight: bold;
        font-size: 1.5em;
        text-align: center;

    }
    .lds-ripple {
        display: inline-block;
        position: absolute;
        top: calc(40% - 32px);
        left: calc(50% - 32px);
        width: 64px;
        height: 64px;

    }

    .lds-ripple div {
        position: absolute;
        border: 4px solid #fff;
        opacity: 1;
        border-radius: 50%;
        animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
    }

    .lds-ripple div:nth-child(2) {
        animation-delay: -0.5s;
    }
    @keyframes lds-ripple {
        0% {
            top: 28px;
            left: 28px;
            width: 0;
            height: 0;
            opacity: 1;
        }
        100% {
            top: -1px;
            left: -1px;
            width: 58px;
            height: 58px;
            opacity: 0;
        }
    }
</style>