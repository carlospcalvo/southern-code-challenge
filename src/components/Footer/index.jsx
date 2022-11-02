import React from 'react';
import { Container } from 'semantic-ui-react';
import './footer.css';

export default function Footer() {
  return (
    <Container as="footer" className="footer" textAlign="center" fluid>
      <p>
        &copy;
        {`${new Date().getFullYear()} - Built by `}
        <a href="https://github.com/carlospcalvo" rel="nofollow">Carlos Calvo Nazábal</a>
      </p>
    </Container>
  );
}
