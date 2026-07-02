import { useState } from 'react';

type FieldName = 'field1' | 'field2' | 'field3';

// type FieldValues = {
//   field1: string;
//   field2: string;
//   field3: string;
// };
type FieldValues = {
  [key in FieldName]: string;
};

type FieldErrors = {
  [key in FieldName]: string;
};

function FocusBlurEvents() {
  const [focusedField, setFocusedField] = useState<FieldName | null>(null);
  const [values, setValues] = useState<FieldValues>({ field1: '', field2: '', field3: '' });
  const [errors, setErrors] = useState<FieldErrors>({ field1: '', field2: '', field3: '' });

  const handleFocus = (fieldName: FieldName) => {
    setFocusedField(fieldName);
  };

  const handleBlur = (fieldName: FieldName) => {
    setFocusedField(null);

    if (values[fieldName].length > 0 && values[fieldName].length < 3) {
      setErrors(prev => ({
        ...prev,
        [fieldName]: '3文字以上入力してください'
      }));
    } else {
      setErrors(prev => ({
        ...prev,
        [fieldName]: ''
      }));
    }
  };

  const handleChange = (fieldName: FieldName, value: string) => {
    setValues(prev => ({
      ...prev,
      [fieldName]: value
    }));

    if (value.length >= 3) {
      setErrors(prev => ({
        ...prev,
        [fieldName]: ''
      }));
    }
  };

  const isFormValid =
    values.field1.length >= 3 &&
    values.field2.length >= 3 &&
    values.field3.length >= 3;

  const fieldNames: FieldName[] = ['field1', 'field2', 'field3'];

  return (
    <div>
      {fieldNames.map((fieldName) => (
        <div key={fieldName}>
          <div>
            <input
              type="text"
              placeholder="3文字入力"
              style={{
                borderColor: focusedField === fieldName ? 'blue' : '#ccc',
                borderWidth: '2px'
              }}
              value={values[fieldName]}
              onFocus={() => handleFocus(fieldName)}
              onBlur={() => handleBlur(fieldName)}
              onChange={(e) => handleChange(fieldName, e.target.value)}
            />
            {errors[fieldName] && <span style={{ color: 'red' }}>{errors[fieldName]}</span>}
          </div>
        </div>
      ))}

      <button disabled={!isFormValid}
        style={{
          padding: '10px 20px',
          backgroundColor: isFormValid ? '#4CAF50' : '#ccc',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: isFormValid ? 'pointer' : 'not-allowed'
        }}>
        送信
      </button>

    </div>
  );
}

export default FocusBlurEvents;
