
const taskAPI = 'http://localhost:3000/task'
const btnCancel = document.querySelector('#btn-cancel');
const listTask = document.getElementById('area-list-task');
const addTask = document.getElementById('btn-toggle-form');
const areaForm = document.getElementById('area-form');
const nameElement = document.getElementById('input-name');
const levelElement = document.getElementById('input-status');
const submitElement = document.getElementById('btn-submit');

// Controller
const main = ()=>{
    getListTask(renderTasks);
    handleAddTask();
    handleCancel();
}
main()

// Get all task list
function getListTask(cb){ 
    fetch(taskAPI)
        .then(res => res.json())
        .then(cb);
}

//Add
function handleAddTask() {
    addTask.onclick = () => {
        if(!areaForm.classList.toggle('d-none')){
            handleSubmitForm();
        }
    }
}

// get data from form
function handleSubmitForm(){
    submitElement.onclick = function(){
        let data = {
            name: nameElement.value,
            level: levelElement.value
        }
        saveTask(data,function(){
            getListTask(renderTasks)
        })
    }
}

// Save 
function saveTask (data,cb){
    let option = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data)
    }
    fetch(taskAPI,option)
    .then(res => res.json())
    .then(cb)
}

// Delete
function handleDelete(id, cb) {
    if(confirm("Bạn có muốn xóa công việc không?")){
        let option = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            }
        }
        fetch(taskAPI + "/" + id, option).then(res => res.json()).then(getListTask(renderTasks));
    }
}

// Cancel
function handleCancel() {
    btnCancel.onclick = () => {
        areaForm.classList.toggle('d-none');
    }    
}

// Edit
function handleEdit(id, name, level){
    if(areaForm.classList.contains('d-none')){
        areaForm.classList.remove('d-none');
    }
    nameElement.value = name;
    levelElement.value = level;
    submitElement.innerText = 'Save';
    submitElement.onclick = () => {
        let data = {
            name: `${nameElement.value}`,
            level: `${levelElement.value}`
        };
        let option = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data)
        }
        fetch(taskAPI + "/" + id, option).then(res => res.json()).then(getListTask(renderTasks));
        areaForm.classList.toggle('d-none');
    }
} 


// Render task list
function renderTasks (tasks){
    var html = tasks.map((value, index) =>{
        let level = (value.level === 'high') ? 'bg-danger': ((value.level === 'medium') ? 'bg-info': 'bg-dark');
        return `
            <tr>
                <td>${index + 1}</th>
                <td>${value.name}</td>
                <td><span class="badge ${level}">${value.level}</span></td>
                <td>
                    <button class="btn btn-warning" onclick="handleEdit(${value.id}, '${value.name}', '${value.level}')">Edit</button>
                    <button class="btn btn-danger" onclick="handleDelete(${value.id})">Delete</button>
                </td>
            </tr>
        `
    })
    listTask.innerHTML = html.join('');
}
