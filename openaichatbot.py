from openai import OpenAI
import base64

client = OpenAI(
    api_key = 
)

prompt = "What is the person saying in asl?"

image_path = "DATASET/A/image_1681446027.280327.jpg"

#Function to encode the image
def encode_image(image_path):
    with open(image_path, 'rb') as image_file:
        return base64.b64encode(image_file.read()).decode("utf-8")
    
#Encode the image
base64_image = encode_image(image_path)

chat_completion = client.chat.completions.create(
    model="gpt-4o",
    max_tokens=300,
    messages=[
        {
            "role": "user",
            "content": [
                {
                    "type": "text",
                    "text": prompt
                },
                {
                    "type": "image_url",
                    "image_url": {
                        "url": f"data:image/jpeg;base64,{base64_image}"
                    }
                }
            ]
        }
    ]
)

print(chat_completion.choices[0].message.content)
