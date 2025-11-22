from abc import ABC, abstractmethod
from Burger import Burger, VegBurger, NonVegBurger
from Pizza import Pizza, VegPizza, NonVegPizza
from Noodle import Noodles, VegNoodles, NonVegNoodles
from Cutlet import Cutlet, NonVegCutlet

class ProductFactory(ABC):
        
    @abstractmethod
    def createBurger(self, price: int, cals: int, descr: str) -> Burger:
        pass

    @abstractmethod
    def createPizza(self, price: int,  cals: int, size: str, descr: str) -> Pizza:
        pass

    @abstractmethod
    def createNoodles(Self, price: int, cals: int, descr: str) -> Noodles:
        pass

    @abstractmethod
    def createCutlet(Self, price: int, cals: int, descr: str) -> Cutlet:
        pass
    
class VegProductFactory(ProductFactory):
    def createBurger(self, price: int, cals: int, descr: str) -> VegBurger:
        return VegBurger(price, cals, descr)
    
    def createPizza(self, price: int, cals: int, size: str, descr: str) -> VegPizza:
        return VegPizza(price, cals, size, descr)
    
    def createNoodles(self, price: int, cals: int, descr: str) -> VegNoodles:
        return VegNoodles(price, cals, descr)
    
    def createCutlet(self, price: int, cals: int, descr: str) -> Cutlet:
        raise ValueError("I cant make a veggie cutlet")
    

class NonVegProductFactory(ProductFactory):
    def createBurger(self, price: int, cals: int, descr: str) -> NonVegBurger:
        return NonVegBurger(price, cals, descr)
    
    def createPizza(self, price: int, cals: int, size: str, descr: str) -> NonVegPizza:
        return NonVegPizza(price, cals, size, descr)
    
    def createNoodles(self, price: int, cals: int, descr: str) -> NonVegNoodles:
        return NonVegNoodles(price, cals, descr)
    
    def createCutlet(self, price: int, cals: int, descr: str) -> NonVegCutlet:
        return NonVegCutlet(price, cals, descr)