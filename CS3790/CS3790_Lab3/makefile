CC = g++
CC_FLAGS = -std=c++11 -Wall -Wextra -pedantic
BIN = bin

all: $(BIN)/hash.out $(BIN)/server.out $(BIN)/client.out $(BIN)/addNums.out

$(BIN)/hash.out: hash.cpp
	mkdir -p $(BIN)
	$(CC) $(CC_FLAGS) hash.cpp -o $(BIN)/hash.out

$(BIN)/server.out: server.cpp
	mkdir -p $(BIN)
	$(CC) $(CC_FLAGS) server.cpp -o $(BIN)/server.out

$(BIN)/client.out: client.cpp
	mkdir -p $(BIN)
	$(CC) $(CC_FLAGS) client.cpp -o $(BIN)/client.out

$(BIN)/addNums.out: addNums.cpp
	mkdir -p $(BIN)
	$(CC) $(CC_FLAGS) addNums.cpp -o $(BIN)/addNums.out

check:
	cppcheck hash.cpp server.cpp client.cpp addNums.cpp

clean:
	rm -rf $(BIN)