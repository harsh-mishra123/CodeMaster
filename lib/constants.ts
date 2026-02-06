export const LANGUAGES = [
  { value: 'javascript', label: 'JavaScript', icon: '🟨' },
  { value: 'typescript', label: 'TypeScript', icon: '🔷' },
  { value: 'python', label: 'Python', icon: '🐍' },
  { value: 'java', label: 'Java', icon: '☕' },
  { value: 'cpp', label: 'C++', icon: '⚙️' },
  { value: 'rust', label: 'Rust', icon: '🦀' },
  { value: 'go', label: 'Go', icon: '🐹' },
  { value: 'ruby', label: 'Ruby', icon: '💎' },
  { value: 'php', label: 'PHP', icon: '🐘' },
  { value: 'swift', label: 'Swift', icon: '🐦' },
  { value: 'html', label: 'HTML', icon: '🌐' },
  { value: 'css', label: 'CSS', icon: '🎨' },
] as const

export const DEPTH_LEVELS = [
  { value: 'beginner', label: '👶 Beginner', description: 'Simple explanations with analogies' },
  { value: 'intermediate', label: '🚀 Intermediate', description: 'Detailed technical breakdown' },
  { value: 'advanced', label: '🔥 Advanced', description: 'Deep dive with optimization tips' },
] as const

export const COMPLEXITY_COLORS = {
  low: 'bg-green-500/20 text-green-400',
  medium: 'bg-yellow-500/20 text-yellow-400',
  high: 'bg-red-500/20 text-red-400',
}