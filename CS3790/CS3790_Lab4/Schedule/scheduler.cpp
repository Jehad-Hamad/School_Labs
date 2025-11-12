#include "scheduler.h"

vector<Job> jobs;
int currentIndex = 0;

/**
 * @brief Adds the job to the jobs vector
 * @param pid Pid of the job
 * @param c Char which will act as the job
 */
void addJob(int pid, char c) {
    jobs.push_back({pid, c});
}

/**
 * @brief Switch to the next job in the queue.
 *        Wraps around to the first job if at the end.
 */
void nextJob() {
    if (jobs.empty()) return;
    currentIndex = (currentIndex + 1) % jobs.size();
}