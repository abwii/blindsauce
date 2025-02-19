<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { io } from "socket.io-client";

const props = defineProps<{ room: string; playerName: string }>();
const socket = io("http://localhost:4000"); // Remplace avec ton URL Render plus tard
const players = ref<{ name: string }[]>([]);
const message = ref("");
const messages = ref<string[]>([]);

onMounted(() => {
  socket.emit("joinRoom", props.room, props.playerName);

  socket.on("updatePlayers", (playerList) => {
    players.value = playerList;
  });

  socket.on("receiveMessage", (msg) => {
    messages.value.push(msg);
  });
});

onUnmounted(() => {
  socket.disconnect();
});

const sendMessage = () => {
  if (message.value) {
    socket.emit("sendMessage", props.room, `${props.playerName}: ${message.value}`);
    message.value = "";
  }
};
</script>

<template>
  <div>
    <img src="https://ih1.redbubble.net/image.4769819458.0907/raf,360x360,075,t,fafafa:ca443f4786.jpg" alt="Pou" />
    <h2>Room: {{ room }}</h2>
    <h3>Joueurs:</h3>
    <ul>
      <li v-for="(p, index) in players" :key="index">{{ p.name }}</li>
    </ul>
    <div>
      <input v-model="message" placeholder="Message..." />
      <button @click="sendMessage">Envoyer</button>
    </div>
    <div>
      <h3>Messages:</h3>
      <ul>
        <li v-for="(m, index) in messages" :key="index">{{ m }}</li>
      </ul>
    </div>
  </div>
</template>
