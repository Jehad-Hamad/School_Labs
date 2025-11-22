from IProductClass import Iproduct

class Pizza(Iproduct):
    def __init__(self):
        self._price:    int = 0
        self._calories: int = 0
        self._descr:    str = ""
        self._size:     str = "Small"

    def get_Price(self) -> int:
        return self._price
    
    def get_Description(self) -> str:
        return self._descr + " with " + str(self._calories) + " cals and is a size " + self._size

class VegPizza(Pizza):
    def __init__(self, price: int, cals: int, size: str, descr: str):
        super().__init__()
        self._price = price
        self._calories = cals
        self._descr = descr
        self._size = size

    def showVegAdver(self) -> str:
        return "This is a veggie pizza please buy me"
    
class NonVegPizza(Pizza):
    def __init__(self, price: int, cals: int, size: str, descr: str):
        super().__init__()
        self._price = price
        self._calories = cals
        self._descr = descr
        self._size = size