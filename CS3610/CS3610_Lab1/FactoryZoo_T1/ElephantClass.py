from IAnimalClass import IAnimal

class Elephant(IAnimal):  
    def __init__(self):
        self.name = "Elephant"
    
    def say_something(self):
        return f"The {self.name} is trumpeting"