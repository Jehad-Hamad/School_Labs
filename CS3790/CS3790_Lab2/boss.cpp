#include "boss.h"

int main(int argc, char* argv[]) {
    // Get worker amount and the range
    int n = stoi(argv[1]);
    int range = stoi(argv[2]);

    vector<string> setOfRanges = setRanges(n, range);  // Get my ranges
    startWorkers(n, argv, setOfRanges);                // Start workers

    return 0;
}

// Function to get ranges for workers
vector<string> setRanges(int n, int range) {
    int added = (range / n) - 1;  // Added amount each time
    int startRange = 1;           // StartRange at 1
    vector<string> setOfRanges;   // Vector to store ranges

    for (int i = 1; i <= n; i++) {
        int endRange = startRange + added;  // Get endRange

        if (i == n) endRange = range;  // Last worker will always have range as thier endRange
        setOfRanges.push_back(to_string(startRange));
        setOfRanges.push_back(to_string(endRange));

        startRange = endRange + 1;  // Set startRange to my endRange + 1
    }

    return setOfRanges;  // return ranges
}

// Function to start workers
void startWorkers(int n, char* argv[], vector<string>& setOfRanges) {
    // Forloop to go to each worker
    for (int i = 0; i < n; i++) {
        int pid = fork();  // Fork process to get worker
        int status;
        const char* r1 = setOfRanges[2 * i].c_str();
        const char* r2 = setOfRanges[2 * i + 1].c_str();

        if (pid == 0) {  // If worker call do the work needed
            execl("./worker.out", argv[0], r1, r2, (char*)NULL);
            perror("execl failed");  // Only runs if execl fails
        } else {                     // Boss report back what the worker has done
            wait(&status);
            printf("Worker %d has done from range %3s : %3s \n", i + 1, r1, r2);
        }
    }
}