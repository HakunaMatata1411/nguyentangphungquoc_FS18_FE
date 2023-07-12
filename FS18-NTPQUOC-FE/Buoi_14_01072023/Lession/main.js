    let objectExample = {bname : 'quoc', job : 'dev'};

    objectExample.time = '6month'
    objectExample['family-name'] = 'Nguyen'

    console.log(objectExample)

    localStorage.setItem()
    localStorage.getItem()

    localStorage.setItem('infoName',JSON.stringify(objectExample))
    console.log(JSON.parse(localStorage.getItem('infoName')))