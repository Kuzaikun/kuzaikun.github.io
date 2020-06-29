////Esta es tu clase padre
class Vehiculo{
  constructor(matricula,modelo) {
    this.matricula = '666';
    this.modelo = 'Carrera de a 5';
  }
  get getModelo(){
    return this.modelo;
  }

  get getMatricula(){
    return this.matricula;
  }

}

class Autobus extends Vehiculo{
  constructor(){
    super();
  }

  get getNumeroPlazas(){
    return this.numeroPlazas;
  }

  set setNumeroplazas(numeroPlazas){
    this.numeroPlazas=numeroPlazas;
  }
}

//const carrito=new Vehiculo('293-SUFU','Tesla Roadstar');
const carreraDeACinco=new Autobus();
carreraDeACinco.setNumeroplazas='49';
console.log('P '+carreraDeACinco.getNumeroPlazas+' MODELO'+carreraDeACinco.getModelo+' PLACAS'+carreraDeACinco.getMatricula);
