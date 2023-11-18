describe('Testing formatJson()', () => {
  it('should visualize a JSON object in a human-readable format', () => {
    const expected = formatJson({
      key1: 'value1',
      key2: {
        key3: 3,
      },
    });
    expect(expected).toBe(`
{
  key1: value1,
  key2: 
  {
    key3: 3,
  },
}`);
  });

  it('should visualize a JSON array in a human-readable format', () => {
    const expected = formatJson([
      {
        a: 1,
        b: {
          inner1: {
            target: 'here',
          },
          inner2: [
            {item: 1, value: 'first'},
            {item: 2, value: 'second'},
          ],
        },
      },
    ]);
    expect(expected).toBe(`
[
  {
    a: 1,
    b: 
    {
      inner1: 
      {
        target: here,
      },
      inner2: 
      [
        {
          item: 1,
          value: first,
        },
        {
          item: 2,
          value: second,
        },
      ],
    },
  },
]`);
  });
});

function formatJson<T = JSONObject>(json: T, tabs = 0): string {
  if (json instanceof Array) {
    const braceTabs = ' '.repeat(tabs);
    let formatted = `\n${braceTabs}[`;
    json.forEach((value: unknown, i) => {
      const formatValue = formatJson(value, tabs + 2);
      const spaces = ' '.repeat(tabs + 2);
      formatted += `\n${spaces}${formatValue},`;
    });
    formatted += `\n${braceTabs}]`;
    return removeDupNewline(formatted);
  } else if (typeof json === 'object') {
    const braceTabs = ' '.repeat(tabs);
    let formatted = `\n${braceTabs}{`;
    Object.keys(json).forEach(key => {
      const formatValue = formatJson(json[key], tabs + 2);
      const spaces = ' '.repeat(tabs + 2);
      formatted += `\n${spaces}${key}: ${formatValue},`;
    });
    formatted += `\n${braceTabs}}`;
    return removeDupNewline(formatted);
  }
  return `${json}`;
}

const NEWLINE_TABS = /(\n\s+){2}/;
function removeDupNewline(json: string): string {
  return json.replace(NEWLINE_TABS, '$1');
}
