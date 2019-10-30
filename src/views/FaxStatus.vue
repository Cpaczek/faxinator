<template>
    <div>
        <table class="table">
            <thead>
            <tr>
                <th>SID</th>
                <th>Date</th>
                <th>To</th>
                <th>Status</th>
                <th>Link</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="fax in getFaxes" :key="fax.sid">
                <td>{{truncateSID(fax.sid)}}</td>
                <td>{{hrd(fax.dateCreated)}}</td>
                <td>{{fax.to}}</td>
                <td>{{fax.status}}</td>
                <td><a v-if="!(fax.status === 'failed')" :href="fax.mediaUrl" class="button is-link">Link</a></td>
            </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
    import axios from 'axios'
    import Swal from 'sweetalert2'
    export default{
        mounted(){

            this.refreshFaxes();
            this.setLoading(true);
            this.setLoadingMessage("Retrieving Faxes")
        },
        methods:{
            refreshFaxes(){
                let _this = this;
                axios.get(this.getConfig.functionsDomain + '/get-faxes?authtoken=' + this.getConfig.secret)
                    .then(function (response) {
                        // handle success
                        _this.setLoading(false);
                        _this.setFaxes(response.data)
                    })
                    .catch(function (error) {
                        _this.setLoading(false);
                        Swal.fire('Refreshing Faxes Failed', 'We were not able to receive previous faxes. Please try again later', 'error');
                    })
            },
            truncateSID(sid){
                return sid.substr(sid.length - 8)
            },
            setFaxes(val){

                this.$store.commit('setFaxes', val);

            },
            hrd(date){
                return new Date(date).toLocaleString();
            },
            setLoading(val){
                this.$store.commit('setLoading', val);
            },
            setLoadingMessage(val){
                this.$store.commit('setLoadingMessage', val);
            },
        },
        computed:{
            getFaxes(){
                return this.$store.getters.getFaxes;
            },
            getConfig(){
                return this.$store.getters.getConfig;
            },

        }
    }
</script>
<style scoped>
.table{
    margin-top: 15vh;
    margin-left: auto;
    margin-right: auto;
    width: 90%;
}
</style>