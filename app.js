const acServer = "ws://localhost:3000/cable";
const cableActions = {
  connected() {
    console.log("connected to WS server");
  },
  received(data) {
    // You can add any logic you want here
    // We will just add a message to the DOM
    addToDOM(data);
  },

  disconnected() {
    console.log("disconnected from WS server");
  },
};
// We can set up a connection to the WS server quite easily

// const cable = ActionCable.createConsumer(acServer);
// cable.subscriptions.create(
//   { channel: "NotificationsChannel" },
//   cableActions
// );

// Or we can bind the function to the window object

(function () {
  this.Application || (this.Application = {});
  this.Application.cable = ActionCable.createConsumer(acServer);
}.call(this));

Application.connection = Application.cable.subscriptions.create(
  { channel: "NotificationsChannel" },
  cableActions
);

function addToDOM(data) {
  const div = document.createElement("div");
  Object.assign(div.style, {
    background: "#fff",
    borderRadius: "5px",
    boxShadow: "0 0 10px rgba(0,0,0,0.2)",
    color: "#000",
    fontSize: "16px",
    margin: "10px",
    padding: "10px",
    position: "fixed",
    right: "10px",
    top: "10px",
    zIndex: "9999",
    display: "none",
  });
  div.innerHTML = data.message;
  document.body.appendChild(div);
  fadeIn(div);
//   setTimeout(() => {
//     fadeOut(div);
//   }, 3000);
}

function fadeOut(el) {
  el.style.opacity = 1;

  (function fade() {
    if ((el.style.opacity -= 0.1) < 0) {
      el.style.display = "none";
    } else {
      requestAnimationFrame(fade);
    }
  })();
}

function fadeIn(el) {
  el.style.opacity = 0;
  el.style.display = "block";
  (function fade() {
    let val = parseFloat(el.style.opacity);
    if (!((val += 0.1) > 1)) {
      el.style.opacity = val;
      requestAnimationFrame(fade);
    }
  })();
}
