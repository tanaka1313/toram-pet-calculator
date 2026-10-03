function calculatePet() {
  const petCount = parseInt(document.getElementById("petCount").value, 10);
  const dateStr = document.getElementById("targetDate").value;
  const hour = parseInt(document.getElementById("targetHour").value, 10);

  if (!dateStr || isNaN(hour)) {
    document.getElementById("result").textContent = "日付と時間を入力してください。";
    return;
  }

  const config = PET_CONFIG[petCount];
  if (!config) {
    document.getElementById("result").textContent = "対応していないペット数です。";
    return;
  }

  // 分・秒は切り捨て（時間単位のみ使用）
  const [year, month, day] = dateStr.split("-").map(Number);
  const now = new Date(year, month - 1, day, hour, 0, 0);

  // (now - baseTime).Hour
  const diffMs = now.getTime() - config.baseTime.getTime();
  const hours = Math.floor(diffMs / (1000 * 60 * 60));

  // a + hours * b
  const value = config.a + hours * config.b;

  // mod(value, 野良種類数)
  let mod = value % petCount;
  if (mod < 0) mod += petCount; // 負の余り対策

  // 切り捨て
  const petNumber = Math.floor(mod);

  // 表示
  const name = config.names[petNumber] || "";
  const display = name
    ? `ペット番号: ${petNumber} （${name}）`
    : `ペット番号: ${petNumber}`;

  document.getElementById("result").textContent = display;
}

// イベント設定
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("calcBtn").addEventListener("click", calculatePet);
});