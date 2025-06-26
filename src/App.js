import React, { useState } from 'react';
import './App.css';

function App() {
  const [mood, setMood] = useState('');
  const [customMood, setCustomMood] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [content, setContent] = useState('');
  const [diaries, setDiaries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMood, setFilterMood] = useState('所有心情');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newDiary = {
      date,
      mood: mood === '自定义心情' ? customMood : mood,
      content
    };
    setDiaries([...diaries, newDiary]);
    setContent('');
    setMood('');
    setCustomMood('');
  };

  const filteredDiaries = diaries.filter(diary => {
    const matchesSearch = diary.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMood = filterMood === '所有心情' || diary.mood === filterMood;
    return matchesSearch && matchesMood;
  });

  const moodOptions = ['慢笔', '一般', '普通', '不错', '超棒', '自定义心情'];

  return (
    <div className="app">
      <h1>我的心情日记</h1>
      
      <form onSubmit={handleSubmit} className="diary-form">
        <div className="form-group">
          <label>日期</label>
          <input 
            type="date" 
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label>选择心情</label>
          <div className="mood-options">
            {moodOptions.map(option => (
              <button
                key={option}
                type="button"
                className={`mood-btn ${mood === option ? 'selected' : ''}`}
                onClick={() => setMood(option)}
              >
                {option}
              </button>
            ))}
          </div>
          {mood === '自定义心情' && (
            <input
              type="text"
              placeholder="输入你的心情"
              value={customMood}
              onChange={(e) => setCustomMood(e.target.value)}
              className="custom-mood-input"
              required
            />
          )}
        </div>
        
        <div className="form-group">
          <label>日记内容</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        
        <button type="submit" className="save-btn">保存记录</button>
      </form>
      
      <div className="search-section">
        <input
          type="text"
          placeholder="搜索日记内容..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select
          value={filterMood}
          onChange={(e) => setFilterMood(e.target.value)}
          className="mood-filter"
        >
          <option value="所有心情">所有心情</option>
          {moodOptions.filter(opt => opt !== '自定义心情').map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        <button className="view-btn">查看</button>
      </div>
      
      <div className="diary-list">
        {filteredDiaries.map((diary, index) => (
          <div key={index} className="diary-entry">
            <div className="diary-header">
              <span className="diary-date">{diary.date}</span>
              <span className="diary-mood">{diary.mood}</span>
            </div>
            <div className="diary-content">{diary.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;