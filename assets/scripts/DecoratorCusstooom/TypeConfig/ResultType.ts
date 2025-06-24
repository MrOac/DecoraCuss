
////////////////////////////////////////////
export type typeParameter = typeParameterPropertyBase & {
    label: string,
    type: string,
    category: string,
    default: any,
    parameters: any
}
// text , 

export type typeParameterPropertyBase = {
    label: string,
    type: string,
    default: any

}

export type typeProperty = typeParameterPropertyBase & lerpBase

export type lerpBase = {
    min: number,
    max: number,
    step: number
}

export type XYBase = {
    x: number,
    y: number
}



export type XYPosBase = typeProperty & {
}



export type typeFontSize = typeProperty & {

}
export type typeSize = typeProperty & {

}

//color 
export type typeStrokeColor = typeParameterPropertyBase & {

}
export type typeColor = typeParameterPropertyBase & {

}
export type typeFontColor = typeParameterPropertyBase & {

}

export type typePos = typeParameterPropertyBase & {
    x: typeProperty,
    y: typeProperty
}


export type typeReusltBGEnd = {
    color: string,
    opacity: number,
    size: XYBase,
    pos: XYBase
}

export type typeResultText = Omit<typeParameter, 'parameters'> & {
    parameters: {
        text: typeParameterPropertyBase
        fontSize: typeFontSize,
        fontColor: typeParameterPropertyBase,
        strokeWidth: typeProperty,
        strokeColor: typeParameterPropertyBase,
        pos: typeParameterPropertyBase & {
            x: lerpBase,
            y: lerpBase
        },
    };
};

export type typeResultSprite = Omit<typeParameter, 'parameters'> & {
    parameters: {
        sprite: typeParameterPropertyBase
        size: typeParameterPropertyBase & {
            x: lerpBase,
            y: lerpBase
        },
        pos: typeParameterPropertyBase & {
            x: lerpBase,
            y: lerpBase
        };
    };
};


export function createDefaultBGEnd() {
    return {
        color: "",
        opacity: 0,
        size: { x: 0, y: 0 },
        pos: { x: 0, y: 0 }
    } as typeReusltBGEnd
}
export function createDefaultParameters() {
    return {
        label: "",
        type: "",
        category: "",
        parameters: {}
    } as typeParameter
}

export function creatDefaultSprite() {
    let dataSprite: typeResultSprite = {
        label: "",
        type: "",
        category: "",
        default: { x: 0, y: 0 },
        parameters: {
            sprite: {
                label: "",
                type: "",
                default: ""
            },
            size: {
                label: '',
                type: '',
                default: {
                    x: 0,
                    y: 0
                },
                x: {
                    min: 0,
                    max: 10000,
                    step: 1
                },
                y: {
                    min: 0,
                    max: 10000,
                    step: 1
                }
            },
            pos: {
                label: '',
                type: '',
                default: {
                    x: 0,
                    y: 0
                },
                x: {
                    min: -1000,
                    max: 1000,
                    step: 1
                },
                y: {
                    min: -1000,
                    max: 1000,
                    step: 1
                }
            }
        }
    }
    return dataSprite
}
export function creatDefaultText() {
    let dataText: typeResultText = {
        label: "",
        type: "",
        category: "",
        default: "",
        parameters: {
            text: {
                label: "",
                type: "",
                default: ""
            },
            fontSize: {
                label: "",
                type: "",
                min: 0,
                max: 0,
                step: 0,
                default: 0
            },
            fontColor: {
                label: "",
                type: "",
                default: ""
            },
            strokeWidth: {
                label: "",
                type: "range",
                min: 0,
                max: 0,
                step: 0,
                default: 0
            },
            strokeColor: {
                label: "",
                type: "",
                default: ""
            },
            pos: {
                label: '',
                type: '',
                default: {
                    x: 0,
                    y: 0
                },
                x: {
                    min: -1000,
                    max: 1000,
                    step: 1
                },
                y: {
                    min: -1000,
                    max: 1000,
                    step: 1
                }
            }
        }
    }
    return dataText
}