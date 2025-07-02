// BaseParameter.ts
export class BaseParameter {
    label: string;
    type: string;
    category?: string;
    constructor(label: string, type: string, category?: string) {
        this.label = label;
        this.type = type;
        this.category = category;
    }
}

export class NumberParameter extends BaseParameter {
    default: number;
    constructor(label: string, defaultValue: number, category?: string) {
        super(label, 'number', category);
        this.default = defaultValue;
    }
}

export class RangeParameter extends BaseParameter {
    default: number;
    min: number;
    max: number;
    step: number;
    constructor(label: string, defaultValue: number, min: number, max: number, step: number, category?: string) {
        super(label, 'range', category);
        this.default = defaultValue;
        this.min = min;
        this.max = max;
        this.step = step;
    }
}

export class BooleanParameter extends BaseParameter {
    default: boolean;
    constructor(label: string, defaultValue: boolean, category?: string) {
        super(label, 'boolean', category);
        this.default = defaultValue;
    }
}

export class ColorParameter extends BaseParameter {
    default: string;
    constructor(label: string, defaultValue: string, category?: string) {
        super(label, 'color', category);
        this.default = defaultValue;
    }
}

export class TextParameter extends BaseParameter {
    default: string;
    constructor(label: string, defaultValue: string, category?: string) {
        super(label, 'text', category);
        this.default = defaultValue;
    }
}

export class ImageParameter extends BaseParameter {
    default: string;
    constructor(label: string, defaultValue: string, category?: string) {
        super(label, 'image', category);
        this.default = defaultValue;
    }
}

export class CoordinatesParameter extends BaseParameter {
    default: { x: number; y: number };
    x: { min: number; max: number; step: number };
    y: { min: number; max: number; step: number };
    constructor(
        label: string,
        defaultValue: { x: number; y: number },
        x: { min: number; max: number; step: number },
        y: { min: number; max: number; step: number },
        category?: string
    ) {
        super(label, 'coordinates', category);
        this.default = defaultValue;
        this.x = x;
        this.y = y;
    }
}

export class SelectParameter extends BaseParameter {
    default: string;
    options: { value: string; name: string }[];
    constructor(label: string, defaultValue: string, options: { value: string; name: string }[], category?: string) {
        super(label, 'select', category);
        this.default = defaultValue;
        this.options = options;
    }
}

export class AlignmentParameter extends BaseParameter {
    default: string;
    constructor(label: string, defaultValue: string, category?: string) {
        super(label, 'alignment', category);
        this.default = defaultValue;
    }
}

export class AnimationParameter extends BaseParameter {
    default: { animation: string; speed: number };
    allowedAnimations: string[];
    constructor(label: string, defaultValue: { animation: string; speed: number }, allowedAnimations: string[], category?: string) {
        super(label, 'animation', category);
        this.default = defaultValue;
        this.allowedAnimations = allowedAnimations;
    }
}

export class Asset3DParameter extends BaseParameter {
    default: string;
    constructor(label: string, defaultValue: string, category?: string) {
        super(label, 'asset_3d', category);
        this.default = defaultValue;
    }
}

export class AudioParameter extends BaseParameter {
    default: string;
    constructor(label: string, defaultValue: string, category?: string) {
        super(label, 'audio', category);
        this.default = defaultValue;
    }
}

export class FontFamilyParameter extends BaseParameter {
    default: string;
    constructor(label: string, defaultValue: string, category?: string) {
        super(label, 'font_family', category);
        this.default = defaultValue;
    }
}

export class FormattedTextParameter extends BaseParameter {
    default: {
        alignment: string;
        fontColor: string;
        fontFamily: string;
        fontSize: number;
        strokeColor: string;
        strokeWidth: number;
        text: string;
    };
    constructor(label: string, defaultValue: {
        alignment: string;
        fontColor: string;
        fontFamily: string;
        fontSize: number;
        strokeColor: string;
        strokeWidth: number;
        text: string;
    }, category?: string) {
        super(label, 'formatted_text', category);
        this.default = defaultValue;
    }
}

export class ObjectParameter extends BaseParameter {
    default?: any;
    parameters: BaseParameter[];
    optional?: boolean;
    constructor(label: string, parameters: BaseParameter[], defaultValue?: any, optional?: boolean, category?: string) {
        super(label, 'object', category);
        this.parameters = parameters;
        this.default = defaultValue;
        this.optional = optional;
    }
}

export class VideoParameter extends BaseParameter {
    default: string;
    constructor(label: string, defaultValue: string, category?: string) {
        super(label, 'video', category);
        this.default = defaultValue;
    }
}
