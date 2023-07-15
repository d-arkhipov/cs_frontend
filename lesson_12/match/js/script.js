'use strict';

function match(pattern, strings, sep = '.') {
    if (
        typeof pattern !== 'string' ||
        !Array.isArray(strings)
    ) {
        throw new TypeError('Parameter is wrong type.');
    }

    if (
        !pattern.length || !strings.length
    ) {
        return [];
    }

    const res = [],
          trie = new Trie();

    for (const str of strings) {
        trie.addWord(str.split(sep));
    }

    const patternChunks = pattern.split(sep),
          canPatternExpand = patternChunks.at(-1) === '**';

    if (canPatternExpand) {
        patternChunks.pop();
    }

    const minLength = patternChunks.length,
          maxLength = canPatternExpand ? Infinity : minLength;

    let cursor = trie;

    patternChunks.forEach((value) => {
        cursor = cursor.go(value);

        cursor.words.forEach((word) => {
            if (canPatternExpand ? word.length >= minLength : word.length === maxLength) {
                res.push(word.join(sep));
            }
        });
    });

    if (canPatternExpand) {
        for (cursor = cursor.go('*'); !cursor.isDone; cursor = cursor.go('*')) {
            res.push(...cursor.words.map(value => value.join(sep)));
        }
    }

    return res;
}
