describe('Generation of valid Markdown links from a plain text', () => {
  it('Generate links for Markdown', () => {
    let start: number;

    function getlink(text: string) {
      start = performance.now();
      const cleanText = text
        .toLowerCase()
        .replace(/_|[^\w\s-]+/g, '')
        .replace(/\s+/g, '-');
      return `(#${cleanText})`;
    }

    const result = getlink('What is NPM?');
    const end = performance.now();
    const durationMs = end - start;
    expect(durationMs).toBeLessThan(1000);
    expect(result).not.toMatch(/\s/);
  });
});
