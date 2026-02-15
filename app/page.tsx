'use client';

import StepCard from '@/components/StepCard';
import { saveRun } from '@/lib/history-client';
import { STEP_INFO, StepResult, StepType, WorkflowStep } from '@/lib/types';
import { useState } from 'react';

export default function Home() {
  const [steps, setSteps] = useState<WorkflowStep[]>([]);
  const [inputText, setInputText] = useState('');
  const [results, setResults] = useState<StepResult[] | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addStep = (type: StepType) => {
    const newStep: WorkflowStep = {
      id: crypto.randomUUID(),
      type,
    };
    setSteps([...steps, newStep]);
  };

  const removeStep = (id: string) => {
    setSteps(steps.filter((s) => s.id !== id));
  };

  const moveStep = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === steps.length - 1)
    ) {
      return;
    }
    const newSteps = [...steps];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newSteps[index], newSteps[targetIndex]] = [newSteps[targetIndex], newSteps[index]];
    setSteps(newSteps);
  };

  const handleRun = async () => {
    if (!inputText.trim()) return;
    if (steps.length === 0) return;

    setIsRunning(true);
    setResults(null);
    setError(null);

    try {
      const startTime = Date.now();
      const response = await fetch('/api/workflow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputText, steps }),
      });

      if (!response.ok) throw new Error('Workflow failed to run');

      const data = await response.json();
      setResults(data.results);

      // Save to history
      saveRun({
        id: crypto.randomUUID(),
        timestamp: Date.now(),
        inputPreview: inputText.slice(0, 50) + (inputText.length > 50 ? '...' : ''),
        steps: steps.map(s => s.type),
        status: 'success'
      });

    } catch (err) {
      setError('An error occurred during execution.');
    } finally {
      setIsRunning(false);
    }
  };

  // Pre-fill demo text
  const loadDemo = () => {
    setInputText("Artificial Intelligence is transforming industries. Companies are adopting AI to automate tasks, improve efficiency, and reduce costs. Ideally, this technology will lead to a better future. However, there are concerns about job displacement and ethical implications. The key is to balance innovation with responsibility. Important aspects include data privacy, algorithmic bias, and human oversight.");
  };

  return (
    <div className="container" style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '2rem', alignItems: 'start' }}>

      {/* Builder Panel */}
      <section className="card">
        <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
          Transcript Summarizer
        </h2>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Add Step</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
            {(Object.keys(STEP_INFO) as StepType[]).map((type) => (
              <button
                key={type}
                onClick={() => addStep(type)}
                className="btn btn-secondary"
                style={{ justifyContent: 'flex-start', padding: '0.5rem 0.75rem', fontSize: '0.85rem' }}
                disabled={steps.length >= 5}
              >
                {STEP_INFO[type].label}
              </button>
            ))}
          </div>
          {steps.length >= 5 && <p style={{ fontSize: '0.8rem', color: '#eab308', marginTop: '0.5rem' }}>Max 5 steps allowed.</p>}
        </div>

        <div style={{ borderTop: '1px solid var(--card-border)', paddingTop: '1.5rem' }}>
          <h3 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Current Flow</h3>
          {steps.length === 0 ? (
            <div style={{ padding: '2rem', textAlign: 'center', border: '1px dashed var(--card-border)', borderRadius: 'var(--radius)', color: 'var(--text-muted)' }}>
              No steps added yet.
            </div>
          ) : (
            <div>
              {steps.map((step, index) => (
                <StepCard
                  key={step.id}
                  step={step}
                  index={index}
                  onRemove={removeStep}
                  onMoveUp={(i) => moveStep(i, 'up')}
                  onMoveDown={(i) => moveStep(i, 'down')}
                  totalSteps={steps.length}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Runner Panel */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

        {/* Input Area */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              Input Text
            </h2>
            <button onClick={loadDemo} style={{ background: 'transparent', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontSize: '0.85rem', textDecoration: 'underline' }}>
              Load Demo Text
            </button>
          </div>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter text here to process..."
            style={{
              width: '100%',
              minHeight: '120px',
              padding: '1rem',
              borderRadius: 'var(--radius)',
              background: 'rgba(0,0,0,0.2)',
              border: '1px solid var(--card-border)',
              color: 'var(--foreground)',
              resize: 'vertical',
              fontFamily: 'inherit'
            }}
          />
          <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
            <button
              className="btn btn-primary"
              onClick={handleRun}
              disabled={isRunning || steps.length === 0 || !inputText.trim()}
              style={{ opacity: (isRunning || steps.length === 0 || !inputText.trim()) ? 0.5 : 1 }}
            >
              {isRunning ? 'Processing...' : 'Run Workflow'}
            </button>
          </div>
        </div>

        {/* Results Area */}
        {error && (
          <div style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', borderRadius: 'var(--radius)', color: '#ef4444' }}>
            {error}
          </div>
        )}

        {results && (
          <div className="card fade-in">
            <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              Results
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {results.map((res, idx) => (
                <div key={idx} className="fade-in" style={{ animationDelay: `${idx * 0.1}s`, borderLeft: '3px solid var(--primary)', paddingLeft: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>{STEP_INFO[res.stepType].label}</h3>
                  </div>
                  <div style={{
                    background: 'rgba(0,0,0,0.2)',
                    padding: '1rem',
                    borderRadius: 'var(--radius)',
                    fontSize: '0.95rem',
                    color: '#e2e8f0',
                    whiteSpace: 'pre-wrap',
                    fontFamily: 'monospace'
                  }}>
                    {res.output}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </section>
    </div>
  );
}
