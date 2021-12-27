const React = require('react');
const {Component} = React;

class WordRelay extends React.Component {
    state = {
        word : '미소',
        value : '',
        result : '',
    };

    onSubmitForm = (e) => {
        e.preventDefault();
        if (this.state.word[this.state.word.length - 1] === this.state.value[0]) {
            this.setState((prevState) => {
                return {
                    word : this.state.value,
                    value : '',
                    result : '딩동댕!  : ' + prevState.value,
                };
            });
        } else {
            this.setState({
                value : '',
                result : '땡땡땡!!!',
            });
        }
        this.input.focus();
    };

    onChangeInput = (e) => {
        this.setState({value:e.currentTarget.value})
    };

    input;
    onRefInput = (c) => {
        this.input = c;
        this.input.focus();
    };

    render() {
        return (
            <>
                <div>{this.state.word}</div>
                <form onSubmit={this.onSubmitForm}>
                    <input ref={this.onRefInput} value={this.state.value} onChange={this.onChangeInput}/>
                    <button>입력!</button>
                </form>
                <div>{this.state.result}</div>
            </>
        );
    }
}

module.exports = WordRelay;