<script setup>
import { useDashboardStore } from "../store/testStore/dashboard";
import { onMounted, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
const dashboardStore = useDashboardStore();

let display = ref([]);

onMounted(async () => {
  // Login();
  await dashboardStore.getStandings().then(() => {
    dashboardStore.owners.map((group) => {
      let groupStandings = dashboardStore?.standings?.find(
        (x) => x.group == group.group
      );

      console.log("did it find the group s", groupStandings);

      var tempArray = [];

      for (let index = 0; index < group.teams.length; index++) {
        var temp = {
          owner: "",
          team: "",
          points: "",
          group: "",
          flag: "",
        };

        console.log("index 1", index);

        temp.owner = group.teams[index];
        temp.team = groupStandings?.teams[index].name_en;
        temp.points = groupStandings?.teams[index].pts;
        temp.flag = groupStandings?.teams[index].flag;
        temp.group = group.group;
        tempArray.push(temp);

        tempArray.sort((a, b) =>
          b.points < a.points ? -1 : b.points > a.points ? 1 : 0
        );
      }

      display.value.push(tempArray);
    });
  });

  console.log("display array, ", display);
});
</script>
<template>
  <q-page
    class="flex-center q-pa-lg"
    style="
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      column-gap: 10px;
    "
  >
    <q-card
      v-for="group in display"
      :key="group.group"
      style="background-color: rgba(219, 219, 219, 0.2)"
    >
      <q-list>
        <q-item
          v-for="team in group"
          :key="team"
          style="font-size: 18px; color: #000"
        >
          <q-item-section avatar>
            <q-img :src="team.flag" />
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ team.owner }}</q-item-label>
            <q-item-label caption>{{ team.team }}</q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-item-label>{{ team.points }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card>
  </q-page>
</template>
