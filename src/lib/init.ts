/*
 * @Author: BATU1579
 * @CreateDate: 2022-02-04 20:58:39
 * @LastEditor: BATU1579
 * @LastTime: 2023-08-07 08:06:24
 * @FilePath: \\src\\lib\\init.ts
 * @Description: 脚本初始化
 */
import { Record } from "./logger";
import { PermissionException, ServiceNotEnabled } from "./exception";
import { waitRandomTime } from "./utils";
import { SHOW_CONSOLE } from "../global";

export function init() {
    // check accessibility permission
    if (auto.service === null) {
        if (!confirm('Please enable accessibility permission')) {
            throw new PermissionException("Accessibility permission obtaining failure.");
        }
        auto.waitFor();
    } else {
        Record.verbose("已启用无障碍辅助功能权限");
    }

    // check is service alive
    if (device.height === 0 || device.width === 0) {
        throw new ServiceNotEnabled(
            'Failed to get the screen size. ' +
            'Please try restarting the service or re-installing Hamibot'
        );
    } else {
        Record.debug("分辨率: " + device.height + " x " + device.width);
    }

    if (!requestScreenCapture()) {
        throw new PermissionException("Accessibility permission obtaining failure.");
    } else {
        Record.debug("启动视觉识别")
    }

    // download resource
    if (!files.exists("/sdcard/exit-white.jpg")){
        Record.debug("正在加载资源")
        let img = images.load("https://hamibot-1304500632.cos.ap-nanjing.myqcloud.com/exit-white.jpg")
        if(img != null){
            img.saveTo("/sdcard/exit-white.jpg")
        }
    }
    device.keepScreenOn(3600 * 1000)
    if(SHOW_CONSOLE) {
        console.show()
        waitRandomTime(1)
    }
}
