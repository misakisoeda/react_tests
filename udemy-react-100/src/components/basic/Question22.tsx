import { useRef, useState } from 'react';

type InputTypes = HTMLInputElement;

type FileData = {
  name: string;
  size: number;
  type: string;
};

type SubmittedData = { name: string; email: string; file?: FileData };

function UncontrolledForm() {
  const nameRef = useRef<InputTypes | null>(null);
  const emailRef = useRef<InputTypes | null>(null);
  const fileRef = useRef<InputTypes | null>(null);
  const [submittedData, setSubmittedData] = useState<SubmittedData | null>(null);
  const [fileName, setFileName] = useState('');

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    // refから値を取得
    const name = nameRef.current?.value ?? '';
    const email = emailRef.current?.value ?? '';
    const selectedFile = fileRef.current?.files?.[0];
    const file = selectedFile
      ? { name: selectedFile.name, size: selectedFile.size, type: selectedFile.type }
      : undefined;

    setSubmittedData({ name, email, file });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // ファイル選択処理
    const file = e.target.files?.[0];
    setFileName(file?.name ?? '');
  };

  const focusFirstEmpty = () => {
    // 最初の空フィールドにフォーカス
    if (nameRef.current && nameRef.current.value.trim() === '') {
      nameRef.current.focus();
      return;
    }
    if (emailRef.current && emailRef.current.value.trim() === '') {
      emailRef.current.focus();
      return;
    }
    // ここまで来たら両方埋まってる
    alert('全ての入力フィールドが入力されています');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>名前:</label>
          <input ref={nameRef} type="text" />
        </div>

        <div>
          <label>メール:</label>
          <input ref={emailRef} type="email" />
        </div>

        <div>
          <label>ファイル:</label>
          <input
            ref={fileRef}
            type="file"
            onChange={handleFileChange}
          />
          {fileName && <p>選択: {fileName}</p>}
        </div>

        <button type="submit">送信</button>
        <button type="button" onClick={focusFirstEmpty}>
          空欄にフォーカス
        </button>
      </form>

      {submittedData && (
        <div>
          <h4>送信データ:</h4>
          <pre>{JSON.stringify(submittedData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default UncontrolledForm;
