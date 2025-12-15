const db = "https://esp32-a511e-default-rtdb.asia-southeast1.firebasedatabase.app/";

function acOn() {
  fetch(db + "control/power.json", {
    method: "PUT",
    body: JSON.stringify(1)
  })
  .then(res => console.log("ON:", res.status));
}

function acOff() {
  fetch(db + "control/power.json", {
    method: "PUT",
    body: JSON.stringify(0)
  })
  .then(res => console.log("OFF:", res.status));
}
