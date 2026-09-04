let buttonAbout = {
    a: { onclick: false, clickTimes: 0 },
    b: { onclick: false, clickTimes: 0 },
}
let nowAbout = {
    function_onPlay: false,
}
function move_reset() {
    nowAbout.function_onPlay = false
}
function move_start() {
    nowAbout.function_onPlay = true
}
class Write {
    constructor() {

    }
    point(pointer: Array<Array<number | boolean>>) {
        for (let y = 0; y < pointer.length; y++) {
            for (let x = 0; x < pointer[y].length; x++) {
                if (pointer[y][x]) {
                    led.plot(x, y)
                } else {
                    led.unplot(x, y)
                }
            }
        }
    }
    clear() {
        basic.clearScreen()
    }
}
const write = new Write()
const sleep = function (ms: number) { basic.pause(ms) }
basic.forever(function () {
    write.point([[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [buttonAbout.a.onclick, 0, 0, 0, buttonAbout.b.onclick], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]])
    if (buttonAbout.a.clickTimes > 2000 && buttonAbout.b.clickTimes > 2000 && !(nowAbout.function_onPlay)) {
        move_start()
        write.point([[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [1, 0, 1, 0, 1], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]])
        while (/*!*/(buttonAbout.a.onclick) && /*!*/(buttonAbout.b.onclick)) {
            basic.pause(50)
        }
        move_reset()
        write.point([[0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 0, 0, 0], [0, 0, 1, 0, 0]])
        sleep(1000)
    }
})
basic.forever(function () {
    buttonAbout.a.onclick = input.buttonIsPressed(Button.A)
    if (buttonAbout.a.onclick) {
        buttonAbout.a.clickTimes += 100
        basic.pause(100)
    } else {
        buttonAbout.a.clickTimes = 0
    }
})
basic.forever(function () {
    buttonAbout.b.onclick = input.buttonIsPressed(Button.B)
    if (buttonAbout.b.onclick) {
        buttonAbout.b.clickTimes += 100
        basic.pause(100)
    } else {
        buttonAbout.b.clickTimes = 0
    }
})
