/**
 * Returns true if the number is a prime
 */
export function isPrime(n: number): boolean {
    if (n === 2) {
        return true; // special case
    }

    if (n < 3 || n % 2 === 0 || n !== Math.floor(n)) {
        return false; // prime numbers must be odd integers greater than 2
    }

    var max = Math.floor(Math.sqrt(n)); // highest necessary divisor

    // skip even numbers
    for (var i = 3; i <= max; i += 2) {
        if (n % i === 0) {
            return false;
        }
    }

    return true;
}

/**
 * Returns the nth prime (e.g. 1 returns 2, 4 returns 7)
 */
export function nthPrime(n: number): number {
    if (n === 1) {
        return 2; // special case 2
    }

    if (n < 2 || n !== Math.floor(n)) {
        throw new Error('number must be an integer greater than or equal to 1');
    }

    var found, num;

    // known nth primes in increments of 25,000 - this is a ridiculous optimization
    var preCalculated = [287117, 611953, 951161, 1299709, 1655131, 2015177, 2381147, 2750159,
        3122321, 3497861, 3875827, 4256233, 4639267, 5023307, 5410121, 5800079,
        6190007, 6581963, 6973913, 7368787, 7765343, 8163047, 8561299, 8960453,
        9361217, 9763393, 10167551, 10570841, 10975507, 11381621, 11787331, 12195257,
        12603127, 13012261, 13423493, 13834103, 14246137, 14657917, 15070831, 15485863];

    // see if the calculation can be optimized
    var multiple = Math.floor(n / 25000);

    if (multiple > (preCalculated.length)) {
        multiple = preCalculated.length;
    }

    if (multiple > 0) {
        found = multiple * 25000;
        num = preCalculated[multiple - 1];
    } else {
        found = 2;
        num = 3;
    }

    while (found < n) {
        num += 2;

        if (isPrime(num)) {
            found += 1;
        }
    }

    return num;
}

/**
 * Returns an array containing the prime factors for the number.
 * The factors are in order from smallest to largest.
 */
export function primeFactors(n: number): number[] {
    if (isPrime(n)) {
        return [n];
    }

    var nthPrimeCount = 1;
    var curPrime = 2;
    var dividedN = n;
    var factors = [];

    // starting from the first prime, check whether each subsequent prime
    // is a factor until the product of the factors equals the number

    while (multiplyArray(factors) !== n) {
        if (dividedN % curPrime === 0) {
            // the prime is a factor
            dividedN = dividedN / curPrime;
            factors.push(curPrime);
        } else {
            nthPrimeCount += 1;
            curPrime = nthPrime(nthPrimeCount);
        }
    }

    return factors;

    /**
     * Returns the product of all the numbers in an array
     */
    function multiplyArray(a: number[]) {
        var product = 1

        for (var i = 0; i < a.length; i++) {
            product = product * a[i];
        }

        return product;
    }
}
