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
sinCounter = 0
cosCounter = 0

@app.get("/", tags=["root"])
async def root():
    return {"message": "Hello World"}

# sin signal
@app.get("/sin", tags=["Data Samples"])
async def read_sin():
    global sinCounter
    # Increment the counter with each request
    sinCounter += 1
    # Generate a sine curve value between 0 and 2π based on the counter
    time = sinCounter * 0.5  # Adjust the multiplier for the desired speed of iteration
    data = 50 * math.sin(time)
    return {"data": data}

# cos signal
@app.get("/cos", tags=["Data Samples"])
async def read_cos():
    global cosCounter
    # Increment the counter with each request
    cosCounter += 1
    # Generate a sine curve value between 0 and 2π based on the counter
    time = cosCounter * 0.5  # Adjust the multiplier for the desired speed of iteration
    data = 50 * math.cos(time)
    return {"data": data}
