import json
import os
import re
import uuid
from datetime import datetime, timezone

import boto3


TABLE_NAME = os.environ["TABLE_NAME"]
ALLOWED_ORIGINS = {
    origin.strip()
    for origin in os.environ.get("ALLOWED_ORIGINS", "").split(",")
    if origin.strip()
}

ddb = boto3.resource("dynamodb")
table = ddb.Table(TABLE_NAME)


def response(status_code, body, origin=None):
    headers = {
        "content-type": "application/json",
        "cache-control": "no-store",
    }

    if origin and origin in ALLOWED_ORIGINS:
        headers["access-control-allow-origin"] = origin
        headers["vary"] = "origin"

    return {
        "statusCode": status_code,
        "headers": headers,
        "body": json.dumps(body),
    }


def read_json_body(event):
    raw_body = event.get("body") or "{}"
    if event.get("isBase64Encoded"):
        return {}

    try:
        return json.loads(raw_body)
    except json.JSONDecodeError:
        return None


def clean_text(value, max_length):
    if not value:
        return ""
    compact = re.sub(r"\s+", " ", str(value)).strip()
    return compact[:max_length]


def handler(event, _context):
    headers = {k.lower(): v for k, v in (event.get("headers") or {}).items()}
    origin = headers.get("origin")
    route_key = event.get("routeKey", "")

    if route_key == "GET /health":
        return response(
            200,
            {
                "ok": True,
                "service": "kote-fyi-api",
                "time": datetime.now(timezone.utc).isoformat(),
            },
            origin,
        )

    if route_key != "PUT /hi":
        return response(404, {"ok": False, "error": "not_found"}, origin)

    payload = read_json_body(event)
    if payload is None:
        return response(400, {"ok": False, "error": "invalid_json"}, origin)

    name = clean_text(payload.get("name"), 80) or "anonymous"
    message = clean_text(payload.get("message"), 280) or "hi"
    created_at = datetime.now(timezone.utc).isoformat()
    item_id = str(uuid.uuid4())

    table.put_item(
        Item={
            "pk": "hi",
            "sk": f"{created_at}#{item_id}",
            "id": item_id,
            "name": name,
            "message": message,
            "createdAt": created_at,
            "source": "site",
        }
    )

    return response(
        200,
        {
            "ok": True,
            "id": item_id,
            "createdAt": created_at,
        },
        origin,
    )
