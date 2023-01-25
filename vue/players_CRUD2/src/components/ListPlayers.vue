<!-- 
  Copy paste your code from the ListPlayers.vue file here from the previous exercise
 -->

 <template>
  <div>
    <h2>List of players</h2>
    <ul id="players-list">
      <li v-for="player in players">
        <ListPlayer v-bind:player="player" @player-clicked="getPlayer"/>
      </li>
    </ul>
  </div>
</template>

<script>
import ListPlayer from './ListPlayer.vue';

export default {
  props: ['players', 'getPlayer'],
  components: {
    ListPlayer
  }
};
</script>

<style scoped>
#players-list {
  list-style: none;
  margin: var(--main-margin);
  padding: 20px;
  background-color: var(--color-background-soft);
}


</style>