document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const totalTasksEl = document.getElementById('totalTasks');
    const completedTasksEl = document.getElementById('completedTasks');
    const clearCompletedBtn = document.getElementById('clearCompletedBtn');
    
    // Load tasks from localStorage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    
    // Initial render of tasks
    renderTasks();
    updateStats();
    
    // Add task event listener
    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });
    
    // Clear completed tasks
    clearCompletedBtn.addEventListener('click', clearCompletedTasks);
    
    function addTask() {
        const taskText = taskInput.value.trim();
        
        if (taskText) {
            // Add new task to tasks array
            tasks.push({
                id: Date.now(), // Use timestamp as unique ID
                text: taskText,
                completed: false
            });
            
            // Save to localStorage
            saveTasks();
            
            // Clear input field
            taskInput.value = '';
            
            // Re-render tasks
            renderTasks();
            updateStats();
        }
    }
    
    function toggleTaskStatus(id) {
        // Find task and toggle its completed status
        tasks = tasks.map(task => {
            if (task.id === id) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });
        
        // Save and re-render
        saveTasks();
        renderTasks();
        updateStats();
    }
    
    function deleteTask(id) {
        // Remove task from array
        tasks = tasks.filter(task => task.id !== id);
        
        // Save and re-render
        saveTasks();
        renderTasks();
        updateStats();
    }
    
    function clearCompletedTasks() {
        // Keep only incomplete tasks
        tasks = tasks.filter(task => !task.completed);
        
        // Save and re-render
        saveTasks();
        renderTasks();
        updateStats();
    }
    
    function renderTasks() {
        // Clear current list
        taskList.innerHTML = '';
        
        // Add each task to the list
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.className = 'task-item';
            
            // Add checkbox
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = task.completed;
            checkbox.addEventListener('change', () => toggleTaskStatus(task.id));
            
            // Add task text
            const span = document.createElement('span');
            span.className = task.completed ? 'task-text completed' : 'task-text';
            span.textContent = task.text;
            
            // Add delete button
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener('click', () => deleteTask(task.id));
            
            // Append elements to list item
            li.appendChild(checkbox);
            li.appendChild(span);
            li.appendChild(deleteBtn);
            
            // Append list item to task list
            taskList.appendChild(li);
        });
    }
    
    function updateStats() {
        // Update task counts
        totalTasksEl.textContent = tasks.length;
        completedTasksEl.textContent = tasks.filter(task => task.completed).length;
    }
    
    function saveTasks() {
        // Save tasks to localStorage
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});