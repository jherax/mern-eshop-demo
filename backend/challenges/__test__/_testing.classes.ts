/**
 * This file is just to test TypeScript features and errors
 */

interface IArgs {
  name: string;
}

abstract class Search {
  parameters: Record<string, unknown>;
}

class Finder {
  query(querystr?: string): string | null {
    return null;
  }
}

// "implements" as type: class, type or interface
class NumbersList implements Finder {
  public allNumbers: number[];

  constructor() {
    // super(); // only when using "extends"
    this.allNumbers = [1, 2];
  }

  public query() {
    return `?q=[${this.allNumbers.join(',')}]`;
  }

  public size(): number {
    return this.allNumbers.length;
  }
}
