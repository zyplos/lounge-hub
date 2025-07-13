interface DynamicItemFrameProps extends React.SVGAttributes<SVGElement> {
  color?: string;
  className?: string;
}

export function DynamicItemFrame({
  color = "#ff3e3e",
  className = "",
  ...props
}: DynamicItemFrameProps) {
  return (
    // biome-ignore lint/a11y/noSvgWithoutTitle: decorative
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      shape-rendering="crispEdges"
      className={className}
      {...props}
    >
      <g id="bg">
        <rect width="16" height="16" fill={color} />
      </g>
      <g id="pixel_bleed_fix" data-name="pixel bleed fix">
        <path d="M0,0v16h16V0H0ZM15,15H1V1h14v14Z" fill="#bc9862" />
      </g>
      <g id="overlay">
        <g
          opacity={0.75}
          style={{
            mixBlendMode: "multiply",
          }}
        >
          <rect x="1" y="1" width="1" height="1" fill="#919191" />
          <rect x="2" y="1" width="1" height="1" fill="#969696" />
          <rect x="3" y="1" width="1" height="1" fill="#949494" />
          <rect x="4" y="1" width="1" height="1" fill="#969696" />
          <rect x="5" y="1" width="1" height="1" fill="#979797" />
          <rect x="6" y="1" width="1" height="1" fill="#898989" />
          <rect x="7" y="1" width="1" height="1" fill="#898989" />
          <rect x="8" y="1" width="1" height="1" fill="#898989" />
          <rect x="9" y="1" width="1" height="1" fill="#898989" />
          <rect x="10" y="1" width="1" height="1" fill="#898989" />
          <rect x="11" y="1" width="1" height="1" fill="#969696" />
          <rect x="12" y="1" width="1" height="1" fill="#8a8a8a" />
          <rect x="13" y="1" width="1" height="1" fill="#969696" />
          <rect x="14" y="1" width="1" height="1" fill="#919191" />
          <rect x="1" y="2" width="1" height="1" fill="#9b9b9b" />
          <rect x="2" y="2" width="1" height="1" fill="#909090" />
          <rect x="3" y="2" width="1" height="1" fill="#919191" />
          <rect x="4" y="2" width="1" height="1" fill="#919191" />
          <rect x="5" y="2" width="1" height="1" fill="#909090" />
          <rect x="6" y="2" width="1" height="1" fill="#9f9f9f" />
          <rect x="7" y="2" width="1" height="1" fill="#8a8a8a" />
          <rect x="8" y="2" width="1" height="1" fill="#898989" />
          <rect x="9" y="2" width="1" height="1" fill="#a7a7a7" />
          <rect x="10" y="2" width="1" height="1" fill="#a7a7a7" />
          <rect x="11" y="2" width="1" height="1" fill="#a0a0a0" />
          <rect x="12" y="2" width="1" height="1" fill="#9f9f9f" />
          <rect x="13" y="2" width="1" height="1" fill="#a7a7a7" />
          <rect x="14" y="2" width="1" height="1" fill="#9b9b9b" />
          <rect x="1" y="3" width="1" height="1" fill="#929292" />
          <rect x="2" y="3" width="1" height="1" fill="#9c9c9c" />
          <rect x="3" y="3" width="1" height="1" fill="#909090" />
          <rect x="4" y="3" width="1" height="1" fill="#909090" />
          <rect x="5" y="3" width="1" height="1" fill="#9d9d9d" />
          <rect x="6" y="3" width="1" height="1" fill="#9d9d9d" />
          <rect x="7" y="3" width="1" height="1" fill="#9c9c9c" />
          <rect x="8" y="3" width="1" height="1" fill="#9d9d9d" />
          <rect x="9" y="3" width="1" height="1" fill="#9d9d9d" />
          <rect x="10" y="3" width="1" height="1" fill="#9d9d9d" />
          <rect x="11" y="3" width="1" height="1" fill="#909090" />
          <rect x="12" y="3" width="1" height="1" fill="#8f8f8f" />
          <rect x="13" y="3" width="1" height="1" fill="#9c9c9c" />
          <rect x="14" y="3" width="1" height="1" fill="#939393" />
          <rect x="1" y="4" width="1" height="1" fill="#898989" />
          <rect x="2" y="4" width="1" height="1" fill="#919191" />
          <rect x="3" y="4" width="1" height="1" fill="#8b8b8b" />
          <rect x="4" y="4" width="1" height="1" fill="#919191" />
          <rect x="5" y="4" width="1" height="1" fill="#9f9f9f" />
          <rect x="6" y="4" width="1" height="1" fill="#9f9f9f" />
          <rect x="7" y="4" width="1" height="1" fill="#aaa" />
          <rect x="8" y="4" width="1" height="1" fill="#aaa" />
          <rect x="9" y="4" width="1" height="1" fill="#aaa" />
          <rect x="10" y="4" width="1" height="1" fill="#959595" />
          <rect x="11" y="4" width="1" height="1" fill="#9f9f9f" />
          <rect x="12" y="4" width="1" height="1" fill="#909090" />
          <rect x="13" y="4" width="1" height="1" fill="#9f9f9f" />
          <rect x="14" y="4" width="1" height="1" fill="#969696" />
          <rect x="1" y="5" width="1" height="1" fill="#898989" />
          <rect x="2" y="5" width="1" height="1" fill="#9e9e9e" />
          <rect x="3" y="5" width="1" height="1" fill="#a0a0a0" />
          <rect x="4" y="5" width="1" height="1" fill="#9f9f9f" />
          <rect x="5" y="5" width="1" height="1" fill="#b6b6b6" />
          <rect x="6" y="5" width="1" height="1" fill="#b6b6b6" />
          <rect x="7" y="5" width="1" height="1" fill="#b6b6b6" />
          <rect x="8" y="5" width="1" height="1" fill="#b6b6b6" />
          <rect x="9" y="5" width="1" height="1" fill="#b6b6b6" />
          <rect x="10" y="5" width="1" height="1" fill="#b6b6b6" />
          <rect x="11" y="5" width="1" height="1" fill="#a0a0a0" />
          <rect x="12" y="5" width="1" height="1" fill="#909090" />
          <rect x="13" y="5" width="1" height="1" fill="#909090" />
          <rect x="14" y="5" width="1" height="1" fill="#8a8a8a" />
          <rect x="1" y="6" width="1" height="1" fill="#9b9b9b" />
          <rect x="2" y="6" width="1" height="1" fill="#a7a7a7" />
          <rect x="3" y="6" width="1" height="1" fill="#9f9f9f" />
          <rect x="4" y="6" width="1" height="1" fill="#bfbfbf" />
          <rect x="5" y="6" width="1" height="1" fill="#bebebe" />
          <rect x="6" y="6" width="1" height="1" fill="#b4b4b4" />
          <rect x="7" y="6" width="1" height="1" fill="#b3b3b3" />
          <rect x="8" y="6" width="1" height="1" fill="#b8b8b8" />
          <rect x="9" y="6" width="1" height="1" fill="#b8b8b8" />
          <rect x="10" y="6" width="1" height="1" fill="#b8b8b8" />
          <rect x="11" y="6" width="1" height="1" fill="#bfbfbf" />
          <rect x="12" y="6" width="1" height="1" fill="#a7a7a7" />
          <rect x="13" y="6" width="1" height="1" fill="#a7a7a7" />
          <rect x="14" y="6" width="1" height="1" fill="#9b9b9b" />
          <rect x="1" y="7" width="1" height="1" fill="#a6a6a6" />
          <rect x="2" y="7" width="1" height="1" fill="#9c9c9c" />
          <rect x="3" y="7" width="1" height="1" fill="#9c9c9c" />
          <rect x="4" y="7" width="1" height="1" fill="#b3b3b3" />
          <rect x="5" y="7" width="1" height="1" fill="#b2b2b2" />
          <rect x="6" y="7" width="1" height="1" fill="#b3b3b3" />
          <rect x="7" y="7" width="1" height="1" fill="#b2b2b2" />
          <rect x="8" y="7" width="1" height="1" fill="#b3b3b3" />
          <rect x="9" y="7" width="1" height="1" fill="#b3b3b3" />
          <rect x="10" y="7" width="1" height="1" fill="#b3b3b3" />
          <rect x="11" y="7" width="1" height="1" fill="#b3b3b3" />
          <rect x="12" y="7" width="1" height="1" fill="#9d9d9d" />
          <rect x="13" y="7" width="1" height="1" fill="#9c9c9c" />
          <rect x="14" y="7" width="1" height="1" fill="#939393" />
          <rect x="1" y="8" width="1" height="1" fill="#9b9b9b" />
          <rect x="2" y="8" width="1" height="1" fill="#a7a7a7" />
          <rect x="3" y="8" width="1" height="1" fill="#a7a7a7" />
          <rect x="4" y="8" width="1" height="1" fill="#bebebe" />
          <rect x="5" y="8" width="1" height="1" fill="#b4b4b4" />
          <rect x="6" y="8" width="1" height="1" fill="#b6b6b6" />
          <rect x="7" y="8" width="1" height="1" fill="#b8b8b8" />
          <rect x="8" y="8" width="1" height="1" fill="#b9b9b9" />
          <rect x="9" y="8" width="1" height="1" fill="#b7b7b7" />
          <rect x="10" y="8" width="1" height="1" fill="#b6b6b6" />
          <rect x="11" y="8" width="1" height="1" fill="#b6b6b6" />
          <rect x="12" y="8" width="1" height="1" fill="#a7a7a7" />
          <rect x="13" y="8" width="1" height="1" fill="#a8a8a8" />
          <rect x="14" y="8" width="1" height="1" fill="#9b9b9b" />
          <rect x="1" y="9" width="1" height="1" fill="#898989" />
          <rect x="2" y="9" width="1" height="1" fill="#909090" />
          <rect x="3" y="9" width="1" height="1" fill="#909090" />
          <rect x="4" y="9" width="1" height="1" fill="#adadad" />
          <rect x="5" y="9" width="1" height="1" fill="#bebebe" />
          <rect x="6" y="9" width="1" height="1" fill="#b2b2b2" />
          <rect x="7" y="9" width="1" height="1" fill="#b3b3b3" />
          <rect x="8" y="9" width="1" height="1" fill="#b3b3b3" />
          <rect x="9" y="9" width="1" height="1" fill="#b3b3b3" />
          <rect x="10" y="9" width="1" height="1" fill="#b3b3b3" />
          <rect x="11" y="9" width="1" height="1" fill="#b4b4b4" />
          <rect x="12" y="9" width="1" height="1" fill="#a7a7a7" />
          <rect x="13" y="9" width="1" height="1" fill="#919191" />
          <rect x="14" y="9" width="1" height="1" fill="#898989" />
          <rect x="1" y="10" width="1" height="1" fill="#969696" />
          <rect x="2" y="10" width="1" height="1" fill="#a0a0a0" />
          <rect x="3" y="10" width="1" height="1" fill="#9f9f9f" />
          <rect x="4" y="10" width="1" height="1" fill="#a8a8a8" />
          <rect x="5" y="10" width="1" height="1" fill="#bfbfbf" />
          <rect x="6" y="10" width="1" height="1" fill="#b9b9b9" />
          <rect x="7" y="10" width="1" height="1" fill="#b9b9b9" />
          <rect x="8" y="10" width="1" height="1" fill="#b9b9b9" />
          <rect x="9" y="10" width="1" height="1" fill="#b9b9b9" />
          <rect x="10" y="10" width="1" height="1" fill="#b9b9b9" />
          <rect x="11" y="10" width="1" height="1" fill="#9f9f9f" />
          <rect x="12" y="10" width="1" height="1" fill="#a0a0a0" />
          <rect x="13" y="10" width="1" height="1" fill="#9f9f9f" />
          <rect x="14" y="10" width="1" height="1" fill="#979797" />
          <rect x="1" y="11" width="1" height="1" fill="#929292" />
          <rect x="2" y="11" width="1" height="1" fill="#9f9f9f" />
          <rect x="3" y="11" width="1" height="1" fill="#909090" />
          <rect x="4" y="11" width="1" height="1" fill="#9d9d9d" />
          <rect x="5" y="11" width="1" height="1" fill="#9d9d9d" />
          <rect x="6" y="11" width="1" height="1" fill="#b3b3b3" />
          <rect x="7" y="11" width="1" height="1" fill="#b3b3b3" />
          <rect x="8" y="11" width="1" height="1" fill="#b4b4b4" />
          <rect x="9" y="11" width="1" height="1" fill="#b3b3b3" />
          <rect x="10" y="11" width="1" height="1" fill="#9f9f9f" />
          <rect x="11" y="11" width="1" height="1" fill="#9e9e9e" />
          <rect x="12" y="11" width="1" height="1" fill="#909090" />
          <rect x="13" y="11" width="1" height="1" fill="#9d9d9d" />
          <rect x="14" y="11" width="1" height="1" fill="#939393" />
          <rect x="1" y="12" width="1" height="1" fill="#9b9b9b" />
          <rect x="2" y="12" width="1" height="1" fill="#a8a8a8" />
          <rect x="3" y="12" width="1" height="1" fill="#949494" />
          <rect x="4" y="12" width="1" height="1" fill="#939393" />
          <rect x="5" y="12" width="1" height="1" fill="#919191" />
          <rect x="6" y="12" width="1" height="1" fill="#8a8a8a" />
          <rect x="7" y="12" width="1" height="1" fill="#919191" />
          <rect x="8" y="12" width="1" height="1" fill="#919191" />
          <rect x="9" y="12" width="1" height="1" fill="#909090" />
          <rect x="10" y="12" width="1" height="1" fill="#919191" />
          <rect x="11" y="12" width="1" height="1" fill="#8b8b8b" />
          <rect x="12" y="12" width="1" height="1" fill="#919191" />
          <rect x="13" y="12" width="1" height="1" fill="#9e9e9e" />
          <rect x="14" y="12" width="1" height="1" fill="#9b9b9b" />
          <rect x="1" y="13" width="1" height="1" fill="#898989" />
          <rect x="2" y="13" width="1" height="1" fill="#9e9e9e" />
          <rect x="3" y="13" width="1" height="1" fill="#a7a7a7" />
          <rect x="4" y="13" width="1" height="1" fill="#a7a7a7" />
          <rect x="5" y="13" width="1" height="1" fill="#a7a7a7" />
          <rect x="6" y="13" width="1" height="1" fill="#a7a7a7" />
          <rect x="7" y="13" width="1" height="1" fill="#898989" />
          <rect x="8" y="13" width="1" height="1" fill="#898989" />
          <rect x="9" y="13" width="1" height="1" fill="#a0a0a0" />
          <rect x="10" y="13" width="1" height="1" fill="#a0a0a0" />
          <rect x="11" y="13" width="1" height="1" fill="#919191" />
          <rect x="12" y="13" width="1" height="1" fill="#919191" />
          <rect x="13" y="13" width="1" height="1" fill="#919191" />
          <rect x="14" y="13" width="1" height="1" fill="#8a8a8a" />
          <rect x="1" y="14" width="1" height="1" fill="#919191" />
          <rect x="2" y="14" width="1" height="1" fill="#898989" />
          <rect x="3" y="14" width="1" height="1" fill="#898989" />
          <rect x="4" y="14" width="1" height="1" fill="#898989" />
          <rect x="5" y="14" width="1" height="1" fill="#9b9b9b" />
          <rect x="6" y="14" width="1" height="1" fill="#9b9b9b" />
          <rect x="7" y="14" width="1" height="1" fill="#8a8a8a" />
          <rect x="8" y="14" width="1" height="1" fill="#9b9b9b" />
          <rect x="9" y="14" width="1" height="1" fill="#9b9b9b" />
          <rect x="10" y="14" width="1" height="1" fill="#898989" />
          <rect x="11" y="14" width="1" height="1" fill="#979797" />
          <rect x="12" y="14" width="1" height="1" fill="#9b9b9b" />
          <rect x="13" y="14" width="1" height="1" fill="#9b9b9b" />
          <rect x="14" y="14" width="1" height="1" fill="#919191" />
        </g>
      </g>
      <g id="border">
        <rect width="1" height="1" fill="#bc9862" />
        <rect x="1" width="1" height="1" fill="#9f844d" />
        <rect x="2" width="1" height="1" fill="#9f844d" />
        <rect x="3" width="1" height="1" fill="#9f844d" />
        <rect x="4" width="1" height="1" fill="#9f844d" />
        <rect x="5" width="1" height="1" fill="#bc9862" />
        <rect x="6" width="1" height="1" fill="#bc9862" />
        <rect x="7" width="1" height="1" fill="#b4905a" />
        <rect x="8" width="1" height="1" fill="#9f844d" />
        <rect x="9" width="1" height="1" fill="#bc9862" />
        <rect x="10" width="1" height="1" fill="#bc9862" />
        <rect x="11" width="1" height="1" fill="#bc9862" />
        <rect x="12" width="1" height="1" fill="#bc9862" />
        <rect x="13" width="1" height="1" fill="#bc9862" />
        <rect x="14" width="1" height="1" fill="#bc9862" />
        <rect y="1" width="1" height="1" fill="#bc9862" />
        <rect x="15" y="1" width="1" height="1" fill="#9f844d" />
        <rect y="2" width="1" height="1" fill="#bc9862" />
        <rect x="15" y="2" width="1" height="1" fill="#9f844d" />
        <rect y="3" width="1" height="1" fill="#695433" />
        <rect x="15" y="3" width="1" height="1" fill="#735e39" />
        <rect y="4" width="1" height="1" fill="#bc9862" />
        <rect x="15" y="4" width="1" height="1" fill="#bc9862" />
        <rect y="5" width="1" height="1" fill="#9f844d" />
        <rect x="15" y="5" width="1" height="1" fill="#9f844d" />
        <rect y="6" width="1" height="1" fill="#bc9862" />
        <rect x="15" y="6" width="1" height="1" fill="#bc9862" />
        <rect y="7" width="1" height="1" fill="#735e39" />
        <rect x="15" y="7" width="1" height="1" fill="#735e39" />
        <rect y="8" width="1" height="1" fill="#bc9862" />
        <rect x="15" y="8" width="1" height="1" fill="#9f844d" />
        <rect y="9" width="1" height="1" fill="#9f844d" />
        <rect x="15" y="9" width="1" height="1" fill="#9f844d" />
        <rect y="10" width="1" height="1" fill="#bc9862" />
        <rect x="15" y="10" width="1" height="1" fill="#9f844d" />
        <rect y="11" width="1" height="1" fill="#735e39" />
        <rect x="15" y="11" width="1" height="1" fill="#735e39" />
        <rect y="12" width="1" height="1" fill="#bc9862" />
        <rect x="15" y="12" width="1" height="1" fill="#bc9862" />
        <rect y="13" width="1" height="1" fill="#b4905a" />
        <rect x="15" y="13" width="1" height="1" fill="#b4905a" />
        <rect y="14" width="1" height="1" fill="#bc9862" />
        <rect x="15" y="14" width="1" height="1" fill="#bc9862" />
        <rect x="1" y="15" width="1" height="1" fill="#735e39" />
        <rect x="2" y="15" width="1" height="1" fill="#735e39" />
        <rect x="3" y="15" width="1" height="1" fill="#7c623e" />
        <rect x="4" y="15" width="1" height="1" fill="#695433" />
        <rect x="5" y="15" width="1" height="1" fill="#695433" />
        <rect x="6" y="15" width="1" height="1" fill="#7c623e" />
        <rect x="7" y="15" width="1" height="1" fill="#695433" />
        <rect x="8" y="15" width="1" height="1" fill="#735e39" />
        <rect x="9" y="15" width="1" height="1" fill="#735e39" />
        <rect x="10" y="15" width="1" height="1" fill="#735e39" />
        <rect x="11" y="15" width="1" height="1" fill="#695433" />
        <rect x="12" y="15" width="1" height="1" fill="#4c3d26" />
        <rect x="13" y="15" width="1" height="1" fill="#695433" />
        <rect x="14" y="15" width="1" height="1" fill="#695433" />
        <rect x="15" y="15" width="1" height="1" fill="#735e39" />
        <rect x="15" width="1" height="1" fill="#9f844d" />
        <rect y="15" width="1" height="1" fill="#735e39" />
      </g>
    </svg>
  );
}
