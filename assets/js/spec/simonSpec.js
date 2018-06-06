describe("generateRandomNumber function", function() {
    it("should generate a random number between 0 and 6", function() {
        expect(generateRandomNumber() >= 0 && generateRandomNumber() < 7).toBeTruthy();
    });
});

describe("playerCountCheck function", function() {
    it("should return true if the playerCount array matches the gameCount array", function() {
        expect(playerCountCheck()).toBe(true);
    });
});