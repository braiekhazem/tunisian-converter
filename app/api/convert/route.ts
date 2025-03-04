import { NextResponse } from "next/server";
import { generateText } from "ai";
import { anthropic } from "@ai-sdk/anthropic";

const fushaPrompt = (
  text: string
) => `Translate the following Tunisian Arabic text (written in Latin characters with numbers) into formal Modern Standard Arabic (MSA). 

### **Rules:**
1. **Provide only the translated text** in Arabic script, without any explanations, notes, or additional text.
2. **Accurately interpret phonetic representations**, following these mappings:
   - '3' → 'ع'
   - '7' → 'ح' 
   - '8' → 'غ'
   - '9' → 'ق'
   - '5' → 'خ'
   - '2' → 'ء'
3. **Ensure proper grammatical structure** in MSA while preserving the meaning of the original text.
4. **Exclude dialectal expressions** that are specific to Tunisian Arabic and use their equivalent in MSA.

### **Input Text:**
"${text}"

### **Output:**
(Provide only the translated text in Arabic script)`;

const latinaPrompt = (
  text: string
) => `Convert the following Tunisian Arabic text (written in Latin characters with numbers) into **Tunisian Arabic written in Arabic script**. 

### **Rules:**
1. **Provide only the converted text** in Arabic script, without any explanations, notes, or additional text.
2. **Preserve Tunisian Arabic expressions and informal tone**, ensuring the meaning remains the same.
3. **Use accurate phonetic transliteration**, following these mappings:
   - '3' → 'ع'
   - '7' → 'ح'
   - '8' → 'غ'
   - '9' → 'ق'
   - '5' → 'خ'
   - '2' → 'ء'
4. **Do not replace Tunisian dialect words** with MSA equivalents—keep them as they are, just written in Arabic script.

### **Input Text:**
"${text}"

### **Output:**
(Provide only the converted text in Arabic script)`;

export async function POST(request: Request) {
  try {
    const { latinText, toFusha } = await request.json();
    console.log("Received request:", { latinText, toFusha });

    if (!process.env.ANTHROPIC_API_KEY) {
      console.error("ANTHROPIC_API_KEY is not set");
      return NextResponse.json(
        { error: "ANTHROPIC_API_KEY is not set" },
        { status: 500 }
      );
    }

    const prompt = toFusha ? fushaPrompt : latinaPrompt;

    const { text } = await generateText({
      model: anthropic("claude-3-7-sonnet-20250219"),
      prompt: prompt(latinText),
      temperature: 0.1,
      maxTokens: 1000,
    });

    return NextResponse.json({ arabicText: text.trim() });
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json(
      {
        error: `Failed to convert text: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      },
      { status: 500 }
    );
  }
}
