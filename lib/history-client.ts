'use client';

export interface WorkflowRun {
    id: string;
    timestamp: number;
    inputPreview: string;
    steps: string[];
    status: 'success' | 'failed';
}

const STORAGE_KEY = 'workflow_history';

export const getHistory = (): WorkflowRun[] => {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    try {
        return JSON.parse(stored);
    } catch {
        return [];
    }
};

export const saveRun = (run: WorkflowRun) => {
    const history = getHistory();
    const newHistory = [run, ...history].slice(0, 5); // Keep last 5
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
    return newHistory;
};
