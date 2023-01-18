module Main exposing (..)

import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onCheck, onClick, onInput, onSubmit)


initPlayer : Int -> Player
initPlayer id =
    Player id "" False


type alias Player =
    { id : Int
    , name : String
    , isActive : Bool
    }

type alias Model =
    { players : List Player
    , newPlayer : Player
    }

type Msg
    = SetName String
    | AddPlayer
    | ModifyPlayer Int Bool
    | DeletePlayer Int


init : Model
init =
    { players = []
    , newPlayer = initPlayer 0
    }


update : Msg -> Model -> Model
update msg model =
    case msg of
        SetName name ->
            let 
                oldPlayer = model.newPlayer
                newPlayer = { oldPlayer | name = name}
            in
                { model | newPlayer = newPlayer }

        AddPlayer ->
            let 
                addedPlayer = model.newPlayer
                initialPlayer = initPlayer (addedPlayer.id + 1)
            in
            { 
                model | players = model.players ++ [addedPlayer] , 
                newPlayer = initialPlayer
            }

        DeletePlayer id ->
            let
                existingPlayers = List.filter (\player -> player.id /= id) model.players
            in
                { model | players = existingPlayers}

        ModifyPlayer id status ->
            let
                newPlayers = List.map (\p -> if p.id == id then { p | isActive = status} else p) model.players             
            in
                { model | players = newPlayers}


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
                        ]) model.players)       
        ]
    
    


main : Program () Model Msg
main =
    Browser.sandbox
        { init = init
        , view = view
        , update = update
        }
