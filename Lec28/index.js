const body = document.getElementsByTagName("body");
const h2 = document.createElement("<h2>");
h2.innerText = "Hello World";
body.addEventListener("onclick", () => {
  body[0].appendChild(h2);
});
