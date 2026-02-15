export type StepType = 'clean' | 'summarize' | 'extract' | 'tag';

export interface WorkflowStep {
    id: string;
    type: StepType;
}

export interface StepResult {
    stepId: string;
    stepType: StepType;
    output: string;
    isError?: boolean;
}

export const STEP_INFO: Record<StepType, { label: string; icon: string; description: string }> = {
    clean: { label: 'Clean Text', icon: '🧹', description: 'Standardize whitespace and format.' },
    summarize: { label: 'Summarize', icon: '📝', description: 'Create a short summary.' },
    extract: { label: 'Extract Key Points', icon: '🔑', description: 'Find bullet points.' },
    tag: { label: 'Tag Category', icon: '🏷️', description: 'Classify content automatically.' },
};
