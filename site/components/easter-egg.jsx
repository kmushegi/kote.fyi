"use client";

import { useId, useRef, useState } from "react";

const hiEndpoint =
  process.env.NEXT_PUBLIC_HI_API_URL ??
  "https://678p2zki9b.execute-api.us-east-1.amazonaws.com/hi";

export default function EasterEgg() {
  const dialogRef = useRef(null);
  const inFlightRef = useRef(false);
  const headingId = useId();
  const descriptionId = useId();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle");
  const [feedback, setFeedback] = useState("");

  function openNote() {
    if (!dialogRef.current.open) {
      dialogRef.current.showModal();
    }
  }

  function closeOnBackdrop(event) {
    if (event.target !== event.currentTarget) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const outside =
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom;

    if (outside) dialogRef.current.close();
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (inFlightRef.current) return;

    inFlightRef.current = true;
    setStatus("sending");
    setFeedback("Sending your note…");

    try {
      const response = await fetch(hiEndpoint, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name,
          message: message || "hi from the hidden panel",
        }),
      });

      if (!response.ok) {
        throw new Error(`request failed with ${response.status}`);
      }

      setStatus("success");
      setFeedback("Message sent. I will see it.");
      setName("");
      setMessage("");
    } catch (_error) {
      setStatus("error");
      setFeedback("Did not go through. Try again in a bit.");
    } finally {
      inFlightRef.current = false;
    }
  }

  return (
    <div className="postcard">
      <button
        className="postcard-trigger"
        type="button"
        onClick={openNote}
        aria-label="Turn over the postcard and leave a note"
        aria-haspopup="dialog"
      >
        <span className="postcard-topline">SAN FRANCISCO ↔ TBILISI</span>
        <img
          className="postcard-image"
          src="/static/generated/kote-line-2.png"
          alt="Illustrated portrait of Kote Mushegiani"
          width={1024}
          height={1024}
        />
        <span className="postcard-caption">Usually here. Sometimes there.</span>
        <span className="postcard-hint">tap to turn over ↗</span>
        <span className="postcard-stamp" aria-hidden="true">K.</span>
      </button>

      <dialog
        className="note-dialog"
        ref={dialogRef}
        aria-labelledby={headingId}
        aria-describedby={descriptionId}
        onClick={closeOnBackdrop}
      >
        <div className="note-dialog-inner">
          <div className="note-heading">
            <h2 id={headingId}>A little note</h2>
            <button
              className="note-close"
              type="button"
              onClick={() => dialogRef.current.close()}
            >
              Turn back <span aria-hidden="true">↩</span>
            </button>
          </div>
          <p className="note-copy" id={descriptionId}>
            You found the other side. Say hi.
          </p>

          <form className="note-form" onSubmit={handleSubmit}>
            <label className="note-field">
              <span>Name</span>
              <input
                type="text"
                name="name"
                autoComplete="name"
                autoFocus
                value={name}
                onChange={(event) => setName(event.target.value)}
                maxLength={80}
                placeholder="Optional"
                disabled={status === "sending"}
              />
            </label>
            <label className="note-field">
              <span>Message</span>
              <textarea
                name="message"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                maxLength={280}
                rows={4}
                placeholder="Hi, Kote!"
                disabled={status === "sending"}
              />
            </label>
            <div className="note-actions">
              <button className="note-submit" type="submit" disabled={status === "sending"}>
                {status === "sending" ? "Sending…" : "Send a little hello ↗"}
              </button>
              <p
                className={`note-feedback note-feedback-${status}`}
                role="status"
                aria-live="polite"
                aria-atomic="true"
              >
                {feedback}
              </p>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}
