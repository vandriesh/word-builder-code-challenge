export class Dictionary {
    words = [];
    storage = {};

    reset() {
        this.words = [];
        this.storage = {};
    }

    add(word: string) {
        if (this.storage[word]) {
            return false;
        }

        this.storage[word] = true;
        this.words.push(word);
    }

    addWords(words: string[]) {
        words.forEach(word => this.add(word));
    }

    getWords() {
        return this.words;
    }

    contains(word: string) {
        return this.words.indexOf(word) !== -1;
    }
}
