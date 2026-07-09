import { useState, useRef } from 'react';

type SkillLevel = 'beginner' | 'intermediate' | 'advanced';

type Skill = {
  id: number;
  name: string;
  level: SkillLevel;
}

// idは追加時に採番するので「id以外」の初期値をここで1回だけ定義（初期stateとaddSkillで使い回す）
const EMPTY_SKILL: Omit<Skill, 'id'> = { name: '', level: 'beginner' };

function DynamicForm() {
  const [skills, setSkills] = useState<Skill[]>([
    { id: 1, ...EMPTY_SKILL }
  ]);

  const nextIdRef = useRef(2);

  const addSkill = () => {
    const newSkill: Skill = { id: nextIdRef.current, ...EMPTY_SKILL };
    nextIdRef.current ++;
    setSkills(prev => [...prev, newSkill]);
  };

  const removeSkill = (id: number) => {
    // スキルフィールドを削除
    setSkills(prev => prev.filter(skill => skill.id !== id));
  };

  const updateSkill = (id: number, field: Exclude<keyof Skill, 'id'>, value: string) => {
    setSkills(prev => prev.map(skill =>
      skill.id === id ? { ...skill, [field]: value } : skill
    ));
  };

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(JSON.stringify(skills, null, 2))
    // 送信処理
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>スキル一覧</h3>

      {skills.map((skill) => (
        <div key={skill.id}
	        className="skill-row"
	        style={{
            display: "flex",
            gap: "10px",
            marginBottom: "10px",
          }}
        >
          <input
            type="text"
            placeholder="スキル名"
            value={skill.name}
            onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
          />

          <select
            value={skill.level}
            onChange={(e) => updateSkill(skill.id, 'level', e.target.value)}
            style={{ padding: "8px" }}
          >
            <option value="beginner">初級</option>
            <option value="intermediate">中級</option>
            <option value="advanced">上級</option>
          </select>

          <button
            type="button"
            onClick={() => removeSkill(skill.id)}
            disabled={skills.length <= 1}
            style={{
              padding: "8px 12px",
              backgroundColor:
              skills.length <= 1 ? "#ccc" : "#f44336",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: skills.length <= 1 ? "not-allowed" : "pointer",
            }}
          >
            削除
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={addSkill}
        disabled={skills.length >= 5}
        style={{
          padding: "8px 16px",
          backgroundColor:
          skills.length >= 5 ? "#ccc" : "#2196F3",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: skills.length >= 5 ? "not-allowed" : "pointer",
          marginRight: "10px",
        }}
      >
        スキルを追加
      </button>

      <button type="submit"
        style={{
          padding: "8px 16px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
				}}>送信</button>

      <div style={{
        marginTop: "20px",
        padding: "15px",
        backgroundColor: "#f5f5f5",
        borderRadius: "4px",
      }}>
        <h4>送信データ:</h4>
        <pre>{JSON.stringify(skills, null, 2)}</pre>
      </div>
    </form>
  );
}

export default DynamicForm;
