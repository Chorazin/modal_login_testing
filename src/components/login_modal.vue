<template>
  <div>
    <!-- LOGIN MODAL MAKE COMPONENT -->
    <div id='modal-login' class='modal'>
      <div class='modal-content'>
        <h4>LOGIN</h4><br />
        <form id='login-form' @submit.prevent='login'>
          <div class='input-field'>
            <input type='email' id='login-email' v-model='login_email'/>
            <label for='login-email'>Email Address</label>
            <p v-if='feedback' class='red-text center'>{{ feedback }} </p>
          </div>

          <div class='input-field'>
            <input type='password' id='login-password' v-model='login_password' />
            <label for='login-password'>Password</label>
            <p v-if='feedback' class='red-text center'>{{ feedback }} </p>
            <button class='btn red accent-2 z-depth-0 button_custom center'>LOGIN</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'login_modal',

  data() {
    return {
      login_email: null,
      login_password: null,
      feedback: null
    }
  },

  methods: {
    login() {
      if(this.login_email) {
        if(this.login_password) {
          firebase.auth().signInWithEmailAndPassword(this.login_email, this.login_password).then((cred) => {
           //pass the current user back to the parent component on an emit event
           this.$emit('update_user', firebase.auth().currentUser.displayName)
           //clear fields and close the modal in here boiz
           this.login_email = null
           this.login_password = null
           let log_modal = document.querySelector('#modal-login')
           M.Modal.init(log_modal).close()
          }).catch(err => {
            this.feedback = err.message
          })
          this.feedback = null
        } else {
        this.feedback = 'please enter an password'
        }
      } else {
        this.feedback = 'please enter an email'
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
