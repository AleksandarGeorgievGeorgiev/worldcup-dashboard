import { defineStore } from 'pinia'
import axios from 'axios';

export const useDashboardStore = defineStore('dashboard', {
  state: () => ({
    standings: null,
    owners: [
      {
        group: "A",
        teams: ["Georgette",
          "Jop",
          "Sjef",
          "Godfriet"]
      },
      {
        group: "B",
        teams: ["Bianca",
          "Paul",
          "Chris",
          "Luigi"]
      },
      {
        group: "C", teams: ["Angelika",
          "Empty",
          "Stefan",
          "Michel"]
      },
      {
        group: "D", teams: ["Coby",
          "Hans",
          "Leon",
          "Cas"]
      },
      {
        group: "E", teams: ["Anton",
          "Bram",
          "Marene",
          "Sven"]
      },
      {
        group: "F", teams: ["Job",
          "Andre",
          "Alek",
          "Empty"]
      },
      {
        group: "G", teams: ["Chi",
          "Ryan",
          "Indy",
          "Steven"]
      },
      {
        group: "H", teams: ["Ilker",
          "Fabio",
          "Yordan",
          "Krisz"]
      }
    ]
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    login() {
      axios.defaults.headers = { "Access-Control-Allow-Headers": "*" };


      axios.post(`/api/v1/user/login`, {
        "email": "alekvd77@gmail.com",
        "password": "FuckYou0225",
      }).then((response) => {
        console.log("token", response, JSON.stringify(response.data.token))
        localStorage.setItem("token", (response.data.data.token))
      })
    },
    async getStandings() {
      axios.defaults.headers = { "Access-Control-Allow-Headers": "*", "Authorization": `Bearer ${localStorage.getItem("token")}` };

      return new Promise((resolve) => {
        axios.get(`/api/v1/standings`).then((response) => {
          console.log("standings", response);
          this.standings = response.data.data;
          resolve(true);
        })
      })
    }
  },
})
