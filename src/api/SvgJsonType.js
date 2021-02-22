var a = {
    baseInfo: {
        id: 1,
        name: "LED",
        desc: "LED灯"
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
};
console.log(JSON.stringify(a));
