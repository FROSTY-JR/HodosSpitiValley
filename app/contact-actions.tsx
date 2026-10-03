export const CONTACT_URL = 'https://wa.me/917676123083';
export const COMMUNITY_URL = 'https://chat.whatsapp.com/F6DzON5XORd5eymcKdNGKj';
export function ContactActions() {
  return (
    <div className="contact-actions">
      <a
        className="hodos-action"
        href={CONTACT_URL}
        target="_blank"
        rel="noopener noreferrer"
      >
        Contact the trip planner
      </a>
      <a
        className="hodos-action secondary"
        href={COMMUNITY_URL}
        target="_blank"
        rel="noopener noreferrer"
      >
        Join our WhatsApp community
      </a>
    </div>
  );
}
