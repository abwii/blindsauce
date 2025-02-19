<script setup lang="ts">
import { ref } from 'vue';
import Lobby from './components/Lobby.vue';
import Chat from './components/Chat.vue';

const room = ref<string | null>(null);
const playerName = ref<string>("");
</script>

<template>
  <div>
    <Lobby v-if="!room" @joinRoom="(r, name) => { room = r; playerName = name; }" />
    <Chat v-else :room="room" :playerName="playerName" />
  </div>
</template>
