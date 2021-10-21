const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('My second Nodejs app running thru Nodemon (automatic restart)');
});

/* app.get('/users', (req, res) => {
    res.send({ id: 1, name: 'Nafi Mahmud', email: 'nafiaiubian17@gmail.com' });
}); */

const users = [
    { id: 0, name: 'Nafi Mahmud', email: 'nafiaiubian17@gmail.com', phone: '01869510882' },
    { id: 1, name: 'Rafi Mahmud', email: 'rafiaiubian16@gmail.com', phone: '01769510883' },
    { id: 2, name: 'Safi Mahmud', email: 'safiaiubian15@gmail.com', phone: '01669510884' },
    { id: 3, name: 'Kafi Mahmud', email: 'kafiaiubian14@gmail.com', phone: '01569510885' },
    { id: 4, name: 'Mafi Mahmud', email: 'mafiaiubian13@gmail.com', phone: '01469510886' },
    { id: 5, name: 'Tafi Mahmud', email: 'tafiaiubian12@gmail.com', phone: '01369510887' },
];

/* // send all data
app.get('/users', (req, res) => {
    res.send(users);
}); */


// send data by search (query parameter) using array of objects
app.get('/users', (req, res) => {
    const search = req.query.search;
    if (search) {
        const searchResult = users.filter(user => user.name.toLowerCase().indexOf(search.toLowerCase()) !== -1);
        res.send(searchResult);
    }
    else {
        res.send(users);
    }
    // console.log(req.query.search); // ex: Nafi
});

// send data by specific dynamic id (params) using array of objects
app.get('/users/:uid', (req, res) => {
    const id = req.params.uid;
    const user = users[id];
    res.send(user);
});

app.post('/users', (req, res) => {
    const newUser = req.body;
    newUser.id = users.length;
    users.push(newUser);
    console.log('hitting the post', req.body);
    // res.send(JSON.stringify(newUser));
    // or
    res.json(newUser);
});

// send data using array of string
app.get('/fruits', (req, res) => {
    res.send(['Mangoe', 'Jackfruit', 'Lichi', 'Guava', 'Ananas', 'Grape', 'Orange', 'Banana', 'Apple', 'Papaya']);
});

// nested route
app.get('/fruits/mangoes/fazli', (req, res) => {
    res.send('Yummy Yummy Tok Fazli')
});

app.listen(port, () => {
    console.log('listening on port ' + port);
});