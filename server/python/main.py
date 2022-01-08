import BJs_Fruits as BJ_F
import BJs_Vegetables as BJ_V
import Target_Fruits as Target_F
import Target_Vegetables as Target_V


def main():
    # TODO: Need to delete all in database
    # Add code here

    # run all scrapers
    BJ_F.run()
    BJ_V.run()
    Target_F.run()
    Target_V.run()


main()
