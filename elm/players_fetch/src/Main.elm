-- Fetch players from end point on load
-- Update the id from the fetched players
-- Add player to the end of the list


module Main exposing (..)

import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onCheck, onClick, onInput, onSubmit)
import Http
import Json.Decode as Decode exposing (Decoder, field, map3)


type alias Player =
    { id : Int
    , name : String
    , isActive : Bool
    }


type alias Model =
    { players : List Player
    , newPlayer : Player
    , reqStatus : String
    }


type Msg
    = SetName String
    | ModifyPlayer Int Bool
    | AddPlayer
    | DeletePlayer Int
    | FetchPlayers (Result Http.Error (List Player))


playerDecoder : Decoder Player
playerDecoder =
    map3 Player (field "id" Decode.int) (field "name" Decode.string) (field "isActive" Decode.bool)


playersDecoder : Decoder (List Player)
playersDecoder =
    Decode.list playerDecoder


fetchPlayers : String -> Cmd Msg
fetchPlayers url =
    Http.get {url = url, expect = Http.expectJson FetchPlayers playersDecoder}


listLast : List a -> Maybe a
listLast list =
    List.head <| List.reverse list


initPlayer : Int -> Player
initPlayer id =
    Player id "" False


init : () -> ( Model, Cmd Msg )
init _ =
    ( { 
        players = []
      , newPlayer = initPlayer 0
      , reqStatus = "Loading..."
    }
    , fetchPlayers "http://localhost:3001/api/players/"
    )


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        SetName name ->
            let 
                oldPlayer = model.newPlayer
                newPlayer = { oldPlayer | name = name}
            in
                ({ model | newPlayer = newPlayer }, Cmd.none)

        AddPlayer ->
            let 
                addedPlayer = model.newPlayer
                initialPlayer = initPlayer (addedPlayer.id + 1)
            in
            ({ 
                model | players = model.players ++ [addedPlayer] , 
                newPlayer = initialPlayer
            }, Cmd.none)

        DeletePlayer id ->
            let
                existingPlayers = List.filter (\player -> player.id /= id) model.players
            in
                ({ model | players = existingPlayers}, Cmd.none)

        ModifyPlayer id status ->
            let
                newPlayers = List.map (\p -> if p.id == id then { p | isActive = status} else p) model.players             
            in
                ({ model | players = newPlayers}, Cmd.none)

        FetchPlayers data ->
            case data of
                Ok players -> 
                    let
                        playersAmount = List.length players
                        initialPlayer = initPlayer (playersAmount + 1)
                    in
                    ({ 
                        model | players = players, 
                        newPlayer = initialPlayer,
                        reqStatus = ""
                    }, Cmd.none)
                Err error ->
                    ( {model | reqStatus = "An error has occurred!!!"}, Cmd.none)
            


view : Model -> Html Msg
view model =
    div [] 
        [ h1 [] [ text "Elm Exercise: Players CRUD" ] ,

          Html.form [id "submit-player", onSubmit AddPlayer]
          [ 
          input [id "input-player", type_ "text", value model.newPlayer.name, placeholder "Enter new player", onInput SetName] [] ,
          button [id "btn-add" , type_ "submit"] [ text "Add" ]
          ] ,

          ol [id "players-list"]
            (List.map (\player -> li [id ("player-" ++ String.fromInt player.id)]
                        [
                        div [class "player-name"] [text player.name] ,
                            label [class "player-status"] [input [class "player-status", type_ "checkbox", checked player.isActive, 
                            onCheck (ModifyPlayer player.id)] [text "active"], span [class "checkmark"] [] ]
                        , button [class "btn-delete", onClick (DeletePlayer player.id)] [text "Delete"]
                        ]) model.players),
          div [id "request-status"] [text model.reqStatus]       
        ]


main : Program () Model Msg
main =
    Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = \_ -> Sub.none
        }
