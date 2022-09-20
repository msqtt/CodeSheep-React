export function yep() {
  let yep = localStorage.getItem("yep");
  if (yep === "yep") {
    document.body.style.backgroundImage =
      'url("https://raw.githubusercontent.com/mosqu1t0/Sources/master/Img/yep.jpg")';
    document.body.style.backgroundSize = "18%";
  }
}
