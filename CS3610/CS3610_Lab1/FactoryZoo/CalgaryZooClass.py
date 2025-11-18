from FactoryZoo.IZooClass import Zoo
from FactoryZoo.AnimalFactoryClass import AnimalFactory

class CalgaryZoo(Zoo):
    def __init__(self) -> None:
        super().__init__()
        self.itinerary = "Welcome to the Calgary Zoo! Our Itinerary: 1) Penguin Plunge. 2)  Wild Canad"

    def createAnimal(self) -> None:
        animals = ["moose", "penguin", "grizzlybear"]
        myAnimals = list(map(AnimalFactory.createAnimal, animals))

        for myAnimal in myAnimals:
            if myAnimal:
                self.animals.append(myAnimal)
