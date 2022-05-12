import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

const rewards = [];

app.post('/rewards', (req, res) => {
  console.log(req.body);

  const body = req.body;

  if (body.reward_value <= 0) {
    res.status(400).send({
      message: 'O valor da recompensa deve ser um valor positivo'
    });
  }

  const newReward = {
    id: rewards.length + 1,
    ...body
  }

  rewards.push(newReward);

  res.status(200).send({
    message: 'Desafio criado com sucesso',
    reward: newReward,
  });
});


app.get('/rewards', (_, res) => {
  res.status(201).send(rewards);
});

app.get('/rewards/:id', (req, res) => {
  const id = req.params.id;

  const reward = rewards.find((r) => r.id == id);

  if (!reward) {
    res.status(404).send({
      message: `O reward com o id ${id} não foi encontrado`,
    });

    return;
  }

  res.status(201).send({
    reward,
  });
});