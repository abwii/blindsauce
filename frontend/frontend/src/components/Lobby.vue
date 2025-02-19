<script setup lang="ts">
import { ref, defineEmits } from "vue";

const roomCode = ref("");
const name = ref("");
const emit = defineEmits(["joinRoom"]);

const joinRoom = () => {
  if (roomCode.value && name.value) {
    emit("joinRoom", roomCode.value, name.value);
  }
};
</script>

<template>
  <div>
    <h2>Rejoindre une Partie</h2>
    <input v-model="roomCode" placeholder="Code de la Room" />
    <input v-model="name" placeholder="Votre pseudo" />
    <button @click="joinRoom">Rejoindre</button>
  </div>
</template>
