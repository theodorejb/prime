import * as prime from '../lib/prime';
import * as assert from 'assert';

describe('isPrime', function () {
    it('should work with prime numbers', function () {
        assert.strictEqual(prime.isPrime(2), true);
        assert.strictEqual(prime.isPrime(11), true);
        assert.strictEqual(prime.isPrime(104743), true);
        assert.strictEqual(prime.isPrime(15485867), true);
    });

    it('should work with non-prime numbers', function () {
        assert.strictEqual(prime.isPrime(4), false);
        assert.strictEqual(prime.isPrime(1), false);
        assert.strictEqual(prime.isPrime(2.5), false);
        assert.strictEqual(prime.isPrime(4.5), false);
        assert.strictEqual(prime.isPrime(-3), false);
        assert.strictEqual(prime.isPrime(12345678), false);
    });
});

describe('nthPrime', function () {
    it('should throw error for invalid numbers', function () {
        assert.throws(function () {
            prime.nthPrime(2.5);
        }, Error);

        assert.throws(function () {
            prime.nthPrime(-2);
        }, Error);
    });

    it('should return the correct prime for valid numbers', function () {
        assert.strictEqual(prime.nthPrime(1), 2);
        assert.strictEqual(prime.nthPrime(2), 3);
        assert.strictEqual(prime.nthPrime(5), 11);
        assert.strictEqual(prime.nthPrime(100001), 1299721);
        assert.strictEqual(prime.nthPrime(1000001), 15485867);
    });
});

describe('primeFactors', function () {
    it('should return an array containing the number if it is prime', function () {
        assert.deepEqual(prime.primeFactors(2), [2]);
        assert.deepEqual(prime.primeFactors(11), [11]);
    });

    it('should return all prime factors for non-prime numbers', function () {
        assert.deepEqual(prime.primeFactors(4), [2, 2]);
        assert.deepEqual(prime.primeFactors(15), [3, 5]);
        assert.deepEqual(prime.primeFactors(13195), [5, 7, 13, 29]);
    });
});
