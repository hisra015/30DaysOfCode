function addTask() {
    var input = document.getElementById('taskInput');
    var newTask = input.value;
    if (newTask !== '') {
        var listItem = document.createElement('li');
        listItem.innerText = newTask;
        
        // Add click event to remove the task when clicked
        listItem.onclick = function() {
            this.parentNode.removeChild(this);
        };

        var list = document.getElementById('taskList');
        list.appendChild(listItem);
        input.value = ''; // Clear input field after adding
    } else {
        alert('Please enter a task.');
    }
}
