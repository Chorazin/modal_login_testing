<template>
  <div class='navbar'>
    <nav>
    <div class="container nav-wrapper">
      <a href="#"><img src='../assets/wings_v001.jpg' height='64px' class='left'>Fantasy Characters</a>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li class='logged_in'>
          <a href="#" class='modal-trigger' v-if='current_user' data-target='modal-account'>Account</a>
        </li>
        <li class='logged_in'>
          <a href="#" id='logout' v-if='current_user' v-on:click='logout'>Logout</a>
        </li>
        <li class='logged_in'>
          <a href="#" class='modal-trigger' data-target='modal-create' v-if='current_user'>Create Char</a>
        </li>
        <li class='logged_out'>
          <a href="#" class='modal-trigger' data-target='modal-login' v-if='!current_user'>Login</a>
        </li>
        <li class='logged_out'>
          <a href="#" class='modal-trigger' data-target='modal-signup' v-if='!current_user'>Sign up</a>
        </li>
        <li v-if='current_user'><a> welcome: {{ current_user }} </a></li>
      </ul>
    </div>
    </nav>
    <!-- VUE COMPONENT MODALS -->
    <sign_up_modal v-on:update_user='update_user_cred'/>
    <login_modal v-on:update_user='update_user_cred'/>
    <account_modal v-bind:current_user='current_user'/>
    <create_char_modal />
    <confirmation_modal />
  </div>
</template>

<script>
import firebase from 'firebase'
import sign_up_modal from './sign_up_modal.vue'
import login_modal from './login_modal.vue'
import account_modal from './account_modal.vue'
import create_char_modal from './create_char_modal.vue'
import confirmation_modal from './confirmation_modal'

export default {
  name: 'navbar_top',

  data() {
    return {
      current_user: null,
      current_user_email: null
    }
  },

  methods: {
    logout() {
      firebase.auth().signOut().then(() => {
        this.current_user = null
      })
    },

    update_user_cred(user) {
      this.current_user = user,
      this.current_user_email = user
    }
  },

  components: {
    sign_up_modal,
    login_modal,
    account_modal,
    create_char_modal,
    confirmation_modal
  },

  created() {
    if(firebase.auth().currentUser){
      //we have a user
      this.current_user = firebase.auth().currentUser.displayName
    } else {
      this.current_user = null
    }

  },

  mounted() {
    // initialize materialize elements
      let modals = document.querySelectorAll('.modal');
      M.Modal.init(modals);




  }


}
</script>


<style>



</style>
