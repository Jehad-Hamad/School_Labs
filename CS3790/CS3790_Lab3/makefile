CC=g++
CC_FLAGS= -std=c++11 -Wall -Wextra -pedantic 

all: hash.out server.out

hash.out: 
	$(CC) $(CC_FLAGS) hash.cpp -o hash.out

server.out: 
	$(CC) $(CC_FLAGS) server.cpp -o server.out


check: hash.cpp
	cppcheck hash.cpp server.cpp

clean:
	rm -f hash.out server.out