<template>
  <div>
    <!-- ACCOUNT MODAL MAKE COMPONENT-->
    <div id='modal-account' class='modal'>
      <div class='modal-content center-align'>
        <h4>ACCOUNT DETAILS</h4><br />
        <div class='account-details'>username: {{this.current_user}}</div>
        <div class='account-details'>email: {{this.user_email}}</div>
        <div class='account-details'>bio: {{this.bio}} </div>
        <div class='account-details green lighten-2' v-show='admin'>admin</div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import db from '@/firebase/init_db.js'

export default {


  name: 'account_modal',

  props: ['current_user'],

  data() {
    return {
      user_email: null,
      bio: null,
      admin: null
    }
  },

  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        firebase.auth().currentUser.getIdTokenResult().then((idTokenResult) => {
          if(idTokenResult.claims.admin) {
            this.admin = true
          } else {
            //placeholder
          }
        })

        this.user_email = firebase.auth().currentUser.email
        //search for the document with the id equal to the user id and grab the bio
        const user_ref = firebase.auth().currentUser.uid

        db.collection('users').where('user_id', '==', user_ref).get().then(snapshot => {
          snapshot.forEach(doc => {
          //set the bio for the account info
          this.bio = doc.data().bio
          })
        })
      } else {
        this.user_email = null
        this.bio = null
        this.admin = false
      }
    })


  }
}
</script>


<style>

</style>
