import json
import os

print("Starting main...")

def exit():
    global running
    running = False

# Get products from the products file
def getProducts():
    with open("products/products.json") as productsFile:
        return json.load(productsFile)['products']

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

# Generate links in the json
def generateLinks():
    print("Generating links...")
    products = getProducts()
    
    for i, product in enumerate(products):
        products[i]["link"] = f"{product['productName'].lower().replace(' ', '-')}.html"

    with open("products/products.json", "w") as productsFile:
        # Write the changes back to the file
        products = {"products": products}
        json.dump(products, productsFile, indent=4)

# Delete pages for products that don't exist
def deleteOldPages():
    print("Deleting old pages...")
    productPages = os.listdir("products/")
    
    products = getProducts()

    for page in productPages:
        pageValid = False
        for product in products:
            if product['link'] == page:
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
            "price": price
        })

    with open("products/products.json", "w") as productsFile:
        # Write the changes back to the file
        products = {"products": products}
        json.dump(products, productsFile, indent=4)

# Stuff
def stuff():
    print("Doing stuff...")
    generateLinks()
    checkPages()
    makePages()
    generateProductDisplays()

# Do stuff straight away?
if not input("Do stuff now? (Type anything to not do stuff): "):
    stuff()

# The main script of "CappaOS Lite"
running = True

while True:
    if not running:
        break
    
    print("-"*50)
    exec(input("} "))