const ftList = document.getElementById("ft_list");
const newBtn = document.getElementById("new-btn");

function saveToCookie() {
  const todos = [];
  for (const item of ftList.children) {
    todos.push(item.textContent);
  }

  const date = new Date();
  date.setTime(date.getTime() + 7 * 24 * 60 * 60 * 1000);

  document.cookie =
    "ft_list=" +
    encodeURIComponent(JSON.stringify(todos)) +
    ";expires=" +
    date.toUTCString() +
    ";path=/";
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return decodeURIComponent(parts.pop().split(";").shift());
  }
  return null;
}

function createTodoElement(text) {
  const todoDiv = document.createElement("div");
  todoDiv.textContent = text;

  todoDiv.addEventListener("click", function () {
    if (confirm("Do you really want to remove this to-do?")) {
      todoDiv.remove();
      saveToCookie();
    }
  });

  return todoDiv;
}

window.addEventListener("DOMContentLoaded", function () {
  const savedData = getCookie("ft_list");
  if (savedData) {
    try {
      const todos = JSON.parse(savedData);

      for (const text of todos) {
        const item = createTodoElement(text);
        ftList.appendChild(item);
      }
    } catch (e) {
      console.error("Failed to parse cookie:", e);
    }
  }
});

newBtn.addEventListener("click", function () {
  const text = prompt("Enter a new TO DO:");

  if (text !== null && text.trim() !== "") {
    const newTodo = createTodoElement(text.trim());
    ftList.prepend(newTodo);
    saveToCookie();
  }
});