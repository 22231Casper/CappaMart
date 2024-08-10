import json
import os
from colorama import Fore

print("Starting main...")

def exit():
    global running
    running = False

# Get products from the products file
def getProducts():
    with open("products/products.json") as productsFile:
        return json.load(productsFile)['products']

# Print all of the products
def printProducts():
    products = getProducts()
    print("Products:")
    for product in products:
        print(product["productName"])

def printAttributes(product):
    for attribute, value in product.items():
        print(f"{attribute}: {value}")

def updateProducts(products):
    with open("products/products.json", "w") as productsFile:
        # Write the changes back to the file
        products = {"products": products}
        json.dump(products, productsFile, indent=4)

# Make pages for the website
def makePages():
    print("Making pages...")
    # Open the products file and template file
    with open("products/products.json") as productsFile, open("templates/productPage.html") as templateFile:
        # Load the products file into a dictionary
        products = json.load(productsFile)['products']
        
        # Read the template
        template = templateFile.readlines()
        
        for product in products:
            # Open the page
            with open(f"products/{product['link']}", "w") as pageFile:
                for line in template:
                    for attribute, value in product.items():
                        if attribute in line:
                            line = line.replace(f"---{attribute}---", str(value))
                    
                    print(line.rstrip(), file=pageFile)

# Make the products displays
def generateProductDisplays():
    print("Generating product displays...")

    countDracula = 0

    with open("templates/productDisplay.html") as templateFile, open("templates/products.html", "w") as productsTemplate:
        print("<!-- Make change here -->", file=productsTemplate)
        
        # Load the products file into a dictionary
        products = getProducts()

        # Read the template
        template = templateFile.readlines()
        
        for product in products:
            if countDracula % 3 == 0:
                print('<div class="row">', file=productsTemplate)
                
            # Open the page
            for line in template:
                for attribute, value in product.items():
                    if attribute in line:
                        line = line.replace(f"---{attribute}---", str(value))

                print("    " + line.rstrip(), file=productsTemplate)

            if ((countDracula - 2) % 3) == 0:
                print("</div>", file=productsTemplate)
            
            print("", file=productsTemplate)

            countDracula += 1
        
        if not countDracula % 3 == 0:
            print("</div>", file=productsTemplate)

    print(Fore.YELLOW + "Please make a change in the templates/products.html file to save it" + Fore.WHITE)

# Generate links in the json
def generateLinks():
    print("Generating links...")
    products = getProducts()
    
    for i, product in enumerate(products):
        products[i]["link"] = f"{product['productName'].lower().replace(' ', '-')}.html"

    updateProducts(products)

# Delete pages for products that don't exist
def deleteOldPages():
    print("Deleting old pages...")
    productPages = os.listdir("products/")
    
    products = getProducts()

    for page in productPages:
        pageValid = False
        for product in products:
            if product["link"] == page:
                pageValid = True
                break

        if not pageValid and not page[-5:] == ".json":
            if input(f"Delete {page}? (y/n): ") == "y":
                os.remove(f"products/{page}")
# 🇬🇧
# Check if new pages need to be made in order for replit to recognize them
def checkPages():
    print("Checking pages...")
    productPages = os.listdir("products/")
    
    products = getProducts()
    
    for product in products:
        pageFound = False
        
        for page in productPages:
            if product["link"] == page:
                pageFound = True

        if not pageFound:
            print("-"*50)
            print("Please make a new page called:")
            print(product["link"])
            input("Press enter to continue...")

# Add new products to the json
def addProduct():
    print("Adding new product...")
    products = getProducts()
    productName = input("Product name: ")
    imageName = input("Image name: ")
    description = input("Description: ")
    price = float(input("Price: "))

    # No need for link because it is auto-generated
    products.append(
        {
            "productName": productName,
            "imageName": imageName,
            "description": description,
            "price": price,
            "new": True,
            "featured": False,
            "clicks": 0
        })

    updateProducts(products)

# Delete products from the json
def deleteProduct():
    print("Deleting product...")
    products = getProducts()
    printProducts()
    productName = input("Product name: ")
    for i, product in enumerate(products):
        if product["productName"] == productName:
            if input(f"Delete {productName}? (y/n): ") == "y":
                del products[i]
                break
    updateProducts(products)

# Update the featured page
def updateFeaturedPage():
    print("Updating featured products page...")
    products = getProducts()
    with open("templates/productsFeatured.html", "w") as featuredPage:
        for i, product in enumerate(products):
            if product["featured"]:
                print("Found featured product: " + product["productName"])
                with open("templates/productDisplay.html") as template:
                    for line in template:
                        for attribute, value in product.items():
                            if attribute in line:
                                line = line.replace(f"---{attribute}---", str(value))
    
                        print("    " + line.rstrip(), file=featuredPage)

# Update the new page
def updateNewPage():
    print("Updating new products page...")
    products = getProducts()
    with open("templates/productsNew.html", "w") as newPage:
        for i, product in enumerate(products):
            if product["new"]:
                print("Found new product: " + product["productName"])
                with open("templates/productDisplay.html") as template:
                    for line in template:
                        for attribute, value in product.items():
                            if attribute in line:
                                line = line.replace(f"---{attribute}---", str(value))

                        print("    " + line.rstrip(), file=newPage)

# Update the popular page
def updatePopularPage():
    print("Updating popular products page...")
    products = getProducts()
    with open("templates/productsPopular.html", "w") as popularPage:
        for i, product in enumerate(products):
            if product["popular"]:
                print("Found popular product: " + product["productName"])
                with open("templates/productDisplay.html") as template:
                    for line in template:
                        for attribute, value in product.items():
                            if attribute in line:
                                line = line.replace(f"---{attribute}---", str(value))

                        print("    " + line.rstrip(), file=popularPage)

# Change an attribute of a product
def changeAttribute():
    print("Changing attribute...")
    printProducts()
    products = getProducts()
    productName = input("Product name: ")
    
    for i, product in enumerate(products):
        if product["productName"] == productName:
            printAttributes(product)
            attribute = input("Attribute: ")
            value = input("Value: ")
            products[i][attribute] = eval(value)

    updateProducts(products)

# Count the total amount of products with an attribute
def countAttribute():
    print("Counting attribute...")
    products = getProducts()
    attribute = input("Attribute: ")
    valueToCheck = eval(input("Value to check with: "))
    count = 0
    for product in products:
        if product[attribute] == valueToCheck:
            print(f"{product['productName']} has {attribute} of {product[attribute]}")
            count += 1

    print(f"Total count of products with {attribute}: {count}")

# Function for random guff
def guff():
    print("Guff...")
    products = getProducts()
    
    for product in products:
        product["popular"] = False
    
    updateProducts(products)

# Stuff
def stuff():
    print("Doing stuff...")
    generateLinks()
    checkPages()
    makePages()
    generateProductDisplays()
    deleteOldPages()
    updateFeaturedPage()
    updateNewPage()
    updatePopularPage()

# The main script of "CappaOS Lite"
running = True

# Print the welcome message
print(Fore.GREEN + "Welcome to CappaOS Lite!" + Fore.WHITE)
print("Type 'stuff()' to do stuff")

while True:
    if not running:
        break
    
    print(Fore.WHITE + "-"*50)
    exec(input("} "))