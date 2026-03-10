"use client";

import { useMemo, useState } from "react";

const triggerCount = 3;
const triggerWindowMs = 1400;
const hiEndpoint =
  process.env.NEXT_PUBLIC_HI_API_URL ??
  "https://678p2zki9b.execute-api.us-east-1.amazonaws.com/hi";

export default function EasterEgg() {
  const [tapHistory, setTapHistory] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle");
  const [feedback, setFeedback] = useState("");

  const helperCopy = useMemo(() => {
    if (status === "sending") {
      return "sending...";
    }

    if (status === "success") {
      return feedback;
    }

    if (status === "error") {
      return feedback;
    }

    return "";
  }, [feedback, status]);

  function handleTrigger() {
    const now = Date.now();

    setTapHistory((previous) => {
      const recent = [...previous.filter((stamp) => now - stamp < triggerWindowMs), now];

      if (recent.length >= triggerCount) {
        setIsOpen(true);
        return [];
      }

      return recent;
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setStatus("sending");
    setFeedback("");

    try {
      const response = await fetch(hiEndpoint, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
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
    }
  }

  return (
    <div className={`portrait-stack${isOpen ? " portrait-stack-open" : ""}`}>
      <div className={`portrait-flip-shell${isOpen ? " portrait-flip-shell-open" : ""}`}>
        <button
          className="portrait-card portrait-trigger portrait-face portrait-front"
          type="button"
          onClick={handleTrigger}
          aria-label="Portrait"
        >
          <div className="portrait-frame">
            <img
              src="/static/generated/kote-line-2.png"
              alt="Illustrated portrait of Kote Mushegiani"
            />
          </div>
          <p className="portrait-caption">Usually in San Francisco. Often in Georgia.</p>
        </button>

        <div className="portrait-card portrait-face portrait-back" aria-hidden={!isOpen}>
          <div className="easter-panel-head">
            <div>
              <h2 className="easter-title">hi, you found it</h2>
            </div>
            <button
              className="easter-close"
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close hidden panel"
            >
              close
            </button>
          </div>

          <p className="easter-copy">
            You made it to the hidden side. Say hi if you want.
          </p>

          <form className="easter-form" onSubmit={handleSubmit}>
            <label className="easter-field">
              <span>name</span>
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                maxLength={80}
                placeholder="optional"
              />
            </label>

            <label className="easter-field">
              <span>message</span>
              <textarea
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                maxLength={280}
                rows={3}
                placeholder="hi"
              />
            </label>

            <div className="easter-actions">
              <button className="easter-submit" type="submit" disabled={status === "sending"}>
                {status === "sending" ? "sending" : "say hi"}
              </button>
              <p className={`easter-feedback easter-feedback-${status}`}>{helperCopy}</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
