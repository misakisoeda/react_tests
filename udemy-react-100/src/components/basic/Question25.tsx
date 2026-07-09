import { useState } from 'react';

type FormValues = {
  name: string;
  email: string;
  address: string;
  phone: string;
};

type Errors = Partial<Record<keyof FormValues, string>>;

type Step = 1 | 2 | 3;

function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [formData, setFormData] = useState<FormValues>({
    // Step 1
    name: '',
    email: '',
    // Step 2
    address: '',
    phone: '',
    // Step 3 は確認のみ
  });
  const [errors, setErrors] = useState<Errors>({});

  const validateStep = (step: Step): boolean => {
    const newErrors: Errors = {};

    if (step === 1) {
      if (!formData.name) {
        newErrors.name = '名前は必須です';
      }
      if (!formData.email) {
        newErrors.email = 'Emailは必須です';
      }
    }
    if (step === 2) {
      if (!formData.address) {
        newErrors.address = '住所は必須です';
      }
      if (!formData.phone) {
        newErrors.phone = '電話番号は必須です';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }))
  };

  const handleNext = () => {
    // 次のステップへ
    if (validateStep(currentStep)) {
      setCurrentStep(prev => (prev + 1) as Step);
    }
  };

  const handlePrev = () => {
    // 前のステップへ
    setCurrentStep(prev => (prev - 1) as Step);
  };

  const handleSubmit = () => {
    if (validateStep(1) && validateStep(2)) {
      alert(JSON.stringify(formData, null, 2));
    }
  };

  const renderStep = () => {
    switch(currentStep) {
      case 1:
        return (
          <div>
            <h3>Step 1: 基本情報</h3>
            <label>名前：<input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="名前" /></label>
            {errors.name && <span className="error">{errors.name}</span>}
            <label>Email：<input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" /></label>
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
        );
      case 2:
        return (
          <div>
            <h3>Step 2: 詳細情報</h3>
            <label>住所：<input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="住所" /></label>
            {errors.address && <span className="error">{errors.address}</span>}
            <label>電話番号：<input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="電話番号" /></label>
            {errors.phone && <span className="error">{errors.phone}</span>}
          </div>
        );
      case 3:
        return (
          <div>
            <h3>Step 3: 確認</h3>
            <p>名前: {formData.name}</p>
            <p>Email: {formData.email}</p>
            <p>住所: {formData.address}</p>
            <p>電話番号: {formData.phone}</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="multi-step-form">
      <div className="progress-bar">
        <div
          className="progress"
          style={{ width: `${(currentStep / 3) * 100}%` }}
        />
      </div>

      <div className="step-indicator">
        {[1, 2, 3].map(step => (
          <span
            key={step}
            className={step === currentStep ? 'active' : ''}
          >
            Step {step}
          </span>
        ))}
      </div>

      {renderStep()}

      <div className="navigation">
        <button
          onClick={handlePrev}
          disabled={currentStep === 1}
        >
          前へ
        </button>

        {currentStep < 3 ? (
          <button onClick={handleNext}>
            次へ
          </button>
        ) : (
          <button onClick={handleSubmit}>
            送信
          </button>
        )}
      </div>
    </div>
  );
}

export default MultiStepForm;
