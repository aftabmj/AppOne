<!-- src/components/MyComponent.vue -->
<template>
  <v-card class="mx-auto" max-width="400" tile>
    <v-list dense>
      <!-- <v-list-item-group> -->
      <v-list-item v-for="item in items" :key="item.id" link>
        <!-- <v-list-item
        v-for="item in items"
        :key="item.id"
        link
        @click="() => (selected = item.id)"
      > -->
        <!-- <v-list-item-content> -->
        <v-list-item-title>{{ item.Name }}</v-list-item-title>
        <!-- </v-list-item-content> -->

        <!-- <v-list-item-action>
          <v-checkbox
            :input-value="selected === item.id"
            color="primary"
            hide-details
          ></v-checkbox>
        </v-list-item-action> -->
      </v-list-item>
    </v-list>
    <!-- </v-list-item-group> -->
  </v-card>

  <!-- <div>
    this is test firestore.. items:
    <ul>
      <li v-for="item in items" :key="item.id">{{ item.name }}</li>
    </ul>
  </div> -->
</template>

<script setup>
import { useFirestore, useCollection } from "vuefire";
import { collection } from "firebase/firestore";
const db = useFirestore();
const items = useCollection(collection(db, "items"));

// const items = ref([]);
// const firestore = useFirestore();
// const itemsCollection = collection(firestore, "items");
// const itemsQuery = query(itemsCollection);

// onSnapshot(itemsQuery, snapshot => {
//   items.value = snapshot.docs.map(doc => ({
//     id: doc.id,
//     ...doc.data()
//   }));
// });

// return { items };
</script>
