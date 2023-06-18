const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

let expenses = [];
let daily_limit = 0;

app.get('/', (req, res) => {
    res.status(200).json()
})

//создание объекта расхода
app.post('/expenses', (req, res) => {
    const {name, sum, date} = req.body;
    const expense = {
      name,
      sum,
      date: new Date(date)
    };
    expenses.push(expense);
    res.status(201).json(expense);
});

//получение всех трат
app.get('/expenses', (req, res) => {
    res.json(expenses);
});

//поиск трат за конкретный день
app.post('/expenses/date_search', (req, res) => {
    const {date} = req.body;
    const date_for_search = new Date(date).toDateString();
    const date_expenses = expenses.filter((expense) => expense.date.toDateString() === date_for_search);
    res.json(date_expenses);
});

// установка лимита на день
app.post('/expenses/limit', (req, res) => {
    const {new_limit} = req.body;
    daily_limit = new_limit;
    res.sendStatus(200);
});

//получение лимита
app.get('/expenses/limit', (req, res) => {
    res.json({limit: daily_limit});
});

app.use((req, res, next) => {
    next();
})

app.listen(3000, () => {
    console.log('App started!');
})