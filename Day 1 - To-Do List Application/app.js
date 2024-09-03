function addTask() {
    var input = document.getElementById('taskInput');
    var newTask = input.value;
    if (newTask !== '') {
        var listItem = document.createElement('li');
        listItem.innerText = newTask;
        
        // Create delete icon
        var deleteIcon = document.createElement('span');
        deleteIcon.innerText = '❌';
        deleteIcon.className = 'delete-icon';
        
        // Attach click event to the delete icon
        deleteIcon.onclick = function(e) {
            e.stopPropagation();  // Stop the click from affecting parent elements
            listItem.remove();  // Remove the list item
        };
        
        listItem.appendChild(deleteIcon);  // Append the delete icon to the list item

        // Append the list item to the list
        var list = document.getElementById('taskList');
        list.appendChild(listItem);
        input.value = ''; // Clear input field after adding

        listItem.addEventListener('click', function() {
            this.classList.toggle('completed');  // Optional: Toggle a 'completed' state
        });
    } else {
        alert('Please enter a task.');
    }
}
