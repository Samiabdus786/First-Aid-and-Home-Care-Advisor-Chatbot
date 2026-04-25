import { Pinecone, RecordMetadata, ScoredPineconeRecord } from '@pinecone-database/pinecone';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY || ''
});

interface Memory extends RecordMetadata {
  userId: string;
  content: string;
  timestamp: string;
  [key: string]: string; // Index signature for RecordMetadata
}

export async function storeMemory(userId: string, content: string) {
  const index = pinecone.index('first-aid-memories');
  
  // Generate embeddings using Gemini
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  const result = await model.generateContent(content);
  const response = await result.response;
  
  // Store in Pinecone
  await index.upsert([{
    id: `${userId}-${Date.now()}`,
    values: Array.from({ length: 1536 }).map(() => Math.random()), // Placeholder for actual embeddings
    metadata: {
      userId,
      content,
      timestamp: new Date().toISOString(),
    } as Memory,
  }]);
}

export async function retrieveMemories(userId: string, query: string): Promise<Memory[]> {
  const index = pinecone.index('first-aid-memories');
  
  // Generate query embeddings
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  const result = await model.generateContent(query);
  const response = await result.response;
  
  // Query Pinecone
  const queryResponse = await index.query({
    vector: Array.from({ length: 1536 }).map(() => Math.random()), // Placeholder for actual embeddings
    topK: 5,
    includeMetadata: true,
    filter: {
      userId: { $eq: userId },
    },
  });

  return (queryResponse.matches || [])
    .filter((match: ScoredPineconeRecord<RecordMetadata>) => match.metadata)
    .map((match: ScoredPineconeRecord<RecordMetadata>) => match.metadata as Memory);
}
