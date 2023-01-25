<!-- 
  Copy paste your code from the AddPlayer.vue file here from the previous exercise
-->
<template>
  <div>

    <h3>
      Add Player
    </h3>
    <form id="submit-player" @submit="submitForm" @submit.prevent="signInButtonPressed">
      <input id="input-player" type="text" v-model="inputName" placeholder="Write Name Here!">
      <input class="btn-add" type="submit" value="Add Player!">
    </form>

  </div>
</template>

<script>
export default {
  data() {
    return {
      inputName: ""
    }
  },
  methods: {
    submitForm() {
      this.$emit('add-player', this.inputName);
      this.inputName = "";
    }
  }
};
</script>

<style scoped>

#submit-player {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
#input-player {
  flex-grow: 1;
  padding: 0.5em;
  font-size: 1em;
  margin-bottom: 10px;
  border-radius: 0.25em;
  color: var(--color-text-mute);
  background-color: var(--color-background-mute);
  border: 1px solid var(--color-background);
}

#input-player:focus {
  border: 1px solid var(--color-background-mute);
  outline: none;
}


.btn-add {
  padding: 0.5em 1em;
  border: none;
  width: fit-content;
  border-radius: 0.25em;
  background-color: var(--color-button-add);
  color: var(--color-text-button-add);
  cursor: pointer;
}

.btn-add:hover {
  background-color: var(--color-button-add-hover);
}
</style>