// define
const courseAPI = 'http://localhost:3000/posts'
const bodyElement = document.getElementById('course')



// Cotroller
const main = ()=>{
    // code
    getCoure(renderCourse)
    
}
main()

// model

    // get API
    function getCoure(cb){ 
        fetch(courseAPI)
            .then(res => res.json())
            .then(cb);
    }

    // render 
    function renderCourse (courses){
        var html = courses.map(course =>{
            return `
                <li>
                    <h2>${course.name}</h2>
                    <p>${course.content}</p>
                </li>
            `
        })
        bodyElement.innerHTML = html.join('')
    }