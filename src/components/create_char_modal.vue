<template>
  <div>
    <!-- CREATE CHAR MODAL MAKE COMPONENT-->
    <div id='modal-create' class='modal'>
      <div class='modal-content'>
        <h4>CHAR CREATION</h4><br />
        <form id='create-form' @submit.prevent='create_char'>
          <div class='input-field'>
            <input type='text' id='title' v-model='char_title' />
            <label for='login-email'>Char Name</label>
            <p v-if='char_feedback' class='red-text'>{{ this.char_feedback }}</p>
          </div>
          <div class='input-field'>
            <textarea id='content' class='materialize-textarea' v-model='char_description'></textarea>
            <label for='content'>Char Description</label>
            <p v-if='desc_feedback' class='red-text'>{{ this.desc_feedback }}</p>
          </div>
          <button class='btn red accent-2 z-depth-0 button_custom center'>Create</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import db from '@/firebase/init_db.js'

export default {

  name: 'create_char_modal',

  data() {
    return {
      char_title: null,
      char_description: null,
      char_feedback: null,
      desc_feedback: null,

      create_char() {
        //gui display warnings for non entered fields(yes I could of just added required)
        if(this.char_title) {
          this.char_feedback = null
          if(this.char_description) {
              this.desc_feedback = null
            //once both fields are entered proceed to add to database
            db.collection('characters').add({
              char_name: this.char_title,
              char_description: this.char_description
            }).then(() => {
              //clear form fields
              this.char_title = null
              this.char_description = null
              //fire confirmation modal, close after 1.5seconds
              let conf_modal = document.querySelector('#modal-confirmation')
              let conf_instance = M.Modal.init(conf_modal)
              conf_instance.open()
              setTimeout(function(){
                conf_instance.close()
              }, 1500)
            })
            //close create model
            let cre_modal = document.querySelector('#modal-create')
            let cre_instance = M.Modal.init(cre_modal)
            cre_instance.close()
          } else {
            this.desc_feedback = 'You must enter a description of your character'
          }
        } else {
          this.char_feedback = 'You must enter a character name'
        }


      }
    }
  }
}
</script>

<style>

</style>
