import { GoogleGenAI, Type } from "@google/genai";
import { NextResponse } from 'next/server';

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const appid = searchParams.get('appid');
  const title = searchParams.get('title');

  if (!appid && !title) {
    return NextResponse.json({ error: 'Missing appid or title' }, { status: 400 });
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Provide detailed information for the game "${title}" (App ID: ${appid}).
      Include a brief description, Steam rating (e.g., "Very Positive"), Metacritic score (e.g., "85"),
      HowLongToBeat times (Main Story, Main + Extra, Completionist), developers, publishers, and top 5 tags.
      If exact data is unavailable, provide reasonable estimates or "N/A".`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            description: { type: Type.STRING },
            steamRating: { type: Type.STRING },
            metacriticScore: { type: Type.STRING },
            hltb: {
              type: Type.OBJECT,
              properties: {
                main: { type: Type.STRING },
                mainExtra: { type: Type.STRING },
                completionist: { type: Type.STRING },
              },
            },
            developers: { type: Type.ARRAY, items: { type: Type.STRING } },
            publishers: { type: Type.ARRAY, items: { type: Type.STRING } },
            tags: { type: Type.ARRAY, items: { type: Type.STRING } },
          },
        },
      },
    });

    let text = response.text;
    if (!text) {
        throw new Error("No response text from Gemini");
    }

    // Clean up markdown code blocks if present
    if (text.startsWith('```json')) {
        text = text.replace(/^```json\n/, '').replace(/\n```$/, '');
    } else if (text.startsWith('```')) {
        text = text.replace(/^```\n/, '').replace(/\n```$/, '');
    }

    return NextResponse.json(JSON.parse(text));
  } catch (error) {
    console.error('Error fetching game details:', error);
    return NextResponse.json({ error: 'Failed to fetch game details' }, { status: 500 });
  }
}
