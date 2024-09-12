import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from matplotlib.ticker import FuncFormatter

# Step 1: Load the COVID-19 Dataset
url = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv"
covid_data = pd.read_csv(url)

# Preprocess the data
covid_data = covid_data.drop(columns=["Lat", "Long"])
global_cases = covid_data.iloc[:, 2:].sum(axis=0)
global_cases.index = pd.to_datetime(global_cases.index, format='%m/%d/%y')

# Formatter function to add commas to large numbers
def format_large_numbers(x, pos):
    return '{:,.0f}'.format(x)

# Function to save global COVID-19 cases plot
def plot_global_cases():
    plt.figure(figsize=(10, 6))
    plt.plot(global_cases.index, global_cases.values, label='Global Cases', color='blue')
    plt.title('Global COVID-19 Confirmed Cases Over Time')
    plt.xlabel('Date')
    plt.ylabel('Number of Cases')

    # Use FuncFormatter to format y-axis with commas for large numbers
    formatter = FuncFormatter(format_large_numbers)
    plt.gca().yaxis.set_major_formatter(formatter)

    plt.xticks(rotation=45)
    plt.grid(True)
    plt.tight_layout()
    plt.savefig('visualizations/global_cases.png')  # Save plot as an image
    plt.close()

# Function to save top 10 countries by total confirmed cases
def plot_top_10_countries():
    total_cases_by_country = covid_data.groupby('Country/Region').sum().iloc[:, -1]
    top_10_countries = total_cases_by_country.sort_values(ascending=False).head(10)

    plt.figure(figsize=(10, 6))
    top_10_countries.plot(kind='bar', color='orange')
    plt.title('Top 10 Countries by Total Confirmed COVID-19 Cases')
    plt.ylabel('Total Cases')

    # Use FuncFormatter to format y-axis with commas for large numbers
    formatter = FuncFormatter(format_large_numbers)
    plt.gca().yaxis.set_major_formatter(formatter)

    plt.xticks(rotation=45)
    plt.grid(True)
    plt.tight_layout()
    plt.savefig('visualizations/top_10_countries.png')  # Save plot as an image
    plt.close()

# Run the functions to generate and save plots
if __name__ == "__main__":
    plot_global_cases()
    plot_top_10_countries()
