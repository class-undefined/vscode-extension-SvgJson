/*基础数据类型*/
interface SvgJsonBase {
    /*id*/
    id: number,
    /*名*/
    name: string,
    /*描述文本*/
    desc: string
}

/*位置信息*/
interface BasePosition {
    x: number,
    y: number
}

/*接口信息*/
interface BaseInterface {
    /*接口id*/
    id: number,
    /*端口名*/
    portName: string,
    /*接口相对于元件的位置*/
    relativePosition: BasePosition
}

interface SvgJsonPosition {
    /*中心位置*/
    centerPos: BasePosition,
    /*接口位置 - 相对于中心位置*/
    interface: Array<BaseInterface>
}

interface SvgJsonType {
    baseInfo: SvgJsonBase,
    position: SvgJsonPosition
}

let a: SvgJsonType = {
    baseInfo: {
        id: 1,
        name: "LED",
        desc: "LED灯",
    },
    position: {
        centerPos: {
            x: 0,
            y: 0
        },
        interface: [{
            id: 200,
            portName: '左端口',
            relativePosition: {
                x: 20,
                y: 20
            }
        }, {
            id: 201,
            portName: '右端口',
            relativePosition: {
                x: -20,
                y: 20
            }
        }]
    }
}
console.log(a);
