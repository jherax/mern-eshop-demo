describe('Reverse the words from a string', () => {
  it('Testing reverseWords()', () => {
    expect(reverseWords('Hola, soy David')).toBe('David soy Hola,');
    expect(reverseWords('  Hola, soy  David   ')).toBe('   David  soy Hola,  ');
  });

  function reverseWords(text: string): string {
    return text.split(' ').reverse().join(' ');
  }
});
