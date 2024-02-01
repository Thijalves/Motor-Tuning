from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import math
from pydantic import BaseModel
from typing import List

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

# real time variables
real_speed = None

# target variables
targets = []
time = 0

class Target(BaseModel):
    speeds: List[float]
    time: int

@app.get("/", tags=["root"])
async def root():
    return {"message": "Hello World"}

# sin signal
@app.get("/sin", tags=["Data Samples"])
async def read_sin():
    global counter
    # Increment the counter with each request
    counter += 1
    # Generate a sine curve value between 0 and 2π based on the counter
    time = counter * 0.5  # Adjust the multiplier for the desired speed of iteration
    data = 50 * math.sin(time)
    return {"data": data}

# both speeds
@app.get("/allSpeed", tags=["Speed"])
async def read_both_speed():
    global target_speed
    global real_speed
    return {
        "realSpeed": real_speed,
        "targetSpeed": target_speed
    }

# real speed
@app.get("/realSpeed", tags=["Speed"])
async def read_real_speed():
    global real_speed
    return real_speed

# target speed
@app.get("/targetSpeed", tags=["Speed"])
async def read_target_speed():
    global target_speed
    return target_speed

@app.post("/setTarget", tags=["targets"])
async def set_target_speed(data: Target):
    global targets
    global time
    targets = data.speeds
    time = data.time
    return {
        "targets": targets,
        "time": time
    }