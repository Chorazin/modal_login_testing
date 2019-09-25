<template>

  <div class='container spacer '>
    <div class='container no_guides' v-if='!current_user'><h5>PLEASE LOGIN TO VIEW CHARACTERS</h5></div>
    <ul class='collapsible visibility z-depth-0 guides border_styling' >
      <li v-for="char in display_chars" v-bind:key="char.id">
        <div class='collapsible-header grey lighten-4'>{{ char.char_name }}</div>
        <div class='collapsible-body white'>{{ char.char_description }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import firebase from 'firebase'
import db from '@/firebase/init_db.js'

export default {


  data() {
    return {
      display_chars: [      ],
      current_user: null
    }
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        this.current_user = user.displayName
        this.switch_visible(user)
      } else {
        this.current_user = null
        this.switch_visible(user)
      }
    })

    const ref = db.collection('characters')
    //set up real time observer on the database
    ref.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if(change.type == 'added' || 'removed'){
          let doc = change.doc
          this.display_chars.push({
            id: doc.id,
            char_name: doc.data().char_name,
            char_description: doc.data().char_description
          })
        }
      })
    })
  },

  methods: {
    switch_visible(user) {
      if(user) {
        document.querySelector('.visibility').style.visibility= 'visible';

      } else {
        console.log('no user');
        document.querySelector('.visibility').style.visibility= 'hidden';

      }

    }
  },

  mounted() {
    let items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);
    }


}
</script>


<style>
.spacer {
  margin-top: 40px;
}

.border_styling {
  border: none;
}

.visibility {
  visibility: hidden;
}

.no_guides {
  background-color: #ee6e73;
  width: 100%;
  color: white;
  padding-left: 20px;
  height: 50px;
  text-align: center;
  vertical-align: middle;
  display: block;
}
</style>
