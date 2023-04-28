function isValid(val) {
    class BracketsChecker {
        constructor(val) {
            if (typeof val !== 'string') {
                throw new Error(`The parameter should be a string. "${typeof val}" given.`);
            }

            if (!val.length) {
                throw new Error(`The string is empty.`);
            }

            this.inputStr = val;
        }

        check() {
            const inputLength = this.inputStr.length;
            const stack = new Stack(Array, inputLength);

            for (let i = 0; i < inputLength; i++) {
                const char = this.inputStr.charAt(i);

                switch (char) {
                    case '{':
                    case '[':
                    case '(':
                        stack.push(char);
                        break;
                    case '}':
                    case ']':
                    case ')':
                        if (stack.isEmpty()) return false;

                        const prevChar = stack.pop();

                        if (
                            (char === '}' && prevChar !== '{') ||
                            (char === ']' && prevChar !== '[') ||
                            (char === ')' && prevChar !== '(')
                        ) {
                            return false;
                        }

                        break;
                    default:
                        break;
                }
            }

            return stack.isEmpty();
        }
    }

    const bracketsChecker = new BracketsChecker(val);

    return bracketsChecker.check();
}
