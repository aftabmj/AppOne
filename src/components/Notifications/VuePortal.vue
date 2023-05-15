<template>
  <div class="portals" @login-failure="showNotification">
    <!-- <button @click="showNotification">Trigger Notification!</button> -->
    <!-- <div @login-failure="showNotification">failed</div> -->
    <teleport to="#portal-target">
      <div class="notification" v-if="isOpen">
        <modal-content
          @close-popup="isOpen = false"
          header="headerTxt"
          msg="msgTxt"
        />
      </div>
    </teleport>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import ModalContent from "./ModalContent.vue";

let closePopup;
const isOpen = ref(false);
const props = defineProps({
  headerTxt: {
    type: String,
    default: ""
  },
  msgTxt: {
    type: String,
    default: ""
  }
});

// onMounted(() => {
//   watch(
//     () => props.headerTxt,
//     newVal => {
//       if (props.headerTxt !== "") {
//         showNotification();
//       }
//     }
//   );
// });

const showNotification = () => {
  isOpen.value = true;

  clearTimeout(closePopup);

  closePopup = setTimeout(() => {
    isOpen.value = false;
  }, 2000);
};

// return {
//   isOpen,
//   showNotification
// }
</script>

<style scoped>
.notification {
  font-family: myriad-pro, sans-serif;
  position: fixed;
  bottom: 20px;
  left: 20px;
  width: 300px;
  padding: 30px;
  background-color: #f51;
}
</style>
