interface EmailProps {
  name: string;
  email: string;
}

export const EmailTemplate = ({ name, email }: EmailProps) => (
  <div>
    <p>Hello Kavya,</p>
    <p>
      {name} has submitted the contact form on your website. Their email is{" "}
      {email}!
    </p>
    <p>
      Regards,
      <br />
      Coffee
    </p>
  </div>
);
