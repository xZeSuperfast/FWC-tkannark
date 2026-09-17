function getRandomColor() {
  const r = Math.floor(Math.random() * 256); // สุ่มเลข 0 ถึง 255 สำหรับสีแดง
  const g = Math.floor(Math.random() * 256); // สุ่มเลข 0 ถึง 255 สำหรับสีเขียว
  const b = Math.floor(Math.random() * 256); // สุ่มเลข 0 ถึง 255 สำหรับสีน้ำเงิน
  return `rgb(${r}, ${g}, ${b})`;
}
const button = document.getElementById("btn");

button.addEventListener("click", function () {
  document.body.style.backgroundColor = getRandomColor();
});