import _ from 'lodash';
import Polynomial from 'polynomial';
import Katex from 'katex';
import React from 'react';
import ReactDOM from 'react-dom';

class DivisionProblem extends React.Component {
  constructor(props) {
    super(props);

    let dividend = new Polynomial(this.props.dividend);
    let divisor = new Polynomial(this.props.divisor);

    this.state = {
      dividend: dividend,
      divisor: divisor,
      result: dividend.div(divisor)
    };
  }

  render() {
    return <div style={{width: 100}}>
      <table>
        <tbody>
          <tr>
            <td></td>
            <td>{this.renderResult()}</td>
          </tr>
          <tr>
            <td>{this.renderDivisor()}</td>
            <td>{this.renderDividend()}</td>
          </tr>
        </tbody>
      </table>
    </div>
  }

  toHTML(p) {
    // Renders a Polynomial object to a string tree of DOM elements.
    // We need to render it reversed
    console.log(p.toLatex());
    let reversed = this.reversePolynomialString(p.toLatex());
    return Katex.renderToString(reversed); 
  }

  reversePolynomialString(s) {
    // e.g. rps('x^2-3x+8') === '8-3x+x^2'
    // e.g. rps('x-1') === '-1+x'
    let splits = s.split(/([\+-])/);
    if (splits.length % 2 === 1){
      splits.unshift('+');
    }
    let chunks = _.chunk(splits, 2);
    let reversed = _.flatten(chunks.reverse());
    if (reversed[0] === "+"){
      reversed.shift();
    }
    return reversed.join('');
  }

  renderResult() {
    return <span
      style={{marginLeft: 6}}
      dangerouslySetInnerHTML={{__html: this.toHTML(this.state.result) }}
    />
  }

  renderDivisor() {
    return <span
      style={{color: 'red'}}
      dangerouslySetInnerHTML={{__html: this.toHTML(this.state.divisor) }}
    />
  }

  renderDividend() {
    return <span
      style={{color: 'green', borderLeft: '1px solid black', borderTop: '1px solid black', paddingLeft: 1, paddingTop: 5, marginLeft: 4}}
      dangerouslySetInnerHTML={{__html: this.toHTML(this.state.dividend) }}
    />
  }
}

ReactDOM.render(<DivisionProblem dividend="x^3+3x^2+3x+1" divisor="x+1"/>, document.getElementById("main"));
