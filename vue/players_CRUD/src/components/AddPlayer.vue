
<!-- 
  Student instructions to create this component:

  1. Create a form with an id of "submit-player" for submitting a new player. It emits an event called "add-player" with the name of the new player as a parameter when submitted.

  2. Inside the form: Create an input field with an id of "input-player" where the name of the new player should be added.
  Optionally Add a placeholder attribute for the input.

  3. Inside the form: Create a button with a class of "btn-add" that will submit the form when clicked.

  Hint: Remember to prevent the default behavior of the submit event.

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