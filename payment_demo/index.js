'use strict'

// Post data when form is submitted

const form = document.getElementById('first_form');
form.addEventListener('submit', (evt) => {
  submitForm();
  evt.preventDefault();
  console.log(evt);
});

//
const submitForm = async function() {
 // Get data from query string
 const queryParams = new URLSearchParams(document.location.search);
 const userId = queryParams.get('userId');
 const conversationId = queryParams.get('convId');
 const botId = queryParams.get('botId');

 console.log('userid '+userId);
  console.log('userid '+conversationId);
   console.log('userid '+botId);

 ///Item seleccionado
 const mainItem1 = document.getElementById('gr1').checked;
 const mainItem2 = document.getElementById('gr2').checked;
 const mainItem3 = document.getElementById('gr3').checked;
 const mainItem4 = document.getElementById('gr4').checked;
 console.log(mainItem1+' '+mainItem2);
var itemSelected = null;
if(mainItem1){
  itemSelected = '7 piezas';
}else if(mainItem2){
  itemSelected = '10 piezas';
}else if(mainItem3){
  itemSelected = '12 piezas';
}else if(mainItem4){
  itemSelected = '15 piezas';
}else{
  console.log('valor no seleccionado');
}


//
 const checkBox1 = document.getElementById('chk1').checked;
 const checkBox2 = document.getElementById('chk2').checked;
 const checkBox3 = document.getElementById('chk3').checked;
 const checkBox4 = document.getElementById('chk4').checked;
 const checkBox5 = document.getElementById('chk5').checked;
 const checkBox6 = document.getElementById('chk6').checked;
 const checkBox7 = document.getElementById('chk7').checked;
 const checkBox8 = document.getElementById('chk8').checked;
 const checkBox9 = document.getElementById('chk9').checked;


var itemSelected_c=[];
if(checkBox1){
  itemSelected_c.push('sopa de arroz');
}
if(checkBox2){
  itemSelected_c.push('ensalada de col');
}
if(checkBox3){
  itemSelected_c.push('ensalada codito');
}
if(checkBox4){
  itemSelected_c.push('puré de papa');
}
if(checkBox5){
  itemSelected_c.push('frijoles charros');
}
if(checkBox6){
  itemSelected_c.push('ensalada americana');
}
if(checkBox7){
  itemSelected_c.push('ensalada fresca');
}
if(checkBox8){
  itemSelected_c.push('frijoles refritos');
}
if(checkBox9){
  itemSelected_c.push('papas francesa');
}


 console.log('item selected: '+itemSelected_c);

////////////////////////////////////////////////////////////////////////////////

const checkBox_a1 = document.getElementById('chk_m1').checked;
const checkBox_b2 = document.getElementById('chk_m2').checked;
const checkBox_c3 = document.getElementById('chk_m3').checked;

var itemSelected_m=[];
if(checkBox_a1){
  itemSelected_m.push('quesadillas');
}
if(checkBox_b2){
  itemSelected_m.push('nuggets');
}
if(checkBox_c3){
  itemSelected_m.push('tacos dorados');
}
console.log('item selected: '+itemSelected_m);

 // use correct domain for your region
 const domain = 'lo.bc-intg.liveperson.net/thirdparty-services-0.1/webview';
  // encode auth string
 const authString = `${conversationId} || ${botId}`;
 const auth = await sha256(authString);

 const res = await postData(domain, auth, {
   botId,
   conversationId,
   userId,
   message: "request successful", // optional
   contextVariables: [
     {"name": "name", "value": name},
     {"name": "color", "value": color},
     {"name": "swallow", "value": swallow}
   ],
 });
}
