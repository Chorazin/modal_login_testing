<template>
  <div class='navbar'>
    <nav>
    <div class="container nav-wrapper">
      <a href="#"><img src='../assets/wings_v001.jpg' height='64px' class='left'>Fantasy Characters</a>
      <a href="#" data-target="mobile-demo" class="sidenav-trigger right"><i class="material-icons">menu</i></a>
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

    <!--SLID IN MENU -->
    <ul class="sidenav" id="mobile-demo">
      <li><a href="#" class='modal-trigger' v-if='current_user' data-target='modal-account'>Account</a</li>
      <li><a href="#" id='logout' v-if='current_user' v-on:click='logout'>Logout</a></li>
      <li><a href="#" class='modal-trigger' data-target='modal-create' v-if='current_user'>Create Char</a></li>
      <li><a href="#" class='modal-trigger' data-target='modal-login' v-if='!current_user'>Login</a></li>
      <li><a href="#" class='modal-trigger' data-target='modal-signup' v-if='!current_user'>Sign up</a></li>
    </ul>

    <!--ADMIN ACTIONS -->
    <form class='center-align admin-actions' v-show='is_admin' @submit.prevent='make_admin'>
      <input type='email' placeholder="User Email" id='admin-email' v-model='admin_form' required />
      <button class='btn-small yellow darken-2 z-depth-0'>Make Admin</button>
    </form>

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
import db from '@/firebase/init_db.js'
import functions from 'firebase/functions'
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
      current_user_email: null,
      admin_form: '',
      is_admin: null
    }
  },

  methods: {
    logout() {
      firebase.auth().signOut().then(() => {
        this.current_user = null
        this.is_admin = null
      })
    },
    //add admin cloud function
    make_admin() {
      const send_email = firebase.functions().httpsCallable('add_admin_role')

      send_email({
        email: this.admin_form
      }).then((result) => {

        this.admin_form = ''
      })
    },

    update_user_cred(user) {
      this.current_user = user.displayName
      //grab email from user object as I may want to use it later
      this.current_user_email = user.email
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
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        //we have an active user logged in
        this.current_user = user.displayName
        //grab the token and check for admin status
        firebase.auth().currentUser.getIdTokenResult().then((idTokenResult) => {
          if(idTokenResult.claims.admin) {
            this.is_admin = true
          } else {
            //placeholder
          }
        })
      } else {
        //no active user logged in
        this.current_user = null
        this.is_admin = false
      }
    })

  },

  mounted() {
    // initialize materialize elements
      let modals = document.querySelectorAll('.modal');
      M.Modal.init(modals);

      let elems = document.querySelectorAll('.sidenav');
      let instances = M.Sidenav.init(elems);

  }


}
</script>


<style>
.admin-actions {
  margin: 40px auto;
  max-width: 300px;
}

nav {
  min-height: 70px;
}

</style>
