from fastapi import FastAPI

app = FastAPI(title="soundwave audio engine")


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok", "service": "audio-engine"}
