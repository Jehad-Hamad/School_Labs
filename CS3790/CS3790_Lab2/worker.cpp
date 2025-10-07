#include <cmath>
#include <iostream>
#include <vector>

using namespace std;

vector<int> primes(int, int);

int main(int argc, char* argv[]) {
    cout << "My argc is " << argc << endl;

    vector<int> vec = primes(stoi(argv[1]), stoi(argv[2]));
    for (auto i : vec) {
        cout << i << " ";
    }
    cout << endl;
}

// Function to find the list of prime numbers
// Sieve of Eratosthenes
vector<int> primes(int start, int end) {
    vector<bool> A(end, true);             // Bool vector of all true
    for (int i = 2; i < sqrt(end); i++) {  // Go from 2 -> sqrt(n)
        // Checks all multiples of i and sets them false so we dont do them all again
        if (A[i] == true) {
            for (int j = 0; (i * i) + (j * i) < end; j++) {
                int pos = (i * i) + (j * i);
                A[pos] = false;
            }
        }
    }

    vector<int> vec;
    // Start loop at number you want to add and go till end
    // Push to the vector you will return
    for (int i = start; i < end; i++) {
        if (A[i] == true) {
            vec.push_back(i);
        }
    }

    return vec;  // return vec
}