import React from "react";

export default function About() {
  return (
    <div className="about">
      <h1>About Spring Boot - React App</h1>
      <div className="features">
        <h2>Key Features</h2>
        <ul>
          <li>Profile creation and customization</li>
          <li>Posting and sharing photos and updates</li>
          <li>Commenting and liking posts</li>
          <li>Connecting with friends and family</li>
        </ul>
      </div>
      <div className="tech-used">
        <h2>Tech Used</h2>
        <ul>
          <li>Spring Boot</li>
          <li>MongoDB</li>
          <li>React</li>
          <li>SCSS</li>
        </ul>
      </div>
    </div>
  );
}
