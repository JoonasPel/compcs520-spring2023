
<!-- 
  Displays the selected player. 

  Create an element with an id attribute set to "selected-player", and inside it create two more elements,
  one with an id attribute set to "player-name" and another with an id attribute set to "player-status". You can use div elements. 

  Display the value of the name property of the "player" prop inside the element with the id of "player-name" 

  Display the value of the isActive property of the "player" prop inside the element with the id of "player-status".
  If the value of the isActive property is true, display the text "active". If the value of the isActive property is false,
  display the text "inactive".

  Use template logic to check if the "player" prop is null or not. If it is null or undefined, don't render the component.
 -->

 <template>
  <div>
    <h3>Selected Player</h3>
    <div id="selected-player" v-if="player">
      <div id="player-name">{{ player.name }}</div>

      <div id="player-status" v-if="player.isActive"> active </div>
      <div id="player-status" v-else-if="!player.isActive"> inactive </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['player']
};
</script>




<style scoped>
#selected-player {
  margin: var(--main-margin);
  padding: 20px;
  background-color: var(--color-background-soft);
  border: 2px solid var(--color-background-mute);
  display:flex;
  flex-direction: row;
  justify-content: space-between;
}

.btn-delete {
  background-color: var(--color-button-delete);
  color: var(--color-text-button-delete);
  border: none;
  border-radius: 0.25em;
  padding: 0.5em 1em;
  cursor: pointer;
}

.btn-delete:hover {
  background-color: var(--color-button-delete-hover);
}

label {
  display: block;
  position: relative;
  padding-right: 10px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  margin-right: 35px;
}

input[ type="checkbox"]{
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}


.checkmark {
  position: absolute;
  top: 10;
  left: 100%;
  height: 25px;
  width: 25px;
  background-color: var(--color-checkmark);
}

/* On mouse-over */
label:hover input ~ .checkmark {
  background-color: var(--color-checkmark-hover-bg);
}

/* When the checkbox is checked*/
label input:checked ~ .checkmark {
  background-color: var(--color-standard-basic);
}
/* When the user hovers mouse over a checked checkbox */
label:hover input:checked ~ .checkmark {
  background-color: var(--color-checkmark-hover-bg);
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
label input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */

label .checkmark:after {
  left: 9px;
  top: 5px;
  width: 5px;
  height: 10px;
  border: solid var(--color-checkmark-checked-sign);
  border-width: 0 2px 4px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}

.btn-update {
  background-color: var(--color-button-update);
  color: var(--color-text-button-update);
  border: none;
  border-radius: 0.25em;
  padding: 0.5em 1em;
  cursor: pointer;
}

.btn-update:hover {
  background-color: var(--color-button-update-hover);
}

/* btn-update when inactive */
.btn-update:disabled {
  background-color: var(--color-button-update-inactive);
  color: var(--color-text-button-update-inactive);
  cursor: not-allowed;
}
</style>