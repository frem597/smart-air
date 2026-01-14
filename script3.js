const db = "https://esp32-a511e-default-rtdb.asia-southeast1.firebasedatabase.app/";

// โหลดค่า sensor (ไฟฟ้า)
function loadSensor() {
  fetch(db + "sensor.json")
    .then(res => res.json())
    .then(data => {
      if (!data) return;

      document.getElementById("voltage").innerText =
        data.voltage ?? "--";

      document.getElementById("current").innerText =
        data.current ?? "--";

      document.getElementById("power").innerText =
        data.power ?? "--";
    });
}

// โหลดค่าอุณหภูมิห้อง (DHT22)
function loadTemp() {
  fetch(db + "dht/temp.json")
    .then(res => res.json())
    .then(temp => {
      document.getElementById("temp").innerText =
        temp ?? "--";
    });
}

// โหลดครั้งแรก
loadSensor();
loadTemp();

// real-time แบบง่าย
setInterval(() => {
  loadSensor();
  loadTemp();
}, 2000);
