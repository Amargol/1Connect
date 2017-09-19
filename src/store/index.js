import Vue from 'vue'
import Vuex from 'vuex'
import * as Firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    user: null,
    rewards: [],
    masterObj: null
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setRewards (state, payload) {
      state.rewards = payload
    },
    setMaster (state, payload) {
      state.masterObj = payload
    }
  },
  actions: {
    signUserUp ({commit}, payload) {
      Firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            user.sendEmailVerification().catch(function (error) {
              console.log(error)
            })
            const newUser = {
              id: user.uid
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            console.log(error)
          }
        )
    },
    signUserIn ({commit}, payload) {
      Firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            const newUser = {
              id: user.uid
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            console.log(error)
          }
        )
    },
    signUserOut ({commit}) {
      Firebase.auth().signOut().then(function () {
        commit('setUser', null)
      }).catch(function (error) {
        console.log(error)
      })
    },
    updateFirebase (state, payload) {
      let ref = Firebase.database().ref()
      ref.child('users').child(state.getters.user.id.toString()).set({
        companyName: payload.companyName,
        accessKey: payload.accessKey,
        accessKeyNeeded: payload.accessKeyNeeded
      })
      let rewardsRef = ref.child('users').child(state.getters.user.id.toString()).child('rewards')
      for (let i = 0; i < payload.rewards.length; i++) {
        rewardsRef.push({
          costInPoints: payload.rewards[i][1].costInPoints,
          rewardName: payload.rewards[i][1].rewardName,
          imageURL: payload.rewards[i][1].imageURL,
          rewardDescription: payload.rewards[i][1].rewardDescription,
          rewardPhotoIncluded: payload.rewards[i][1].rewardPhotoIncluded,
          rewardDescriptionIncluded: payload.rewards[i][1].rewardDescriptionIncluded
        })
      }
    },
    populateMasterObj (state) {
      let ref = Firebase.database().ref()
      ref.child('users').child(state.getters.user.id.toString())
      .on('value', function (snapshot) {
        let tempMaster = null
        let result = []
        if (snapshot.val().rewards !== undefined) {
          console.log(snapshot.val())
          result = Object.keys(snapshot.val().rewards).map(function (key) {
            return [key, snapshot.val().rewards[key]]
          })
        }
        tempMaster = {
          accessKey: snapshot.val().accessKey,
          accessKeyNeeded: snapshot.val().accessKeyNeeded,
          companyName: snapshot.val().companyName,
          rewards: result
        }
        state.commit('setMaster', tempMaster)
      }, function (errorObject) {
        console.log(errorObject)
      })
    },
    getRewards ({commit}) {
      let ref = Firebase.database().ref()
      ref.child('users').child(store.getters.user.id.toString()).child('rewards')
      .on('value', function (snapshot) {
        let result = null
        if (snapshot.val() !== null) {
          result = Object.keys(snapshot.val()).map(function (key) {
            return [key, snapshot.val()[key]]
          })
        }
        commit('setRewards', result)
      }, function (errorObject) {
        console.log('The read failed: ' + errorObject.code)
      })
    },
    deleteReward (state, payload) {
      let ref = Firebase.database().ref()
      ref.child('users').child(store.getters.user.id.toString()).child('rewards').child(payload).set(null)
    }
  },
  getters: {
    user (state) {
      return state.user
    },
    rewards (state) {
      return state.rewards
    },
    masterObj (state) {
      return state.masterObj
    }
  }
})
