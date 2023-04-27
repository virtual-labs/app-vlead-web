import React from "react";
import Typewriter from "typewriter-effect";

export default function MyTypewriter() {
  return (
    <div>
      <Typewriter
        options={{
          strings: ["Explore", "Experiment", "Discover"],
          autoStart: true,
          loop: true,
        }}
      />
    </div>
  );
}
