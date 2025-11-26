import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getDatabase, ref, push, onChildAdded }
from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";

// 🔥 YOUR FIREBASE CONFIG HERE
const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_DOMAIN",
  databaseURL: "YOUR_DB",
  projectId: "YOUR_PROJECT",
};

// Firebase Start
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const chatRef = ref(db, "messages");

// Receive messages
onChildAdded(chatRef, (data) => {
  const msg = data.val();
  const box = document.getElementById("messages");
  box.innerHTML += `<p><b>${msg.name}: </b>${msg.text}</p>`;
  box.scrollTop = box.scrollHeight;
});

// Send messages
window.sendMessage = () => {
  let name = document.getElementById("name").value;
  let text = document.getElementById("message").value;

  if (!name || !text) return alert("Name + Message required!");

  push(chatRef, { name, text });

  document.getElementById("message").value = "";
};
