from ProductFactory import ProductFactory, VegProductFactory, NonVegProductFactory
from IProductClass import Iproduct


class FoodApp:
    def __init__(self):
        self.availableFood = {"VegFood": VegProductFactory, "NonVegFood": NonVegProductFactory}
    
    def makeOrder(self, productsNames: list[str]) -> list[Iproduct]:
        products: Iproduct = []

        for product in productsNames:
            if "veggie" in product.lower():
                description: str = "I am a Veggie "
                factory: ProductFactory = self.availableFood["VegFood"]
            else:
                description: str = "I am a Non Veggie "
                factory: ProductFactory = self.availableFood["NonVegFood"]
            
            try:
                if "burger" in product.lower():
                    products.append(factory.createBurger(self, 10, 200, description + " Burger"))
                elif "pizza" in product.lower():
                    products.append(factory.createPizza(self, 15, 350, "Large", description + " Pizza"))
                elif "noodles" in product.lower():
                    products.append(factory.createNoodles(self, 8, 200, description + " Noodles"))
                elif "cutlet" in product.lower():
                    products.append(factory.createCutlet(self, 12, 300, description + " Cutlet"))
                else:io
                    raise Exception(f"I can't make this food")
                
            except Exception as _e:
                print(_e)
        
        return products
    
    def getOrderDescription(self, products: list[Iproduct]) -> str:
        result:  str = ""
        for product in products:
            result += product.get_Description() + "\n"
        return result
