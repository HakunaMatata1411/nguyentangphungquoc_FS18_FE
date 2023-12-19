
const util      = require('util')
const notify    = require(__path_configs + 'notify')
const options   = {
    name: {min: 5, max: 15},
    title: {min: 5, max: 20}
}
module.exports = {
    validator: (req)=>{
        // name
        req.checkBody('name', util.format(notify.ERROR_NAME, options.name.min,options.name.max))
            .isLength({ min: options.name.min, max: options.name.max })

        // description
        req.checkBody('title', util.format(notify.ERROR_TITLE,options.title.min,options.title.max))
            .isLength({ min: options.title.min, max: options.title.max })

        let errors = req.validationErrors() !== false ? req.validationErrors() : [];
        let message = {}
        errors.map((val,ind)=>{
            message[val.param] = val.msg
        })
        return message
    }
}