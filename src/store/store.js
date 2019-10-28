import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        config: [],
        faxes: null,
        selectedContact: null,
        loading: false,
        loadingMessage: 'Loading',
        selectedDir: null,
        apppath: null,

    },
    mutations: {
        setConfig(state, val){
            state.config = val;
        },
        setFaxes(state, val){
            state.faxes = val;
        },
        setSelectedContact(state, val){
            state.selectedContact = val;
        },
        setLoading(state, val){
            state.loading = val
        },
        setLoadingMessage(state, val){
            state.loadingMessage = val
        },
        setSelectedDir(state, val){
            state.selectedDir = val;
        },
        setAppPath(state, val){
            state.apppath = val
        }
    },
    getters: {
        getConfig: state => state.config,
        getFaxes: state => state.faxes,
        getSelectedContact: state => state.selectedContact,
        getLoading: state => state.loading,
        getLoadingMessage: state => state.loadingMessage,
        getSelectedDir: state => state.selectedDir,
        getApppath: state => state.apppath,
    }
})
