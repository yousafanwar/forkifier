import express from 'express';
import pool from './db.js';
import bodyParser from 'body-parser'; 

const app = express();
// const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get('/api/users', async function(req, res){
    const dbRes = await pool.query('select users.id, users.firstName, users.lastName, users.email, users.password, recipes.title as recipeTitle, ingredients.title as ingredient, ingredients.quantity from users full outer join recipes on users.id = recipes.user_id full outer join recipe_ingredients on recipe_ingredients.recipes_id = recipes.id full outer join ingredients on recipe_ingredients.ingredients_id = ingredients.id;');
    res.send(dbRes.rows);
})

 app.get('/api/user/:id', async function(req, res){
    const id = req.params.id;
    const dbRes = await pool.query(`select users.id, users.firstName, users.lastName, users.email, users.password, recipes.title as recipeTitle, ingredients.title as ingredient, ingredients.quantity from users full outer join recipes on users.id = recipes.user_id full outer join recipe_ingredients on recipe_ingredients.recipes_id = recipes.id full outer join ingredients on recipe_ingredients.ingredients_id = ingredients.id where users.id = $1;`, [id]);
    if(dbRes.rowCount > 0){
        res.send(dbRes.rows);
    }else{
        res.sendStatus(404, "User not found");
    }
 })

 // create new user 
 app.post('/api/createUser', async function(req, res){
    const {firstname, lastname, email, password} = req.body;
    const chkEmail = await pool.query(`SELECT * FROM users where email = $1;`, [email]);
    if(chkEmail.rowCount > 0){
        console.log(`User already exists at ${chkEmail.rows}`);
        return res.status(409);
    }else{
        const dbRes = await pool.query(`INSERT INTO users (firstname, lastname, email, "password") VALUES($1, $2, $3, $4);`, [firstname, lastname, email, password]);
        res.send(dbRes.rows);
    }
 })

 // create new recipt 
 app.post('/api/createRecipe', async function(req, res){
    const {title, description, publisher, source_url, image_url, social_rank, publisher_url, user_id, ingName, quantity} = req.body;

    try{

        await pool.query('BEGIN;');
    
        const dbRes = await pool.query(`INSERT INTO public.recipes (title, description, publisher, source_url, image_url, social_rank, publisher_url, user_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8) Returning id;`, [title, description, publisher, source_url, image_url, social_rank, publisher_url, user_id])
        
        const rescipeId = dbRes.rows[0].id;
        
        const addIngredient = await pool.query(`INSERT INTO public.ingredients (title, quantity) VALUES($1, $2) Returning id;`, [ingName, quantity])
        const ingId = addIngredient.rows[0].id;
    
        // const junctionTable = await pool.query(`INSERT INTO public.recipe_ingredients (recipes_id, ingredients_id) VALUES($1, $2);`, [title, ingName])
        const junctionTable = await pool.query(`INSERT INTO public.recipe_ingredients (recipes_id, ingredients_id) VALUES($1, $2);`, [rescipeId, ingId])
    
        await pool.query('COMMIT');
        res.sendStatus(200, "The Recipe has been created successfuly");
    }catch(err){
        await pool.query('ROOLBACK');
        console.log("Failed to upload the new recipe!");
    }
})

// set bookmark
app.post('api/bookmarks', async function(req, res){
    const {recipeId, userId} = req.body;
    await pool.query(`INSERT INTO public.bookmarks (recipe_id, user_id) VALUES($1, $2);`, [recipeId, userId]);
    res.sendStatus(200, "The bookmark has been addedd");
})

// get bookmark
app.get('api/bookmarks:id', async function(req, res){
    const userId = req.params.id;
    const dbRes = await pool.query(`recipe_id FROM public.bookmarks where user_id = $1;`, [userId]);
    res.send(dbRes.rows);  
})



app.listen(3000, function(){
    console.log("The port is listning at port 3000");
})