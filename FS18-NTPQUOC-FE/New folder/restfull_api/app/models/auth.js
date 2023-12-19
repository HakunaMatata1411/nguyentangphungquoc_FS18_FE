const MainModel 	= require(__path_schemas + 'user');
module.exports = {

    create: (item)=>{
        return new MainModel(item).save()
    },
   
}