from IProductClass import Iproduct

class Cutlet(Iproduct):
    def __init__(self):
        self._price:    int = 0
        self._calories: int = 0
        self._descr:    str = ""
    
    def get_Price(self) -> int:
        return self._price
    
    def get_Description(self) -> str:
        return self._descr + " with " + str(self._calories) + " cals"


class NonVegCutlet(Cutlet):
    def __init__(self, price: int, cals: int, descr: str):
        super().__init__()
        self._price = price
        self._calories = cals
        self._descr = descr