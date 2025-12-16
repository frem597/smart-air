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
      temp = (temp ?? 25) + 1;   // โค้ดเดิม
      if (temp > 30) temp = 30; // 🔹 แทรก: จำกัดค่าสูงสุด

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
      temp = (temp ?? 25) - 1;   // โค้ดเดิม
      if (temp < 16) temp = 16; // 🔹 แทรก: จำกัดค่าต่ำสุด

      fetch(db + "control/temp.json", {
        method: "PUT",
        body: JSON.stringify(temp)
      });

      document.getElementById("tempValue").innerText = temp;
    });
}

// โหลดค่าเมื่อเปิดหน้า
window.onload = loadTemp;

/* ===== แทรก Real-time listener ===== */
<script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-database.js"></script>
<script>
  // config Firebase
  var firebaseConfig = {
    databaseURL: "https://esp32-a511e-default-rtdb.asia-southeast1.firebasedatabase.app"
  };
  firebase.initializeApp(firebaseConfig);
  var database = firebase.database();

  // ฟังค่าอุณหภูมิแบบ Real-time
  database.ref("control/temp").on("value", (snapshot) => {
    let temp = snapshot.val();
    if (temp === null) temp = 25;
    document.getElementById("tempValue").innerText = temp;
  });
</script>
