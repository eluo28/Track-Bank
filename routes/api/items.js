const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const config = require('config');
const multer=require('multer');
const multerS3=require('multer-s3')
const auth = require('../../middleware/auth');


//item model
const Item = require('../../models/item');



const AWS_ACCESS_KEY_ID = config.get('AWS_ACCESS_KEY_ID');
const AWS_SECRET_ACCESS_KEY = config.get('AWS_SECRET_ACCESS_KEY');



AWS.config.update({
    accessKeyId:AWS_ACCESS_KEY_ID,
    secretAccessKey:AWS_SECRET_ACCESS_KEY,
    region:"us-east-1"
});

const s3=new AWS.S3();


const upload = multer({
    storage: multerS3({
      s3,
      bucket: 'trackbankfiles',
      acl: 'public-read',
      metadata: function (req, file, cb) {
        cb(null, {fieldName: 'audio file'});
      },
      key: function (req, file, cb) {
        cb(null, file.originalname)
      }
    })
  })



//@route GET api/items
//@desc Get all items
//@access private
router.get('/',auth,(req,res)=>{
    Item.find({userID: req.user.id})
        .sort({dateCreated:-1}) 
        .then(items=>res.json(items));
        

});




//@route POST api/items
//@desc create item
//@access private
router.post('/',auth,upload.single('audio'),(req,res)=>{
    



    const newItem = new Item({
        title:req.body.title,  
        producer:req.body.producer,
        description:req.body.description,
        coverImage:req.body.coverImage,
        audioFile:req.file.location,
        audioFileKey: req.file.originalname,
        lyrics:req.body.lyrics,
        userID:req.user.id
    });

   
    newItem.save()
        .then(item=>res.json(item));
});



//@route POST api/items/:id
//@desc update item
//@access private

router.post('/update',auth,(req, res) =>{


  Item.findById(req.body.id)
    .then(item=>{


        if(req.body.lyrics!=null){
          item.lyrics=req.body.lyrics
        }
        else{
          if(req.body.title!=null){
            item.title=req.body.title
          }
          if(req.body.producer!=null){
            item.producer=req.body.producer
          }
          if(req.body.description!=null){
            item.description=req.body.description
          }
          if(req.body.coverImage!=null){
            item.coverImage=req.body.coverImage
          }
        }
        
        if(req.body.voiceMemo!=null){
          item.voiceMemo=req.body.voiceMemo
        }

        item.save()
        .then(item=>res.json(item));

    })




});



//@route DELETE api/items/:id
//@desc delete item
//@access private
router.delete('/:id',auth,(req,res)=>{


  


    Item.findById(req.params.id)
        .then(item=>item.remove().then(()=>{
          var key=item.audioFileKey;
          res.json(key);

          var param={
            Bucket:'trackbankfiles',
            Key: key
        };
    
    
    s3.deleteObject(param, function(err, data) {
        if (err) console.log(err, err.stack);  // error
        else     console.log();                 // deleted
      });







        }))
        .catch(err=>res.status(404).json({success:false}))



    
});



module.exports=router;