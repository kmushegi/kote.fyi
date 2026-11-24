"use client";

import { useId, useRef, useState } from "react";

const hiEndpoint =
  process.env.NEXT_PUBLIC_HI_API_URL ??
  "https://678p2zki9b.execute-api.us-east-1.amazonaws.com/hi";

const feedback = {
  idle: "",
  sending: "Sending…",
  success: "Message sent.",
  error: "Couldn’t send your message. Please try again.",
};

export default function Contact() {
  const dialogRef = useRef(null);
  const triggerRef = useRef(null);
  const inFlightRef = useRef(false);
  const headingId = useId();
  const [status, setStatus] = useState("idle");
  const sending = status === "sending";

  function openDialog() {
    if (!inFlightRef.current) setStatus("idle");
    dialogRef.current.showModal();
  }

  function closeOnBackdrop(event) {
    if (event.target !== event.currentTarget) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    if (
      event.clientX < bounds.left || event.clientX > bounds.right ||
      event.clientY < bounds.top || event.clientY > bounds.bottom
    ) {
      dialogRef.current.close();
    }
  }

  async function send(event) {
    event.preventDefault();
    if (inFlightRef.current) return;

    const form = event.currentTarget;
    const data = new FormData(form);
    inFlightRef.current = true;
    setStatus("sending");
    try {
      const response = await fetch(hiEndpoint, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          message: data.get("message") || "hi",
        }),
      });
      if (!response.ok) throw new Error(`Request failed: ${response.status}`);
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    } finally {
      inFlightRef.current = false;
    }
  }

  return (
    <>
      <button className="contact-link" type="button" ref={triggerRef}
        aria-haspopup="dialog" onClick={openDialog}>
        Say hi <span aria-hidden="true">↗</span>
      </button>
      <dialog className="contact-dialog" ref={dialogRef} aria-labelledby={headingId}
        onClick={closeOnBackdrop} onClose={() => triggerRef.current.focus()}>
        <header className="contact-heading">
          <h2 id={headingId}>Send a note</h2>
          <button className="contact-close" type="button" onClick={() => dialogRef.current.close()}>
            Close
          </button>
        </header>
        <form className="contact-form" onSubmit={send}>
          <label>
            <span>Name (optional)</span>
            <input name="name" type="text" maxLength={80} autoComplete="name" autoFocus readOnly={sending} />
          </label>
          <label>
            <span>Message</span>
            <textarea name="message" maxLength={280} rows={4} readOnly={sending} />
          </label>
          <div className="contact-actions">
            <button className="contact-submit" type="submit" disabled={sending}>Send</button>
            <p className="contact-status" role="status" data-state={status}>{feedback[status]}</p>
          </div>
        </form>
      </dialog>
    </>
  );
}
