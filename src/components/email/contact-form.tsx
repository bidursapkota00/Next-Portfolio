interface EmailProps {
  name: string;
  email: string;
  message: string;
}

export const EmailTemplate = ({ name, email, message }: EmailProps) => (
  <div>
    <h1 className="uppercase">{name}</h1>
    <br />
    <br />
    <a href={`mailto:${email}`}>{email}</a>
    <br />
    <br />
    <p>{message}</p>
  </div>
);
