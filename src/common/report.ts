import { APP_TOKEN, WX_PUSHER_URL, _TOKEN } from "../global";
import { LOG_STACK, Record } from "../lib/logger";
import { BaseKey } from "../scripts/abstract/Base";
import { getScreenImage } from "./ocr";

export function sendIncomeMessageToWxPuher(str: string){
    if (_TOKEN && _TOKEN !== "") {
        let res = http.postJson(WX_PUSHER_URL, {
            "appToken":APP_TOKEN,
            "content":str,
            "summary":"智能助手日收益推送",
            "contentType":3,
            "uids":[
                _TOKEN
            ],
            "verifyPay":false
        })
        return res.statusCode === 200
    }
}

export function toShowString(list: any[]){
    let stack: string[] = [`型号: ${device.product}\n`]
    let sumWeight = 0
    let sumMoney = 0
    for (let app of list) {
        let weight:number = parseInt(app.fetch(BaseKey.Weight, 0))
        let money:number = weight/app.exchangeRate
        Record.debug(`${app.appName}: ${weight}`)
        sumWeight += weight
        sumMoney += money
        if(weight > 0){
          stack.push(`${app.appName}: ${weight} - - - ${money.toFixed(2)}元`)
        }
    }
    stack.push(`\n今日总收益: ${sumWeight}金币 - - - ${sumMoney.toFixed(2)}元`)
    return stack.join('\n')
}

export function sendErrorMessage(str: string){
    let collection = LOG_STACK
    // .filter((frame) => {
    //     return frame.getLevel() >= LogLevel.Info;
    // });
    const img = getScreenImage()
    hamibot.postMessage(Date.now().toString(), {
        telemetry: true,
        data: {
          title: str,
          attachments: [
            // 支持 text, json, image 三种类型，根据实际需要选择使用
            {
              type: 'text',
              data: collection.toString(),
            },
            {
              type: 'image',
              data: images.toBase64(img), // base64
            },
          ],
        },
      });
      img.recycle()
}