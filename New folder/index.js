const jsonServer = 'http://localhost:3000/todoList'
const listTask = document.querySelector("#area-list-task")
const areaForm = document.querySelector("#area-form")
const addTaskButton = document.querySelector("#btn-toggle-form")
const cancelAddTaskButton = document.querySelector("#btn-cancel")
const submitButton = document.querySelector("#btn-submit")
const taskName = document.querySelector("#input-name")
const statusName = document.querySelector("#input-status")
const sortValue = document.querySelectorAll(".sort-value")
const sortDisplay = document.querySelector("#sort-display")
const searchButton  = document.querySelector("#btn-search")
const inputSearch = document.querySelector("#input-search")

let handleSortExecuted  = true

const getTodoList =  (callback) => { 
    fetch(jsonServer)
        .then(response => response.json())
        .then(callback);
}

const renderTask = (data) => {
    if(handleSortExecuted) {
        handleSort(data) 
        handleSearch(data)
        handleSortExecuted=false
    }
    const htmlx = data.map((item , index) =>{
        const level = item.level.toLowerCase() === 'high' ? 'bg-danger' : item.level.toLowerCase() === 'medium' ? 'bg-info': 'bg-dark'
        return `
            <tr>
                <td>${index + 1}</th>
                <td>${item.name}</td>
                <td><span class="badge ${level}">${item.level}</span></td>
                <td>
                    <button class="btn btn-warning" onclick="handleEdit(${item.id}, '${item.name}', '${item.level}')">Edit</button>
                    <button class="btn btn-danger" onclick="handleDelete(${item.id})">Delete</button>
                </td>
            </tr>
        `
    })
    listTask.innerHTML = htmlx.join('')
}

const saveTask = (data,callback) => {
    const option = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data)
    }
    fetch(jsonServer,option)
    .then(response => response.json())
    .then(callback)
}

addTaskButton.onclick = () =>{
    areaForm.classList.toggle('d-none');
    console.log(areaForm);
}
cancelAddTaskButton.onclick = () =>{
    areaForm.classList.toggle('d-none');
}
submitButton.onclick = () =>{
    const data = {
        name: taskName.value,
        level: statusName.value
    }

    saveTask(data,getTodoList(renderTask))
}

const handleSort = (data) =>{
    sortValue.forEach(element => {
        element.addEventListener("click", ()=>{
            const by = element.getAttribute('data-order-by')
            const dir = element.getAttribute('data-order-dir')
            
            sortDisplay.innerText = `${by.toUpperCase()} - ${dir.toLocaleUpperCase()}`
            
            data.sort((a,b)=>
            {
            const taskA = a[`${by}`].toUpperCase();
            const taskB = b[`${by}`].toUpperCase(); 
          
            if (taskA < taskB) {
               if( dir == 'asc'  ) { if(by==='level') { return 1} else {return -1}} else {if(by==='level') { return -1} else {return 1}}
            }
            if (taskA > taskB) {
                if( dir == 'asc' ) {if(by==='level') { return -1} else {return 1}} else {if(by==='level') { return 1} else {return -1}}
            }
            return 0;
            })
            renderTask(data)
        })
    });
}

const handleSearch = (data) =>{
    searchButton.onclick = () =>{
        const regex = `${inputSearch.value}`
        const find = []
     
        data.map((item)=>{
            if(item.name.toLowerCase().match(regex)) find.push(item )
        })
       renderTask(find)
       handleSort(find)
    }
}

const handleEdit = (id,task,level) =>{
    if(areaForm.classList.contains('d-none')) areaForm.classList.remove('d-none')
    taskName.value = task
    statusName.value = level
    submitButton.innerText = 'SAVE'
    submitButton.onclick = () => {
        const name = taskName.value
        const level = statusName.value
        const data = {name,level}
        const option = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data)
        }
        fetch(jsonServer + "/" + id, option)
        .then(response => response.json())
        .then(getAction(renderAction))
        areaForm.classList.toggle('d-none')
    }
}

function handleDelete(id, callback) {
    if(confirm("Xác nhận để xóa Task!!!")){
        let option = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            }
        }
        fetch(jsonServer + "/" + id, option)
        .then(response => response.json())
        .then(getAction(renderTask));
    }
}

const main = () =>{
    getTodoList(renderTask)
}

main()