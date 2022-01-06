import math
import re
import time

import certifi
import requests
from bs4 import BeautifulSoup
from pymongo import MongoClient
from selenium import webdriver
from selenium.webdriver.chrome.options import Options as ChromeOptions

# CHANGE THIS PATH TO OUR SERVER PATH
CHROME_DRIVER = './chromedriver'

URL = 'https://www.target.com/c/fresh-fruit-produce-grocery/-/N-4tglt'
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
#     print(page_soup)
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
    api_url = 'https://redsky.target.com/redsky_aggregations/v1/web/general_recommendations_placement_v1?'
    for i in range(pages):
        # Set up parameter dictionary according to documentation
        # The key and visitor id MUST BE CHANGED!!!! its currently set to mine for testing
        params = {
            'key': 'ff457966e64d5e877fdbad070f276d18ecec4a01',
            'category_id': '4tglt',
            'page': '/c/4tglt',
            'channel': 'WEB',
            'include_sponsored_recommendations': 'true',
            'platform': 'mobile',
            'pricing_store_id': '1344',
            'member_id': '',
            'placement_id': 'plp',
            'purchasable_store_ids': '1344,3280,3230,2451,1150',
            'count': str(ITEMS_PER_PAGE),
            'offset': str(i*ITEMS_PER_PAGE),
            'visitor_id': '017E282DC5680201971DD344C0E772B3'}
        # Call the API
        response = requests.get(api_url,
                                params=params)
        print(response)
        # Isolate the JSON data from the response object
        data = response.json()
        items_lst.extend(data['data']['recommended_products']['products'])
    return items_lst


def main_script():
    pages = get_page_num(URL, MY_ZIPCODE, ITEMS_PER_PAGE)
    lst = get_items_list(ITEMS_PER_PAGE, pages)
    fin_lst = []

    for item in lst:
        aux = {}
        aux['item_type'] = 'Fruits'
        aux['name'] = item['item']['product_description']['title']
        aux['price'] = item['price']['formatted_current_price']
        aux['image'] = item['item']['enrichment']['images']['primary_image_url']
        aux['url'] = item['item']['enrichment']['buy_url']
        aux['store_name'] = 'Target'
        aux['searched_zipcode'] = MY_ZIPCODE
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


run()
