#include "worker.h"

int main(int argc, char* argv[]) {
    // Start and end from command line
    int start = stoi(argv[1]);
    int end = stoi(argv[2]);

    // Call the prime function
    primes(start, end);

    int status = fileOrPrint(argc, start, end);
    return status;
}

// Function to find the list of prime numbers
// Sieve of Eratosthenes
void primes(int start, int end) {
    // Invaild range
    if (start > end) return;

    // No primes less than 2 and negative end value
    if (end < 2) return;

    // Start at 2 if start less than 2
    if (start < 2) start = 2;

    vector<bool> A(end + 1, true);  // Bool vector of all true
    int limit = sqrt(end);

    for (int i = 2; i <= limit; i++) {  // Go from 2 -> sqrt(n)
        // Checks all multiples of i and sets them false so we dont do them all again
        if (A[i]) {
            for (int j = 0; (i * i) + (j * i) <= end; j++) {
                int pos = (i * i) + (j * i);
                A[pos] = false;
            }
        }
    }

    // Start loop at number you want to add and go till end
    for (int i = start; i <= end; i++) {
        if (A[i]) oss << i << " ";
    }
}

int fileOrPrint(int argc, int start, int end) {
    int status = -10;
    if (argc == 3) {
        // Build file name from range
        string fileName = "Results/" + to_string(start) + "to" + to_string(end) + ".txt";

        // Write results to file (create/overwrite each time)
        if (!(oss.str().empty())) {
            ofstream file(fileName);
            file << oss.str();
            file.close();
            status = 0;
        }
    } else if (argc >= 4) {
        cout << "primes found : " << oss.str();
        status = 0;
    } else {
        cout << "You cant pass me less than three";
        status = -1;
    }
    return status;
}