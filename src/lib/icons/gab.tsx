export default function Gab(props: {
  white?: boolean;
  black?: boolean;
  color?: string;
  width?: number;
  height?: number
}) {
  const { white, black, color, width, height } = props;
  return (
    <svg
      width={width || "34.4"}
      height={height || "21"}
      viewBox="-8.6929917 -8.6929917 503.3613834 307.1523734"
    >
      <defs />
      <path
        id="gab"
        d="m 110.3872,73.5915 45.9946,0 0,126.4853 c 0,60.6555 -33.0586,89.6896 -82.7904,89.6896 -22.7098,0 -42.8325,-7.7616 -55.1936,-18.3979 l 18.3979,-34.496 c 10.6363,7.1867 20.6976,11.4987 34.2085,11.4987 24.4347,0 39.383,-17.5355 39.383,-42.8325 l 0,-7.7616 C 100.0384,210.1381 85.3776,216.1749 69.2794,216.1749 29.8965,216.1749 0,183.4037 0,142.5835 0,101.7632 29.8965,68.992 69.2794,68.992 c 16.0982,0 30.759,6.0368 41.1078,18.3979 l 0,-13.7984 z M 78.1909,174.7797 c 17.5355,0 32.1963,-14.6608 32.1963,-32.1962 0,-17.5355 -14.6608,-32.1963 -32.1963,-32.1963 -17.5355,0 -32.1963,14.6608 -32.1963,32.1963 0,17.5354 14.6608,32.1962 32.1963,32.1962 z m 228.0395,36.7958 -45.9947,0 0,-11.4987 c -8.9115,10.0613 -21.2725,16.0981 -37.3707,16.0981 -32.1962,0 -50.0192,-22.4224 -50.0192,-48.0069 0,-37.9456 46.5696,-52.0315 86.815,-39.9579 -0.8624,-12.361 -8.624,-21.2725 -24.7222,-21.2725 -11.2112,0 -24.1472,4.312 -32.1962,8.9115 L 188.944,82.7904 c 10.6362,-6.8992 30.184,-13.7984 52.8938,-13.7984 33.6336,0 64.3926,18.9728 64.3926,70.7168 l 0,71.8667 z m -45.9947,-54.6187 c -21.56,-6.8992 -41.3952,-3.1621 -41.3952,12.0736 0,8.9115 7.4741,14.9483 16.3856,14.9483 10.6363,0 22.7099,-8.624 25.0096,-27.0219 z M 375.5882,0 l 0,87.3899 C 385.937,75.0288 400.5978,68.992 416.696,68.992 c 39.3829,0 69.2794,32.7712 69.2794,73.5915 0,40.8202 -29.8965,73.5914 -69.2794,73.5914 -16.0982,0 -30.759,-6.0368 -41.1078,-18.3978 l 0,13.7984 -45.9946,0 0,-211.5755 45.9946,0 z m 32.1963,174.7797 c 17.5355,0 32.1963,-14.6608 32.1963,-32.1962 0,-17.5355 -14.6608,-32.1963 -32.1963,-32.1963 -17.5355,0 -32.1963,14.6608 -32.1963,32.1963 0,17.5354 14.6608,32.1962 32.1963,32.1962 z"
        style={{
          fill: (white && "#fff") || (black && "#000") || color || "#00d178",
        }}
      />
    </svg>
  );
}