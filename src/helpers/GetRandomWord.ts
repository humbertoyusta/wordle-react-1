import randomWords from "random-words";

export default function getRandomWord (length: Number) {
    while (true) {
        const word = randomWords({maxLength: 5, exactly: 1})[0];
        if (word.length === length)
            return word.toUpperCase();
    }
}