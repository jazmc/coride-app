import * as React from "react";
import Svg, { Defs, LinearGradient, Stop, G, Path } from "react-native-svg";

const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={570.592}
    height={661.065}
    viewBox="0 0 150.969 174.907"
    {...props}
  >
    <Defs>
      <LinearGradient id="b">
        <Stop offset={0} stopColor="#9ca395" />
        <Stop offset={1} stopColor="#768278" />
      </LinearGradient>
      <LinearGradient id="a">
        <Stop offset={0} stopColor="#e29578" />
        <Stop offset={1} stopColor="#006d77" />
      </LinearGradient>
      <LinearGradient
        xlinkHref="#a"
        id="d"
        x1={27.034}
        x2={45.335}
        y1={58.494}
        y2={206.197}
        gradientUnits="userSpaceOnUse"
      />
      <LinearGradient
        xlinkHref="#b"
        id="c"
        x1={-38.777}
        x2={17.884}
        y1={122.086}
        y2={139.926}
        gradientUnits="userSpaceOnUse"
      />
    </Defs>
    <G paintOrder="stroke fill markers">
      <Path
        fill="url(#c)"
        d="m17.885 65.424-30.781 30.781 30.78 30.78V65.425zM8.737 87.518v17.38L.048 96.21c2.908-2.906 5.78-5.791 8.69-8.69Zm-28.104 15.157-19.41 19.41 56.661 56.662v-38.82l-11.37-11.371-6.47 6.47 8.69 8.69v12.94l-34.571-34.57 6.47-6.47 12.94 12.94 6.47-6.47-19.41-19.411Z"
        transform="translate(39.307 -31.952)"
      />
      <Path
        fill="url(#d)"
        d="M99.142 104.72 27.034 32.614v25.88c20.859 20.971 41.944 41.72 62.66 62.83 4.466 4.374 3.573 13.151-2.8 15.184-6.924 2.376-11.931-4.195-16.21-8.483l-43.65-43.65v103.523l18.301 18.3v-77.641c9.448 8.764 17.573 19.913 29.979 24.69 9.689 4.088 21.788 2.03 28.828-6.033 8.018-7.878 8.69-20.755 3.657-30.408-2.148-4.495-5.142-8.564-8.657-12.084z"
        transform="translate(39.307 -31.952)"
      />
    </G>
  </Svg>
);

export default SvgComponent;
