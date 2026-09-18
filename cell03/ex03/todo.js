const ft_list = document.getElementById('ft_list');
const newBtn = document.getElementById('new_btn');

// 1. Load existing TO DOs from cookies on startup
window.onload = () => {
    const cookies = document.cookie.split('; ');
    const todoCookie = cookies.find(row => row.startsWith('todo_list='));
    
    if (todoCookie) {
        const tasks = JSON.parse(decodeURIComponent(todoCookie.split('=')[1]));
        // Reverse them to maintain original "top of list" order when re-adding
        tasks.reverse().forEach(taskText => addTask(taskText, false));
    }
};

// 2. Event Listener for the "New" button
newBtn.addEventListener('click', () => {
    const task = prompt("What do you need to do?");
    if (task && task.trim() !== "") {
        addTask(task, true);
    }
});

// 3. Function to add a task to the DOM
function addTask(text, save) {
    const div = document.createElement('div');
    div.textContent = text;
    
    // Click to remove logic
    div.addEventListener('click', () => {
        if (confirm("Do you really want to remove this TO DO?")) {
            div.remove();
            saveToCookies();
        }
    });

    // Requirement: Must be placed at the top of the list
    ft_list.prepend(div);

    if (save) saveToCookies();
}

// 4. Persistence Logic
function saveToCookies() {
    const tasks = [];
    const items = ft_list.querySelectorAll('div');
    
    // Collect all text from current divs
    items.forEach(item => tasks.push(item.textContent));
    
    // Stringify and save (expires in 7 days)
    const d = new Date();
    d.setTime(d.getTime() + (7*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    
    document.cookie = "todo_list=" + encodeURIComponent(JSON.stringify(tasks)) + ";" + expires + ";path=/";
}