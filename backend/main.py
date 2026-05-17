from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "WCAG AI Agent Backend Running"}

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    content = await file.read()

    text = content.decode("utf-8")

    issues = []

    # FIRST WCAG RULE
    if "<input" in text and "aria-label" not in text:
        issues.append({
            "rule": "missing-label",
            "severity": "high",
            "message": "Input field missing aria-label"
        })

    return {
        "filename": file.filename,
        "issues": issues
    }