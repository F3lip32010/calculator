import React, { Component } from 'react';
import './Calculator.css';

import Button from '../components/Button';
import Display from '../components/Display';

const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0
};

export default class Calculator extends Component {
    state = { ...initialState };

    clearMemory() {
        this.setState({ ...initialState });
    }

    setOperation(operation) {
        if (operation === '=') {
            this.calculate();
            return;
        }

        const { current, values, displayValue, operation: currentOperation } = this.state;
        const clearDisplay = current === 0 && !isNaN(displayValue);
        if (current === 0 || clearDisplay) {
            const newDisplayValue = clearDisplay ? '' : displayValue;
            const newCurrent = current === 0 ? 1 : 0;
            const newOperation = current === 0 ? operation : currentOperation;

            this.setState({
                displayValue: newDisplayValue,
                operation: newOperation,
                current: newCurrent,
                clearDisplay: true
            });

            if (!isNaN(displayValue)) {
                const newValue = parseFloat(displayValue);
                const newValues = [...values];
                newValues[current] = newValue;
                this.setState({ values: newValues });
            }
        }
    }

    calculate() {
        const { values, operation } = this.state;
        const [value1, value2] = values;
        let result = 0;

        switch (operation) {
            case '+':
                result = value1 + value2;
                break;
            case '-':
                result = value1 - value2;
                break;
            case '*':
                result = value1 * value2;
                break;
            case '/':
                result = value1 / value2;
                break;
            default:
                return;
        }

        result = parseFloat(result.toFixed(8)); // Limitando a 8 casas decimais
        const newValues = [result, 0];

        this.setState({
            displayValue: String(result),
            operation: null,
            current: 0,
            clearDisplay: true,
            values: newValues
        });
    }

    addDigit(n) {
        if (n === '.' && this.state.displayValue.includes('.')) {
            return;
        }

        const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay;
        const currentValue = clearDisplay ? '' : this.state.displayValue;
        const displayValue = currentValue + n;

        this.setState({ displayValue, clearDisplay: false });

        if (n !== '.') {
            const i = this.state.current;
            const newValue = parseFloat(displayValue);
            const newValues = [...this.state.values];
            newValues[i] = newValue;
            this.setState({ values: newValues });
        }
    }

    render() {
        return (
            <div className='calculator'>
                <Display value={this.state.displayValue} />
                <Button label="AC" click={() => this.clearMemory()} triple />
                <Button label="/" click={() => this.setOperation('/')} operation />
                <Button label="7" click={() => this.addDigit(7)} />
                <Button label="8" click={() => this.addDigit(8)} />
                <Button label="9" click={() => this.addDigit(9)} />
                <Button label="*" click={() => this.setOperation('*')} operation />
                <Button label="4" click={() => this.addDigit(4)} />
                <Button label="5" click={() => this.addDigit(5)} />
                <Button label="6" click={() => this.addDigit(6)} />
                <Button label="-" click={() => this.setOperation('-')} operation />
                <Button label="1" click={() => this.addDigit(1)} />
                <Button label="2" click={() => this.addDigit(2)} />
                <Button label="3" click={() => this.addDigit(3)} />
                <Button label="+" click={() => this.setOperation('+')} operation />
                <Button label="0" click={() => this.addDigit(0)} double />
                <Button label="." click={() => this.addDigit('.')} />
                <Button label="=" click={() => this.setOperation('=')} operation />
            </div>
        );
    }
}
