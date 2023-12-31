import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import OpenAIApi, { ClientOptions } from 'openai';

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  throw new Error('OpenAI API key is not defined.');
}

const openaiOptions: ClientOptions = {
  apiKey: apiKey,
};

const openai = new OpenAIApi(openaiOptions);

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages } = body;

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!messages) {
      return new NextResponse('Messages are required', { status: 400 });
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages,
    });

    return NextResponse.json(response.choices[0].message);
  } catch (error) {
    console.log('[CONVERSATION_ERROR]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
