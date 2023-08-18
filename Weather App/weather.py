import requests
import tkinter as tk

def get_weather(city, api_key):
    base_url = "http://api.openweathermap.org/data/2.5/weather?"
    complete_url = base_url + "q=" + city + "&appid=" + api_key
    response = requests.get(complete_url)
    data = response.json()

    if data["cod"] != "404":
        main_data = data["main"]
        weather_data = data["weather"][0]
        temperature = main_data["temp"] - 273.15
        weather_description = weather_data["description"]
        return f"The weather in {city} is {weather_description} with a temperature of {temperature}Celsius."
    else:
        return "City not found!"

def ask_bot():
    user_input = user_text.get()
    if "weather in" in user_input.lower():
        city = user_input.split("in")[-1].strip()
        api_key = "2da297b630b096c853a2f7af7175ea67"  # Replace with your API key
        response = get_weather(city, api_key)
    else:
        response = "I can only tell you about the weather. Please ask about the weather in a specific city."
    conversation.insert(tk.END, "You: " + user_input + "\n")
    conversation.insert(tk.END, "Bot: " + response + "\n")

# Create the GUI
root = tk.Tk()
root.title("Weather Chatbot")
conversation = tk.Text(root, width=50, height=20)
conversation.pack()
user_text = tk.StringVar()
entry = tk.Entry(root, textvariable=user_text, width=50)
entry.pack()
button = tk.Button(root, text="Ask", command=ask_bot)
button.pack()

root.mainloop()
