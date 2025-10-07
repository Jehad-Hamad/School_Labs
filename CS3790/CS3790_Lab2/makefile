CC=g++
CC_FLAGS= -std=c++11 -Wall -Wextra -Werror -pedantic 
all: worker.cpp
	$(CC) $(CC_FLAGS) $^ -o a.out

run: 
	./a.out 

check: worker.cpp
	cppcheck $^