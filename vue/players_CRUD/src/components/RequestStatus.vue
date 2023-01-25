<!-- 
  Copy paste your code from the RequestStatus.vue file here from the previous exercise
 -->


 <template>
  <div>
    <h3>Request status</h3>
    <div id="request-status"> {{reqStatus}} </div>
  </div>
</template>

<script>
export default {
  props: ['reqStatus']
};
</script>

<style scoped>
#request-status {
  content: " ";
  margin: var(--main-margin);
  padding: 20px;
  /* height: 40px; */
  background-color: var(--color-background-soft);
  border: 2px solid var(--color-background-mute);
}
</style>