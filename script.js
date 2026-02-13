const item = document.querySelector("#item");
const toDoBox = document.querySelector("#to-do-box");


window.onload = function () {
  let savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  savedTodos.forEach(todo => {
    addToDo(todo.text, todo.done);
  });
};


item.addEventListener(
  "keyup",
  function (event) {
    if (event.key === "Enter") {
      addToDo(this.value, false);
      this.value = "";
    }
  }
);

const addToDo = (itemText, done) => {
  const listItem = document.createElement("li");

  listItem.innerHTML = `
    ${itemText}
    <i class="fas fa-times"></i>
  `;

  if (done) {
    listItem.classList.add("done");
  }

 
  listItem.addEventListener(
    "click",
    function () {
      this.classList.toggle("done");
      saveTodos();
    }
  );

  
  listItem.querySelector("i").addEventListener(
    "click",
    function (e) {
      e.stopPropagation();
      listItem.remove();
      saveTodos();
    }
  );

  toDoBox.appendChild(listItem);
  saveTodos();
};


function saveTodos() {
  let todos = [];

  document.querySelectorAll("#to-do-box li").forEach(li => {
    todos.push({
      text: li.childNodes[0].textContent.trim(),
      done: li.classList.contains("done")
    });
  });

  localStorage.setItem("todos", JSON.stringify(todos));
}
