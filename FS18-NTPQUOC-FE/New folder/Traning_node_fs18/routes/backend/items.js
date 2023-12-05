var express = require('express');
var router = express.Router();
const ItemShema = require('./../../shemas/items')



/* GET home page. */
router.get('/', async function(req, res, next) {
  let statusFillters = [
    {name: 'ALL', value: 'all',   count: 4,   class: 'default',   link: '#' }, 
    {name: 'ACTIVE', value: 'active',   count: 4,   class: 'success',   link: '#' },
    {name: 'INACTIVE', value: 'inactive',   count: 4,   class: 'default',   link: '#' }
  ]


    await ItemShema.find({}).then((items)=>{
      res.render('pages/items/list', { 
        pageTitle: 'Items List Manager',
        items,
        statusFillters: statusFillters
       });
})
  
});

router.get('/add', function(req, res, next) {
  res.render('pages/items/form', { pageTitle: 'Items Add Manager' });
});


module.exports = router;
