import { useState } from 'react';

function RegistrationForm() {
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [age, setAge] = useState(0);

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleMailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMail(e.target.value);
  };

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAge(Number(e.target.value));
  };

  const clearButton = () => {
    setName('');
    setMail('');
    setAge(0);
    setSubmitted(false);
  };

  return (
	<div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={handleNameChange} />
        <input type="email" value={mail} onChange={handleMailChange} />
        <input type="number" value={age} onChange={handleAgeChange} />
        <button type="submit">送信</button>
        <button type="button" onClick={clearButton}>クリア</button>
      </form>
      {submitted && (
        <div>
          <h2>送信されたデータ:</h2>
          <p>名前: {name}</p>
          <p>メール: {mail}</p>
          <p>年齢: {age}</p>
        </div>
      )}
    </div>
  );
}

export default RegistrationForm;
