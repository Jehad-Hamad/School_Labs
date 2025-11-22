from IAnimalClass import IAnimal

from typing import Type
from abc import abstractmethod


class Zoo:
    def __init__(self) -> None:
        self.animals: list[Type[IAnimal]]=[]
        self.itinerary: str

    @abstractmethod
    def createAnimal() -> None:
        pass
    
    def askEachAnimalToSaySomething(self) -> None:
        for animal in self.animals:
            print(animal.say_something())

    def startVist(self) -> None:
        self.createAnimal()
        print(self.itinerary)
        self.askEachAnimalToSaySomething()     