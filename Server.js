const express=require('express');
const app=express();
const PORT=process.env.PORT ||8000;
const{MongoClient}=require("mongodb");


// const articlesInfo={
//     "learn-react":{
//         comments:[],
//     },
//     "learn-node":{
//         comments:[],
//     },
//     "my-thoughts-on-learning-react":{
//         comments:[],
//     },
// };
// initialize middleware
// we use to have body parser but now it is a built in middleware
// function of express . it parses incoming JSON payload
app.use(express.json({extended:false}))
const withDB=async(operations,res)=>{
    try{
      
        const client=await MongoClient.connect('mongodb://127.0.0.1')
        const db=client.db("mernblog")
       await operations(db);
        client.close();
    }
    catch(error){
       res.status(500).json({message:"Error connecting to database",error}) 
    }  
}

app.get('/api/articles/:name',async(req,res)=>{
    withDB(async(db)=>{
        const articlename=req.params.name;
        const articleInfo=await db
        .collection('articles')
        .findOne({name: articlename});
        res.status(200).json(articleInfo);
    },res)
    // try{
       
        //const client=await MongoClient.connect('mongodb://127.0.0.1')
       // const db=client.db("mernblog")
       
        //client.close();
    // }
    // catch(error){
    //    res.status(500).json({message:"Error connecting to database",error}) 
    // }
    
});
// just a test route for now 
// get request from root dir and then call back func consistiing of request , response
// app.get('/',(req,res)=>res.send("Hello, World!"));
// app.post('/',(req,res)=>res.send(`Hello ${req.body.name}`));

// //route parameters in express
// app.get("/hello/:name",(req,res)=>res.send(`Hello ${req.params.name}`));


app.post('/api/articles/:name/add-comments',(req,res) => {
    const {username,text}=req.body
    const articlename=req.params.name
    // articlesInfo[articlename].comments.push({username,text});
    // res.status(200).send(articlesInfo[articlename]);
    withDB(async(db)=>{
        const articleInfo=await db.collection('articles').findOne({name:articlename})
        await db.collection('articles').updateOne({name:articlename},
            {$set:{
                comments: articleInfo.comments.concat({username,text}),

            },
        }
        );
        const updateArticleInfo=await db.collection('articles').findOne({name:
        articlename});
        res.status(200).json(updateArticleInfo);
    },res);
});
// defining the port on which we are
app.listen(PORT,()=>console.log(`Server started at port ${PORT}`));
