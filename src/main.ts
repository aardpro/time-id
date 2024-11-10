import "./style.css";
import { timeId } from "./package-entry";

window.onload = async () => {
  const timestampEl = document.getElementById(
    "timestamp"
  ) as HTMLElement | null;
  const timeidEl = document.getElementById("timeid") as HTMLElement | null;
  const countEl = document.getElementById("count") as HTMLInputElement | null;
  const suffixEl = document.getElementById("suffix") as HTMLInputElement | null;
  const resultEl = document.getElementById("result") as HTMLElement | null;
  const btn = document.getElementById("btn") as HTMLButtonElement | null;

  if (!timestampEl || !timeidEl || !countEl || !resultEl || !btn || !suffixEl) {
    return;
  }
  setInterval(() => {
    timestampEl.innerText = Date.now().toString();
    timeidEl.innerText = timeId(0);
  }, 1000);

  btn.addEventListener("click", () => {
    const ids = [];
    const suffixLength = Number(suffixEl.value);
    for (let i = 0; i < Number(countEl.value); i++) {
      ids.push(timeId(suffixLength));
    }
    resultEl.innerHTML = ids
      .map(
        (id) =>
          `<div style="padding: 4px;background-color: #f0f0f0">${id}</div>`
      )
      .join("");
  });
};
