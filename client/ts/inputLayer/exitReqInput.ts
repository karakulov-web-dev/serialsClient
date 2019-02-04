
import ExitManager from "../ExitManager";
let exitManager = new ExitManager();

export function exitReq (code) {
    switch (code) {
      case 112:
        exitManager.cancel();
        break;
      case 40:
        exitManager.downFocusPosition();
        break;
      case 38:
        exitManager.upFocusPosition();
        break;
      case 13:
        exitManager.submit();
        break;
    }
}