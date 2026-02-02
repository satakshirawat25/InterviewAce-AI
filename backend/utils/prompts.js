export const questionAnswerPrompt = (
  role,
  experience,
  topicsToFocus,
  numberOfQuestions
) => `
You are an AI trained to generate technical interview questions and answers.

Task:
- Role: ${role}
- Candidate Experience: ${experience} years
- Focus Topics: ${topicsToFocus}
- Write ${numberOfQuestions} interview questions.
- For each question, generate a detailed but beginner-friendly answer.
- If the answer needs a code example, add a small code block inside.
- Keep formatting very clean.

Example:
\`\`\`javascript
console.log("Hello World");
\`\`\`

Return a pure JSON array like:

[
  {
    "question": "Question here?",
    "answer": "Answer here."
  }
]

Important: Do NOT add any extra text. Only return valid JSON.
`;

export const conceptExplainPrompt = (question) => `
You are an AI trained to generate explanations for a given interview question.

Task:
- Explain the following interview question and its concept in depth as if you're teaching a beginner developer.
- Question: "${question}"
- After the explanation, provide a short and clear title that summarizes the concept.
- If the explanation requires a code example, add a small code block.
- Keep formatting very clean.
\`\`\`javascript
app.use((req, res, next) => {
  console.log(req.method);
  next();
});
\`\`\`

Return the result as a valid JSON object in the following format:

{
  "title": "Short title here",
  "explanation": "Explanation here"
}

Important: Do NOT add any extra text outside the JSON format.
`;
