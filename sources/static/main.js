const socket = io();

// client-side
socket.on("receive_message", (message) => {
  let simimiMessage = `<li class="d-flex justify-content-left mb-4">
                        <img src="./simsimi-avt.jpg" alt="avatar"
                          class="rounded-circle d-flex align-self-start me-3 shadow-1-strong" width="60">
                        <div class="card">
                          <div class="card-header d-flex justify-content-between p-3">
                            <p class="fw-bold mb-0">Simsimi</p>
                          </div>
                          <div class="card-body">
                            <p class="mb-0">
                            ${message.text}
                            </p>
                          </div>
                        </div>
                      </li>`;
  let listMessage = document.querySelector(".list-message");
  listMessage.innerHTML = listMessage.innerHTML + simimiMessage;
});




document.getElementById('send').onclick = () => {
  let textBox = document.getElementById("textbox")
  let userMessage = `<li class="d-flex justify-content-between mb-4">
                      <div class="card w-100">
                        <div class="card-header d-flex justify-content-between p-3">
                          <p class="fw-bold mb-0">You</p>
                        </div>
                        <div class="card-body">
                          <p class="mb-0">
                            ${textBox.value}
                          </p>
                        </div>
                      </div>
                      <img src="./FPT_logo_2010.svg.png" alt="avatar"
                        class="rounded-circle d-flex align-self-start ms-3 shadow-1-strong" width="60">
                      </li>`;
  let listMessage = document.querySelector(".list-message");
  listMessage.innerHTML = listMessage.innerHTML + userMessage;

  socket.emit("send_message", {
    text: textBox.value
  })
  textBox.value ='';

};

