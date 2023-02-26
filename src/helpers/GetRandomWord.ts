import randomWords from "random-words";

// Get a random word of a given length
export default function getRandomWord (length: Number) {
    // Loop until a word of the correct length is found
    while (true) {
        // Get a random word
        const word = randomWords({maxLength: 5, exactly: 1})[0];
        // Check if the word is of the correct length and return it in uppercase
        if (word.length === length)
            return word.toUpperCase();
    }
}