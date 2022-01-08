import certifi
from pymongo import MongoClient
import DataTypes
import time
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.options import Options as ChromeOptions

# CHANGE THIS PATH TO OUR SERVER PATH
CHROME_DRIVER = 'C:\\Users\\byung\\Desktop\\codes\\react\\hackathan_recap\\BudgetIt_2.0\\server\\python\\chromedriver.exe'

URL = 'https://www.bjs.com/category/grocery-household-and-pet/fresh-and-refrigerated-food/produce/fresh-fruit/3000000000000117251?pagesize=120'
MY_ZIPCODE = '11355'


def setup_driver(headless=True, driver_type=CHROME_DRIVER) -> webdriver:
    if 'chrome' in driver_type.lower():
        options = ChromeOptions()
        options.add_argument('--ignore-certificate-errors')
        options.add_argument('--ignore-ssl-errors')
        if headless:
            options.add_argument('-headless')
        driver = webdriver.Chrome(
            executable_path=driver_type, chrome_options=options)
    return driver


def get_soups(URL):
    driver = setup_driver()
    item_soups = []
#     accessing target page
    driver.get(URL)
    time.sleep(6)
    page_soup = BeautifulSoup(driver.page_source, "html.parser")
#    scrape
    item_soups.extend(page_soup.find_all(
        'div', {'class': 'product-card plp-cont'}))
    driver.quit()
    return item_soups


def parse_url(soup):
    tag = soup.find('a', {'class': 'content-center'}).get('href')
    return "https://www.bjs.com" + tag


def main_script():
    soups = get_soups(URL)
    fin_lst = []

    for soup in soups:
        aux = {}
        if soup.find('span', {'class': 'price'}) != None:
            item_data = DataTypes.DataType('Fruits')
            item_data.name = soup.find(
                'h2', {'class': 'product-title no-select d-none d-sm-block'}).text
            item_data.price = soup.find('span', {'class': 'price'}).text
            item_data.image = soup.find(
                'img', {'class': 'img-link'}).get('src')
            item_data.url = parse_url(soup)
            item_data.store_name = 'BJs'
            item_data.searched_zipcode = MY_ZIPCODE
            aux['item_type'] = item_data.item_type
            aux['name'] = item_data.name
            aux['price'] = item_data.price
            aux['image'] = item_data.image
            aux['url'] = item_data.url
            aux['store_name'] = item_data.store_name
            aux['searched_zipcode'] = item_data.searched_zipcode
            fin_lst.append(aux)

    return fin_lst


def run():
    ca = certifi.where()
    client = MongoClient(
        "mongodb+srv://admin:admin123@cluster0.2djpc.mongodb.net", tlsCAFile=ca)
    db = client.budgetIt
    collection_name = db.budgetIt

    data_lst = main_script()
    collection_name.insert_many(data_lst)


# run()
