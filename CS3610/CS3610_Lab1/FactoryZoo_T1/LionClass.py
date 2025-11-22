from IAnimalClass import IAnimal

class Lion(IAnimal):  
    def __init__(self):
        self.name = "Lion"
    
    def say_something(self):
        return f"The {self.name} is Roaring"