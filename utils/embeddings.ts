const EMBEDDING_API_URL = 'https://generativelanguage.googleapis.com/v1/models/embedding-001:embedText';

export async function getEmbedding(text: string): Promise<number[]> {
  if (!process.env.GOOGLE_API_KEY) {
    throw new Error('Missing GOOGLE_API_KEY environment variable');
  }

  const response = await fetch(`${EMBEDDING_API_URL}?key=${process.env.GOOGLE_API_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text
    }),
  });

  if (!response.ok) {
    throw new Error(`Embedding API error: ${response.statusText}`);
  }

  const data = await response.json();
  return data.embedding.value;
}
