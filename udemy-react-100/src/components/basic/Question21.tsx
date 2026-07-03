import { useState } from 'react';

type FormData = {
  name: string;
  email: string;
  phone: string;
};

type Errors = {
  name?: string;
  email?: string;
  phone?: string;
};

type FieldName = 'name' | 'email' | 'phone';

const MIN_NAME_LENGTH = 2;
const MIN_PHONE_LENGTH = 10;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ERROR_MESSAGE = {
  name: `名前は${MIN_NAME_LENGTH}文字以上で入力してください`,
  email: '有効なメールアドレスを入力してください',
  phone: `電話番号は${MIN_PHONE_LENGTH}文字以上で入力してください`,
};

const validateField = (field: FieldName, value: string): boolean => {
  // バリデーション
  switch (field) {
    case 'name':
      return value.length >= MIN_NAME_LENGTH;
    case 'email':
      return EMAIL_REGEX.test(value);
    case 'phone':
      return value.length >= MIN_PHONE_LENGTH;
    default:
      return true;
  }
}

const getErrorMessage = (field: FieldName): string => {
  return ERROR_MESSAGE[field];
};

function ControlledForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: ''
  });

  const [errors, setErrors] = useState<Errors>({});

  const handleChange = (field: FieldName, value: string) => {
    const processedValue = field === 'phone' ? formatPhoneNumber(value) : value;

    // バリデーション
    if (!validateField(field, processedValue)) {
      const errorMessage = getErrorMessage(field);
      setErrors(prev => ({
        ...prev,
        [field]: errorMessage
      }));
    } else {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }

    // 入力処理とフォーマット
    setFormData(prev => ({
      ...prev,
      [field]: processedValue
    }));
  };

  const formatPhoneNumber = (value: string) => {
    // 電話番号フォーマット（例: 090-1234-5678）
    const numbers = value.replace(/[^\d]/g, ''); // 数字以外を削除
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 7) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
  };

  const fieldNames: FieldName[] = ['name', 'email', 'phone'];

  return (
    <form>
      {fieldNames.map((fieldName) => (
        <div key={fieldName}>
          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
              {fieldName === 'name' && '名前:'}
              {fieldName === 'email' && 'メールアドレス:'}
              {fieldName === 'phone' && '電話番号:'}
              <input
                type="text"
                value={formData[fieldName]}
                onChange={(e) => handleChange(fieldName, e.target.value)}
              />
            </label>
            {errors[fieldName] && (
              <span style={{
                color: "red",
                display: "block",
                fontSize: "12px",
                }}>
                  {errors[fieldName]}
              </span>
            )}
          </div>
        </div>
      ))}

    <div style={{
      marginTop: "20px",
      padding: "15px",
      backgroundColor: "#f5f5f5",
      borderRadius: "4px",
		}}>
        <h4>入力内容:</h4>
        <pre>{JSON.stringify(formData, null, 2)}</pre>
      </div>
    </form>
  );
}

export default ControlledForm;
