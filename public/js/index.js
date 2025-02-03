const tasks = document.querySelector("#Note");
const lists = document.querySelector("#lists");

const selection = document.querySelector("#selection");
const dateCreated = document.querySelector("#date_created");
const numberOfQuestions = document.querySelector("#numberOfQuestions");
const note = document.querySelector("#Note");


form.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const platform = selection.value.trim();
  const date = dateCreated.value.trim();
  const number = numberOfQuestions.value.trim();
  const notes = note.value.trim();
  appendinfo(platform, date, number, notes);
  form.reset()
});

function appendinfo(platform, date, number, notes) {
  const newDiv = document.createElement("div");
  newDiv.classList.add("newList");
  newDiv.innerHTML = `
    <div>
        <b><span class="info">Date Created:</span></b>
        <span class="details">${date}</span>
    </div>
    <div>
        <b><span class="info">Platform:</span></b>
        <span class="details">${platform}</span>
    </div>
    <div>
        <b><span class="info">Number of Questions:</span></b>
        <span class="details">${number}</span>
    </div>
    <div>
        <b><span class="info">Note:</span></b>
        <span class="details">${notes}</span>
    </div>
    `;
  lists.appendChild(newDiv);
}
