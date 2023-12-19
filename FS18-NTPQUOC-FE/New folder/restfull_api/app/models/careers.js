const MainModel 	= require(__path_schemas + 'careers');
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
         limit = parseInt(params.limit) || 6
         const skip = (page - 1)*limit // 0
        if(options.task == 'all'){
            return MainModel
                .find(find) 
                .populate({path: 'restaurants', select: 'name'})
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
    event: (params,options) =>{
        let type = params.type
        if (params.type != 'like' && params.type != 'dislike') return;
        return MainModel
                .findByIdAndUpdate( params.id,{ $inc : {[type]:1}},{new:true})
       
    }
}