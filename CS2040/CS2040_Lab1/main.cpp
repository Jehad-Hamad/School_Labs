#include <iostream>
#include <iomanip>
#include <vector>
#include <cstdlib>
#include <string>
#include "Algorithims/algorithims.h"
#include "VecBuilder/vecBuilder.h"

using namespace std;

#include <iostream>
#include <vector>
#include <iomanip>
#include <chrono> // For better time measurement

using namespace std;

// File: main.cpp
// Name: Jehad M Hamad
// Date: Tuesday Feb 20
// Will calculate the time it takes an algorithm to sort a 2D vector based on the given sorting algorithm.
// Input: Algorithm name, the type of vector (random, sorted, reverse sorted), the 2D vector to sort,
//        an object of the `Algorithims` class, the sorting algorithm function from the object (bubble, select, etc.),
//        `time` to store the average time for the current size of the matrix, and `bestAlgoName` to store
//        the name of the algorithm with the best (lowest) time.
// Output: The function prints the sorting type and the time taken to sort each row in the 2D vector.
//         It also prints the average time for all rows and updates `bestAlgoName` if this algorithm has the fastest time.

void timeAlgorithim(const string &algoName, const string &type, vector<vector<int>> &vec,
                    Algorithims &sorter, void (Algorithims::*sortFunc)(vector<int> &),
                    double &time, string &bestAlgoName)
{
    double avetime = 0.00;
    double count = 0.0;

    cout << type;

    for (auto &row : vec)
    {
        clock_t start = clock();

        // Perform the sorting operation
        (sorter.*sortFunc)(row);

        clock_t end = clock();

        // Calculate time taken in seconds
        double time_taken = double(end - start) / double(CLOCKS_PER_SEC);

        count++;               // Increment row count
        avetime += time_taken; // Accumulate total time

        // Output time taken for the current row
        cout << "| " << setw(6) << fixed << setprecision(5) << time_taken << " |";
    }

    // Calculate average time if there are rows to sort
    avetime = avetime / count;

    // Output the average time for all rows
    cout << " Ave time " << setw(6) << fixed << setprecision(5) << avetime;

    // Update best algorithm name if the current algorithm is faster
    if (avetime < time)
    {
        time = avetime;
        bestAlgoName = algoName;
    }
    cout << "\n";
}

// File: main.cpp
// Name: Jehad M Hamad
// Date: Tuesday Feb 20
// evaluates the different runtime of quicksort, mergesort, insertion sort,
// selection sort, and bubble sort, and displays the results by using the timeAlgorithim
// Input: No input
// Output: the best times for all the diff sizes
int main()
{
    Algorithims sorter;
    VecBuilder vecBuild;
    srand(time(0));

    // Initialize double variables for random, sorted, and reversed sorted values for all the sizes
    double random_10 = 1000000, random_100 = 1000000, random_1K = 1000000, random_10K = 1000000, random_100K = 1000000, random_1M = 1000000, random_10M = 1000000;
    double sort_10 = 1000000, sort_100 = 1000000, sort_1K = 1000000, sort_10K = 1000000, sort_100K = 1000000, sort_1M = 1000000, sort_10M = 1000000;
    double revSort_10 = 1000000, revSort_100 = 1000000, revSort_1K = 1000000, revSort_10K = 1000000, revSort_100K = 1000000, revSort_1M = 1000000, revSort_10M = 1000000;

    // String variables for describing size categories
    string Rand10, Rand100, Rand1K, Rand10K, Rand100K, Rand1M, Rand10M;
    string Sort10, Sort100, Sort1K, Sort10K, Sort100K, Sort1M, Sort10M;
    string RevSort10, RevSort100, RevSort1K, RevSort10K, RevSort100K, RevSort1M, RevSort10M;

    // build the three sizes (10, 100, 1k, 10k, 100k, 1M, 10M) vectors;
    vector<vector<int>> rand10Vec = vecBuild.buildVector(10, 10);
    vector<vector<int>> rand100Vec = vecBuild.buildVector(10, 100);
    vector<vector<int>> rand1KVec = vecBuild.buildVector(10, 1000);
    vector<vector<int>> rand10KVec = vecBuild.buildVector(10, 10000);
    vector<vector<int>> rand100KVec = vecBuild.buildVector(10, 100000);
    vector<vector<int>> rand1MVec = vecBuild.buildVector(10, 100000);
    vector<vector<int>> rand10MVec = vecBuild.buildVector(10, 100000);

    // populate the three vectors with random numbers
    vecBuild.buildRandomVector(rand10Vec);
    vecBuild.buildRandomVector(rand100Vec);
    vecBuild.buildRandomVector(rand1KVec);
    vecBuild.buildRandomVector(rand10KVec);
    vecBuild.buildRandomVector(rand100KVec);
    vecBuild.buildRandomVector(rand1MVec);
    vecBuild.buildRandomVector(rand10MVec);

    // build the three vectors of (10, 100, 1k, 10k, 100k, 1M, 10M) with sorted numbers
    vector<vector<int>> sort10Vec = vecBuild.buildSortedVector(rand10Vec);
    vector<vector<int>> sort100Vec = vecBuild.buildSortedVector(rand100Vec);
    vector<vector<int>> sort1kVec = vecBuild.buildSortedVector(rand1KVec);
    vector<vector<int>> sort10kVec = vecBuild.buildSortedVector(rand10KVec);
    vector<vector<int>> sort100kVec = vecBuild.buildSortedVector(rand100KVec);
    vector<vector<int>> sort1MVec = vecBuild.buildSortedVector(rand1MVec);
    vector<vector<int>> sort10MVec = vecBuild.buildSortedVector(rand10MVec);

    // build the three vectors of (10, 100, 1k, 10k, 100k, 1M, 10M) with rev sorted numbers
    vector<vector<int>> revSort10Vec = vecBuild.buildReverseSortedVector(rand10Vec);
    vector<vector<int>> revSort100Vec = vecBuild.buildReverseSortedVector(rand100Vec);
    vector<vector<int>> revSort1kVec = vecBuild.buildReverseSortedVector(rand1KVec);
    vector<vector<int>> revSort10kVec = vecBuild.buildReverseSortedVector(rand10KVec);
    vector<vector<int>> revSort100kVec = vecBuild.buildReverseSortedVector(rand100KVec);
    vector<vector<int>> revSort1MVec = vecBuild.buildReverseSortedVector(rand1MVec);
    vector<vector<int>> revSort10MVec = vecBuild.buildReverseSortedVector(rand10MVec);

    cout << "\n                   Welcome to the Sorting Algorithim Test                   \n";
    cout << "                             Time is in seconds                               \n\n";

    // selection Sort
    cout << "The Algorithim is Selection Sort \n\n";
    // Making 2D vector for selection sort of size 10 for rand, sorted, and rev sorted
    // then makes copies of the three vectors that match
    // Calls the time Algorithim for selction sort for size 10 for the three different types
    // And so on, for the rest of the different sizes.

    vector<vector<int>> selectRand10 = rand10Vec;
    vector<vector<int>> selectSort10 = sort10Vec;
    vector<vector<int>> selectRevSort10 = revSort10Vec;
    cout << "The size is n = 10 \n";
    timeAlgorithim("Selection", "Random  ", selectRand10, sorter, &Algorithims::selectionSort, random_10, Rand10);
    timeAlgorithim("Selection", "Sort    ", selectSort10, sorter, &Algorithims::selectionSort, sort_10, Sort10);
    timeAlgorithim("Selection", "Rev Sort", selectRevSort10, sorter, &Algorithims::selectionSort, revSort_10, RevSort10);
    cout << endl;

    vector<vector<int>> selectRand100 = rand100Vec;
    vector<vector<int>> selectSort100 = sort100Vec;
    vector<vector<int>> selectRevSort100 = revSort100Vec;
    cout << "The size is n = 100 \n";
    timeAlgorithim("Selection", "Random  ", selectRand100, sorter, &Algorithims::selectionSort, random_100, Rand100);
    timeAlgorithim("Selection", "Sort    ", selectSort100, sorter, &Algorithims::selectionSort, sort_100, Sort100);
    timeAlgorithim("Selection", "Rev Sort", selectRevSort100, sorter, &Algorithims::selectionSort, revSort_100, RevSort100);
    cout << endl;

    vector<vector<int>> selectRand1k = rand1KVec;
    vector<vector<int>> selectSort1k = sort1kVec;
    vector<vector<int>> selectRevSort1k = revSort1kVec;
    cout << "The size is n = 1,000 \n";
    timeAlgorithim("Selection", "Random  ", selectRand1k, sorter, &Algorithims::selectionSort, random_1K, Rand1K);
    timeAlgorithim("Selection", "Sort    ", selectSort1k, sorter, &Algorithims::selectionSort, sort_1K, Sort1K);
    timeAlgorithim("Selection", "Rev Sort", selectRevSort1k, sorter, &Algorithims::selectionSort, revSort_1K, RevSort1K);
    cout << endl;

    vector<vector<int>> selectRand10k = rand10KVec;
    vector<vector<int>> selectSort10k = sort10kVec;
    vector<vector<int>> selectRevSort10k = revSort10kVec;
    cout << "The size is n = 10,000 \n";
    timeAlgorithim("Selection", "Random  ", selectRand10k, sorter, &Algorithims::selectionSort, random_10K, Rand10K);
    timeAlgorithim("Selection", "Sort    ", selectSort10k, sorter, &Algorithims::selectionSort, sort_10K, Sort10K);
    timeAlgorithim("Selection", "Rev Sort", selectRevSort10k, sorter, &Algorithims::selectionSort, revSort_10K, RevSort10K);
    cout << endl;

    vector<vector<int>> selectRand100k = rand100KVec;
    vector<vector<int>> selectSort100k = sort100kVec;
    vector<vector<int>> selectRevSort100k = revSort100kVec;
    cout << "The size is n = 100,000 \n";
    timeAlgorithim("Selection", "Random  ", selectRand100k, sorter, &Algorithims::selectionSort, random_100K, Rand100K);
    timeAlgorithim("Selection", "Sort    ", selectSort100k, sorter, &Algorithims::selectionSort, sort_100K, Sort100K);
    timeAlgorithim("Selection", "Rev Sort", selectRevSort100k, sorter, &Algorithims::selectionSort, revSort_100K, RevSort100K);

    cout << "\n\n";

    // Bubble Sort
    cout << "The Algorithim is Bubble Sort \n\n";
    // Making 2D vector for Bubble sort of size 10 for rand, sorted, and rev sorted
    // then makes copies of the three vectors that match
    // Calls the time Algorithim for Bubble sort for size 10 for the three different types
    // And so on, for the rest of the different sizes.

    vector<vector<int>> bubbleRand10 = rand10Vec;
    vector<vector<int>> bubbleSort10 = sort10Vec;
    vector<vector<int>> bubbleRevSort10 = revSort10Vec;
    cout << "The size is n = 10 \n";
    timeAlgorithim("Bubble", "Random  ", bubbleRand10, sorter, &Algorithims::bubbleSort, random_10, Rand10);
    timeAlgorithim("Bubble", "Sort    ", bubbleSort10, sorter, &Algorithims::bubbleSort, sort_10, Sort10);
    timeAlgorithim("Bubble", "Rev Sort", bubbleRevSort10, sorter, &Algorithims::bubbleSort, revSort_10, RevSort10);
    cout << endl;

    vector<vector<int>> bubbleRand100 = rand100Vec;
    vector<vector<int>> bubbleSort100 = sort100Vec;
    vector<vector<int>> bubbleRevSort100 = revSort100Vec;
    cout << "The size is n = 100 \n";
    timeAlgorithim("Bubble", "Random  ", bubbleRand100, sorter, &Algorithims::bubbleSort, random_100, Rand100);
    timeAlgorithim("Bubble", "Sort    ", bubbleSort100, sorter, &Algorithims::bubbleSort, sort_100, Sort100);
    timeAlgorithim("Bubble", "Rev Sort", bubbleRevSort100, sorter, &Algorithims::bubbleSort, revSort_100, RevSort100);
    cout << endl;

    vector<vector<int>> bubbleRand1k = rand1KVec;
    vector<vector<int>> bubbleSort1k = sort1kVec;
    vector<vector<int>> bubbleRevSort1k = revSort1kVec;
    cout << "The size is n = 1,000 \n";
    timeAlgorithim("Bubble", "Random  ", bubbleRand1k, sorter, &Algorithims::bubbleSort, random_1K, Rand1K);
    timeAlgorithim("Bubble", "Sort    ", bubbleSort1k, sorter, &Algorithims::bubbleSort, sort_1K, Sort1K);
    timeAlgorithim("Bubble", "Rev Sort", bubbleRevSort1k, sorter, &Algorithims::bubbleSort, revSort_1K, RevSort1K);
    cout << endl;

    vector<vector<int>> bubbleRand10k = rand10KVec;
    vector<vector<int>> bubbleSort10k = sort10kVec;
    vector<vector<int>> bubbleRevSort10k = revSort10kVec;
    cout << "The size is n = 10,000 \n";
    timeAlgorithim("Bubble", "Random  ", bubbleRand10k, sorter, &Algorithims::bubbleSort, random_10K, Rand10K);
    timeAlgorithim("Bubble", "Sort    ", bubbleSort10k, sorter, &Algorithims::bubbleSort, sort_10K, Sort10K);
    timeAlgorithim("Bubble", "Rev Sort", bubbleRevSort10k, sorter, &Algorithims::bubbleSort, revSort_10K, RevSort10K);
    cout << endl;

    vector<vector<int>> bubbleRand100k = rand100KVec;
    vector<vector<int>> bubbleSort100k = sort100kVec;
    vector<vector<int>> bubbleRevSort100k = revSort100kVec;
    cout << "The size is n = 100,000 \n";
    timeAlgorithim("Bubble", "Random  ", bubbleRand100k, sorter, &Algorithims::bubbleSort, random_100K, Rand100K);
    timeAlgorithim("Bubble", "Sort    ", bubbleSort100k, sorter, &Algorithims::bubbleSort, sort_100K, Sort100K);
    timeAlgorithim("Bubble", "Rev Sort", bubbleRevSort100k, sorter, &Algorithims::bubbleSort, revSort_100K, RevSort100K);

    cout << "\n\n";

    // Insertion Sort
    cout << "The Algorithim is Insertion Sort \n\n";
    // Making 2D vector for Insertion sort of size 10 for rand, sorted, and rev sorted
    // then makes copies of the three vectors that match
    // Calls the time Algorithim for Insertion sort for size 10 for the three different types
    // And so on, for the rest of the different sizes.

    vector<vector<int>> insertionRand10 = rand10Vec;
    vector<vector<int>> insertionSort10 = sort10Vec;
    vector<vector<int>> insertionRevSort10 = revSort10Vec;
    cout << "The size is n = 10 \n";
    timeAlgorithim("Insertion", "Random  ", insertionRand10, sorter, &Algorithims::insertionSort, random_10, Rand10);
    timeAlgorithim("Insertion", "Sort    ", insertionSort10, sorter, &Algorithims::insertionSort, sort_10, Sort10);
    timeAlgorithim("Insertion", "Rev Sort", insertionRevSort10, sorter, &Algorithims::insertionSort, revSort_10, RevSort10);
    cout << endl;

    vector<vector<int>> insertionRand100 = rand100Vec;
    vector<vector<int>> insertionSort100 = sort100Vec;
    vector<vector<int>> insertionRevSort100 = revSort100Vec;
    cout << "The size is n = 100 \n";
    timeAlgorithim("Insertion", "Random  ", insertionRand100, sorter, &Algorithims::insertionSort, random_100, Rand100);
    timeAlgorithim("Insertion", "Sort    ", insertionSort100, sorter, &Algorithims::insertionSort, sort_100, Sort100);
    timeAlgorithim("Insertion", "Rev Sort", insertionRevSort100, sorter, &Algorithims::insertionSort, revSort_100, RevSort100);
    cout << endl;

    vector<vector<int>> insertionRand1k = rand1KVec;
    vector<vector<int>> insertionSort1k = sort1kVec;
    vector<vector<int>> insertionRevSort1k = revSort1kVec;
    cout << "The size is n = 1,000 \n";
    timeAlgorithim("Insertion", "Random  ", insertionRand1k, sorter, &Algorithims::insertionSort, random_1K, Rand1K);
    timeAlgorithim("Insertion", "Sort    ", insertionSort1k, sorter, &Algorithims::insertionSort, sort_1K, Sort1K);
    timeAlgorithim("Insertion", "Rev Sort", insertionRevSort1k, sorter, &Algorithims::insertionSort, revSort_1K, RevSort1K);
    cout << endl;

    vector<vector<int>> insertionRand10k = rand10KVec;
    vector<vector<int>> insertionSort10k = sort10kVec;
    vector<vector<int>> insertionRevSort10k = revSort10kVec;
    cout << "The size is n = 10,000 \n";
    timeAlgorithim("Insertion", "Random  ", insertionRand10k, sorter, &Algorithims::insertionSort, random_10K, Rand10K);
    timeAlgorithim("Insertion", "Sort    ", insertionSort10k, sorter, &Algorithims::insertionSort, sort_10K, Sort10K);
    timeAlgorithim("Insertion", "Rev Sort", insertionRevSort10k, sorter, &Algorithims::insertionSort, revSort_10K, RevSort10K);
    cout << endl;

    vector<vector<int>> insertionRand100k = rand100KVec;
    vector<vector<int>> insertionSort100k = sort100kVec;
    vector<vector<int>> insertionRevSort100k = revSort100kVec;
    cout << "The size is n = 100,000 \n";
    timeAlgorithim("Insertion", "Random  ", insertionRand100k, sorter, &Algorithims::insertionSort, random_100K, Rand100K);
    timeAlgorithim("Insertion", "Sort    ", insertionSort100k, sorter, &Algorithims::insertionSort, sort_100K, Sort100K);
    timeAlgorithim("Insertion", "Rev Sort", insertionRevSort100k, sorter, &Algorithims::insertionSort, revSort_100K, RevSort100K);

    // Merge Sort
    cout << "The Algorithim is Merge Sort \n\n";
    // Making 2D vector for Merge sort of size 10 for rand, sorted, and rev sorted
    // then makes copies of the three vectors that match
    // Calls the time Algorithim for Merge sort for size 10 for the three different types
    // And so on, for the rest of the different sizes.

    vector<vector<int>> mergeRand10 = rand10Vec;
    vector<vector<int>> mergeSort10 = sort10Vec;
    vector<vector<int>> mergeRevSort10 = revSort10Vec;
    cout << "The size is n = 10 \n";
    timeAlgorithim("Merge", "Random  ", mergeRand10, sorter, &Algorithims::mergeSort, random_10, Rand10);
    timeAlgorithim("Merge", "Sort    ", mergeSort10, sorter, &Algorithims::mergeSort, sort_10, Sort10);
    timeAlgorithim("Merge", "Rev Sort", mergeRevSort10, sorter, &Algorithims::mergeSort, revSort_10, RevSort10);
    cout << endl;

    vector<vector<int>> mergeRand100 = rand100Vec;
    vector<vector<int>> mergeSort100 = sort100Vec;
    vector<vector<int>> mergeRevSort100 = revSort100Vec;
    cout << "The size is n = 100 \n";
    timeAlgorithim("Merge", "Random  ", mergeRand100, sorter, &Algorithims::mergeSort, random_100, Rand100);
    timeAlgorithim("Merge", "Sort    ", mergeSort100, sorter, &Algorithims::mergeSort, sort_100, Sort100);
    timeAlgorithim("Merge", "Rev Sort", mergeRevSort100, sorter, &Algorithims::mergeSort, revSort_100, RevSort100);
    cout << endl;

    vector<vector<int>> mergeRand1k = rand1KVec;
    vector<vector<int>> mergeSort1k = sort1kVec;
    vector<vector<int>> mergeRevSort1k = revSort1kVec;
    cout << "The size is n = 1,000 \n";
    timeAlgorithim("Merge", "Random  ", mergeRand1k, sorter, &Algorithims::mergeSort, random_1K, Rand1K);
    timeAlgorithim("Merge", "Sort    ", mergeSort1k, sorter, &Algorithims::mergeSort, sort_1K, Sort1K);
    timeAlgorithim("Merge", "Rev Sort", mergeRevSort1k, sorter, &Algorithims::mergeSort, revSort_1K, RevSort1K);
    cout << endl;

    vector<vector<int>> mergeRand10k = rand10KVec;
    vector<vector<int>> mergeSort10k = sort10kVec;
    vector<vector<int>> mergeRevSort10k = revSort10kVec;
    cout << "The size is n = 10,000 \n";
    timeAlgorithim("Merge", "Random  ", mergeRand10k, sorter, &Algorithims::mergeSort, random_10K, Rand10K);
    timeAlgorithim("Merge", "Sort    ", mergeSort10k, sorter, &Algorithims::mergeSort, sort_10K, Sort10K);
    timeAlgorithim("Merge", "Rev Sort", mergeRevSort10k, sorter, &Algorithims::mergeSort, revSort_10K, RevSort10K);
    cout << endl;

    vector<vector<int>> mergeRand100k = rand100KVec;
    vector<vector<int>> mergeSort100k = sort100kVec;
    vector<vector<int>> mergeRevSort100k = revSort100kVec;
    cout << "The size is n = 100,000 \n";
    timeAlgorithim("Merge", "Random  ", mergeRand100k, sorter, &Algorithims::mergeSort, random_100K, Rand100K);
    timeAlgorithim("Merge", "Sort    ", mergeSort100k, sorter, &Algorithims::mergeSort, sort_100K, Sort100K);
    timeAlgorithim("Merge", "Rev Sort", mergeRevSort100k, sorter, &Algorithims::mergeSort, revSort_100K, RevSort100K);
    cout << endl;

    vector<vector<int>> mergeRand1M = rand1MVec;
    vector<vector<int>> mergeSort1M = sort1MVec;
    vector<vector<int>> mergeRevSort1M = revSort1MVec;
    cout << "The size is n = 1,000,000 \n";
    timeAlgorithim("Merge", "Random  ", mergeRand1M, sorter, &Algorithims::mergeSort, random_1M, Rand1M);
    timeAlgorithim("Merge", "Sort    ", mergeSort1M, sorter, &Algorithims::mergeSort, sort_1M, Sort1M);
    timeAlgorithim("Merge", "Rev Sort", mergeRevSort1M, sorter, &Algorithims::mergeSort, revSort_1M, RevSort1M);
    cout << endl;

    vector<vector<int>> mergeRand10M = rand10MVec;
    vector<vector<int>> mergeSort10M = sort10MVec;
    vector<vector<int>> mergeRevSort10M = revSort10MVec;
    cout << "The size is n = 10,000,000 \n";
    timeAlgorithim("Merge", "Random  ", mergeRand10M, sorter, &Algorithims::mergeSort, random_10M, Rand10M);
    timeAlgorithim("Merge", "Sort    ", mergeSort10M, sorter, &Algorithims::mergeSort, sort_10M, Sort10M);
    timeAlgorithim("Merge", "Rev Sort", mergeRevSort10M, sorter, &Algorithims::mergeSort, revSort_10M, RevSort10M);
    cout << endl;

    cout << "\n\n";

    // Quick Sort
    cout << "The Algorithim is Quick Sort \n\n";
    // Making 2D vector for Quick sort of size 10 for rand, sorted, and rev sorted
    // then makes copies of the three vectors that match
    // Calls the time Algorithim for Quick sort for size 10 for the three different types
    // And so on, for the rest of the different sizes.
    vector<vector<int>> quickRand10 = rand10Vec;
    vector<vector<int>> quickSort10 = sort10Vec;
    vector<vector<int>> quickRevSort10 = revSort10Vec;
    cout << "The size is n = 10 \n";
    timeAlgorithim("Quick", "Random  ", quickRand10, sorter, &Algorithims::quickSort, random_10, Rand10);
    timeAlgorithim("Quick", "Sort    ", quickSort10, sorter, &Algorithims::quickSort, sort_10, Sort10);
    timeAlgorithim("Quick", "Rev Sort", quickRevSort10, sorter, &Algorithims::quickSort, revSort_10, RevSort10);
    cout << endl;

    vector<vector<int>> quickRand100 = rand100Vec;
    vector<vector<int>> quickSort100 = sort100Vec;
    vector<vector<int>> quickRevSort100 = revSort100Vec;
    cout << "The size is n = 100 \n";
    timeAlgorithim("Quick", "Random  ", quickRand100, sorter, &Algorithims::quickSort, random_100, Rand100);
    timeAlgorithim("Quick", "Sort    ", quickSort100, sorter, &Algorithims::quickSort, sort_100, Sort100);
    timeAlgorithim("Quick", "Rev Sort", quickRevSort100, sorter, &Algorithims::quickSort, revSort_100, RevSort100);
    cout << endl;

    vector<vector<int>> quickRand1k = rand1KVec;
    vector<vector<int>> quickSort1k = sort1kVec;
    vector<vector<int>> quickRevSort1k = revSort1kVec;
    cout << "The size is n = 1,000 \n";
    timeAlgorithim("Quick", "Random  ", quickRand1k, sorter, &Algorithims::quickSort, random_1K, Rand1K);
    timeAlgorithim("Quick", "Sort    ", quickSort1k, sorter, &Algorithims::quickSort, sort_1K, Sort1K);
    timeAlgorithim("Quick", "Rev Sort", quickRevSort1k, sorter, &Algorithims::quickSort, revSort_1K, RevSort1K);
    cout << endl;

    vector<vector<int>> quickRand10k = rand10KVec;
    vector<vector<int>> quickSort10k = sort10kVec;
    vector<vector<int>> quickRevSort10k = revSort10kVec;
    cout << "The size is n = 10,000 \n";
    timeAlgorithim("Quick", "Random  ", quickRand10k, sorter, &Algorithims::quickSort, random_10K, Rand10K);
    timeAlgorithim("Quick", "Sort    ", quickSort10k, sorter, &Algorithims::quickSort, sort_10K, Sort10K);
    timeAlgorithim("Quick", "Rev Sort", quickRevSort10k, sorter, &Algorithims::quickSort, revSort_10K, RevSort10K);
    cout << endl;

    vector<vector<int>> quickRand100k = rand100KVec;
    vector<vector<int>> quickSort100k = sort100kVec;
    vector<vector<int>> quickRevSort100k = revSort100kVec;
    cout << "The size is n = 100,000 \n";
    timeAlgorithim("Quick", "Random  ", quickRand100k, sorter, &Algorithims::quickSort, random_100K, Rand100K);
    timeAlgorithim("Quick", "Sort    ", quickSort100k, sorter, &Algorithims::quickSort, sort_100K, Sort100K);
    timeAlgorithim("Quick", "Rev Sort", quickRevSort100k, sorter, &Algorithims::quickSort, revSort_100K, RevSort100K);
    cout << endl;

    vector<vector<int>> quickRand1M = rand1MVec;
    vector<vector<int>> quickSort1M = sort1MVec;
    vector<vector<int>> quickRevSort1M = revSort1MVec;
    cout << "The size is n = 1,000,000 \n";
    timeAlgorithim("Quick", "Random  ", quickRand1M, sorter, &Algorithims::quickSort, random_1M, Rand1M);
    timeAlgorithim("Quick", "Sort    ", quickSort1M, sorter, &Algorithims::quickSort, sort_1M, Sort1M);
    timeAlgorithim("Quick", "Rev Sort", quickRevSort1M, sorter, &Algorithims::quickSort, revSort_1M, RevSort1M);
    cout << endl;

    vector<vector<int>> quickRand10M = rand10MVec;
    vector<vector<int>> quickSort10M = sort10MVec;
    vector<vector<int>> quickRevSort10M = revSort10MVec;
    cout << "The size is n = 10,000,000 \n";
    timeAlgorithim("Quick", "Random  ", quickRand10M, sorter, &Algorithims::quickSort, random_10M, Rand10M);
    timeAlgorithim("Quick", "Sort    ", quickSort10M, sorter, &Algorithims::quickSort, sort_10M, Sort10M);
    timeAlgorithim("Quick", "Rev Sort", quickRevSort10M, sorter, &Algorithims::quickSort, revSort_10M, RevSort10M);
    cout << endl;

    cout << "\n\n";

    // prints the best times and algorithims for the different types(rand, sorted, rev sorted), and sizes.
    // will happen for size 100, 1000, 1k and so on.

    cout << "                              Best Algorithms                                \n\n";
    cout << "                             Time is in seconds                               \n\n";

    cout << "                 N = 10    \n";
    cout << "Random    :  " << Rand10 << " The Average time was " << random_10 << "\n";
    cout << "Sort      :  " << Sort10 << " The Average time was " << sort_10 << "\n";
    cout << "Rev Sort  :  " << RevSort10 << " The Average time was " << revSort_10 << "\n";
    cout << endl;

    cout << "                 N = 100    \n";
    cout << "Random    :  " << Rand100 << " The Average time was " << random_100 << "\n";
    cout << "Sort      :  " << Sort100 << " The Average time was " << sort_100 << "\n";
    cout << "Rev Sort  :  " << RevSort100 << " The Average time was " << revSort_100 << "\n";
    cout << endl;

    cout << "                 N = 1,000    \n";
    cout << "Random    :  " << Rand1K << " The Average time was " << random_1K << "\n";
    cout << "Sort      :  " << Sort1K << " The Average time was " << sort_1K << "\n";
    cout << "Rev Sort  :  " << RevSort1K << " The Average time was " << revSort_1K << "\n";
    cout << endl;

    cout << "                 N = 10,000    \n";
    cout << "Random    :  " << Rand10K << " The Average time was " << random_10K << "\n";
    cout << "Sort      :  " << Sort10K << " The Average time was " << sort_10K << "\n";
    cout << "Rev Sort  :  " << RevSort10K << " The Average time was " << revSort_10K << "\n";
    cout << endl;

    cout << "                 N = 100,000   \n";
    cout << "Random    :  " << Rand100K << " The Average time was " << random_100K << "\n";
    cout << "Sort      :  " << Sort100K << " The Average time was " << sort_100K << "\n";
    cout << "Rev Sort  :  " << RevSort100K << " The Average time was " << revSort_100K << "\n";
    cout << endl;

    cout << "                 N = 1,000,000   \n";
    cout << "Random    :  " << Rand1M << " The Average time was " << random_1M << "\n";
    cout << "Sort      :  " << Sort1M << " The Average time was " << sort_1M << "\n";
    cout << "Rev Sort  :  " << RevSort1M << " The Average time was " << revSort_1M << "\n";
    cout << endl;

    cout << "                 N = 10,000,000   \n";
    cout << "Random    :  " << Rand10M << " The Average time was " << random_10M << "\n";
    cout << "Sort      :  " << Sort10M << " The Average time was " << sort_10M << "\n";
    cout << "Rev Sort  :  " << RevSort10M << " The Average time was " << revSort_10M << "\n";
    cout << endl;
}