'use client';
import { useState } from 'react';
import { CONTACT_URL } from '../contact-actions';
export default function TripPlanner() {
  const [person, setPerson] = useState('Sanjay');
  const [callTime, setCallTime] = useState('');
  const [review, setReview] = useState(false);
  const message = `Hi Hódos! I’d like to request a call with ${person}.\nPreferred time (India time): ${callTime || 'Please suggest a time'}.\nPlease confirm availability. Thank you!`;
  return (
    <>
      <section className="trip-planner" id="call-request">
        <div className="planner-body">
          <p className="eyebrow">PICK YOUR POINT PERSON</p>
          <h2>Who would you like to talk to?</h2>
          <div
            className="planner-people"
            role="group"
            aria-label="Choose your planner"
          >
            {['Sanjay', 'Dhyata'].map((name) => (
              <button
                key={name}
                aria-pressed={person === name}
                onClick={() => {
                  setPerson(name);
                  setReview(false);
                }}
              >
                <span aria-hidden="true">{name[0]}</span>
                <strong>{name}</strong>
                <small>
                  {name === 'Sanjay' ? 'Male' : 'Female'} point of contact ·{' '}
                  {person === name ? 'Selected' : 'Choose'}
                </small>
              </button>
            ))}
          </div>
          <div className="call-preference">
            <label htmlFor="call-time">
              When would a call work for you?{' '}
              <span>(optional · India time)</span>
            </label>
            <input
              id="call-time"
              maxLength={180}
              value={callTime}
              onChange={(e) => {
                setCallTime(e.target.value);
                setReview(false);
              }}
              placeholder="For example: Saturday after 5 pm"
            />
            <p>
              Both requests go to the shared Hódos WhatsApp number. The team
              will confirm who’s available and agree a time with you. This does
              not book a calendar slot.
            </p>
          </div>
          <button
            className="hodos-action review-request"
            onClick={() => setReview(true)}
          >
            Review my call request
          </button>
          {review && (
            <section
              className="planner-review"
              aria-label="Review your message"
              aria-live="polite"
            >
              <h3>Your message to Hódos</h3>
              <p className="message-preview">{message}</p>
              <a
                className="hodos-action"
                href={`${CONTACT_URL}?text=${encodeURIComponent(message)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Request a call with {person}
              </a>
              <p>
                Opens WhatsApp with this message. You choose whether to send it
                there. Your time is confirmed by the team, not by this page.
              </p>
            </section>
          )}
          <button
            className="planner-reset"
            onClick={() => {
              setCallTime('');
              setReview(false);
            }}
          >
            Clear my request
          </button>
        </div>
      </section>
      <section className="planner-placeholder" id="trip-planner">
        <span className="coming-soon">IN THE WORKS</span>
        <h2>
          More of a typing person?
          <br />
          We’re making room for that.
        </h2>
        <p>
          A text-first trip planner is coming: a quieter way to share your
          interests and tell us what would make a journey feel like you.
        </p>
        <p>
          It’s not live yet. For now, you can message the team on WhatsApp—no
          call required.
        </p>
        <a
          className="hodos-action secondary"
          href={`${CONTACT_URL}?text=${encodeURIComponent('Hi Hódos! I’d prefer to plan over text rather than a call. Can we start here?')}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Let’s keep it on text
        </a>
      </section>
    </>
  );
}
