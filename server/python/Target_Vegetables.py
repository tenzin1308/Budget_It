import certifi
from pymongo import MongoClient
import DataTypes
import math
import requests
import re
import time
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.options import Options as ChromeOptions

# CHANGE THIS PATH TO OUR SERVER PATH
CHROME_DRIVER = 'C:\\Users\\byung\\Desktop\\codes\\react\\hackathan_recap\\BudgetIt_2.0\\server\\python\\chromedriver.exe'

URL = 'https://www.target.com/c/fresh-vegetables-produce-grocery/-/N-4tglh'
MY_ZIPCODE = '11355'
ITEMS_PER_PAGE = 28


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


def set_location(zipcode, driver):
    #     clicking button to expand "select a store"
    execute_query_location_open = f"document.getElementById('storeId-utilityNavBtn').click()"
    driver.execute_script(execute_query_location_open)
    time.sleep(2)
#    Get the WebElement corresponding to the zip or city, state (TextField), filling in zipcode field
    driver.find_element_by_xpath(
        '//*[@id="zipOrCityState"]').send_keys(MY_ZIPCODE)
#     clicking button to search
    execute_query_location_search = f"document.getElementsByClassName('Button-sc-bwu3xu-0 StoreLocationSearch__SearchButton-sc-o3wd93-1 jFpyjh djtyxc h-padding-h-wide h-padding-v-tight')[0].click()"
    driver.execute_script(execute_query_location_search)
    time.sleep(2)
#     clicking button to pinpoint first branch location
    execute_query_location_entry = f"document.getElementsByClassName('Button-sc-bwu3xu-0 laJFjD h-text-sm')[0].click()"
    driver.execute_script(execute_query_location_entry)
    time.sleep(2)


def get_res_num(URL, zipcode):
    res_num = 0
    driver = setup_driver()
#     accessing main target page
    driver.get(URL)
    time.sleep(4)
#     setting location.
    set_location(MY_ZIPCODE, driver)
    page_soup = BeautifulSoup(driver.page_source, "html.parser")
    res_txt = page_soup.find('h2', {
                             'class': "Heading__StyledHeading-sc-1mp23s9-0 dkHWUj h-display-block h-margin-b-tiny"}).text
    res_num = re.sub('[^0-9.]', '', res_txt)
    driver.quit()
    return res_num


def get_page_num(URL, zipcode, ITEMS_PER_PAGE):
    num = get_res_num(URL, zipcode)
#     ITEMS_PER_PAGE max is 28
    return math.ceil(int(num) / ITEMS_PER_PAGE)


def get_items_list(ITEMS_PER_PAGE, pages):
    items_lst = []
    api_url = 'https://redsky.target.com/redsky_aggregations/v1/web/plp_search_v1?'
    for i in range(pages):
        # Set up parameter dictionary according to documentation
        # The key and visitor id MUST BE CHANGED!!!! its currently set to mine for testing
        params = {
            'key': 'ff457966e64d5e877fdbad070f276d18ecec4a01',
            'category': '4tglh',
            'channel': 'WEB',
            'count': str(ITEMS_PER_PAGE),
            'default_purchasability_filter': 'true',
            'offset': str(i*ITEMS_PER_PAGE),
            'page': '/c/4tglh',
            'platform': 'desktop',
            'pricing_store_id': '2451',
            'scheduled_delivery_store_id': '2451',
            'store_ids': '2451,1150,3280,1344,3230',
            'useragent': 'Mozilla/5.0+(Windows+NT+10.0;+Win64;+x64)+AppleWebKit/537.36+(KHTML,+like+Gecko)+Chrome/97.0.4692.71+Safari/537.36',
            'visitor_id': '017E27F6EE5C0201B3BBE96C806C322B'}
        # Call the API
        response = requests.get(api_url,
                                params=params)
        # Isolate the JSON data from the response object
        data = response.json()
        items_lst.extend(data['data']['search']['products'])
    return items_lst


def main_script():
    pages = get_page_num(URL, MY_ZIPCODE, ITEMS_PER_PAGE)
    lst = get_items_list(ITEMS_PER_PAGE, pages)
    fin_lst = []

    for item in lst:
        aux = {}
        item_data = DataTypes.DataType('Vegetables')
        item_data.name = item['item']['product_description']['title']
        item_data.price = item['price']['formatted_current_price']
        item_data.image = item['item']['enrichment']['images']['primary_image_url']
        item_data.url = item['item']['enrichment']['buy_url']
        item_data.store_name = 'Target'
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
