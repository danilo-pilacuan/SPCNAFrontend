import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import VuexPersistence from 'vuex-persist';
import localForage from 'localforage';
const vuexLocal = new VuexPersistence({
  storage: localForage,
  asyncStorage: true,
});


Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    authenticated: false,
    userType: 0,
    synthVoice:"ss",
    selectedCourse: null,
    currentUser: null,
    selectedUserTask:null,
    selectedTask:null,
    selectedLesson:null,
    voiceList:[],
    enableAudio: false,
    
  },
  mutations: {
    SET_AUTH:(state,auth)=> state.authenticated = auth,
    SET_USER_TYPE:(state,userType)=> state.userType = userType,
    SET_SELECTED_COURSE:(state,selectedCourse)=> state.selectedCourse = selectedCourse,
    SET_CURRENT_USER:(state,currentUser)=> state.currentUser = currentUser,
    SET_SELECTED_LESSON:(state,selectedLesson)=> state.selectedLesson = selectedLesson,
    SET_SELECTED_TASK:(state,selectedTask)=> state.selectedTask = selectedTask,
    SET_SELECTED_USER_TASK:(state,selectedUserTask)=> state.selectedUserTask = selectedUserTask,
    SET_VOICE_LIST:(state,voiceList)=> state.voiceList = voiceList,
    SET_SYNTH_VOICE:(state,synthVoice)=> state.synthVoice = synthVoice,
    SET_ENABLE_AUDIO:(state,enableAudio)=> state.enableAudio = enableAudio,
  },
  actions: {
    setAuth: ({commit},auth) => commit('SET_AUTH',auth),
    setUserType:({commit},userType) => commit('SET_USER_TYPE',userType),
    setSelectedCourse:({commit},selectedCourse) => commit('SET_SELECTED_COURSE',selectedCourse),
    setCurrentUser:({commit},currentUser) => commit('SET_CURRENT_USER',currentUser),
    setSelectedLesson:({commit},selectedLesson) => commit('SET_SELECTED_LESSON',selectedLesson),
    setSelectedTask:({commit},selectedTask)=> commit('SET_SELECTED_TASK',selectedTask),
    setSelectedUserTask:({commit},selectedUserTask)=> commit('SET_SELECTED_USER_TASK',selectedUserTask),
    setVoiceList:({commit},voiceList)=> commit('SET_VOICE_LIST',voiceList),
    setSynthVoice:({commit},synthVoice)=> commit('SET_SYNTH_VOICE',synthVoice),
    setEnableAudio:({commit},enableAudio)=> commit('SET_ENABLE_AUDIO',enableAudio)
  },
  modules: {
  },
  plugins: [vuexLocal.plugin],
})

export default store;