import { useState } from 'react';

type FormValues = {
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
};

// type Errors = {
//   email?: string;
//   password?: string;
//   confirmPassword?: string;
//   agreeToTerms?: string;
// };
type Errors = Partial<Record<keyof FormValues, string>>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateEmail = (email: string): boolean => EMAIL_REGEX.test(email);

// ラベルと中身を一致させた（前は length に小文字regex等が入っていた）
const PASSWORD_STRENGTH_CRITERIA = {
  length: /.{8,}/, // 8文字以上
  lowercase: /[a-z]/, // 小文字
  uppercase: /[A-Z]/, // 大文字
  digit: /[0-9]/, // 数字
  special: /[^A-Za-z0-9]/, // 特殊文字
};

// 満たした条件の数(0〜5)をそのまま★の数に使う
const checkPasswordStrength = (password: string): number =>
  Object.values(PASSWORD_STRENGTH_CRITERIA).filter((rule) => rule.test(password)).length;

// 有効なパスワードか: 8文字以上 かつ 小文字・大文字・数字を含む
const validatePassword = (password: string): boolean =>
  password.length >= 8 &&
  PASSWORD_STRENGTH_CRITERIA.lowercase.test(password) &&
  PASSWORD_STRENGTH_CRITERIA.uppercase.test(password) &&
  PASSWORD_STRENGTH_CRITERIA.digit.test(password);

const ERROR_MESSAGE = {
  email: {
    required: 'メールアドレスは必須です',
    invalid: '無効なメールアドレスです',
  },
  password: {
    required: 'パスワードは8文字以上で、大文字、小文字、数字を含める必要があります',
    length: 'パスワードは8文字以上である必要があります',
    complexity: 'パスワードは大文字、小文字、数字を含める必要があります',
  },
  confirmPassword: {
    required: 'パスワード確認は必須です',
    mismatch: 'パスワードが一致しません',
  },
  agreeToTerms: '利用規約に同意する必要があります',
} as const;

function FormValidation() {
  const [formData, setFormData] = useState<FormValues>({
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [errors, setErrors] = useState<Errors>({});
  const [passwordStrength, setPasswordStrength] = useState(0);

  const validateForm = () => {
    // フォーム全体の検証
    const newErrors: Errors = {};

    if (!validateEmail(formData.email)) {
      newErrors.email = ERROR_MESSAGE.email.invalid;
    }
    if (!validatePassword(formData.password)) {
      newErrors.password = ERROR_MESSAGE.password.required;
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = ERROR_MESSAGE.confirmPassword.mismatch;
    }
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = ERROR_MESSAGE.agreeToTerms;
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      alert('フォームが正常に送信されました');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setFormData(prev => ({
      ...prev,                                    // ① 既存の値を保持
      [name]: type === 'checkbox' ? checked : value,  // ② 変わった1つだけ上書き
    }));

    // リアルタイム検証: 有効なら undefined(消える)、無効ならメッセージ。
    // 判定は state(古い)ではなくイベントの value/checked を使う。
    setErrors(prev => {
      const newErrors = { ...prev };
      if (name === 'email') {
        newErrors.email = validateEmail(value) ? undefined : ERROR_MESSAGE.email.invalid;
      }
      if (name === 'password') {
        newErrors.password = validatePassword(value) ? undefined : ERROR_MESSAGE.password.required;
        // password が変わると確認欄の一致状態も変わるので再判定（確認欄入力済みのときだけ）
        if (formData.confirmPassword) {
          newErrors.confirmPassword =
            formData.confirmPassword === value ? undefined : ERROR_MESSAGE.confirmPassword.mismatch;
        }
      }
      if (name === 'confirmPassword') {
        newErrors.confirmPassword =
          value === formData.password ? undefined : ERROR_MESSAGE.confirmPassword.mismatch;
      }
      if (name === 'agreeToTerms') {
        newErrors.agreeToTerms = checked ? undefined : ERROR_MESSAGE.agreeToTerms;
      }
      return newErrors;
    });

    if (name === 'password') {
      setPasswordStrength(checkPasswordStrength(value));
    }
  };

  const isFormValid =
    validateEmail(formData.email) &&
    validatePassword(formData.password) &&
    formData.password === formData.confirmPassword &&
    formData.agreeToTerms;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>メールアドレス:</label>
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>

      <div>
        <label>パスワード:</label>
        <input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
        />
        <div className="password-strength">
          強度: {'★'.repeat(passwordStrength)}{'☆'.repeat(5 - passwordStrength)}
        </div>
        {errors.password && <span className="error">{errors.password}</span>}
      </div>

      <div>
        <label>パスワード確認:</label>
        <input
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
      </div>

      <div>
        <label>利用規約に同意:</label>
        <input
          name="agreeToTerms"
          type="checkbox"
          checked={formData.agreeToTerms}
          onChange={handleChange}
        />
        {errors.agreeToTerms && <span className="error">{errors.agreeToTerms}</span>}
      </div>

      <button type="submit" disabled={!isFormValid}>
        登録
      </button>
    </form>
  );
}

export default FormValidation;
