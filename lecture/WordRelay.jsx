const React = require('react');
const {useState, useRef} = React;

const WordRelay = () => {
    const [word, setWord] = useState('안녕');
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');
    const inputRef = useRef(null);

    const onSubmitForm = (e) => {
        e.preventDefault();
        if (word[word.length - 1] === value[0]) {
            setResult('딩동!');
            setWord(value);
            setValue('');
            inputRef.current.focus();
        } else {
            setResult('땡땡!');
            setValue('');
            inputRef.current.focus();
        }
    };

    const onChangeInput = (e) => {
        setValue(e.currentTarget.value);
    };

    return (
        <>
            <div>{word}</div>
            <form onSubmit={onSubmitForm}>
                <label htmlFor="wordInput">글자입력하슈</label>
                <input className="wordInput" ref={inputRef} value={value} onChange={onChangeInput}/>
                <button>추가!</button>
            </form>
            <div>{result}</div>
        </>
    );
}

module.exports = WordRelay;