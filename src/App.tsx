import { useState } from 'react'
import './App.css'

function App() {
  const [answer, setAnswer] = useState("0");
  const [expression, setExpression] = useState("");
  const et = expression.trim();

  const handleButton = (symbol: string) => {
    //Funcion principal que controla los botones y operadores presionados
    if (symbol === "clear") {
      handleClear();
    } else if (checkOperator(symbol)) {
      handleOperator(symbol);
    } else if (symbol === "=") {
      calculateExpression();
    } else if (symbol === "0") {
      if (expression.charAt(0) !== "0") {
        setExpression(expression + symbol);
      }
    } else if (symbol === ".") {
      handleDecimal(symbol);
    } else {
      if (expression.charAt(0) === "0") {
        setExpression(expression.slice(1) + symbol);
      } else {
        setExpression(expression + symbol);
      }
    }
  };

  const calculateExpression = () => {
    //Si el ultimo caracter es un operador, no ejecuta la funcion
    if (checkOperator(et.charAt(et.length - 1))) return;
    //Limpia la expresion para que dos operadores en una fila usen el ultimo operador
    //Ejemplo: 5 * - + 5 = 10
    const parts = et.split(" ");
    const newParts = [];

    //Recorre la expresion matematica en reversa y crea arreglo con operaciones ordenadas de forma descendente
    for (let i = parts.length - 1; i >= 0; i--) {
      if (["*", "/", "+"].includes(parts[i]) && checkOperator(parts[i - 1])) {
        newParts.unshift(parts[i]);
        let j = 0;
        let k = i - 1;
        while (checkOperator(parts[k])) {
          k--;
          j++;
        }
        i -= j;
      } else {
        newParts.unshift(parts[i]);
      }
    }

    const newExpression = newParts.join(" ");
    if (checkOperator(newExpression.charAt(0))) {
      setAnswer(eval(answer + newExpression) as string);
    } else {
      setAnswer(eval(newExpression) as string);
    }
    setExpression("");
  };
  
  const checkOperator = (symbol: string) => {
    //Verifica que los operadores sean validos
    return /[*/+-]/.test(symbol);
  };

  const handleOperator = (symbol: string) => {
    setExpression(et + " " + symbol + " ");
  }

  const handleDecimal = (symbol: string) => {
    //Separa los operadores para obtener el ultimo caracter
    const lastNumber = expression.split(/[-+/*]/g).pop();
    if (!lastNumber) return;
    
    //Si el ultimo numero ya tiene un decimal, no agrega otro punto
    if (lastNumber?.includes(".")) return;
    setExpression(expression + symbol);
  }

  const handleClear = () => {
    //Limpia la pantalla
    setAnswer("");
    setExpression("0");
  }

  return (
      <div className="container">
        
        <div className="calculator">
          <h2 id="title" className="row">Javascript Calculator</h2>
          <div id="display" className="display">
            <div id="expression" className="expression">{expression}</div>
            <div id="answer" className="answer">{answer}</div>
          </div>
          <button id="clear" className="row" onClick={() => handleButton("clear")}>AC</button>
          <button id="seven" onClick={() => handleButton("7")}>7</button>
          <button id="eight" onClick={() => handleButton("8")}>8</button>
          <button id="nine" onClick={() => handleButton("9")}>9</button>
          <button id="multiply" onClick={() => handleButton("*")}>*</button>
          <button id="four" onClick={() => handleButton("4")}>4</button>
          <button id="five" onClick={() => handleButton("5")}>5</button>
          <button id="six" onClick={() => handleButton("6")}>6</button>
          <button id="divide" onClick={() => handleButton("/")}>/</button>
          <button id="one" onClick={() => handleButton("1")}>1</button>
          <button id="two" onClick={() => handleButton("2")}>2</button>
          <button id="three" onClick={() => handleButton("3")}>3</button>
          <button id="add" onClick={() => handleButton("+")}>+</button>
          <button id="zero" onClick={() => handleButton("0")}>0</button>
          <button id="decimal" onClick={() => handleButton(".")}>.</button>
          <button id="equals" onClick={() => handleButton("=")}>=</button>
          <button id="subtract" onClick={() => handleButton("-")}>-</button>
        </div>
      </div>
  )
}

export default App
