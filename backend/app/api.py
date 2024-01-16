from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import math

app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# Global counter variable
counter = 0

@app.get("/", tags=["root"])
async def root():
    return {"message": "Hello World"}

@app.get("/sin", tags=["Data Samples"])
async def read_sin():
    global counter
    # Increment the counter with each request
    counter += 1
    # Generate a sine curve value between 0 and 2π based on the counter
    time = counter * 0.1  # Adjust the multiplier for the desired speed of iteration
    speed = 50 + 50 * math.sin(time)
    return {"speed": speed}
