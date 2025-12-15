const db = "https://esp32-a511e-default-rtdb.asia-southeast1.firebasedatabase.app/";

// ดึงค่าจาก Firebase ทุก 2 วินาที
function loadValue() {
  fetch(db + "sensor.json")
    .then(res => res.json())
    .then(data => {
      if (!data) return;

      document.getElementById("temp").innerText =
        data.temp ?? "--";

      document.getElementById("voltage").innerText =
        data.voltage ?? "--";

      document.getElementById("current").innerText =
        data.current ?? "--";

      document.getElementById("power").innerText =
        data.power ?? "--";
    });
}

// โหลดครั้งแรก + real-time แบบง่าย
loadValue();
setInterval(loadValue, 2000);
