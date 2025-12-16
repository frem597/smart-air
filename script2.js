const db = "https://esp32-a511e-default-rtdb.asia-southeast1.firebasedatabase.app/";

// อ่านค่าอุณหภูมิ
function loadTemp() {
  fetch(db + "control/temp.json")
    .then(res => res.json())
    .then(temp => {
      if (temp === null) temp = 25;
      document.getElementById("tempValue").innerText = temp;
    });
}

// เพิ่มอุณหภูมิ
function tempUp() {
  fetch(db + "control/temp.json")
    .then(res => res.json())
    .then(temp => {
      temp = (temp ?? 25) + 1;
      if (temp > 30) temp = 30;

      fetch(db + "control/temp.json", {
        method: "PUT",
        body: JSON.stringify(temp)
      });

      document.getElementById("tempValue").innerText = temp;
    });
}

// ลดอุณหภูมิ
function tempDown() {
  fetch(db + "control/temp.json")
    .then(res => res.json())
    .then(temp => {
      temp = (temp ?? 25) - 1;
      if (temp < 16) temp = 16;

      fetch(db + "control/temp.json", {
        method: "PUT",
        body: JSON.stringify(temp)
      });

      document.getElementById("tempValue").innerText = temp;
    });
}

window.onload = loadTemp;

// ===== Real-time listener =====
var firebaseConfig = {
  databaseURL: "https://esp32-a511e-default-rtdb.asia-southeast1.firebasedatabase.app"
};
firebase.initializeApp(firebaseConfig);
var database = firebase.database();

database.ref("control/temp").on("value", (snapshot) => {
  let temp = snapshot.val();
  if (temp === null) temp = 25;
  document.getElementById("tempValue").innerText = temp;
});
