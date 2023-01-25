<!-- 
  Copy paste your code from the ListPlayer.vue file here from the previous exercise
 -->

 <template>
  <li v-bind:id="'player-' + player.id">
    <a href="#" @click="$emit('player-clicked', player.id)">{{ player.name }}</a>
  </li>
</template>

<script>
export default {
  props: ['player']
};
</script>

<style scoped>
  li {

  color: var(--color-text-mute);
  background-color: var(--color-background-mute);
  margin: 5px;

}

.flex {
  display: inline-flex;
  width: 100%;
  align-items: stretch;
  justify-content: space-between;
}

a {
  border: 2px solid var(--color-background-mute);
  padding: 15px;
  font-size: 1.2rem;
  display: blox;
  text-decoration: none;
  color: var(--color-standard-dark);
  flex: 1 1 0;
  transition: 0.4s;
}

a:hover {
  background-color: var(--color-background-soft);
  border: 2px solid;
}
</style>