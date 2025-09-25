function detectBrowser() {
  const el = document.getElementById("browserInfo");
  const ua = navigator.userAgent;
  let name = "Невідомий", version = "";

  if (/Edg\/(\d+)/.test(ua)) { name="Edge"; version=RegExp.$1; }
  else if (/Chrome\/(\d+)/.test(ua)) { name="Chrome"; version=RegExp.$1; }
  else if (/Firefox\/(\d+)/.test(ua)) { name="Firefox"; version=RegExp.$1; }
  else if (/Version\/(\d+).*Safari/.test(ua)) { name="Safari"; version=RegExp.$1; }
  else if (/OPR\/(\d+)/.test(ua)) { name="Opera"; version=RegExp.$1; }

  if (el) el.textContent = name + " " + version;
}

/* 2) Арифметика */
function calcAndOutput(a,b){
  document.write("<p>Сума: "+(a+b)+"</p>");
  document.write("<p>Різниця: "+(a-b)+"</p>");
  alert("Добуток: "+(a*b));
  alert("Ділення: "+(b!==0 ? a/b : "на 0 не ділимо"));
}

/* 3) Збільшення/зменшення зображення */
function zoomIn(img){
  img.dataset.w=img.width; img.dataset.h=img.height;
  img.width=Math.round(img.width*1.2);
  img.height=Math.round(img.height*1.2);
}
function zoomOut(img){
  if(img.dataset.w){ img.width=img.dataset.w; img.height=img.dataset.h; }
}

/* 4) Радіо-галерея */
function setupRadioGallery(){
  const root = document.getElementById("radioGallery");
  const out  = document.getElementById("radioResult");
  if(!root || !out) return;

  const apply = () => {
    const v = root.querySelector("input:checked")?.value;
    if (v) out.src = "img/" + v + ".jpg";
  };

  root.addEventListener("change", apply);

  // выбрать первую опцию, если ничего не выбрано, и отрисовать сразу
  if (!root.querySelector("input:checked")) {
    root.querySelector("input")?.setAttribute("checked","checked");
  }
  apply();
}
function resizeImg(factor){
  const out = document.getElementById("radioResult");
  if(out){
    out.width = Math.round(out.width * factor);
    out.removeAttribute("height"); // высоту не фиксируем
  }
}

function goBack(){ history.back(); }

/* 5) Підсвітка меню */
function wireMenuHover(){
  document.querySelectorAll("nav a").forEach(a=>{
    a.addEventListener("mouseover",()=>a.style.color="brown");
    a.addEventListener("mouseout",()=>a.style.color="");
  });
}

/* 6) Select-навігація */
function jumpTo(sel){ if(sel.value) location.href=sel.value; }

/* 7) Перемикання мови (ua/ru) */
function setupLang(){
  const sel=document.getElementById("langSelect");
  if(!sel) return;
  sel.addEventListener("change",()=>{
    const lang=sel.value, path=location.pathname;
    if(lang==="ru" && !/\.ru\.html$/.test(path))
      location.href=path.replace(/\.html$/, ".ru.html");
    else if(lang==="ua" && /\.ru\.html$/.test(path))
      location.href=path.replace(/\.ru\.html$/, ".html");
  });
}

/* 8) Інформація дня */
const INFO_OF_DAY=[
 "Кава — це мікроподорож у чашці.",
 "Факт: Арабіка містить менше кофеїну, ніж робуста.",
 "Порада: Для V60 починайте з співвідношення 1:16.",
 "Жарт: Кавоварка — мій улюблений будильник.",
 "Цитата: «Життя надто коротке для поганої кави.»"
];
function showInfoOfDay(){
  const el=document.getElementById("infoOfDay");
  const pick=INFO_OF_DAY[Math.floor(Math.random()*INFO_OF_DAY.length)];
  if(el) el.textContent=pick; else alert(pick);
}

/* Автозапуск */
window.addEventListener("DOMContentLoaded", ()=>{
  detectBrowser();
  setupRadioGallery();
  wireMenuHover();
  setupLang();
  showInfoOfDay();
});