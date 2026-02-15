import { NextResponse } from 'next/server';

type StepType = 'clean' | 'summarize' | 'extract' | 'tag';

interface WorkflowStep {
    id: string;
    type: StepType;
}

const mockProcess = async (text: string, type: StepType): Promise<string> => {
    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 500));

    switch (type) {
        case 'clean':
            return text.replace(/\s+/g, ' ').trim();

        case 'summarize':
            // Split by sentence delimiters but filter out empty/short segments
            const sentences = text
                .split(/[.!?\n]+/)
                .map(s => s.trim())
                .filter(s => s.length > 15); // Require substantial sentences

            if (sentences.length === 0) return "Text too short or fragmented to summarize.";
            if (sentences.length <= 2) return sentences.join('. ') + '.';

            // Select the first sentence and the longest remaining sentence
            const first = sentences[0];
            const others = sentences.slice(1);
            const longest = others.reduce((a, b) => a.length > b.length ? a : b, "");

            return `Summary:\n• ${first}\n• ${longest}`;

        case 'extract':
            // Look for capitalized words (Proper Nouns) or words > 6 chars
            const words = text.match(/\b[A-Z][a-z]+\b|\b[a-z]{7,}\b/g) || [];
            const uniqueWords = Array.from(new Set(words));

            if (uniqueWords.length === 0) return "- No key entities found.";

            return uniqueWords
                .slice(0, 5)
                .map(w => `- ${w}`)
                .join('\n');

        case 'tag':
            const lower = text.toLowerCase();
            if (lower.includes('tech') || lower.includes('code') || lower.includes('software')) return 'Category: Technology';
            if (lower.includes('money') || lower.includes('price') || lower.includes('finance')) return 'Category: Finance';
            if (lower.includes('health') || lower.includes('medical') || lower.includes('doctor')) return 'Category: Health';
            return 'Category: General';

        default:
            return text;
    }
};

export async function POST(request: Request) {
    try {
        const { text, steps } = await request.json();

        if (!text || !steps || !Array.isArray(steps)) {
            return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
        }

        const results = [];
        let currentText = text;

        for (const step of steps) {
            const output = await mockProcess(currentText, step.type);
            results.push({
                stepId: step.id,
                stepType: step.type,
                output
            });

            // Update context for next step if it transforms text
            if (step.type === 'clean' || step.type === 'summarize') {
                currentText = output;
            }
        }

        return NextResponse.json({ results });
    } catch (error) {
        console.error('Workflow error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
