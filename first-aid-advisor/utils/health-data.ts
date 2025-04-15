interface SearchResult {
  title: string;
  link: string;
  snippet: string;
}

export async function searchHealthInfo(query: string): Promise<SearchResult[]> {
  try {
    const SERPER_API_KEY = '824ac5e3fa92676ee8eac22e90e73cd1d84fa9a8';
    
    const response = await fetch('https://google.serper.dev/search', {
      method: 'POST',
      headers: {
        'X-API-KEY': SERPER_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        q: query,
        gl: 'us',
        hl: 'en'
      })
    });

    const data = await response.json();
    
    if (!data || !data.organic || !Array.isArray(data.organic)) {
      console.error('Invalid response format from SERPER API:', data);
      return [];
    }

    return data.organic.map((result: any) => ({
      title: result.title || '',
      link: result.link || '',
      snippet: result.snippet || '',
    }));
  } catch (error) {
    console.error('Error fetching health information:', error);
    return [];
  }
}

export function extractRelevantAdvice(results: SearchResult[], query: string): string {
  if (!results || results.length === 0) {
    return 'No relevant health information found.';
  }

  // Combine relevant information from search results
  const relevantSnippets = results
    .filter(result => 
      result.title.toLowerCase().includes('medical') ||
      result.title.toLowerCase().includes('health') ||
      result.title.toLowerCase().includes('first aid')
    )
    .map(result => result.snippet)
    .join('\n\n');

  return relevantSnippets || 'No relevant health information found.';
}
