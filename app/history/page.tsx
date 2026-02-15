'use client';

import { WorkflowRun, getHistory } from '@/lib/history-client';
import { STEP_INFO } from '@/lib/types';
import { useEffect, useState } from 'react';

export default function HistoryPage() {
    const [history, setHistory] = useState<WorkflowRun[]>([]);

    useEffect(() => {
        setHistory(getHistory());
    }, []);

    return (
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>📜</span> Execution History
            </h1>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {history.length === 0 ? (
                    <div className="card" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                        <p>No runs recorded yet.</p>
                        <a href="/" className="btn btn-primary" style={{ marginTop: '1rem', display: 'inline-flex' }}>
                            Create a Workflow
                        </a>
                    </div>
                ) : (
                    history.map((run) => (
                        <div key={run.id} className="card fade-in">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                    {new Date(run.timestamp).toLocaleString()}
                                </span>
                                <span
                                    className={run.status === 'success' ? 'status-green' : 'status-red'}
                                    style={{ padding: '0.25rem 0.75rem', borderRadius: '12px', fontSize: '0.75rem', background: run.status === 'success' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)', color: run.status === 'success' ? '#4ade80' : '#f87171', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 'auto', height: 'auto', boxShadow: 'none' }}
                                >
                                    {run.status.toUpperCase()}
                                </span>
                            </div>

                            <div style={{ padding: '0.75rem', background: 'rgba(0,0,0,0.2)', borderRadius: '6px', marginBottom: '1rem', fontStyle: 'italic', color: '#cbd5e1', fontSize: '0.9rem' }}>
                                "{run.inputPreview}"
                            </div>

                            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                {run.steps.map((stepType, idx) => (
                                    <div key={idx} style={{
                                        display: 'flex', alignItems: 'center', gap: '4px',
                                        padding: '4px 8px', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', fontSize: '0.8rem', border: '1px solid rgba(255,255,255,0.1)'
                                    }}>
                                        <span>{STEP_INFO[stepType as keyof typeof STEP_INFO]?.icon}</span>
                                        <span>{STEP_INFO[stepType as keyof typeof STEP_INFO]?.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
