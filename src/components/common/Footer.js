import React from 'react';
import styled, { keyframes } from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #333;
  color: white;
  padding: 20px;
  text-align: center;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const FooterContent = styled.div`
  animation: ${fadeIn} 1.5s ease;
`;

const FooterLink = styled.a`
  color: white;
  margin: 0 10px;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <p>About Us: We are a team of creative developers passionate about technology and innovation.</p>
        <p>
          Links: <FooterLink href="#">Home</FooterLink> | <FooterLink href="#">Services</FooterLink> |{' '}
          <FooterLink href="#">Contact</FooterLink>
        </p>
        <p>Created by <strong>Anurag & Teams</strong></p>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
