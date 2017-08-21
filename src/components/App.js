import React, {Component} from 'react';
import Histogram from './Histogram'
import Nouislider from 'react-nouislider';

//Componentes
import PropertiesScreen from '../containers/PropertiesScreen';
var d3 = require('d3');

export default class App extends Component {
  constructor(){
    super()
    console.log('ESTAS EN EL CONSTRUCTOR DE APP.js')
    var starter_nums = [
    0,1,1,2,3,3,3,3,4,4,4,4,4,5,5,15,15,15,
    5,5,5,5,6,6,6,6,6,7,8,7,8,8,9,12,12,0,11,19
    ]
    this.state = {
      text: starter_nums.join(','),
      min_value: 0,
      max_value: 100
    };
  }

  getNumbers(){
    var numbers = this.state.text.split(','),
    data = [];

    numbers.forEach(function(n){
      var num = parseFloat(n);
      if(!isNaN(num)) data.push(num);
    });

    return data;
  }

  getValues(e){
    console.log("ESTAS EN GET VALUE");
    console.log(e[0]);
    console.log(e[1]);
    console.log(this.state);
    this.setState({
       min_value: e[0],
       max_value: e[1]
     })
  }

  render() {
    var data = this.getNumbers();
    var maxvalue = Math.max.apply(null, data);

    return(
      <div className="algo">
       <h2>Este es el elemento</h2>
       <Histogram data={data} />
       <div className= "esslider">
        <Nouislider
          range={
            {
             min: [0],
             max: maxvalue
           }
          }
          start={[this.state.min_value, this.state.max_value]}
          //onChange={array => {console.log(array)}}
          onChange={e => this.getValues(e)}
        />
      </div>
      <h2>Valor Minimo: {this.state.min_value}</h2>
      <h2>Valor Maximo: {this.state.max_value}</h2>

      <PropertiesScreen />
     </div>
   );
  }
}
