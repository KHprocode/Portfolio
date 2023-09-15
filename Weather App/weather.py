import tkinter as tk
import requests

def get_weather():
    city = city_entry.get()
    api_key = "2da297b630b096c853a2f7af7175ea67"
    url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric"
    response = requests.get(url)
    weather_data = response.json()

    if weather_data["cod"] == "404":
        weather_label.config(text="City not found!")
    else:
        temp = weather_data["main"]["temp"]
        weather_description = weather_data["weather"][0]["description"]
        weather_label.config(text=f"{city}: {temp}°C, {weather_description}")

root = tk.Tk()
root.title("Weather App")

city_entry = tk.Entry(root)
city_entry.pack()

get_weather_button = tk.Button(root, text="Get Weather", command=get_weather)
get_weather_button.pack()

weather_label = tk.Label(root, text="")
weather_label.pack()

root.mainloop()
