const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID);

const send = (type, config) => {
  switch (type) {
    case 'EXPENSE_CREATED':
      return expenseCreated(config);
    default:
      return;
  }
}

const expenseCreated = config => {
  const msg = {
    to: config.to,
    from: process.env.SENDGRID_FROM,
    subject: 'GASTO generado.',
    html: createTemplateStr(config.body)
  };

  return sgMail.send(msg)
}

const createTemplateStr = (info) => {
  return `
    <h1>Gasto generado</h1>
    <p>Usuario: ${info.username}</p>
    <p>Monto: ${info.amount}</p>
    <p>Descripción: ${info.description}</p>
  `
}

module.exports = {
  send
}