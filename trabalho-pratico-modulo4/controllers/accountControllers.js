import { db } from '../models/index.js';

const Account = db.account;

// 4 - Endpoint para registrar depósito em um conta
const deposit = async (req, res) => {
  const account = req.body;

  try {
    let newDeposit = await validateAccount(account);
    newDeposit.balance += account.balance;
    newDeposit = new Account(newDeposit);
    await newDeposit.save();

    res.send(newDeposit);
  } catch (error) {
    res.status(500).send('Error when depositing: ' + error);
  }
};

// 5 - Endpoint para registrar um saque em uma conta
const withdraw = async (req, res) => {
  const account = req.body;

  try {
    let newDrawMoney = await validateAccount(account);

    //valida saldo mais valor do saque antes de efetivar saque de fato (valor + taxa de 1)
    newDrawMoney.balance -= account.balance + 1;
    if (newDrawMoney.balance < 0) {
      newDrawMoney = new Account(newDrawMoney);
      await newDrawMoney.save();
      res.send(newDrawMoney);
    }
  } catch (error) {
    res, status(500).send('Error when withdrawing: ' + error);
  }
};
// 6 - Endpoint para consultar o saldo da conta
const checkbBalance = async (req, res) => {
  const agencia = req.params.agencia;
  const conta = req.params.conta;

  try {
    const checkbBalance = await validateAccount({ agencia, conta });
    res.send(checkbBalance);
  } catch (error) {
    res.status(500).send('Error when consulting balance' + error);
  }
};

// 7 Endpoint para excluir uma conta
