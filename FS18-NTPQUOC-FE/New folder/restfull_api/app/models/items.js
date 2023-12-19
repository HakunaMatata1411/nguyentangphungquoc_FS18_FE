const MainModel 	= require(__path_schemas + 'items');
module.exports = {
    listItem: (params, options)=>{
        console.log(params);

        const queryFind = {...params}

        let find, select, sort, limit, page;

        // create field remove
        let removeField = ['select', 'sort','limit','page']

        //remove field
        removeField.forEach(param => delete queryFind[param])
       
        // create query string
        let queryStr  = JSON.stringify(queryFind) 

        //replace
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, find =>`$${find}`)
        
        //parse
        find = JSON.parse(queryStr) 

        // select items
        if (params.select) {
            select = params.select.split(',').join(' ')
        }

        // sort items
        if (params.sort) {
            sort = params.sort
        }
        // pagination

         page = parseInt(params.page) || 1
         limit = parseInt(params.limit) || 3
         const skip = (page - 1)*limit // 0
        if(options.task == 'all'){
            return MainModel
                .find(find) 
                .select(select)
                .sort(sort)
                .limit(limit)
                .skip(skip)
        }
        if(options.task == 'one'){
            return MainModel
                .findById(params.id)
                .select({})
        }
    },
    create: (item)=>{
        return new MainModel(item).save()
    },
    deleteItems: (params,options) =>{
        if(options.task == 'one'){
            return MainModel
                    .deleteOne({_id: params.id})
        }
    },
    editItems:  (params,options) =>{
        if(options.task == 'edit'){
            return MainModel
                    .updateOne({_id: params.id},params.body)
        }
    },
}