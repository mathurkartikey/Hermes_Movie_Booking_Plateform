/* ================= NAVIGATION ================= */
function go(page) {
  window.location.href = page;
}

function goBack() {
  if (document.referrer !== "") {
    window.history.back();
  } else {
    window.location.href = "index.html";
  }
}

/* ================= GO TO SEATS ================= */
function goSeats(theatre, time) {
  localStorage.setItem("theatre", theatre);
  localStorage.setItem("time", time);

  window.location.href = "seats.html";
}

/* ================= LOAD GROUPS ================= */
function loadGroups() {
  const container = document.getElementById("groupList");
  if (!container) return;

  fetch("http://localhost:3000/groups")
    .then(res => res.json())
    .then(groups => {
      container.innerHTML = "";

      groups.forEach(g => {
        const div = document.createElement("div");
        div.className = "card";

        div.innerHTML = `
          <p>👥 ${g.max_people} people</p>
          <p style="color:#00bfff;">${g.visibility}</p>
          <p>${g.description}</p>
          <button onclick="joinGroup()">Join</button>
        `;

        container.appendChild(div);
      });
    });
}

/* ================= CREATE GROUP ================= */
function createGroup() {
  const desc = document.getElementById("desc").value;
  const max = document.getElementById("maxPeople").value;
  const type = document.getElementById("groupType").value;

  if (!desc || !max) {
    alert("Please fill all fields");
    return;
  }

  fetch("http://localhost:3000/group", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({
      show_id: 1,
      created_by: 1,
      max_people: max,
      description: desc,
      visibility: type
    })
  })
  .then(res => res.json())
  .then(data => {
    alert(data.message);
    loadGroups(); // refresh UI
  });
}

/* ================= JOIN GROUP ================= */
function joinGroup() {
  alert("Joined group successfully 👥");
}

/* ================= CHAT ================= */
function send() {
  const msgInput = document.getElementById("msg");
  const chatBox = document.getElementById("chatBox");

  if (!msgInput || !chatBox) return;

  const text = msgInput.value.trim();
  if (!text) return;

  const myMsg = document.createElement("div");
  myMsg.classList.add("message", "sent");
  myMsg.innerText = text;
  chatBox.appendChild(myMsg);

  fetch("http://localhost:3000/message", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      group_id: 1,
      sender_id: 1,
      message_text: text
    })
  });

  msgInput.value = "";
  chatBox.scrollTop = chatBox.scrollHeight;
}

/* ================= BOOK TICKET ================= */
function bookTicket() {
  fetch("http://localhost:3000/book", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      user_id: 1,
      show_id: 1
    })
  })
  .then(res => res.json())
  .then(data => alert(data.message));
}