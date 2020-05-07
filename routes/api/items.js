const express = require('express');
const router = express.Router();

//item model
const Item = require('../../models/item');

//@route GET api/items
//@desc Get all items
//@access public
router.get('/',(req,res)=>{
    Item.find()
        .sort({date:-1})
        .then(items=>res.json(items));
});

//@route POST api/items
//@desc create item
//@access public
router.post('/',(req,res)=>{
    const newItem = new Item({
        title:req.body.title,
        description:req.body.description,
        lyrics:req.body.lyrics
    });

    newItem.save()
        .then(items=>res.json(items));
});


//@route DELETE api/items/:id
//@desc delete item
//@access public
router.delete('/:id',(req,res)=>{
    Item.findById(req.params.id)
        .then(item=>item.remove().then(()=>res.json({success:true})))
        .catch(err=>res.status(404).json({success:false}))
});



module.exports=router;