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

// 7 - Endpoint para excluir uma conta
const remove = async (req, res) => {
  const account = req.body;

  try {
    let deleteAccount = await validateAccount(account);

    await Account.findByIdAndRemove({ _id: deleteAccount._id });

    deleteAccount = await Account.find({
      agencia: deleteAccount.agencia,
    }).countDocuments();

    res.send({ totalAccounts: deleteAccount });
  } catch (error) {
    res.status(500).send('Error when excluding a account ' + error);
  }
};

// 8 - Crie um endpoint para realizar transferências entre contas.
const transfer = async (req, res) => {
  const account = req.body;
  const transferMoney = account.valor;

  try {
    let sourceAccount = await getAccount({ conta: account.contaOrigem });
    let targetAccount = await getAccount({ conta: account.contaDestino });

    //Valida cobranca de taxa para transferencia
    if (sourceAccount.agencia !== targetAccount.agencia) {
      sourceAccount.balance -= 8;
    }

    //Subtrai do saldo da conta origem o valor da transferencia
    sourceAccount.balance -= transferMoney;

    //Valida saldo da conta origem antes de concluir transacao
    if (sourceAccount.balance < 0) {
      throw new Error('Saldo insuficiente para efetuar a transferencia');
    }

    //Deposita o valor da tranferencia na conta de destino
    targetAccount.balance += transferMoney;

    //Salva as alteracoes conta origem
    sourceAccount = new Account(sourceAccount);
    await sourceAccount.save();

    //Salva as alteracoes conta destino
    targetAccount = new Account(targetAccount);
    await targetAccount.save();

    //Retorna a conta origem com saldo atualizado
    res.send(sourceAccount);
  } catch (error) {
    res.status(500).send('Erro ao realizar transferencia ' + error);
  }
};
//9. Crie um endpoint obter a media de saldo de uma agencia.
const avgBalance = async (req, res) => {
  const agencia = req.params.agencia;

  try {
    const averageBalance = await Account.aggregate([
      {
        $match: {
          agencia: parseInt(agencia),
        },
      },
      {
        $group: {
          _id: '$agencia',
          media: {
            $avg: '$balance',
          },
        },
      },
      {
        $project: {
          _id: 0,
          media: 1,
        },
      },
    ]);

    if (averageBalance.length === 0) {
      throw new Error('Agencia nao encontrada');
    }
    res.send(averageBalance);
  } catch (error) {
    res.status(500).send('Erro ao obter saldo medio da Agencia ' + error);
  }
};
// 10. Crie um endpoint para consultar os clientes com menor saldo.
const topByBalanceLowest = async (req, res) => {
  const limit = req.params.limit;

  try {
    const account = await Account.find(
      {},
      { _id: 0, agencia: 1, conta: 1, balance: 1 }
    )
      .limit(parseInt(limit))
      .sort({ saldo: 1 });
    if (account.length === 0) {
      throw new Error('Nenhum cliente encontrado');
    }
    res.send(account);
  } catch (error) {
    res.status(500).send('Erro ao obter lista de clientes ' + error);
  }
};
// 11. Crie um endpoint para consultar os clientes com maior saldo.
const topByBalanceHighest = async (req, res) => {
  const limit = req.params.limit;

  try {
    const account = await Account.find(
      {},
      { _id: 0, agencia: 1, conta: 1, nome: 1, balance: 1 }
    )
      .limit(parseInt(limit))
      .sort({ saldo: -1, nome: 1 });
    if (account.length === 0) {
      throw new Error('Nenhum cliente encontrado');
    }
    res.send(account);
  } catch (error) {
    res.status(500).send('Erro ao obter lista de clientes ' + error);
  }
};
// 12. Crie um endpoint que irá transferir o cliente com maior saldo em conta de cada agência para a agência private agencia=99.
const transferToPrivate = async (req, res) => {
  try {
    let transferToPrivates = await Account.aggregate([
      {
        $group: {
          _id: '$agencia',
          balance: { $max: '$balance' },
        },
      },
    ]);

    for (const transferToPrivate of transferToPrivates) {
      const { _id, balance } = transferToPrivate;
      let newAccount = await Account.findOne({
        agencia: _id,
        balance,
      });
      newAccount.agencia = 99;
      newAccount.save();
    }
    transferToPrivates = await Account.find({
      agencia: 99,
    });
    res.send(transferToPrivates);
  } catch (error) {
    res
      .status(500)
      .send('Erro transferir clientes para a conta privada' + error);
  }
};
