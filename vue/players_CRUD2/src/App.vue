<!-- 
  COPY AND PASTE THE CODE FROM THE PREVIOUS EXERCISE, BUT:
  - Beware, the template is different: AuthUser is now a child of the root div element. When copy-pasting the logic to
  the new template, make sure to add the AuthUser component back in. 
  - You are no longer automatically fetching the players every time the App is rendered. Instead, you should only
  fetch the players when the user is logged in successfully.

  What is the function of the AuthUser component in the big picture?
  - Depending on the state of the AuthUser component, the other components should be displayed or hidden
  (except for the RequestStatus component, which is always visible). If the user is logged in, the AddPlayer, ListPlayers,
  and SelectedPlayer components should be displayed. If the user is not logged in, only the AuthUser component and the
  RequestStatus component should be displayed.

  1. Inside the root div element, give the AuthUser the appropriate props and event listeners. It should emit the
  "login", "register", and "logout" events. You need to give it the "isLoggedIn" prop, which is used to determine the
  state of the AuthUser component. If you removed the AuthUser componenet because you overwrote the whole template with
  the new one, remember to add it back in.
---------------------
  2. Create a method for registering a user when the AuthUser component emits the "register" event. This method should
  handle the logic for registering a user. After a successful registration, save the user's username and password into
  the App's state. 
 
  The backend uses the HTTP Basic auth, which means that the username and password as sent in base64 encoded format in
  the Authorization header upon every request except for the registration request. 

  The header contents should be of the following format: "Basic <base64 encoded username:password>". The username and
    password should be separated by a colon. The username and password should be base64 encoded. You can use the btoa()
    function to encode the username and password. For example, if the username is "user" and the password is "password",
    the header could be generated with the following code: `Basic ${window.btoa(`user:password`)}`; 

  The backend will respond with 401 if the Authorization header is missing, and with a status of 403 if the credentials
  are invalid. 
--------------------------
  After a succesful registration, the app should attempt to fetch players from the database. If it fails to fetch the
  players, then the user should stay logged out. If it succeeds, the user should be logged in and the app state should
  be updated accordingly and the players list should be displayed. Notice that separate login is not required after a
  successful registration, because the user is already logged in.
  
  3. Create a method for logging in when the AuthUser component emits the "login" event. This method should handle the
  logic for logging in a user. As described earlier, the backend does not have a separate login endpoint. Instead, the
  app should try to fetch players from the database with the given credentials using Basic auth. If the request is
  successful, the user is logged in and the app state should be updated accordingly.

  4. Create a method for logging out when the AuthUser component emits the "logout" event. This method should handle
  the logic for logging out a user. This method should be called when the logout event is emitted from the AuthUser
  component. When the user logs out, the application should be reset to its initial state (ergo, remove all data that
  was fetched from the database)

  HINT: Remember to add the Authorization header to every request except the user registration. 

 -->

 <template>
  <div>
    <AuthUser v-bind:isLoggedIn="isLoggedIn" @login="login" @register="register" @logout="logout" v-if="!isLoggedIn"/>
    <RequestStatus v-bind:reqStatus="reqStatus"/>
    <AddPlayer @add-player="addPlayer" v-if="isLoggedIn"/>
    <ListPlayers v-bind:players="players" v-bind:getPlayer="getPlayer" v-if="isLoggedIn"/>
    <SelectedPlayer v-bind:player="player" @delete-player="deletePlayer" @put-player="updatePlayer" v-if="isLoggedIn"/>
  </div>
</template>

<script>
import AddPlayer from './components/AddPlayer.vue';
import ListPlayers from './components/ListPlayers.vue';
import SelectedPlayer from './components/SelectedPlayer.vue';
import RequestStatus from './components/RequestStatus.vue';
import AuthUser from './components/AuthUser.vue';

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
      reqStatus: "",
      isLoggedIn: false,
      username: "",
      password: ""
    }
  },
  created() {
    this.register("admin2", "secret2");
    //this.fetchPlayers();
  },
  methods: {
    async fetchPlayers() {
      this.reqStatus = REQ_STATUS["loading"]
      let credentials = this.username + ':' + this.password;
      try {
        const requestOptions = {
          method: "GET",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Basic ${window.btoa(credentials)}`
          }
        };
        const response = await fetch(URL + '/api/players/', requestOptions);
        const data = await response.json();
        this.players = data;
        this.reqStatus = REQ_STATUS["success"];
      } catch (error) {
        this.reqStatus = REQ_STATUS["error"];
      }
    },
    async getPlayer(playerId) {
      this.reqStatus = REQ_STATUS["loading"];
      let credentials = this.username + ':' + this.password;     
      try {
        const requestOptions = {
          method: "GET",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Basic ${window.btoa(credentials)}`
          }
        };
        const response = await fetch(URL + '/api/players/' + playerId, requestOptions);
        const data = await response.json();
        this.player = data;
        this.reqStatus = REQ_STATUS["success"];
      } catch (error) {
        this.reqStatus = REQ_STATUS["error"];
      }
    },
    async addPlayer(name) {
      this.reqStatus = REQ_STATUS["loading"];
      let credentials = this.username + ':' + this.password;
      try {
        const requestOptions = {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Basic ${window.btoa(credentials)}`
          },
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
      let credentials = this.username + ':' + this.password;
      try {
        const requestOptions = {
          method: "DELETE",
          headers: {
            "Authorization": `Basic ${window.btoa(credentials)}`
          }
        };
        const response = await fetch(URL + '/api/players/' + playerId, requestOptions);
        if (response.status == 200 || response.status == 204) {
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
      let credentials = this.username + ':' + this.password;
      try {
        const requestOptions = {
          method: "PUT",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Basic ${window.btoa(`admin:secret`)}`
          },
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
    },
    async register(username, password) {
      this.reqStatus = REQ_STATUS["loading"];
      try {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json"},
          body: JSON.stringify({
            username: username,
            password: password
          })
        };
        const response = await fetch(URL + '/api/users', requestOptions);
        if (response.status == 201) {
          const data = await response.json();
          this.username = data.username;
          this.password = password;
          // if registration success, fetch players and update state
          this.fetchPlayers();
          this.isLoggedIn = true;

          this.reqStatus = REQ_STATUS["success"];
        } else {
          this.reqStatus = REQ_STATUS["error"];
        }
      } catch (error) {
        this.reqStatus = REQ_STATUS["error"];
      }
    }
  },
  components: {
    AuthUser,
    AddPlayer,
    ListPlayers,
    SelectedPlayer,
    RequestStatus
  },
};
</script>