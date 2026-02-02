import {
  conceptExplainPrompt,
  questionAnswerPrompt,
} from "../utils/prompts.js";
import groq from "../utils/groqClient.js";
import dotenv from "dotenv";
dotenv.config();

// Function to sanitize JSON string by removing control characters
const sanitizeJsonString = (str) => {
  return str.replace(/[\x00-\x1F\x7F-\x9F]/g, ""); // Remove control characters
};

// Function to extract JSON from a string
const extractJson = (str) => {
  const trimmed = str.trim();
  if (trimmed.startsWith("[")) {
    // Array
    const start = trimmed.indexOf("[");
    const end = trimmed.lastIndexOf("]");
    if (start !== -1 && end !== -1 && end > start) {
      return trimmed.substring(start, end + 1);
    }
  } else if (trimmed.startsWith("{")) {
    // Object
    const start = trimmed.indexOf("{");
    const end = trimmed.lastIndexOf("}");
    if (start !== -1 && end !== -1 && end > start) {
      return trimmed.substring(start, end + 1);
    }
  }
  return str; // Return original if not found
};

// const groq = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const generateInterviewQuestions = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, numberOfQuestions } = req.body;
    if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const prompt = questionAnswerPrompt(
      role,
      experience,
      topicsToFocus,
      numberOfQuestions
    );

    // const response = await ai.models.generateContent({
    // //   model: "gemini-1.5-flash",
    // //   contents:prompt,

    // });

    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant", // ✅ UPDATED MODEL
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
    });
    


    // let rawText = response.text;
    const rawText = response.choices[0].message.content;
    const cleanedText = rawText
      .replace(/```json\s*/g, "") // starting ```json hatao
      .replace(/```/g, "") // ending ``` hatao
      .trim(); // extra spaces / new lines hatao

    // Sanitize to remove control characters
    const sanitizedText = sanitizeJsonString(cleanedText);

    // Extract JSON from the text
    const jsonText = extractJson(sanitizedText);

    //now safe to parse
    const data = JSON.parse(jsonText);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Failed to generate questions",
      error: error.message,
    });
  }
};

export const generateConceptExplanation = async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const prompt = conceptExplainPrompt(question);
    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      // content: prompt
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const rawText = response.choices[0].message.content;
    console.log("Raw AI response:", rawText); // Log for debugging

    const cleanedText = rawText
      .replace(/```json\s*/g, "") // starting ```json hatao
      .replace(/```/g, "") // ending ``` hatao
      .trim(); // extra spaces / new lines hatao

    // Sanitize to remove control characters
    const sanitizedText = sanitizeJsonString(cleanedText);

    // Extract JSON from the text
    const jsonText = extractJson(sanitizedText);

    console.log("Extracted JSON text:", jsonText); // Log for debugging

    //now safe to parse
    const data = JSON.parse(jsonText);

    res.status(200).json(data);
  } catch (error) {
    console.error("Error in generateConceptExplanation:", error); // Log error
    res.status(500).json({
      message: "Failed to generate explanation",
      error: error.message,
    });
  }
};
