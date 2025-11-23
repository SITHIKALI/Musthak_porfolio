import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface SkillCardProps {
  category: string;
  skills: string[];
  icon?: React.ReactNode;
  colorClass: string;
}

const SkillCard: React.FC<SkillCardProps> = ({ category, skills, icon, colorClass }) => {
  return (
    <div className="bg-card-bg border border-slate-700 rounded-xl p-6 hover:border-neon-purple transition-all duration-300 hover:shadow-lg hover:shadow-purple-900/20 group">
      <div className="flex items-center gap-4 mb-6">
        <div className={`p-3 rounded-lg bg-opacity-10 ${colorClass.replace('text-', 'bg-')}`}>
          <div className={`${colorClass}`}>
            {icon}
          </div>
        </div>
        <h3 className="text-xl font-bold font-display text-white">{category}</h3>
      </div>
      <ul className="space-y-3">
        {skills.map((skill, idx) => (
          <li key={idx} className="flex items-center gap-2 text-slate-300 group-hover:text-white transition-colors">
            <CheckCircle2 size={16} className={colorClass} />
            <span>{skill}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SkillCard;
