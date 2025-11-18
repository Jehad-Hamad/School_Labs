from FactoryZoo.IZooClass import Zoo
from FactoryZoo.ZooFactoryClass import AnimalFactory

class TorontoZoo(Zoo):
    def __init__(self) -> None:
        super().__init__()
        self.itinerary = "Welcome to the Toronto Zoo! Our Itinerary: 1) African Savanna. 2) Tundra Trek"
    
    def createAnimal(self) -> None:
        animals = ["Lion", "Elephant", "penguin", "whitebear"]
        myAnimals = list(map(AnimalFactory.createAnimal, animals))

        for myAnimal in myAnimals:
            if myAnimal:
                self.animals.append(myAnimal)
