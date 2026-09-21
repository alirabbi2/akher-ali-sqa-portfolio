import React, { useState } from 'react';
import {
  CheckCircle2,
  Wrench,
  Terminal,
  Users,
  Layers,
  Search,
  Code2,
  Sparkles,
  SlidersHorizontal,
  Check,
} from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

export const SkillsSection: React.FC = () => {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const categoryMeta: Record<
    string,
    {
      icon: React.ReactNode;
      gradient: string;
      bgLight: string;
      accentText: string;
      border: string;
    }
  > = {
    'qa-tools': {
      icon: <Wrench className="w-5 h-5 text-blue-500" />,
      gradient: 'from-blue-500 via-sky-500 to-cyan-400',
      bgLight: 'bg-blue-50 dark:bg-blue-950/40',
      accentText: 'text-blue-600 dark:text-blue-400',
      border: 'border-blue-200 dark:border-blue-800/60',
    },
    'programming-languages': {
      icon: <Code2 className="w-5 h-5 text-purple-500" />,
      gradient: 'from-purple-500 via-indigo-500 to-sky-400',
      bgLight: 'bg-purple-50 dark:bg-purple-950/40',
      accentText: 'text-purple-600 dark:text-purple-400',
      border: 'border-purple-200 dark:border-purple-800/60',
    },
    'qa-methodology': {
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
      gradient: 'from-emerald-500 via-teal-500 to-teal-400',
      bgLight: 'bg-emerald-50 dark:bg-emerald-950/40',
      accentText: 'text-emerald-600 dark:text-emerald-400',
      border: 'border-emerald-200 dark:border-emerald-800/60',
    },
    'soft-skills': {
      icon: <Users className="w-5 h-5 text-amber-500" />,
      gradient: 'from-amber-500 via-orange-500 to-yellow-400',
      bgLight: 'bg-amber-50 dark:bg-amber-950/40',
      accentText: 'text-amber-600 dark:text-amber-400',
      border: 'border-amber-200 dark:border-amber-800/60',
    },
  };

  const getProficiencyBadge = (level: number, label?: string) => {
    const displayLabel = label || (level >= 92 ? 'Expert' : level >= 85 ? 'Advanced' : 'Proficient');
    
    if (level >= 92) {
      return (
        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold font-mono tracking-wide bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
          {displayLabel}
        </span>
      );
    }
    if (level >= 85) {
      return (
        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold font-mono tracking-wide bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
          {displayLabel}
        </span>
      );
    }
    return (
      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold font-mono tracking-wide bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
        {displayLabel}
      </span>
    );
  };

  const filteredCategories = SKILL_CATEGORIES.map((cat) => {
    if (selectedCategory !== 'all' && cat.id !== selectedCategory) {
      return null;
    }
    const filteredSkills = cat.skills.filter((s) => {
      const query = searchQuery.toLowerCase();
      return (
        s.name.toLowerCase().includes(query) ||
        (s.categoryBadge && s.categoryBadge.toLowerCase().includes(query)) ||
        (s.proficiencyLabel && s.proficiencyLabel.toLowerCase().includes(query))
      );
    });
    if (filteredSkills.length === 0 && searchQuery) return null;
    return {
      ...cat,
      skills: filteredSkills,
    };
  }).filter(Boolean) as typeof SKILL_CATEGORIES;

  // Calculate overall metrics
  const totalSkillsCount = SKILL_CATEGORIES.reduce((acc, cat) => acc + cat.skills.length, 0);
  const avgProficiency = Math.round(
    SKILL_CATEGORIES.flatMap((c) => c.skills).reduce((acc, s) => acc + s.level, 0) / totalSkillsCount
  );

  return (
    <section id="skills" className="py-16 md:py-24 bg-slate-100/50 dark:bg-slate-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-400">
            <Layers className="w-3.5 h-3.5" />
            <span>Core Competencies &amp; Technical Proficiency</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {t.skills.heading}
          </h2>
          <p className="text-base text-slate-700 dark:text-slate-300">
            {t.skills.subheading}
          </p>
        </div>

        {/* Top Summary & Legend Bar */}
        <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Quick Metrics */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-slate-600 dark:text-slate-300">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-semibold text-slate-900 dark:text-white">
                {totalSkillsCount} Verified Competencies
              </span>
            </div>
            <div className="hidden sm:block h-3.5 w-px bg-slate-300 dark:bg-slate-700" />
            <div className="flex items-center gap-1.5">
              <span>Avg. Benchmark:</span>
              <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                {avgProficiency}%
              </span>
            </div>
            <div className="hidden sm:block h-3.5 w-px bg-slate-300 dark:bg-slate-700" />
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Calibrated via STLC Real-world Projects</span>
            </div>
          </div>

          {/* Proficiency Scale Legend */}
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-medium text-slate-500 dark:text-slate-400">
            <span className="text-slate-400 dark:text-slate-500 mr-1">Scale:</span>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Expert (&ge;92%)</span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              <span>Advanced (85-91%)</span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800">
              <span className="w-2 h-2 rounded-full bg-cyan-500" />
              <span>Proficient (70-84%)</span>
            </div>
          </div>
        </div>

        {/* Filter Controls & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-slate-200/80 dark:bg-slate-800/80 w-full sm:w-auto">
            <button
              id="skill-filter-all"
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedCategory === 'all'
                  ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-sm'
                  : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {t.skills.allSkills}
            </button>
            {SKILL_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                id={`skill-filter-${cat.id}`}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-sm'
                    : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>

          {/* Quick Skill Search */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search tools, languages, or skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 shadow-sm"
            />
          </div>
        </div>

        {/* Skill Groups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCategories.map((category) => {
            const meta = categoryMeta[category.id] || {
              icon: <Terminal className="w-5 h-5 text-emerald-500" />,
              gradient: 'from-emerald-500 to-teal-500',
              bgLight: 'bg-slate-50 dark:bg-slate-850',
              accentText: 'text-emerald-500',
              border: 'border-slate-200 dark:border-slate-800',
            };

            return (
              <div
                key={category.id}
                className="rounded-2xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow space-y-5"
              >
                {/* Category Header */}
                <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 shadow-sm">
                      {meta.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-slate-900 dark:text-white">
                        {category.title}
                      </h3>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {category.skills.length} specialized proficiencies
                      </span>
                    </div>
                  </div>

                  <span className={`text-[11px] font-mono font-bold px-2.5 py-1 rounded-lg ${meta.bgLight} ${meta.accentText} border ${meta.border}`}>
                    {Math.round(
                      category.skills.reduce((acc, s) => acc + s.level, 0) / category.skills.length
                    )}% Avg
                  </span>
                </div>

                {/* Skills with Subtle Calibrated Progress Bars */}
                <div className="space-y-4 pt-1">
                  {category.skills.map((skill) => {
                    const isHovered = hoveredSkill === skill.name;

                    return (
                      <div
                        key={skill.name}
                        onMouseEnter={() => setHoveredSkill(skill.name)}
                        onMouseLeave={() => setHoveredSkill(null)}
                        className="group space-y-1.5 transition-all"
                      >
                        {/* Label, Badge & Percentage Row */}
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-semibold text-slate-800 dark:text-slate-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                              {skill.name}
                            </span>
                            {skill.categoryBadge && (
                              <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200/50 dark:border-slate-700/50">
                                {skill.categoryBadge}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            {getProficiencyBadge(skill.level, skill.proficiencyLabel)}
                            <span className="font-mono text-xs font-bold text-slate-700 dark:text-slate-300 w-9 text-right">
                              {skill.level}%
                            </span>
                          </div>
                        </div>

                        {/* Subtle Precision Progress Bar with Instrument Notches */}
                        <div className="relative h-2 w-full rounded-full bg-slate-150 dark:bg-slate-800/90 overflow-hidden ring-1 ring-slate-900/5 dark:ring-white/5">
                          {/* Calibrated graduation tick marks (25%, 50%, 75%) */}
                          <div className="absolute left-1/4 top-0 bottom-0 w-px bg-slate-300/30 dark:bg-slate-700/40 pointer-events-none z-10" />
                          <div className="absolute left-2/4 top-0 bottom-0 w-px bg-slate-300/30 dark:bg-slate-700/40 pointer-events-none z-10" />
                          <div className="absolute left-3/4 top-0 bottom-0 w-px bg-slate-300/30 dark:bg-slate-700/40 pointer-events-none z-10" />

                          {/* Dynamic Gradient Fill with Subtle Glow */}
                          <div
                            className={`h-full rounded-full bg-gradient-to-r ${meta.gradient} transition-all duration-700 ease-out relative ${
                              isHovered ? 'brightness-110 shadow-sm' : ''
                            }`}
                            style={{ width: `${skill.level}%` }}
                          >
                            {/* Subtle Leading Light Pip */}
                            <div className="absolute right-0 top-0 bottom-0 w-1 bg-white/70 rounded-full" />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Testing Methodology Workflow Banner */}
        <div className="mt-12 rounded-2xl p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 text-white border border-slate-800 shadow-xl">
          <div className="max-w-3xl mb-6">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              Testing Life Cycle (STLC) Workflow
            </span>
            <h3 className="text-xl font-bold mt-1">
              End-to-End Quality Assurance Execution Model
            </h3>
            <p className="text-sm text-slate-200 mt-1">
              How I deliver zero-critical-defect releases through structured testing principles.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { step: '01', title: 'Requirement Analysis', desc: 'FRD & User Stories' },
              { step: '02', title: 'Test Planning', desc: 'Scope, Strategy, SLAs' },
              { step: '03', title: 'Test Case Design', desc: 'BVA & Equivalence' },
              { step: '04', title: 'Environment Setup', desc: 'Chrome DevTools / DB' },
              { step: '05', title: 'Execution & Defect Log', desc: 'Jira Severity/Priority' },
              { step: '06', title: 'Test Closure', desc: 'Sign-off & RTM' },
            ].map((phase) => (
              <div
                key={phase.step}
                className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/60 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[11px] font-mono font-bold text-emerald-400">
                    Phase {phase.step}
                  </span>
                  <h4 className="text-xs font-bold text-white mt-1 line-clamp-2">
                    {phase.title}
                  </h4>
                </div>
                <span className="text-[10px] text-slate-300 mt-2">
                  {phase.desc}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
