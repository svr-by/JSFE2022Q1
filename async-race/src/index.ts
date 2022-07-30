import './styles/style.scss';
import {
  getCars,
  getCar,
  createCar,
  deleteCar,
  updateCar,
  startEngine,
  stopEngine,
  driveEngine,
  getWinners,
  getWinner,
  createWinner,
  updateWinner,
} from './components/API';

//test getCars
const btn1 = document.getElementById('btn1');
btn1?.addEventListener('click', async () => {
  console.log('btn1 click');
  const data = await getCars(1);
  console.log(data.items, `Total cars: ${data.count}`);
});

//test getCar
const input1 = document.getElementById('input1') as HTMLInputElement;
const btn2 = document.getElementById('btn2');
btn2?.addEventListener('click', async () => {
  console.log('btn2 click', input1.value);
  const data = await getCar(+input1.value);
  console.log(data);
});

//test createCar
const input2 = document.getElementById('input2') as HTMLInputElement;
const input3 = document.getElementById('input3') as HTMLInputElement;
const btn3 = document.getElementById('btn3');
btn3?.addEventListener('click', async () => {
  console.log('btn3 click', input2.value, input3.value);
  const body = {
    name: input2.value,
    color: input3.value,
  };
  const data = await createCar(body);
  console.log(data);
});

//test deleteCar
const input4 = document.getElementById('input4') as HTMLInputElement;
const btn4 = document.getElementById('btn4');
btn4?.addEventListener('click', async () => {
  console.log('btn4 click', input4.value);
  const data = await deleteCar(+input4.value);
  console.log(data);
});

//test updateCar
const input5id = document.getElementById('input5') as HTMLInputElement;
const input6name = document.getElementById('input6') as HTMLInputElement;
const input7col = document.getElementById('input7') as HTMLInputElement;
const btn5 = document.getElementById('btn5');
btn5?.addEventListener('click', async () => {
  console.log('btn5 click', input5id.value, input6name.value, input7col.value);
  const body = {
    name: input6name.value,
    color: input7col.value,
  };
  const data = await updateCar(+input5id.value, body);
  console.log(data);
});

//test start/stop
const btn6start = document.getElementById('btn6');
const btn7stop = document.getElementById('btn7');
const btn8drive = document.getElementById('btn8');
const input8id = document.getElementById('input8') as HTMLInputElement;
btn6start?.addEventListener('click', async () => {
  console.log('btn6start click', input8id.value);
  const data = await startEngine(+input8id.value);
  console.log(data);
});
btn7stop?.addEventListener('click', async () => {
  console.log('btn7stop click', input8id.value);
  const data = await stopEngine(+input8id.value);
  console.log(data);
});
btn8drive?.addEventListener('click', async () => {
  console.log('btn8drive click', input8id.value);
  const data = await driveEngine(+input8id.value);
  console.log(data);
});

//test getWinners
const btn9 = document.getElementById('btn9');
btn9?.addEventListener('click', async () => {
  console.log('btn9 click');
  const data = await getWinners(1);
  console.log(data.items, `Total winners: ${data.count}`);
});

//test getWinner
const input9 = document.getElementById('input9') as HTMLInputElement;
const btn10 = document.getElementById('btn10');
btn10?.addEventListener('click', async () => {
  console.log('btn10 click');
  const data = await getWinner(+input9.value);
  console.log(data);
});

//test createWinner
const input10id = document.getElementById('input10') as HTMLInputElement;
const input11wins = document.getElementById('input11') as HTMLInputElement;
const input12time = document.getElementById('input12') as HTMLInputElement;
const btn11 = document.getElementById('btn11');
btn11?.addEventListener('click', async () => {
  console.log('btn11 click', input10id.value, input11wins.value, input12time.value);
  const body = {
    wins: +input11wins.value,
    time: +input12time.value,
    id: +input10id.value,
  };
  const data = await createWinner(body);
  console.log(data);
});

//test deleteWinner
const input13 = document.getElementById('input13') as HTMLInputElement;
const btn12 = document.getElementById('btn12');
btn12?.addEventListener('click', async () => {
  console.log('btn12 click', input13.value);
  const data = await deleteCar(+input13.value);
  console.log(data);
});

//test updateteWinner
const input14id = document.getElementById('input14') as HTMLInputElement;
const input15wins = document.getElementById('input15') as HTMLInputElement;
const input16time = document.getElementById('input16') as HTMLInputElement;
const btn13 = document.getElementById('btn13');
btn13?.addEventListener('click', async () => {
  console.log('btn13 click', input14id.value, input15wins.value, input16time.value);
  const body = {
    wins: +input15wins.value,
    time: +input16time.value,
  };
  const data = await updateWinner(+input14id.value, body);
  console.log(data);
});
