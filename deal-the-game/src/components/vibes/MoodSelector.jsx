import { MOODS } from '../../constants/moods';

const MoodSelector = ({ activeMood, onSelect }) => {
  return (
    <div className="mood-selector">
      {Object.values(MOODS).map((mood) => {
        const isActive = activeMood === mood.id;
        return (
          <button
            key={mood.id}
            className={`mood-card${isActive ? ' mood-card--active' : ''}`}
            onClick={() => onSelect(mood)}
          >
            <span className="mood-card-emoji">{mood.emoji}</span>
            <span className="mood-card-label">{mood.label}</span>
            <span className="mood-card-desc">{mood.description}</span>
          </button>
        );
      })}
    </div>
  );
};

export default MoodSelector;
