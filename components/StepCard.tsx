import { STEP_INFO, WorkflowStep } from '@/lib/types';

interface StepCardProps {
    step: WorkflowStep;
    index: number;
    onRemove: (id: string) => void;
    onMoveUp: (index: number) => void;
    onMoveDown: (index: number) => void;
    totalSteps: number;
}

export default function StepCard({ step, index, onRemove, onMoveUp, onMoveDown, totalSteps }: StepCardProps) {
    const { label, icon } = STEP_INFO[step.type] || { label: 'Unknown Step', icon: '❓' }; // Fallback

    return (
        <div className="card fade-in" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1rem',
            marginBottom: '0.75rem',
            backgroundColor: 'rgba(30, 41, 59, 0.4)',
            border: '1px solid rgba(255, 255, 255, 0.05)'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div>
                    <h4 style={{ fontWeight: 600, fontSize: '1rem' }}>{label}</h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Step {index + 1}</p>
                </div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                    onClick={() => onMoveUp(index)}
                    disabled={index === 0}
                    style={{
                        background: 'transparent', border: 'none', color: 'var(--text-muted)',
                        cursor: index === 0 ? 'not-allowed' : 'pointer', fontSize: '1.2rem', opacity: index === 0 ? 0.3 : 1
                    }}
                    title="Move Up"
                >
                    ↑
                </button>
                <button
                    onClick={() => onMoveDown(index)}
                    disabled={index === totalSteps - 1}
                    style={{
                        background: 'transparent', border: 'none', color: 'var(--text-muted)',
                        cursor: index === totalSteps - 1 ? 'not-allowed' : 'pointer', fontSize: '1.2rem', opacity: index === totalSteps - 1 ? 0.3 : 1
                    }}
                    title="Move Down"
                >
                    ↓
                </button>
                <button
                    onClick={() => onRemove(step.id)}
                    style={{
                        background: 'transparent', border: 'none', color: '#ef4444',
                        cursor: 'pointer', fontSize: '1.2rem', marginLeft: '0.5rem'
                    }}
                    title="Remove Step"
                >
                    ✕
                </button>
            </div>
        </div>
    );
}
