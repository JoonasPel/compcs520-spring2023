<!-- 
  Student instructions:

  1. Create an element with an id attribute set to "request-status" and display the value of the prop named "reqStatus" inside it.

  2. In the script section, define the component's props by adding the "reqStatus" property in the props object.
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