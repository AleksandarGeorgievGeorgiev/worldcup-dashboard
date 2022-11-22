import state from "./state"

export function SetStandings(state, payload) {
  console.log("here we are, ", payload)
  state.standings = payload
}
