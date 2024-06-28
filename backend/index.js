import express from 'express';
import pool from './db.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import multer from 'multer';

const app = express();
// const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());
const privateKey = '4209211'
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Login function
app.post('/api/login', async function (req, res) {
    const { email, password } = req.body;
    const dbRes = await pool.query(`select * from users where email = $1 and "password" = $2;`, [email, password]);

    jwt.sign({ email }, privateKey, function (err, token) {
        res.json({
            token,
            id: dbRes.rows[0].id,
            firstName: dbRes.rows[0].firstname,
            lastName: dbRes.rows[0].lastname,
        })
    });
})

// AUTHINTICATION FUNCTION
function authinticate(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        throw new Error("Token has not been")
    }

    jwt.verify(token, privateKey, function (err, decoded) {
        if (err) {
            res.sendStatus(401);
        } else {
            next();
        }
    });
}

// GET ALL USERS
app.get('/api/users', authinticate, async function (req, res) {
    const dbRes = await pool.query('select users.id, users.firstName, users.lastName, users.email, users.password, recipes.title as recipeTitle, ingredients.title as ingredient, ingredients.quantity from users full outer join recipes on users.id = recipes.user_id full outer join recipe_ingredients on recipe_ingredients.recipes_id = recipes.id full outer join ingredients on recipe_ingredients.ingredients_id = ingredients.id;');
    res.send(dbRes.rows);
})

// GET IND USER
app.get('/api/user/:id', authinticate, async function (req, res) {
    const id = req.params.id;
    const dbRes = await pool.query(`select users.id, users.firstName, users.lastName, users.email, users.password, recipes.title as recipeTitle, ingredients.title as ingredient, ingredients.quantity from users full outer join recipes on users.id = recipes.user_id full outer join recipe_ingredients on recipe_ingredients.recipes_id = recipes.id full outer join ingredients on recipe_ingredients.ingredients_id = ingredients.id where users.id = $1;`, [id]);
    if (dbRes.rowCount > 0) {
        res.send(dbRes.rows);
    } else {
        res.sendStatus(404, "User not found");
    }
})

// create new user 
app.post('/api/createUser', authinticate, async function (req, res) {
    const { firstname, lastname, email, password } = req.body;
    const chkEmail = await pool.query(`SELECT * FROM users where email = $1;`, [email]);
    if (chkEmail.rowCount > 0) {
        console.log(`User already exists at ${chkEmail.rows}`);
        return res.status(409);
    } else {
        const dbRes = await pool.query(`INSERT INTO users (firstname, lastname, email, "password") VALUES($1, $2, $3, $4);`, [firstname, lastname, email, password]);
        res.send(dbRes.rows);
    }
})

// create new recipe 
app.post('/api/createRecipe', [authinticate, upload.single('image_data')], async function (req, res) {

    const { title, description, publisher, ingredientsArr, user_id } = req.body;

    let buffer, mimetype;
    if (req.file) {
        buffer = req.file.buffer;
        mimetype = req.file.mimetype;
    }
    console.log(buffer);

    try {
        const dbRes = await pool.query(`INSERT INTO public.recipes (title, description, publisher, image_data, mimetype, ingredientsArr, user_id) VALUES($1, $2, $3, $4, $5, $6, $7);`, [title, description, publisher, buffer, mimetype, ingredientsArr, user_id]);
        res.status(200).send("The Recipe has been created successfuly");
    } catch (err) {
        console.log("Failed to upload the new recipe!", err);
        res.status(500).send('Server Error');
    }
})

// Search the recipe from the database
    app.get('/api/recipe/:recipeTitle', async function(req, res){
        console.log('This is the endpoint');
        const recipeTitle =  req.params.recipeTitle;
        console.log(recipeTitle);
        try{
            const dbRes = await pool.query(`SELECT id, title, description, publisher, image_data, mimetype, ingredientsarr, user_id
FROM public.recipes where recipes.title ILIKE $1;`, [`${recipeTitle}`]);
            // res.sendStatus(200).send(dbRes.rows[0]);
            const recipe = dbRes.rows[0];
            res.setHeader('Content-Type', recipe.mimetype);
            res.send({...recipe, image_data: recipe.image_data.toString('base64')});
            // res.send(image.image_data);
        }
        catch(err){
            console.log(err);
        }
    })


// set bookmark
app.post('api/bookmarks', authinticate, async function (req, res) {
    const { recipeId, userId } = req.body;
    await pool.query(`INSERT INTO public.bookmarks (recipe_id, user_id) VALUES($1, $2);`, [recipeId, userId]);
    res.sendStatus(200, "The bookmark has been addedd");
})

// get bookmark
app.get('api/bookmarks:id', authinticate, async function (req, res) {
    const userId = req.params.id;
    const dbRes = await pool.query(`select recipe_id FROM public.bookmarks where user_id = $1;`, [userId]);
    res.send(dbRes.rows);
})

app.listen(3000, function () {
    console.log("The port is listning at port 3000");
})