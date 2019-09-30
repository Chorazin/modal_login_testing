<template>
  <div>
    <!-- SIGN UP MODAL MAKE COMPONENT -->
    <div id='modal-signup' class='modal'>
      <div class='modal-content'>
        <h4>SIGN UP</h4><br />
        <form id='signup-form' @submit.prevent='sign_up'>
          <div class='input-field'>
            <input type='email' id='signup-email' v-model='signup_email'/>
            <label for='signup-email'>Email Address</label>
          </div>

          <div class='input-field'>
            <input type='password' id='signup-password' v-model='signup_password'/>
            <label for='signup-password'>Password</label>
          </div>

          <div class='input-field'>
            <input type='text' id='signup-username' v-model='signup_username'/>
            <label for='signup-username'>Username</label>
          </div>

          <div class='input-field'>
            <input type='text' id='bio' v-model='bio'/>
            <label for='signup-username'>one line bio</label>
          </div>

          <p class='red-text center' v-if='feedback'>{{ feedback }}</p>
          <button class='btn red accent-2 z-depth-0 button_custom center'>Sign Up</button>
        </form>
      </div>
    </div>
  </div>
</template>


<script>
import firebase from 'firebase'
import db from '@/firebase/init_db.js'


export default {
  name: 'sign_up_modal',

  data() {
    return {
      signup_email: null,
      signup_password: null,
      signup_username: null,
      feedback: null,
      slug: null,
      bio: null

    }
  },

  methods: {
    sign_up() {
      //check if all fields have been entered
      if(this.signup_email && this.signup_password && this.signup_username) {
        //check to see if the username exists, using username as document ID as they have to be unique

        let ref = db.collection('users').doc(this.signup_username)
        ref.get().then(doc => {
          if(doc.exists) {
            //username already exists, warn user
            this.feedback='This username already exists'

          } else {
            this.feedback = 'this alias is free to use'
            //continue with signup if username is unique
            firebase.auth().createUserWithEmailAndPassword(this.signup_email, this.signup_password).then((cred) => {
              //make a user record in the database
              ref.set({
                email: this.signup_email,
                password: this.signup_password,
                user_id: cred.user.uid,
                bio: this.bio
              })
              //set the display name of the user auth token to be the sign up username
                cred.user.updateProfile({
                displayName: this.signup_username
              }).then(() => {
                //pass the current user back to the parent component on an emit event
                this.$emit('update_user', firebase.auth().currentUser.displayName)
                //reset form fields and close the modal
                this.signup_email = null
                this.signup_password = null
                this.signup_username = null
                let sig_modal = document.querySelector('#modal-signup')
                M.Modal.init(sig_modal).close()
              })

            }).catch(err => {
              this.feedback = err.message
            })
          }
        })
      } else {
        this.feedback = 'Yo you must fill in the fields'
      }
    }


  }
}
</script>


<style>
.button_custom {
  width: 100%;
  height: 50px;
}
</style>
