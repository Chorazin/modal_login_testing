<template>
  <div>
    <div>
      <!-- CONFIRMATION MODAL COMPONENT-->
      <div id='modal-confirmation' class='modal size_modifier'>
        <div class='modal-content center-align'>
          <p>Your Character has been added</p><br />
          <div class='account-details'></div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>

export default {
  name: 'confirmation_modal',

  data() {
    return {

    }
  }
}


</script>


<style>
.size_modifier {
  width: 25%;
  height: 10%;
  overflow: hidden;
}
</style>
