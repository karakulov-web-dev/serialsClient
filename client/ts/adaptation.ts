export default function () {
  if (screen.width > 1200) {
    var rules = [
      ".app_ChannelListComponent_wrap_elem { height: 38%; }",
      ".app_ChannelListComponent_card_img  {  height: 77%; }",
      ".app_ChannelListComponent_card_h1   { font-size: 23px; }",
      ".app_Play_ControlBar_timeShiftSizeBar { right: 230px; }"
    ];
    var cssAll = rules.join("\n");
    var head:any = document.getElementsByTagName("head");
    head = head[0];
    var style:any = document.createElement("style");
    style.type = "text/css";
    if (style.styleSheet) {
      style.styleSheet.cssText = cssAll;
    } else {
      style.appendChild(document.createTextNode(cssAll));
    }
    head.appendChild(style);
  }
}
