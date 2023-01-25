<!-- 
  COPY AND PASTE YOUR CODE FROM THE PREVIOUS EXERCISE HERE. Also implement the following:

  1. Create a method for adding a new player. This method should handle the logic for adding a new player to the backend
  and updating the players list. This method should also reset the form only if the request was successful.
  This method should be called when the add player form is submitted.

  2. Create a method for deleting a player. This method should handle the logic for deleting a player from the backend and
  updating the players list. This method should be called when the delete button is clicked in the SelectedPlayer component.

  3. Create a method for updating a player. This method should handle the logic for updating a player in the backend and
  updating the players list. This method should be called when the update button is clicked in the SelectedPlayer component.
 -->


<template>
  <div>
    <RequestStatus v-bind:reqStatus="reqStatus"/>
    <AddPlayer @add-player="addPlayer"/>
    <ListPlayers v-bind:players="players" v-bind:getPlayer="getPlayer"/>
    <SelectedPlayer v-bind:player="player" @delete-player="deletePlayer" @put-player="updatePlayer"/>
  </div>
</template>

<script>
import AddPlayer from './components/AddPlayer.vue';
import ListPlayers from './components/ListPlayers.vue';
import SelectedPlayer from './components/SelectedPlayer.vue';
import RequestStatus from './components/RequestStatus.vue';

const REQ_STATUS = {
  loading: 'Loading...',
  success: 'Finished!',
  error: 'An error has occurred!!!'
};

const URL = 'http://localhost:3001'

export default {
  data() {
    return {
      players: [],
      player: "",
      reqStatus: REQ_STATUS["loading"]
    }
  },
  created() {
    this.fetchPlayers()
  },
  methods: {
    async fetchPlayers() {
      this.reqStatus = REQ_STATUS["loading"]
      try {
        const response = await fetch(URL + '/api/players/')
        const data = await response.json()
        this.players = data
        this.reqStatus = REQ_STATUS["success"]
      } catch (error) {
        this.reqStatus = REQ_STATUS["error"]
      }
    },
    async getPlayer(playerId) {
      this.reqStatus = REQ_STATUS["loading"]     
      try {
        const response = await fetch(URL + '/api/players/' + playerId)
        const data = await response.json()
        this.player = data
        this.reqStatus = REQ_STATUS["success"]
      } catch (error) {
        this.reqStatus = REQ_STATUS["error"]
      }
    },
    async addPlayer(name) {
      this.reqStatus = REQ_STATUS["loading"];
      try {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json"},
          body: JSON.stringify({
            name: name,
            isActive: true
          })
        }
        const response = await fetch(URL + '/api/players', requestOptions);
        if (response.status == 201) {
          const data = await response.json();
          this.players.push(data);
          this.reqStatus = REQ_STATUS["success"];
        } else {
          this.reqStatus = REQ_STATUS["error"];
        }
      } catch (error) {
        this.reqStatus = REQ_STATUS["error"];
      }
    },
    async deletePlayer(playerId) {
      this.reqStatus = REQ_STATUS["loading"];
      try {
        const requestOptions = {
          method: "DELETE"
        };
        const response = await fetch(URL + '/api/players/' + playerId, requestOptions);
        if (response.status == 200) {
          // Remove deleted player from local player list if deleting in db was successful
          this.players = this.players.filter(player => player.id != playerId);
          this.reqStatus = REQ_STATUS["success"];
        } else {
          this.reqStatus = REQ_STATUS["error"];
        }
      } catch (error) {
        this.reqStatus = REQ_STATUS["error"];
      }
    },
    async updatePlayer(playerData){
      this.reqStatus = REQ_STATUS["loading"];
      try {
        const requestOptions = {
          method: "PUT",
          headers: { "Content-Type": "application/json"},
          body: JSON.stringify({
            isActive: !playerData.isActive
          })
        }
        const response = await fetch(URL + '/api/players/' + playerData.id, requestOptions);
        if (response.status == 200) {
          const data = await response.json();
          // Update player data
          index = this.players.findIndex((pl => pl.id == data.id));
          this.players[index] = data;
          this.player = data;
          this.reqStatus = REQ_STATUS["success"];
        } else if (response.status == 204) {
          this.reqStatus = REQ_STATUS["loading"];
        } else {
          this.reqStatus = REQ_STATUS["error"];
        }
      } catch (error) {
        this.reqStatus = REQ_STATUS["error"];
      }
    }
  },
  components: {
    AddPlayer,
    ListPlayers,
    SelectedPlayer,
    RequestStatus
  },
};
</script>
