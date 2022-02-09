'use strict'

const formPayment = document.getElementById('form_payment');

formPayment.addEventListener('submit',(evt) => {
  //todo
  setPayment();
  evt.preventDefault();
});

async function setPayment(){
  const queryParams = new URLSearchParams(document.location.search);
  const userId = queryParams.get('userId');
  const convId = queryParams.get('convId');
  const botId = queryParams.get('botId');
  const messagePayment = "Pago generado extiosamente";
  //window.location.href = 'success_message.html';
  //
  const domain = 'lo.bc-intg.liveperson.net/thirdparty-services-0.1/webview';
  const authString = `${convId} || ${botId}`;
  const auth = await sha256(authString);
  const res = await postData(domain, auth, {
    botId,
    convId,
    userId,
    message: 'successful',
    contextVariables : [
      {"name":"messagePayment","value":messagePayment}
    ],
  });

}
